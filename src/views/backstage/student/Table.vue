<template>
    <section>
        <div class="panel">
            <div class="title">
                <el-input placeholder="请输入搜索关键词" v-model="searchkey">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>

                <!--分页-->
                <div class="pageArea">
                    <Page current="1" total="23" pageSize="5" @page-change="handleCurrentChange"></Page>
                </div>

            </div>

            <div class="content">
                <!--列表-->
                <el-table
                        :data="list"
                        highlight-current-row
                        v-loading="listLoading"
                        style="width: 100%;">
                    <el-table-column type="index" label="ID" sortable>
                    </el-table-column>
                    <el-table-column prop="account" label="帐号" sortable>
                    </el-table-column>
                    <el-table-column prop="time" label="登录时间" sortable>
                    </el-table-column>
                    <el-table-column prop="state" label="状态" sortable>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </section>
</template>

<script>
    import {getSetLogList} from '../../../api/api';
    import Pagination from '../../common/Pagination.vue'

    export default {
        data() {
            return {
                searchkey: '',
                list: [],
                total: 0,
                page: 1,
                pageSize: 5,
                listLoading: false,

            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(val);
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },
            search() {},
            //获取用户列表
            getList() {
                let para = {
                    page: this.page,
                    pageSize: this.pageSize
                };
                this.listLoading = true;
                //NProgress.start();
                getSetLogList(para).then((res) => {
                    console.log('res', res);
                    this.total = res.data.total;
                    this.list = res.data.list;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
        },
        components: {
            'Page': Pagination,
        },
        mounted() {
            this.getList();
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>