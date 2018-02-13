<template>
    <section>
        <div class="panel">
            <div class="title">
                <el-input placeholder="请输入搜索关键词" v-model="keyword">
                    <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
                </el-input>

                <!--分页-->
                <div class="pageArea">
                    <Page :pageNo="pageNo" :totalCount="totalCount" :pageSize="pageSize"
                          @page-change="handleCurrentChange"></Page>
                </div>

            </div>

            <div class="content">
                <!--列表-->
                <el-table
                        :data="rows"
                        highlight-current-row
                        v-loading="listLoading"
                        style="width: 100%;">
                    <el-table-column type="index" label="ID" sortable>
                    </el-table-column>
                    <el-table-column prop="name" label="课程名称" sortable>
                    </el-table-column>
                    <el-table-column prop="subject" label="学科" sortable>
                        <template slot-scope="scope">
                            <span v-if="scope.row.subject">{{scope.row.subject.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="creator" label="创建人" sortable>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button type="danger" size="small" @click="handleEdit(scope.row.id, scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!--编辑界面-->
            <el-dialog title="编辑章节" :visible.sync="editFormVisible">
                <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                    <el-form-item label="课程名称" prop="name">
                        <el-input v-model="editForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="学科种类" prop="subject">
                        <el-input v-model="editForm.subject"></el-input>
                    </el-form-item>
                    <el-form-item label="课程描述" prop="desc">
                        <el-input
                                type="textarea"
                                :rows="3"
                                placeholder="请输入内容"
                                v-model="editForm.desc">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="editFormVisible = false">取消</el-button>
                    <el-button type="primary" @click.native="editSubmit" v-loading="editLoading">提交</el-button>
                </div>
            </el-dialog>
        </div>
    </section>
</template>

<script>
    import {getCourseList, editCourse} from '../../../api/api';
    import Pagination from '../../common/Pagination.vue';
    import _ from 'lodash';

    export default {
        data() {
            return {
                keyword: '',
                rows: [],
                totalCount: 0,
                pageNo: 1,
                pageSize: 10,
                listLoading: false,

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        { required: true, message: '请填写课程名称', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请填写课程描述', trigger: 'blur' }
                    ],
                    subject: [
                        { required: true, message: '请填写学科种类', trigger: 'blur' }
                    ],
                },
                //编辑界面数据
                editForm: {
                    id: -1,
                    name: '',
                    desc: '',
                    subject: '',
                },
            }
        },
        methods: {
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = _.assign({}, row);
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            //NProgress.start();
                            let para = _.assign({}, this.editForm);
                            console.log(para);
                            editCourse(para).then((res) => {
                                this.editLoading = false;
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.getList();
                            });
                        });
                    }
                });
            },
            handleCurrentChange(val) {
                this.pageNo = val;
                this.getList();
            },
            //获取用户列表
            getList() {
                let para = {
                    pageNo: this.pageNo,
                    keyword: this.keyword,
                    pageSize: this.pageSize
                };
                this.listLoading = true;
                getCourseList(para).then((res) => {
                    res=res.data;
                    this.totalCount = res.totalCount;
                    this.rows = res.rows;
                    this.listLoading = false;
                });
            },
        },
        components: {
            'Page': Pagination,
        },
        mounted() {
            this.getList();
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>