<template>
    <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="资料列表" name="list">
            <List ref="table"></List>
        </el-tab-pane>
        <el-tab-pane label="添加资料" name="add">
            <add-form @toTable="toTable"></add-form>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import List from './List.vue'
    import Add from './Add.vue'
    export default {
        components:{
            List,
            addForm:Add
        },
        data() {
            return {
                activeName:'list',
            }
        },
        methods: {
            toTable() {
                this.activeName = 'list';
                this.$refs.table.getList();
            },
        },
        mounted() {

        }
    }
</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>
