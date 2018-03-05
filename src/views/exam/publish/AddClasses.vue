<template>
	<section>
		<div class="panel">
			<div class="title">
				<span>考试班级列表（共{{totalClass}}个班级，{{totalExammer}}个考生）</span>
				<el-button type="primary" @click="onAdd" class="el-button-shadow">添加班级</el-button>
				<div class="pull-right">
					<el-button type="success" @click="onSave" class="el-button-shadow">保存</el-button>
					<el-button type="danger" @click="close" class="el-button-shadow">关闭</el-button>
				</div>
			</div>
			<div class="content">
				<el-table :data="rows" highlight-current-row v-loading="listLoading" style="width: 100%;" fit>
                    <el-table-column type="index" label="序号" min-width="100">
                    </el-table-column>
                    <el-table-column type="department" label="院系" min-width="120">
                    	<template scope="scope">
                    		<span>{{scope.row.department.name}}</span>
                    	</template>
                    </el-table-column>
                    <el-table-column type="grade" label="年级" min-width="120">
                    	<template scope="scope">
                    		<span>{{scope.row.grade.name}}</span>
                    	</template>
                    </el-table-column>
                    <el-table-column type="class" label="班级" min-width="120">
                        <template scope="scope">
                            <span>{{scope.row.class.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column type="class" label="班主任" min-width="120">
                        <template scope="scope">
                            <span>{{scope.row.class.headmaster}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column type="class" label="班级人数" min-width="100">
                    	<template scope="scope">
                    		<span>{{scope.row.class.count}}</span>
                    	</template>
                    </el-table-column>
                    <el-table-column label="考生人数" min-width="100">
                    	<template scope="scope">
                    		<span>{{scope.row.class.exammer?scope.row.class.exammer.length:0}}</span>
                    	</template>
                    </el-table-column>
                    <el-table-column label="操作" min-width="220">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="showStudentDialog(scope.row)">选择考生</el-button>
                            <el-button type="danger" size="small" @click="removeExamClass(scope.row)">删除班级</el-button>
                        </template>
                    </el-table-column>
                </el-table>
			</div>
		</div>
		<!--添加考试班级-->
		<el-dialog title="添加考试班级" :visible.sync="classDialogVisible" class="noPadding">
			<div class="panel" v-loading="classLoading">
				<div class="content">
		            <el-form ref="classForm" :model="classForm" :rules="classRules" label-width="110px" :inline-message="isInlineMessage" @submit.prevent="onSubmitClass('classForm')">
			            <el-form-item label="考试院系：" prop="department"> 
			                <el-select v-model="classForm.department" placeholder="请选择考试院系">
			                    <template v-for="item in departmentSelect">
			                        <el-option :label="item.name" :value="item.id" :key="item.id"></el-option>
			                    </template>
			                </el-select>
			            </el-form-item>
			            <el-form-item label="考试年级：" prop="grade"> 
			                <el-select v-model="classForm.grade" placeholder="请选择考试年级">
			                    <template v-for="item in gradeSelect">
			                        <el-option :label="item.name" :value="item.id" :key="item.id"></el-option>
			                    </template>
			                </el-select>
			            </el-form-item>
			            <el-form-item label="考试班级：" prop="class">
			                   <el-select v-model="classForm.class" placeholder="请选择考试班级" multiple>
			                       <template v-for="item in classSelect">
			                        <el-option :label="item.name" :value="item.id" :key="item.id"></el-option>
			                    </template>
			                </el-select>
			            </el-form-item>
			            <el-form-item>
		                   <el-checkbox style="margin-left:-80px;" v-model="classForm.isAll">班级学生全部参加考试</el-checkbox>
			            </el-form-item>
		            </el-form>
	            </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="cancelClassEdit">取消</el-button>
                <el-button type="primary" @click.native="onSubmitClass('classForm')">提交</el-button>
            </div>
        </el-dialog>
        <el-dialog title="添加考生" :visible.sync="studentDialogVisible" width="80%">
            <div class="panel">
                <div class="title"><span>{{studentClassName}}</span></div>
                <div class="content">
                    <el-table ref="studentTable" :data="studentRows" height="520" highlight-current-row v-loading="studentLoading" fit @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="60">
                        </el-table-column>
                        <el-table-column type="index" label="序号" width="60">
                        </el-table-column>
                        <el-table-column prop="studentNo" label="学号" min-width="120"></el-table-column>
                        <el-table-column prop="name" label="姓名" min-width="100"></el-table-column>
                        <el-table-column prop="gender" label="性别" min-width="100">
                            <template scope="scope">
                                <span>{{scope.row.gender=='0'?'女':'男'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="remark" label="备注" min-width="100"></el-table-column>
                    </el-table>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="cancelStudentEdit">取消</el-button>
                <el-button type="primary" @click.native="onSubmitStudent('classForm')">提交</el-button>
            </div>
        </el-dialog>
	</section>
</template>
<script>
    import {
        getExamClassList,//获取参加考试的班级
        getUnExamClassList,//获取学习该课程但未参加考试的班级
        addExamClass, //添加考试班级
        delExamClass, //删除考试班级
        getStudentsByClassId, //获取班级学生
        saveExammer, //保存班级考生
    } from '../../../api/api';
    import _ from 'lodash';
	export default {
	    props: {
            id: {//考试id
            	required: 1
            }
		},
		data() {
			return {
				listLoading: false,
				rows: [],//考试班级

				isInlineMessage: true,
				classDialogVisible: false,//选择考试班级弹窗
				classLoading: false,
				classForm: {
					department: '',
					grade: '',
					class: '',
					isAll: false
				},
				classRules: {
					department: [
						{required: true, message: '请选择考试院系', trigger:'change'}
					],
					grade: [
						{required: true, message: '请选择考试年级', trigger:'change'}
					],
					class: [
						{required: true, message: '请选择考试班级', trigger:'change'}
					]
				},
                classTreeList: [],//班级树状关系图

                studentDialogVisible: false,//选择考生弹窗
                studentClassId: '',//考生班级id
                studentClassName: '',
                studentRows:[],
                studentLoading: true,
                selectOldStudents: [],//选中初始已选
                selectedNewStudents: ''//已选的学生
			}
		},
		computed:{
			totalClass(){
				return this.rows.length;
			},
			totalExammer(){
				var sum = 0;
				_.forEach(this.rows, (row)=>{
					sum += row.class.exammer.length;
				})
				return sum;
			},
            departmentSelect(){
                if(this.classTreeList.length == 1){
                    this.classForm.department = this.classTreeList[0].id;
                    if(this.classTreeList[0].gradeList.length == 1){
                        this.classForm.grade = this.classTreeList[0].gradeList[0].id;
                        if(this.classTreeList[0].gradeList[0].classList.length == 1){
                            var classid = this.classTreeList[0].gradeList[0].classList[0].id;
                            this.classForm.class = [classid];
                        }else{
                            this.classForm.class = [];
                        }
                    }else{
                        this.classForm.grade = '';
                        this.classForm.class = [];
                    }
                }else{
                    this.classForm.department = '';
                    this.classForm.grade = '';
                    this.classForm.class = [];
                }
                return this.classTreeList;
            },
            gradeSelect(){
                var departIndex = _.findIndex(this.departmentSelect,{id: this.classForm.department}); 
                var list = [];
                if(departIndex > -1){
                    list = this.departmentSelect[departIndex].gradeList;
                    if(list.length == 1){
                        this.classForm.grade = list[0].id;
                        if(list[0].classList.length == 1){
                            var classid = list[0].classList[0].id;
                            this.classForm.class = [classid];
                        }else{
                            this.classForm.class = [];
                        }
                    }else{
                        this.classForm.grade = '';
                        this.classForm.class = [];
                    }
                }
                return list;
            },
            classSelect(){     
                var gradeIndex = _.findIndex(this.gradeSelect, {id: this.classForm.grade});
                var list = [];
                if(gradeIndex > -1){
                    list = this.gradeSelect[gradeIndex].classList;
                    if(list.length == 1){
                        var classid = list[0].id;
                        this.classForm.class = [classid];
                    }else{
                        this.classForm.class = [];
                    }
                }
                return list;
            }
		},
		methods: {
			getList(){//获取开始班级列表 不分页
				this.listLoading = true;
				var para = {
					id: this.id //考试id
				};
				getExamClassList(para).then(res =>{ 
					this.rows = res.data;
					this.listLoading = false;
				});
			},
            getUnExamClasses(){//根据考试科目获取学习该科目的班级-前端处理为树状关系数据
                this.classLoading = true;
                this.classTreeList = [];
                var para = {
                    id: this.id //考试id 
                };
                var treeList = [];
                getUnExamClassList(para).then(res => {
                    res = res.data;
                    _.forEach(res, treeItem => {
                        var departIndex = _.findIndex(treeList,{id: treeItem.department.id}); 
                        if(departIndex > -1){//已存在院系
                            var departItem = treeList[departIndex];
                            var gradeIndex = _.findIndex(departItem.gradeList, {
                                id: treeItem.grade.id
                            });
                            if(gradeIndex > -1){//已存在年级
                                var gradeItem = departItem.gradeList[gradeIndex].classList;
                                gradeItem.push({
                                    id: treeItem.class.id,//班级id
                                    name: treeItem.class.name//班级id
                                });
                            }else{
                                departItem.gradeList.push({
                                    id: treeItem.grade.id,//年级id
                                    name: treeItem.grade.name,//年级名称
                                    classList: [{//班级列表
                                        id: treeItem.class.id,//班级id
                                        name: treeItem.class.name//班级id
                                    }] 
                                })
                            }
                        }else{
                            treeList.push({
                                id: treeItem.department.id, //院系id
                                name: treeItem.department.name,//院系名称
                                gradeList: [{ //年级列表
                                    id: treeItem.grade.id,//年级id
                                    name: treeItem.grade.name,//年级名称
                                    classList: [{//班级列表
                                        id: treeItem.class.id,//班级id
                                        name: treeItem.class.name//班级id
                                    }] 
                                }]
                            })
                        }
                    });
                    this.classTreeList = treeList;
                    this.classLoading = false;
                });
            },
			onAdd(){//添加考生
				this.showClassDialog();
			},
            onSave() {//保存
                
            },
            onSubmitClass(formName){
				this.$refs[formName].validate((isValid) => {
                    if (isValid) {
                        this.$confirm('确认添加吗？', '提示', {}).then(() => {
                            let para = _.assign({}, this.classForm);
                            this.classLoading = true;
							addExamClass(para).then((res) => {
                                if (res.code !== '0') {
                                    this.$message({
                                        message: res.msg,
                                        type: 'error'
                                    });
                                } else {
                                    this.$message({
                                        message: '添加成功',
                                        type: 'success'
                                    });
                                    this.classLoading = false;
                                    this.cancelClassEdit();
                                    this.getList();
                                }
                            });
                        }).catch(error=>{});
                    } else {
                        return false;
                    }
                });
            },
            cancelClassEdit(){//取消编辑
            	this.resetForm('classForm');
				this.classDialogVisible = false; 
            },
            showClassDialog(){//选择考生弹窗
                this.classDialogVisible = true;
                this.getUnExamClasses();
            },

            onSubmitStudent(){//保存或更新考生
                if(this.selectedNewStudents.length == 0){
                    this.$message({
                        type: 'error',
                        message: '请先选择班级学生'
                    });
                }else{
                    this.$confirm('确认选择这些考生吗？', '提示', {}).then(() => {
                        this.selectedNewStudents = _.map(this.selectedNewStudents, row => {
                            return row.studentNo;
                        });
                        console.log('new',this.selectedNewStudents)
                        console.log('old',this.selectedOldStudents)
                        var willAddStu = _.difference(this.selectedNewStudents, this.selectedOldStudents);
                        var willDelStu = _.difference(this.selectedOldStudents, this.selectedNewStudents);
                        console.log('willAddStu',willAddStu)
                        console.log('willDelStu',willDelStu)
                        let para = {
                            examId: this.id, //考试id
                            // students: this.selectedNewStudents,//最终的班级考生
                            add: willAddStu,   //新有旧无，要添加
                            remove: willDelStu  //旧有新无，要去除
                        };
                        this.studentLoading = true;
                        //提交考生
                        saveExammer(para).then((res) => {
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
                                this.studentLoading = false;
                                this.cancelStudentEdit();
                                this.getList();//人数变化
                            }
                        });
                    }).catch(error=>{});
                }
            },
            handleSelectionChange(val){//表格多选变更
                this.selectedNewStudents = val;
            },
            showStudentDialog(row){//打开考生弹窗
                this.studentDialogVisible = true;
                this.studentClassName = row.department.name + row.grade.name + row.class.name;
                this.selectedOldStudents = row.class.exammer || [];
                this.getDialogStudents(row.id);
            },
            cancelStudentEdit(){//隐藏考生弹窗
                this.studentDialogVisible = false;
            },
            getDialogStudents(id){
                this.studentClassId = id;
                var para = {
                    classId: this.studentClassId
                };
                this.studentLoading = true;
                this.studentRows = [];
                getStudentsByClassId(para).then(res => {//不分页
                    this.studentRows = res.data;
                    setTimeout(()=>{
                        _.forEach(this.studentRows, row => {
                            var index = _.indexOf(this.selectedOldStudents, row.studentNo);
                            if(index > -1){
                                this.setRowCheckState(row, true);
                            }
                        });
                        this.studentLoading = false;
                    },10);
                });
            },
            setRowCheckState(row, isCheck){//设置学生行选择状态
                this.$refs.studentTable.toggleRowSelection(row, isCheck);
            },
            removeExamClass(row){//删除考试班级
                this.$confirm('删除后，该班级下所有学生将不能参加此次考试，确认删除吗？', '提示', {}).then(() => {
                    let para = {
                        examId: this.id, //考试id
                        classId: row.class.id //班级id
                    };
                    delExamClass(para).then((res) => {
                        if (res.code !== '0') {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        } else {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getList();
                        }
                    });
                }).catch(error=>{});
            },
            resetForm(formName){
            	this.$refs[formName].resetFields();
            },
            close() {//返回
                this.$emit('close');
            }
        },
        mounted() {

        }
	}
</script>
<style scoped lang="scss">
    @import '~scss_vars';
    
</style>