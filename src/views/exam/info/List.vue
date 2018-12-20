<template>
	<div>
        <section v-show="!detailId && !editExamId" v-loading="allLoading">
    		<my-filter v-if="filterList.length > 0" :list="filterList" @callback="search" v-loading="filterLoading"></my-filter>
            <div class="panel">
                <div class="title">
                    <el-input placeholder="请输入搜索关键词" v-model="keyword">
                        <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
                    </el-input>
                    <div class="pageArea">
                        <Page :pageNo="pageNo" :totalCount="totalCount" :pageSize="pageSize" @page-change="handleCurrentChange"></Page>
                    </div>
                    
                </div>
                <div class="content">
                    <el-table :data="rows" highlight-current-row v-loading="listLoading" style="width: 100%;">
                        <el-table-column type="index" label="序号" width="100">
                        </el-table-column>
                        <el-table-column prop="name" label="考试名称" min-width="160">
                            <template scope="scope">
                                <el-button type="text" @click="detailShow(scope.row)">{{scope.row.name}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="paper" label="选择试卷" min-width="160">
                          <!--   <template slot-scope="scope">
                                <span v-if="scope.row.paper">{{scope.row.paper.name}}</span>
                            </template> -->
                        </el-table-column>
                        <el-table-column prop="beginTime" :formatter="timeRangeFormatter" label="考试时间" min-width="180">
                        </el-table-column>
                        <el-table-column prop="status" label="状态">
                            <template scope="scope">
                                <span class="text-danger" v-if="scope.row.status == '0'">编辑中</span>
                                <span class="text-warning" v-else-if="scope.row.status == '1'">已发布</span>
                                <span class="text-success" v-else-if="scope.row.status == '2'">考试中</span>
                                <span v-else>已结束</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="teachers" label="监考老师">
                         <!--    <template slot-scope="scope">
                                <span v-if="scope.row.listener">{{scope.row.listener.name}}</span>
                            </template> -->
                        </el-table-column>
                        <el-table-column prop="groups" label="考试人员" min-width="160">
            <!--                 <template slot-scope="scope">
                                <span v-if="scope.row.testClass">{{scope.row.testClass.name}}</span>
                            </template> -->
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="100">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" @click="handleEdit(scope.row)" :disabled="scope.row.status == '2' || scope.row.status == '3'">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <!--编辑界面-->
            <el-dialog title="编辑课程" :visible.sync="editFormVisible" class="noPadding" id="dialogExam">
                <exam-add v-if="editFormVisible" @toTable="afterSubmit" :formObj="formObj" ref="editForm"></exam-add>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="cancelEdit">取消</el-button>
                    <el-button type="primary" @click.native="editSubmit" v-loading="editLoading">提交</el-button>
                </div>
            </el-dialog>
    	</section>
        <section v-if="detailId">
            <detail   :id="detailId" :name="detailName" :endtime="detailEndTime" @close="detailClose"></detail>
        </section>
        <section v-if="editExamId">
            <exam-edit :id="editExamId" @close="detailClose" :initable="1"></exam-edit>
        </section>
    </div>
</template>
<script>
	import myFilter from '../../common/myFilter.vue'
    import { 
        getExamQueryFilter, 
        getExamList
    } from '../../../api/api';
    import Pagination from '../../common/Pagination.vue';
    import _ from 'lodash';
    import detail from './Detail.vue'
    import examAdd from '../publish/Add.vue'
    import examEdit from '../publish/AddClasses.vue'
    export default {
        components:{
        	myFilter,
        	Page:Pagination,
            detail,
            examAdd,
            examEdit
        },
        data() {
            return {
                filterList:[],
                keyword: '',
                filter: {},
                rows: [],
                totalCount: 0,
                pageNo: 1,
                pageSize: 10,
                listLoading: false,
                filterLoading: false,
                allLoading: false,

                detailId: '', //考试当前详情
                detailInfo: '',
                detailName: '',
                detailEndTime: '',

                editExamId: '',//编辑考生

                formObj: {},
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,

                fullPath: '',
                minuteTimeClock: ''
            }
        },
        methods: {
            //显示编辑界面
            handleEdit: function (row) {
                this.clearMinuteClock();
                this.editFormVisible = true;
                //console.log('row',row.dutyTeachers.split(','));
                var arTeachers=row.dutyTeachers.split(',');//监考老师int数组
                for(var i = 0;i < arTeachers.length;i++){
                    arTeachers[i]=parseInt(arTeachers[i]);
                }
                this.formObj = _.assign({}, row, {
                    id: row.id ? row.id : '',
                    paper: row.paper ? row.paperId : '',
                    course: row.course ? row.courseId : '',
                    department: row.department ? row.department.id : '',
                    class: row.testClass ? row.testClass.id : '',
                    teacher: row.dutyTeachers ? arTeachers : '',
                    beginTime: row.beginTime ? row.beginTime : '',
                    endTime: row.endTime ? row.endTime : ''
                });
                //console.log('formObj',this.formObj);
            },
            //编辑
            editSubmit() {
                this.$refs.editForm.onSubmit('form');
            },
            afterSubmit(){//编辑过后
                this.editFormVisible = false;
                this.getList();
            },
            cancelEdit(){//取消编辑
                this.editFormVisible = false; 
                this.formObj = {};
                this.minuteTimeClockRun();
            },
            detailShow(row) {
                if(row.status == '0'){//未发布
                    this.editExamId = row.id;
                }else{//已发布
                    this.detailId = row.id;
                    this.detailInfo = row;
                    this.detailName = row.name;
                    this.detailEndTime = row.endTime;
                }
                
            },
            detailClose(isRefresh) {
                this.detailId = '';
                this.editExamId = '';
                if(isRefresh){
                    this.getList();
                }
            },
            handleCurrentChange(val) {
                this.pageNo = val;
                this.getList();
            },
            search(obj) {
                this.filter = obj;this.pageNo = 1;
                this.getList();
            },
            //获取列表
            getList() {
                this.clearMinuteClock();
                let para = {
                    pageNo: this.pageNo,
                    filter: JSON.stringify(this.filter),
                    keyword: this.keyword,
                    pageSize: this.pageSize,
                };
                if (!this.allLoading) this.listLoading = true;
                getExamList(para).then((res) => {
                    res=res.data;
                    //console.log('getExamList',res);
                    this.totalCount = res.totalCount;
                    this.rows = res.rows;

                    if (!this.allLoading) this.listLoading = false;
                    if (this.allLoading) this.allLoading = false;
                    this.minuteTimeClockRun();//分计时器启动
                });
            },
            // 获取过滤器数据
            getFilter() {
                this.allLoading = true;
                getExamQueryFilter({}).then((res) => {
                    this.filterList = res.data;
                    this.getList();
                });
            },
            minuteTimeClockRun(){//每分钟刷新表格
                this.clearMinuteClock();
                this.minuteTimeClock = setInterval(()=>{
                    if(this.$route.fullPath != this.fullPath){
                        this.clearMinuteClock();
                    }else{
                        this.getList();
                    }
                }, 60000);
            },
            clearMinuteClock(){//分计时器关闭
                if(this.minuteTimeClock){
                    clearInterval(this.minuteTimeClock);
                }
            },
            timeRangeFormatter(row){//时间范围格式化
                var st = row.beginTime;
                var et = row.endTime;
                var etStr = et.split(' ')[1];
                return st + '-' + etStr;
            }
        },
        mounted() {
            this.fullPath = this.$route.fullPath;
            this.getFilter();
        }
    }
</script>
<style scoped lang="scss">
    @import '~scss_vars';
    .filter-wrap{
        margin-bottom: 20px;
    }
</style>
<style>
    #dialogExam .el-form .el-button{
        display: none;
    }
</style>
