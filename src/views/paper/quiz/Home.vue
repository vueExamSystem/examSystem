<template>
    <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="测验列表" name="quizlist">
            <List></List>
        </el-tab-pane>
        <el-tab-pane label="添加测验" name="quizadd">
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
                activeName:'quizlist',
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
