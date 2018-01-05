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
						<div class="el-question">
							<div class="el-question-title">
								<span>1. 某物体在一足够大的光滑平面上向西运动，当它受到一个向南的恒定外力作用时，物体运动将是（）</span>
							</div>
							<div class="el-question-options">
								<el-radio-group v-model="radioAnswer">
								<el-radio label="A">A. 直线运动且是匀变速直线运动</el-radio>
								<el-radio label="B">B. 曲线运动但加速度方向不变、大小不变，是匀变速运动</el-radio>
								<el-radio label="C">C. 曲线运动但加速度方向改变、大小不变，是非匀变速曲线运动</el-radio>
								<el-radio label="D">D. 曲线运动，加速度大小和方向均改变，是非匀变速曲线运动</el-radio>
							</el-radio-group>
							</div>
							<div class="el-question-info">
								<div class="el-info">
									<div class="el-label el-label-light-green">正确答案</div>
									<div class="el-info-content">A</div>
								</div>
								<div class="el-info">
									<div class="el-label el-label-blue">解析</div>
									<div class="el-info-content">光滑、摩擦力</div>
								</div>
								<div class="el-info">
									<div class="el-label el-label-green">考点</div>
									<div class="el-info-content">曲线运动，匀速运动</div>
								</div>
								<div class="el-info">
									<div class="el-label el-label-purple">添加人</div>
									<div class="el-info-content">Admin</div>
								</div>
							</div>
							<div class="pageArea">
								<Page v-if="isDrawPage" current="1" :total="radioCount" pageSize="1" @page-change="radioPageChange"></Page>
							</div>
						</div>
					</el-collapse-item>
					<el-collapse-item>
						<template slot="title">
							<span>多选题（共<span>{{detail.check.count}}</span>题 &nbsp; 每题<span>{{detail.check.perScore}}</span>分）</span>
							<el-button v-if="isEditAble" type="primary" @click.stop="addProblem('check')">添加试题</el-button>
						</template>
						<div class="el-question">
							<div class="el-question-title">
								<span>1. 某物体在一足够大的光滑平面上向西运动，当它受到一个向南的恒定外力作用时，物体运动将是（）</span>
							</div>
							<div class="el-question-options">
								<el-checkbox-group v-model="checkAnswer">
								<el-checkbox label="A">A. 直线运动且是匀变速直线运动</el-checkbox>
								<el-checkbox label="B">B. 曲线运动但加速度方向不变、大小不变，是匀变速运动</el-checkbox>
								<el-checkbox label="C">C. 曲线运动但加速度方向改变、大小不变，是非匀变速曲线运动</el-checkbox>
								<el-checkbox label="D">D. 曲线运动，加速度大小和方向均改变，是非匀变速曲线运动</el-checkbox>
							</el-checkbox-group>
							</div>
							<div class="el-question-info">
								<div class="el-info">
									<div class="el-label el-label-light-green">正确答案</div>
									<div class="el-info-content">A,B</div>
								</div>
								<div class="el-info">
									<div class="el-label el-label-blue">解析</div>
									<div class="el-info-content">光滑、摩擦力</div>
								</div>
								<div class="el-info">
									<div class="el-label el-label-green">考点</div>
									<div class="el-info-content">曲线运动，匀速运动</div>
								</div>
								<div class="el-info">
									<div class="el-label el-label-purple">添加人</div>
									<div class="el-info-content">Admin</div>
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
						<div class="el-question">
							<div class="el-question-title">
								<span>1. 某物体在一足够大的光滑平面上向西运动，当它受到一个向南的恒定外力作用时，物体运动将是直线运动且是匀变速直线运动。</span>
							</div>
							<div class="el-question-options">
								<el-radio-group v-model="judgeAnswer">
								<el-radio label="A">A. 正确</el-radio>
								<el-radio label="B">B. 错误</el-radio>
							</el-radio-group>
							</div>
							<div class="el-question-info">
								<div class="el-info">
									<div class="el-label el-label-light-green">正确答案</div>
									<div class="el-info-content">A</div>
								</div>
								<div class="el-info">
									<div class="el-label el-label-blue">解析</div>
									<div class="el-info-content">光滑、摩擦力</div>
								</div>
								<div class="el-info">
									<div class="el-label el-label-green">考点</div>
									<div class="el-info-content">曲线运动，匀速运动</div>
								</div>
								<div class="el-info">
									<div class="el-label el-label-purple">添加人</div>
									<div class="el-info-content">Admin</div>
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
						<div class="el-question">
							<div class="el-question-title">
								<span>1. 某物体在一足够大的光滑平面上向西运动，当它受到一个向南的恒定外力作用时，物体运动将是（）</span>
							</div>
							<div class="el-question-options">
								<el-radio-group v-model="optionAnswer">
								<el-radio label="A">A. 直线运动且是匀变速直线运动</el-radio>
								<el-radio label="B">B. 曲线运动但加速度方向不变、大小不变，是匀变速运动</el-radio>
								<el-radio label="C">C. 曲线运动但加速度方向改变、大小不变，是非匀变速曲线运动</el-radio>
								<el-radio label="D">D. 曲线运动，加速度大小和方向均改变，是非匀变速曲线运动</el-radio>
							</el-radio-group>
							</div>
							<div class="el-question-info">
								<div class="el-info">
									<div class="el-label el-label-light-green">正确答案</div>
									<div class="el-info-content">A</div>
								</div>
								<div class="el-info">
									<div class="el-label el-label-blue">解析</div>
									<div class="el-info-content">光滑、摩擦力</div>
								</div>
								<div class="el-info">
									<div class="el-label el-label-green">考点</div>
									<div class="el-info-content">曲线运动，匀速运动</div>
								</div>
								<div class="el-info">
									<div class="el-label el-label-purple">添加人</div>
									<div class="el-info-content">Admin</div>
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
	import { getPaperDetail } from '../../../api/api';
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
					name:'',
				    total:'',
				    radio:{
				        count: '',
				        perScore:''
				    },
				    check:{
				        count: '',
				        perScore:''
				    },
				    judge:{
				        count: '',
				        perScore:''
				    },
				    option:{
				        count: '',
				        perScore:''
				    }
				},
				radioAnswer:'A',
				checkAnswer:'A',
				judgeAnswer:'A',
				optionAnswer:'A',
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
			},
			radioCount(){
				console.log(this.detail.radio.count)
				return this.detail.radio.count;
			}
		},
		methods:{
			init(){
				var param = {
					id: this.id
				};
				getPaperDetail(param).then(res => {
					console.log(res)
					this.detail = res.data;
					this.isDrawPage = true;
				});
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
			radioPageChange(current){

			},
			checkPageChange(current){

			},
			judgePageChange(current){

			},
			optionPageChange(current){

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
		}
	}
	.el-info{
		.el-info-content{
			padding: 10px 0;
		}
		margin-bottom: 10px;
	}
</style>