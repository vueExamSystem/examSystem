<template>
    <section id="depStatistics">
        <my-filter :list="filterList" @callback="search"></my-filter>
        <div v-bind:class="[ showExamChart || showScoreChart ? 'noBottom' : '', 'panel' ]">
            <div class="title">
                <span :model="getMainTitle"></span>
            </div>

            <div class="content">
                <my-filter :list="filterListTable" :noBottomBorder="true" @callback="searchTable"></my-filter>
                <div v-if="showExamTable">
                    <div class="title">
                        <el-input placeholder="请输入搜索关键词" v-model="searchkey">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>

                        <el-button type="success" @click="importTable" class="el-button-shadow">导出</el-button>

                        <!--分页-->
                        <div class="pageArea">
                            <Page :current="page"
                                  :total="examTotal"
                                  :pageSize="pageSize"
                                  @page-change="handleCurrentChange"></Page>
                        </div>

                    </div>
                    <!--列表-->
                    <el-table
                            :data="examList"
                            highlight-current-row
                            v-loading="listLoading"
                            @selection-change="selsChange"
                            style="width: 100%;">
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
                        <el-input placeholder="请输入搜索关键词" v-model="searchkey">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>

                        <el-button type="success" @click="importTable" class="el-button-shadow">导出</el-button>

                        <!--分页-->
                        <div class="pageArea">
                            <Page :current="page" :total="scoreTotal" :pageSize="pageSize"
                                  @page-change="handleCurrentChange"></Page>
                        </div>

                    </div>
                    <!--列表-->
                    <el-table
                            :data="scoreList"
                            highlight-current-row
                            v-loading="listLoading"
                            @selection-change="selsChange"
                            style="width: 100%;">
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
            </div>
        </div>
        <div v-if="showExamChart" class="panel">
            <div class="title samll">
                <span>大学物理</span>
            </div>
            <div class="content chart">
                <ul class="chart-ul clearfix">
                    <template v-for="item in examList">
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
                    <template v-for="item in scoreList">
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
    </section>
</template>

<script>
    import {getDepExamStaList, getDepScoreStaList} from '../../../api/api';
    import myFilter from '../../common/myFilter.vue'
    import Pagination from '../../common/Pagination.vue'
    import _ from 'lodash';
    import chart from './Echarts.vue';

    export default {
        data() {
            return {
                searchkey: '',
                filters: {
                    type: 'list',
                    statistics: 'exam',
                },
                examList: [],
                scoreList: [],
                examTotal: 0,
                scoreTotal: 0,
                page: 1,
                pageSize: 5,
                listLoading: false,
                sels: [],//列表选中列


                filterList: [
                    {
                        title: '院系',
                        field: 'department',
                        noAll: true,
                        children: [{
                            value: '11',
                            text: '计算机'
                        }, {
                            value: '22',
                            text: '物电学院'
                        }, {
                            value: '33',
                            text: '体育学院'
                        }]
                    }, {
                        title: '年级',
                        field: 'grade',
                        noAll: true,
                        children: [{
                            value: '14',
                            text: '14级'
                        }, {
                            value: '15',
                            text: '15级'
                        }, {
                            value: '16',
                            text: '16级'
                        }, {
                            value: '17',
                            text: '17级'
                        }]
                    }, {
                        title: '学期',
                        field: 'team',
                        noAll: true,
                        children: [{
                            value: '1',
                            text: '上学期'
                        }, {
                            value: '2',
                            text: '下学期'
                        }]
                    }, {
                        title: '课程',
                        field: 'project',
                        noAll: true,
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
                    }, {
                        title: '班级',
                        field: 'class',
                        noAll: true,
                        children: [{
                            value: '1',
                            text: '1班'
                        }, {
                            value: '2',
                            text: '2班'
                        }, {
                            value: '4',
                            text: '4班'
                        }]
                    }, {
                        title: '学号',
                        field: 'studentNo',
                        arr: [ // 具体特殊项（目前加入单选，按钮，需要继续加）
                            {
                                id: 0,
                                type: 'select', // 特殊项的类型 （button select等）
                                data: [{
                                    id: '1',
                                    name: '211111001'
                                }, {
                                    id: '2',
                                    name: '211111002'
                                }, {
                                    id: '3',
                                    name: '211111003'
                                }],
                            }
                        ],
                        noAll: true,
                    }
                ],
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
                // 表格上的选择框
                searchSelect: '',

            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(val);
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            search(filter) {
                this.filters = _.cloneDeep(_.assign(this.filters, filter));
                // console.log('search', this.filters, filter);
                this.$forceUpdate();
            },
            searchTable(filter) {
                this.filters = _.cloneDeep(_.assign(this.filters, filter));
                // console.log('searchTable', this.filters, filter);
                this.$forceUpdate();
            },
            importTable() {
            },
            //获取用户列表
            getList() {
                let para = {
                    page: this.page,
                    pageSize: this.pageSize
                };
                this.listLoading = true;
                getDepExamStaList(para).then((res) => {
                    console.log(res);
                    this.examTotal = res.data.total;
                    this.examList = res.data.list;
                    this.listLoading = false;
                });
                getDepScoreStaList(para).then((res) => {
                    console.log(res);
                    this.scoreTotal = res.data.total;
                    this.scoreList = res.data.list;
                    this.listLoading = false;
                });
            },
        },
        computed: {
            showExamTable() {
                let flag = false;
                if (this.filters) {
                    flag = this.filters.type === 'list' && this.filters.statistics === 'exam';
                }
                console.log(this.filters);
                return flag;
            },
            showScoreTable() {
                let flag = false;
                if (this.filters) {
                    flag = this.filters.type === 'list' && this.filters.statistics === 'score';
                }
                return flag;
            },
            showExamChart() {
                let flag = false;
                if (this.filters) {
                    flag = this.filters.type === 'chart' && this.filters.statistics === 'exam';
                }
                return flag;
            },
            showScoreChart() {
                let flag = false;
                if (this.filters) {
                    flag = this.filters.type === 'chart' && this.filters.statistics === 'score';
                }
                return flag;
            },
            getMainTitle() {
                let str = '';
                if (this.filters) {
                    const fil = this.filters;
                    str = `${fil.grade}${fil.department}院${fil.course}`;
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
            this.getList();
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