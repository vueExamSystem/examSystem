<template>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="数据监控" name="list">
            <chart-table></chart-table>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import chartTable from './Table.vue';
    export default {
        data() {
            return {
                activeName: 'list',
            }
        },
        components: {
            chartTable,
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