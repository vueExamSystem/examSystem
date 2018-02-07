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
                    <Page :pageNo="pageNo" :totalCount="totalCount" :pageSize="pageSize"
                          @page-change="handleCurrentChange"></Page>
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
                                            <i class="iconfont icon-remove-circle"
                                               @click="delQuestion(props.row.id)"></i>
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
                    <el-table-column prop="section" label="所属章节" sortable>
                        <template slot-scope="scope">
                            <span v-if="scope.row.section">{{scope.row.section.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="200">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="addDepartment(scope.row.id)">添加</el-button>
                            <el-button type="danger" size="small" @click="delDepartment(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!--编辑界面-->
            <el-dialog title="添加试题" :visible.sync="addFormVisible" class="noPadding">
                <add-que @toTable="toTable" :sameId="addId" ref="addForm"></add-que>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="addFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="addFormSubmit">提交</el-button>
                </div>
            </el-dialog>
        </div>
    </section>
</template>

<script>
    import u from '../../../common/js/util';
    import {getSameList, getSameFilter, getSectionFilter, delDemo} from '../../../api/api';
    import myFilter from '../../common/myFilter.vue';
    import Pagination from '../../common/Pagination.vue';
    import AddQue from '../que/Add.vue';
    import _ from 'lodash';

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

                addFormVisible: false,
                addId: '',
            }
        },
        methods: {
            toTable() {
                this.getList();
            },
            isNeedAddIcon(scope, props) {
                let is = false;
                if (scope && props) {
                    const arr = scope.row.children;
                    const len = arr.length;
                    if (arr[len - 1].id === props.row.id) {
                        is = true;
                    }
                }
                return is;
            },
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
                getSameList(para).then((res) => {
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
                    console.log('getSameFilter table',res);
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
                        console.log('getSectionFilter table',res);
                        res=res.data;
                        this.filterLoading = false;
                        const index = _.findIndex(ts.filterList, {field: res.field});
                        if (index > -1) {
                            ts.filterList[index] = res;
                        } else {
                            ts.filterList.splice(1, 0, res);
                        }
                    });
                }
            },
            // 删除题组
            delDepartment(id) {
                this.$confirm('确认删除吗？', '提示', {}).then(() => {
                    delDemo({
                        id,
                    }).then(res => {
                        if (res.code === '0') {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getList();
                        } else {
                            this.$message({
                                message: '删除失败',
                                type: 'error'
                            });
                        }
                    });
                });
            },
            // 删除试题
            delQuestion(id) {
                this.$confirm('确认删除吗？', '提示', {}).then(() => {
                    delDemo({
                        id,
                    }).then(res => {
                        if (res.code === '0') {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getList();
                        } else {
                            this.$message({
                                message: '删除失败',
                                type: 'error'
                            });
                        }
                    });
                });
            },
            addDepartment(id) {
                this.addId = id;
                this.addFormVisible = true;
            },
            addFormSubmit() {
                this.$refs.addForm.onSubmit();
            }
        },
        watch: {
            filterList: {
                handler(curVal, oldVal) {
                    const index = _.findIndex(this.filterList, {field: 'section'});
                    if (index > 0 && (this.filter.course === -1 || !this.filter.course)) {
                        const index = _.findIndex(this.filterList, {field: 'section'});
                        this.filterList.splice(index, 1);
                    }
                },
                deep: true
            },
            filter: {
                handler(curVal, oldVal) {
                    if (curVal.course === -1) {
                        const index = _.findIndex(this.filterList, {field: 'section'});
                        if (index > -1) {
                            this.filterList.splice(index, 1);
                        }
                    }
                },
                deep: true
            }
        },
        components: {
            'Page': Pagination,
            myFilter,
            AddQue,
        },
        computed: {
        },
        mounted() {
            this.getFilter();
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>