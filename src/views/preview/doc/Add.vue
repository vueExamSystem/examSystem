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
						<el-select v-model="form.course" placeholder="请选择课程">
							<template v-for="item in defaultInfo.course">
								<el-option :label="item.name" :value="item.id" :key="item.id"></el-option>
							</template>
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
    import {
        getDocAddInfo,
        addDemo,
    } from '../../../api/api';
    import _ from 'lodash';
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
				},
				loading: false,
                defaultInfo: {
                    course: [],
                },
			}
		},
		computed:{
			
		},
		methods: {
			onSubmit(formName, flag) {
				this.$refs[formName].validate((isValid) => {
					if(isValid){
                        this.$confirm('确认添加吗？', '提示', {}).then(() => {
                            let para = _.assign({}, this.form);
                            this.loading = true;
                            addDemo(para).then((res) => {
                                if (res.code !== '0') {
                                    this.$message({
                                        message: res.msg,
                                        type: 'error'
                                    });
                                } else {
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    this.loading = false;
                                    this.$refs['form'].resetFields();
                                    this.$emit('toTable');
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
            },
            getDefaultData() {
                getDocAddInfo({}).then(res => {
                    this.defaultInfo = res.data;
                    this.$forceUpdate();
                });
            },
		},
        mounted() {
            this.getDefaultData();
        }
	}
</script>
<style scoped lang="scss">
    @import '~scss_vars';

</style>