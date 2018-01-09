<template>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="角色管理" name="list">
            <alert-table></alert-table>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import alertTable from './Table.vue';
    export default {
        data() {
            return {
                activeName: 'list',
            }
        },
        components: {
            alertTable,
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