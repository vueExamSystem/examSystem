<template>
    <section id="dashboardTable" class="panel">
        <div class="title">
            <span>本周考试</span>

            <!--分页-->
            <div class="pageArea">
                <Page current="1" total="23" pageSize="5" @page-change="handleCurrentChange"></Page>
            </div>

            <div class="search-input mid">
                <el-input placeholder="请输入搜索关键词" v-model="searchkey">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>


        </div>

        <div class="content">
            <!--列表-->
            <el-table
                    :data="users" highlight-current-row
                    v-loading="listLoading"
                    @selection-change="selsChange"
                    style="width: 100%;">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column type="index" width="60">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120" sortable>
                </el-table-column>
                <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
                </el-table-column>
                <el-table-column prop="age" label="年龄" width="100" sortable>
                </el-table-column>
                <el-table-column prop="birth" label="生日" sortable>
                </el-table-column>
                <el-table-column prop="addr" label="地址" min-width="180" sortable>
                </el-table-column>
            </el-table>
        </div>
    </section>
</template>

<script>
    import util from '../../common/js/util'
    //import NProgress from 'nprogress'
    import { getUserListPage } from '../../api/api';
    import Pagination from '../common/Pagination.vue'

    export default {
        data() {
            return {
                filters: {
                    name: ''
                },
                users: [],
                total: 0,
                page: 1,
                pageSize: 5,
                listLoading: false,
                sels: [],//列表选中列

            }
        },
        methods: {
            //性别显示转换
            formatSex: function (row, column) {
                return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
            },
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
            //获取用户列表
            getUsers() {
                let para = {
                    page: this.page,
                    name: this.filters.name,
                    pageSize: this.pageSize
                };
                this.listLoading = true;
                //NProgress.start();
                getUserListPage(para).then((res) => {
                    this.total = res.data.total;
                    this.users = res.data.users;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
        },
        components: {
            'Page': Pagination
        },
        mounted() {
            this.getUsers();
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';

    #dashboardTable {
        .search-input{
            width: 280px;
            height: auto;
            margin: 2px 12px 0 8px;
            float: left;
            &.mid{
                float: right;
            }

        }
        .pageArea{
            float: right;
            margin-top: 10px;
        }
    }
</style>