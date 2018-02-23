<template>
    <section v-loading="filterLoading">
        <my-filter v-if="filterList.length > 0" :list="filterList" @callback="search" @linkage="linkage"></my-filter>
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
            <el-dialog title="添加相似题组" :visible.sync="addFormVisible">
                <el-tree
                        ref="tree"
                        highlight-current
                        :data="addRows"
                        :props="defaultProps"
                        show-checkbox
                        node-key="id"
                        v-loading="treeLoading"
                        default-expand-all
                        :expand-on-click-node="false">
                </el-tree>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="addFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="getCheckedNodes">提交</el-button>
                </div>
            </el-dialog>
        </div>
    </section>
</template>

<script>
    import u from '../../../common/js/util';
    import {getSameList, getSameFilter, getSectionFilter, delDemo, getSameTreeList} from '../../../api/api';
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
                pageSize: 5,
                listLoading: false,
                filterLoading: false,
                allLoading: false,

                filterList: [],

                addFormVisible: false,
                addId: '',
                treeLoading: false,
                addRows: [],
                defaultProps: {
                    children: 'children',
                    label: 'label',
                }
            }
        },
        methods: {
            getCheckedNodes() {
                const checkArr = this.$refs.tree.getCheckedNodes();
                const para = checkArr.filter(item => { return !item.children });
                // 弹出框选择的题目
                console.log(para);
                // 题组id
                console.log(this.addId);
                // 去掉弹框放请求成功里面
                // this.addFormVisible = false;
                // todo请求
            },
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
                this.getList();
            },
            search(obj) {
                this.filter = obj;this.pageNo = 1;
                this.pageNo = 1;
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
                    res = res.data;
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
                    // res = res.data;
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
                        filter: {
                            courseid: value,
                        }
                    }).then(res => {
                        this.filterLoading = false;
                        const index = _.findIndex(ts.filterList, {field: res.field});
                        if (index > -1) {
                            // this.filterList[index] = res;
                            ts.filterList.splice(1, 1, res);
                        } else {
                            ts.filterList.splice(1, 0, res);
                        }
                        // console.log('linkage filterList', this.filterList);
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
                this.treeLoading = true;
                getSameTreeList({
                    courseid: id,
                }).then(res => {
                    this.addRows = res.data;
                    this.treeLoading = false;
                });
            },
            addFormSubmit() {
                // this.$refs.addForm.onSubmit();
            },
            append(data) {
                const newChild = { id: id++, label: 'testtest', children: [] };
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                data.children.push(newChild);
            },
            remove(node, data) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },
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
            this.allLoading = true;
            this.getFilter();
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>