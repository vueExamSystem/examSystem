<template>
    <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="试卷列表" name="paperlist">
            <List v-if="isReloadList"></List>
        </el-tab-pane>
        <el-tab-pane label="添加试卷" name="paperadd">
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
                activeName:'paperlist',
                isReloadList: true
            }
        },
        methods: {
           changeTab(tabName){//切换tab
                this.activeName = tabName;
                if(tabName == 'paperlist'){
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
