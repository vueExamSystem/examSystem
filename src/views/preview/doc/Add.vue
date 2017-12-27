<template>
	<section>
		<div class="panel">
			<div class="title">
				<span>添加试卷</span>
				<div class="pull-right">
					<el-button type="success" @click="onSubmit('form')" class="el-button-shadow">保存</el-button>
					<el-button type="danger" @click="resetForm('form')" class="el-button-shadow">重置</el-button>
				</div>
			</div>
			<div class="content">
				<el-form id="paperForm" ref="form" :model="form" :rules="rules" label-width="110px" :inline-message="isInlineMessage" @submit.prevent="onSubmit">
					<el-form-item label="试卷名称：" prop="name">
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
					<el-form-item label="试卷总分：" required>
						<el-input v-model="form.total" disabled></el-input>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</section>
</template>
<script>
	export default {
		data() {
			var integerPattern = '^\\d+$';//>=0整数正则
			return {
				isInlineMessage: true,
				isNext: false,
				form: {
					name: '',
					subject: '',
					mode: 'random',
					time: '',
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
					total:{required:true}
				}
			}
		},
		computed:{
			
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