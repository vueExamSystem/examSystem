<template>
    <el-container>
        <el-aside width="120px">
            <router-link to="/backstage/student">
                <i class="iconfont icon-student-larger"></i>
                <span>学生管理</span>
            </router-link>
            <router-link to="/backstage/course">
                <i class="iconfont icon-kecheng-larger"></i>
                <span>选课管理</span>
            </router-link>
            <router-link to="/backstage/role">
                <i class="iconfont icon-user"></i>
                <span>角色管理</span>
            </router-link>
            <router-link to="/backstage/competence">
                <i class="iconfont icon-lock-larger"></i>
                <span>权限管理</span>
            </router-link>
            <router-link to="/backstage/score">
                <i class="iconfont icon-score-larger"></i>
                <span>成绩等级</span>
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
