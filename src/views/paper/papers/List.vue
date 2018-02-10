<template>
    <div>
        <section v-show="!isShowDetail">
            <div v-loading="filterLoading" style="min-height:100px;">
                <my-filter v-if="!filterLoading" :list="filterList" @callback="filterCallback"></my-filter>
            </div>
            <div class="panel">
                <div class="title">
                    <el-input placeholder="请输入搜索关键词" v-model="keyword">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                    <div class="pageArea">
                        <Page :pageNo="pageNo" :totalCount="totalCount" :pageSize="pageSize" @page-change="pageChange"></Page>
                    </div>
                </div>
                <div class="content">
                    <el-table :data="papers" highlight-current-row v-loading="listLoading" style="width: 100%;">
                        <el-table-column type="index" label="序号" width="60">
                        </el-table-column>
                        <el-table-column prop="remark" label="试卷名称" min-width="160">
                            <template scope="scope">
                                <el-button type="text" @click="detailShow(scope.row.id)">{{scope.row.remark}}</el-button>
                                <!-- <el-button type="text" @click="detailShow(scope.row.id, scope.row.name)">{{scope.row.name}}</el-button> -->
                            </template>
                        </el-table-column>
                        <el-table-column prop="duration" label="时长(min)" min-width="100">
                        </el-table-column>
                       <el-table-column prop="course" label="学科" sortable>
                                            <template slot-scope="scope">
                        <span v-if="scope.row.course">{{scope.row.course.name}}</span>
                      </template>   
                    </el-table-column>
                        <el-table-column prop="paperType" label="类别" min-width="100">
                        </el-table-column>
                        <el-table-column prop="status" label="状态" min-width="100" :formatter="formatStatus">
                        </el-table-column>
                        <el-table-column prop="creator" label="创建人" min-width="100">
                        </el-table-column>
                        <el-table-column label="操作" width="150">
                            <template scope="scope">
                                <el-button type="primary" @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.status!='0'">编辑</el-button>
                                <el-button type="danger" @click="handleDel(scope.$index, scope.row)" :disabled="scope.row.status!='0'">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </section>
        <section v-if="isShowDetail && detailPaperId">
            <paper-detail :id="detailPaperId" :name="detailPaperName" @close="detailClose"></paper-detail>
        </section>
    </div>
</template>

<script>
    import u from '../../../common/js/util';
    import { getPaperFilter, getPaperList } from '../../../api/api';
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
                listLoading: true,
                filterLoading: true,
                filter:[],
                filterList: [],
                isShowDetail: false,
                detailPaperId: '',
                detailPaperName: ''
            }
        },
        methods: {
            // 获取过滤器数据
            getFilter() {
                this.filterLoading = true;
                this.listLoading = true;
     getPaperFilter({}).then((res) => {
                    this.filterList = res.data;console.log('getPaperFilter',res)
                    this.filterLoading = false;
                    // filter 对应key默认好 -1
                    this.filter = u.getDefaultFilter(this.filterList);
                });
            },
            search(){
                if(!this.filterLoading){console.log('search')
                    this.listLoading = true;
                    var params = {
                        keyword: this.keyword,
                        filter: JSON.stringify(this.filter),
                        pageNo: this.pageNo,
                        pageSize: this.pageSize
                    };
                    getPaperList(params).then(res => {
                        this.papers = res.data.rows;
                        this.totalCount = res.data.totalCount;
                        this.listLoading = false;
                    });
                }
            },
            filterCallback(filter){
                if(!this.filterLoading){
                    console.log('filterCallback')
                    this.filter = filter;
                    this.search();
                }
            },
            pageChange(pageNo){
                this.pageNo = pageNo;
                this.search();
            },
            formatStatus(row, column){
                if(row.status == '0'){
                    return '未开始';
                }else if(row.status == '1'){
                    return '考试中'
                }else if(row.status == '2'){
                    return '已完成'
                }else{
                    return '已删除'
                }
            },
            detailShow(id, name){
                this.isShowDetail = true;
                this.detailPaperId = id.toString();
                this.detailPaperName = name;
            },
            detailClose(){
                this.isShowDetail = false;
                this.detailPaperId = '';
                this.detailPaperName = '';
            }
           
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
