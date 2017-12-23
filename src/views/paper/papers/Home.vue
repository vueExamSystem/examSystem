<template>
    <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="试卷列表" name="paperlist">
           <my-filter :list="filterList" @callback="search"></my-filter>
        </el-tab-pane>
        <el-tab-pane label="添加试卷" name="paperadd">添加</el-tab-pane>
    </el-tabs>
</template>

<script>
    import myFilter from '../../common/myFilter.vue'
    console.log('Filter',myFilter)
    import util from '../../../common/js/util'
    //import NProgress from 'nprogress'
    import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../../api/api';

    export default {
        components:{myFilter},
        data() {
            return {
                msg:'000',
                activeName:'paperlist',
                isOpen:0,
                filterList:[{
                    title:'课程',
                    field:'project',
                    isCheckedAll:1,
                    children:[{
                        value:'hysics',
                        text:'大学物理'
                    },{
                        value:'mathematics',
                        text:'高等数学',
                        isChecked:1
                    },{
                        value:'english',
                        text:'大学英语',
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
                users: [],
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
            toggleCheck(e){
                var $element = $(e.currentTarget);
                var $row = $element.closest('.filter-row');
                var role = $element.attr('role');
                var field = $row.attr('field');
                if(role == 'all'){
                    if($element.hasClass('checked')){
                        return;
                    }else{
                        $element.addClass('checked');
                        $row.find('[role="item"]').removeClass('checked');
                        this.$delete(this.$data.filters,field);
                    }
                }else{
                    $element.toggleClass('checked');
                }
                
           }
        },
        mounted() {

        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>
