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
                        ref="expandTable"
                        @cell-click="toggleExpand"
                        :data="rows"
                        class="el-table-expand"
                        highlight-current-row
                        v-loading="listLoading"
                        style="width: 100%;">
                    <el-table-column type="index" label="序号" width="60">
                    </el-table-column>
                    <el-table-column
                            type="expand"
                            width="10"
                            prop="children">
                        <template slot-scope="scope">
                            <div style="margin: -20px -50px;">
                                <el-table class="el-inner-table" :data="scope.row.children" :show-header="false"
                                          highlight-current-row fit>
                                    <el-table-column type="index" width="60">
                                       <!--  <template></template> -->
                                    </el-table-column>
                                    <el-table-column prop="questionName" width="310">
                                        <!-- <template slot-scope="props">
                                            <router-link to="/">{{props.row.name}}</router-link>
                                        </template> -->
                                    </el-table-column>
                                    <el-table-column prop="questionType" width="100">
                                    </el-table-column>
                                    <el-table-column prop="course" label="所属课程">
                                        <!-- <template slot-scope="scope">
                                            <span v-if="scope.row.course">{{scope.row.course.name}}</span>
                                        </template> -->
                                    </el-table-column>
                                    <el-table-column prop="section" label="所属章节" width="200">
                                     <!--    <template slot-scope="scope">
                                            <span v-if="scope.row.section">{{scope.row.section.name}}</span>
                                        </template> -->
                                    </el-table-column>
                                    <el-table-column width="200">
                                        <template slot-scope="props">
                                            <i class="iconfont icon-remove-circle"
                                               @click="delQuestion(props.row.questionId)"></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="组别名称"
                            width="300"
                            prop="name">
                    </el-table-column>
                     <el-table-column
                            label="题型类别"
                            prop="questionType" width="100">
                    </el-table-column>
                    <el-table-column prop="course" label="课程" sortable>
                       <!--  <template slot-scope="scope">
                            <span v-if="scope.row.course">{{scope.row.course.name}}</span>
                        </template> -->
                    </el-table-column>
                    <el-table-column prop="section" label="所属章节" sortable width="200">
                    <!--     <template slot-scope="scope">
                            <span v-if="scope.row.section">{{scope.row.section.name}}</span>
                        </template> -->
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="200">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="addGroup(scope.row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="delGroup(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="title">

                <!--分页-->
                <div class="pageArea">
                    <Page :pageNo="pageNo" :totalCount="totalCount" :pageSize="pageSize"
                          @page-change="handleCurrentChange"></Page>
                </div>

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
    import {
        getSameList,
        getSameFilter,
        getSectionFilter,
        removeSameQuestion,
        removeSameGroup,
        getSameTreeList,
        addQuestionToGroup,
    } from '../../../api/api';
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
            toggleExpand(row, column, cell, event){//折叠展开
                if(column.property == 'name'){
                    this.$refs.expandTable.toggleRowExpansion(row);
                }
            },
            getCheckedNodes() {
                const checkArr = this.$refs.tree.getCheckedNodes();
                let para = checkArr.filter(item => { return !item.children });
                para = para.map(item => item.id);
                // 弹出框选择的题目
                //console.log('ids',para);
                // 题组id
                //console.log(this.addId);
                // 去掉弹框放请求成功里
                para=JSON.stringify(para);
                //console.log('ids',para);
                para={  'groupid': this.addId,
                        'ids': para,};
                
                // 请求
                this.$confirm('确认添加相似题组吗？', '提示', {}).then(() => {
                    addQuestionToGroup(para).then(res => {
                        if (res.code === 0) {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.addFormVisible = false;
                            this.getList();
                        } else {
                            this.$message({
                                message: '添加失败',
                                type: 'error'
                            });
                        }
                    });
                });
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
                    res=res.data;
                    //console.log('getSameList',res);
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
            delGroup(id) {
                this.$confirm('确认删除相似题组吗？', '提示', {}).then(() => {
                    var para = {'groupid': id,};
                    removeSameGroup(para).then(res => {
                        if (res.code === 0) {
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
                this.$confirm('确认从相似题组移除试题吗？', '提示', {}).then(() => {
                    var para = {'questionid': id,};
                    console.log(para);
                    removeSameQuestion(para).then(res => {
                        if (res.code === 0) {
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
            addGroup(row) {
                this.addId = row.id;//选中题组id
                var para={
                    'groupId':row.id,
                    'courseId':row.courseId,
                    'course':row.course,
                    'sectionId':row.sectionId,
                    'section':row.section,
                    'questionTypeId':row.questionTypeId
                };
                this.addFormVisible = true;
                this.treeLoading = true;
                getSameTreeList(para).then(res => {
                    this.addRows = [res.data];
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

