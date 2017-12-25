<template>
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
						<el-option label="手动" value="manual"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="考试时长：" prop="time">
					<el-input v-model="form.time"></el-input>
					<span class="text-primary" style="margin-left:12px;">*单位分钟</span>
				</el-form-item>
				<el-form-item label="考试题型：" required>
					<el-col :span="24">
						<el-form-item class="form-item-unit" prop="radiocount">
							单选 <el-input v-model="form.config.radiocount"></el-input> 道
						</el-form-item>
						<el-form-item class="form-item-unit" prop="radioscore">
							分值 <el-input v-model="form.config.radioscore"></el-input> 分
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item class="form-item-unit" prop="checkcount">
							多选 <el-input v-model="form.config.checkcount"></el-input> 道
						</el-form-item>
						<el-form-item class="form-item-unit" prop="checkscore">
							分值 <el-input v-model="form.config.checkscore"></el-input> 分
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item class="form-item-unit" prop="judgecount">
							判断 <el-input v-model="form.config.judgecount"></el-input> 道
						</el-form-item>
						<el-form-item class="form-item-unit" prop="judgescore">
							分值 <el-input v-model="form.config.judgescore"></el-input> 分
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item class="form-item-unit" prop="optional">
							选做 <el-input v-model="form.config.optional"></el-input> 道
						</el-form-item>
						<el-form-item class="form-item-unit" prop="necessary">
							需做 <el-input v-model="form.config.necessary"></el-input> 道
						</el-form-item>
						<el-form-item class="form-item-unit" prop="choosescore">
							分值 <el-input v-model="form.config.choosescore"></el-input> 分
						</el-form-item>
					</el-col>
				</el-form-item>
				<el-form-item label="试卷总分：" required>
					<el-input v-model="form.total" disabled></el-input>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			var isDigit = (rule, value, callback) => {
				if(!Number.isInteger(value)){
					return callback(new Error('请输入数值'));
				}
			}
			return {
				isInlineMessage: true,
				form: {
					name: '',
					subject: '',
					mode: 'random',
					time: '',
					config:{
						radiocount:'',
						radioscore:'',
						checkcount:'',
						checkscore:'',
						judgecount:'',
						judgescore:'',
						optional:'',
						necessary:'',
						choosescore:'',
					},
					total: '100'
				},
				rules:{
					name:[
						{required: true, message: '请输入试卷名称', trigger: 'change'},
						{min: 2, max: 30, message: '长度在2-30个字符', trigger: 'change'}
					],
					subject:[
						{required: true, message: '请选择科目', trigger:'change'}
					],
					mode: [
						{required: true, message: '请选择组卷方式', trigger:'change'}
					],
					time: [
						{required: true, message: '请输入时长', trigger:'change'},
						{type: 'number', message: '请输入数值', trigger:'change'}
					],
					radiocount: [
						{required: true, message: '请输入题数', trigger:'change'},
						{type: 'number', message: '请输入数值', trigger:'change'}
					],
					radioscore: [
						{required: true, message: '请输入分值', trigger:'change'},
						{type: 'number', message: '请输入数值', trigger:'change'}
					],
					checkcount: [
						{required: true, message: '请输入题数', trigger:'change'},
						{type: 'number', message: '请输入数值', trigger:'change'}
					],
					checkscore: [
						{required: true, message: '请输入分值', trigger:'change'},
						{type: 'number', message: '请输入数值', trigger:'change'}
					],
					judgecount: [
						{required: true, message: '请输入题数', trigger:'change'},
						{type: 'number', message: '请输入数值', trigger:'change'}
					],
					judgescore: [
						{required: true, message: '请输入分值', trigger:'change'},
						{type: 'number', message: '请输入数值', trigger:'change'}
					],
					optional: [
						{required: true, message: '请输入选做题数', trigger:'change'},
						{type: 'number', message: '请输入数值', trigger:'change'}
					],
					necessary: [
						{required: true, message: '请输入必做题数', trigger:'change'},
						{type: 'number', message: '请输入数值', trigger:'change'}
					],
					choosescore: [
						{required: true, message: '请输入分值', trigger:'change'},
						{validator: isDigit, message: '请输入数值2', trigger:'change'}
					],
				}
			}
		},
		methods: {
			onSubmit(formName) {
				this.$refs[formName].validate((isValid) => {
					if(isValid){
						//submit
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
    .panel{
        &>.title{
            padding-right:12px;
        }
    }
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