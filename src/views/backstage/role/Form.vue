<template>
    <section class="panel" id="infoForm" v-loading="loading">
        <div class="title">
            <span>{{roleName}}</span>
            <div class="pull-right">
                <el-button type="success" @click="onSubmit('form')" class="el-button-shadow">保存</el-button>
                <el-button type="danger" @click="close" class="el-button-shadow">取消</el-button>
            </div>
        </div>

        <div class="content">
            <el-form :model="form" ref="form" label-width="80px" width="200px" class="demo-ruleForm">
                <el-form-item
                        label="权限"
                        prop="competence"
                        :rules="[{required: true, message: '请选择权限', trigger: 'change'}]">
                    <el-tree
                            :data="competenceArr"
                            show-checkbox 
                            node-key="id" default-expand-all
                            :default-checked-keys="form.competence"
                            @check-change="treeClick"
                    >
                    </el-tree>
                </el-form-item>
            </el-form>
        </div>
    </section>

</template>

<script>
    import { getCompetenceList, getRoleList,getMenuTree,editRole} from '../../../api/api';
    import _ from 'lodash';
    export default {
        props: {
            id: {
                required: true
            },
            roleName:{
                required: true
            }
        },
        data() {
            return {
                form: {
                    competence: [],
                },
                competenceArr: [],
                oldArr:[],
                addArr:[],
                removeArr:[],
                loading: false,
            }
        },
        methods: {
            getList() {
                let para={
                    roleId:this.id
                };
                getMenuTree(para).then((res) => {
                    //tree data
                    this.competenceArr = res.data;
                    this.oldArr=res.data;
                    //三级结构s
                    //this.form.competence.push(res.data[0].id);//一级
                    _.forEach(res.data[0].children, item => {
                        const arr = item.children;
                         //this.form.competence.push(item.id);//二级
                        _.forEach(arr, item1 => {
                            if (item1.isCheck) {
                                this.form.competence.push(item1.id);//三级
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
                            let para={
                                addRole:JSON.stringify(this.addArr),
                                removeRole:JSON.stringify(this.removeArr),
                                roleId:this.id
                            };
                            //console.log('submit params',para);
                            this.loading = true;
                            editRole(para).then((res) => {
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
            treeClick(object, isCheck, hasChildren) {
                if (!object.children) {
                    console.log('1',this.form.competence);
                    if (isCheck) {
                        this.form.competence.push(object.id);
                        var idx1=this.addArr.indexOf(object.id);
                        if(idx1==-1){
                            this.addArr.push(object.id);
                        }
                        var idx2=this.removeArr.indexOf(object.id);
                        if(idx2>-1){
                            this.removeArr.splice(idx2,1);
                        }
                    }
                    if (!isCheck) {
                        const index = (this.form.competence).indexOf(object.id);
                        if(index>-1){
                            this.form.competence.splice(index, 1);
                        }
                        var idx1=this.addArr.indexOf(object.id);
                        if(idx1>-1){
                            this.addArr.splice(idx1,1);
                        }
                        var idx2=this.removeArr.indexOf(object.id);
                        if(idx2==-1){
                            this.removeArr.push(object.id);
                        }
                    }
                    console.log('2',this.form.competence);
                    console.log('this.addArr',this.addArr);
                    console.log('this.removeArr',this.removeArr);
                }
            },
        },
        computed: {
            // comArr() {
            //     const str = res.data[this.id].competence;
            //     const arr = str.split('，');
            //     //console.log(arr);
            //     return arr || [];
            // },
        },
        mounted() {
            this.getList();
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>