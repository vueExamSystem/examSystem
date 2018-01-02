<template>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="课程列表" name="list">
            <course-table></course-table>
        </el-tab-pane>
        <el-tab-pane label="添加课程" name="add">
            <course-add></course-add>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import courseTable from './Table.vue';
    import courseAdd from './Add.vue'
    export default {
        data() {
            return {
                activeName: 'list',
            }
        },
        components: {
            courseTable,
            courseAdd,
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