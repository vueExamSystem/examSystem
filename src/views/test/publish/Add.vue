<template>
	<section>
		<div class="panel" v-show="!isAddClass">
			<div class="title">
				<span>发布测验</span>
				<div class="pull-right">
					<el-button type="success" @click="onSubmit('form')" class="el-button-shadow">保存</el-button>
					<el-button type="danger" @click="resetForm('form')" class="el-button-shadow">重置</el-button>
				</div>
			</div>
			<div class="content">
				<el-form ref="form" :model="form" :rules="rules" v-loading="loading"
						 label-width="110px" :inline-message="isInlineMessage" @submit.prevent="onSubmit('form')">
					<el-form-item label="测验名称：" prop="name">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="选择课程：" prop="course"> 
						<el-select v-model="form.course" placeholder="请选择课程">
							<template v-for="item in defaultInfo.courses">
								<el-option :label="item.text" :value="item.value" :key="item.value"></el-option>
							</template>
						</el-select>
					</el-form-item>
					<el-form-item label="选择试卷：" prop="paper"> 
						<el-select v-model="form.paper" placeholder="请选择试卷">
							<template v-for="item in defaultInfo.papers">
								<el-option :label="item.text" :value="item.value" :key="item.value"></el-option>
							</template>
						</el-select>
					</el-form-item>
				<!-- 	<el-form-item label="监考老师：" prop="teachers">
						<el-select v-model="form.teacher" placeholder="请选择监考老师" multiple>
							<template v-for="item in defaultInfo.teachers">
								<el-option :label="item.text" :value="item.value" :key="item.value"></el-option>
							</template>
						</el-select>
					</el-form-item> -->
					<el-form-item label="开始时间：" prop="beginTime">
						<el-date-picker type="datetime" placeholder="请选择开始时间" format="yyyy/MM/dd HH:mm:ss" value-format="yyyy/MM/dd HH:mm:ss" v-model="form.beginTime" style="width: 240px;"></el-date-picker>
					</el-form-item>
					<el-form-item label="结束时间：" prop="endTime">
						<el-date-picker type="datetime" placeholder="请选择结束时间" format="yyyy/MM/dd HH:mm:ss" value-format="yyyy/MM/dd HH:mm:ss" v-model="form.endTime" style="width: 240px;"></el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="success" class="el-button-shadow" @click="onSubmit('form', 'next')">下一步</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<div v-if="isAddClass">
			<add-classes :id="examId" @close="hideNext"></add-classes>
		</div>
	</section>
</template>
<script>
    import {
        getLessonQuizFilter,
        addLessonQuiz,
        updateLessonQuiz,
    } from '../../../api/api';
    import AddClasses from './AddClasses.vue'
    import _ from 'lodash';
	export default {
	    props: {
            formObj: {
                required: false,
                type: Object,
            },
		},
		data() {
			return {
				isInlineMessage: true,
				form: _.assign({
					id: '',
					name: '',
					course: '',
					paper: '',
					grade: '',
					department: '',
					class: '',
					teacher: '',
					beginTime: '',
					endTime: ''
				}, this.formObj),
				rules:{
					name:[
						{required: true, message: '请输入随堂测验名称', trigger: 'blur'},
						{min: 2, max: 30, message: '长度在2-30个字符', trigger: 'blur'}
					],
					subject: [
						{required: true, message: '请选择科目', trigger:'change'}
					],
					paper:[
						{required: true, message: '请选择试卷', trigger:'change'}
					],
					teacher:{required:true, message: '请选择监考老师', trigger:'change'},
					beginTime:{required:true, message: '请选择开始时间', trigger:'change'},
					endTime:{required:true, message: '请选择结束时间', trigger:'change'}
				},
                loading: false,
                defaultInfo: {
                	courses: [],
                    papers: [],
                    //teachers: [],
                    grade: [],
                    department: [],
                    class: [],
                },
                isAddClass: false,
                examId: ''
			}
		},
		components:{
			AddClasses
		},
		methods: {
            onSubmit(formName, flag) {
                this.$refs[formName].validate((isValid) => {
                	let para =_.assign({}, this.form);
                	let addPara={
                		name:this.form.name,
                		paperType:1,
                		courseId:this.form.course,
                		paperId:this.form.paper,
                		beginTime:this.form.beginTime,
                		endTime:this.form.endTime,
                		//dutyTeachers:this.form.teacher.join(','),
                	};
                	let updatePara={
                		id:this.form.id,
                		name:this.form.name,
                		paperId:this.form.paper,
                		beginTime:this.form.beginTime.replace(/-/g,'/'),
                		endTime:this.form.endTime.replace(/-/g,'/'),
                		//dutyTeachers:this.form.teacher.join(','),
                	};
                	//console.log('updatePara111',updatePara);
                    if (isValid) {
                        this.$confirm('确认添加考试吗？', '提示', {}).then(() => {     
                            this.loading = true;
                            if(this.form.id === ''){
                            	//添加
								addLessonQuiz(addPara).then((res) => {
	                                if (res.code !== 0) {
	                                    this.$message({
	                                        message: res.msg,
	                                        type: 'error'
	                                    });
	                                } else {
	                                    this.$message({
	                                        message: '添加考试成功',
	                                        type: 'success'
	                                    });
	                                    this.loading = false;
	                                    this.$refs['form'].resetFields();

	                                    if(flag && flag == 'next'){
											this.showNext(res.data.id);
										}
	                                }
	                            });
                            }else{
                            	//更新
                            	//console.log('updatePara',updatePara);
                            	updateLessonQuiz(updatePara).then((res) => {
	                                if (res.code !== 0) {
	                                    this.$message({
	                                        message: res.msg,
	                                        type: 'error'
	                                    });
	                                } else {
	                                    this.$message({
	                                        message: '更新成功',
	                                        type: 'success'
	                                    });
	                                    this.loading = false;
	                                    this.$refs['form'].resetFields();
	                                    this.$emit('toTable');
	                                }

	                            });
                            }
                            
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

                getLessonQuizFilter({}).then(res => {
                	//console.log('getExamFilter',res);
                    this.defaultInfo = res.data;
                  
                    this.$forceUpdate();
                });
            },
            showNext(id){//前往添加考试班级页
            	this.isAddClass = true;
            	this.examId = id;
            },
            hideNext(){
            	this.isAddClass = false;
            	this.examId = '';
            }
        },
        mounted() {
            this.getDefaultData();

        },
        beforeDestroy() {
            this.resetForm('form');
		},
	}
</script>
<style scoped lang="scss">
    @import '~scss_vars';
    
</style>