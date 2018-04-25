<template>
	<div>
        <section v-show="!detailId">
    		<my-filter v-if="filterList.length > 0" :list="filterList" @callback="search"  @linkage="linkage" v-loading="filterLoading"></my-filter>
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
                        <el-table-column prop="name" label="资料名称" min-width="160">
                            <template slot-scope="scope">
                                <el-button type="text" @click="detailShow(scope.row)">{{scope.row.name}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="courseName" label="所属课程">
                        </el-table-column>
                        <el-table-column prop="sectionName" label="所属章节">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
    	</section>
        <section v-if="detailId">
            <doc-detail :id="detailId" :detailRow="detailRow" @close="detailClose"></doc-detail>
        </section>
    </div>
</template>
<script>
	import myFilter from '../../common/myFilter.vue'
    import {getDocList, getDocFilter,getSectionFilter} from '../../../api/api';
    import Pagination from '../../common/Pagination.vue';
    import _ from 'lodash';
    import u from '../../../common/js/util';
    import docDetail from './Detail.vue'
    export default {
        components: {
            myFilter,
            Page: Pagination,
            docDetail
        },
        data() {
            return {
                filterList: [],
                keyword: '',
                filter: {},
                rows: [],
                totalCount: 0,
                pageNo: 1,
                pageSize: 10,
                listLoading: false,
                filterLoading: false,

                detailId: '',
                detailRow:'',
            }
        },
        methods: {
            detailShow(row) {
                this.detailId = row.id;
                this.detailRow=row;
                console.log(row);
            },
            detailClose() {
                this.detailId = '';
                this.detailRow='';
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
                if (!this.listLoading) this.listLoading = true;
                getDocList(para).then((res) => {
                    res = res.data;
                    this.totalCount = res.totalCount;
                    this.rows = res.rows;
                    if (!this.filterLoading) this.listLoading = false
                });
            },
            // 获取过滤器数据
            getFilter() {
                this.filterLoading = true;
                this.listLoading = true;
                getDocFilter({}).then((res) => {
                    this.filterList = res.data;
                    this.filterLoading = false;
                    // 过滤器数据增加联动判断字段
                    this.dealFilterList();
                    // filter 对应key默认好 -1
                    this.filter = u.getDefaultFilter(this.filterList);
                    // get table list
                    this.getList();
                });
            },
            // 处理过滤器数据
            dealFilterList() {
                const index = _.findIndex(this.filterList, {field: 'course'});
                if (index > -1) {
                    this.filterList[index].isLinkage = true;
                }
            },
            // 联动处理数据
            linkage(field, value) {
                const ts = this;
                // 课程联动
                if (field === 'course') {
                    if (value === -1) {
                        const index = _.findIndex(ts.filterList, {field: 'section'});
                        ts.filterList.splice(index, 1);
                        return;
                    }
                    this.filterLoading = true;
                    getSectionFilter({
                        filter:"{courseid: "+value+"}"
                    }).then(res => {
                        res=res.data;
                        this.filterLoading = false;
                        const index = _.findIndex(ts.filterList, {field: res.field});
                        if (index > -1) {
                            ts.filterList.splice(1, 1, res);
                        } else {
                            ts.filterList.splice(1, 0, res);
                        }
                    });
                }
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
