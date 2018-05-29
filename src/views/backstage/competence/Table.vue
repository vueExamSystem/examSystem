<template>
    <section>
        <!-- <div class="content">
           <el-form ref="form" :model="form" :rules="rules" v-loading="loading"
                         label-width="110px" @submit.prevent="onSubmit('form')">
                    <el-form-item label="考试名称：" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
            </el-form>
        </div> -->
        <div class="panel">
            <div class="title">
                    <el-input placeholder="请输入搜索关键词" v-model="keyword">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
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
                        <el-table-column type="index" label="序号" width="80">
                        </el-table-column>
                        <el-table-column prop="name" label="老师姓名" min-width="160"></el-table-column>
                        <el-table-column prop="account" label="登录帐号" min-width="160">
                        </el-table-column>
                        <el-table-column prop="sex" label="性别" min-width="100">
                        </el-table-column>
                        <el-table-column prop="course" label="管理课程" min-width="240">
                        </el-table-column>
                        <el-table-column prop="phone" label="电话号码" min-width="120">
                        </el-table-column>
                        <el-table-column prop="email" label="邮箱" min-width="120">
                        </el-table-column>
                        <el-table-column prop="id" label="操作" min-width="250">
                            <template scope="scope">
                                <el-button type="primary" @click="showEdit(scope.$index, scope.row)">编辑课程</el-button>
                                <el-button type="primary" @click="resetPwd(scope.row)">重置密码</el-button>
                            </template>
                        </el-table-column>
                </el-table>
            </div>
        </div>
                <el-dialog title="编辑课程" :visible.sync="editFormVisible">
                    <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm" :inline-message="isInlineMessage" v-loading="editLoading">
                        <el-form-item label="老师姓名" prop="name">
                            <el-input v-model="editForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="课程选择" prop="courses">
                            <el-select v-model="editForm.courses" placeholder="请选择课程" multiple>
                                <template v-for="item in courseArr">
                                    <el-option :label="item.text" :value="item.value" :key="item.value"></el-option>
                                </template>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click.native="hideEdit">取消</el-button>
                        <el-button type="primary" @click.native="editSubmit">提交</el-button>
                    </div>
                </el-dialog>
    </section>
</template>

<script>
    import {getTeacherList,ResetTeacherPwd,getTeacherCourses,eidtTeacherCourses} from '../../../api/api';
    import Pagination from '../../common/Pagination.vue'
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
                beginTime:'',
                endTime:'',
                editFormVisible: false,
                courseArr: [],
                isInlineMessage: true,
                editLoading: false,
                editForm: {
                    id: -1,
                    name:'',
                    courses:[]
                },
                editFormRules: {
                    courses: [
                        {required: true, message: '请选择课程', trigger:'change'}
                    ]
                }
            }
        },
        methods:{
            handleSizeChange(val) {
                //console.log(val);
            },
            handleCurrentChange(val) {
                this.pageNo = val;
                this.getList();
            },
            search() {
                this.pageNo = 1;
                this.getList();
            },
            //显示编辑界面
            showEdit(index, row) {//编辑
                this.editFormVisible = true;
                this.editForm.id = row.id;
                this.editForm.name=row.name;
                this.editForm.courses =row.courses;
            },
            hideEdit(){
                this.editFormVisible = false;
                this.$refs['editForm'].resetFields();
            },
            resetPwd(row){
                this.$confirm('确定重置'+row.name+'密码吗？','提示',{
                    confirmButtonText: '确定'
                }).then(res => {
                    var params = {
                        userId: row.id,
                        account:row.account
                    };
                    ResetTeacherPwd(params).then(res => {
                        if(res.code == '0'){
                            this.$message({
                                type: 'success',
                                message: '重置密码成功'
                            });
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.msg
                            });
                        }
                    });
                }).catch(res => {});
            },
            //获取用户列表
            getList() {
                let para = {
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    keyword: this.keyword
                };
                this.listLoading = true;
                getTeacherList(para).then((res) => {
                    //console.log('res', res);
                    this.totalCount = res.data.totalCount;
                    this.rows = res.data.rows;
                    this.listLoading = false;
                });
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(res => {
                            this.editLoading = true;
                            let para={
                                id:this.editForm.id,
                                courses:this.editForm.courses.join(',')
                            };
                            console.log('para',para);
                            eidtTeacherCourses(para).then((res) => {
                                this.editLoading = false;
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.search();
                            });
                        }).catch(res=>{this.editLoading = false;});
                    }
                });
            },
            // 获取初始数据
        getDefaultData() {
                getTeacherCourses({}).then((res) => {
                   this.courseArr=res.data.courses;
                });
            },
        },
        components: {
            'Page': Pagination,
        },
        mounted() {
            this.getDefaultData();
            this.getList();
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>