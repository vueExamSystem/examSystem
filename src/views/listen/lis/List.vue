<template>
    <div>
        <section v-show="!detailId" v-loading="allLoading">
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
                                <el-button type="text" @click="detailShow(scope.row.id)">{{scope.row.name}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="endTime" label="剩余时间" min-width="120">
                        <template scope="scope">
                            <span>{{remainTime(scope.row.endTime)}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column prop="listener" label="监测老师" min-width="100">
                        </el-table-column>
                        <el-table-column prop="exammer" label="考试人员" min-width="120">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </section>
        <section v-if="detailId">
            <test-detail :id="detailId" @close="detailClose"></test-detail>
        </section>
    </div>
</template>
<script>
    import myFilter from '../../common/myFilter.vue'
    import {getListenFilter, getListenList} from '../../../api/api';
    import Pagination from '../../common/Pagination.vue';
    import _ from 'lodash';
    import testDetail from './Detail.vue'
    export default {
        components:{
            myFilter,
            Page:Pagination,
            testDetail
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

                detailId: '',

                fullPath: '',
                nowDate: new Date(),
                minuteTimeClock: '',
                secondTimeClock: ''
            }
        },
        methods: {
            detailShow(id) {
                this.detailId = id;
            },
            detailClose() {
                this.detailId = '';
            },
            handleCurrentChange(val) {
                this.pageNo = val;
                this.getUsers();
            },
            search(obj) {
                this.filter = obj;this.pageNo = 1;
                this.getList();
            },
            //获取用户列表
            getList() {
                this.clearMinuteClock();
                this.clearSecondClock();
                let para = {
                    pageNo: this.pageNo,
                    filter: JSON.stringify(this.filter),
                    keyword: this.keyword,
                    pageSize: this.pageSize,
                };
                if (!this.allLoading) this.listLoading = true;
                getListenList(para).then((res) => {
                    res = res.data;
                    this.totalCount = res.totalCount;
                    this.rows = res.rows;

                    //重启计时器
                    this.minuteTimeClockRun();
                    this.secondTimeClockRun();

                    if (!this.allLoading) this.listLoading = false;
                    if (this.allLoading) this.allLoading = false;
                });
            },
            // 获取过滤器数据
            getFilter() {
                this.allLoading = true;
                getListenFilter({}).then((res) => {
                    this.filterList = res.data;
                    this.getList();
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
                var totalSeconds = this.getRemainSeconds(dateString);//剩余总秒数
                if(totalSeconds <= 0){
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
            clearMinuteClock(){
                if(this.minuteTimeClock){
                    clearInterval(this.minuteTimeClock);
                }
            },
            clearSecondClock(){
                if(this.secondTimeClock){
                    clearInterval(this.secondTimeClock);
                }
            }
        },
        mounted() {
            this.fullPath = this.$route.fullPath;
            this.getFilter();
            this.minuteTimeClockRun();
            this.secondTimeClockRun();
        }
    }
</script>
<style scoped lang="scss">
    @import '~scss_vars';
    .filter-wrap{
        margin-bottom: 20px;
    }
</style>
