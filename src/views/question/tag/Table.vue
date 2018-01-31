<template>
    <section>
        <div class="panel">
            <div class="title">
                <el-input placeholder="请输入搜索关键词" v-model="keyword">
                    <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
                </el-input>

                <!--分页-->
                <div class="pageArea">
                    <Page current="1" :totalCount="totalCount" :pageSize="pageSize" @page-change="handleCurrentChange"></Page>
                </div>

            </div>

            <div class="content">
                <!--列表-->
                <el-table
                        :data="rows"
                        highlight-current-row
                        v-loading="listLoading"
                        style="width: 100%;">
                    <el-table-column type="index" label="序号" sortable>
                    </el-table-column>
                    <el-table-column prop="name" label="标签名称" sortable>
                    </el-table-column>
                    <el-table-column prop="creator" label="创建人" sortable>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </section>
</template>

<script>
    import {getTagList} from '../../../api/api';
    import Pagination from '../../common/Pagination.vue'

    export default {
        data() {
            return {
                keyword: '',
                filters: {
                    name: ''
                },
                rows: [],
                totalCount: 0,
                page: 1,
                pageSize: 10,
                listLoading: false,

            }
        },
        methods: {
            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },
            //获取用户列表
            getList() {
                let para = {
                    pageNo: this.page,
                    keyword: this.keyword,
                    pageSize: this.pageSize
                };
                this.listLoading = true;
                getTagList(para).then((res) => {
                    this.totalCount = res.totalCount;
                    this.rows = res.rows;
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