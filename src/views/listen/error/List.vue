<template>
    <section>
        <div class="panel">
            <div class="title">
                <el-input placeholder="请输入搜索关键词" v-model="keyword">
                    <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
                </el-input>

                <!--分页-->
                <div class="pageArea">
                    <Page :pageNo="pageNo" :totalCount="totalCount" :pageSize="pageSize"
                          @page-change="handleCurrentChange"></Page>
                </div>

            </div>

            <div class="content">
                <!--列表-->
                <el-table :data="rows" highlight-current-row v-loading="listLoading" fit>
                    <el-table-column type="index" label="序号" width="120">
                    </el-table-column>
                    <el-table-column prop="abnTime" label="时间" min-width="120"></el-table-column>
                    <el-table-column prop="abnEvent" label="事件" min-width="200">
                        <template scope="scope">
                            <span>{{scope.row.studentName}}（{{scope.row.studentNo}}） {{scope.row.abnEvent}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="操作" min-width="160">
                        <template scope="scope">
                            <el-button type="primary" plain disabled v-if="scope.row.isOutline">已强制下线</el-button>
                            <el-button type="primary" v-else @click="forceToOutline(scope.row)">强制下线</el-button>
                            <el-button type="danger" plain disabled v-if="scope.row.isCheap">已作弊处理</el-button>
                            <el-button type="danger" v-else @click="signIncheap(scope.row)">作弊处理</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </section>
</template>

<script>
    import { getAbnormalList, updateAbnormal } from '../../../api/api';
    import Pagination from '../../common/Pagination.vue';
    import _ from 'lodash';

    export default {
        data() {
            return {
                keyword: '',
                rows: [],
                totalCount: 0,
                pageNo: 1,
                pageSize: 10,
                listLoading: false,

                fullPath: '',
                minuteTimeClock: '' //分计时器
            }
        },
        methods: {
            handleCurrentChange(val) {//异常列表分页回调
                this.pageNo = val;
                this.getList();
            },
            forceToOutline(row){ //强制下线
                this.$confirm('确定强制下线该账号吗？','提示',{
                    confirmButtonText: '强制下线'
                }).then(res => {
                    var para = {
                        id: row.id, //异常记录id
                        type: 'outline'
                    };
                    updateAbnormal(para).then(res => {
                        if(res.code == '0'){
                            this.$message({
                                type: 'success',
                                message: '账号 ' + row.studentNo + ' 已强制下线',
                            });

                            //更新行
                            row.isOutline = 1;
                            var index = _.findIndex(this.rows, {id: row.id});
                            this.rows.splice(index, 1, row);

                        }else{
                            this.$message({
                                type: 'error',
                                message: res.msg,
                            });
                        }
                    });
                }).catch(res => {});
            },
            signIncheap(row){ //作弊处理
                this.$confirm('确定将异常做作弊处理吗？','提示',{
                    confirmButtonText: '作弊处理'
                }).then(res => {
                    var para = {
                        id: row.id, //异常记录id
                        type: 'cheap'
                    };
                    updateAbnormal(para).then(res => {
                        if(res.code == '0'){
                            this.$message({
                                type: 'success',
                                message: '账号 ' + row.studentNo + ' 已作弊处理',
                            });

                            //更新行
                            row.isCheap = 1;
                            var index = _.findIndex(this.rows, {id: row.id});
                            this.rows.splice(index, 1, row);

                        }else{
                            this.$message({
                                type: 'error',
                                message: res.msg,
                            });
                        }
                    });
                }).catch(res => {});
            },
            //获取列表
            getList() {
                this.clearMinuteClock();//关闭分计时器
                let abnPara = {
                    paperId: '',//考试id
                    pageNo: this.pageNo,
                    filter: JSON.stringify(this.filter),
                    keyword: this.keyword,
                    pageSize: this.pageSize,
                };
                this.listLoading = true;
                getAbnormalList(abnPara).then((res) => {
                    res = res.data;
                    this.totalCount = res.totalCount;
                    this.rows = res.rows;
                    this.listLoading = false;
                    this.minuteTimeClockRun();//分计时器启动
                });
            },
            minuteTimeClockRun(){//每分钟刷新表格
                this.minuteTimeClock = setInterval(()=>{
                    if(this.$route.fullPath != this.fullPath){
                        this.clearMinuteClock();
                    }else{
                        this.getList();
                    }
                }, 60000);
            },
            clearMinuteClock(){//分计时器关闭
                if(this.minuteTimeClock){
                    clearInterval(this.minuteTimeClock);
                }
            }
        },
        components: {
            'Page': Pagination,
        },
        mounted() {
            this.fullPath = this.$route.fullPath;
            this.getList();
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>