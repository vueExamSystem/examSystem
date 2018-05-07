<template>
    <section>
        <div class="panel">
            <div class="title">
                <el-input placeholder="请输入搜索关键词" v-model="keyword">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>

                <!--分页-->
                <div class="pageArea">
                     <Page :pageNo="pageNo" :totalCount="totalCount" :pageSize="pageSize" @page-change="handleCurrentChange"></Page>
                </div>

            </div>

            <div class="content">
                <!--列表-->
                <el-table
                        :data="rows"
                        highlight-current-row
                        v-loading="listLoading"
                        style="width: 100%;">
                    <el-table-column type="index" label="ID" sortable>
                    </el-table-column>
                    <el-table-column prop="userName" label="帐号" sortable>
                    </el-table-column>
                    <el-table-column prop="loginTime" label="登录时间" sortable>
                    </el-table-column>
                     <el-table-column prop="loginIp" label="登录IP" sortable>
                    </el-table-column>
                    <el-table-column prop="deviceCode" label="登录指纹码" sortable>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </section>
</template>

<script>
    import {getLoginList} from '../../../api/api';
    import Pagination from '../../common/Pagination.vue'

    export default {
        data() {
            return {
                keyword: '',
                rows: [],
                totalCount: 0,
                pageNo: 1,
                pageSize: 20,
                listLoading: false,

            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(val);
            },
            handleCurrentChange(val) {
                this.pageNo = val;
                this.getList();
            },
            search() {
                this.pageNo = 1;
                this.getList();
            },
            //获取用户列表
            getList() {
                let para = {
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    keyword: this.keyword,
                };
                this.listLoading = true;
                getLoginList(para).then((res) => {
                    //console.log('res', res);
                    this.totalCount = res.data.totalCount;
                    this.rows = res.data.rows;
                    this.listLoading = false;
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