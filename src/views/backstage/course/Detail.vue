<template>
    <div>
        <section id="courseTable">
            <my-filter :list="filterList" @callback="search" @backstageCourseAdd="backstageCourseAdd"></my-filter>
            <div class="panel">
                <div class="title">
                    <el-input placeholder="请输入搜索关键词" v-model="keyword">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>

                    <!--分页-->
                    <div class="pageArea">
                        <Page :current="page" :total="total" :pageSize="pageSize"
                              @page-change="handleCurrentChange"></Page>
                    </div>

                </div>

                <div class="content">
                    <!--列表-->
                    <el-table
                            :data="list"
                            highlight-current-row
                            @selection-change="selsChange"
                            v-loading="listLoading"
                            style="width: 100%;">
                        <el-table-column type="index" label="ID">
                        </el-table-column>
                        <el-table-column prop="name" label="班级" sortable>
                            <template scope="scope">
                                <el-button type="text" @click="detailShow(scope.row.id)">{{scope.row.name}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="className" label="参加人数/总人数" sortable :formatter="formatNumber">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="200">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small">编辑</el-button>
                                <el-button type="success" size="small">保存</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import {getClassList} from '../../../api/api';
    import myFilter from '../../common/myFilter.vue'
    import Pagination from '../../common/Pagination.vue'

    export default {
        data() {
            return {
                keyword: '',
                filters:[],
                list: [],
                total: 0,
                page: 1,
                pageSize: 5,
                listLoading: true,
                sels: [],//列表选中列
                // 过滤器数据
                filterList: [],
            }
        },
        methods: {
            formatNumber: function (row, column) {
                return `${row.selectedNum}/${row.person}`;
            },
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
            //获取用户列表
            getList() {
                let para = {
                    page: this.page,
                    name: this.filters.name,
                    pageSize: this.pageSize
                };
                this.listLoading = true;
                //NProgress.start();
                getClassList(para).then((res) => {
                    this.list = res.data.list;
                    this.listLoading = false;
                    //this.filterList = this.getFilterList();
                    //NProgress.done();
                });
            },
            // 显示详情面板
            detailShow(id) {
                this.courseId = id;
            },
            // 关闭详情面板
            detailClose() {
                this.courseId = '';
            },
            backstageCourseAdd() {
                console.log('backstageCourseAdd');
            },
            getFilterList() {
                let res;
                if (this.list.length === 0) {
                    res = [];
                } else {
                    res = [
                        {
                            title: '年级',
                            field: 'grade',
                            children: [{
                                value: '14',
                                text: '14级'
                            }, {
                                value: '15',
                                text: '15级'
                            }, {
                                value: '16',
                                text: '16级'
                            }]
                        }, {
                            title: '院系',
                            field: 'department',
                            children: [{
                                value: '14',
                                text: '计算机'
                            }, {
                                value: '15',
                                text: '物电学院'
                            }, {
                                value: '16',
                                text: '小学教育'
                            }]
                        }, {
                            title: '班级',
                            field: 'class',
                            arr: [
                                {
                                    id: 0,
                                    type: 'select',
                                    data: this.list,
                                }, {
                                    id: 1,
                                    type: 'button',
                                    classType: 'primary',
                                    text: '添加',
                                    eventName: 'backstageCourseAdd',
                                },
                            ],
                        }
                    ];
                    return res;
                }

            }
        },
        components: {
            'Page': Pagination,
            myFilter,
        },
        computed: {
            classArr() {
                return this.list;
            },
        },
        mounted() {
            this.getList();
        }
    }

</script>

<style lang="scss">
    @import '~scss_vars';

</style>