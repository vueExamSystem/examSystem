<template>
	<section style="min-height:200px;">
		<div class="panel" v-show="!isAddProblem">
			<div class="title">
				<span>
				{{name}}
				（总分：{{config.total}}分  <span v-if="isEditAble" style="margin-left:12px;">已有分值：{{totalSet}}分</span>）
				</span>
				<div class="pull-right">
					<el-button v-if="isEditAble" type="success" @click="onSave()" class="el-button-shadow">保存</el-button>
					<el-button type="danger" @click="goBack()" class="el-button-shadow">取消</el-button>
				</div>
			</div>
			<div class="content" v-loading="!isDrawPage" style="min-height: 150px;">
				<el-collapse v-if="isDrawPage">
					<el-collapse-item>
						<template slot="title">
							<span>单选题（共<span>{{radioIndexes.length}}</span>题 &nbsp; 每题<span>{{config.radioscore}}</span>分）</span>
							<el-button v-if="isEditAble" type="primary" @click.stop="addProblem('radio')">添加试题</el-button>
						</template>
						<div>
							<div class="el-question" :class="{'is-event-able': isEditAble}">
								<div class="el-question-title">
									<span>{{radioCurrent + 1}}. {{radioProblem.title}}</span>
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
								<el-button type="danger" class="el-question-btn" @click="removeProblem(radioProblem.id)">删除</el-button>
							</div>
							<div class="pageArea">
								<Page v-if="isDrawPage" pageNo="1" :totalCount="radioIndexes.length" pageSize="1" @page-change="radioPageChange"></Page>
							</div>
						</div>
					</el-collapse-item>
					<el-collapse-item>
						<template slot="title">
							<span>多选题（共<span>{{checkIndexes.length}}</span>题 &nbsp; 每题<span>{{config.checkscore}}</span>分）</span>
							<el-button v-if="isEditAble" type="primary" @click.stop="addProblem('check')">添加试题</el-button>
						</template>
						<div>
							<div class="el-question" :class="{'is-event-able': isEditAble}">
								<div class="el-question-title">
									<span>{{checkCurrent + 1}}. {{checkProblem.title}}</span>
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
								<el-button type="danger" class="el-question-btn" @click="removeProblem(checkProblem.id)">删除</el-button>
							</div>
							<div class="pageArea">
								<Page v-if="isDrawPage" pageNo="1" :totalCount="checkIndexes.length" pageSize="1" @page-change="checkPageChange"></Page>
							</div>
						</div>
					</el-collapse-item>
					<el-collapse-item>
						<template slot="title">
							<span>判断题（共<span>{{judgeIndexes.length}}</span>题 &nbsp; 每题<span>{{config.judgescore}}</span>分）</span>
							<el-button v-if="isEditAble" type="primary" @click.stop="addProblem('judge')">添加试题</el-button>
						</template>
						<div>
							<div class="el-question" :class="{'is-event-able': isEditAble}">
								<div class="el-question-title">
									<span>{{judgeCurrent + 1}}. {{judgeProblem.title}}</span>
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
								<el-button type="danger" class="el-question-btn" @click="removeProblem(judgeProblem.id)">删除</el-button>
							</div>
							<div class="pageArea">
								<Page v-if="isDrawPage" pageNo="1" :totalCount="judgeIndexes.length" pageSize="1" @page-change="judgePageChange"></Page>
							</div>
						</div>
					</el-collapse-item>
					<el-collapse-item>
						<template slot="title">
							<span>选做题（共<span>{{optionIndexes.length}}</span>题 &nbsp; 选{{config.necessary}}题 &nbsp; 每题<span>{{config.choosescore}}</span>分）</span>
							<el-button v-if="isEditAble" type="primary" @click.stop="addProblem('option')">添加试题</el-button>
						</template>
						<div>
							<div class="el-question" :class="{'is-event-able': isEditAble}">
								<div class="el-question-title">
									<span>{{optionCurrent + 1}}. {{optionProblem.title}}</span>
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
								<el-button type="danger" class="el-question-btn" @click="removeProblem(optionProblem.id)">删除</el-button>
							</div>
							<div class="pageArea">
								<Page v-if="isDrawPage" pageNo="1" :totalCount="optionIndexes.length" pageSize="1" @page-change="optionPageChange"></Page>
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
	import { getPaperProblemList, getPaperProblem } from '../../../api/api';
	import Page from '../../common/Pagination.vue'
	import addProblem from './AddProblem.vue'
	export default{
		props:{
			id:{
				required: true
			},
			name:{
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
				detail: {},
				config:{//默认配置
					radiocount: 10,//单选题数
					radioscore: 5,//单选每题分数
					checkcount: 5,//多选题数
					checkscore: 5,//多选每题分数
					judgecount: 5,//判断分数
					judgescore: 2,//判断每题分数
					optional: 5,//选做题数
					necessary: 3,//选做必做题数
					choosescore: 5,//选做每题分数
					total: 100//总分
				},

				allList: [],//试卷题目列表

				radioIndexes: [],//单选对应的索引列表
				radioCurrent: 0,//当前单选对应索引序号

				checkIndexes: [],//多选对应的索引列表
				checkCurrent: 0,//当前多选对应索引序号

				judgeIndexes: [],//判断对应的索引列表
				judgeCurrent: 0,//当前判断对应索引序号

				optionIndexes: [],//选做对应的索引列表
				optionCurrent: 0,//当前选做对应索引序号

				isAddProblem: false,
				addType: 'radio'
			}
		},
		computed:{
			radioProblem(){//“单选”当前题目
				if(typeof this.radioIndexes[this.radioCurrent] != 'undefined'){
					var index = this.radioIndexes[this.radioCurrent];
					return this.allList[index];
				}else{
					return '';
				}
			},
			checkProblem(){//“多选”当前题目
				if(typeof this.checkIndexes[this.checkCurrent] != 'undefined'){
					var index = this.checkIndexes[this.checkCurrent];
					return this.allList[index];
				}else{
					return '';
				}
			},
			judgeProblem(){//“判断”当前题目
				if(typeof this.judgeIndexes[this.judgeCurrent] != 'undefined'){
					var index = this.judgeIndexes[this.judgeCurrent];
					return this.allList[index];
				}else{
					return '';
				}
			},
			optionProblem(){//多选题目
				if(typeof this.optionIndexes[this.optionCurrent] != 'undefined'){
					var index = this.optionIndexes[this.optionCurrent];
					return this.allList[index];
				}else{
					return '';
				}
			},
			isEditAble(){
				return this.detail.status === '0'
			},
			totalSet(){//已有分值
				var sum = 0;
				sum += this.radioIndexes.length * this.config.radioscore;
				sum += this.checkIndexes.length * this.config.checkscore;
				sum += this.judgeIndexes.length * this.config.judgescore;
				if(this.optionIndexes.length >= this.config.necessary){
					sum += this.config.necessary * this.config.choosescore;
				}else{
					sum += this.optionIndexes.length * this.config.choosescore;
				}
				return sum;
			}
		},
		methods:{
			init(){
				var param = {
					id: this.id
				};
				getPaperProblemList(param).then(res => {
					this.detail = res.data.detail;
					this.allList = res.data.list;
					this.arrange();
					this.isDrawPage = true;
				});
			},
			arrange(){//按类型整理题目
				for(var i=0;i<this.allList.length;i++){
					var item = this.allList[i];
					if(item.isNecessary === true){
						switch(item.type){
							case 'radio': this.radioIndexes.push(i);break;
							case 'check': this.checkIndexes.push(i);break;
							case 'judge': this.judgeIndexes.push(i);break;
							default: break;
						}
					}else{
						this.optionIndexes.push(i);
					}
				}
			},
			onSave(){

			},
			removeProblem(id){
				console.log('problem',id)
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
			getProblemDetail(isNecessary,type,pageNo,callback){//获取试卷题目内容
				var param = {
					id: this.id,//试卷id,
					isNecessary:isNecessary,//是否必做题
					type:type,//题目类型
					pageNo:pageNo,//第几题
					pageSize:1,//题目个数
				};
				getPaperProblem(param).then(res => {
					callback(res.data);
				});
			},
			radioPageChange(pageNo){//单选题题数变更
				this.radioCurrent = pageNo - 1;
			},
			checkPageChange(pageNo){//多选题题数变更
				this.checkCurrent = pageNo - 1;
			},
			judgePageChange(pageNo){//判断题题数变更
				this.judgeCurrent = pageNo - 1;
			},
			optionPageChange(pageNo){//选做题题数变更
				this.optionCurrent = pageNo - 1;
			}
		},
		mounted(){
			this.init();
		}
	}
</script>
<style lang="scss" scoped>
	@import '~scss_vars';
	.pageArea{
		float: right;
	}
</style>