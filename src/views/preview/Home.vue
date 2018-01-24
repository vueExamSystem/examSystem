<template>
    <el-container>
        <el-aside width="120px">
            <router-link to="/preview/list">
                <i class="iconfont icon-pencil-larger"></i>
                <span>预习题</span>
            </router-link>
            <router-link to="/preview/doc">
                <i class="iconfont icon-book-larger"></i>
                <span>预习资料</span>
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
