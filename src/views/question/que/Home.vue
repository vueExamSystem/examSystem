<template>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="试题列表" name="list">
            <que-table></que-table>
        </el-tab-pane>
        <el-tab-pane label="添加试题" name="add">
            <que-add></que-add>
        </el-tab-pane>
        <el-tab-pane label="导入试题" name="import">
            导入试题
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import table from './Table.vue';
    import add from './Add.vue'
    export default {
        data() {
            return {
                activeName: 'list',
            }
        },
        components: {
            'que-table': table,
            'que-add': add,
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