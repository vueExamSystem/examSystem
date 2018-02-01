<template>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="试题章节" name="list">
            <chapter-table ref="chapterTable"></chapter-table>
        </el-tab-pane>
        <el-tab-pane label="添加章节" name="add">
            <chapter-add @toTable="toTable"></chapter-add>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import chapterTable from './Table.vue';
    import chapterAdd from './Add.vue'
    export default {
        data() {
            return {
                activeName: 'list',
            }
        },
        components: {
            chapterTable,
            chapterAdd,
        },
        methods: {
            handleClick(tab, event){
            },
            toTable() {
                this.activeName = 'list';
                this.$refs.chapterTable.getList();
            },
        },
        mounted() {

        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>