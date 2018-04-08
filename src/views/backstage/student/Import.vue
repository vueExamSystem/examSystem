<template>
	<section class="panel" id="queForm">
		<div class="title">
			<span>批量导入学生（注意：院系班级要存在才能导入成功！）</span>
			<div class="pull-right">
				<el-button type="success" @click="onSubmit('form')" class="el-button-shadow">保存</el-button>
				<el-button type="danger" @click="resetForm('form')" class="el-button-shadow">取消</el-button>
			</div>
		</div>

		<div class="content">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="下载模版:" prop="download">
					<el-button type="primary" icon="iconfont icon-arrow-down">点击下载</el-button>
				</el-form-item>
				<el-form-item label="上传文件:" prop="upload">
					<el-upload
							class="upload-demo"
							:action="uploadSource"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:file-list="ruleForm.upload"
							>
						<el-button class="inline" type="primary" icon="iconfont icon-arrow-up">点击上传</el-button>
						<span class="tip">*支持Excel</span>
					</el-upload>
				</el-form-item>
			</el-form>
		</div>
	</section>

</template>

<script>
	import {
        getCourseList,
	} from '../../../api/api';
	export default {
		data() {
			return {
                ruleForm: {
                    course: '',
                    usage: '0',
                    download: '',
                    upload: [],
                },
                rules: {
                    usage: [
                        { required: true, message: '请选择试题用途', trigger: 'change' }
                    ],
                    upload: [
                        { required: true, message: '请上传文件', trigger: 'change' }
                    ],
                },
				// 上传文件的路径
				uploadSource: 'https://jsonplaceholder.typicode.com/posts/',
				// 默认数据
				usageArr: [{
                    id: '0',
                    name: '练习题',
                },{
                    id: '1',
                    name: '随堂测验',
                },{
                    id: '2',
                    name: '正规考试',
                }],
                courseArr: [],
			}
		},
		methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
			// 获取初始数据
			getDefaultData() {
                getCourseList({}).then((res) => {
                    this.courseArr = res.data;
                    //console.log(res);
                });
			},
			// 上传文件相关
			handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            selectAddFunc() {
                this.selectNum = this.selectNum + 1;
                const str = String.fromCharCode(64 + this.selectNum);
                this.correctRadioArr.push({ id: this.selectNum - 1, name: str });
                this.correctManyArr.push(str);
			}
		},
        computed: {
		},
        mounted() {
            this.getDefaultData();
        }
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';
	#queForm{

		.spec{
			.el-form-item__label{
				line-height: 50px;
			}
		}
	}

</style>