<template>
    <div>
    	<section v-show="!isShowDetail">
    		<my-filter :list="filterList" @callback="search"></my-filter>
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
                        <el-table-column type="index" label="序号" width="80">
                        </el-table-column>
                        <el-table-column prop="name" label="习题名称" min-width="160">
                            <template scope="scope">
                                <el-button type="text" @click="detailShow(scope.row.id)">{{scope.row.name}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="paperName" label="选择试卷" min-width="140">
                        </el-table-column>
                        <el-table-column prop="endTime" label="结束时间" min-width="120">
                        </el-table-column>
                        <el-table-column prop="previewClass" label="预习人员" min-width="120">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
    	</section>
        <section v-if="isShowDetail && exampleId">
            <example-detail :id="exampleId" @close="detailClose"></example-detail>
        </section>
    </div>
</template>
<script>
	import myFilter from '../../common/myFilter.vue'
    import Pagination from '../../common/Pagination.vue'
    import exampleDetail from './Detail.vue'
    export default {
        components:{
        	myFilter,
        	Page:Pagination,
            exampleDetail
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
                    title:'年级',
                    field:'grade',
                    children:[{
                        value:'2014',
                        text:'14级'
                    },{
                        value:'2015',
                        text:'15级'
                    },{
                        value:'2016',
                        text:'16级'
                    },{
                        value:'2017',
                        text:'17级'
                    }]
                },{
                    title:'状态',
                    field:'status',
                    children:[{
                        value:'unfinished',
                        text:'未结束'
                    },{
                        value:'finished',
                        text:'已结束'
                    }]
                }],
                papers: [{
                    id: '1',
                    name: '物理第一章预习',
                    paperName: '物理第一章',
                    endTime: '2017/12/10 8:00',
                    previewClass: '16级计算机3班'
                },{
                    id: '2',
                    name: '物理第一章预习',
                    paperName: '物理第一章',
                    endTime: '2017/12/10 8:00',
                    previewClass: '16级计算机3班'
                },{
                    id: '3',
                    name: '物理第一章预习',
                    paperName: '物理第一章',
                    endTime: '2017/12/10 8:00',
                    previewClass: '16级计算机3班'
                }],
                total: 10,
                currentPage: 1,
                pageSize:5,
                listLoading: false,
                isShowDetail: false,
                exampleId: ''
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
                this.exampleId = id;
            },
            detailClose(){
                this.isShowDetail = false;
                this.exampleId = '';
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
    .panel{
        &>.title{
            .el-input{
                width:280px;
            }
        }
        .content{
            min-height: 300px;
        }
        .pageArea{
            float: right;
            margin-top: 10px;
        }
    }
</style>
