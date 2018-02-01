<template>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="标签列表" name="list">
            <tag-table ref="tagTable"></tag-table>
        </el-tab-pane>
        <el-tab-pane label="添加标签" name="add">
            <tag-add @toTable="toTable"></tag-add>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import tagTable from './Table.vue';
    import tagAdd from './Add.vue'
    export default {
        data() {
            return {
                activeName: 'list',
            }
        },
        components: {
            tagTable,
            tagAdd,
        },
        methods: {
            handleClick(tab, event){
                console.log('tab',tab,event);
            },
            toTable() {
                this.activeName = 'list';
                this.$refs.tagTable.getList();
            },
        },
        mounted() {

        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>