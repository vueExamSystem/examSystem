<template>
	<section class="panel" id="queForm">
		<div class="title">
			<span>添加试题</span>
			<div class="pull-right">
				<el-button type="success" @click="onSubmit('form')" class="el-button-shadow">保存</el-button>
				<el-button type="danger" @click="resetForm('form')" class="el-button-shadow">重置</el-button>
			</div>
		</div>

		<div class="content">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

				<el-form-item label="试题类型" prop="type">
					<el-select v-model="ruleForm.type" placeholder="请选择试题类型">
						<template v-for="item in typeArr">
							<el-option :label="item.name" :value="item.id"></el-option>
						</template>
					</el-select>
				</el-form-item>
				<el-form-item label="试题用途" prop="usage">
					<el-select v-model="ruleForm.usage" multiple placeholder="请选择试题用途">
						<el-option
								v-for="item in usageArr"
								:label="item.name"
								:value="item.id"
								:key="item.id"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="选择科目" prop="subject">
					<el-select v-model="ruleForm.subject" placeholder="请选择科目">
						<template v-for="item in subjectArr">
							<el-option :label="item.name" :value="item.id"></el-option>
						</template>
					</el-select>
				</el-form-item>
				<el-form-item label="章节选择" prop="chapter">
					<el-select v-model="ruleForm.chapter" placeholder="请选择章节">
						<template v-for="item in chapterArr">
							<el-option :label="item.name" :value="item.id"></el-option>
						</template>
					</el-select>
				</el-form-item>
				<el-form-item label="题组" prop="department">
					<el-select v-model="ruleForm.department" placeholder="请选择题组">
						<template v-for="item in departmentArr">
							<el-option :label="item.name" :value="item.id"></el-option>
						</template>
					</el-select>
				</el-form-item>
				<el-form-item label="试题内容" prop="content">
					<el-input
							type="textarea"
							:rows="3"
							placeholder="请输入内容"
							v-model="ruleForm.content">
					</el-input>
				</el-form-item>
				<el-form-item label="" prop="contentPic">
					<el-upload
							class="upload-demo"
							:action="uploadSource"
							:on-preview="handlePreviewContent"
							:on-remove="handleRemoveContent"
							:file-list="ruleForm.contentPic"
							list-type="picture">
						<el-button type="primary" icon="iconfont icon-plus">添加照片</el-button>
					</el-upload>
				</el-form-item>
				<template v-if="!isJudgment">
					<el-form-item
							v-for="(item, index) in correctManyArr"
							:label="item === 'A' ? '试题选项' : ''"
							:prop="`selection${item}`"
							class="spec">
						<span>{{item}}</span>
						<el-input v-model="ruleForm.selection[index]"></el-input>
						<el-upload
								class="upload-demo inline"
								:action="uploadSource"
								:on-preview="handlePreview"
								:on-remove="handleRemove"
								:file-list="ruleForm.selectionPic[index]"
								>
							<el-button type="primary" icon="iconfont icon-plus">添加照片</el-button>
						</el-upload>
						<i class="iconfont icon-remove-circle"></i>
						<span class="tip" v-if="item === 'A' && isRadio">*最多添加4个选项</span>
					</el-form-item>
					<el-form-item label="" prop="selectionAdd" v-if="isShowSelectionAdd" class="spec">
						<div class="hidden inline">
							<span>H</span>
							<el-input v-model="selectNum"></el-input>
							<el-button type="primary" icon="iconfont icon-plus">添加照片</el-button>
						</div>
						<i class="iconfont icon-add-circle" @click="selectAddFunc"></i>
					</el-form-item>
				</template>
				<el-form-item label="正确选项" prop="correctOptionRadio" v-if="isRadio">
					<el-select v-model="ruleForm.correctOptionRadio" placeholder="请选择正确选项">
						<el-option
								v-for="item in correctRadioArr"
								:label="item.name"
								:value="item.id"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="正确选项" prop="correctOptionRadio" v-if="isJudgment">
					<el-select v-model="ruleForm.correctOptionRadio" placeholder="请选择正确选项">
						<el-option label="正确" value="1"></el-option>
						<el-option label="错误" value="0"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="正确选项" prop="correctOptionMany" v-if="isCheckbox">
					<el-checkbox-group
							v-model="ruleForm.correctOptionMany">
						<el-checkbox v-for="item in correctManyArr" :label="item" :key="item">
							{{item}}
						</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="来源" prop="source">
					<el-input v-model="ruleForm.source"></el-input>
				</el-form-item>
				<el-form-item label="考点" prop="testSites">
					<el-input v-model="ruleForm.testSites"></el-input>
				</el-form-item>
				<el-form-item label="关键字" prop="keywords">
					<el-input v-model="ruleForm.keywords"></el-input>
				</el-form-item>
				<el-form-item label="解析" prop="analysis">
					<el-input
							type="textarea"
							:rows="3"
							placeholder="请输入内容"
							v-model="ruleForm.analysis">
					</el-input>
				</el-form-item>
			</el-form>
		</div>
	</section>

</template>

<script>
	import {
        getSubjectList,
		getChapterList,
        getDepartmentList,
	} from '../../../api/api';
	export default {
		data() {
			return {
                ruleForm: {
                    type: '0',
                    usage: '0',
                    subject: '',
                    chapter: '',
                    department: '',
                    content: '',
                    contentPic: [],
					selection: [],
                    selectionA: '',
                    selectionB: '',
                    selectionC: '',
                    selectionD: '',
                    selectionPic: [],
					selectionAPic: [],
					selectionBPic: [],
					selectionCPic: [],
					selectionDPic: [],
                    correctOptionRadio: '',
                    correctOptionMany: [],
					source: '',
                    testSites: '', // 考点
                    keywords: '',
                    analysis: '', // 解析
                },
                rules: {
                    type: [
                        { required: true, message: '请选择试题类型', trigger: 'change' }
                    ],
                    usage: [
                        { required: true, message: '请选择试题用途', trigger: 'change' }
                    ],
                    subject: [
                        { required: true, message: '请选择科目', trigger: 'change' }
                    ],
                    chapter: [
                        { required: true, message: '请选择章节', trigger: 'change' }
                    ],
                    department: [
                        { required: false, message: '请选择题组', trigger: 'change' }
                    ],
                    content: [
                        { required: true, message: '请输入试题内容', trigger: 'blur' }
                    ],
					selectionA: [
                        { required: true, message: '请输入试题选项', trigger: 'blur' }
                    ],
                    correctOptionRadio: [
                        { required: true, message: '请选择正确选项', trigger: 'change' }
                    ],
					correctOptionMany: [
                        { required: true, message: '请选择正确选项', trigger: 'change' }
                    ],
                },
				// 上传文件的路径
				uploadSource: 'https://jsonplaceholder.typicode.com/posts/',
				// 选项个数
				selectNum: 2,
				// 默认数据
				typeArr: [{
                    id: '0',
					name: '单选题',
				},{
                    id: '1',
					name: '多选题',
				},{
                    id: '2',
					name: '判断题',
				}],
				usageArr: [{
                    id: '0',
                    name: '练习题',
                },{
                    id: '1',
                    name: '随堂测验',
                },{
                    id: '2',
                    name: '正规考试',
                }],
				subjectArr: [],
				chapterArr: [],
				departmentArr: [],
				correctRadioArr: [{
                    id: '0',
                    name: 'A',
                },{
                    id: '1',
                    name: 'B',
                }],
				correctManyArr: ['A', 'B'],
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
                getSubjectList({}).then((res) => {
                    this.subjectArr = res.data;
                    console.log(res);
                });
                getChapterList({}).then((res) => {
                    this.chapterArr = res.data;
                    console.log(res);
                });
                getDepartmentList({}).then((res) => {
                    this.departmentArr = res.data;
                    console.log(res);
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
            selectAddFunc() {
                this.selectNum = this.selectNum + 1;
                const str = String.fromCharCode(64 + this.selectNum);
                this.correctRadioArr.push({ id: this.selectNum - 1, name: str });
                this.correctManyArr.push(str);
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
                return this.selectNum < 4;
			},
            isRadio() {
                return this.ruleForm.type === '0';
			},
			isCheckbox() {
                return this.ruleForm.type === '1';
			},
            isJudgment() {
                return this.ruleForm.type === '2';
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