<template>
	<section>
		<div v-show="!isNext" class="panel">
			<div class="title">
				<span>添加测试</span>
				<div class="pull-right">
					<el-button type="success" @click="onSubmit('form')" class="el-button-shadow">保存</el-button>
					<el-button type="danger" @click="resetForm('form')" class="el-button-shadow">重置</el-button>
				</div>
			</div>
			<div class="content">
				<el-form id="paperForm" ref="form" :model="form" :rules="rules" label-width="110px" :inline-message="isInlineMessage" @submit.prevent="onSubmit">
					<el-form-item label="测试名称：" prop="name">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="选择科目：" prop="subject"> 
						<el-select v-model="form.subject" placeholder="请选择科目">
							<el-option label="大学物理" value="hysics"></el-option>
							<el-option label="高等数学" value="mathematics"></el-option>
							<el-option label="大学英语" value="english"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="组卷方式：" prop="mode">
						<el-select v-model="form.mode" placeholder="请选择组卷方式">
							<el-option label="自动" value="random"></el-option>
							<el-option label="手动组卷" value="manual"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="考试时长：" prop="time">
						<el-input v-model="form.time"></el-input>
						<span class="text-primary" style="margin-left:12px;">*单位分钟</span>
					</el-form-item>
					<el-form-item label="考试题型：" :required="isConfigRequired" v-if="isConfigRequired">
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
							<el-form-item class="form-item-unit" prop="optional">
								选做 <el-input v-model.integer="form.optional"></el-input> 道
							</el-form-item>
							<el-form-item class="form-item-unit" prop="necessary">
								需做 <el-input v-model.integer="form.necessary"></el-input> 道
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
		<Detail v-if="isNext" @back="detailBack"></Detail>
	</section>
</template>
<script>
	import Detail from './Detail.vue'
	export default {
		components:{
			Detail
		},
		data() {
			var integerPattern = '^\\d+$';//>=0整数正则
			var isRequiedValidator = (rule, value, callback) => {//考试题型是否需要验证
				if(this.isConfigRequired && value.length == 0){
					callback(new Error('该项不能为空'));
				}else{
					callback();
				}
			};
			return {
				isInlineMessage: true,
				isNext: false,
				form: {
					name: '',
					subject: '',
					mode: 'random',
					time: '',
					radiocount:'',
					radioscore:'',
					checkcount:'',
					checkscore:'',
					judgecount:'',
					judgescore:'',
					optional:'',
					necessary:'',
					choosescore:'',
					total: '100'
				},
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
						{validator: isRequiedValidator, message: '请输入题数', trigger:'change'},
						{pattern: integerPattern, message: '请输入整数', trigger: 'change'}
					],
					radioscore: [
						{validator: isRequiedValidator, message: '请输入分值', trigger:'change'},
						{pattern: integerPattern, message: '请输入整数', trigger:'change'}
					],
					checkcount: [
						{validator: isRequiedValidator, message: '请输入题数', trigger:'change'},
						{pattern: integerPattern, message: '请输入整数', trigger:'change'}
					],
					checkscore: [
						{validator: isRequiedValidator, message: '请输入分值', trigger:'change'},
						{pattern: integerPattern, message: '请输入整数', trigger:'change'}
					],
					judgecount: [
						{validator: isRequiedValidator, message: '请输入题数', trigger:'change'},
						{pattern: integerPattern, message: '请输入整数', trigger:'change'}
					],
					judgescore: [
						{validator: isRequiedValidator, message: '请输入分值', trigger:'change'},
						{pattern: integerPattern, message: '请输入整数', trigger:'change'}
					],
					optional: [
						{validator: isRequiedValidator, message: '请输入选做题数', trigger:'change'},
						{pattern: integerPattern, message: '请输入整数', trigger:'change'}
					],
					necessary: [
						{validator: isRequiedValidator, message: '请输入必做题数', trigger:'change'},
						{pattern: integerPattern, message: '请输入整数', trigger:'change'}
					],
					choosescore: [
						{validator: isRequiedValidator, message: '请输入分值', trigger:'change'},
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
			onSubmit(formName, flag) {
				this.$refs[formName].validate((isValid) => {
					if(isValid){
						//to do
						//save ...
						if(flag && flag == 'next'){
							this.isNext = true;
						}
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
		}
	}
</script>
<style scoped lang="scss">
    @import '~scss_vars';
    #paperForm{
    	min-width:600px;
    	padding:20px 10px;
    	letter-spacing:0.87px;
    	.form-item-unit{
			display: inline-block;
			vertical-align: top;
			width: 180px;
			.el-input{
				width: 80px;
				margin: 0 10px;
			}
		}
    }

</style>