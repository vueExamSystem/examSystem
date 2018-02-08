<template>
    <section>
        <div class="panel" v-show="!isAddProblem">
            <div class="title">
				<span>
				试题预览（单选）
				</span>
                <div class="pull-right">
                    <el-button type="danger" @click="goBack()" class="el-button-shadow">关闭</el-button>
                </div>
            </div>
            <div class="content">
                <div class="el-question" v-loading="isRadioLoading">
                    <div class="el-question-title">
                        <span>{{detail.title}}</span>
                    </div>
                    <div class="el-question-options mask">
                        <el-radio-group v-model="detail.answer">
                            <el-radio v-for="option in detail.options"
                                      :key="option.id"
                                      :label="option.flag">{{option.flag}}. {{option.text}}</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="el-question-info">
                        <div class="el-info">
                            <div class="el-label el-label-light-green">正确答案</div>
                            <div class="el-info-content">{{detail.answer}}</div>
                        </div>
                        <div class="el-info">
                            <div class="el-label el-label-blue">解析</div>
                            <div class="el-info-content">{{detail.analysis}}</div>
                        </div>
                        <div class="el-info">
                            <div class="el-label el-label-green">考点</div>
                            <div class="el-info-content">{{detail.keynote}}</div>
                        </div>
                        <div class="el-info">
                            <div class="el-label el-label-purple">添加人</div>
                            <div class="el-info-content">{{detail.creator}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import { getQuestionDetail } from '../../../api/api';
    export default{
        props:{
            id:{
                required: true
            }
        },
        components: {
        },
        data(){
            return {
                detail: {},
            }
        },
        computed:{
        },
        methods:{
            getDetail() {
                getQuestionDetail({
                    id: this.id,
                }).then(res => {
                    console.log('detail', res);
                    this.detail = res;
                });
            },
            goBack() {
                this.$emit('close');
            }
        },
        created(){
        },
        mounted() {
            this.getDetail();
        }
    }
</script>
<style lang="scss" scoped>
    @import '~scss_vars';
    .pageArea{
        float: right;
    }
</style>