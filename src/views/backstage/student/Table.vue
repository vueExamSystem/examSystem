<template>
    <section id="studentTable">
        <my-filter :list="filterList" @callback="search"></my-filter>
        <div class="panel">
            <div class="title">
                <el-input placeholder="请输入搜索关键词" v-model="searchkey">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>

                <!--分页-->
                <div class="pageArea">
                    <Page :current="page" :total="total" :pageSize="pageSize" @page-change="handleCurrentChange"></Page>
                </div>

            </div>

            <div class="content">
                <el-collapse
                        accordion
                        v-model="activeName"
                        v-for="(item, index) in list">
                    <template>
                        <el-collapse-item>
                            <template slot="title" name="index">
                                <div v-if="!isShowResetInput(index)">
                                    <span>{{item.department}}</span>
                                    <el-button type="primary" @click="resetNameEvent(index)" class="el-button-shadow">重命名</el-button>
                                    <el-button type="success" @click="" class="el-button-shadow">添加班级</el-button>
                                </div>
                                <div v-if="isShowResetInput(index)">
                                    <div class="resetNameInput">
                                        <el-input v-model="item.department"></el-input>
                                    </div>
                                    <el-button type="success" @click="saveResetName(index)" class="el-button-shadow">保存</el-button>
                                    <el-button type="danger" @click="cancelResetName()" class="el-button-shadow">取消</el-button>
                                </div>
                            </template>
                            <!--列表-->
                            <el-table
                                    :data="item.classArr"
                                    highlight-current-row
                                    @selection-change="selsChange"
                                    style="width: 100%;">
                                <el-table-column type="index" label="ID">
                                </el-table-column>
                                <el-table-column prop="name" label="班级名称" sortable>
                                </el-table-column>
                                <el-table-column prop="personNum" label="班级人数" sortable>
                                </el-table-column>
                                <el-table-column prop="counselor" label="辅导员" sortable>
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        width="100">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small">编辑</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>

                        </el-collapse-item>
                    </template>
                </el-collapse>
            </div>
        </div>
    </section>
</template>

<script>
    import {getChapterList} from '../../../api/api';
    import myFilter from '../../common/myFilter.vue'
    import Pagination from '../../common/Pagination.vue'

    export default {
        data() {
            return {
                searchkey: '',
                filters: {
                    name: ''
                },
                list: [
                    {
                        id: 1,
                        department: '计算机',
                        classArr: [
                            {
                                id: 1,
                                name: '1班',
                                personNum: 40,
                                counselor: '张老师',
                            }, {
                                id: 2,
                                name: '2班',
                                personNum: 40,
                                counselor: '张老师',
                            }, {
                                id: 3,
                                name: '3班',
                                personNum: 40,
                                counselor: '张老师',
                            }
                        ],
                    }, {
                        id: 1,
                        department: '物电学院',
                        classArr: [
                            {
                                id: 1,
                                name: '1班',
                                personNum: 40,
                                counselor: '李老师',
                            }, {
                                id: 2,
                                name: '2班',
                                personNum: 40,
                                counselor: '柳老师',
                            }, {
                                id: 3,
                                name: '3班',
                                personNum: 40,
                                counselor: '张老师',
                            }
                        ],
                    },
                ],
                total: 0,
                page: 1,
                pageSize: 5,
                listLoading: false,
                sels: [],//列表选中列
                activeName: 0,
                resetIndex: '',

                filterList: [
                    {
                        title: '年级',
                        field: 'project',
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
            //获取用户列表
            getList() {
                let para = {
                    page: this.page,
                    name: this.filters.name,
                    pageSize: this.pageSize
                };
                this.listLoading = true;
                //NProgress.start();
//                getChapterList(para).then((res) => {
//                    this.total = res.data.total;
//                    this.list = res.data.list;
//                    this.listLoading = false;
//                    //NProgress.done();
//                });
            },
            // 重命名
            resetNameEvent(index){
                this.resetIndex = index;
            },
            // 保存重命名名称
            saveResetName(index) {
                console.log('save name success index = ', index);
                this.cancelResetName();
            },
            // 取消重命名
            cancelResetName() {
                this.resetIndex = '';
            },
            isShowResetInput(index) {
                return index === this.resetIndex;
            },
        },
        components: {
            'Page': Pagination,
            myFilter,
        },
        computed: {

        },
        mounted() {
            this.getList();
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';

    #studentTable{
        .el-collapse {
            .el-collapse-item__content{
                padding: 0;
            }
        }
        .resetNameInput{
            width: 240px;
            display: inline-block;
        }
    }
</style>