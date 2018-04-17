<template>
    <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="练习题列表" name="exerciselist">
            <List v-if="isReloadList"></List>
        </el-tab-pane>
        <el-tab-pane label="添加练习题" name="exerciseadd">
            <add-form @changetab="changeTab"></add-form>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import List from './List.vue'
    import Add from './Add.vue'
    export default {
        components:{
            List,
            addForm:Add
        },
        data() {
            return {
                activeName:'exerciselist',
                isReloadList: true
            }
        },
        methods: {
           changeTab(tabName){//切换tab
                this.activeName = tabName;
                if(tabName == 'exerciselist'){
                    this.reLoadList();
                }
           },
           reLoadList(){//刷新列表
                this.isReloadList = false;
                setTimeout(() => {
                    this.isReloadList = true;
                },10);
           }
        },
        mounted() {

        }
    }
</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>
