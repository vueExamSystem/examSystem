<template>
    <div class="panel">
        <div class="title">
            <span>{{info.name}}（{{remainTime(info.endTime)}}）</span>
            <div class="pull-right">
                <el-button type="danger" class="el-button-shadow" @click="close">关闭</el-button>
            </div>
        </div>
        <div class="content" v-loading="allLoading">
            <my-filter v-if="filterList.length > 0" :list="filterList" @callback="search" v-loading="filterLoading"></my-filter>
            <div class="paper-progress" v-if="isShowProgress">
                <table>
                    <tr>
                        <td>已完成比例</td>
                        <td>
                            <i class="el-icon-loading" v-show="stat_Loading"></i>
                            <el-progress v-show="!stat_Loading" :percentage="completePCT * 100" :stroke-width="12"></el-progress>
                        </td>
                        <td>在线人数/不在线/总人数</td>
                        <td>
                            <i class="el-icon-loading" v-show="stat_Loading"></i>
                            <span v-show="!stat_Loading">{{onlineCount}}/{{outlineCount}}/{{countTotal}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>已交卷比例</td>
                        <td>
                            <i class="el-icon-loading" v-show="stat_Loading"></i>
                            <el-progress v-show="!stat_Loading" :percentage="submitPCT * 100" :stroke-width="12"></el-progress>
                        </td>
                        <td>考试总体平均答题</td>
                        <td>
                            <i class="el-icon-loading" v-show="stat_Loading"></i>
                            <el-progress v-show="!stat_Loading" :percentage="avgExamPCT * 100" :stroke-width="12"></el-progress>
                        </td>
                    </tr>
                    <tr>
                        <td>未开始答卷</td>
                        <td>
                            <i class="el-icon-loading" v-show="stat_Loading"></i>
                            <el-progress v-show="!stat_Loading" :percentage="unExamPCT * 100" :stroke-width="12"></el-progress>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
            <div class="panel inner-panel">
                <div class="title">
                    <el-input placeholder="请输入搜索关键词" v-model="stu_keyword">
                        <el-button slot="append" icon="el-icon-search" @click="getStudent"></el-button>
                    </el-input>
                    <div class="pageArea">
                        <Page :pageNo="stu_pageNo" :totalCount="stu_totalCount" :pageSize="pageSize" @page-change="studentPageChange"></Page>
                    </div>
                </div>
                <div class="content">
                    <template v-if="info.status == '1'">
                        <el-table :data="studentRows" highlight-current-row v-loading="stu_Loading" fit>
                            <el-table-column type="index" label="序号" width="60">
                            </el-table-column>
                            <el-table-column prop="studentNo" label="学号" min-width="120"></el-table-column>
                            <el-table-column prop="name" label="姓名" min-width="100"></el-table-column>
                            <el-table-column prop="class" label="班级" min-width="160"></el-table-column>
                        </el-table>
                    </template>
                    <template v-else-if="info.status == '2'">
                        <el-table :data="studentRows" highlight-current-row v-loading="stu_Loading" fit>
                            <el-table-column type="index" label="序号" width="60">
                            </el-table-column>
                            <el-table-column prop="studentNo" label="学号" min-width="120"></el-table-column>
                            <el-table-column prop="name" label="姓名" min-width="100"></el-table-column>
                            <el-table-column prop="class" label="班级" min-width="160"></el-table-column>
                            <el-table-column prop="percentage" label="考试进度" min-width="150">
                                <template scope="scope">
                                    <el-progress :percentage="scope.row.percentage" :stroke-width="12"></el-progress>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                    <template v-else>
                        <el-table :data="studentRows" highlight-current-row v-loading="stu_Loading" fit>
                            <el-table-column type="index" label="序号" width="60">
                            </el-table-column>
                            <el-table-column prop="studentNo" label="学号" min-width="120"></el-table-column>
                            <el-table-column prop="name" label="姓名" min-width="100"></el-table-column>
                            <el-table-column prop="class" label="班级" min-width="160"></el-table-column>
                            <el-table-column prop="percentage" label="得分" min-width="150">
                                <template scope="scope">
                                    {{80}}
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import myFilter from '../../common/myFilter.vue'
    import { //api
        getListenDetailFilter, //过滤器
        getListentStatistics, //百分比数据（保留两位）
        getListenDetailList, //考试人员列表
    } from '../../../api/api';
    import Pagination from '../../common/Pagination.vue';
    import _ from 'lodash';
    export default{
        props:{
            id:{
                required: true
            },
            info:{
                required: true
            }
        },
        components:{
            myFilter,
            'Page': Pagination
        },
        data(){
            return {
                allLoading: true,
                filter: {},
                filterLoading: false,
                filterList: [],
                pageSize: 10,

                isShowProgress: false,//是否显示进度

                studentRows: [],//考试学生列表
                stu_Loading: false,
                stu_keyword: '',
                stu_totalCount: 0,
                stu_pageNo: 1,

                stat_Loading: true,
                completePCT: 0, //已完成比例
                onlineCount: 0, //在线人数
                outlineCount: 0, //不在线
                countTotal: 0, //参考总人数
                submitPCT: 0, //已交卷比例
                avgExamPCT: 0, //考试总体平均答题
                unExamPCT: 0, //未开始答卷

                fullPath: '',
                nowDate: new Date(),
                minuteTimeClock: '',
                secondTimeClock: ''
            }
        },
        methods:{
            close() {
                this.$emit('close');
            },
            search(obj) {//filter回调
                this.filter = obj;
                this.stu_pageNo = 1;
                this.getList();
            },
            getFilter() {// 获取过滤器数据
                this.filterLoading = true;
                this.allLoading = true;
                var para = {
                    paperId: this.id //考试id
                };
                getListenDetailFilter(para).then((res) => {
                    this.filterList = res.data;
                    this.filterLoading = false;
                    this.getList();
                });
            },
            getList() {//获取列表
                this.clearMinuteClock();
                var callback = ()=>{
                    if(!this.stat_Loading && !this.stu_Loading) {
                        this.minuteTimeClockRun();//分计时器启动
                        if(this.allLoading) this.allLoading = false;
                    }
                };
                this.getStatistics(callback); // 统计信息
                this.getStudent(callback); //考试人员列表
            },
            studentPageChange(val) {//考试人员分页回调
                this.stu_pageNo = val;
                this.getStudent();
            },
            getStatistics(callback){ // 统计信息
                let basePara = {
                    paperId: this.id,//考试id
                };
                this.stat_Loading = true;
                getListentStatistics(basePara).then((res) => {
                    res = res.data;
                    this.completePCT = res.complete; //已完成比例
                    this.onlineCount = res.online; //在线人数
                    this.outlineCount = res.outline; //不在线
                    this.countTotal = res.total; //参考总人数
                    this.submitPCT = res.submitted; //已交卷比例
                    this.avgExamPCT = res.avgExam; //考试总体平均答题
                    this.unExamPCT = res.unExam; //未开始答卷
                    this.stat_Loading = false;
                    if(callback) callback();
                });
            },
            getStudent(callback){ //考试人员列表
                let detailPara = {
                    paperId: this.id,//考试id
                    pageNo: this.stu_pageNo,
                    filter: JSON.stringify(this.filter),
                    keyword: this.stu_keyword,
                    pageSize: this.pageSize,
                };
                this.stu_Loading = true;
                getListenDetailList(detailPara).then((res) => {
                    res = res.data;
                    this.stu_totalCount = res.totalCount;
                    this.studentRows = res.rows;
                    this.stu_Loading = false;
                    if(callback) callback();
                });
            },
            dateParse(dateString){
                return new Date(dateString);
            },
            getRemainSeconds(dateString){//获取剩余总秒数
                var thisD = this.dateParse(dateString);
                var totalSeconds = (thisD.getTime() - this.nowDate.getTime());
                return totalSeconds;
            },
            remainTime(dateString, isDynamic){//倒计时
                if(this.info.status == '1' || this.info.status == '3'){//未开始||已结束
                    var st = this.info.beginTime;
                    var et = this.info.endTime;
                    var etStr = et.split(' ')[1];
                    return st + '-' + etStr;
                } else {//进行中
                    var totalSeconds = this.getRemainSeconds(dateString);//剩余总秒数
                    if(totalSeconds <= 0){
                        this.clearSecondClock();//关闭计时器
                        return '考试结束';
                    }else{
                        var hourStr = '0';
                        var minuteStr = '0';
                        var secondStr = '0';
                        var minuteSeconds = 1000 * 60;//一分钟毫秒数
                        var hourSeconds = minuteSeconds * 60;//一小时毫秒数
                        var remainHours = Math.floor(totalSeconds / hourSeconds);//对应剩余小时
                        var remainMinutes = Math.floor(totalSeconds % hourSeconds / minuteSeconds);//对应剩余分钟
                        var remainSeconds = Math.floor(totalSeconds % hourSeconds % minuteSeconds / 1000);//对应剩余秒
                        if(remainHours < 10){//剩余小时小于10小时
                            hourStr += remainHours;
                        }else{
                            hourStr = remainHours + '';
                        }
                        if(remainMinutes < 10){//剩余分钟小于10分钟
                            minuteStr += remainMinutes;
                        }else{
                            minuteStr = remainMinutes + '';
                        }
                        if(remainSeconds < 10){//剩余秒小于10秒
                            secondStr += remainSeconds;
                        }else{
                            secondStr = remainSeconds + '';
                        }
                        

                        return hourStr + ':' + minuteStr + ':' + secondStr;
                    }
                }
            },
            minuteTimeClockRun(){//每分钟刷新表格
                this.minuteTimeClock = setInterval(()=>{
                    if(this.$route.fullPath != this.fullPath){
                        this.clearMinuteClock();
                    }else{
                        this.getList();
                    }
                }, 60000);
            },
            secondTimeClockRun(){//每秒刷新剩余时间一次
                this.secondTimeClock = setInterval(()=>{
                    if(this.$route.fullPath != this.fullPath){
                        this.clearSecondClock();
                    }else{
                        this.nowDate = new Date();
                    }
                }, 1000);
            },
            clearMinuteClock(){//分计时器关闭
                if(this.minuteTimeClock){
                    clearInterval(this.minuteTimeClock);
                }
            },
            clearSecondClock(){//秒计时器关闭
                if(this.secondTimeClock){
                    clearInterval(this.secondTimeClock);
                }
            }
        },
        mounted() {
            this.fullPath = this.$route.fullPath;
            this.getFilter();
            if(this.info.status == '1'){//未开始
                this.isShowProgress = false;
            }else if(this.info.status == '2'){//进行中
                this.isShowProgress = true;
                this.secondTimeClockRun();//秒计时器启动
            }else{//已结束
                this.isShowProgress = true;
            }
        }
    }
</script>
<style lang="scss" scoped="">
    @import '~scss_vars';
    .filter-wrap{
        box-shadow: none;
        border-radius: 0;
    }
    .inner-panel{
        .content{
            border-width: 0;
        }
    }
</style>