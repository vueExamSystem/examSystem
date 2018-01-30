<template>
	<div>
        <section v-show="!isShowDetail">
    		<my-filter :list="filterList" @callback="search" :loading="filterLoading"></my-filter>
            <div class="panel">
                <div class="title">
                    <el-input placeholder="请输入搜索关键词" v-model="searchkey">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <div class="pageArea">
                        <Page :current="currentPage" :total="total" :pageSize="pageSize" @page-change="pageChange"></Page>
                    </div>
                    
                </div>
                <div class="content">
                    <el-table :data="papers" highlight-current-row v-loading="listLoading" style="width: 100%;">
                        <el-table-column type="index" label="序号" width="60">
                        </el-table-column>
                        <el-table-column prop="name" label="考试名称" min-width="140">
                            <template scope="scope">
                                <el-button type="text" @click="detailShow(scope.row.id)">{{scope.row.name}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="paper" label="选择试卷" min-width="140">
                        </el-table-column>
                        <el-table-column prop="testRange" label="考试时间" min-width="160">
                        </el-table-column>
                        <el-table-column prop="status" label="状态" min-width="100">
                            <template scope="scope">
                                <span v-if="scope.row.status==0">未开始</span>
                                <span v-if="scope.row.status==1">进行中</span>
                                <span v-if="scope.row.status==2">已结束</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="listener" label="监测老师" min-width="100">
                        </el-table-column>
                        <el-table-column prop="testClass" label="考试人员" min-width="100">
                        </el-table-column>
                        <el-table-column label="操作" min-width="60">
                            <template scope="scope">
                                <el-button type="primary" v-if="scope.row.status==0">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
    	</section>
        <section v-if="isShowDetail && testId">
            <test-detail :id="testId" @close="detailClose"></test-detail>
        </section>
    </div>
</template>
<script>
	import myFilter from '../../common/myFilter.vue'
    import Pagination from '../../common/Pagination.vue'
    import testDetail from './Detail.vue'
    export default {
        components:{
        	myFilter,
        	Page:Pagination,
            testDetail
        },
        data() {
            return {
                searchkey:'',
                filterList:[{
                    title:'课程',
                    field:'project',
                    children:[{
                        value:'hysics',
                        text:'大学物理'
                    },{
                        value:'mathematics',
                        text:'高等数学'
                    },{
                        value:'english',
                        text:'大学英语'
                    }]
                },{
                    title:'状态',
                    field:'status',
                    children:[{
                        value:'0',
                        text:'未开始'
                    },{
                        value:'1',
                        text:'进行中'
                    },{
                        value:'2',
                        text:'已结束'
                    }]
                }],
                papers: [{
                    id: '1',
                    name:'物理测试1',
                    paper:'物理期中试卷1',
                    testRange:'2018/01/01 8:00-8:20',
                    status:'1',
                    listener:'张老师',
                    testClass:'16级计算机3班',
                },{
                    id: '2',
                    name:'物理测试2',
                    paper:'物理期中试卷2',
                    testRange:'2018/01/01 10:00-10:20',
                    status:'0',
                    listener:'张老师',
                    testClass:'16级计算机3班',
                },{
                    id: '3',
                    name:'物理测试3',
                    paper:'物理期中试卷2',
                    testRange:'2018/01/01 10:00-10:20',
                    status:'2',
                    listener:'张老师',
                    testClass:'16级计算机3班',
                }],
                total: 10,
                currentPage: 1,
                pageSize:5,
                listLoading: false,
                isShowDetail: false,
                testId:''
            }
        },
        methods: {
            search(value){
                console.log('search',value);
            },
            pageChange(){

            },
            detailShow(id){
                this.isShowDetail = true;
                this.testId = id;
            },
            detailClose(){
                this.isShowDetail = false;
                this.testId = '';
            }
        },
        mounted() {

        }
    }
</script>
<style scoped lang="scss">
    @import '~scss_vars';
    .filter-wrap{
        margin-bottom: 20px;
    }
</style>
