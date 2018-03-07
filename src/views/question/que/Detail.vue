<template>
    <section id="queDetail">
        <div class="panel">
            <div class="title">
				<span>
				试题预览
				</span>
                <div class="pull-right">
                    <el-button type="danger" @click="goBack()" class="el-button-shadow">关闭</el-button>
                </div>
            </div>
            <div class="content">
                <div class="el-question" v-loading="isLoading">
                    <div class="el-question-title" v-html="detail.content">
                    </div>
                    <div class="el-question-options mask">
                        <el-radio-group v-model="detail.answer">
                            <el-radio key="A" class="radio-short" label="A."></el-radio>
                            <div class="radio-short-div" v-html="detail.optiona"></div>
                        </el-radio-group>
                        <el-radio-group v-model="detail.answer">
                            <el-radio key="B" class="radio-short" label="B."></el-radio>
                            <div class="radio-short-div" v-html="detail.optionb"></div>
                        </el-radio-group>
                        <el-radio-group v-model="detail.answer" v-if="detail.optionc">
                            <el-radio key="C" class="radio-short" label="C."></el-radio>
                            <div class="radio-short-div" v-html="detail.optionc"></div>
                        </el-radio-group>
                        <el-radio-group v-model="detail.answer" v-if="detail.optiond">
                            <el-radio key="D" class="radio-short" label="D."></el-radio>
                            <div class="radio-short-div" v-html="detail.optiond"></div>
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
                isLoading: false,
            }
        },
        computed:{
        },
        methods:{
            getDetail() {
                this.isLoading = true;
                getQuestionDetail({
                    id: this.id,
                }).then(res => {
                    console.log('detail', res);
                    this.detail = res.data;
                    this.isLoading = false;
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
<style lang="scss">
    @import '~scss_vars';
    #queDetail{
        .content{
            padding: 20px;
        }
        .radio-short{
            width: 45px;
            float: left;
        }
        .radio-short-p{
            display: inline-block;
            width: 20px;
            height: 20px;
        }
        .radio-short-div{
            float: left;
            padding: 20px 0;

            &>p,
            &>div{
              float: left;
            }
        }
        .el-radio-group{
            width: 100%;
        }
    }
</style>