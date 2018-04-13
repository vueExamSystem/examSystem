<template>
    <div>
        <section v-if="courseId === ''" id="courseTable" v-loading="allLoading">
            <my-filter v-if="filterList.length > 0" :list="filterList" @callback="search"></my-filter>
            <div class="panel">
                <div class="title">
                    <el-input placeholder="请输入搜索关键词" v-model="keyword">
                        <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
                    </el-input>
                    <el-button type="success" @click="teamAdd" class="el-button-shadow">添加学期</el-button>
                    <el-button type="success" @click="teamCourseAdd" class="el-button-shadow">添加课表</el-button>

                    <!--分页-->
                    <div class="pageArea">
                        <Page :current="pageNo" :totalCount="totalCount" :pageSize="pageSize" @page-change="handleCurrentChange"></Page>
                    </div>

                </div>

                <div class="content">
                    <!--列表-->
                    <el-table :data="rows" highlight-current-row v-loading="listLoading" style="width: 100%;">
                        <el-table-column type="index" label="ID">
                        </el-table-column>
                        <el-table-column prop="course" label="课程" sortable>
                            <template scope="scope">
                                <el-button type="text" @click="detailShow(scope.row.courseId,scope.row.termId)">{{scope.row.course}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="teacher" label="授课老师">
                        </el-table-column>
                        <el-table-column prop="term" label="学期">
                        </el-table-column>
                        <el-table-column prop="groups" label="班级名称">
                        </el-table-column>
                       <!--  <el-table-column
                                label="操作"
                                width="100">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" @click="courseAdd($event, scope.$index, scope.row)">添加</el-button>
                            </template>
                        </el-table-column> -->
                    </el-table>
                </div>
            </div>

            <!--添加学期界面-->
            <el-dialog title="添加学期" :visible.sync="addTeamVisible">
                <el-form :model="addTeam" label-width="120px" :rules="addTeamRules" ref="addTeam" :inline-message="isInlineMessage" v-loading="addLoading">
                    <el-form-item label="学期名称" prop="name">
                        <el-input v-model="addTeam.name"></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间：" prop="beginTime">
                        <el-date-picker type="datetime" placeholder="请选择开始时间" format="yyyy/MM/dd" value-format="yyyy/MM/dd" v-model="addTeam.beginTime" style="width: 240px;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间：" prop="endTime">
                        <el-date-picker type="datetime" placeholder="请选择结束时间" format="yyyy/MM/dd" value-format="yyyy/MM/dd" v-model="addTeam.endTime" style="width: 240px;"></el-date-picker>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="addTermClose">取消</el-button>
                    <el-button type="primary" @click.native="addTeamSubmit">提交</el-button>
                </div>
            </el-dialog>
            <!--添加课表界面-->
            <el-dialog title="添加课表" :visible.sync="addTeamCourseVisible">
                <el-form :model="addTeamCourse" label-width="80px" :rules="addTeamCourseRules" ref="addTeamCourse" :inline-message="isInlineMessage" v-loading="addLoading">
                    <el-form-item label="所属学期" prop="termId">
                        <el-select v-model="addTeamCourse.termId" placeholder="请选择学期">
                            <el-option :loading="addLoading"
                                       v-for="item in addFormInfo.term"
                                       :key="item.value"
                                       :label="item.text"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属课程" prop="courseId">
                        <el-select v-model="addTeamCourse.courseId" placeholder="请选择课程">
                            <el-option :loading="addLoading"
                                       v-for="item in addFormInfo.course"
                                       :key="item.value"
                                       :label="item.text"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="addTeamCourseVisible = false">取消</el-button>
                    <el-button type="primary" @click.native="addTeamCourseSubmit">提交</el-button>
                </div>
            </el-dialog>
            <!--添加课程界面-->
            <el-dialog title="添加班级" :visible.sync="addCourseVisible">
                <el-form :model="addCourse" label-width="80px" :rules="addCourseRules" ref="addCourse" :inline-message="isInlineMessage" v-loading="addLoading">
                    <el-form-item label="所属院系" prop="collegeId">
                        <el-select v-model="addCourse.collegeId" placeholder="请选择院系">
                            <el-option :loading="addLoading"
                                       v-for="item in addFormInfo.college"
                                       :key="item.value"
                                       :label="item.text"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属年级" prop="gradeId">
                        <el-select v-model="addCourse.gradeId" placeholder="请选择年级">
                            <el-option :loading="addLoading"
                                       v-for="item in addFormInfo.grade"
                                       :key="item.value"
                                       :label="item.text"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属班级" prop="classId">
                        <el-select v-model="addCourse.classId" placeholder="请选择班级">
                            <el-option :loading="addLoading"
                                       v-for="item in addFormInfo.group"
                                       :key="item.value"
                                       :label="item.text"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item>
                           <el-checkbox style="margin-left:-80px;" v-model="addCourse.isAll">班级学生全部参加</el-checkbox>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="addCourseGroupClose">取消</el-button>
                    <el-button type="primary" @click.native="addCourseSubmit">提交</el-button>
                </div>
            </el-dialog>
        </section>
        <section v-else>
            <course-detail :id="courseId" :termId="termId" @close="detailClose"></course-detail>
        </section>
    </div>
</template>

<script>
    import {
        getSelectCourseList,
        getBackCourseFilter,
        addTerm,
        getAddTermCourseFilter,
        addTermCourse,
        addCourseGroup
    } from '../../../api/api';
    import myFilter from '../../common/myFilter.vue'
    import Pagination from '../../common/Pagination.vue'
    import courseDetail from './AddClasses.vue'
    import u from '../../../common/js/util';
    import _ from 'lodash';
    export default {
        data() {
            return {
                keyword: '',
                filter: {
                    statistics: 'exam',
                    type: 'list',
                },
                rows: [],
                totalCount: 0,
                pageNo: 1,
                pageSize: 30,
                listLoading: false,
                allLoading: false,

                // 过滤器数据
                filterList: [
                    {
                        title: '课程',
                        field: 'project',
                        children: [{
                            value: 'physics',
                            text: '大学物理'
                        }, {
                            value: 'mathematics',
                            text: '高等数学'
                        }, {
                            value: 'english',
                            text: '大学英语'
                        }]
                    }],
                // 选择某个班级id
                courseId: '',
                termId:'',
                selectCourseId:'',
                selectTermId:'',
                //addTeam 添加学期
                addTeamVisible: false,
                addTeamRules: {
                    name: [
                        { required: true, message: '请填写学期名称', trigger: 'blur' }
                    ],
                    beginTime:{required:true, message: '请选择开始时间', trigger:'change'},
                    endTime:{required:true, message: '请选择结束时间', trigger:'change'}
                },
                //编辑界面数据
                addTeam: {
                    name: '',
                    beginTime: '',
                    endTime: '',
                },
                //addTeamCourse 添加课表
                addTeamCourseVisible: false,
                addTeamCourseRules: {
                    termId: [
                        { required: true, message: '请选择学期', trigger: 'blur' }
                    ],
                    courseId: [
                        { required: true, message: '请选择课程', trigger: 'blur' }
                    ],
                },
                //编辑界面数据
                addTeamCourse: {},
                //addCourse 添加班级
                addCourseVisible: false,
                addCourseRules: {
                    collegeId: [
                        { required: true, message: '请选择院系', trigger: 'blur' }
                    ],
                    gradeId: [
                        { required: true, message: '请选择年级', trigger: 'blur' }
                    ],
                    classId: [
                        { required: true, message: '请选择班级', trigger: 'blur' }
                    ],
                },
                //编辑界面数据
                addCourse: {},

                addLoading: false,
                isInlineMessage: true,
                addFormInfo: {},
            }
        },
        methods: {
            formatClass: function (row, column) {
                return row.className.join('，');
            },
            handleSizeChange(val) {
                //console.log(val);
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            search(obj) {
                this.filter = obj;this.pageNo = 1;
                //console.log(this.filter);
                this.getList();
            },
             // 获取初始数据
            getDefaultData() {
                this.allLoading = true;
                getBackCourseFilter({}).then((res) => {
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

                if (!this.allLoading) this.listLoading = true;
                getSelectCourseList(para).then((res) => {
                    res = res.data;
                    this.totalCount = res.totalCount;
                    this.rows = res.rows;

                    if (!this.allLoading) this.listLoading = false;
                    if (this.allLoading) this.allLoading = false;
                });
            },
            changeCollapse(val) {
                console.log('changeCollapse', val);
            },
            // 显示详情面板
            detailShow(coursId,termId) {
                this.courseId = coursId;
                this.termId=termId;
                console.log('coursId',coursId,"termId",termId);
            },
            // 关闭详情面板
            detailClose() {
                this.courseId = '';
                this.termId='';
            },
            // 弹框添加
            teamAdd(e, index) {
                this.addTeamVisible = true;
                e.stopPropagation();
            },
            teamCourseAdd(e, index) {
                this.addTeamCourseVisible = true;
                // todo 数据get
                if (_.isEmpty(this.addFormInfo)) {
                    getAddTermCourseFilter({}).then(res => {
                        res=res.data;
                        this.addFormInfo = res;
                    });
                }
                e.stopPropagation();
            },
            courseAdd(e, index,row) {
                this.addCourseVisible = true;
                this.selectCourseId=row.courseId;
                this.selectTermId=row.termId;
                // todo 数据get
                if (_.isEmpty(this.addFormInfo)) {
                    getAddTermCourseFilter({}).then(res => {
                        res=res.data;
                        this.addFormInfo = res;
                    });
                }
                e.stopPropagation();
            },
            addTermClose:function(){
                        this.$refs['addTeam'].resetFields();
                        this.addTeamVisible = false;
                        this.addLoading=false;
            },
            // 添加 提交
            addTeamSubmit: function () {
                this.$refs.addTeam.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(res => {
                            this.addLoading = true;
                            let para = _.assign({}, this.addTeam);
                            addTerm(para).then((res) => {
                                this.addLoading = false;
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addTeam'].resetFields();
                                this.addTeamVisible = false;
                                this.search();
                            });
                        }).catch(res=>{});
                    }
                });
            },
            addTermCourseClose:function(){
                        this.$refs['addTeamCourse'].resetFields();
                        this.addTeamVisible = false;
                        this.addLoading=false;
            },
            addTeamCourseSubmit: function () {
                this.$refs.addTeamCourse.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(res => {
                            this.addLoading = true;
                            let para = _.assign({}, this.addTeamCourse);
                            addTermCourse(para).then((res) => {
                                this.addLoading = false;
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addTeamCourse'].resetFields();
                                this.addTeamCourseVisible = false;
                                this.search();
                            });
                        }).catch(res=>{});
                    }
                });
            },
            addCourseGroupClose:function(){
                        this.$refs['addCourse'].resetFields();
                        this.addCourseVisible = false;
                        this.addLoading = false;
            },
            addCourseSubmit: function () {
                this.$refs.addCourse.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(res => {
                            this.addLoading = true;
                            //let para = _.assign({}, this.addCourse);
                            let para={
                                courseId:this.selectCourseId,
                                termId:this.selectTermId,
                                collegeId:this.addCourse.collegeId,
                                gradeId:this.addCourse.gradeId,
                                groupId:this.addCourse.classId,
                                isAll:this.addCourse.isAll
                            }
                            //console.log('addCourseGroup',para);
                            addCourseGroup(para).then((res) => {
                                this.addLoading = false;
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addCourse'].resetFields();
                                this.addCourseVisible = false;
                                this.search();
                            });
                        }).catch(res=>{});
                    }
                });
            },
        },
        components: {
            'Page': Pagination,
            myFilter,
            courseDetail,
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

</style>