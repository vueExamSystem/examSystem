<template>
	<section>
		<div class="panel" v-show="!isAddClass">
			<div class="title">
				<span>发布考试</span>
				<div class="pull-right">
					<el-button type="success" @click="onSubmit('form')" class="el-button-shadow">保存</el-button>
					<el-button type="danger" @click="resetForm('form')" class="el-button-shadow">重置</el-button>
				</div>
			</div>
			<div class="content">
				<el-form ref="form" :model="form" :rules="rules" v-loading="loading"
						 label-width="110px" :inline-message="isInlineMessage" @submit.prevent="onSubmit('form')">
					<el-form-item label="考试名称：" prop="name">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="选择科目：" prop="subject"> 
						<el-select v-model="form.subject" placeholder="请选择科目">
							<template v-for="item in defaultInfo.subjects">
								<el-option :label="item.name" :value="item.id" :key="item.id"></el-option>
							</template>
						</el-select>
					</el-form-item>
					<el-form-item label="选择试卷：" prop="paper"> 
						<el-select v-model="form.paper" placeholder="请选择试卷">
							<template v-for="item in defaultInfo.test">
								<el-option :label="item.name" :value="item.id" :key="item.id"></el-option>
							</template>
						</el-select>
					</el-form-item>
					<el-form-item label="监考老师：" prop="listeners">
						<el-select v-model="form.listeners" placeholder="请选择监考老师" multiple>
							<template v-for="item in defaultInfo.listeners">
								<el-option :label="item.name" :value="item.id" :key="item.id"></el-option>
							</template>
						</el-select>
					</el-form-item>
					<el-form-item label="开始时间：" prop="beginTime">
						<el-date-picker type="datetime" placeholder="请选择开始时间" format="yyyy/MM/dd HH:mm" v-model="form.beginTime" style="width: 240px;"></el-date-picker>
					</el-form-item>
					<el-form-item label="结束时间：" prop="endTime">
						<el-date-picker type="datetime" placeholder="请选择结束时间" format="yyyy/MM/dd HH:mm" v-model="form.endTime" style="width: 240px;"></el-date-picker>
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
        getPublishAddInfo,
        addExam,
        updateExam,
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
					subject: '',
					paper: '',
					grade: '',
					department: '',
					class: '',
					listeners: '',
					beginTime: '',
					endTime: ''
				}, this.formObj),
				rules:{
					name:[
						{required: true, message: '请输入预习名称', trigger: 'blur'},
						{min: 2, max: 30, message: '长度在2-30个字符', trigger: 'blur'}
					],
					subject: [
						{required: true, message: '请选择科目', trigger:'change'}
					],
					paper:[
						{required: true, message: '请选择试卷', trigger:'change'}
					],
					listeners:{required:true, message: '请选择监考老师', trigger:'change'},
					beginTime:{required:true, message: '请选择开始时间', trigger:'change'},
					endTime:{required:true, message: '请选择结束时间', trigger:'change'}
				},
                loading: false,
                defaultInfo: {
                	subjects: [],
                    test: [],
                    listeners: [],
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
                    if (isValid) {
                        this.$confirm('确认发布吗？', '提示', {}).then(() => {
                            let para = _.assign({}, this.form);
                            this.loading = true;
                            if(this.form.id === ''){//添加
								addExam(para).then((res) => {
	                                if (res.code !== '0') {
	                                    this.$message({
	                                        message: res.msg,
	                                        type: 'error'
	                                    });
	                                } else {
	                                    this.$message({
	                                        message: '发布成功',
	                                        type: 'success'
	                                    });
	                                    this.loading = false;
	                                    this.$refs['form'].resetFields();

	                                    if(flag && flag == 'next'){
											this.showNext(res.data.id);
										}
	                                }
	                            });
                            }else{//更新
                            	updateExam(para).then((res) => {
	                                if (res.code !== '0') {
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
                getPublishAddInfo({}).then(res => {
                    this.defaultInfo = res.data;
                    console.log(res);
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