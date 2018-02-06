<template>
    <section>
        <my-filter :list="filterList" @callback="search" v-loading="filterLoading" @linkage="linkage"></my-filter>
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
    import u from '../../../common/js/util';
    import _ from 'lodash';
    import {getQueList, getQuestionFilter, getSectionFilter} from '../../../api/api';
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
                if (_.isEmpty(this.filter)) return;
                let para = {
                    pageNo: this.pageNo,
                    filter: JSON.stringify(this.filter),
                    pageSize: this.pageSize,
                    keyword: this.keyword,
                };
                if (!this.listLoading) this.listLoading = true;
                getQueList(para).then((res) => {
                    this.totalCount = res.totalCount;
                    this.rows = res.rows;
                    if (!this.filterLoading) this.listLoading = false;
                });
            },
            // 获取过滤器数据
            getFilter() {
                this.filterLoading = true;
                this.listLoading = true;
                getQuestionFilter({}).then((res) => {
                    console.log(res);
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
                const index = _.findIndex(this.filterList, { field: 'course' });
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
                        const index = _.findIndex(ts.filterList, { field: 'section' });
                        ts.filterList.splice(index, 1);
                        return;
                    }
                    this.filterLoading = true;
                    getSectionFilter({
                        filter: {
                            courseid: value,
                        }
                    }).then(res => {
                        this.filterLoading = false;
                        res=res.data;
                        const index = _.findIndex(ts.filterList, { field: res.field });
                        if (index > -1) {
                            ts.filterList[index] = res;
                        } else {
                            ts.filterList.splice(1, 0, res);
                        }
                    });
                }
            },
        },
        watch:{
            filterList: {
                handler(curVal,oldVal){
                    const index = _.findIndex(this.filterList, { field: 'section' });
                    if (index > 0 && (this.filter.course === -1 || !this.filter.course)) {
                        const index = _.findIndex(this.filterList, { field: 'section' });
                        this.filterList.splice(index, 1);
                    }
                },
                deep:true
            },
            filter: {
                handler(curVal,oldVal){
                    if (curVal.course === -1) {
                        const index = _.findIndex(this.filterList, { field: 'section' });
                        if (index > -1) {
                            this.filterList.splice(index, 1);
                        }
                    }
                },
                deep:true
            }
        },
        components: {
            'Page': Pagination,
            myFilter,
        },
        mounted() {
            this.getFilter();
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>