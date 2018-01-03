<template>
    <el-container>
        <el-aside width="120px">
            <router-link to="/listen">
                <i class="iconfont icon-kaoshi-larger"></i>
                <span>考试监考</span>
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
