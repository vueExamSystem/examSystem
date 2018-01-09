<template>
    <div>
        <section v-if="!courseId" id="courseTable">
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
                    <!--列表-->
                    <el-table
                            :data="list"
                            highlight-current-row
                            @selection-change="selsChange"
                            v-loading="listLoading"
                            style="width: 100%;">
                        <el-table-column type="index" label="ID">
                        </el-table-column>
                        <el-table-column prop="name" label="课程" sortable>
                            <template scope="scope">
                                <el-button type="text" @click="detailShow(scope.row.id)">{{scope.row.name}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="className" label="班级名称" sortable>
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="100">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small">添加</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </section>
        <section v-else>
        </section>
    </div>
</template>

<script>
    import {getDepartmentList} from '../../../api/api';
    import myFilter from '../../common/myFilter.vue'
    import Pagination from '../../common/Pagination.vue'

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
                    }],
                // 选择某个班级id
                courseId: '',
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
            // 显示详情面板
            detailShow(id) {
                this.courseId = id;
            },
            // 关闭详情面板
            detailClose() {
                this.courseId = '';
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

<style lang="scss">
    @import '~scss_vars';

</style>