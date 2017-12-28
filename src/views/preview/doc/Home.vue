<template>
    <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="试卷列表" name="paperlist">
            <List></List>
        </el-tab-pane>
        <el-tab-pane label="添加试卷" name="paperadd">
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
                activeName:'paperlist',
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
