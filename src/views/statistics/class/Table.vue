<template>
    <section id="depStatistics" v-loading="allLoading">
        <my-filter v-if="filterList.length > 0" :list="filterList" @callback="search" @callbackSelect="selectSearch" v-loading="filterLoading" @linkage="linkage"></my-filter>
        <div v-bind:class="[ showExamChart || showScoreChart ? 'noBottom' : '', 'panel' ]">
            <div class="title">
                <span>{{mainTitle}}</span>
            </div>

            <div class="content">
                <my-filter :list="filterListTable" :noBottomBorder="true" @callback="statChange"></my-filter>
                <div v-if="showExamTable">
                   <!--  <div class="title">
                        <el-input placeholder="请输入搜索关键词" v-model="keyword">
                            <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
                        </el-input>
                        <div class="pageArea">
                            <Page :pageNo="pageNo" :totalCount="totalCount" :pageSize="pageSize" @page-change="handleCurrentChange"></Page>
                        </div>
                    </div> -->
                    <!--列表-->
                    <el-table :data="rows" highlight-current-row v-loading="listLoading" style="width: 100%;">
                        <el-table-column type="index" label="ID">
                        </el-table-column>
                        <el-table-column prop="courseName" label="课程" sortable>
                        </el-table-column>
                        <el-table-column prop="termName" label="学期" sortable>
                        </el-table-column>
                        <el-table-column prop="studentNo" label="学号" sortable>
                        </el-table-column>
                        <el-table-column prop="examScore" label="考试分数" sortable>
                        </el-table-column>
                        <el-table-column prop="testScore" label="测验分数" sortable>
                        </el-table-column>
                        <el-table-column prop="previewScore" label="预习分数" sortable>
                        </el-table-column>
                        <el-table-column prop="totalScore" label="总体成绩" sortable>
                        </el-table-column>
                        <el-table-column prop="rank" label="等级">
                        </el-table-column>
                    </el-table>
                </div>
                <div v-if="showScoreTable">
                    <div class="title">
                        <el-input placeholder="请输入搜索关键词" v-model="keyword">
                            <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
                        </el-input>
                        <div class="pageArea">
                            <Page :pageNo="pageNo" :totalCount="totalCount" :pageSize="pageSize" @page-change="handleCurrentChange"></Page>
                        </div>

                    </div>
                    <!--列表-->
                    <el-table :data="rows" highlight-current-row v-loading="listLoading" style="width: 100%;">
                        <el-table-column type="index" label="ID">
                        </el-table-column>
                        <el-table-column prop="course" label="课程" sortable>
                        </el-table-column>
                        <el-table-column prop="team" label="学期" sortable>
                        </el-table-column>
                        <el-table-column prop="class" label="班级" sortable>
                        </el-table-column>
                        <el-table-column prop="highest" label="最高分" sortable>
                        </el-table-column>
                        <el-table-column prop="lowest" label="最低分" sortable>
                        </el-table-column>
                        <el-table-column prop="average" label="平均分" sortable>
                        </el-table-column>
                        <el-table-column prop="passNum" label="及格人数" sortable>
                        </el-table-column>
                        <el-table-column prop="passPercent" label="及格率" sortable>
                        </el-table-column>
                    </el-table>
                </div>
                <div v-if="showExamChart" class="panel">
                    <div class="title samll">
                        <span>大学物理</span>
                    </div>
                   <!--  <div class="content chart">
                        <ul class="chart-ul clearfix">
                            <template v-for="item in rows">
                                <li class="chart-li" :key="item.id">
                                    <div class="chart-area">
                                        <template v-if="item.id !== undefined">
                                            <chart :index="item.id"></chart>
                                        </template>
                                    </div>
                                    <ul class="chart-text">
                                        <li class="text-li">最高分：97分</li>
                                        <li class="text-li">最低分：27分</li>
                                        <li class="text-li">平均分：65分</li>
                                        <li class="text-li">及格人数：287人</li>
                                        <li class="text-li">及格率：87%</li>
                                    </ul>
                                    <div class="chart-mid">课程名称</div>
                                </li>
                            </template>
                             <chart :index="1"></chart>
                        </ul>
                    </div> -->
                   <div class="content chart">
                    <template>
                        <div id="chart" style="width:100%;height:100%"></div>
                    </template>
                   </div> 
                </div>
                <div v-if="showScoreChart" class="panel">
                    <div class="title samll">
                        <span>大学物理11</span>
                    </div>
                    <!-- <div class="content chart">
                        <ul class="chart-ul clearfix">
                            <template v-for="item in rows">
                                <li class="chart-li" :key="item.id">
                                    <div class="chart-area">
                                        <template v-if="item.id !== undefined">
                                            <chart :index="item.id"></chart>
                                        </template>
                                    </div>
                                    <ul class="chart-text">
                                        <li class="text-li">最高分：97分</li>
                                        <li class="text-li">最低分：27分</li>
                                        <li class="text-li">平均分：65分</li>
                                        <li class="text-li">及格人数：287人</li>
                                        <li class="text-li">及格率：87%</li>
                                    </ul>
                                    <div class="chart-mid">课程名称</div>
                                </li>
                            </template>
                        </ul>
                    </div> -->
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {
        getStatisticsGroupInfo,
        getStatisticsGroupFilter,
        getStatisticsStudentList,
        getStatStuClassFilter,
        getStatStuStudentNoFilter,
    } from '../../../api/api';
    import myFilter from '../../common/myFilter.vue'
    import Pagination from '../../common/Pagination.vue'
    import _ from 'lodash';
    import echarts from 'echarts';
    import u from '../../../common/js/util';

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

                selectType:'list',
                chartData:'',//图表数据
                chart: null,
                loading: false,

                mainTitle:'',
                filterList: [],
                filterListTable: [
                   /* {
                        title: '统计',
                        field: 'statistics',
                        noAll: true,
                        noBottomBorder: true,
                        children: [{
                            value: 'exam',
                            text: '考试'
                        }, {
                            value: 'score',
                            text: '成绩'
                        }]
                    },*/
                     {
                        title: '类型',
                        field: 'type',
                        noAll: true,
                        children: [{
                            value: 'list',
                            text: '列表'
                        }, {
                            value: 'chart',
                            text: '图表'
                        }]
                    },
                ],

            }
        },
        methods: {
            handleCurrentChange(val) {
                this.pageNo = val;
                this.getList();
            },
            statChange(obj){
                console.log('obj',obj);
                this.selectType=obj.type;
                this.filter.type=obj.type;
                /*this.filter.type='chart';
                //load chart data
                 this.filter = _.assign(this.filter, obj);
                if(this.filter.studentNo!=undefined&&this.filter.studentNo>-1){

                }*/
                if(this.selectType==='chart'){
                    setTimeout(this.drawCharts, 100);
                    // this.drawCharts();
                }
            },
            search(obj) {
                this.rows=[];
                //this.filter = _.assign(this.filter, obj);
                // if(this.filter.studentNo!=undefined&&this.filter.studentNo>-1){
                //     console.log('this.filter.studentNo',this.filter.studentNo);
                //     this.pageNo = 1;
                //     this.getList();
                // }
                this.getMainTitle();
                this.filter = _.assign(this.filter, obj);
                //console.log('this.filter',this.filter);
                if(this.filter.class!=undefined&&this.filter.class>-1){
                    this.pageNo = 1;
                    this.getList();
                }
            },
            selectSearch(obj){

            },
            getMainTitle() {
                let str = '';
                if (this.filter) {
                    const fil = this.filter;
                    const list = this.filterList;
                    str = `${u.getFilterNameByValue(list,'college',fil.college)} ${u.getFilterNameByValue(list,'course',fil.course)} ${u.getFilterNameByValue(list,'term',fil.term)}`;
                }
                this.mainTitle=str;
            },
            drawCharts() {
                let chartData = this.chartData;
                console.log('chartData',chartData);
                if(chartData===undefined||chartData===''){
                    chartData.xData=[];
                    chartData.totalScore=[];
                    chartData.examScore=[];
                    chartData.testScore=[];
                    chartData.previewScore=[];
                }
                console.log(document.getElementById('chart'));//如果页面没有加载完毕 这是null 后面执行错误
                if (document.getElementById('chart')) {
                    this.chart = echarts.init(document.getElementById('chart'));
                    this.chart.setOption({
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                            data: chartData.xData,//['成绩', '考试', '测验', '预习'],
                            itemWidth: 20,
                            borderRadius: 6,
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type: 'category',
                                //data : ['课程1','课程2','课程3'],//xData
                                data: chartData.xData,
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: [
                            {
                                name: '成绩',
                                type: 'bar',
                                stack: '搜索引擎',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'inside',
                                        formatter: '{c}'
                                    },
                                },
                                //data:[80, 8, 8, 8, 8, 8, 8]//totalScore
                                data: chartData.totalScore
                            },
                            {
                                name: '考试',
                                type: 'bar',
                                stack: '搜索引擎',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'inside',
                                        formatter: '{c}'
                                    },
                                },
                                data: chartData.examScore,
                                //data:[30, 30, 30, 30, 30, 30, 30]//examScore
                            },
                            {
                                name: '测验',
                                type: 'bar',
                                stack: '搜索引擎',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'inside',
                                        formatter: '{c}'
                                    },
                                },
                                //data:[54, 54, 54, 54, 54, 54, 54],//testScore
                                data: chartData.testScore,
                            },
                            {
                                name: '预习',
                                type: 'bar',
                                stack: '搜索引擎',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'inside',
                                        formatter: '{c}'
                                    },
                                },
                                //data:[8, 8, 8, 8, 8, 8, 8],//previewScore
                                data: chartData.previewScore,
                            }
                        ],
                        color: ['#87BFBC','#AEE2AD',
                            '#F8D39A','#EB8B87']
                    });

                }

            },
            //获取列表
            getList() {
                let para = {
                    pageNo: this.pageNo,
                    filter: JSON.stringify(this.filter),
                    keyword: this.keyword,
                    pageSize: this.pageSize,
                };
                console.log('getlist para',para);
                if (!this.allLoading) this.listLoading = true;
                getStatisticsGroupInfo(para).then((res) => {
                    //console.log('getStatisticsGroupInfo', res);
                    res = res.data;
                    //this.totalCount = res.totalCount;
                    this.rows = res.list;
                    this.chartData=res.chart;
                    if (!this.allLoading) this.listLoading = false;
                    if (this.allLoading) this.allLoading = false;
                    if(this.selectType==='chart'){
                    this.drawCharts();
                    }
                });
            },
            // 获取过滤器数据
            getFilter() {
                this.filterLoading = true;
                getStatisticsGroupFilter({}).then((res) => {
                    res=res.data;
                    this.filterList = res;
                    this.filterLoading = false;
                    // 过滤器数据增加联动判断字段
                    this.dealFilterList();
                    // get table list
                    //this.getList();
                });
            },
            // 处理过滤器数据
            dealFilterList() {
                var index = _.findIndex(this.filterList, { field: 'grade' });
                if (index > -1) {
                    this.filterList[index].isLinkage = true;
                }
                // var index1 = _.findIndex(this.filterList, { field: 'class' });
                // if (index1 > -1) {
                //     this.filterList[index1].isLinkage = true;
                // }
                // filter 对应key默认好 -1
                this.filter = _.assign(this.filter,u.getDefaultFilter(this.filterList));
            },
            // 联动处理数据
            linkage(field, value) {
                const ts = this;
                // console.log('before',this.filter.studentNo);
                // if(ts.filter.studentNo!==undefined||ts.filter.studentNo!==-1){
                //     ts.filter.studentNo=-1;
                // }
                // console.log('after',ts.filter.studentNo);
                // 年级与班级联动
                if (field === 'grade') {
                    if (value === -1) {
                        var index = _.findIndex(ts.filterList, { field: 'class' });
                        ts.filterList.splice(index, 1);
                        return;
                    }
                    var index_grade = _.findIndex(ts.filterList, { field: 'grade' });//grade index
                    this.filterLoading = true;
                    getStatStuClassFilter({
                        'gradeId':value//filter:"{gradeid: "+value+"}"
                    }).then(res => {
                        res=res.data;
                        this.filterLoading = false;
                        var index = _.findIndex(ts.filterList, { field: res.field });
                        //console.log('index', index);
                        if (index > -1) {
                            ts.filterList.splice(index_grade+1, 1, res);
                        } else {
                            ts.filterList.splice(index_grade+1, 0, res);
                        }
                        ts.filterList.splice(index_grade+2, 1);//学号 移除
                        // 过滤器数据增加联动判断字段
                        ts.dealFilterList();
                        // filter 对应key默认好 -1
                        ts.filter = _.assign(ts.filter,u.getDefaultFilter(ts.filterList, true));
                        // get table list
                        //ts.getList();
                    });
                }
                // 班级与学号联动
            },
        },
        computed: {
            showExamTable() {
                let flag = false;
                if (this.filter) {
                    flag = this.filter.type === 'list' && this.filter.statistics === 'exam';
                }
                return flag;
            },
            showScoreTable() {
                let flag = false;
                if (this.filter) {
                    flag = this.filter.type === 'list' && this.filter.statistics === 'score';
                }
                return flag;
            },
            showExamChart() {
                let flag = false;
                if (this.filter) {
                    flag = this.filter.type === 'chart' && this.filter.statistics === 'exam';
                }
                return flag;
            },
            showScoreChart() {
                let flag = false;
                if (this.filter) {
                    flag = this.filter.type === 'chart' && this.filter.statistics === 'score';
                }
                return flag;
            },
            
        },
        components: {
            'Page':
            Pagination,
            myFilter
        },
        mounted() {
            this.getFilter();
        }
    }

</script>

<style lang="scss">
    @import '~scss_vars';

    #depStatistics{
        .chart-ul{
            display: inline-block;
            .chart-li{
                width: 360px;
                height: 100%;
                display: block;
                float: left;
                position: relative;
                .chart-area{
                    width: 360px;
                    height: 370px;
                }
                .chart-text{
                    display: block;
                    width: 160px;
                    height: 120px;
                    margin: auto;
                    border: 1px solid $base-border;
                    box-sizing: border-box;
                    padding: 7px 0 0 10px;
                    @include radius($radius-size);
                    .text-li{
                        height: 21px;
                        line-height: 21px;
                        font-size: 14px;
                        color: #3C5398;
                    }
                }
                .chart-mid{
                    width: 72px;
                    height: 72px;
                    @include radius(36px);
                    color: #3C5398;
                    text-align: center;
                    line-height: 72px;
                    font-size: 14px;
                    position: absolute;
                    left: 50%;
                    margin-left: -36px;
                    top: 185px;
                    margin-top: -36px;
                }
            }
        }
    }
</style>