<template>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="选课管理" name="list">
            <course-table></course-table>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import courseTable from './Table.vue';
    export default {
        data() {
            return {
                activeName: 'list',
            }
        },
        components: {
            courseTable,
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