<template>
    <div>
        <section v-if="detailId === ''" id="roleTable">
            <div class="panel">
                <div class="content">
                    <!--列表-->
                    <el-table
                            :data="list"
                            highlight-current-row
                            v-loading="listLoading"
                            @selection-change="selsChange"
                            style="width: 100%;">
                        <el-table-column type="index" label="ID" hidden>
                        </el-table-column>
                        <el-table-column prop="role" label="角色" sortable>
                            <template slot-scope="scope">
                                <el-button type="text" @click="detailShow(scope.row.id)">{{scope.row.role}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="competence" label="权限" sortable>
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="100">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </section>
        <section v-else>
            <role-form :id="detailId" @close="detailClose"></role-form>
        </section>
    </div>

</template>

<script>
    import {getRoleList} from '../../../api/api';
    import Pagination from '../../common/Pagination.vue'
    import roleForm from './Form.vue'

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

                detailId: '',
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
                getRoleList(para).then((res) => {
                    this.total = res.data.total;
                    this.list = res.data.list;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            detailShow(id) {
                console.log('detailShow', id);
                this.detailId = id;
            },
            detailClose() {
                this.detailId = '';
            }
        },
        components: {
            'Page': Pagination,
            roleForm,
        },
        mounted() {
            this.getList();
        }
    }

</script>

<style lang="scss">
    @import '~scss_vars';
    #roleTable{
        table{
            border-top: 1px solid $color-primary;
        }
    }
</style>