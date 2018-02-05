<template>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="题组列表" name="list">
            <same-table ref="sameTable"></same-table>
        </el-tab-pane>
        <el-tab-pane label="添加题组" name="add">
            <same-add @toTable="toTable"></same-add>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import sameTable from './Table.vue';
    import sameAdd from './Add.vue'
    export default {
        data() {
            return {
                activeName: 'list',
            }
        },
        components: {
            sameTable,
            sameAdd,
        },
        methods: {
            handleClick(tab, event){
                console.log('tab',tab,event);
            },
            toTable() {
                this.activeName = 'list';
                this.$refs.sameTable.getList();
            },
        },
        mounted() {

        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>