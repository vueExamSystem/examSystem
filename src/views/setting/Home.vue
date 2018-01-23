<template>
    <el-container>
        <el-aside width="120px">
            <router-link to="/setting/user">
                <i class="iconfont icon-user-larger"></i>
                <span>个人信息</span>
            </router-link>
            <router-link to="/setting/log">
                <i class="iconfont icon-log-larger"></i>
                <span>系统日志</span>
            </router-link>
            <router-link to="/setting/alert">
                <i class="iconfont icon-alert-larger"></i>
                <span>考试异常</span>
            </router-link>
            <router-link to="/setting/chart">
                <i class="iconfont icon-chart-larger"></i>
                <span>数据监控</span>
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
