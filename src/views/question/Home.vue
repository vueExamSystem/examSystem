<template>
    <el-container>
        <el-aside width="120px">
            <div>
                <a href="/question">
                    <i class="fa fa-bars"></i>
                    <span slot="title">
                        试题管理
                    </span>
                </a>
            </div>
            <div>
                <a href="/question/questionTag">
                    <i class="fa fa-bars"></i>
                    <span slot="title">
                        标签管理
                    </span>
                </a>
            </div>
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