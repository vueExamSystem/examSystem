<template>
    <el-container>
        <el-aside width="120px">
            <router-link to="/question">
                <div>
                    <i class="iconfont icon-shiti-larger"></i>
                    <span slot="title">
                        试题管理
                    </span>
                </div>
            </router-link>
            <router-link to="/question/tag">
                <div>
                    <i class="iconfont icon-tip-larger"></i>
                    <span slot="title">
                        标签管理
                    </span>
                </div>
            </router-link>
            <router-link to="/question/course">
                <div>
                    <i class="iconfont icon-kecheng-larger"></i>
                    <span slot="title">
                        课程管理
                    </span>
                </div>
            </router-link>
            <router-link to="/question/chapter">
                <div>
                    <i class="iconfont icon-chapter-larger"></i>
                    <span slot="title">
                        章节管理
                    </span>
                </div>
            </router-link>
            <router-link to="/question/same">
                <div>
                    <i class="iconfont icon-xiangsitizu-larger"></i>
                    <span slot="title">
                        相似题组
                    </span>
                </div>
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
            goQue: () => {
                this.$router.push('/question');
            },
        },
        mounted() {
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>