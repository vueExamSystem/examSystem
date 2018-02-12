<template>
	<div>
        <section v-show="!detailId" v-loading="allLoading">
    		<my-filter v-if="filterList.length > 0" :list="filterList" @callback="search" v-loading="filterLoading"></my-filter>
            <div class="panel">
                <div class="title">
                    <el-input placeholder="请输入搜索关键词" v-model="keyword">
                        <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
                    </el-input>
                    <div class="pageArea">
                        <Page :pageNo="pageNo" :totalCount="totalCount" :pageSize="pageSize" @page-change="handleCurrentChange"></Page>
                    </div>
                    
                </div>
                <div class="content">
                    <el-table :data="rows" highlight-current-row v-loading="listLoading" style="width: 100%;">
                        <el-table-column type="index" label="序号" width="100">
                        </el-table-column>
                        <el-table-column prop="name" label="考试名称">
                            <template scope="scope">
                                <el-button type="text" @click="detailShow(scope.row.id)">{{scope.row.name}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="paper" label="选择试卷" >
                            <template slot-scope="scope">
                                <span v-if="scope.row.paper">{{scope.row.paper.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="testRange" label="考试时间">
                        </el-table-column>
                        <el-table-column prop="status" label="状态">
                        </el-table-column>
                        <el-table-column prop="listener" label="监考老师">
                            <template slot-scope="scope">
                                <span v-if="scope.row.listener">{{scope.row.listener.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="testClass" label="考试人员">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="100">
                            <template slot-scope="scope">
                                <el-button type="danger" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <!--编辑界面-->
            <el-dialog title="编辑课程" :visible.sync="editFormVisible" class="noPadding">
                <exam-add v-if="formObj" @toTable="getList" :formObj="formObj" ref="editForm"></exam-add>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="editFormVisible = false; formObj = {};">取消</el-button>
                    <el-button type="primary" @click.native="editSubmit" v-loading="editLoading">提交</el-button>
                </div>
            </el-dialog>
    	</section>
        <section v-if="detailId">
            <detail :id="detailId" @close="detailClose"></detail>
        </section>
    </div>
</template>
<script>
	import myFilter from '../../common/myFilter.vue'
    import {getClassTestList, getClassTestFilter, addDemo } from '../../../api/api';
    import Pagination from '../../common/Pagination.vue';
    import _ from 'lodash';
    import detail from './Detail.vue'
    import examAdd from '../publish/Add.vue'
    export default {
        components:{
        	myFilter,
        	Page:Pagination,
            detail,
            examAdd,
        },
        data() {
            return {
                filterList:[],
                keyword: '',
                filter: {},
                rows: [],
                totalCount: 0,
                pageNo: 1,
                pageSize: 10,
                listLoading: false,
                filterLoading: false,
                allLoading: false,

                detailId: '',

                formObj: {},
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
            }
        },
        methods: {
            //显示编辑界面
            handleEdit: function (row) {
                this.editFormVisible = true;
                this.formObj = _.assign({}, row, {
                    test: row.test ? row.test.id : '',
                    grade: row.grade ? row.grade.id : '',
                    department: row.department ? row.department.id : '',
                    class: row.class ? row.class.id : '',
                    listeners: row.listeners ? row.listeners.id : '',
                });
                console.log('this.formObj', this.formObj);
                // this.$refs.editForm.resetForm('form');

            },
            //编辑
            editSubmit() {
                this.$refs.editForm.onSubmit('form');
            },
            detailShow(id) {
                this.detailId = id;
            },
            detailClose() {
                this.detailId = '';
            },
            handleCurrentChange(val) {
                this.pageNo = val;
                this.getUsers();
            },
            search(obj) {
                this.filter = obj;
                this.getList();
            },
            //获取用户列表
            getList() {
                let para = {
                    pageNo: this.pageNo,
                    filter: JSON.stringify(this.filter),
                    keyword: this.keyword,
                    pageSize: this.pageSize,
                };
                if (!this.allLoading) this.listLoading = true;
                getClassTestList(para).then((res) => {
                    res = res.data;
                    this.totalCount = res.totalCount;
                    this.rows = res.rows;

                    if (!this.allLoading) this.listLoading = false;
                    if (this.allLoading) this.allLoading = false;
                });
            },
            // 获取过滤器数据
            getFilter() {
                this.allLoading = true;
                getClassTestFilter({}).then((res) => {
                    this.filterList = res.data;
                    this.getList();
                });
            },
        },
        mounted() {
            this.getFilter();
        }
    }
</script>
<style scoped lang="scss">
    @import '~scss_vars';
    .filter-wrap{
        margin-bottom: 20px;
    }
</style>
