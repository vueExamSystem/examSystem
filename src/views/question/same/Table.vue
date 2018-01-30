<template>
    <section>
        <my-filter :list="filterList" @callback="search"></my-filter>
        <div class="panel">
            <div class="title">
                <el-input placeholder="请输入搜索关键词" v-model="searchkey">
                    <el-button slot="append" icon="el-icon-search" @click="getLists"></el-button>
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
                        class="el-table-expand"
                        highlight-current-row
                        v-loading="listLoading"
                        @selection-change="selsChange"
                        style="width: 100%;">
                    <el-table-column type="index" label="ID" width="60">
                    </el-table-column>
                    <el-table-column
                            type="expand"
                            prop="children">
                        <template scope="scope">
                            <div style="margin: -20px -50px;">
                                <el-table class="el-inner-table" :data="scope.row.children" :show-header="false"
                                          highlight-current-row v-loading="listLoading" fit>
                                    <el-table-column prop="index" width="60">
                                        <template></template>
                                    </el-table-column>
                                    <el-table-column prop="name" min-width="160">
                                        <template scope="props">
                                            <router-link to="/">{{props.row.name}}</router-link>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="type" min-width="100">
                                    </el-table-column>
                                    <el-table-column prop="subject" min-width="120">
                                    </el-table-column>
                                    <el-table-column prop="chapter" min-width="100">
                                    </el-table-column>
                                    <el-table-column width="100">
                                        <template scope="props">
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
                    <el-table-column
                            label="所属课程"
                            prop="subject">
                    </el-table-column>
                    <el-table-column
                            label="所属章节"
                            prop="chapter">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="100">
                        <template scope="scope">
                            <el-button type="danger" size="small" @click="delDepartment(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </section>
</template>

<script>
    import {getGroupList} from '../../../api/api';
    import myFilter from '../../common/myFilter.vue';
    import Pagination from '../../common/Pagination.vue';
    import _ from 'lodash';

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
                pageSize: 5,
                listLoading: false,
                sels: [],//列表选中列


                filterList: [
                    {
                        title: '课程',
                        field: 'project',
                        children: [{
                            value: 'physics',
                            text: '大学物理'
                        }, {
                            value: 'mathematics',
                            text: '高等数学'
                        }, {
                            value: 'english',
                            text: '大学英语'
                        }]
                    }, {
                        title: '分类',
                        field: 'kind',
                        children: [{
                            value: 'type1',
                            text: '分类一'
                        }, {
                            value: 'type2',
                            text: '分类二'
                        }, {
                            value: 'type3',
                            text: '分类三'
                        }]
                    }],
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(val);
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            search() {
            },
            getList() {
                let para = {
                    page: this.page,
                    name: this.filters.name,
                    pageSize: this.pageSize
                };
                this.listLoading = true;
                //NProgress.start();
                getGroupList(para).then((res) => {
                    this.total = res.data.total;
                    this.list = res.data.list;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            delDepartment(id){
                console.log('del department id = ', id);
            },
            delQuestion(id) {
                console.log('del question id = ', id);
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
            this.getList();
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>