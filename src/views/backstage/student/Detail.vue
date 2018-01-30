<template>
    <div class="panel">
        <div class="title">
            <span>{{detail.name}}</span>
            <div class="pull-right">
                <el-button type="primary" class="el-button-shadow" @click="close">添加</el-button>
                <el-button type="success" class="el-button-shadow" @click="close">导入</el-button>
                <el-button type="danger" class="el-button-shadow" @click="close">关闭</el-button>
            </div>
        </div>
        <div class="content">
            <div class="paper-progress">
                <table>
                    <tr>
                        <td>所属院系</td>
                        <td>{{detail.department}}</td>
                        <td>班级</td>
                        <td>{{detail.className}}</td>
                    </tr>
                    <tr>
                        <td>男/女/总人数</td>
                        <td>{{detail.boyNum}}/{{detail.girlNum}}/{{detail.boyNum + detail.girlNum}}</td>
                        <td>辅导员</td>
                        <td>{{detail.counselor}}</td>
                    </tr>
                </table>
            </div>
            <div class="panel inner-panel">
                <div class="title">
                    <el-input placeholder="请输入搜索关键词" v-model="keyword">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <div class="pageArea">
                        <Page :current="currentPage" :total="total" :pageSize="pageSize"
                              @page-change="pageChange"></Page>
                    </div>
                </div>
                <div class="content">
                    <el-table :data="detail.studentArr" highlight-current-row fit>
                        <el-table-column type="index" label="序号" width="60">
                        </el-table-column>
                        <el-table-column prop="studentId" label="学号" min-width="120"></el-table-column>
                        <el-table-column prop="name" label="姓名" min-width="100"></el-table-column>
                        <el-table-column prop="className" label="班级" min-width="160"></el-table-column>
                        <el-table-column prop="sex" label="性别" min-width="160"></el-table-column>
                        <el-table-column prop="account" label="帐号" min-width="150"></el-table-column>
                        <el-table-column
                                label="重置密码"
                                width="100">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small">重置</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Pagination from '../../common/Pagination.vue'

    export default {
        props: {
            id: {
                required: true
            }
        },
        components: {
            'Page': Pagination
        },
        data() {
            return {
                detail: {
                    name: '16级计算机科学与技术3班',
                    department: '计算机科学与技术',
                    className: '3班',
                    boyNum: 20,
                    girlNum: 14,
                    counselor: 'Miss Li',
                    studentArr: [
                        {
                            id: 1,
                            studentId: 211111011,
                            name: '张三',
                            className: '16级计算机科学与技术3班',
                            sex: '男',
                            account: 1112322,
                        },{
                            id: 2,
                            studentId: 211111014,
                            name: '王二',
                            className: '16级计算机科学与技术3班',
                            sex: '男',
                            account: 1112323,
                        },{
                            id: 3,
                            studentId: 211111012,
                            name: '李四',
                            className: '16级计算机科学与技术3班',
                            sex: '女',
                            account: 1112324,
                        },
                    ],
                },
                keyword: '',
                currentPage: 1,
                total: 0,
                pageSize: 10,
                listLoading: true,
            }
        },
        methods: {
            search(filterArr) {

            },
            pageChange() {

            },
            close() {
                this.$emit('close');
            },
        }
    }
</script>
<style lang="scss" scoped="">
    @import '~scss_vars';

    .filter-wrap {
        box-shadow: none;
        border-radius: 0;
    }

    .inner-panel {
        .content {
            border-width: 0;
        }
    }
</style>