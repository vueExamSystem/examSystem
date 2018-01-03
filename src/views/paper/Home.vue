<template>
    <el-container>
        <el-aside width="120px">
            <router-link to="/paper">
                <i class="iconfont icon-kaoshi-larger"></i>
                <span>考试试卷</span>
            </router-link>
            <router-link to="/paper/quiz">
                <i class="iconfont icon-ceyan-larger"></i>
                <span>随堂测验</span>
            </router-link>
            <router-link to="/paper/exercises">
                <i class="iconfont icon-pencil-larger"></i>
                <span>练习题</span>
            </router-link>
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
