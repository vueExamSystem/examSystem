<template>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="标签列表" name="list">
            标签列表
        </el-tab-pane>
        <el-tab-pane label="添加标签" name="add">
            添加标签
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