<template>
    <section id="depStatistics" v-loading="allLoading">
        <my-filter v-if="filterList.length > 0" :list="filterList" @callback="search" v-loading="filterLoading" @linkage="linkage"></my-filter>
        <div v-bind:class="[ showExamChart || showScoreChart ? 'noBottom' : '', 'panel' ]">
            <div class="title">
                <span :model="getMainTitle"></span>
            </div>

            <div class="content">
                <my-filter :list="filterListTable" :noBottomBorder="true" @callback="search"></my-filter>
                <div v-if="showExamTable">
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
                        <el-table-column prop="examName" label="考试名称" sortable>
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
                    <div class="content chart">
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
                    </div>
                </div>
                <div v-if="showScoreChart" class="panel">
                    <div class="title samll">
                        <span>大学物理</span>
                    </div>
                    <div class="content chart">
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
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {
        getStatisticsStudentInfo,
        getStatisticsStudentFilter,
        getStatisticsStudentList,
        getStatStuClassFilter,
        getStatStuStudentNoFilter,
    } from '../../../api/api';
    import myFilter from '../../common/myFilter.vue'
    import Pagination from '../../common/Pagination.vue'
    import _ from 'lodash';
    import chart from './Echarts.vue';
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




                filterList: [],
                filterListTable: [
                    {
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
                    }, {
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
            search(obj) {
                this.filter = _.assign(this.filter, obj);
                this.pageNo = 1;
                this.getList();
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
                console.log('this.filter',this.filter);
                if (!this.allLoading) this.listLoading = true;
                getStatisticsStudentInfo(para).then((res) => {
                    console.log('getStatisticsStudentInfo', res);
                    res = res.data;
                    this.totalCount = res.totalCount;
                    this.rows = res.rows;

                    if (!this.allLoading) this.listLoading = false;
                    if (this.allLoading) this.allLoading = false;
                });
            },
            // 获取过滤器数据
            getFilter() {
                this.filterLoading = true;
                this.listLoading = true;
                getStatisticsStudentFilter({}).then((res) => {
                    res=res.data;
                    this.filterList = res;
                    this.filterLoading = false;
                    // 过滤器数据增加联动判断字段
                    this.dealFilterList();
                    // get table list
                    this.getList();
                });
            },
            // 处理过滤器数据
            dealFilterList() {
                const index = _.findIndex(this.filterList, { field: 'grade' });
                if (index > -1) {
                    this.filterList[index].isLinkage = true;
                }
                const index1 = _.findIndex(this.filterList, { field: 'class' });
                if (index1 > -1) {
                    this.filterList[index1].isLinkage = true;
                }
                // filter 对应key默认好 -1
                this.filter = _.assign(this.filter,u.getDefaultFilter(this.filterList));
            },
            // 联动处理数据
            linkage(field, value) {
                const ts = this;
                // 年级与班级联动
                if (field === 'grade') {
                    if (value === -1) {
                        const index = _.findIndex(ts.filterList, { field: 'class' });
                        ts.filterList.splice(index, 1);
                        return;
                    }
                    const index_grade = _.findIndex(ts.filterList, { field: 'grade' });//grade index
                    this.filterLoading = true;
                    getStatStuClassFilter({
                        'gradeId':value//filter:"{gradeid: "+value+"}"
                    }).then(res => {
                        res=res.data;
                        this.filterLoading = false;
                        const index = _.findIndex(ts.filterList, { field: res.field });
                        console.log('index', index);
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
                        ts.getList();
                    });
                }
                // 班级与学号联动
                if (field === 'class') {
                    if (value === -1) {
                        const index = _.findIndex(ts.filterList, { field: 'studentNo' });
                        ts.filterList.splice(index, 1);
                        return;
                    }
                    const index_class = _.findIndex(ts.filterList, { field: 'class' });//class index
                    this.filterLoading = true;
                    getStatisticsStudentList({
                        'groupId':value//filter:"{classid: "+value+"}"
                    }).then(res => {
                        res=res.data;
                        this.filterLoading = false;
                        const index = _.findIndex(ts.filterList, { field: res.field });
                        console.log('index', index);
                        if (index > -1) {
                            ts.filterList.splice(index_class+1, 1, res);
                        } else {
                            ts.filterList.splice(index_class+1, 0, res);
                        }
                    });
                }
            },
        },
        computed: {
            showExamTable() {
                let flag = false;
                if (this.filter) {
                    flag = this.filter.type === 'list' && this.filter.statistics === 'exam';
                }
                console.log(this.filter);
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
            getMainTitle() {
                let str = '';
                if (this.filter) {
                    const fil = this.filter;
                    const list = this.filterList;
                    str = `${u.getFilterNameByValue(list,'grade',fil.grade)}${u.getFilterNameByValue(list,'college',fil.college)}院${u.getFilterNameByValue(list,'course',fil.course)}`;
                }
                return str;
            },
        },
        components: {
            'Page':
            Pagination,
            myFilter,
            chart,
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