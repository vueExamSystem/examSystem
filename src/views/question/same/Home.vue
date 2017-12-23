<template>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="题组列表" name="list">
            题组列表
        </el-tab-pane>
        <el-tab-pane label="添加题组" name="add">
            添加题组
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        data() {
            return {
                activeName: 'list',
            }
        },
        components: {
        },
        methods: {
            handleClick(tab, event){
                console.log('tab',tab,event);
            },
        },
        mounted() {

        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>