<template>
    <el-container>
        <el-aside width="120px">
            <router-link to="/statistics/department">
                <i class="iconfont icon-department-larger"></i>
                <span>院系统计</span>
            </router-link>
            <router-link to="/statistics/class">
                <i class="iconfont icon-class-larger"></i>
                <span>班级统计</span>
            </router-link>
            <router-link to="/statistics/student">
                <i class="iconfont icon-student-larger"></i>
                <span>学生统计</span>
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
