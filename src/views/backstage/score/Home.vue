<template>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="成绩等级" name="list">
            <score-add></score-add>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import scoreAdd from './Add.vue';
    export default {
        data() {
            return {
                activeName: 'list',
            }
        },
        components: {
            scoreAdd,
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