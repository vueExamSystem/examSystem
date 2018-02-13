<template>
	<section>
		<div class="panel">
			<div class="title">
				<span>发布测验</span>
				<div class="pull-right">
					<el-button type="success" @click="onSubmit('form')" class="el-button-shadow">保存</el-button>
					<el-button type="danger" @click="resetForm('form')" class="el-button-shadow">重置</el-button>
				</div>
			</div>
			<div class="content">
				<el-form ref="form" :model="form" :rules="rules" v-loading="loading"
						 label-width="110px" :inline-message="isInlineMessage" @submit.prevent="onSubmit">
					<el-form-item label="考试名称：" prop="name">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="选择测验：" prop="test">
						<el-select v-model="form.test" placeholder="请选择测验">
							<template v-for="item in defaultInfo.test">
								<el-option :label="item.name" :value="item.id" :key="item.id"></el-option>
							</template>
						</el-select>
					</el-form-item>
					<el-form-item label="测试年级：" prop="grade">
						<el-select v-model="form.grade" placeholder="请选择测试年级">
							<template v-for="item in defaultInfo.grade">
								<el-option :label="item.name" :value="item.id" :key="item.id"></el-option>
							</template>
						</el-select>
					</el-form-item>
					<el-form-item label="测试院系：" prop="department">
						<el-select v-model="form.department" placeholder="请选择测试院系">
							<template v-for="item in defaultInfo.department">
								<el-option :label="item.name" :value="item.id" :key="item.id"></el-option>
							</template>
						</el-select>
					</el-form-item>
					<el-form-item label="测试班级：" prop="class">
						<el-select v-model="form.class" placeholder="请选择测试班级">
							<template v-for="item in defaultInfo.class">
								<el-option :label="item.name" :value="item.id" :key="item.id"></el-option>
							</template>
						</el-select>
					</el-form-item>
					<el-form-item label="监考老师：" prop="listeners">
						<el-select v-model="form.listeners" placeholder="请选择监考老师">
							<template v-for="item in defaultInfo.listeners">
								<el-option :label="item.name" :value="item.id" :key="item.id"></el-option>
							</template>
						</el-select>
					</el-form-item>
					<el-form-item label="开始时间：" prop="begintime">
						<el-date-picker type="datetime" placeholder="请选择开始时间" format="yyyy/MM/dd HH:mm" v-model="form.begintime" style="width: 240px;"></el-date-picker>
					</el-form-item>
					<el-form-item label="结束时间：" prop="endtime">
						<el-date-picker type="datetime" placeholder="请选择结束时间" format="yyyy/MM/dd HH:mm" v-model="form.endtime" style="width: 240px;"></el-date-picker>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</section>
</template>
<script>
    import {
        getPublishAddInfo,
        addDemo,
    } from '../../../api/api';
    import _ from 'lodash';
	export default {
		data() {
			return {
				isInlineMessage: true,
				form: {
					name: '',
					test: '',
					grade: '',
					department: '',
					class: '',
					listeners: '',
					begintime: '',
					endtime: ''
				},
				rules:{
					name:[
						{required: true, message: '请输入预习名称', trigger: 'blur'},
						{min: 2, max: 30, message: '长度在2-30个字符', trigger: 'blur'}
					],
					test:[
						{required: true, message: '请选择测验', trigger:'change'}
					],
					grade: [
						{required: true, message: '请选择测验年级', trigger:'change'}
					],
					department: [
						{required: true, message: '请选择测验院系', trigger:'change'}
					],
					class: [
						{required: true, message: '请选择测验班级', trigger:'change'}
					],
					listeners:{required:true, message: '请选择监考老师', trigger:'change'},
					begintime:{required:true, message: '请选择开始时间', trigger:'change'},
					endtime:{required:true, message: '请选择结束时间', trigger:'change'}
				},
                loading: false,
                defaultInfo: {
                    test: [],
                    listeners: [],
                    grade: [],
                    department: [],
                    class: [],
                },
			}
		},
		computed:{
			
		},
		methods: {
            onSubmit(formName, flag) {
                this.$refs[formName].validate((isValid) => {
                    if (isValid) {
                        this.$confirm('确认发布吗？', '提示', {}).then(() => {
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
                                        message: '提交成功',
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
                getPublishAddInfo({}).then(res => {
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
<style scoped lang="scss">
    @import '~scss_vars';
    
</style>