<template>
    <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="习题列表" name="examplelist">
            <List></List>
        </el-tab-pane>
        <el-tab-pane label="发布习题" name="exampleadd">
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
                activeName:'examplelist',
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
