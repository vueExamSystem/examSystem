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
                    <el-table-column label="操作" min-width="160">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="updateExammer(scope.row)">选择考生</el-button>
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
			                    <template v-for="item in defaultInfo.department">
			                        <el-option :label="item.name" :value="item.id" :key="item.id"></el-option>
			                    </template>
			                </el-select>
			            </el-form-item>
			            <el-form-item label="考试年级：" prop="grade"> 
			                <el-select v-model="classForm.grade" placeholder="请选择考试年级">
			                    <template v-for="item in defaultInfo.grade">
			                        <el-option :label="item.name" :value="item.id" :key="item.id"></el-option>
			                    </template>
			                </el-select>
			            </el-form-item>
			            <el-form-item label="考试班级：" prop="class">
			                   <el-select v-model="classForm.class" placeholder="请选择考试班级" multiple>
			                       <template v-for="item in defaultInfo.class">
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
                <el-button type="primary" @click.native="onSubmitClass('classForm')" v-loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
	</section>
</template>
<script>
    import {
        getExamClassList,
        addExam
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
				rows: [],

				isInlineMessage: true,
				classDialogVisible: false,
				classLoading: false,//班级弹窗loading
				editLoading: false,//按钮
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
				defaultInfo: {
                    grade: [{
                        id: 5,
                        name: '18级',
                    }],
                    department: [{
                        id: 2,
                        name: '计算机',
                    }],
                    class:[{
                        id: 7,
                        name: '3班',
                    }],
                },
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
							addExam(para).then((res) => {
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
                        });
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
            },
            updateExammer(){//选择考生

            },
            removeExamClass(){//删除考试班级

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