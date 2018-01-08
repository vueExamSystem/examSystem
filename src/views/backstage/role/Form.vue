<template>
    <section class="panel" id="infoForm">
        <div class="title">
            <span>个人信息</span>
            <div class="pull-right">
                <el-button type="success" @click="close" class="el-button-shadow">保存</el-button>
                <el-button type="danger" @click="close" class="el-button-shadow">取消</el-button>
            </div>
        </div>

        <div class="content">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item label="权限" prop="competence">
                    <el-checkbox
                            v-for="item in competenceArr"
                            :key="item.id"
                            :label="item.name"
                    >
                        {{item.name}}
                    </el-checkbox>
                </el-form-item>
            </el-form>
        </div>
    </section>

</template>

<script>
    import { getCompetenceList } from '../../../api/api'
    export default {
        data() {
            return {
                props: {
                    id: {
                        required: true
                    }
                },
                form: {
                    competence: [],
                },
                competenceArr: [],
            }
        },
        methods: {
            onSubmit(formName) {
                console.log('logout');
            },
            getList() {
                getCompetenceList().then((res) => {
                    this.competenceArr = res.data;
                });
            },
            close() {
                this.$emit('close');
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