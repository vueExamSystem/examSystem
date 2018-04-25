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
                    <el-checkbox-group v-model="form.competence">
                    <el-checkbox
                            v-for="item in competenceArr"
                            :key="item.id"
                            :label="item.name"
                    >
                        {{item.name}}
                    </el-checkbox></el-checkbox-group>
                </el-form-item>
            </el-form>
        </div>
    </section>

</template>

<script>
    import { getCompetenceList, getRoleList } from '../../../api/api'
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
                roleList: [],
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
                getCompetenceList(para).then((res) => {
                    this.competenceArr = res.data;
                });
                // getRoleList().then((res) => {
                //     if(res.data === undefined) return;
                //     const str = res.data[this.id].competence;
                //     const arr = str.split('，');
                //     console.log(arr);
                //     this.form.competence = arr;
                // });
            },
            close() {
                this.$emit('close');
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