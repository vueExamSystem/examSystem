<template>
    <section>
        <div class="panel">
            <div class="title">
                <el-input placeholder="请输入搜索关键词" v-model="keyword">
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
                        highlight-current-row
                        v-loading="listLoading"
                        @selection-change="selsChange"
                        style="width: 100%;">
                    <el-table-column type="index" label="ID" sortable>
                    </el-table-column>
                    <el-table-column prop="name" label="课程名称" sortable>
                    </el-table-column>
                    <el-table-column prop="subject" label="学科" sortable>
                    </el-table-column>
                    <el-table-column prop="grade" label="年级" sortable>
                    </el-table-column>
                    <el-table-column prop="creator" label="创建人" sortable>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button type="text" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </section>
</template>

<script>
    import {getCourseList} from '../../../api/api';
    import Pagination from '../../common/Pagination.vue'

    export default {
        data() {
            return {
                keyword: '',
                filters: {
                    name: ''
                },
                list: [],
                total: 0,
                page: 1,
                pageSize: 5,
                listLoading: false,
                sels: [],//列表选中列

            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(val);
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            search() {},
            //获取用户列表
            getList() {
                let para = {
                    page: this.page,
                    name: this.filters.name,
                    pageSize: this.pageSize
                };
                this.listLoading = true;
                //NProgress.start();
                getCourseList(para).then((res) => {
                    this.total = res.data.total;
                    this.list = res.data.list;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
        },
        components: {
            'Page': Pagination,
        },
        mounted() {
            this.getList();
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>