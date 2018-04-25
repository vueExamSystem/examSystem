<template>
	<section>
		<div class="panel" id="queForm">
			<div class="title">
				<span>添加资料</span>
				<div class="pull-right">
					<el-button type="success" @click="onSubmit('form')" class="el-button-shadow">保存</el-button>
					<el-button type="danger" @click="resetForm('form')" class="el-button-shadow">重置</el-button>
				</div>
			</div>
			<div class="content">
				<el-form ref="form" :model="form" :rules="rules" label-width="110px" :inline-message="isInlineMessage" @submit.prevent="onSubmit">
					<el-form-item label="资料名称：" prop="name">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="选择课程：" prop="course"> 
						<el-select v-model="form.course" placeholder="请选择课程">
							<template v-for="item in defaultInfo.courses">
								<el-option :label="item.text" :value="item.value" :key="item.value"></el-option>
							</template>
						</el-select>
					</el-form-item>
					<el-form-item label="选择章节：" prop="section"> 
					<el-select v-model="form.section" placeholder="请选择章节">
							<template v-for="item in defaultInfo.sections">
								<el-option :label="item.text" :value="item.value" :key="item.value"></el-option>
							</template>
						</el-select>
					</el-form-item>
					<el-form-item label="资料内容：" prop="content" class="spec clearfix" 
					:rules="[{required: true, message: `请输入资料内容`, trigger: 'blur'}]">
                    <div class="edArea">
                        <script id="editor" class="editorEve" type="text/plain"></script>
                    </div>
                	</el-form-item>
                	<el-form-item label="" prop="contentPic">
			            <el-upload
			             class="upload-demo"
			             :action="UploadUrl('uploadPictureFile')"
			             :onSuccess="uploadTitleSuccess"
			             :onError="uploadError"
			             :on-preview="handlePreviewContent"
			             :on-remove="handleRemoveContent"
			             :file-list="form.contentPic"
			             list-type="picture">
			            <el-button type="primary" icon="iconfont icon-plus">添加图片</el-button>
		            	</el-upload>
					</el-form-item>
					<el-form-item label="上传视频：" prop="videoUrl"> 
						<el-input v-model="form.videoUrl" placeholder="上传视频后自动添加视频的相对地址" readonly style="width: 800px;"></el-input>
					</el-form-item>
					<el-form-item label="" prop="videoUrl" style="position:relative;">
						<span class="text-primary" style="position:absolute;top: 0px;left: 120px;">*支持mp4</span>
						
						<el-upload
							accept="video/*"
							:action="UploadUrl('uploadVideoFile')"
							:onSuccess="uploadVideoSuccess"
			             	:onError="uploadError"
							:on-preview="handlePreviewContent"
							:on-remove="handleRemoveContent"
							:file-list="form.contentPic"
							list-type="picture">
							<el-button type="primary" icon="iconfont icon-plus">上传视频</el-button>
						</el-upload>
					</el-form-item>
				</el-form>
			</div>
			<div class="title">
				<div class="pull-right">
					<el-button type="success" @click="onSubmit('form')" class="el-button-shadow">保存</el-button>
					<el-button type="danger" @click="resetForm('form')" class="el-button-shadow">重置</el-button>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
    import {
    	getAddDocFilter,
        getDocAddInfo,
        addDoc,
    } from '../../../api/api';
    import _ from 'lodash';
    //ueditor
    import $ from 'jQuery';
    import '../../../../static/ueditor/ueditor.config';
    import '../../../../static/ueditor/ueditor.all.min';
    import '../../../../static/ueditor/lang/zh-cn/zh-cn';
    import '../../../../static/ueditor/kityformula-plugin/addKityFormulaDialog';
    import '../../../../static/ueditor/kityformula-plugin/getKfContent';
    import '../../../../static/ueditor/kityformula-plugin/defaultFilterFix';
	export default {
		data() {
			var integerPattern = '^\\d+$';//>=0整数正则
			return {
				isInlineMessage: true,
				form: {
					name: '',
					course: '',
					section:'',
					content: '',
					videoUrl:''
				},
				rules:{
					name:[
						{required: true, message: '请输入资料名称', trigger: 'blur'},
						{min: 2, max: 30, message: '长度在2-30个字符', trigger: 'blur'}
					],
					course:[
						{required: true, message: '请选择课程', trigger:'change'}
					],
					section:[
						{required: true, message: '请选择章节', trigger:'change'}
					],
                    content: [
                        { required: true, message: '请填写资料内容', trigger: 'blur' }
                    ]
				},
				loading: false,
                defaultInfo: {
                    courses: [],
                    sections:[]
                },
                 //ue
                ue: null
			}
		},
		computed:{
			
		},
		methods: {
			UploadUrl: function (url) {
                return 'http://localhost:8081/api/question/' + url;
                //return 'http://121.43.164.178:8081/api/question/' + url;
            },
            // 上传题目图片成功后的回调
            uploadTitleSuccess(res, file, fileList) {
                console.log('上传文件', res);
                //记住返回的文件存储的相对路径
                this.ue.focus();
                this.ue.setContent(res.data,true);
            },
            uploadVideoSuccess(res, file, fileList) {
                console.log('上传文件', res);
                //记住返回的文件存储的相对路径
                this.form.videoUrl=res.data;
                
            },
			// 上传错误
            uploadError(response, file, fileList) {
                 this.$message({message: '上传失败，请重试！',
                                 type: 'error'
                                    });
            },
			onSubmit(formName, flag) {
				this.form.content = this.ue.getContent();
				this.$refs[formName].validate((isValid) => {
					if(isValid){
                        this.$confirm('确认添加吗？', '提示', {}).then(() => {
                            let para = _.assign({}, this.form); 
                            para={
                            	name:para.name,
                            	courseId:para.course,
                            	sectionId:para.section,
                            	content:para.content,
                            	videoUrl:para.videoUrl
                            };
                            console.log('para',para);
                            this.loading = true;
                            addDoc(para).then((res) => {
                                if (res.code !== 0) {
                                    this.$message({
                                        message: res.msg,
                                        type: 'error'
                                    });
                                } else {
                                    this.$message({
                                        message: '添加资料成功',
                                        type: 'success'
                                    });
                                    this.loading = false;
                                    this.$refs['form'].resetFields();
                                    this.ue.setContent('');
                                    this.$emit('toTable');
                                }

                            });
                        });
					}else{
						return false;
					}
				});
			},
			resetForm(formName){
				this.$refs[formName].resetFields();
				this.ue.setContent('');
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
            getDefaultData() {
                getAddDocFilter({}).then(res => {
                    this.defaultInfo = res.data;
                    this.$forceUpdate();
                });
            },
		},
        mounted() {
            this.getDefaultData();
            //'simpleupload', //去掉图片
            const config = {
                toolbars: [['fullscreen', 'source', '|',
                    'undo', 'redo', '|',
                    'bold', 'italic', 'underline', 'superscript', 'subscript', 'pasteplain', '|',
                    'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', '|',
                    'paragraph', 'fontfamily', 'fontsize', '|',
                    'indent', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
                    'horizontal', 'inserttable', '|',
                    'searchreplace', 'kityformula'
                ]],
                autoHeightEnabled: true,
                autoFloatEnabled: true
            };

            UE.delEditor("editor");
            var editor = UE.getEditor('editor', config);
            this.ue = editor;
        }
	}
</script>
<style scoped lang="scss">
    @import '~scss_vars';
	#queForm {
        .spec {
            .el-form-item__label {
                line-height: 50px;
            }
        }
        .editor {
            width: 800px;
            height: 400px;
        }
        .editorEve {
            width: 100%;
            height: 100px;
        }
        .edArea {
            width: 800px;
            height: auto;
            display: inline-block;
        }
        .contentArea {
            height: 400px;
        }
    }

</style>