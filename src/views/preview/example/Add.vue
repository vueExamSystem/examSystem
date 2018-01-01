<template>
	<section>
		<div class="panel">
			<div class="title">
				<span>添加试卷</span>
				<div class="pull-right">
					<el-button type="success" @click="onSubmit('form')" class="el-button-shadow">保存</el-button>
				</div>
			</div>
			<div class="content">
				<el-form ref="form" :model="form" :rules="rules" label-width="110px" :inline-message="isInlineMessage" @submit.prevent="onSubmit">
					<el-form-item label="预习名称：" prop="name">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="选择预习：" prop="subject"> 
						<el-select v-model="form.subject" placeholder="请选择预习科目">
							<el-option label="大学物理" value="hysics"></el-option>
							<el-option label="高等数学" value="mathematics"></el-option>
							<el-option label="大学英语" value="english"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="预习年级：" prop="grade">
						<el-select v-model="form.grade" placeholder="请选择预习年级">
							<el-option label="16级" value="16"></el-option>
							<el-option label="15级" value="15"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="预习院系：" prop="department">
						<el-select v-model="form.department" placeholder="请选择预习院系">
							<el-option label="物理工程系" value="wuli"></el-option>
							<el-option label="计算机工程系" value="jisuanji"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="预习班级：" prop="class">
						<el-select v-model="form.class" placeholder="请选择预习班级">
							<el-option label="1班" value="1"></el-option>
							<el-option label="2班" value="2"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="结束时间：" prop="endtime">
						<el-date-picker type="datetime" placeholder="请选择结束时间" format="yyyy/MM/dd HH:mm" v-model="form.endtime" style="width: 240px;"></el-date-picker>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</section>
</template>
<script>
	export default {
		data() {
			return {
				isInlineMessage: true,
				form: {
					name: '',
					subject: '',
					department: '',
					class: '',
					endtime: ''
				},
				rules:{
					name:[
						{required: true, message: '请输入预习名称', trigger: 'blur'},
						{min: 2, max: 30, message: '长度在2-30个字符', trigger: 'blur'}
					],
					subject:[
						{required: true, message: '请选择预习科目', trigger:'change'}
					],
					grade: [
						{required: true, message: '请选择预习年级', trigger:'change'}
					],
					department: [
						{required: true, message: '请选择预习院系', trigger:'change'}
					],
					class: [
						{required: true, message: '请选择预习班级', trigger:'change'}
					],
					endtime:{required:true, message: '请选择结束时间', trigger:'change'}
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
						
					}else{
						return false;
					}
				});
			}
		}
	}
</script>
<style scoped lang="scss">
    @import '~scss_vars';
    
</style>