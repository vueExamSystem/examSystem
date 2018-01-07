<template>
	<section>
		<div class="panel" v-show="!isAddProblem">
			<div class="title">
				<span>
				{{detail.name}}
				（总分：{{detail.total}}分  <span v-if="isEditAble" style="margin-left:12px;">已有分值：{{totalSet}}分</span>）
				</span>
				<div class="pull-right">
					<el-button v-if="isEditAble" type="success" @click="onSave()" class="el-button-shadow">保存</el-button>
					<el-button type="danger" @click="goBack()" class="el-button-shadow">取消</el-button>
				</div>
			</div>
			<div class="content">
				<el-collapse>
					<el-collapse-item>
						<template slot="title">
							<span>单选题（共<span>{{detail.radio.count}}</span>题 &nbsp; 每题<span>{{detail.radio.perScore}}</span>分）</span>
							<el-button v-if="isEditAble" type="primary" @click.stop="addProblem('radio')">添加试题</el-button>
						</template>
						<div class="el-question" v-loading="isRadioLoading">
							<div class="el-question-title">
								<span>{{radioCurrent}}. {{radioProblem.title}}</span>
							</div>
							<div class="el-question-options mask">
								<el-radio-group v-model="radioProblem.answer">
								<el-radio v-for="option in radioProblem.options" :label="option.flag">{{option.flag}}. {{option.text}}</el-radio>
							</el-radio-group>
							</div>
							<div class="el-question-info">
								<div class="el-info">
									<div class="el-label el-label-light-green">正确答案</div>
									<div class="el-info-content">{{radioProblem.answer}}</div>
								</div>
								<div class="el-info">
									<div class="el-label el-label-blue">解析</div>
									<div class="el-info-content">{{radioProblem.analysis}}</div>
								</div>
								<div class="el-info">
									<div class="el-label el-label-green">考点</div>
									<div class="el-info-content">{{radioProblem.keynote}}</div>
								</div>
								<div class="el-info">
									<div class="el-label el-label-purple">添加人</div>
									<div class="el-info-content">{{radioProblem.creator}}</div>
								</div>
							</div>
							<div class="pageArea">
								<Page v-if="isDrawPage" current="1" :total="detail.radio.count" pageSize="1" @page-change="radioPageChange"></Page>
							</div>
						</div>
					</el-collapse-item>
					<el-collapse-item>
						<template slot="title">
							<span>多选题（共<span>{{detail.check.count}}</span>题 &nbsp; 每题<span>{{detail.check.perScore}}</span>分）</span>
							<el-button v-if="isEditAble" type="primary" @click.stop="addProblem('check')">添加试题</el-button>
						</template>
						<div class="el-question" v-loading="isCheckLoading">
							<div class="el-question-title">
								<span>{{checkCurrent}}. {{checkProblem.title}}</span>
							</div>
							<div class="el-question-options mask">
								<el-checkbox-group v-model="checkProblem.answer">
									<el-checkbox v-for="option in checkProblem.options" :label="option.flag">{{option.flag}}. {{option.text}}</el-checkbox>
								</el-checkbox-group>
							</div>
							<div class="el-question-info">
								<div class="el-info">
									<div class="el-label el-label-light-green">正确答案</div>
									<div class="el-info-content">{{checkProblem.answer?checkProblem.answer.toString():''}}</div>
								</div>
								<div class="el-info">
									<div class="el-label el-label-blue">解析</div>
									<div class="el-info-content">{{checkProblem.analysis}}</div>
								</div>
								<div class="el-info">
									<div class="el-label el-label-green">考点</div>
									<div class="el-info-content">{{checkProblem.keynote}}</div>
								</div>
								<div class="el-info">
									<div class="el-label el-label-purple">添加人</div>
									<div class="el-info-content">{{checkProblem.creator}}</div>
								</div>
							</div>
							<div class="pageArea">
								<Page v-if="isDrawPage" current="1" :total="detail.check.count" pageSize="1" @page-change="checkPageChange"></Page>
							</div>
						</div>
					</el-collapse-item>
					<el-collapse-item>
						<template slot="title">
							<span>判断题（共<span>{{detail.judge.count}}</span>题 &nbsp; 每题<span>{{detail.judge.perScore}}</span>分）</span>
							<el-button v-if="isEditAble" type="primary" @click.stop="addProblem('judge')">添加试题</el-button>
						</template>
						<div class="el-question" v-loading="isJudgeLoading">
							<div class="el-question-title">
								<span>{{judgeCurrent}}. {{judgeProblem.title}}</span>
							</div>
							<div class="el-question-options mask">
								<el-radio-group v-model="judgeProblem.answer">
									<el-radio v-for="option in judgeProblem.options" :label="option.flag">{{option.flag}}. {{option.text}}</el-radio>
								</el-radio-group>
							</div>
							<div class="el-question-info">
								<div class="el-info">
									<div class="el-label el-label-light-green">正确答案</div>
									<div class="el-info-content">{{judgeProblem.answer}}</div>
								</div>
								<div class="el-info">
									<div class="el-label el-label-blue">解析</div>
									<div class="el-info-content">{{judgeProblem.analysis}}</div>
								</div>
								<div class="el-info">
									<div class="el-label el-label-green">考点</div>
									<div class="el-info-content">{{judgeProblem.keynote}}</div>
								</div>
								<div class="el-info">
									<div class="el-label el-label-purple">添加人</div>
									<div class="el-info-content">{{judgeProblem.creator}}</div>
								</div>
							</div>
							<div class="pageArea">
								<Page v-if="isDrawPage" current="1" :total="detail.judge.count" pageSize="1" @page-change="judgePageChange"></Page>
							</div>
						</div>
					</el-collapse-item>
					<el-collapse-item>
						<template slot="title">
							<span>选做题（共<span>{{detail.option.count}}</span>题 &nbsp; 每题<span>{{detail.option.perScore}}</span>分）</span>
							<el-button v-if="isEditAble" type="primary" @click.stop="addProblem('option')">添加试题</el-button>
						</template>
						<div class="el-question" v-loading="isOptionLoading">
							<div class="el-question-title">
								<span>{{optionCurrent}}. {{optionProblem.title}}</span>
							</div>
							<div class="el-question-options mask">
								<el-checkbox-group v-if="optionProblem.type=='check'" v-model="optionProblem.answer">
									<el-checkbox v-for="option in optionProblem.options" :label="option.flag">{{option.flag}}. {{option.text}}</el-checkbox>
								</el-checkbox-group>
								<el-radio-group v-else v-model="optionProblem.answer">
									<el-radio v-for="option in optionProblem.options" :label="option.flag">{{option.flag}}. {{option.text}}}</el-radio>
								</el-radio-group>
							</div>
							<div class="el-question-info">
								<div class="el-info">
									<div class="el-label el-label-light-green">正确答案</div>
									<div class="el-info-content">{{optionProblem.answer?optionProblem.answer.toString():''}}</div>
								</div>
								<div class="el-info">
									<div class="el-label el-label-blue">解析</div>
									<div class="el-info-content">{{optionProblem.analysis}}</div>
								</div>
								<div class="el-info">
									<div class="el-label el-label-green">考点</div>
									<div class="el-info-content">{{optionProblem.keynote}}</div>
								</div>
								<div class="el-info">
									<div class="el-label el-label-purple">添加人</div>
									<div class="el-info-content">{{optionProblem.creator}}</div>
								</div>
							</div>
							<div class="pageArea">
								<Page v-if="isDrawPage" current="1" :total="detail.option.count" pageSize="1" @page-change="optionPageChange"></Page>
							</div>
						</div>
					</el-collapse-item>
				</el-collapse>
			</div>
		</div>
		<add-problem :flag="addType" v-if="isEditAble && isAddProblem" @back="addProblemBack"></add-problem>
	</section>
</template>
<script>
	import { getPaperDetail, getPaperProblem } from '../../../api/api';
	import Page from '../../common/Pagination.vue'
	import addProblem from './AddProblem.vue'
	export default{
		props:{
			id:{
				required: true
			}
		},
		components: {
			Page,
			addProblem
		},
		data(){
			return {
				isDrawPage: false,
				detail:{
					name:'...',
				    total:'...',
				    radio:{
				        count: 0,
				        perScore:0
				    },
				    check:{
				        count: 0,
				        perScore:0
				    },
				    judge:{
				        count: 0,
				        perScore:0
				    },
				    option:{
				        count: 0,
				        perScore:0
				    }
				},
				isRadioLoading: true,
				radioProblem:'',
				radioCurrent: 1,
				isCheckLoading: true,
				checkProblem:'',
				checkCurrent: 1,
				isJudgeLoading: true,
				judgeProblem:'',
				judgeCurrent: 1,
				isOptionLoading: true,
				optionProblem:'',
				optionCurrent: 1,
				isAddProblem: false,
				addType: 'radio'
			}
		},
		computed:{
			isEditAble(){
				return this.detail.status === '0'
			},
			totalSet(){
				return (this.detail.radio.count * this.detail.radio.perScore)+(this.detail.check.count * this.detail.check.perScore)+(this.detail.judge.count * this.detail.judge.perScore)+(this.detail.judge.count * this.detail.judge.perScore)
			}
		},
		methods:{
			init(){
				var param = {
					id: this.id
				};
				getPaperDetail(param).then(res => {
					this.detail = res.data;
					this.isDrawPage = true;
				});
				this.radioPageChange(1);
				this.checkPageChange(1);
				this.judgePageChange(1);
				this.optionPageChange(1);
			},
			onSave(){

			},
			goBack(){
				this.$emit('close');
			},
			addProblemBack(){//取消添加试题
				this.isAddProblem = false;
			},
			addProblem(type){//添加试题
				this.isAddProblem = true;
				this.addType = type;
			},
			getProblemDetail(isNecessary,type,current,callback){//获取试卷题目内容
				var param = {
					id: this.id,//试卷id,
					isNecessary:isNecessary,//是否必做题
					type:type,//题目类型
					current:current,//第几题
					pageSize:1,//题目个数
				};
				getPaperProblem(param).then(res => {
					callback(res.data);
				});
			},
			radioPageChange(current){
				var _this_ = this;
				_this_.isRadioLoading = true;
				this.getProblemDetail(true,'radio',current,function(data){
					_this_.radioCurrent = current;
					_this_.radioProblem = data;
					_this_.isRadioLoading = false;
				});
			},
			checkPageChange(current){
				var _this_ = this;
				_this_.isCheckLoading = true;
				this.getProblemDetail(true,'check',current,function(data){
					_this_.checkCurrent = current;
					_this_.checkProblem = data;
					_this_.isCheckLoading = false;
				});
			},
			judgePageChange(current){
				var _this_ = this;
				_this_.isJudgeLoading = true;
				this.getProblemDetail(true,'judge',current,function(data){
					_this_.judgeCurrent = current;
					_this_.judgeProblem = data;
					_this_.isJudgeLoading = false;
				});
			},
			optionPageChange(current){
				var _this_ = this;
				_this_.isOptionLoading = true;
				this.getProblemDetail(false,'',current,function(data){
					_this_.optionCurrent = current;
					_this_.optionProblem = data;
					_this_.isOptionLoading = false;
				});
			}
		},
		created(){
			this.$nextTick(() => {
				this.init();
			});
		}
	}
</script>
<style lang="scss" scoped>
	@import '~scss_vars';
	.pageArea{
		float: right;
	}
	.el-question{
		.el-question-title{
			font-size: 16px;
			color: #000000;
			letter-spacing: 1px;
			line-height: 22px;
		}
		.el-question-options{
			padding: 10px;
			.el-radio, .el-checkbox{
				display: block;
				margin: 20px 0;
			}
			&.mask{
				position:relative;
				&:after{
					position:absolute;
					content:'';
					top:0;
					left:0;
					bottom:0;
					right:0;
					z-index:2;
				}
			}
		}
	}
	.el-info{
		.el-info-content{
			padding: 10px 0;
		}
		margin-bottom: 10px;
	}
</style>