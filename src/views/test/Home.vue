<template>
    <el-container>
        <el-aside width="120px">
            <router-link to="/test">
                <i class="iconfont icon-ceyan"></i>
                <span>课堂测验</span>
            </router-link>
            <router-link to="/test/publish">
                <i class="iconfont icon-publish"></i>
                <span>发布测验</span>
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
