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
                        <el-table-column prop="courseName" label="课程" sortable>
                            <template slot-scope="scope">
                                <el-button type="text" @click="detailShow(scope.row)">{{scope.row.courseName}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="termName" label="学期" sortable>
                        </el-table-column>
                        <el-table-column prop="studentNo" label="学号" sortable>
                        </el-table-column>
                        <el-table-column prop="studentName" label="姓名" sortable>
                        </el-table-column>
                        <el-table-column prop="previewScore" label="预习分数" sortable>
                        </el-table-column>
                        <el-table-column prop="testScore" label="测验分数" sortable>
                        </el-table-column>
                        <el-table-column prop="examScore" label="考试分数" sortable>
                        </el-table-column>
                        <el-table-column prop="totalScore" label="总体成绩" sortable>
                        </el-table-column>
                        <el-table-column prop="rank" label="等级" sortable>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
    	</section>
        <section v-if="detailId">
            <test-detail :id="detailId" :detailRow="detailRow" @close="detailClose"></test-detail>
        </section>
    </div>
</template>
<script>
	import myFilter from '../../common/myFilter.vue'
    import {getStudentScoreList, getStudentScoreFilter} from '../../../api/api';
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
                pageSize: 30,
                listLoading: false,
                filterLoading: false,
                allLoading: false,

                detailId: '',
                detailRow:''
            }
        },
        methods: {
            detailShow(row) {
                this.detailId = row.courseId;
                this.detailRow=row;
            },
            detailClose() {
                this.detailId = '';
                this.detailRow='';
            },
            handleCurrentChange(val) {
                this.pageNo = val;
                this.getList();
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
                getStudentScoreList(para).then((res) => {
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
                getStudentScoreFilter({}).then((res) => {
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
