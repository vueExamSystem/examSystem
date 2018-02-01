<template>
	<section class="panel" id="queForm">
		<div class="title">
			<span>导入试题</span>
			<div class="pull-right">
				<el-button type="success" @click="onSubmit('ruleForm')" class="el-button-shadow">保存</el-button>
				<el-button type="danger" @click="resetForm('ruleForm')" class="el-button-shadow">重置</el-button>
			</div>
		</div>

		<div class="content">
			<el-form :model="ruleForm"
					 v-loading="loading"
					 :rules="rules" ref="ruleForm"
					 :inline-message="isInlineMessage" label-width="100px" class="demo-ruleForm">
				<el-form-item label="试题用途" prop="usage">
					<el-select v-model="ruleForm.usage" multiple placeholder="请选择试题用途">
						<el-option
								v-for="item in usageArr"
								:label="item.name"
								:value="item.id"
								:key="item.id"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="选择课程" prop="course">
					<el-select v-model="ruleForm.type" placeholder="请选择课程">
						<el-option v-for="item in courseArr" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="下载模版" prop="download">
					<el-button type="primary" icon="iconfont icon-arrow-down">点击下载</el-button>
				</el-form-item>
				<el-form-item label="上传文件" prop="upload">
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
		addDemo,
	} from '../../../api/api';
	import _ from 'lodash';
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
                isInlineMessage: true,
                loading: false,
			}
		},
		methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('确认导入吗？', '提示', {}).then(() => {
                            let para = _.assign({}, this.ruleForm);
                            console.log(para);
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
                                    this.$refs['ruleForm'].resetFields();
                                    this.$emit('toTable');
                                }

                            });
                        });
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
                    this.courseArr = res;
                });
			},
			// 上传文件相关
			handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
                console.log(this.ruleForm);
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