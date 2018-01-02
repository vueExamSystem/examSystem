<template>
    <section>
        <my-filter :list="filterList" @callback="search"></my-filter>
        <div class="panel">
            <div class="title">
                <el-input placeholder="请输入搜索关键词" v-model="searchkey">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>

                <!--分页-->
                <div class="pageArea">
                    <Page current="1" total="23" pageSize="5" @page-change="handleCurrentChange"></Page>
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
                    <el-table-column prop="name" label="试题名称" sortable>
                    </el-table-column>
                    <el-table-column prop="type" label="试题类型" sortable>
                    </el-table-column>
                    <el-table-column prop="subject" label="所属课程" sortable>
                    </el-table-column>
                    <el-table-column prop="chapter" label="所属章节" sortable>
                    </el-table-column>
                    <el-table-column prop="creator" label="创建人" sortable>
                    </el-table-column>
                    <el-table-column prop="same" label="相似题组" sortable>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </section>
</template>

<script>
    import util from '../../../common/js/util'
    import {getQueList} from '../../../api/api';
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
                        title: '章节',
                        field: 'chapter',
                        children: [{
                            value: 'physics',
                            text: '基础物理'
                        }, {
                            value: 'mathOne',
                            text: '高等数学上'
                        }, {
                            value: 'mathTwo',
                            text: '高等数学下'
                        }, {
                            value: 'english',
                            text: '英语口语'
                        }]
                    }, {
                        title: '题型',
                        field: 'questionType',
                        children: [{
                            value: 'radio',
                            text: '单选'
                        }, {
                            value: 'multiple',
                            text: '多选'
                        }, {
                            value: 'judgment',
                            text: '判断'
                        }, {
                            value: 'fillIn',
                            text: '填空'
                        }, {
                            value: 'short',
                            text: '简答'
                        }, {
                            value: 'analysis',
                            text: '分析'
                        }, {
                            value: 'discussion',
                            text: '论述'
                        }]
                    }, {
                        title: '类别',
                        field: 'kind',
                        children: [{
                            value: 'exam',
                            text: '考试'
                        }, {
                            value: 'quiz',
                            text: '随堂测试'
                        }, {
                            value: 'exercises',
                            text: '练习题'
                        }]
                    }, {
                        title: '标签',
                        field: 'tip',
                        children: [{
                            value: 'sendPoints',
                            text: '送分题'
                        }, {
                            value: 'simple',
                            text: '简单题'
                        }, {
                            value: 'easyProblem',
                            text: '易错题'
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
                getQueList(para).then((res) => {
                    this.total = res.data.total;
                    this.list = res.data.list;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
        },
        components: {
            'Page': Pagination,
            myFilter,
        },
        mounted() {
            this.getList();
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>