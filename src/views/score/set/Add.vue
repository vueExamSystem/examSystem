<template>
	<section id="scoreStudentAdd">
		<div class="panel">
			<div class="title">
				<span>设置最终成绩各部分所占比重</span>
				<div class="pull-right">
					<el-button type="success" @click="onSubmit('form')" class="el-button-shadow">保存</el-button>
					<el-button type="danger" @click="resetForm('form')" class="el-button-shadow">重置</el-button>
				</div>
			</div>
			<div class="content">
				<el-form ref="form" :model="form" :rules="rules" v-loading="loading"
						 label-width="110px" :inline-message="isInlineMessage" @submit.prevent="onSubmit">
					<el-form-item label="选择年级：" prop="grade">
						<el-select v-model="form.test" placeholder="请选择年级">
							<template v-for="item in defaultInfo.gradeArr">
								<el-option :label="item.name" :value="item.id" :key="item.id"></el-option>
							</template>
						</el-select>
					</el-form-item>
					<el-form-item label="选择课程：" prop="course">
						<el-select v-model="form.grade" placeholder="请选择课程">
							<template v-for="item in defaultInfo.courseArr">
								<el-option :label="item.name" :value="item.id" :key="item.id"></el-option>
							</template>
						</el-select>
					</el-form-item>
					<el-form-item label="预习分数：" prop="prepare">
						<el-input class="point" v-model="form.name"></el-input> %
					</el-form-item>
					<el-form-item label="测验分数：" prop="test">
						<el-input class="point" v-model="form.name"></el-input> %
					</el-form-item>
					<el-form-item label="考试分数：" prop="exam">
						<el-input class="point" v-model="form.name"></el-input> %
					</el-form-item>
				</el-form>
			</div>
		</div>
	</section>
</template>
<script>
    import {
        getScoreAddInfo,
        addDemo,
    } from '../../../api/api';
    import _ from 'lodash';
	export default {
		data() {
            var integerPattern = '^\\d+$';//>=0整数正则
			return {
				isInlineMessage: true,
				form: {
                    course: '',
                    grade: '',
                    prepare: '',
                    test: '',
                    exam: '',
				},
				rules:{
                    course:[
						{required: true, message: '请选择课程', trigger:'change'}
					],
					grade: [
						{required: true, message: '请选择年级', trigger:'change'}
					],
                    prepare: [
                        {required: true, message: '请输入预习分数', trigger:'change'},
                        {pattern: integerPattern, message: '请输入整数', trigger: 'change'}
                    ],
                    test: [
                        {required: true, message: '请输入测验分数', trigger:'change'},
                        {pattern: integerPattern, message: '请输入整数', trigger: 'change'}
                    ],
                    exam: [
                        {required: true, message: '请输入考试分数', trigger:'change'},
                        {pattern: integerPattern, message: '请输入整数', trigger: 'change'}
                    ],
				},
                loading: false,
                defaultInfo: {
                    courseArr: [],
                    gradeArr: [],
                },
			}
		},
		computed:{
			
		},
		methods: {
            onSubmit(formName, flag) {
                this.$refs[formName].validate((isValid) => {
                    if (isValid) {
                        this.$confirm('确认保存吗？', '提示', {}).then(() => {
                            let para = _.assign({}, this.form);
                            this.loading = true;
                            addDemo(para).then((res) => {
                                if (res.code !== '0') {
                                    this.$message({
                                        message: res.msg,
                                        type: 'error'
                                    });
                                } else {
                                    this.$message({
                                        message: '保存成功',
                                        type: 'success'
                                    });
                                    this.loading = false;
                                    this.$refs['form'].resetFields();
                                    // this.$emit('toTable');
                                }

                            });
                        });
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            getDefaultData() {
                getScoreAddInfo({}).then(res => {
                    this.defaultInfo = res.data;
                    console.log(res);
                    this.$forceUpdate();
                });
            },
        },
        mounted() {
            this.getDefaultData();
        }
	}
</script>
<style lang="scss">
    @import '~scss_vars';

    #scoreStudentAdd{
		.point{
			width: 80px;
		}
	}
</style>