<template>
    <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="试卷列表" name="paperlist">
           <my-filter :list="filterList" @callback="search"></my-filter>
           <div class="panel">
                <div class="title">
                    <el-input placeholder="请输入搜索关键词" v-model="searchkey">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
                <div class="content">
                    <el-table :data="papers" highlight-current-row v-loading="listLoading" style="width: 100%;">
                        <el-table-column type="index" label="序号" width="60">
                        </el-table-column>
                        <el-table-column prop="name" label="试卷名称" min-width="160">
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
        </el-tab-pane>
        <el-tab-pane label="添加试卷" name="paperadd">添加</el-tab-pane>
    </el-tabs>
</template>

<script>
    import myFilter from '../../common/myFilter.vue'
    import util from '../../../common/js/util'
    //import NProgress from 'nprogress'
    import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../../api/api';

    export default {
        components:{myFilter},
        data() {
            return {
                searchkey:'',
                activeName:'paperlist',
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
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
            }
        },
        methods: {
            search(value){
                console.log('search',value);
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
    .panel{
        margin: 20px 0 0;
        &>.title{
            padding:0 10px;
            .el-input{
                width:280px;
            }
        }
        .content{
            min-height: 300px;
        }
    }
</style>
