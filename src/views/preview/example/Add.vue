<template>
    <section>
        <div class="panel">
            <div class="title">
                <span>添加试卷</span>
                <div class="pull-right">
                    <el-button type="success" @click="onSubmit('form')" class="el-button-shadow">保存</el-button>
                    <el-button type="danger" @click="resetForm('form')" class="el-button-shadow">取消</el-button>
                </div>
            </div>
            <div class="content">
                <el-form ref="form" :model="form" :rules="rules"
                         v-loading="loading" label-width="110px" :inline-message="isInlineMessage"
                         @submit.prevent="onSubmit">
                    <el-form-item label="预习名称：" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="选择预习：" prop="subject">
                        <el-select v-model="form.subject" placeholder="请选择预习科目">
                            <template v-for="item in defaultInfo.subject">
                                <el-option :label="item.name" :value="item.id" :key="item.id"></el-option>
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="预习年级：" prop="grade">
                        <el-select v-model="form.grade" placeholder="请选择预习年级">
                            <template v-for="item in defaultInfo.grade">
                                <el-option :label="item.name" :value="item.id" :key="item.id"></el-option>
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="预习院系：" prop="department">
                        <el-select v-model="form.department" placeholder="请选择预习院系">
                            <template v-for="item in defaultInfo.department">
                                <el-option :label="item.name" :value="item.id" :key="item.id"></el-option>
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="预习班级：" prop="class">
                        <el-select v-model="form.class" placeholder="请选择预习班级">
                            <template v-for="item in defaultInfo.class">
                                <el-option :label="item.name" :value="item.id" :key="item.id"></el-option>
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="结束时间：" prop="endTime">
                        <el-date-picker type="datetime" placeholder="请选择结束时间" format="yyyy/MM/dd HH:mm"
                                        v-model="form.endTime" style="width: 240px;"></el-date-picker>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </section>
</template>
<script>
    import {
        getExampleAddInfo,
        addDemo,
    } from '../../../api/api';
    import _ from 'lodash';

    export default {
        data() {
            return {
                isInlineMessage: true,
                form: {
                    name: '',
                    subject: '',
                    department: '',
                    class: '',
                    endTime: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入预习名称', trigger: 'blur'},
                        {min: 2, max: 30, message: '长度在2-30个字符', trigger: 'blur'}
                    ],
                    subject: [
                        {required: true, message: '请选择预习科目', trigger: 'change'}
                    ],
                    grade: [
                        {required: true, message: '请选择预习年级', trigger: 'change'}
                    ],
                    department: [
                        {required: true, message: '请选择预习院系', trigger: 'change'}
                    ],
                    class: [
                        {required: true, message: '请选择预习班级', trigger: 'change'}
                    ],
                    endTime: {required: true, message: '请选择结束时间', trigger: 'change'}
                },
                loading: false,
                defaultInfo: {
                    subject: [],
                    grade: [],
                    department: [],
                    class: [],
                },
            }
        },
        computed: {},
        methods: {
            onSubmit(formName, flag) {
                this.$refs[formName].validate((isValid) => {
                    if (isValid) {
                        this.$confirm('确认添加吗？', '提示', {}).then(() => {
                            let para = _.assign({}, this.form);
                            this.loading = true;
                            addDemo(para).then((res) => {
                                if (res.code !== '0') {
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
                                    this.$refs['form'].resetFields();
                                    this.$emit('toTable');
                                }

                            });
                        });
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            getDefaultData() {
                getExampleAddInfo({}).then(res => {
                    this.defaultInfo = res.data;
                    console.log(res);
                    this.$forceUpdate();
                });
            },
        },
        mounted() {
            this.getDefaultData();
        }
    }
</script>
<style scoped lang="scss">
    @import '~scss_vars';

</style>