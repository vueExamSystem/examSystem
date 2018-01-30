<template>
    <section>
        <my-filter :list="filterList" @callback="search" v-loading="filterLoading"></my-filter>
        <div class="panel">
            <div class="title">
                <el-input placeholder="请输入搜索关键词" v-model="searchkey">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>

                <!--分页-->
                <div class="pageArea">
                    <Page :current="page" :total="total" :pageSize="pageSize" @page-change="handleCurrentChange"></Page>
                </div>

            </div>

            <div class="content">
                <!--列表-->
                <el-table
                        :data="list"
                        highlight-current-row
                        v-loading="listLoading"
                        @selection-change="selsChange"
                        style="width: 100%;">
                    <el-table-column type="index" label="ID" sortable>
                    </el-table-column>
                    <el-table-column prop="name" label="试题名称" sortable>
                    </el-table-column>
                    <el-table-column prop="questionTypeId" label="试题类型" sortable>
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
                searchkey: '',
                filters: {
                    name: ''
                },
                list: [],
                total: 0,
                page: 1,
                pageSize: 10,
                listLoading: false,
                sels: [],//列表选中列

                filterLoading: false,
                filterList: [],
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
            selsChange: function (sels) {
                this.sels = sels;
            },
            search() {},
            //获取用户列表
            getList() {
                let para = {
                    page: this.page,
                    name: this.filters.name,
                    pageSize: this.pageSize
                };
                this.listLoading = true;
                getQueList(para).then((res) => {
                    console.log('get question list', res);
                    this.total = res.data.lenght;
                    this.list = res.data;
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