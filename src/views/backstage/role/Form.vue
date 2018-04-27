<template>
    <section class="panel" id="infoForm">
        <div class="title">
            <span>个人信息</span>
            <div class="pull-right">
                <el-button type="success" @click="onSubmit('form')" class="el-button-shadow">保存</el-button>
                <el-button type="danger" @click="close" class="el-button-shadow">取消</el-button>
            </div>
        </div>

        <div class="content">
            <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item
                        label="权限"
                        prop="competence"
                        :rules="[{required: true, message: '请选择权限', trigger: 'change'}]">
                    <el-tree
                            :data="competenceArr"
                            show-checkbox
                            node-key="id"
                            :default-checked-keys="form.competence"
                    >
                    </el-tree>
                </el-form-item>
            </el-form>
        </div>
    </section>

</template>

<script>
    import { getCompetenceList, getRoleList,getMenuTree,addDemo} from '../../../api/api';
    import _ from 'lodash';
    export default {
        props: {
            id: {
                required: true
            }
        },
        data() {
            return {
                form: {
                    competence: [],
                },
                competenceArr: [],
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
                this.close();
            },
            getList() {
                let para={
                    roleId:this.id
                };
                getMenuTree(para).then((res) => {
                    //tree data
                    this.competenceArr = res.data;
                    _.forEach(res.data[0].children, item => {
                        const arr = item.children;
                        _.forEach(arr, item1 => {
                            if (item1.isCheck) {
                                this.form.competence.push(item1.id);
                            }
                        });
                    });
                });
            },
            close() {
                this.$emit('close');
            },
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('确认修改吗？', '提示', {}).then(() => {
                            let para = _.assign({}, this.form);
                            console.log(para);
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
                                    this.$emit('refresh');
                                    this.close();
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
        computed: {
            comArr() {
                const str = res.data[this.id].competence;
                const arr = str.split('，');
                //console.log(arr);
                return arr || [];
            },
        },
        mounted() {
            this.getList();
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>