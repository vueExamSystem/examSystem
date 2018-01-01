<template>
	<section>
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
                    <el-table-column type="index" label="序号" width="60">
                    </el-table-column>
                    <el-table-column prop="name" label="练习题名称" min-width="160">
                        <template scope="scope">
                            <router-link to="/">{{scope.row.name}}</router-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="time" label="时长(min)" min-width="100">
                    </el-table-column>
                    <el-table-column prop="project" label="所属课程" min-width="120">
                    </el-table-column>
                    <el-table-column prop="category" label="类别" min-width="100">
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
</template>
<script>
	import myFilter from '../../common/myFilter.vue'
    import Pagination from '../../common/Pagination.vue'
    export default {
        components:{
        	myFilter,
        	Page:Pagination
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
                    title:'类别',
                    field:'category',
                    children:[{
                        value:'random',
                        text:'随机组卷'
                    },{
                        value:'manual',
                        text:'手动组卷'
                    }]
                },{
                    title:'状态',
                    field:'status',
                    children:[{
                        value:'doing',
                        text:'未完成'
                    },{
                        value:'done',
                        text:'已完成'
                    }]
                }],
                papers: [{
                    name:'物理期中考试',
                    time:'60',
                    project:'大学物理',
                    category:'随机',
                    status:'0',
                    creator:'admin'
                },{
                    name:'物理期中考试',
                    time:'60',
                    project:'大学物理',
                    category:'随机',
                    status:'1',
                    creator:'admin'
                },{
                    name:'物理期中考试',
                    time:'60',
                    project:'大学物理',
                    category:'随机',
                    status:'2',
                    creator:'admin'
                }],
                total: 10,
                currentPage: 1,
                pageSize:5,
                listLoading: false
            }
        },
        methods: {
            search(value){
                console.log('search',value);
            },
            pageChange(){

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
