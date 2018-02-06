<template>
    <section>
        <my-filter :list="filterList" @callback="search" v-loading="filterLoading"></my-filter>
        <div class="panel">
            <div class="title">
                <el-input placeholder="请输入搜索关键词" v-model="keyword">
                    <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
                </el-input>

                <!--分页-->
                <div class="pageArea">
                    <Page :pageNo="pageNo" :totalCount="totalCount" :pageSize="pageSize" @page-change="handleCurrentChange"></Page>
                </div>

            </div>

            <div class="content">
                <!--列表-->
                <el-table
                        :data="rows"
                        highlight-current-row
                        v-loading="listLoading"
                        style="width: 100%;">
                    <el-table-column type="index" label="序号">
                    </el-table-column>
                    <el-table-column prop="name" label="分类名称" sortable>
                    </el-table-column>
                    <el-table-column prop="remark" label="描述" sortable>
                    </el-table-column>
                    <el-table-column prop="course" label="课程" sortable>
                                            <template slot-scope="scope">
                        <span v-if="scope.row.course">{{scope.row.course.name}}</span>
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
            <el-dialog title="编辑课程" :visible.sync="editFormVisible">
                <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                    <el-form-item label="所属课程" prop="course">
                        <el-select v-model="editForm.course" placeholder="请选择所属课程">
                            <template v-for="item in courseArr">
                                <el-option
                                        :label="item.text"
                                        :value="item.value"
                                        :key="item.value"
                                >
                                </el-option>
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="章节名称" prop="name">
                        <el-input v-model="editForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="章节描述" prop="remark">
                        <el-input
                                type="textarea"
                                :rows="3"
                                placeholder="请输入内容"
                                v-model="editForm.remark">
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
    import {getChapterList, getCourseFilter,getCourseList, editChapter} from '../../../api/api';
    import myFilter from '../../common/myFilter.vue'
    import Pagination from '../../common/Pagination.vue';
    import _ from 'lodash';

    export default {
        data() {
            return {
                keyword: '',
                filter: {},
                rows: [],
                totalCount: 0,
                pageNo: 1,
                pageSize: 10,
                listLoading: false,
                filterLoading: false,
                filterList: [],

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        { required: true, message: '请填写章节名称', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请填写章节描述', trigger: 'blur' }
                    ],
                    course: [
                        { required: true, message: '请选择所属课程', trigger: 'change' }
                    ],
                },
                //编辑界面数据
                editForm: {
                    id: -1,
                    name: '',
                    desc: '',
                    course: '',
                },
                courseArr: [],
            }
        },
        methods: {
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = _.assign({}, row, { course: row.course.id });
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            //NProgress.start();
                            var para = {
                            'id': this.editForm.id,
                            'course.id': this.editForm.course,
                            'name': this.editForm.name,
                            'remark': this.editForm.remark};
                            editChapter(para).then((res) => {
                                this.editLoading = false;
                                //res.code
                                if(res.code==0){
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });}
                                else{
                                    this.$message({
                                        message: msg,
                                        type: 'error'
                                    });
                                }
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
                this.getUsers();
            },
            search(obj) {
                this.filter = obj;
                this.getList();
            },
            //获取用户列表
            getList() {
                //console.log('list refresh');
                let para = {
                    pageNo: this.pageNo,
                    filter: JSON.stringify(this.filter),
                    keyword: this.keyword,
                    pageSize: this.pageSize,
                };
                if (!this.listLoading) this.listLoading = true;
                getChapterList(para).then((res) => {
                    res=res.data;
                    this.totalCount = res.totalCount;
                    this.rows = res.rows;
                    if (!this.filterLoading) this.listLoading = false
                });
            },
            // 获取过滤器数据
            getFilter() {
                this.filterLoading = true;
                this.listLoading = true;
                //课程数据
                getCourseFilter({}).then((res) => {
                    this.filterList = res.data;
                    //console.log('res.data',res.data[0]);//要这么才能取得数据
                    this.courseArr = res.data[0].children;
                    this.filterLoading = false;
                    this.getList();
                });
                /*getCourseList({}).then((res) => {
                    this.courseArr = res;
                });*/
            },
        },
        components: {
            'Page': Pagination,
            myFilter,
        },
        mounted() {
            this.getFilter();
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>