<template>
    <section>
        <my-filter :list="filterList" @callback="search" v-loading="filterLoading"></my-filter>
        <div class="panel">
            <div class="title">
                <el-input placeholder="请输入搜索关键词" v-model="keyword">
                    <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
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
                    <el-table-column prop="name" label="试题名称" sortable>
                    </el-table-column>
                    <el-table-column prop="type" label="试题类型" sortable>
                    </el-table-column>
                    <el-table-column prop="subject" label="所属课程" sortable>
                    </el-table-column>
                    <el-table-column prop="chapter" label="所属章节" sortable>
                    </el-table-column>
                    <el-table-column prop="creator" label="创建人" sortable>
                    </el-table-column>
                    <el-table-column prop="same" label="相似题组" sortable>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </section>
</template>

<script>
    import util from '../../../common/js/util'
    import {getQueList, getQuestionFilter} from '../../../api/api';
    import myFilter from '../../common/myFilter.vue'
    import Pagination from '../../common/Pagination.vue'

    export default {
        data() {
            return {
                keyword: '',
                filter: {},
                rows: [],
                totalCount: 0,
                pageNo: 1,
                pageSize: 10,
                listLoading: false,

                filterLoading: false,
                filterList: [],
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.pageNo = val;
                this.getList();
            },
            search(obj) {
                this.filter = obj;
                this.getList();
            },
            //获取用户列表
            getList() {
                let para = {
                    pageNo: this.pageNo,
                    filter: this.filter,
                    pageSize: this.pageSize,
                    keyword: this.keyword,
                };
                console.log('question list para', para);
                this.listLoading = true;
                getQueList(para).then((res) => {
                    this.totalCount = res.data.totalCount;
                    this.rows = res.data.rows;
                    this.listLoading = false;
                });
            },
            getFilter() {
                this.filterLoading = true;
                getQuestionFilter({}).then((res) => {
                    this.filterList = res.data;
                    this.filterLoading = false;
                });
            },
        },
        components: {
            'Page': Pagination,
            myFilter,
        },
        mounted() {
            this.getList();
            this.getFilter();
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>