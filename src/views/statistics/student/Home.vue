<template>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="统计分析" name="list">
            <depart-table></depart-table>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import departTable from './Table.vue';
    export default {
        data() {
            return {
                activeName: 'list',
            }
        },
        components: {
            departTable,
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