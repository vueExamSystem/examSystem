<template>
    <div v-loading="!isInited" style="min-height:300px;">
        <section v-show="!isShowDetail">
            <my-filter v-show="isInited" v-if="isFilterInited" :list="filterList" @callback="filterCallback"></my-filter>
            <div class="panel" v-if="isInited">
                <div class="title">
                    <el-input placeholder="请输入搜索关键词" v-model="keyword" @change="searchClick">
                        <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
                    </el-input>
                    <div class="pageArea">
                        <Page v-if="!isNewPage" :pageNo="pageNo" :totalCount="totalCount" :pageSize="pageSize" @page-change="pageChange"></Page>
                    </div>
                </div>
                <div class="content">
                    <el-table :data="papers" highlight-current-row v-loading="listLoading" style="width: 100%;">
                        <el-table-column type="index" label="序号" width="60">
                        </el-table-column>
                        <el-table-column prop="name" label="测验名称" min-width="100">
                            <template scope="scope">
                                <el-button type="text" @click="detailShow(scope.row)">{{scope.row.name}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="duration" label="时长(min)" min-width="50">
                        </el-table-column>
<!--                         <el-table-column prop="project" label="所属课程" min-width="120">
                        </el-table-column> -->
                        <el-table-column prop="course" label="所属课程">
                         <template slot-scope="scope">
                         <span v-if="scope.row.course">{{scope.row.course.name}}</span>
                         </template> 
                         </el-table-column>
                          <el-table-column prop="sections" label="所属章节">
                         </el-table-column>
                        <el-table-column prop="category" label="类别" min-width="100" :formatter="formatCategory">
                        </el-table-column>
                        <el-table-column prop="status" label="状态" min-width="100">
                            <template scope="scope">
                                <span class="text-warning" v-if="scope.row.status == '1'">未启用</span>
                                <span class="text-success" v-else-if="scope.row.status == '2'">启用中</span>
                                <span v-else>初始化</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="creator" label="创建人" min-width="100">
                        </el-table-column>
                        <el-table-column label="操作" width="150">
                            <template scope="scope">
                                <el-button type="primary" @click="showEdit(scope.$index, scope.row)" :disabled="!isRowEditable(scope.row)">编辑</el-button>
                                <el-button type="danger" @click="handleDel(scope.$index, scope.row)" :disabled="!isRowRemoveable(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <!--编辑界面-->
                <el-dialog title="编辑试卷" :visible.sync="editFormVisible">
                    <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm" :inline-message="isInlineMessage" v-loading="editLoading">
                        <el-form-item label="试卷名称" prop="name">
                            <el-input v-model="editForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="所属课程" prop="project"> 
                            <el-select v-model="editForm.project" placeholder="请选择科目">
                                <el-option :loading="subjectLoading" 
                                  v-for="item in subjectOptions"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="测验时长" prop="duration">
                            <el-input v-model="editForm.duration"></el-input>
                            <span class="text-primary" style="margin-left:12px;">*单位分钟</span>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click.native="hideEdit">取消</el-button>
                        <el-button type="primary" @click.native="editSubmit">提交</el-button>
                    </div>
                </el-dialog>
            </div>
        </section>
        <section v-if="isShowDetail && detailPaperId">
            <paper-detail :id="detailPaperId" :info="detailPaperInfo" @close="detailClose"></paper-detail>
        </section>
    </div>
</template>

<script>
    import u from '../../../common/js/util';
    import { getSubjectList, getTestFilter, getTestList, eidtTest, removeTest } from '../../../api/api';
    import myFilter from '../../common/myFilter.vue'
    import Pagination from '../../common/Pagination.vue'
    import Detail from './Detail.vue'
    
    export default {
        components:{
            myFilter,
            Page:Pagination,
            paperDetail:Detail
        },
        data() {
            return {
                keyword:'',
                papers: [],
                totalCount: 0,
                pageNo: 1,
                pageSize:10,
                isInited: false,//是否初始化好
                isFilterInited: false,//过滤器是否初始化好
                isNewPage: true,//是否新分页
                listLoading: true,
                filter:[],
                filterList: [],
                editFormVisible: false,
                editLoading: false,
                isInlineMessage: true,
                editFormRules: {
                    name: [
                        { required: true, message: '请填写试卷名称', trigger: 'blur' }
                    ],
                    duration: [
                        {required: true, message: '请输入时长', trigger:'change'},
                        {pattern: '^\\d+$', message: '请输入整数', trigger:'change'}
                    ],
                    project: [
                        { required: true, message: '请选择科目', trigger: 'blur' }
                    ]
                },
                //编辑界面数据
                editForm: {
                    id: -1,
                    name: '',
                    duration: '',
                    project: ''
                },
                subjectLoading: true,
                subjectOptions: [],//科目组
                isShowDetail: false,
                detailPaperId: '',
                detailPaperInfo: ''
            }
        },
        computed:{
            userName(){
                return this.$store.getters.userName;
            }
        },
        methods: {
            // 获取过滤器数据
            getFilter() {
                this.isInited = false;
                this.listLoading = true;
                getTestFilter({}).then((res) => {
                    this.filterList = res.data;
                    // filter 对应key默认好 -1
                    this.filter = u.getDefaultFilter(this.filterList);
                    this.isFilterInited = true;
                    this.search();
                });
            },
            getSubjectOptions(){//获取科目组
                this.subjectLoading = true;
                getSubjectList({}).then(res => {
                    this.subjectOptions = res.data;
                    this.subjectLoading = false;
                });
            },
            search(){
                this.listLoading = true;
                var params = {
                    keyword: this.keyword,
                    filter: JSON.stringify(this.filter),
                    pageNo: this.pageNo,
                    pageSize: this.pageSize
                };
                getTestList(params).then(res => {
                    this.papers = res.data.rows;
                    this.totalCount = res.data.totalCount;
                    this.isNewPage = false;
                    this.listLoading = false;
                    this.isInited = true;
                });
            },
            searchClick(){
                this.isNewPage = true;
                this.pageNo = 1;
                this.search();
            },
            filterCallback(filter){
                this.filter = filter;
                this.isNewPage = true;
                this.pageNo = 1;
                this.search();
            },
            pageChange(pageNo){
                this.pageNo = pageNo;
                this.search();
            },
            // formatStatus(row, column){
            //     // 0：初始化
            //     // 1：未启用
            //     // 2: 启用
            //     if(row.status == '1'){//没有数据关联
            //         return '未启用';
            //     } else if(row.status == '2'){//有试题关联
            //         return '启用中';
            //     } else {
            //         return '初始化';
            //     }
            // },
            formatCategory(row, column){
                if(row.createType == '1'){
                    return '随机组卷';
                }else{
                    return '手动组卷';
                }
            },
            detailShow(row){
                //console.log('row',row)
                this.isShowDetail = true;
                this.detailPaperId = row.id;
                this.detailPaperInfo = row;
            },
            detailClose({refresh}){//取消试卷详情查看
                this.isShowDetail = false;
                this.detailPaperId = '';
                this.detailPaperInfo = '';
                if(refresh){
                    this.isNewPage = true;
                    this.pageNo = 1;
                    this.search();
                }
            },
            //显示编辑界面
            showEdit(index, row) {//编辑
                this.editFormVisible = true;
                this.editForm.id = row.id;
                this.editForm.name = row.name;
                this.editForm.duration = row.duration;
                this.editForm.project = row.project;
            },
            hideEdit(){
                this.editFormVisible = false;
            },
            handleDel(index, row){//删除试卷
                this.$confirm('确定删除该试卷吗？','提示',{
                    confirmButtonText: '确定删除'
                }).then(res => {
                    this.listLoading = true;
                    var params = {
                        paperId: row.id//试卷id
                    };
                    removeTest(params).then(res => {
                        if(res.code == '0'){
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                            this.isNewPage = true;
                            this.pageNo = 1;
                            this.search();
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.msg
                            });
                        }
                    });
                }).catch(res => {});
            },
            //行是否可编辑
            isRowEditable(row){
                var isEditAble = true;
                //当前用户与创建人一致
                //试卷初始化或未启用状态row.creator != this.userName || 
                if((row.status != '0' && row.status != '1')){
                    isEditAble = false;
                }
                return isEditAble;
            },
            //行是否可删除
            isRowRemoveable(row){
                //当前用户与创建人一致
                //试卷为初始化状态
                //试卷组卷模型为手动
                var isAble = true;
                if(row.creator != this.userName || row.status != '0' || row.category != '2'){
                    isAble = false;
                }
                return isAble;
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(res => {
                            this.editLoading = true;
                            let para = _.assign({}, this.editForm);
                            eidtTest(para).then((res) => {
                                this.editLoading = false;
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.search();
                            });
                        }).catch(res=>{});
                    }
                });
            }
        },
        mounted() {
            this.getFilter();
            this.getSubjectOptions();
        }
    }
</script>
<style scoped lang="scss">
    @import '~scss_vars';
    .filter-wrap{
        margin-bottom: 20px;
    }
</style>
