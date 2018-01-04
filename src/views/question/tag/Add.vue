<template>
	<section class="panel" id="queForm">
		<div class="title">
			<span>添加标签</span>
			<div class="pull-right">
				<el-button type="success" @click="onSubmit('form')" class="el-button-shadow">保存</el-button>
				<el-button type="danger" @click="resetForm('form')" class="el-button-shadow">取消</el-button>
			</div>
		</div>

		<div class="content">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="标签名称" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="标签描述" prop="desc">
					<el-input
							type="textarea"
							:rows="3"
							placeholder="请输入内容"
							v-model="ruleForm.desc">
					</el-input>
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
                    name: '',
                    desc: '',
                },
                rules: {
                    name: [
                        { required: true, message: '请填写标签名称', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请填写标签描述', trigger: 'blur' }
                    ],
                },
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
		},
        computed: {
		},
        mounted() {
        }
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';

</style>