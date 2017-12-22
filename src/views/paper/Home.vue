<template>
    <el-container>
        <el-aside width="120px">
            <router-link to="/paper">考试试卷</router-link>
            <router-link to="/paper/quiz">随堂测验</router-link>
            <router-link to="/paper/exercises">练习题</router-link>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        components: {
        },
        methods: {
            handleSelect: {},
        },
        mounted() {
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>
