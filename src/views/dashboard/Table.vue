<template>
    <section id="dashboardTable" class="panel">
        <div class="title home">
            <span>本周考试</span>

            <!--分页-->
            <div class="pageArea">
                <Page :total="total" :pageSize="pageSize" @page-change="handleCurrentChange"></Page>
            </div>

            <el-input class="mid" placeholder="请输入搜索关键词" v-model="searchkey">
                <el-button slot="append" icon="el-icon-search" @click="searchTable"></el-button>
            </el-input>


        </div>

        <div class="content">
            <!--列表-->
            <el-table
                    :data="lists" highlight-current-row
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
                searchkey: '',
                filters: {
                    name: ''
                },
                current: 1,
                lists: [],
                total: 0,
                pageSize: 5,
                listLoading: false,
                sels: [],//列表选中列

            }
        },
        methods: {
            formatState: function (row, column) {
                return row.sex == 1 ? '已结束' : row.sex == 0 ? '进行中' : '未知';
            },
            searchTable() {
                this.getLists();
            },
            handleCurrentChange(val) {
                this.current = val;
                this.getLists();
            },
            //获取用户列表
            getLists() {
                let para = {
                    page: this.current,
                    pageSize: this.pageSize,
                    searchkey: this.searchkey,
                };
                this.listLoading = true;
                //NProgress.start();
                getWeekExam(para).then((res) => {
                    console.log(res.data);
                    this.total = res.data.total;
                    this.lists = res.data.list;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
        },
        components: {
            'Page': Pagination
        },
        mounted() {
            this.getLists();
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';

    #dashboardTable {

    }
</style>