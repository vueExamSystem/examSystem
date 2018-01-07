<template>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="个人信息" name="list">
            <info-form></info-form>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import infoForm from './Form.vue';
    export default {
        data() {
            return {
                activeName: 'list',
            }
        },
        components: {
            infoForm,
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