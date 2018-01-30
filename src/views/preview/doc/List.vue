<template>
	<div>
        <section v-show="!isShowDetail">
    		<my-filter :list="filterList" @callback="search" v-loading="filterLoading"></my-filter>
            <div class="panel">
                <div class="title">
                    <el-input placeholder="请输入搜索关键词" v-model="keyword">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <div class="pageArea">
                        <Page :current="currentPage" :total="total" :pageSize="pageSize" @page-change="pageChange"></Page>
                    </div>
                    
                </div>
                <div class="content">
                    <el-table :data="papers" highlight-current-row v-loading="listLoading" style="width: 100%;">
                        <el-table-column type="index" label="序号" width="100">
                        </el-table-column>
                        <el-table-column prop="name" label="资料名称" min-width="160">
                            <template scope="scope">
                                <el-button type="text" @click="detailShow(scope.row.id)">{{scope.row.name}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="project" label="所属课程" min-width="160">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
    	</section>
        <section v-if="isShowDetail && docId">
            <doc-detail :id="docId" @close="detailClose"></doc-detail>
        </section>
    </div>
</template>
<script>
	import myFilter from '../../common/myFilter.vue'
    import Pagination from '../../common/Pagination.vue'
    import docDetail from './Detail.vue'
    export default {
        components:{
        	myFilter,
        	Page:Pagination,
            docDetail
        },
        data() {
            return {
                keyword:'',
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
                }],
                papers: [{
                    id: '1',
                    name:'物理期中考试',
                    project:'大学物理'
                },{
                    id: '2',
                    name:'物理期中考试',
                    project:'大学物理'
                },{
                    id: '3',
                    name:'物理期中考试',
                    project:'大学物理'
                }],
                total: 10,
                currentPage: 1,
                pageSize:5,
                listLoading: false,
                isShowDetail: false,
                docId:''
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
                this.docId = id;
            },
            detailClose(){
                this.isShowDetail = false;
                this.docId = '';
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
