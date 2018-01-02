<template>
	<section class="panel" id="queForm">
		<div class="title">
			<span>添加章节</span>
			<div class="pull-right">
				<el-button type="success" @click="onSubmit('form')" class="el-button-shadow">保存</el-button>
				<el-button type="danger" @click="resetForm('form')" class="el-button-shadow">重置</el-button>
			</div>
		</div>

		<div class="content">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="所属课程" prop="usage">
					<el-select v-model="ruleForm.course" multiple placeholder="请选择试题用途">
						<el-option
								v-for="item in courseArr"
								:label="item.name"
								:value="item.id"
								:key="item.id"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="章节名称" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="章节描述" prop="desc">
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
    import {
        getCourseList,
    } from '../../../api/api';
	export default {
		data() {
			return {
                ruleForm: {
                    name: '',
                    desc: '',
                    course: '',
                },
                rules: {
                    name: [
                        { required: true, message: '请填写章节名称', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请填写章节描述', trigger: 'blur' }
                    ],
                    course: [
                        { required: true, message: '请选择所属课程', trigger: 'change' }
                    ],
                },
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

</style>