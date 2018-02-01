<template>
	<section class="panel" id="queForm">
		<div class="title">
			<span>添加章节</span>
			<div class="pull-right">
				<el-button type="success" @click="onSubmit('ruleForm')" class="el-button-shadow">保存</el-button>
				<el-button type="danger" @click="resetForm('ruleForm')" class="el-button-shadow">取消</el-button>
			</div>
		</div>

		<div class="content">
			<el-form
					:model="ruleForm"
					:rules="rules"
					ref="ruleForm"
					label-width="100px"
					class="demo-ruleForm"
					v-loading="loading"
					:inline-message="isInlineMessage"
			>
				<el-form-item label="所属课程" prop="course">
					<el-select v-model="ruleForm.course" placeholder="请选择所属课程">
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
        addDemo,
    } from '../../../api/api';
    import _ from 'lodash';
    import $ from 'jquery';
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
				loading: false,
                isInlineMessage: true,
			}
		},
		methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('确认添加吗？', '提示', {}).then(() => {
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
                                    $('#tab-list').click();
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