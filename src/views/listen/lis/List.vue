<template>
    <div>
        <section v-show="!detailId" v-loading="allLoading">
            <my-filter v-if="filterList.length > 0" :list="filterList" @callback="search" v-loading="filterLoading"></my-filter>
            <div class="panel">
                <div class="title">
                    <el-input placeholder="请输入搜索关键词" v-model="keyword">
                        <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
                    </el-input>
                    <div class="pageArea">
                        <Page :pageNo="pageNo" :totalCount="totalCount" :pageSize="pageSize" @page-change="handleCurrentChange"></Page>
                    </div>

                </div>
                <div class="content">
                    <el-table :data="rows" highlight-current-row v-loading="listLoading" style="width: 100%;">
                        <el-table-column type="index" label="序号" width="100">
                        </el-table-column>
                        <el-table-column prop="name" label="考试名称" min-width="160">
                            <template scope="scope">
                                <el-button type="text" @click="detailShow(scope.row.id)">{{scope.row.name}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="paper" label="选择试卷" min-width="160">
                        </el-table-column>
                        <el-table-column prop="testRange" label="测验时间" min-width="120">
                        </el-table-column>
                        <el-table-column prop="status" label="状态" min-width="100">
                        </el-table-column>
                        <el-table-column prop="listener" label="监测老师" min-width="100">
                        </el-table-column>
                        <el-table-column prop="testClass" label="测试人员" min-width="120">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </section>
        <section v-if="detailId">
            <test-detail :id="detailId" @close="detailClose"></test-detail>
        </section>
    </div>
</template>
<script>
    import myFilter from '../../common/myFilter.vue'
    import {getClassTestList, getClassTestFilter} from '../../../api/api';
    import Pagination from '../../common/Pagination.vue';
    import _ from 'lodash';
    import testDetail from './Detail.vue'
    export default {
        components:{
            myFilter,
            Page:Pagination,
            testDetail
        },
        data() {
            return {
                filterList:[],
                keyword: '',
                filter: {},
                rows: [],
                totalCount: 0,
                pageNo: 1,
                pageSize: 10,
                listLoading: false,
                filterLoading: false,
                allLoading: false,

                detailId: '',
            }
        },
        methods: {
            detailShow(id) {
                this.detailId = id;
            },
            detailClose() {
                this.detailId = '';
            },
            handleCurrentChange(val) {
                this.pageNo = val;
                this.getUsers();
            },
            search(obj) {
                this.filter = obj;this.pageNo = 1;
                this.getList();
            },
            //获取用户列表
            getList() {
                let para = {
                    pageNo: this.pageNo,
                    filter: JSON.stringify(this.filter),
                    keyword: this.keyword,
                    pageSize: this.pageSize,
                };
                if (!this.allLoading) this.listLoading = true;
                getClassTestList(para).then((res) => {
                    res = res.data;
                    this.totalCount = res.totalCount;
                    this.rows = res.rows;

                    if (!this.allLoading) this.listLoading = false;
                    if (this.allLoading) this.allLoading = false;
                });
            },
            // 获取过滤器数据
            getFilter() {
                this.allLoading = true;
                getClassTestFilter({}).then((res) => {
                    this.filterList = res.data;
                    this.getList();
                });
            },
        },
        mounted() {
            this.getFilter();
        }
    }
</script>
<style scoped lang="scss">
    @import '~scss_vars';
    .filter-wrap{
        margin-bottom: 20px;
    }
</style>
