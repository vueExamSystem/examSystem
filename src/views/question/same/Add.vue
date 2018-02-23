<template>
	<section class="panel" id="queForm">
		<div class="title">
			<span>添加题组</span>
			<div class="pull-right">
				<el-button type="success" @click="onSubmit('ruleForm')" class="el-button-shadow">保存</el-button>
				<el-button type="danger" @click="resetForm('ruleForm')" class="el-button-shadow">取消</el-button>
			</div>
		</div>

		<div class="content">
			<el-form :model="ruleForm"
					 v-loading="loading"
					 :inline-message="isInlineMessage"
					 :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="题组名称" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
                <el-form-item label="试题类型" prop="qustionType">
                    <el-select v-model="ruleForm.qustionType" placeholder="请选择试题类型">
                        <el-option
                                v-for="item in qustionTypeArr"
                                :label="item.text"
                                :value="item.value"
                                :key="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
				<el-form-item label="所属课程" prop="course">
					<el-select
							v-model="ruleForm.course"
							placeholder="请选择所属课程"
							@change="changeCourse"
					>
						<el-option
								v-for="item in courseArr"
								:label="item.text"
								:value="item.value"
								:key="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所属章节" prop="chapter">
					<el-select v-model="ruleForm.chapter" placeholder="请选择所属章节">
						<el-option
								v-for="item in chapterArr"
								:label="item.text"
								:value="item.value"
								:key="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="题组描述" prop="desc">
					<el-button type="primary" icon="iconfont icon-plus" @chick="addQuestion">添加试题</el-button>
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
        getSameFilter,
		addDemo,
    } from '../../../api/api';
    import _ from 'lodash';
	export default {
		data() {
			return {
                ruleForm: {
                    name: '',
                    desc: '',
					chapter: '',
                    course: '',
                    qustionType:''
                },
                rules: {
                    name: [
                        { required: true, message: '请填写题组名称', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请填写题组描述', trigger: 'blur' }
                    ],
                    qustionType: [
                        { required: true, message: '请选择试题类型', trigger: 'change' }
                    ],
                    course: [
                        { required: true, message: '请选择所属课程', trigger: 'change' }
                    ],
                    chapter: [
                        { required: true, message: '请选择所属章节', trigger: 'change' }
                    ],
                },

                qustionTypeArr:[],
                courseArr: [],
                chapterArr: [],
                chapterAllArr: [],
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
                                if (res.code !== 0) {
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
               getSameFilter({}).then((res) => {
                    console.log('getSameFilter',res);
                    this.courseArr = res.data[0].children;
                    //todo所有章节数据 value text courseid为课程筛选id
                    this.chapterArr=res.data[1].children;
                    this.chapterAllArr = res.data[1].children;
                    this.qustionTypeArr=res.data[2].children;
                });
            },
            changeCourse(val) {
                this.chapterArr = this.chapterAllArr.filter(item => { return item.courseid === val });
                this.ruleForm.chapter = '';
			},
			// 添加试题事件
            addQuestion() {
                console.log();
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