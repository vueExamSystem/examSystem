<template>
	<section class="panel" id="scoreForm">
		<div class="title">
			<span>设置成绩等级</span>
			<div class="pull-right">
				<el-button type="success" @click="onSubmit('form')" class="el-button-shadow">保存</el-button>
				<el-button type="danger" @click="resetForm('form')" class="el-button-shadow">取消</el-button>
			</div>
		</div>

		<div class="content">
			<el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="优秀" prop="usage">
					>= 总分
					<el-input v-model="form.excellent"></el-input>
					%
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
                form: {
                    excellent: '',
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
            submitForm(formName) {
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
                    console.log(res);
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
	#scoreForm{
		.panel {
			.content {
				&>form {
					.el-form-item__label{
						text-align: left;
					}
				}
			}

		}
	}

</style>