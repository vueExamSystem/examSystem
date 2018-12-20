<template>
    <section class="panel" id="queForm">
        <div class="title">
            <span>添加课程</span>
            <div class="pull-right">
                <el-button type="success" @click="onSubmit('ruleForm')" class="el-button-shadow">保存</el-button>
                <el-button type="danger" @click="resetForm('ruleForm')" class="el-button-shadow">取消</el-button>
            </div>
        </div>

        <div class="content">
            <el-form :model="ruleForm"
                     v-loading="loading"
                     :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="课程名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
               <!--  <el-form-item label="学科种类" prop="subject">
                    <el-input v-model="ruleForm.subject"></el-input>
                </el-form-item> -->
                <el-form-item label="课程描述" prop="desc">
                    <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入内容"
                            v-model="ruleForm.desc">
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
    </section>

</template>

<script>
    import {
        addCourse,
    } from '../../../api/api';
    import _ from 'lodash';
    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    desc: '',
                    subject: '',
                },
                rules: {
                    name: [
                        {required: true, message: '请填写课程名称', trigger: 'blur'}
                    ],
                    desc: [
                        {required: true, message: '请填写课程描述', trigger: 'blur'}
                    ],
                    // subject: [
                    //     {required: true, message: '请填写学科种类', trigger: 'blur'}
                    // ],
                },
                loading: false,
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('确认添加吗？', '提示', {}).then(() => {
                            let para = _.assign({}, this.ruleForm);
                            para= {
                                name: para.name,
                                desc: para.desc
                            };
                            this.loading = true;
                            addCourse(para).then((res) => {
                                if (res.code !== 0) {
                                    this.$message({
                                        message: res.msg,
                                        type: 'error'
                                    });
                                } else {
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    this.loading = false;
                                    this.$refs['ruleForm'].resetFields();
                                    this.$emit('toTable');
                                }

                            });
                        });
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
        mounted() {
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';

</style>