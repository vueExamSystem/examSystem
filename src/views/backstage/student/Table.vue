<template>
    <div>
        <section v-if="!classId" id="studentTable">
            <my-filter :list="filterList" @callback="search" :loading="filterLoading"></my-filter>
            <div class="panel">
                <div class="title">
                    <el-input placeholder="请输入搜索关键词" v-model="searchkey">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>

                    <el-button type="success" @click="departmentAdd" class="el-button-shadow">添加院系</el-button>
                    <!--分页-->
                    <div class="pageArea">
                        <Page :current="page" :total="total" :pageSize="pageSize" @page-change="handleCurrentChange"></Page>
                    </div>

                </div>

                <div class="content">
                    <el-collapse
                            accordion
                            v-model="activeName"
                            value="0"
                            change="changeCollapse"
                            v-for="(item, index) in list">
                        <el-collapse-item>
                            <template slot="title" name="index">
                                <div v-if="!isShowResetInput(index)">
                                    <span>{{item.department}}</span>
                                    <el-button type="primary" @click="resetNameEvent($event, index)" class="el-button-shadow">重命名</el-button>
                                    <el-button type="success" @click="classAdd($event, index)" class="el-button-shadow">添加班级</el-button>
                                </div>
                                <div v-if="isShowResetInput(index)">
                                    <div class="resetNameInput">
                                        <el-input v-model="item.department"></el-input>
                                    </div>
                                    <el-button type="success" @click="saveResetName($event, index)" class="el-button-shadow">保存</el-button>
                                    <el-button type="danger" @click="cancelResetName($event)" class="el-button-shadow">取消</el-button>
                                </div>
                            </template>
                            <!--列表-->
                            <el-table
                                    :data="item.classArr"
                                    highlight-current-row
                                    @selection-change="selsChange"
                                    v-loading="listLoading"
                                    style="width: 100%;">
                                <el-table-column type="index" label="ID">
                                </el-table-column>
                                <el-table-column prop="name" label="班级名称" sortable>
                                    <template scope="scope">
                                        <el-button type="text" @click="detailShow(scope.row.id)">{{scope.row.name}}</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="personNum" label="班级人数" sortable>
                                </el-table-column>
                                <el-table-column prop="counselor" label="辅导员" sortable>
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        width="100">
                                    <template slot-scope="scope">
                                        <el-button type="primary" size="small">编辑</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>

                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </section>
        <section v-else>
            <class-detail id="classId" @close="detailClose"></class-detail>
        </section>
    </div>
</template>

<script>
    import {getDepartmentList} from '../../../api/api';
    import myFilter from '../../common/myFilter.vue'
    import Pagination from '../../common/Pagination.vue'
    import classDetail from './Detail.vue'

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
                listLoading: true,
                sels: [],//列表选中列
                // 手风琴选项的默认
                activeName: 0,
                // 重命名的排序索引
                resetIndex: '',
                // 过滤器数据
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
                // 选择某个班级id
                classId: '',
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
                getDepartmentList(para).then((res) => {
                    this.list = res.data.list;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            changeCollapse(val) {
                console.log('changeCollapse', val);
            },
            // 重命名
            resetNameEvent(e, index){
                e.stopPropagation();
                this.resetIndex = index;
            },
            // 保存重命名名称
            saveResetName(e, index) {
                e.stopPropagation();
                console.log('save name success index = ', index);
                this.resetIndex = '';
            },
            // 取消重命名
            cancelResetName(e) {
                e.stopPropagation();
                this.resetIndex = '';
            },
            isShowResetInput(index) {
                return index === this.resetIndex;
            },
            // 显示院系的详情面板
            detailShow(id) {
                this.classId = id;
            },
            // 关闭院系的详情面板
            detailClose() {
                this.classId = '';
            },
            departmentAdd() {},
            classAdd(e, index) {
                e.stopPropagation();
            },
        },
        components: {
            'Page': Pagination,
            myFilter,
            classDetail,
        },
        computed: {

        },
        mounted() {
            this.getList();
        }
    }

</script>

<style lang="scss">
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