<template>
    <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="试卷列表" name="doclist">
            <List></List>
        </el-tab-pane>
        <el-tab-pane label="添加试卷" name="docadd">
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
                activeName:'doclist',
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
