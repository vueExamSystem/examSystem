<template>
	<section class="panel">
		<div class="title">
			<span>添加试题</span>
		</div>

		<div class="content">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

				<el-form-item label="试题类型" prop="type">
					<el-select v-model="ruleForm.type" placeholder="请选择试题类型">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="来源" prop="source">
					<el-input v-model="ruleForm.source"></el-input>
				</el-form-item>
			</el-form>
		</div>
	</section>

</template>

<script>
	export default {
		data() {
			return {
                ruleForm: {
                    type: '',
                    usage: '',
                    subject: '',
                    chapter: '',
                    department: '',
                    content: [],
                    selection: '',
                    correctOption: '',
					source: '',
                    testSites: '', // 考点
                    keywords: '',
                    analysis: '', // 解析
                },
                rules: {
                    type: [
                        { required: true, message: '请选择试题类型', trigger: 'change' }
                    ],
                    usage: [
                        { required: true, message: '请选择试题用途', trigger: 'change' }
                    ],
                    subject: [
                        { required: true, message: '请选择科目', trigger: 'change' }
                    ],
                    chapter: [
                        { required: true, message: '请选择章节', trigger: 'change' }
                    ],
                    department: [
                        { required: false, message: '请选择题组', trigger: 'change' }
                    ],
                    content: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                }
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
            }
		}
	}

</script>