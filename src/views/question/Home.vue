<template>
    <el-container>
        <el-aside width="120px">
            <router-link to="/question">
                <div>
                    <i class="fa fa-bars"></i>
                    <span slot="title">
                        试题管理
                    </span>
                </div>
            </router-link>
            <router-link to="/question/tag">
                <div>
                    <i class="fa fa-bars"></i>
                    <span slot="title">
                        标签管理
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