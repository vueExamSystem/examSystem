<template>
    <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="学生成绩" name="infolist">
            <List></List>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import List from './List.vue'
    export default {
        components:{
            List
        },
        data() {
            return {
                activeName:'infolist',
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
