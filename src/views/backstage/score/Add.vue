<template>
    <section id="scoreForm">
        <div class="panel">
            <div class="title">
                <span>设置成绩等级</span>
                <div class="pull-right">
                    <el-button type="success" @click="onSubmit('form')" class="el-button-shadow">保存</el-button>
                    <el-button type="danger" @click="resetForm('form')" class="el-button-shadow">取消</el-button>
                </div>
            </div>

            <div class="content">
                <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="优秀" prop="excellent">
                        >= 总分
                        <el-input v-model="form.excellent"></el-input>
                        %
                    </el-form-item>
                    <el-form-item label="良好" prop="good">
                        >= 总分
                        <el-input v-model="form.good"></el-input>
                        %
                    </el-form-item>
                    <el-form-item label="及格" prop="pass">
                        >= 总分
                        <el-input v-model="form.pass"></el-input>
                        %
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </section>


</template>

<script>

    export default {
        data() {
            return {
                form: {
                    excellent: '',
                    good: '',
                    pass: '',
                },
                rules: {
                    excellent: [
                        {required: true, message: '请输入优秀百分比', trigger: 'change'},
                        {pattern: '^\\d+$', message: '请输入整数', trigger:'change'}
                    ],
                    good: [
                        {required: true, message: '请输入良好百分比', trigger: 'change'},
                        {pattern: '^\\d+$', message: '请输入整数', trigger:'change'}
                    ],
                    pass: [
                        {required: true, message: '请输入及格百分比', trigger: 'change'},
                        {pattern: '^\\d+$', message: '请输入整数', trigger:'change'}
                    ],
                },
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        },
        computed: {},
        mounted() {}
    }

</script>

<style lang="scss" scoped>
    @import '~scss_vars';

    #scoreForm {
        .panel {
            .content {
                & > form {
                    .el-form-item__label {
                        text-align: left;
                    }
                }
            }
        }
    }

</style>