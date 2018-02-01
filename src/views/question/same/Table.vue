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
                        class="el-table-expand"
                        highlight-current-row
                        v-loading="listLoading"
                        style="width: 100%;">
                    <el-table-column type="index" label="ID" width="60">
                    </el-table-column>
                    <el-table-column
                            type="expand"
                            prop="children">
                        <template slot-scope="scope">
                            <div style="margin: -20px -50px;">
                                <el-table class="el-inner-table" :data="scope.row.children" :show-header="false"
                                          highlight-current-row fit>
                                    <el-table-column prop="index" width="60">
                                        <template></template>
                                    </el-table-column>
                                    <el-table-column prop="name" min-width="160">
                                        <template slot-scope="props">
                                            <router-link to="/">{{props.row.name}}</router-link>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="type" min-width="100">
                                    </el-table-column>
                                   <el-table-column prop="course" label="课程" sortable>
                                            <template slot-scope="scope">
                        <span v-if="scope.row.course">{{scope.row.course.name}}</span>
                      </template>   
                    </el-table-column>
                                 <el-table-column prop="section" label="所属章节" sortable>
                                            <template slot-scope="scope">
                        <span v-if="scope.row.section">{{scope.row.section.name}}</span>
                      </template>   
                    </el-table-column>
                                    <el-table-column width="100">
                                        <template slot-scope="props">
                                            <i class="iconfont icon-remove-circle" @click="delQuestion(props.row.id)"></i>
                                            <i class="iconfont icon-add-circle"></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="组别名称"
                            prop="name">
                    </el-table-column>
                     <el-table-column prop="course" label="课程" sortable>
                                            <template slot-scope="scope">
                        <span v-if="scope.row.course">{{scope.row.course.name}}</span>
                      </template>   
                    </el-table-column>
                    <el-table-column prop="section" label="所属章节111" sortable>
                                            <template slot-scope="scope">
                        <span v-if="scope.row.section">{{scope.row.section.name}}</span>
                      </template>   
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button type="danger" size="small" @click="delDepartment(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </section>
</template>

<script>
    import u from '../../../common/js/util';
    import {getSameGroupList, getSameFilter, getSectionFilter} from '../../../api/api';
    import myFilter from '../../common/myFilter.vue';
    import Pagination from '../../common/Pagination.vue';
    import _ from 'lodash';

    export default {
        data() {
            return {
                keyword: '',
                filter: {},
                rows: [],
                totalCount: 0,
                pageNo: 1,
                pageSize: 5,
                listLoading: false,
                filterLoading: false,

                filterList: [],
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.pageNo = val;
                this.getUsers();
            },
            search(obj) {
                this.filters = obj;
                this.getList();
            },
            getList() {
                let para = {
                    pageNo: this.pageNo,
                    keyword: this.keyword,
                    filter: JSON.stringify(this.filter),
                    pageSize: this.pageSize
                };
                if (!this.listLoading) this.listLoading = true;
                getSameGroupList(para).then((res) => {
                    this.totalCount = res.totalCount;
                    this.rows = res.rows;
                    if (!this.filterLoading) this.listLoading = false;
                });
            },
            // 获取过滤器数据
            getFilter() {
                this.filterLoading = true;
                this.listLoading = true;
                getSameFilter({}).then((res) => {
                    this.filterList = res;
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
                        const index = _.findIndex(ts.filterList, { field: res.field });
                        if (index > -1) {
                            ts.filterList[index] = res;
                        } else {
                            ts.filterList.splice(1, 0, res);
                        }
                    });
                }
            },
            delDepartment(id){
                console.log('del department id = ', id);
            },
            delQuestion(id) {
                console.log('del question id = ', id);
            }
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
        computed: {
            isLastQuestion(props, scope) {
                console.log(props);
                console.log(scope);
                debugger;
                let flag = false;
                if (_.parseInt(props.$index) === this.list[scope.$index].children.length) {
                    flag = true;
                }
                return flag;
            }
        },
        mounted() {
            this.getFilter();
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>