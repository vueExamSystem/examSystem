<template>
    <div>
        <section v-if="!classId" id="studentTable">
            <my-filter v-if="filterList.length > 0" :list="filterList" @callback="search" v-loading="filterLoading"></my-filter>
            <div class="panel">
                <div class="title">
                    <el-input placeholder="请输入搜索关键词" v-model="keyword">
                        <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
                    </el-input>

                    <el-button type="success" @click="departmentAdd" class="el-button-shadow">添加院系</el-button>
                    <!--分页-->
<!--                     <div class="pageArea">
                        <Page :current="pageNo" :totalCount="totalCount" :pageSize="pageSize" @page-change="handleCurrentChange"></Page>
                    </div> -->

                </div>

                <div class="content">
                    <el-collapse
                            accordion
                            v-model="activeName"
                            value="0"
                            change="changeCollapse"
                            v-for="(item, index) in list">
                        <el-collapse-item>
                            <template slot="title" name="index">
                                <div v-if="!isShowResetInput(item.collegeId)">
                                    <span>{{item.college}}</span>
                                    <el-button type="primary" @click="resetNameEvent($event, item.collegeId)" class="el-button-shadow">重命名</el-button>
                                    <el-button type="success" @click="classAdd($event, index)" class="el-button-shadow">添加班级</el-button>
                                </div>
                                <div v-if="isShowResetInput(item.collegeId)">
                                    <div class="resetNameInput">
                                        <el-input v-model="item.college"></el-input>
                                    </div>
                                    <el-button type="success" @click="saveResetName($event, item.collegeId)" class="el-button-shadow">保存</el-button>
                                    <el-button type="danger" @click="cancelResetName($event)" class="el-button-shadow">取消</el-button>
                                </div>
                            </template>
                            <!--列表-->
                            <el-table
                                    :data="item.groups"
                                    highlight-current-row
                                    @selection-change="selsChange"
                                    v-loading="listLoading"
                                    style="width: 100%;">
                                <el-table-column type="index" label="ID">
                                </el-table-column>
                                <el-table-column prop="groupName" label="班级名称" sortable>
                                    <template scope="scope">
                                        <el-button type="text" @click="detailShow(scope.row.id)">{{scope.row.groupName}}</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="studentNum" label="班级人数" sortable>
                                </el-table-column>
                                <el-table-column prop="teacher" label="辅导员" sortable>
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        width="100">
                                    <template slot-scope="scope">
                                        <el-button type="primary" size="small">编辑</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>

                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>


            <!--编辑界面-->
            <el-dialog title="添加班级" :visible.sync="addFormVisible">
                <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm" :inline-message="isInlineMessage" v-loading="addLoading">
                    <el-form-item label="所属院系" prop="collegeId">
                        <el-select v-model="addForm.collegeId" placeholder="请选择院系">
                            <el-option :loading="addLoading"
                                       v-for="item in addFormInfo.collegeId"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属年级" prop="grade">
                        <el-select v-model="addForm.grade" placeholder="请选择年级">
                            <el-option :loading="addLoading"
                                       v-for="item in addFormInfo.grade"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="负责老师" prop="teacher">
                        <el-select v-model="addForm.teacher" placeholder="请选择负责老师">
                            <el-option :loading="addLoading"
                                       v-for="item in addFormInfo.teacher"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="班级名称" prop="name">
                        <el-input v-model="addForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="班级描述" prop="desc">
                        <el-input
                                type="textarea"
                                :rows="3"
                                placeholder="请输入班级描述"
                                v-model="addForm.desc">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="addFormVisible = false">取消</el-button>
                    <el-button type="primary" @click.native="addSubmit">提交</el-button>
                </div>
            </el-dialog>
        </section>
        <section v-else>
            <class-detail :id="classId" @close="detailClose"></class-detail>
        </section>
    </div>
</template>

<script>
    import {
        getDepartmentList,
        getGradeFilter,
        getBackstageStuAddInfo,
        addClass,
    } from '../../../api/api';
    import myFilter from '../../common/myFilter.vue'
    import Pagination from '../../common/Pagination.vue'
    import classDetail from './Detail.vue'
    import u from '../../../common/js/util';
    import _ from 'lodash';
    export default {
        data() {
            return {
                keyword: '',
                filter: {},
                list: [],
                totalCount: 0,
                pageNo: 1,
                pageSize: 10,
                listLoading: false,
                filterLoading: false,
                sels: [],//列表选中列
                // 手风琴选项的默认
                activeName: 0,
                // 重命名的排序索引
                resetIndex: '',
                // 过滤器数据
                filterList: [
                    {
                        title: '年级',
                        field: 'project',
                        children: [{
                            value: '14',
                            text: '14级'
                        }, {
                            value: '15',
                            text: '15级'
                        }, {
                            value: '16',
                            text: '16级'
                        }]
                    }],
                // 选择某个班级id
                classId: 0,

                // 添加班级
                addFormVisible: false,
                addLoading: false,
                isInlineMessage: true,
                addFormRules: {
                    name: [
                        { required: true, message: '请填写班级名称', trigger: 'blur' }
                    ],
                    collegeId: [
                        { required: true, message: '请选择院系', trigger: 'blur' }
                    ],
                    grade: [
                        { required: true, message: '请选择年级', trigger: 'blur' }
                    ],
                    teacher: [
                        { required: true, message: '请选择负责老师', trigger: 'blur' }
                    ],
                },
                //编辑界面数据
                addForm: {
                    collegeId: '',
                    grade: '',
                    teacher: ''
                },
                addFormInfo: {},
            }
        },
        methods: {
         /*   handleSizeChange(val) {
                //console.log(val);
            },*/
            // handleCurrentChange(val) {
            //     this.page = val;
            //     //this.getList();
            // },
            selsChange: function (sels) {
                this.sels = sels;
            },
            search(obj) {
                this.filter = obj;this.pageNo = 1;
                this.getList();
            },
            // 获取初始数据
            getDefaultData() {
                getGradeFilter({}).then((res) => {
                        res=res.data;
                        this.filterList = res;
                        // filter 对应key默认好 -1
                        this.filter = u.getDefaultFilter(this.filterList);
                        this.getList();
                    });
            },
            //获取用户列表
            getList() {
                if (_.isEmpty(this.filter)) return;
                let para = {
                    pageNo: this.pageNo,
                    filter: JSON.stringify(this.filter),
                    pageSize: this.pageSize,
                    keyword: this.keyword,
                };
                //console.log('para',para);
                this.listLoading = true;
                //NProgress.start();
                getDepartmentList(para).then((res) => {
                    this.list = res.data;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            changeCollapse(val) {
                console.log('changeCollapse', val);
            },
            // 重命名d
            resetNameEvent(e, id){
                e.stopPropagation();
                console.log('resetNameEvent',id);
                this.resetIndex = id;
            },
            // 保存重命名名称
            saveResetName(e, id) {
                e.stopPropagation();
                console.log('save name success index = ', id);
                this.resetIndex = '';
            },
            // 取消重命名
            cancelResetName(e) {
                e.stopPropagation();
                this.resetIndex = '';
            },
            isShowResetInput(index) {
                return index === this.resetIndex;
            },
            // 显示院系的详情面板
            detailShow(id) {
                this.classId = id;
            },
            // 关闭院系的详情面板
            detailClose() {
                this.classId = '';
            },
            departmentAdd() {},
            classAdd(e, index) {
                this.addFormVisible = true;
                // todo 院系，年级，老师，数据get
                if (_.isEmpty(this.addFormInfo)) {
                    getBackstageStuAddInfo({}).then(res => {
                        res=res.data;
                        this.addFormInfo = res;
                    });
                }
                e.stopPropagation();
            },
            //编辑
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(res => {
                            this.addLoading = true;
                            let para = _.assign({}, this.addForm);
                            addClass(para).then((res) => {
                                this.addLoading = false;
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.search();
                            });
                        }).catch(res=>{});
                    }
                });
            }
        },
        components: {
            'Page': Pagination,
            myFilter,
            classDetail,
        },
        computed: {

        },
        mounted() {
            this.getDefaultData();
        }
    }

</script>

<style lang="scss">
    @import '~scss_vars';

    #studentTable{
        .el-collapse {
            .el-collapse-item__content{
                padding: 0;
            }
        }
        .resetNameInput{
            width: 240px;
            display: inline-block;
        }
    }
</style>