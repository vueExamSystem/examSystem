<template>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="个人信息" name="list">
            <info-form></info-form>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="modify">
            <modify></modify>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import infoForm from './Form.vue';
    import modify from './Modify.vue'
    export default {
        data() {
            return {
                activeName: 'list',
            }
        },
        components: {
            infoForm,
            modify,
        },
        methods: {
            handleClick(tab, event){
                console.log('tab',tab,event);
            },
        },
        mounted() {

        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>