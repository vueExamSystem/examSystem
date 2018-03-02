<template>
    <section class="panel" id="queForm">
        <div class="title">
            <span>添加试题</span>
            <div class="pull-right">
                <el-button type="success" @click="onSubmit()" class="el-button-shadow">保存</el-button>
                <el-button type="danger" @click="resetForm()" class="el-button-shadow">取消</el-button>
            </div>
        </div>

        <div class="content">
            <el-form :model="form" :rules="rules" ref="form" label-width="110px" :inline-message="isInlineMessage"
                     @submit.prevent="onSubmit"
                     v-loading="loading"
            >

                <el-form-item label="试题类型:" prop="type">
                    <el-select v-model="form.type" placeholder="请选择试题类型">
                        <template v-for="item in typeArr">
                            <el-option :label="item.text" :value="item.value"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item label="试题用途:" prop="usage">
                    <el-select v-model="form.usage" multiple placeholder="请选择试题用途">
                        <el-option
                                v-for="item in usageArr"
                                :label="item.text"
                                :value="item.value"
                                :key="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择课程:" prop="subject">
                    <el-select v-model="form.subject" placeholder="请选择课程">
                        <template v-for="item in subjectArr">
                            <el-option :label="item.text" :value="item.value"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item label="章节选择:" prop="section">
                    <el-select v-model="form.chapter" placeholder="请选择章节">
                        <template v-for="item in chapterArr">
                            <el-option :label="item.text" :value="item.value"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item label="题组:" prop="department" v-if="isNeedSame">
                    <el-select v-model="form.department" placeholder="请选择题组">
                        <template v-for="item in departmentArr">
                            <el-option :label="item.text" :value="item.value"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item label="试题内容:" prop="content">
                    <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入内容"
                            v-model="form.content">
                    </el-input>
                    <div id="content" contentEditable="true" class="editDemo">
                        编辑框一
                    </div>
                </el-form-item>
                <el-form-item label="" prop="contentPic">
                    <el-upload
                            class="upload-demo"
                            :action="UploadUrl('uploadTitleFile')"
                            :onSuccess="uploadTitleSuccess"
                            :onError="uploadError"
                            :on-preview="handlePreviewContent"
                            :on-remove="handleRemoveContent"
                            :file-list="form.contentPic"
                            list-type="picture">
                        <el-button type="primary" icon="iconfont icon-plus">添加照片</el-button>
                    </el-upload>
                </el-form-item>
                <template v-if="!isJudgment">
                    <el-form-item
                            v-for="(item, index) in correctManyArr"
                            :label="item === 'A' ? '试题选项' : ''"
                            :prop="`selection${item}`"
                            :rules="[{required: true, message: `请输入试题选项${item}`, trigger: 'blur'}]"
                            class="spec"
                    >
                        <span>{{item}}</span>
                        <el-input v-model="form[`selection${item}`]"></el-input>
                        <el-upload
                                class="upload-demo inline"
                                :action="UploadUrl('uploadOptionFile')"
                                :onSuccess="uploadOptionSuccess"
                                :onError="uploadError"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :file-list="form.selectionPic[index]"
                        >
                            <el-button type="primary" icon="iconfont icon-plus">添加照片</el-button>
                        </el-upload>
                        <i class="iconfont icon-remove-circle" @click="delSelection(index)"></i>
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
                <el-form-item label="正确选项:" prop="correctOptionRadio" v-if="isRadio">
                    <el-select v-model="form.correctOptionRadio" placeholder="请选择正确选项">
                        <el-option
                                v-for="item in correctRadioArr"
                                :label="item.name"
                                :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="正确选项:" prop="correctOptionRadio" v-if="isJudgment">
                    <el-select v-model="form.correctOptionRadio" placeholder="请选择正确选项">
                        <el-option label="正确" value="1"></el-option>
                        <el-option label="错误" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="正确选项:" prop="correctOptionMany" v-if="isCheckbox">
                    <el-checkbox-group
                            v-model="form.correctOptionMany">
                        <el-checkbox v-for="item in correctManyArr" :label="item" :key="item">
                            {{item}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="分数:" prop="points">
                    <el-input v-model="form.points"></el-input>
                </el-form-item>
                <el-form-item label="来源:" prop="source">
                    <el-input v-model="form.source"></el-input>
                </el-form-item>
                <el-form-item label="考点:" prop="testSites">
                    <el-input v-model="form.testSites"></el-input>
                </el-form-item>
                <el-form-item label="关键字:" prop="keywords">
                    <el-input v-model="form.keywords"></el-input>
                </el-form-item>
                <el-form-item label="解析:" prop="analysis">
                    <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入内容"
                            v-model="form.analysis">
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
    </section>

</template>

<script>
    import {
        getSubjectList,
        getChapterAll,
        getSameGroupList,
        getQueAddFilter,
        getgroupList,
    } from '../../../api/api';
    import {saveQue} from '../../../api/api';
    import _ from 'lodash';
    import '../../../../static/JMEditor-0.9.4/jmeditor/JMEditor';
    import '../../../../static/JMEditor-0.9.4/jmeditor/jquery-1.8.3.min';

    export default {
        props: {
            sameId: {
                required: false,
            },
        },
        data() {
            return {
                form: {
                    type: '0',
                    usage: '0',
                    subject: '',
                    chapter: '',
                    department: '',
                    content: '',
                    contentPic: [],
                    selection: [],
                    selectionPic: [],
                    correctOptionRadio: '',
                    correctOptionMany: [],
                    source: '',
                    testSites: '', // 考点
                    keywords: '',
                    analysis: '', // 解析
                },
                rules: {
                    type: [
                        {required: true, message: '请选择试题类型', trigger: 'change'}
                    ],
                    usage: [
                        {required: true, message: '请选择试题用途', trigger: 'change'}
                    ],
                    subject: [
                        {required: true, message: '请选择科目', trigger: 'change'}
                    ],
                    chapter: [
                        {required: true, message: '请选择章节', trigger: 'change'}
                    ],
                    department: [
                        {required: false, message: '请选择题组', trigger: 'change'}
                    ],
                    content: [
                        {required: true, message: '请输入试题内容', trigger: 'blur'}
                    ],
                    correctOptionRadio: [
                        {required: true, message: '请选择正确选项', trigger: 'change'}
                    ],
                    correctOptionMany: [
                        {required: true, message: '请选择正确选项', trigger: 'change'}
                    ],
                },
                isInlineMessage: true,
                // 上传文件的路径
                // uploadSource: 'http://localhost:8081/api/question/uploadTitleFile',
                // uploadTitle:'http://localhost:8081/api/question/uploadTitleFile',
                // uploadOption:'http://localhost:8081/api/question/uploadOptionFile',
                // 选项个数
                selectNum: 2,
                // 默认数据
                typeArr: [{
                    id: '0',
                    name: '单选题',
                }, {
                    id: '1',
                    name: '多选题',
                }, {
                    id: '2',
                    name: '判断题',
                }],
                usageArr: [{
                    id: '0',
                    name: '练习题',
                }, {
                    id: '1',
                    name: '随堂测验',
                }, {
                    id: '2',
                    name: '正规考试',
                }],
                subjectArr: [],
                chapterArr: [],
                departmentArr: [],
                correctRadioArr: [{
                    id: '0',
                    name: 'A',
                }, {
                    id: '1',
                    name: 'B',
                }],
                correctManyArr: ['A', 'B'],
                loading: false,

                sameGroupId: this.sameId,
            }
        },
        methods: {

             UploadUrl:function(url){
                return 'http://localhost:8081/api/question/'+url;     
            }, 
            // 上传题目图片成功后的回调
            uploadTitleSuccess (response, file, fileList) {
                console.log('上传文件', response);
                //记住返回的文件存储的相对路径
            },
             // 上传答案图片成功后的回调
            uploadOptionSuccess (response, file, fileList) {
                console.log('上传文件', response);
                //记住返回的文件存储的相对路径
            },
            // 上传错误
            uploadError (response, file, fileList) {
                console.log('上传失败，请重试！');
            },
            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                         var str = "";  
                        for (var i = 0; i < this.form.correctOptionMany.length; i++) {  
                            str = str+","+this.form.correctOptionMany[i];  
                        } 
                        var queParams = {
                            name: this.form.content,
                            questionTypeId: this.form.type,
                            levelId: this.form.usage[0],
                            "course.id": this.form.subject,
                            "section.id": this.form.chapter,
                            similarId: this.form.department || this.sameGroupId,
                            content: this.form.content,
                            titleImg: this.form.contentPic,
                            choiceList: this.form.selectionAdd,
                            choiceImgList: this.form.selectionPic,
                            answer: this.form.correctOptionRadio,
                            answers:str,
                            points: this.form.points,
                            reference: this.form.source,
                            examingPoint: this.form.testSites,
                            keyword: this.form.keywords,
                            analysis: this.form.analysis
                        };
                        this.$confirm('确认添加吗？', '提示', {}).then(() => {
                            this.loading = true;
                            saveQue(queParams).then((res) => {
                                
                                if (res.code != '0') {
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
                                    this.$emit('toTable');
                                }

                            });
                        });

                    } else {
                        return false;
                    }
                });
            },
            resetForm() {
                this.$refs['form'].resetFields();
            },
            // 获取初始数据
            getDefaultData() {
                getQueAddFilter({}).then((res) => {
                    console.log('getQueAddFilter',res.data);
                    //todo 加载初始数据
                    //this.subjectArr = res.data;
                    this.subjectArr = res.data[0].children;
                    this.chapterArr=res.data[1].children;
                    this.typeArr=res.data[2].children;
                    //todo缺少类别 简单题 送分题res.data[3].children
                    this.usageArr=res.data[4].children;
                    //this.departmentArr=res.data[0].children;
                });
                //根据课程id 章节id 题型id获取相似题组
                let groupListPara={
                    'courseid':1,
                    'sectionid':2,
                    'questiontypeid':1
                };
                getgroupList(groupListPara).then((res) => {
                    console.log('getgroupList',res.data);
                    //this.subjectArr = res.data;
                });
                /*getSubjectList({}).then((res) => {
                    this.subjectArr = res.data;
                });
                getChapterAll({}).then((res) => {
                    this.chapterArr = res.data;
                });
                getSameGroupList({}).then((res) => {
                    this.departmentArr = res.data;
                });*/
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
                this.correctRadioArr.push({id: this.selectNum - 1, name: str});
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
                for (let i = 0; i < num; i++) {
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
                for (let i = 1; i < num; i++) {
                    const str = String.fromCharCode(65 + i);
                    arr[`selection${str}`] = [
                        {required: true, message: `请输入试题选项${str}`, trigger: 'blur'}
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
            isNeedSame() {
                console.log('sameId', this.sameGroupId);
                return !this.sameGroupId;
            },
        },
        watch:{
            sameId: {
                handler(curVal,oldVal){
                    this.sameGroupId = curVal;
                },
            },
        },
        mounted() {
            this.getDefaultData();
        }
    }

</script>

<style lang="scss">
    @import '~scss_vars';

    #queForm {
        .spec {
            .el-form-item__label {
                line-height: 50px;
            }
        }
    }

</style>