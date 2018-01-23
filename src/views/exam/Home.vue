<template>
    <el-container>
        <el-aside width="120px">
            <router-link to="/exam/list">
                <i class="iconfont icon-kaoshi-larger"></i>
                <span>考试</span>
            </router-link>
            <router-link to="/exam/publish">
                <i class="iconfont icon-publish-larger"></i>
                <span>发布考试</span>
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
