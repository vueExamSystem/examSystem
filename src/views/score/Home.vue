<template>
    <el-container>
        <el-aside width="120px">
            <router-link to="/score">
                <i class="iconfont icon-score-larger"></i>
                <span>学生成绩</span>
            </router-link>
            <router-link to="/score/setting">
                <i class="iconfont icon-setting-larger"></i>
                <span>成绩设置</span>
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
        },
        mounted() {
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>
