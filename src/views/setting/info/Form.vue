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
                <el-form-item label="工号">
                    <span>{{ obj.number }}</span>
                </el-form-item>
                <el-form-item label="姓名">
                    <span>{{ obj.name }}</span>
                </el-form-item>
                <el-form-item label="性别">
                    <span>{{ obj.sex }}</span>
                </el-form-item>
                <el-form-item label="课程">
                    <span>{{ obj.course }}</span>
                </el-form-item>
            </el-form>
        </div>
    </section>

</template>

<script>
    export default {
        data() {
            return {
                obj: {
                    number: '211111011',
                    name: '张三',
                    sex: '男',
                    course: '大学物理',
                },
            }
        },
        methods: {
            onSubmit(formName) {
                console.log('logout');
            },
        },
        computed: {
        },
        mounted() {
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