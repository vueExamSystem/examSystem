<template>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="院系班级" name="list">
            <log-table></log-table>
        </el-tab-pane>
        <el-tab-pane label="添加学生" name="add">
            <log-table></log-table>
        </el-tab-pane>
        <el-tab-pane label="导入学生" name="import">
            <log-table></log-table>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import studentTable from './Table.vue';
    import studentAdd from './Add.vue';
    import studentImport from './Import.vue';

    export default {
        data() {
            return {
                activeName: 'list',
            }
        },
        components: {
            studentTable,
            studentAdd,
            studentImport,
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