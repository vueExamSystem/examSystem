<template>
	<section class="panel" id="queForm">
		<div class="title">
			<span>添加老师</span>
			<div class="pull-right">
				<el-button type="success" @click="onSubmit('form')" class="el-button-shadow">保存</el-button>
				<el-button type="danger" @click="resetForm('form')" class="el-button-shadow">取消</el-button>
			</div>
		</div>

		<div class="content">
			<el-form :model="form" :rules="rules" ref="form" label-width="110px" :inline-message="isInlineMessage" @submit.prevent="onSubmit">
				<el-form-item label="所属院系:" prop="department" :rules="[{required: true, message: '请选择所属院系', trigger: 'change'}]">
					<el-select v-model="form.department" placeholder="请选择所属院系">
						<template v-for="item in departmentArr">
							<el-option :label="item.text" :value="item.value"></el-option>
						</template>
					</el-select>
				</el-form-item>
                <el-form-item label="管理课程：" prop="courses" :rules="[{required: true, message: '请选择课程', trigger: 'change'}]">
                        <el-select v-model="form.courses" placeholder="请选择课程" multiple>
                            <template v-for="item in courseArr">
                                <el-option :label="item.text" :value="item.value" :key="item.value"></el-option>
                            </template>
                        </el-select>
                    </el-form-item>
				<el-form-item label="老师姓名:" prop="name" :rules="[{required: true, message: '请输入老师姓名', trigger: 'blur'}]">
					<el-input v-model="form.name" placeholder="请输入老师姓名"></el-input>
				</el-form-item>
				<el-form-item label="老师性别:" prop="sex" :rules="[{required: true, message: '请选择老师性别', trigger: 'change'}]">
					<el-select v-model="form.sex" placeholder="请选择老师性别">
						<el-option label="男" value="1"></el-option>
						<el-option label="女" value="0"></el-option>
					</el-select>
				</el-form-item>
                <el-form-item label="老师邮箱:" prop="email">
                    <el-input v-model="form.email" placeholder="请输入老师姓名"></el-input>
                </el-form-item>
                 <el-form-item label="手机号码:" prop="phone">
                    <el-input v-model="form.phone" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="入职日期:" prop="signTime" >
                  <el-date-picker type="datetime" placeholder="请选择入职日期" format="yyyy/MM/dd" value-format="yyyy/MM/dd" 
                  v-model="form.signTime" style="width: 240px;"> 
                  </el-date-picker>
                </el-form-item>
				<el-form-item label="登录帐号:" prop="account" :rules="[{required: true, message: '请输入登录帐号', trigger: 'blur'}]">
					<el-input v-model="form.account" placeholder="请输入登录帐号"></el-input>
				</el-form-item>
				<el-form-item label="初始密码:" prop="password" :rules="[{required: true, message: '请输入初始密码', trigger: 'blur'}]">
					<el-input v-model="form.password" placeholder="请输入初始密码"></el-input>
				</el-form-item>
			</el-form>
		</div>
	</section>

</template>

<script>
	import {
        getDepartmentList,
		getClassList,
        getAddStuFilter
       
	} from '../../../api/api';
    import {addTeacher} from '../../../api/api';
	export default {
		data() {
			return {
                form: {
                    grade: '',
                    department: '',
                    class: '',
                    courses:'',
                    studentNo: '',
                    name: '',
                    sex: '',
                    account: '',
					password: '',
                },
                rules: {},
                isInlineMessage: true,
				// 默认数据
                gradeArr: [{
                    id: '0',
					name: '14级',
				},{
                    id: '1',
					name: '15级',
				},{
                    id: '2',
					name: '16级',
				},{
                    id: '3',
					name: '17级',
				}],
                classArr: [],
				departmentArr: [],
                courseArr:[]
			}
		},
		methods: {
            onSubmit(formName) {
                //console.log(formName);

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                         var stuParams = {
                            collegeId:this.form.department,
                            courses:this.form.courses,
                            userName:this.form.name,
                            userAccount: this.form.account,
                            sex: this.form.sex ,
                            password:this.form.password,
                            email:this.form.email,
                            phone:this.form.phone,
                            signTime:this.form.signTime==null||this.form.signTime==''?null:this.form.signTime.replace(/-/g,'/')
                        };
                        //console.log('stuParams ',stuParams);
                        this.$confirm('确认添加吗？', '提示', {}).then(() => {
                            this.loading = true;
                            addTeacher(stuParams).then((res) => {
                                if (res.code == 0) {
                                     this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    this.loading = false;
                                    this.$refs['form'].resetFields();
                                    this.$emit('toTable');
                                } else {
                                    this.$message({
                                        message: res.msg,
                                        type: 'error'
                                    });
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
                // this.$refs[formName].resetFields();
				console.log('cancel');
            },
			// 获取初始数据
			getDefaultData() {
                getAddStuFilter({}).then((res) => {
                   //console.log('getAddStuFilter',res);
                   this.departmentArr = res.data.colleges;
                   this.classArr=res.data.groups;
                   this.gradeArr=res.data.grades;
                   this.courseArr=res.data.courses;
                });
			},
			// 上传文件相关
            handleRemoveContent(file, fileList) {
                console.log(file, fileList);
            },
            handlePreviewContent(file) {
                console.log(file);
            },
			handleRemove(file, fileList, type) {
                console.log(file, fileList, type);
            },
            handlePreview(file, type) {
                console.log(file, type);
            },
			// 添加选项
            selectAddFunc() {
                this.selectNum = this.selectNum + 1;
                const str = String.fromCharCode(64 + this.selectNum);
                this.correctRadioArr.push({ id: this.selectNum - 1, name: str });
                this.correctManyArr.push(str);
                this.rules = this.getRuleArr(this.selectNum);
			},
            // 删除选项
            delSelection(index) {
                if (this.selectNum === 2) {
                    return;
				}
                console.log('del selection', index);
                this.selectNum = this.selectNum - 1;
                this.correctManyArr = this.getCorrectArrByNum(this.selectNum, 'many');
                this.correctRadioArr = this.getCorrectArrByNum(this.selectNum, 'radio');
                this.form.selection.splice(index, 1);
                this.form.selectionPic.splice(index, 1);
                this.rules = this.getRuleArr(this.selectNum);
			},
			getCorrectArrByNum(num, type) {
                const arr = [];
                for(let i= 0;i< num;i++){
                    const str = String.fromCharCode(65 + i);
                    if (type === 'radio') {
                        arr.push({id: i, name: str});
					} else {
                        arr.push(str);
					}
				}
				return arr;
			},
            getRuleArr(num) {
                const arr = [];
                for (let i = 1; i< num; i++) {
                    const str = String.fromCharCode(65 + i);
                    arr[`selection${str}`] = [
                            { required: true, message: `请输入试题选项${str}`, trigger: 'blur' }
                        ];
                }
                const result = {
                    ...arr,

                };
                console.log('rules', result);
                return result;
            }
		},
        computed: {
            isShowSelectionC() {
                return this.selectNum > 2;
            },
            isShowSelectionD() {
                return this.selectNum > 3;
            },
            isShowSelectionAdd() {
                return !(this.selectNum > 3 && this.form.type === '0');
			},
            isRadio() {
                return this.form.type === '0';
			},
			isCheckbox() {
                return this.form.type === '1';
			},
            isJudgment() {
                return this.form.type === '2';
            },
		},
        mounted() {
            this.getDefaultData();
        }
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';
	#queForm{
		.spec{
			.el-form-item__label{
				line-height: 50px;
			}
		}
	}

</style>