<template>
    <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="发布考试" name="publishform">
            <add-form></add-form>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import addForm from './Add.vue'
    export default {
        components:{
            addForm
        },
        data() {
            return {
                activeName:'publishform',
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
