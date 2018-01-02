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
					<el-form-item label="资料名称：" prop="name">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="选择课程：" prop="course"> 
						<el-select v-model="form.subject" placeholder="请选择课程">
							<el-option label="大学物理" value="hysics"></el-option>
							<el-option label="高等数学" value="mathematics"></el-option>
							<el-option label="大学英语" value="english"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="上传文件：" prop="upload" style="position:relative;">
						<span class="text-primary" style="position:absolute;top: 0px;left: 105px;">*支持Jpg,Png,Mp4</span>
						<el-upload class="upload-demo"
							:action="uploadSource"
							:on-preview="handlePreviewContent"
							:on-remove="handleRemoveContent"
							:file-list="form.contentPic"
							list-type="picture">
							<el-button type="primary" icon="iconfont icon-plus">添加照片</el-button>
						</el-upload>
					</el-form-item>
					<el-form-item label="" prop="content">
						<el-input
								type="textarea"
								:rows="3"
								placeholder="请输入内容"
								v-model="form.content">
						</el-input>
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
				// 上传文件的路径
				uploadSource: 'https://jsonplaceholder.typicode.com/posts/',
				form: {
					name: '',
					course: '',
					upload: '',
					content: '',
				},
				rules:{
					name:[
						{required: true, message: '请输入资料名称', trigger: 'blur'},
						{min: 2, max: 30, message: '长度在2-30个字符', trigger: 'blur'}
					],
					course:[
						{required: true, message: '请选择课程', trigger:'change'}
					],
					upload: [
						{required: true, message: '请上传文件', trigger:'change'}
					],
                    content: [
                        { required: true, message: 'I am not a textarea!', trigger: 'blur' }
                    ]
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
			},
			// 上传文件相关
            handleRemoveContent(file, fileList) {
                console.log(file, fileList);
            },
            handlePreviewContent(file) {
                console.log(file);
            },
			handleRemove(file, fileList, type) {
                console.log(file, fileList, type);
            },
            handlePreview(file, type) {
                console.log(file, type);
            }
		}
	}
</script>
<style scoped lang="scss">
    @import '~scss_vars';

</style>