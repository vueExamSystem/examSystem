<template>
	<section class="panel">
		<div class="title">
			<span>添加试题</span>
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
					<el-select v-model="ruleForm.usage" placeholder="请选择试题用途">
						<template v-for="item in usageArr">
							<el-option :label="item.name" :value="item.id"></el-option>
						</template>
					</el-select>
				</el-form-item>
				<el-form-item label="选择科目" prop="subject">
					<el-select v-model="ruleForm.usage" placeholder="请选择科目">
						<template v-for="item in subjectArr">
							<el-option :label="item.name" :value="item.id"></el-option>
						</template>
					</el-select>
				</el-form-item>
				<el-form-item label="章节选择" prop="chapter">
					<el-select v-model="ruleForm.usage" placeholder="请选择章节">
						<template v-for="item in chapterArr">
							<el-option :label="item.name" :value="item.id"></el-option>
						</template>
					</el-select>
				</el-form-item>
				<el-form-item label="题组" prop="department">
					<el-select v-model="ruleForm.usage" placeholder="请选择题组">
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
				<el-form-item label="试题选项" prop="selectionA">
					<span>A</span>
					<el-input v-model="ruleForm.source"></el-input>
					<el-upload
							class="upload-demo"
							:action="uploadSource"
							:on-preview="handlePreviewA"
							:on-remove="handleRemoveA"
							:file-list="ruleForm.selectionAPic"
							list-type="picture">
						<el-button type="primary" icon="iconfont icon-plus">添加照片</el-button>
						<div slot="tip" class="el-upload__tip">*最多添加4个选项</div>
					</el-upload>
					<i class="iconfont icon-remove-circle"></i>
				</el-form-item>
				<el-form-item label="" prop="selectionB">
					<span>B</span>
					<el-input v-model="ruleForm.source"></el-input>
					<el-upload
							class="upload-demo"
							:action="uploadSource"
							:on-preview="handlePreviewB"
							:on-remove="handleRemoveB"
							:file-list="ruleForm.selectionBPic"
							list-type="picture">
						<el-button type="primary" icon="iconfont icon-plus">添加照片</el-button>
					</el-upload>
					<i class="iconfont icon-remove-circle"></i>
				</el-form-item>
				<el-form-item label="来源" prop="source">
					<el-input v-model="ruleForm.source"></el-input>
				</el-form-item>
			</el-form>
		</div>
	</section>

</template>

<script>
	import {
	    getQueTypeList,
		getQueUsageList,
        getQueSubjectList,
		getQueChapterList,
        getQueDepartmentList,
	} from '../../../api/api';
	export default {
		data() {
			return {
                ruleForm: {
                    type: '',
                    usage: '',
                    subject: '',
                    chapter: '',
                    department: '',
                    content: '',
                    selectionA: '',
                    selectionB: '',
                    selectionC: '',
                    selectionD: '',
					selectionAPic: [],
					selectionBPic: [],
					selectionCPic: [],
					selectionDPic: [],
                    correctOption: '',
					source: '',
                    testSites: '', // 考点
                    keywords: '',
                    analysis: '', // 解析
                    contentPic: [],
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
                },
				// 上传文件的路径
				uploadSource: 'https://jsonplaceholder.typicode.com/posts/',
				// 默认数据
				typeArr: [],
				usageArr: [],
				subjectArr: [],
				chapterArr: [],
				departmentArr: [],
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
                getQueTypeList({}).then((res) => {
					this.typeArr = res.data;
					console.log(res);
                });
                getQueUsageList({}).then((res) => {
                    this.usageArr = res.data;
                    console.log(res);
                });
                getQueSubjectList({}).then((res) => {
                    this.subjectArr = res.data;
                    console.log(res);
                });
                getQueChapterList({}).then((res) => {
                    this.chapterArr = res.data;
                    console.log(res);
                });
                getQueDepartmentList({}).then((res) => {
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
			handleRemoveA(file, fileList) {
                console.log(file, fileList);
            },
            handlePreviewA(file) {
                console.log(file);
            },
			handleRemoveB(file, fileList) {
                console.log(file, fileList);
            },
            handlePreviewB(file) {
                console.log(file);
            },
			handleRemoveC(file, fileList) {
                console.log(file, fileList);
            },
            handlePreviewC(file) {
                console.log(file);
            },
			handleRemoveD(file, fileList) {
                console.log(file, fileList);
            },
            handlePreviewD(file) {
                console.log(file);
            }
		},
        mounted() {
            this.getDefaultData();
        }
	}

</script>