<template>
	<section style="min-height:200px;" v-loading="saveLoading">
		<div class="panel" v-show="!isAddProblem">
			<div class="title">
				<span>
				{{info.name}}
				（总分：{{info.totalPoint}}分  <span v-if="isEditAble" style="margin-left:12px;">已有分值：{{totalSet}}分</span>）
				</span>
				<div class="pull-right">
					<el-button v-if="isEditAble" type="success" @click="onSave()" class="el-button-shadow">启用</el-button>
					<el-button type="danger" @click="goBack()" class="el-button-shadow">取消</el-button>
				</div>
			</div>
			<div class="content" v-loading="!isDrawPage" style="min-height: 150px;">
				<el-collapse v-if="isDrawPage">
					<el-collapse-item>
						<template slot="title">
							<span>单选题（共需{{info.radioCount}}题 &nbsp; 已有{{radioList.length}}题 &nbsp; 每题{{info.radioScore}}分）</span>
							<el-button v-if="isEditAble" type="primary" @click.stop="addProblem('radio')" :disabled="info.radioCount<=radioList.length">添加试题</el-button>
						</template>
						<div v-loading="radioLoading">
							<template v-if="radioList.length>0">
								<div class="el-question" :class="{'is-event-able': isEditAble}">
									<div class="el-question-title has-order">
										<span class="el-question-index">{{radioCurrent + 1}}.</span>
										<div v-html="radioProblem.content"></div>
									</div>
				                    <div class="el-question-options mask">
				                        <el-radio-group v-model="radioProblem.answer">
				                            <el-radio class="radio-short" label="A">
				                            	<span>A.</span>
				                            	<div class="radio-short-div" v-html="radioProblem.optiona"></div>
				                            	</el-radio>
				                            <el-radio class="radio-short" label="B">
					                            <span>B.</span>
					                            <div class="radio-short-div" v-html="radioProblem.optionb"></div>
				                            </el-radio>
				                            <el-radio v-if="radioProblem.optionc" class="radio-short" label="C">
					                            <span>C.</span>
					                            <div class="radio-short-div" v-html="radioProblem.optionc"></div>
				                            </el-radio>
				                            <el-radio v-if="radioProblem.optiond" class="radio-short" label="D">
					                            <span>D.</span>
					                            <div class="radio-short-div" v-html="radioProblem.optiond"></div>
				                            </el-radio>
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
											<div class="el-info-content">{{radioProblem.examingPoint}}</div>
										</div>
										<div class="el-info">
											<div class="el-label el-label-purple">添加人</div>
											<div class="el-info-content">{{radioProblem.creator}}</div>
										</div>
									</div>
									<el-button v-if="isEditAble" type="danger" class="el-question-btn" @click="removeProblem(radioProblem.id, 'radio')">删除</el-button>
								</div>
								<div class="pageArea" v-if="isDrawPage && !isRadioNewPage && radioList.length>1">
									<Page :pageNo="radioCurrent + 1" :totalCount="radioList.length" pageSize="1" @page-change="radioPageChange"></Page>
								</div>
							</template>
							<template v-else>
								<div class="text-center">“单选题”还没有添加任何题目</div>
							</template>
						</div>
					</el-collapse-item>
					<el-collapse-item>
						<template slot="title">
							<span>多选题（共需{{info.checkCount}}题 &nbsp; 已有{{checkList.length}}题 &nbsp; 每题{{info.checkScore}}分）</span>
							<el-button v-if="isEditAble" type="primary" @click.stop="addProblem('check')" :disabled="info.checkCount<=checkList.length">添加试题</el-button>
						</template>
						<div v-loading="checkLoading">
							<template v-if="checkList.length>0">
								<div class="el-question" :class="{'is-event-able': isEditAble}">
									<div class="el-question-title has-order">
										<span class="el-question-index">{{checkCurrent + 1}}.</span>
										<div v-html="checkProblem.content"></div>
									</div>
									<div class="el-question-options mask">
				                        <el-checkbox-group v-model="checkProblem.answer">
				                            <el-checkbox class="radio-short" label="A">
					                            <span>A.</span>
					                            <div class="radio-short-div" v-html="checkProblem.optiona"></div>
					                            </el-checkbox>
				                            <el-checkbox class="radio-short" label="B">
				                            	<span>B.</span>
				                            	<div class="radio-short-div" v-html="checkProblem.optionb"></div>
				                            </el-checkbox>
				                            <el-checkbox class="radio-short" label="C">
				                            	<span>C.</span>
				                            	<div class="radio-short-div" v-html="checkProblem.optionc"></div>
				                            </el-checkbox>
				                            <el-checkbox class="radio-short" label="D">
				                            	<span>D.</span>
				                            	<div class="radio-short-div" v-html="checkProblem.optiond"></div>
				                            </el-checkbox>
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
											<div class="el-info-content">{{checkProblem.examingPoint}}</div>
										</div>
										<div class="el-info">
											<div class="el-label el-label-purple">添加人</div>
											<div class="el-info-content">{{checkProblem.creator}}</div>
										</div>
									</div>
									<el-button v-if="isEditAble" type="danger" class="el-question-btn" @click="removeProblem(checkProblem.id, 'check')">删除</el-button>
								</div>
								<div class="pageArea" v-if="isDrawPage && !isCheckNewPage && checkList.length>1">
									<Page :pageNo="checkCurrent + 1" :totalCount="checkList.length" pageSize="1" @page-change="checkPageChange"></Page>
								</div>
							</template>
							<template v-else>
								<div class="text-center">“多选题”还没有添加任何题目</div>
							</template>
						</div>
					</el-collapse-item>
					<el-collapse-item>
						<template slot="title">
							<span>判断题（共需{{info.judgeCount}}题 &nbsp; 已有{{judgeList.length}}题 &nbsp; 每题{{info.judgeScore}}分）</span>
							<el-button v-if="isEditAble" type="primary" @click.stop="addProblem('judge')" :disabled="info.judgeCount<=judgeList.length">添加试题</el-button>
						</template>
						<div v-loading="judgeLoading">
							<template v-if="judgeList.length>0">
								<div class="el-question" :class="{'is-event-able': isEditAble}">
									<div class="el-question-title has-order">
										<span class="el-question-index">{{judgeCurrent + 1}}.</span>
										<div v-html="judgeProblem.content"></div>
									</div>
									<div class="el-question-options mask">
				                        <el-radio-group v-model="judgeProblem.answer">
				                            <el-radio class="radio-short" label="A">
				                            	<span>A.</span>
				                            	<div class="radio-short-div" v-html="judgeProblem.optiona"></div>
				                            	</el-radio>
				                            <el-radio class="radio-short" label="B">
					                            <span>B.</span>
					                            <div class="radio-short-div" v-html="judgeProblem.optionb"></div>
				                            </el-radio>
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
											<div class="el-info-content">{{judgeProblem.examingPoint}}</div>
										</div>
										<div class="el-info">
											<div class="el-label el-label-purple">添加人</div>
											<div class="el-info-content">{{judgeProblem.creator}}</div>
										</div>
									</div>
									<el-button v-if="isEditAble" type="danger" class="el-question-btn" @click="removeProblem(judgeProblem.id, 'judge')">删除</el-button>
								</div>
								<div class="pageArea" v-if="isDrawPage && !isJudgeNewPage && judgeList.length>1">
									<Page :pageNo="judgeCurrent + 1" :totalCount="judgeList.length" pageSize="1" @page-change="judgePageChange"></Page>
								</div>
							</template>
							<template v-else>
								<div class="text-center">“判断题”还没有添加任何题目</div>
							</template>
						</div>
					</el-collapse-item>
					<el-collapse-item>
						<template slot="title">
							<span>选做题（共需{{info.optionalCount}}题 &nbsp; 已有{{optionalList.length}}题 &nbsp; 选做{{info.mustCount}}题 &nbsp; 每题{{info.optionalScore}}分）</span>
							<el-button v-if="isEditAble" type="primary" @click.stop="addProblem('option')" :disabled="info.optionalCount<=optionalList.length">添加试题</el-button>
						</template>
						<div v-loading="optionLoading">
							<template v-if="optionalList.length>0">
								<div class="el-question" :class="{'is-event-able': isEditAble}">
									<div class="el-question-title has-order">
										<span class="el-question-index">{{optionalCurrent + 1}}.</span>
										<div v-html="optionProblem.content"></div>
									</div>
				                    <div v-if="optionProblem.questionTypeId === 2" class="el-question-options mask">
				                        <el-checkbox-group v-model="optionProblem.answer">
				                            <el-checkbox class="radio-short" label="A">
					                            <span>A.</span>
					                            <div class="radio-short-div" v-html="optionProblem.optiona"></div>
					                            </el-checkbox>
				                            <el-checkbox class="radio-short" label="B">
				                            	<span>B.</span>
				                            	<div class="radio-short-div" v-html="optionProblem.optionb"></div>
				                            </el-checkbox>
				                            <el-checkbox class="radio-short" label="C">
				                            	<span>C.</span>
				                            	<div class="radio-short-div" v-html="optionProblem.optionc"></div>
				                            </el-checkbox>
				                            <el-checkbox class="radio-short" label="D">
				                            	<span>D.</span>
				                            	<div class="radio-short-div" v-html="optionProblem.optiond"></div>
				                            </el-checkbox>
				                        </el-checkbox-group>
				                    </div>
									<div v-else-if="optionProblem.questionTypeId === 3" class="el-question-options mask">
				                        <el-radio-group v-model="optionProblem.answer">
				                            <el-radio class="radio-short" label="A">
				                            	<span>A.</span>
				                            	<div class="radio-short-div" v-html="optionProblem.optiona"></div>
				                            	</el-radio>
				                            <el-radio class="radio-short" label="B">
					                            <span>B.</span>
					                            <div class="radio-short-div" v-html="optionProblem.optionb"></div>
				                            </el-radio>
				                        </el-radio-group>
				                    </div>
				                    <div v-else class="el-question-options mask">
				                        <el-radio-group v-model="optionProblem.answer">
				                            <el-radio class="radio-short" label="A">
				                            	<span>A.</span>
				                            	<div class="radio-short-div" v-html="optionProblem.optiona"></div>
				                            	</el-radio>
				                            <el-radio class="radio-short" label="B">
					                            <span>B.</span>
					                            <div class="radio-short-div" v-html="optionProblem.optionb"></div>
				                            </el-radio>
				                            <el-radio v-if="optionProblem.optionc" class="radio-short" label="C">
					                            <span>C.</span>
					                            <div class="radio-short-div" v-html="optionProblem.optionc"></div>
				                            </el-radio>
				                            <el-radio v-if="optionProblem.optiond" class="radio-short" label="D">
					                            <span>D.</span>
					                            <div class="radio-short-div" v-html="optionProblem.optiond"></div>
				                            </el-radio>
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
											<div class="el-info-content">{{optionProblem.examingPoint}}</div>
										</div>
										<div class="el-info">
											<div class="el-label el-label-purple">添加人</div>
											<div class="el-info-content">{{optionProblem.creator}}</div>
										</div>
									</div>
									<el-button v-if="isEditAble" type="danger" class="el-question-btn" @click="removeProblem(optionProblem.id, 'option')">删除</el-button>
								</div>
								<div class="pageArea" v-if="isDrawPage && !isOptionNewPage && optionalList.length>1">
									<Page :pageNo="optionalCurrent + 1" :totalCount="optionalList.length" pageSize="1" @page-change="optionPageChange"></Page>
								</div>
							</template>
							<template v-else>
								<div class="text-center">“选做题”还没有添加任何题目</div>
							</template>
						</div>
					</el-collapse-item>
				</el-collapse>
			</div>
		</div>
		<add-problem :flag="addType" :id="id" v-if="isEditAble && isAddProblem" @back="addProblemBack"></add-problem>
	</section>
</template>
<script>
	import { getPaperProblemList, updatePaperStatus, removePaperProblem } from '../../../api/api';
	import Page from '../../common/Pagination.vue'
	import addProblem from './AddProblem.vue'
	export default{
		props:{
			id:{
				required: true
			},
			info:{
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

				radioLoading: false,
				radioList: [],//单选题目列表
				radioCurrent: 0,//当前单选对应索引序号
				isRadioNewPage: false,//为了刷新分页

				checkLoading: false,
				checkList: [],//多选题目列表
				checkCurrent: 0,//当前多选对应索引序号
				isCheckNewPage: false,//为了刷新分页

				judgeLoading: false,
				judgeList: [],//判断题目列表
				judgeCurrent: 0,//当前判断对应索引序号
				isJudgeNewPage: false,//为了刷新分页

				optionLoading: false,
				optionalList: [],//选做题目列表
				optionalCurrent: 0,//当前选做对应索引序号
				isOptionNewPage: false,//为了刷新分页

				saveLoading: false,//保存加载mask
				isSaveSubmitted: false,//是否保存过
				isAddProblem: false,
				addType: 'radio'
			}
		},
		computed:{
			radioProblem(){//“单选”当前题目
				return this.radioList[this.radioCurrent]?this.radioList[this.radioCurrent]:{};
			},
			checkProblem(){//“多选”当前题目
				var currentProblem = this.checkList[this.checkCurrent];
				if(currentProblem){
					currentProblem.answer = this.checkAnswerFormat(currentProblem.answer);
					return currentProblem;
				}else{
					return {};
				}
			},
			judgeProblem(){//“判断”当前题目
				return this.judgeList[this.judgeCurrent]?this.judgeList[this.judgeCurrent]:{};
			},
			optionProblem(){//“选做”当前题目
				var currentProblem = this.optionalList[this.optionalCurrent];
				if(currentProblem){
					if(currentProblem.questionTypeId === 2){//多选
						currentProblem.answer = this.checkAnswerFormat(currentProblem.answer);
					}
					return currentProblem;
				}else{
					return {};
				}
			},
			isEditAble(){
				var isEditAble = true;

				//当前用户与创建人一致
				//试卷状态未启用
				// var userName = this.$store.getters.userName;
				// if(this.info.creator != userName || (this.info.status != 0 && this.info.status != 1)){
				// 	isEditAble = false;
				// }

				//状态0：未完成;1:已完成;2已发布
				if(this.info.status != 0 && this.info.status != 1){
					isEditAble = false;
				}
				return isEditAble;
			},
			totalSet(){//已有分值
				var sum = 0;
				sum += this.radioList.length * this.info.radioScore;
				sum += this.checkList.length * this.info.checkScore;
				sum += this.judgeList.length * this.info.judgeScore;
				if(this.optionalList.length >= this.info.mustCount){
					sum += this.info.mustCount * this.info.optionalScore;
				}else{
					sum += this.optionalList.length * this.info.optionalScore;
				}
				return sum;
			}
		},
		methods:{
			init(){
				this.isDrawPage = false;
				var param = {
					paperId: this.id
				};
				getPaperProblemList(param).then(res => {
					this.radioList = res.data.radio || [];
					this.checkList = res.data.check || [];
					this.judgeList = res.data.judge || [];
					this.optionalList = res.data.optional || [];
					this.isDrawPage = true;
				});
			},
			onSave(){//试卷保存
				//前端100分判断(后端判定100分)
				if(this.info.radioCount != this.radioList.length){
					this.$message({
						type: 'error',
						message: '单选题已有题数与所需题数不一致！'
					});
					return false;
				}
				if(this.info.checkCount != this.checkList.length){
					this.$message({
						type: 'error',
						message: '多选题已有题数与所需题数不一致！'
					});
					return false;
				}
				if(this.info.judgeCount != this.judgeList.length){
					this.$message({
						type: 'error',
						message: '判断题已有题数与所需题数不一致！'
					});
					return false;
				}
				if(this.info.optionalCount != this.optionalList.length){
					this.$message({
						type: 'error',
						message: '选做题已有题数与所需题数不一致！'
					});
					return false;
				}
				if(this.totalSet == this.info.totalPoint){
					this.saveLoading = true;
					
					var params = {
						paperId: this.id,
						//status: 2
					};
					updatePaperStatus(params).then(res => {
						this.saveLoading = false;
						if(res.code == '0'){
							this.isSaveSubmitted = true;
							this.$message({
								type: 'success',
								message: '试卷启用成功'
							});
							this.goBack();
						}else{//其他原因
							this.$message({
								type: 'error',
								message: res.msg
							});
						}
					});
				}else{
					this.$message({
						type: 'error',
						message: '当前已有分值：' + this.totalSet + '分；总分：'+ this.info.totalPoint + '分；不一致！'
					});
				}
			},
			removeProblem(id, blockType){
				switch(blockType){
					case 'radio': 
						this.radioLoading = true;
						this.isRadioNewPage = true;
						break;
					case 'check': 
						this.checkLoading = true;
						this.isCheckNewPage = true;
						break;
					case 'judge': 
						this.judgeLoading = true;
						this.isJudgeNewPage = true;
						break;
					case 'option': 
						this.optionLoading = true;
						this.isOptionNewPage = true;
						break;
					default: break;
				};
				//to do
				var params = {
					paperId: this.id,//试卷id
					problemId: id//题目id
				};
				removePaperProblem(params).then(res => {
					if(res.code == 0){
		                switch(blockType){
							case 'radio': 
								this.radioList.splice(this.radioCurrent, 1);
								this.radioCurrent = 0;
								this.isRadioNewPage = false;
								this.radioLoading = false;
								break;
							case 'check': 
								this.checkList.splice(this.checkCurrent, 1);
								this.checkCurrent = 0;
								this.isCheckNewPage = false;
								this.checkLoading = false;
								break;
							case 'judge': 
								this.judgeList.splice(this.judgeCurrent, 1);
								this.judgeCurrent = 0;
								this.isJudgeNewPage = false;
								this.judgeLoading = false;
								break;
							case 'option': 
								this.optionalList.splice(this.optionalCurrent, 1);
								this.optionalCurrent = 0;
								this.isOptionNewPage = false;
								this.optionLoading = false;
								break;
							default: break;
						};
						this.$message({
		                    message: '删除成功',
		                    type: 'success'
		                });
					}
				});
			},
			goBack(){
				this.$emit('close', {refresh:this.isSaveSubmitted});
			},
			addProblemBack({refresh}){//取消添加试题
				this.isAddProblem = false;
				if(refresh){
					this.init();
				}
			},
			addProblem(type){//添加试题
				this.isAddProblem = true;
				this.addType = type;
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
				this.optionalCurrent = pageNo - 1;
			},
			checkAnswerFormat(checkAnswer){
				if(!_.isArray(checkAnswer)){
					return checkAnswer.split(',')
				}else{
					return checkAnswer;
				}
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