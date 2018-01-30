<template>
<section class="panel" id="queForm">
	<div class="title">
		<span>添加标签</span>
		<div class="pull-right">
			<el-button type="success" @click.native.prevent="handleSubmit" class="el-button-shadow">保存</el-button>
			<el-button type="danger" @click="resetForm('ruleForm')" class="el-button-shadow">取消</el-button>
		</div>
	</div>

	<div class="content">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" inline-message label-width="100px" class="demo-ruleForm"> <el-form-item
			label="标签名称" prop="name"> <el-input v-model="ruleForm.name"></el-input> </el-form-item> 
		</el-form>
	</div>
</section>

</template>

<script>
import {saveTag} from '../../../api/api';
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
                },
			}
		},
		methods: {
            handleSubmit(ev) {
                var _this = this;
                  this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                    var tagParams = { name: this.ruleForm.name};
		            saveTag(tagParams).then(res => {
		              this.logining = false;
		              console.log(res);
		              let { msg, code, data } = res.data;
		              if (code != 0) {
		                this.$message({
		                  message: msg,
		                  type: 'error'
		                });
		              } else {
		                this.$message({
		                  type: 'success',
		                  message: '保存成功',
		                })
		                this.$router.push({ path: '/question/tag' });

		              }
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