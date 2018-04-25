<template>
    <section class="panel" id="infoForm">
        <div class="title">
            <span>个人信息</span>
            <div class="pull-right">
                <el-button type="danger" @click="onSubmit('form')" class="el-button-shadow">退出登录</el-button>
            </div>
        </div>

        <div class="content">
            <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="登录名：">
                    <span>{{ obj.loginName }}</span>
                </el-form-item>
                <el-form-item label="姓名：">
                    <span>{{ obj.name }}</span>
                </el-form-item>
                <el-form-item label="性别：">
                    <span>{{ obj.sex=='0'?'女':'男'}}</span>
                </el-form-item>
                <el-form-item label="角色：">
                    <span>{{formateRole(obj.userType)}}</span>
                </el-form-item>
                 <el-form-item label="注册如期：">
                    <span>{{ obj.signTime }}</span>
                </el-form-item>
                <el-form-item label="邮件：">
                    <span>{{ obj.email }}</span>
                </el-form-item>
                <el-form-item label="手机号：">
                    <span>{{ obj.phone }}</span>
                </el-form-item>
            </el-form>
        </div>
    </section>

</template>

<script>
import { getUserInfo } from '../../../api/api';
    export default {
        data() {
            return {
                obj: {
                    loginName: '',
                    name: '',
                    sex: '',
                    userType:'',
                    signTime:'',
                    email:'',
                    phone:''
                },
            }
        },
        methods: {
            formateRole(role){
                if(role===0)
                    return '系统管理员';
                if(role===1)
                    return '老师';
                if(role===2)
                    return '学生';
                return '未知';
            },
            onSubmit(formName) {
                console.log('logout');
                this.$store.dispatch('LogOut');
                this.$router.push('/login');
            },
            getUserInfo(){
                getUserInfo({}).then(res => {
                    this.obj=res.data;
                });
            }
        },
        computed: {
        },
        mounted() {
            this.getUserInfo();
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
    #infoForm{
        .el-form{
            padding: 0;
        }
        .el-form-item{
            width: 100%;
            padding-left: 10px;
            margin-bottom: 0;
            &:nth-child(even){
                background: #F0F0F0;
            }
            .el-form-item__content>span{
                color: #3C5398;
            }
        }
    }
</style>