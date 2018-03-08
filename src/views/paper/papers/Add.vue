<template>
	<section>
		<div v-show="!isNext" class="panel">
			<div class="title">
				<span>添加试卷</span>
				<div class="pull-right">
					<el-button type="success" @click="onSubmit('form')" class="el-button-shadow">保存</el-button>
					<el-button type="danger" @click="resetForm('form')" class="el-button-shadow">重置</el-button>
				</div>
			</div>
			<div class="content" v-loading="isSubmitting">
				<el-form id="paperForm" ref="form" :model="form" :rules="rules" label-width="110px" :inline-message="isInlineMessage" @submit.prevent="onSubmit">
					<el-form-item label="试卷名称：" prop="name">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="选择课程：" prop="subject"> 
						<el-select v-model="form.subject" placeholder="请选择课程">
						    <el-option :loading="subjectLoading" 
						      v-for="item in subjectOptions"
						      :key="item.value"
						      :label="item.text"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="组卷方式：" prop="mode">
						<el-select v-model="form.mode" placeholder="请选择组卷方式">
							<el-option label="随机组卷" value="random"></el-option>
							<el-option label="手动组卷" value="manual"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="考试时长：" prop="time">
						<el-input v-model="form.time"></el-input>
						<span class="text-primary" style="margin-left:12px;">*单位分钟</span>
					</el-form-item>
					<el-form-item label="考试题型：">
						<el-col :span="24">
							<el-form-item class="form-item-unit" prop="radiocount">
								单选 <el-input v-model.integer="form.radiocount"></el-input> 道
							</el-form-item>
							<el-form-item class="form-item-unit" prop="radioscore">
								分值 <el-input v-model.integer="form.radioscore"></el-input> 分
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item class="form-item-unit" prop="checkcount">
								多选 <el-input v-model.integer="form.checkcount"></el-input> 道
							</el-form-item>
							<el-form-item class="form-item-unit" prop="checkscore">
								分值 <el-input v-model.integer="form.checkscore"></el-input> 分
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item class="form-item-unit" prop="judgecount">
								判断 <el-input v-model.integer="form.judgecount"></el-input> 道
							</el-form-item>
							<el-form-item class="form-item-unit" prop="judgescore">
								分值 <el-input v-model.integer="form.judgescore"></el-input> 分
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item class="form-item-unit" prop="optionalCount">
								选做 <el-input v-model.integer="form.optionalCount"></el-input> 道
							</el-form-item>
							<el-form-item class="form-item-unit" prop="mustCount">
								需做 <el-input v-model.integer="form.mustCount"></el-input> 道
							</el-form-item>
							<el-form-item class="form-item-unit" prop="choosescore">
								分值 <el-input v-model.integer="form.choosescore"></el-input> 分
							</el-form-item>
						</el-col>
					</el-form-item>
					<el-form-item label="试卷总分：" required>
						<el-input v-model="form.total" disabled></el-input>
					</el-form-item>
					<el-form-item v-if="!isConfigRequired">
						<el-button type="success" class="el-button-shadow" @click="onSubmit('form','next')">下一步</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<Detail :id="detailPaperId" :info="detailPaperInfo" v-if="isNext" @close="detailBack"></Detail>
	</section>
</template>
<script>
	import Detail from './Detail.vue'
	import { getCoursesMap, savePaper } from '../../../api/api';
	export default {
		components:{
			Detail
		},
		data() {
			var integerPattern = '^\\d+$';//>=0整数正则
			return {
				isInlineMessage: true,
				isNext: false,
				isSubmitting: false,
				subjectLoading: true,//科目加载
				subjectOptions: [], //科目选项组
				form: {
					name: '',//试卷名称
					subject: '',//科目
					mode: 'random',//组卷方式
					time: '',//考试时间
					radiocount:'',//单选题数
					radioscore:'',//单选每题分数
					checkcount:'',//多选题数
					checkscore:'',//多选每题分数
					judgecount:'',//判断分数
					judgescore:'',//判断每题分数
					optionalCount:'',//选做题数
					mustCount:'',//选做必做题数
					choosescore:'',//选做每题分数
					total: 100//总分
				},
				detailPaperId:'',
				detailPaperInfo: '',
				rules:{
					name:[
						{required: true, message: '请输入试卷名称', trigger: 'blur'},
						{min: 2, max: 30, message: '长度在2-30个字符', trigger: 'blur'}
					],
					subject:[
						{required: true, message: '请选择科目', trigger:'change'}
					],
					mode: [
						{required: true, message: '请选择组卷方式', trigger:'change'}
					],
					time: [
						{required: true, message: '请输入时长', trigger:'change'},
						{pattern: integerPattern, message: '请输入整数', trigger:'change'}
					],
					radiocount: [
						{required: true, message: '请输入题数', trigger:'change'},
						{pattern: integerPattern, message: '请输入整数', trigger: 'change'}
					],
					radioscore: [
						{required: true, message: '请输入分值', trigger:'change'},
						{pattern: integerPattern, message: '请输入整数', trigger:'change'}
					],
					checkcount: [
						{required: true, message: '请输入题数', trigger:'change'},
						{pattern: integerPattern, message: '请输入整数', trigger:'change'}
					],
					checkscore: [
						{required: true, message: '请输入分值', trigger:'change'},
						{pattern: integerPattern, message: '请输入整数', trigger:'change'}
					],
					judgecount: [
						{required: true, message: '请输入题数', trigger:'change'},
						{pattern: integerPattern, message: '请输入整数', trigger:'change'}
					],
					judgescore: [
						{required: true, message: '请输入分值', trigger:'change'},
						{pattern: integerPattern, message: '请输入整数', trigger:'change'}
					],
					optionalCount: [
						{required: true, message: '请输入选做题数', trigger:'change'},
						{pattern: integerPattern, message: '请输入整数', trigger:'change'}
					],
					mustCount: [
						{required: true, message: '请输入必做题数', trigger:'change'},
						{pattern: integerPattern, message: '请输入整数', trigger:'change'}
					],
					choosescore: [
						{required: true, message: '请输入分值', trigger:'change'},
						{pattern: integerPattern, message: '请输入整数', trigger:'change'}
					],
					total:{required:true}
				}
			}
		},
		computed:{
			isConfigRequired(){
				return this.form.mode === 'random';
			}
		},
		methods: {
			init(){
				this.getCourseOptions();
			},
			getCourseOptions(){//获取科目组
				this.subjectLoading = true;
				getCoursesMap({}).then(res => {
					this.subjectOptions = res.data;
					this.subjectLoading = false;
				});
			},
			onSubmit(formName, flag) {
				   this.$refs['form'].validate((valid) => {
					if(valid){
						//验证总分是否100分
						if(this.form.mustCount>this.form.optionalCount){
							this.alerrError("选做题的需做数超过总题数!");
							return false;
						}
						var sum = 0;
						sum += this.form.radiocount * this.form.radioscore;
						sum += this.form.checkcount * this.form.checkscore;
						sum += this.form.judgecount * this.form.judgescore;
						sum += this.form.choosescore * this.form.mustCount;
						if(sum != this.form.total){
							this.alerrError("分数已配置:" + sum + "分; 总分:"+ this.form.total +"分;不一致!");
							return false;
						}

                        var paperParams = {
                        	paperType:1,
                            name: this.form.name,
                            "course.id": this.form.subject,
                            duration:this.form.time,
                            radioCount: this.form.radiocount,
                            radioScore: this.form.radioscore,
                            checkCount: this.form.checkcount,
                            checkScore: this.form.checkscore,
                            judgeCount: this.form.judgecount,
                            judgeScore: this.form.judgescore,
                            optionalCount: this.form.optionalCount,
                            mustCount: this.form.mustCount,
                            optionalScore: this.form.choosescore,
                            total:this.form.total,
                            mode: this.form.mode,
                        };
                        console.log('paperParams',paperParams);
                        this.$confirm('确认添加吗？', '提示', {}).then(() => {
                            this.loading = true;
                            savePaper(paperParams).then((res) => {
                                console.log(res);
                                if (res.code != 0) {
                                    this.$message({
                                        message: res.msg,//"题目数量不足",
                                        type: 'error'
                                    });
                                } else {
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    this.loading = false;
                                    this.$refs['form'].resetFields();
                                    if(flag && flag == 'next'){
										this.resetForm('form');
										this.detailPaperId = '1';
										this.detailPaperInfo.totalPoint = paperParams.total;
										this.detailPaperInfo.status = 0;
										this.isNext = true;
									}
                                }

                            });
                        });
						

						
					}else{
						return false;
					}
				});
			},
			resetForm(formName){
				this.$refs[formName].resetFields();
			},
			detailBack(){
				this.isNext = false;
			}
		},
		mounted(){
			this.init();
		}
	}
</script>
<style scoped lang="scss">
    @import '~scss_vars';
</style>