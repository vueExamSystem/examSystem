<template>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="登录日志" name="list">
            <log-table></log-table>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import logTable from './Table.vue';
    export default {
        data() {
            return {
                activeName: 'list',
            }
        },
        components: {
            logTable,
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