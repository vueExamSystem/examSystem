<template>
    <section id="dashboardTable" class="panel">
        <div class="title home">
            <span>本周考试</span>

            <!--分页-->
            <div class="pageArea">
                <Page :totalCount="totalCount" :pageSize="pageSize" @page-change="handleCurrentChange"></Page>
            </div>

            <el-input class="mid" placeholder="请输入搜索关键词" v-model="keyword">
                <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
            </el-input>


        </div>

        <div class="content">
            <!--列表-->
            <el-table
                    :data="rows" highlight-current-row
                    v-loading="listLoading"                    
                    style="width: 100%;">
                        <el-table-column type="index" label="序号" width="100">
                        </el-table-column>
                        <el-table-column prop="name" label="考试名称" min-width="160">
                        </el-table-column>
                        <el-table-column prop="paper" label="选择试卷" min-width="160">
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
                        </el-table-column>
                        <el-table-column prop="groups" label="考试人员" min-width="160">
     
                        </el-table-column>
                
            </el-table>
        </div>
    </section>
</template>

<script>
    import util from '../../common/js/util'
    import { getWeekExam } from '../../api/api';
    import Pagination from '../common/Pagination.vue'

    export default {
        data() {
            return {
                keyword: '',
                filters: {
                    name: ''
                },
                pageNo: 1,
                rows: [],
                totalCount: 0,
                pageSize: 5,
                listLoading: false,
                sels: [],//列表选中列

            }
        },
        methods: {
            formatState: function (row, column) {
                return row.state == 1 ? '已结束' : row.state == 0 ? '进行中' : '未知';
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },
            //获取tag列表
            getList() {
                let para = {
                    pageNo: this.page,
                    keyword: this.keyword,
                    pageSize: this.pageSize
                };
                this.listLoading = true;
                getWeekExam(para).then((res) => {
                    res=res.data;
                    this.totalCount = res.totalCount;
                    this.rows = res.rows;
                    this.listLoading = false;
                });
            },
             timeRangeFormatter(row){//时间范围格式化
                var st = row.beginTime;
                var et = row.endTime;
                //var etStr = et.split(' ')[1];
                return st + '-' + et;
            }
        },
        components: {
            'Page': Pagination
        },
        mounted() {
            this.getList();
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';

    #dashboardTable {

    }
</style>