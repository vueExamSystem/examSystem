<template>
    <section>
        <!-- <div class="content">
           <el-form ref="form" :model="form" :rules="rules" v-loading="loading"
                         label-width="110px" @submit.prevent="onSubmit('form')">
                    <el-form-item label="考试名称：" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
            </el-form>
        </div> -->
        <div class="panel">
            <div class="title">
                    <span></span>
                    <span>关键信息</span>
                    <el-input placeholder="" v-model="keyword" style="width:200px">
                    </el-input>
                     <span>发现时间</span>
                    <el-date-picker type="datetime" placeholder="请选择开始时间" format="yyyy/MM/dd HH:mm:ss" 
                    value-format="yyyy/MM/dd HH:mm:ss" v-model="beginTime" style="width: 200px;" >
                    </el-date-picker>
                    <span>至</span>
                    <el-date-picker type="datetime" placeholder="请选择结束时间" format="yyyy/MM/dd HH:mm:ss"
                    value-format="yyyy/MM/dd HH:mm:ss" v-model="endTime" style="width: 200px;" >
                    </el-date-picker>
                    <el-button type="success" @click="getList" class="el-button-shadow">查询</el-button>
                    <el-button type="success" @click="reset" class="el-button-shadow">重置</el-button>
                <!--分页-->
            </div>
            <div class="title">

                <div class="pageArea">
                     <Page :pageNo="pageNo" :totalCount="totalCount" :pageSize="pageSize" @page-change="handleCurrentChange"></Page>
                </div>

            </div>

            <div class="content">
                <!--列表-->
                <el-table
                        :data="rows"
                        highlight-current-row
                        v-loading="listLoading"
                        style="width: 100%;">
                        <el-table-column type="index" label="序号" width="80">
                        </el-table-column>
                        <el-table-column prop="createTime" label="发现时间" min-width="160"></el-table-column>
                        <el-table-column prop="keyInfo" label="关键信息" min-width="220">
                        </el-table-column>
                        <el-table-column prop="examName" label="考试名称" min-width="200">
                        </el-table-column>
                        <el-table-column prop="mark" label="事件" min-width="200">
                        </el-table-column>
                        <el-table-column prop="userNos" label="关联帐号" min-width="220">
                        </el-table-column>
                         <el-table-column prop="devices" label="关联设备" min-width="220">
                        </el-table-column>
                        <el-table-column prop="status" label="状态" min-width="200">
                            <template scope="scope">
                             <div v-if="scope.row.status==1">
                                强制下线
                             </div>
                             <div v-else-if="scope.row.status==2">
                                终止考试
                             </div>
                             <div v-else>未处理</div>
                            </template>
                        </el-table-column>
                </el-table>
            </div>
        </div>
    </section>
</template>

<script>
    import {getAlarmInfoList} from '../../../api/api';
    import Pagination from '../../common/Pagination.vue'
    import _ from 'lodash';

    export default {
        data() {
            return {
                keyword: '',
                rows: [],
                totalCount: 0,
                pageNo: 1,
                pageSize: 20,
                listLoading: false,
                beginTime:'',
                endTime:''
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(val);
            },
            handleCurrentChange(val) {
                this.pageNo = val;
                this.getList();
            },
            search() {
                this.pageNo = 1;
                this.getList();
            },
            reset(){
                this.keyword='';
                this.beginTime='';
                this.endTime='';
            },
            //获取用户列表
            getList() {
                let para = {
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    keyword: this.keyword,
                    beginTime:this.beginTime,
                    endTime:this.endTime
                };
                this.listLoading = true;
                getAlarmInfoList(para).then((res) => {
                    //console.log('res', res);
                    this.totalCount = res.data.totalCount;
                    this.rows = res.data.rows;
                    this.listLoading = false;
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