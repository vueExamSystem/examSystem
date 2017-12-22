<template>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="试卷列表" name="paperlist">
        列表
        <section>
            <el-col :span="24">
                <el-button type="success" class="el-button-shadow">保存</el-button>
                <el-button type="danger" class="el-button-shadow">取消</el-button>
            </el-col>
            
            <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column type="index" width="60">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120" sortable>
                </el-table-column>
                <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
                </el-table-column>
                <el-table-column prop="age" label="年龄" width="100" sortable>
                </el-table-column>
                <el-table-column prop="birth" label="生日" width="120" sortable>
                </el-table-column>
                <el-table-column prop="addr" label="地址" min-width="180" sortable>
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template scope="scope">
                        <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="danger" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </section>
        </el-tab-pane>
        <el-tab-pane label="添加试卷" name="paperadd">添加</el-tab-pane>
    </el-tabs>
</template>

<script>
    import util from '../../../common/js/util'
    //import NProgress from 'nprogress'
    import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../../api/api';

    export default {
        data() {
            return {
                activeName:'paperlist',
                filters: {
                    name: ''
                },
                users: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
            }
        },
        methods: {
            handleClick(tab, event){
                console.log('tab',tab,event);
            },
            //性别显示转换
            formatSex: function (row, column) {
                return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            //获取用户列表
            getUsers() {
                let para = {
                    page: this.page,
                    name: this.filters.name
                };
                this.listLoading = true;
                //NProgress.start();
                getUserListPage(para).then((res) => {
                    this.total = res.data.total;
                    this.users = res.data.users;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { id: row.id };
                    removeUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(() => {

                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            }
        },
        mounted() {
            this.getUsers();
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>
