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
                    <div v-if="detail.questionTypeId === 2" class="el-question-options mask">
                        <el-checkbox-group v-model="detail.answer">
                            <el-checkbox class="radio-short" label="A">
                                <span>A.</span>
                                <div class="radio-short-div" v-html="detail.optiona"></div>
                                </el-checkbox>
                            <el-checkbox class="radio-short" label="B">
                                <span>B.</span>
                                <div class="radio-short-div" v-html="detail.optionb"></div>
                            </el-checkbox>
                            <el-checkbox class="radio-short" label="C">
                                <span>C.</span>
                                <div class="radio-short-div" v-html="detail.optionc"></div>
                            </el-checkbox>
                            <el-checkbox class="radio-short" label="D">
                                <span>D.</span>
                                <div class="radio-short-div" v-html="detail.optiond"></div>
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div v-else-if="detail.questionTypeId === 3" class="el-question-options mask">
                        <el-radio-group v-model="detail.answer">
                            <el-radio class="radio-short" label="A">
                                <span>A.</span>
                                <div class="radio-short-div" v-html="detail.optiona"></div>
                                </el-radio>
                            <el-radio class="radio-short" label="B">
                                <span>B.</span>
                                <div class="radio-short-div" v-html="detail.optionb"></div>
                            </el-radio>
                        </el-radio-group>
                    </div>
                    <div v-else class="el-question-options mask">
                        <el-radio-group v-model="detail.answer">
                            <el-radio class="radio-short" label="A">
                                <span>A.</span>
                                <div class="radio-short-div" v-html="detail.optiona"></div>
                                </el-radio>
                            <el-radio class="radio-short" label="B">
                                <span>B.</span>
                                <div class="radio-short-div" v-html="detail.optionb"></div>
                            </el-radio>
                            <el-radio v-if="detail.optionc" class="radio-short" label="C">
                                <span>C.</span>
                                <div class="radio-short-div" v-html="detail.optionc"></div>
                            </el-radio>
                            <el-radio v-if="detail.optiond" class="radio-short" label="D">
                                <span>D.</span>
                                <div class="radio-short-div" v-html="detail.optiond"></div>
                            </el-radio>
                        </el-radio-group>
                    </div>
                    <div class="el-question-info">
                        <div class="el-info">
                            <div class="el-label el-label-light-green">正确答案</div>
                            <div class="el-info-content">{{detail.answer?detail.answer.toString():''}}</div>
                        </div>
                        <div class="el-info">
                            <div class="el-label el-label-blue">解析</div>
                            <div class="el-info-content">{{detail.analysis}}</div>
                        </div>
                        <div class="el-info">
                            <div class="el-label el-label-green">考点</div>
                            <div class="el-info-content">{{detail.examingPoint}}</div>
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
                    if(this.detail.questionTypeId === 2){//多选
                        this.detail.answer = this.checkAnswerFormat(this.detail.answer);
                    }
                    this.isLoading = false;
                });
            },
            checkAnswerFormat(checkAnswer){
                if(!_.isArray(checkAnswer)){
                    return checkAnswer.split(',')
                }else{
                    return checkAnswer;
                }
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
    }
</style>