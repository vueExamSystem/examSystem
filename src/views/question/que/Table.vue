<template>
    <section>
        <div v-if="!detailId">
            <my-filter :list="filterList" @callback="search" v-loading="filterLoading" @linkage="linkage"></my-filter>
            <div class="panel">
                <div class="title">
                    <el-input placeholder="请输入搜索关键词" v-model="keyword">
                        <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
                    </el-input>

                    <!--分页-->
                    <div class="pageArea">
                        <Page :pageNo="pageNo" :totalCount="totalCount" :pageSize="pageSize" @page-change="handleCurrentChange"></Page>
                    </div>

                </div>

                <div class="content">
                    <!--列表-->
                    <el-table
                            :data="rows"
                            highlight-current-row
                            v-loading="listLoading"
                            style="width: 100%;">
                        <el-table-column type="index" label="ID" sortable>
                        </el-table-column>
                        <el-table-column prop="name" label="试题名称" sortable>
                            <template slot-scope="scope">
                                <a href="javascript:void(0);" @click="detailShow(scope.row.id)">{{scope.row.name}}</a>
                            </template>
                        </el-table-column>
                        <el-table-column prop="questionType" label="试题类型" sortable>
                        </el-table-column>
                        <el-table-column prop="course" label="所属课程" sortable>
                            <template slot-scope="scope">
                                <span v-if="scope.row.course">{{scope.row.course.name}}</span>
                            </template> 
                        </el-table-column>
                        <el-table-column prop="section" label="所属章节" sortable>
                            <template slot-scope="scope">
                                <span v-if="scope.row.section">{{scope.row.section.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="similarName" label="相似题组" sortable>
                        </el-table-column>
                        <el-table-column prop="creator" label="创建人" sortable>
                        </el-table-column>
                           <el-table-column label="操作" >
                            <template scope="scope">
                                <el-button type="primary" @click="showCopy(scope.$index, scope.row)">复制</el-button>
                                <el-button type="danger" @click="handleDel(scope.$index, scope.row)" :disabled="!isRowRemoveable(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>                   
                    </el-table>
                <div class="panel">
                <div class="title">
                      <div class="pageArea">
                        <Page :pageNo="pageNo" :totalCount="totalCount" :pageSize="pageSize" @page-change="handleCurrentChange"></Page>
                     </div></div></div>
                </div>
            </div>
             <!--复制界面-->
                <el-dialog title="复制试题" :visible.sync="copyFormVisible">
                    <el-form :model="copyForm" label-width="80px" :rules="copyFormRules" ref="copyForm" :inline-message="isInlineMessage" v-loading="copyLoading">
                        <el-form-item label="试题名称" prop="name">
                            <el-input v-model="copyForm.name"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click.native="hideCopy">取消</el-button>
                        <el-button type="primary" @click.native="copySubmit">提交</el-button>
                    </div>
                </el-dialog>
        </div>

        <section v-if="detailId">
            <question-detail :id="detailId" @close="detailClose"></question-detail>
        </section>
    </section>
</template>

<script>
    import u from '../../../common/js/util';
    import _ from 'lodash';
    import {getQueList, getQuestionFilter, getSectionFilter,copyQuestion,deleteQuestion} from '../../../api/api';
    import myFilter from '../../common/myFilter.vue'
    import Pagination from '../../common/Pagination.vue'
    import questionDetail from './Detail.vue'

    export default {
        data() {
            return {
                keyword: '',
                filter: {},
                rows: [],
                totalCount: 0,
                pageNo: 1,
                pageSize: 10,
                listLoading: false,

                filterLoading: false,
                filterList: [],

                detailId: '',
                copyFormRules: {
                    name: [
                        { required: true, message: '请填写试卷名称', trigger: 'blur' }
                    ]
                },
                isInlineMessage: true,
                copyFormVisible: false,
                copyLoading: false,
                copyForm:{
                    id:-1,
                    name:''
                },
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.pageNo = val;
                this.getList();
            },
            search(obj) {
                this.filter = obj;this.pageNo = 1;
                this.getList();
            },
            //行是否可删除
            isRowRemoveable(row){
                //试题为初始化状态
                var isAble = true;
                if(row.status != '0'){
                    isAble = false;
                }
                return isAble;
            },
            handleDel(index, row){//删除试卷
                this.$confirm('确定删除该试题吗？','提示',{
                    confirmButtonText: '确定'
                }).then(res => {
                    this.listLoading = true;
                    var params = {
                        questionId: row.id//试卷id
                    };
                    deleteQuestion(params).then(res => {
                        if(res.code == '0'){
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                            this.pageNo = 1;
                            this.getList();
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.msg
                            });
                        }
                    });
                }).catch(res => {});
            },
            showCopy(index, row) {//编辑
                this.copyFormVisible = true;
                this.copyForm.id = row.id;
                this.copyForm.name = row.name;
            },
             hideCopy(){
                this.copyFormVisible = false;
            },
            //复制
            copySubmit: function () {
                this.$refs.copyForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认复制试题吗？', '提示', {}).then(res => {
                            this.copyLoading = true;
                            //let para = _.assign({}, this.copyForm);
                            let para={
                                questionId:this.copyForm.id,
                                questionName:this.copyForm.name
                            };
                            copyQuestion(para).then((res) => {
                                this.copyLoading = false;
                                if(res.code===0){
                                this.$message({
                                    message: '复制成功',
                                    type: 'success'
                                });
                                this.$refs['copyForm'].resetFields();
                                this.copyFormVisible = false;
                                 this.pageNo = 1;
                                this.getList();
                            }
                            else{
                                this.copyLoading = false;
                                    this.$message({
                                    message: res.msg,
                                    type: 'error'
                                });
                                }
                            });
                        }).catch(res=>{});
                    }
                });
            },
            //获取用户列表
            getList() {
                if (_.isEmpty(this.filter)) return;
                let para = {
                    pageNo: this.pageNo,
                    filter: JSON.stringify(this.filter),
                    pageSize: this.pageSize,
                    keyword: this.keyword,
                };
                if (!this.listLoading) this.listLoading = true;
                getQueList(para).then((res) => {
                    res=res.data;
                    this.totalCount = res.totalCount;
                    this.rows = res.rows;
                    if (!this.filterLoading) this.listLoading = false;
                });
            },
            // 获取过滤器数据
            getFilter() {
                this.filterLoading = true;
                this.listLoading = true;
                getQuestionFilter({}).then((res) => {
                    res=res.data;
                    this.filterList = res;
                    this.filterLoading = false;
                    // 过滤器数据增加联动判断字段
                    this.dealFilterList();
                    // filter 对应key默认好 -1
                    this.filter = u.getDefaultFilter(this.filterList);
                    // get table list
                    this.getList();
                });
            },
            // 处理过滤器数据
            dealFilterList() {
                const index = _.findIndex(this.filterList, { field: 'course' });
                if (index > -1) {
                    this.filterList[index].isLinkage = true;
                }
            },
            // 联动处理数据
            linkage(field, value) {
                const ts = this;
                // 课程联动
                if (field === 'course') {
                    if (value === -1) {
                        const index = _.findIndex(ts.filterList, { field: 'section' });
                        ts.filterList.splice(index, 1);
                        return;
                    }
                    this.filterLoading = true;
                    getSectionFilter({
                        filter:"{courseid: "+value+"}"
                    }).then(res => {
                        res=res.data;
                        this.filterLoading = false;
                        const index = _.findIndex(ts.filterList, { field: res.field });
                        //console.log('index', index);
                        if (index > -1) {
                            // ts.filterList[index] = res;
                            ts.filterList.splice(1, 1, res);
                        } else {
                            ts.filterList.splice(1, 0, res);
                        }
                    });
                }
            },
            detailShow(id){
                this.detailId =id;
            },
            detailClose(){
                this.detailId = '';
            }
        },
        watch:{
            filterList: {
                handler(curVal,oldVal){
                    const index = _.findIndex(this.filterList, { field: 'section' });
                    if (index > 0 && (this.filter.course === -1 || !this.filter.course)) {
                        const index = _.findIndex(this.filterList, { field: 'section' });
                        this.filterList.splice(index, 1);
                    }
                },
                deep:true
            },
            filter: {
                handler(curVal,oldVal){
                    if (curVal.course === -1) {
                        const index = _.findIndex(this.filterList, { field: 'section' });
                        if (index > -1) {
                            this.filterList.splice(index, 1);
                        }
                    }
                },
                deep:true
            }
        },
        computed: {
            isShowDetail() {
                return this.detailId;
            },
        },
        components: {
            'Page': Pagination,
            myFilter,
            questionDetail,
        },
        mounted() {
            this.getFilter();
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>