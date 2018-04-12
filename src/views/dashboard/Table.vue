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
                <el-table-column type="index" label="ID">
                </el-table-column>
                <el-table-column prop="name" label="考试名称" sortable>
                </el-table-column>
                <el-table-column prop="time" label="考试时间" sortable>
                </el-table-column>
                <el-table-column prop="state" label="状态" :formatter="formatState" sortable>
                </el-table-column>
                <el-table-column prop="teacher" label="监考老师" sortable>
                </el-table-column>
                <el-table-column prop="examPerson" label="考试人员" sortable>
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