<template>
    <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="练习题列表" name="exerciselist">
            <List></List>
        </el-tab-pane>
        <el-tab-pane label="添加练习题" name="exerciseadd">
            <add-form></add-form>
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
                activeName:'exerciselist',
            }
        },
        methods: {
           
        },
        mounted() {

        }
    }
</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>
