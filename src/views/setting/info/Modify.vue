<template>
	<section class="panel" id="queForm">
		<div class="title">
			<span>添加标签</span>
			<div class="pull-right">
				<el-button type="success" @click="submitForm('ruleForm')" class="el-button-shadow">保存</el-button>
				<el-button type="danger" @click="resetForm('ruleForm')" class="el-button-shadow">重置</el-button>
			</div>
		</div>

		<div class="content" v-loading="maskLoading">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" :inline-message="isInlineMessage">
				<el-form-item label="请输入原密码" prop="oldPwd">
					<el-input placeholder="请输入原密码" type="password" v-model="ruleForm.oldPwd"></el-input>
				</el-form-item>
				<el-form-item label="请输入新密码" prop="newPwd">
					<el-input placeholder="请输入新密码" type="password" v-model="ruleForm.newPwd"></el-input>
				</el-form-item>
				<el-form-item label="请确认新密码" prop="againPwd">
					<el-input placeholder="请确认新密码" type="password" v-model="ruleForm.againPwd"></el-input>
				</el-form-item>
			</el-form>
		</div>
	</section>

</template>

<script>
	import { updatePassword } from '../../../api/api';
	export default {
		data() {
			var validateAgainPwd = (rule, value, callback) => {
		        if (value === '') {
		            callback(new Error('请确认新密码'));
		        } else if (value !== this.ruleForm.newPwd) {
		            callback(new Error('两次密码输入不一致!'));
		        } else {
		            callback();
		        }
		    };
			return {
				isInlineMessage: true,
				maskLoading: false,
                ruleForm: {
                    oldPwd: '',
					newPwd: '',
					againPwd: '',
                },
                rules: {
                    oldPwd: [
                        { required: true, message: '请输入原密码', trigger: 'blur' }
                    ],
                    newPwd: [
                        { required: true, message: '请输入新密码', trigger: 'blur' }
                    ],
                    againPwd: [
                        { validator: validateAgainPwd, trigger: 'blur' }
                    ]
                },
			}
		},
		methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.maskLoading = true;
						var params = {
							oldPwd: this.ruleForm.oldPwd,
							newPwd: this.ruleForm.againPwd,
							againPwd: this.ruleForm.againPwd
						};
						updatePassword(params).then(res => {
							if(res.code == '0'){
						        this.$message({
	                                message: '密码修改成功!',
	                                type: 'success'
	                            });
	                            this.resetForm('ruleForm');
							}else{
								this.$message({
	                                message: res.msg,
	                                type: 'error'
	                            });
							}
							this.maskLoading = false;
						});
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