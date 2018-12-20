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
                    <span>学号信息</span>
                    <el-input placeholder="" v-model="studentNo" style="width:200px">
                    </el-input>
                    <span>登录IP</span>
                    <el-input placeholder="" v-model="ip" style="width:200px">
                    </el-input>
                    <span>指纹码</span>
                    <el-input placeholder="" v-model="deviceCode" style="width:200px">
                    </el-input>
                    
                    <el-button type="success" @click="getList" class="el-button-shadow">查询</el-button>
                    <el-button type="success" @click="reset" class="el-button-shadow">重置</el-button>
                <!--分页-->
            </div>
            <div class="title">
                    <span></span>
                    <span>登录时间</span>
                    <el-date-picker type="datetime" placeholder="请选择开始时间" format="yyyy/MM/dd HH:mm:ss" 
                    value-format="yyyy/MM/dd HH:mm:ss" v-model="beginTime" style="width: 200px;" >
                    </el-date-picker>
                    <span>至</span>
                    <el-date-picker type="datetime" placeholder="请选择结束时间" format="yyyy/MM/dd HH:mm:ss"
                    value-format="yyyy/MM/dd HH:mm:ss" v-model="endTime" style="width: 200px;margin-left: 35px;" >
                    </el-date-picker>
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
                    <el-table-column type="index" label="ID" sortable>
                    </el-table-column>
                    <el-table-column prop="userName" label="帐号" sortable>
                    </el-table-column>
                    <el-table-column prop="loginTime" label="登录时间" sortable>
                    </el-table-column>
                     <el-table-column prop="loginIp" label="登录IP" sortable>
                    </el-table-column>
                    <el-table-column prop="deviceCode" label="登录指纹码" sortable>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </section>
</template>

<script>
    import {getLoginList} from '../../../api/api';
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
                studentNo:'',
                ip:'',
                deviceCode:'',
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
                this.studentNo='';
                this.ip='';
                this.deviceCode='';
                this.beginTime='';
                this.endTime='';
            },
            //获取用户列表
            getList() {
                let para = {
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    keyword: this.studentNo,
                    ip:this.ip,
                    deviceCode:this.deviceCode,
                    beginTime:this.beginTime,
                    endTime:this.endTime
                };
                this.listLoading = true;
                getLoginList(para).then((res) => {
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