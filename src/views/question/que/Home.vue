<template>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="试题列表" name="list">
            <que-table ref="questionTable"></que-table>
        </el-tab-pane>
        <el-tab-pane label="添加试题" name="add">
            <que-add @toTable="toTable"></que-add>
        </el-tab-pane>
<!--         <el-tab-pane label="导入试题" name="import">
            <que-import @toTable="toTable"></que-import>
        </el-tab-pane> -->
    </el-tabs>
</template>

<script>
    import queTable from './Table.vue';
    import queAdd from './Add.vue'
    import queImport from './Import.vue'
    export default {
        data() {
            return {
                activeName: 'list',
            }
        },
        components: {
            queTable,
            queAdd,
            queImport,
        },
        methods: {
            handleClick(tab, event){
                //console.log('tab',tab,event);
            },
            toTable() {
                this.activeName = 'list';
                this.$refs.questionTable.getList();
            },
        },
        mounted() {

        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>