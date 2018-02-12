<template>
    <div>
    	<section v-show="!exampleId">
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
                        <el-table-column type="index" label="序号" width="80">
                        </el-table-column>
                        <el-table-column prop="name" label="习题名称" min-width="160">
                            <template scope="scope">
                                <el-button type="text" @click="detailShow(scope.row.id)">{{scope.row.name}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="paperName" label="选择试卷" min-width="140">
                        </el-table-column>
                        <el-table-column prop="endTime" label="结束时间" min-width="120">
                        </el-table-column>
                        <el-table-column prop="previewClass" label="预习人员" min-width="120">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
    	</section>
        <section v-if="exampleId">
            <example-detail :id="exampleId" @close="detailClose"></example-detail>
        </section>
    </div>
</template>
<script>
	import myFilter from '../../common/myFilter.vue'
    import {getExampleList, getExampleFilter} from '../../../api/api';
    import Pagination from '../../common/Pagination.vue';
    import _ from 'lodash';
    import exampleDetail from './Detail.vue'
    export default {
        components:{
        	myFilter,
        	Page:Pagination,
            exampleDetail,
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

                exampleId: '',
            }
        },
        methods: {
            detailShow(id){
                this.exampleId = id;
            },
            detailClose(){
                this.exampleId = '';
            },
            handleCurrentChange(val) {
                this.pageNo = val;
                this.getUsers();
            },
            search(obj) {
                this.filter = obj;
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
                if (!this.listLoading) this.listLoading = true;
                getExampleList(para).then((res) => {
                    res=res.data;
                    this.totalCount = res.totalCount;
                    this.rows = res.rows;
                    if (!this.filterLoading) this.listLoading = false
                });
            },
            // 获取过滤器数据
            getFilter() {
                this.filterLoading = true;
                this.listLoading = true;
                getExampleFilter({}).then((res) => {
                    this.filterList = res.data;
                    this.filterLoading = false;
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
