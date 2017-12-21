<template>
    <el-container>
        <el-aside width="200px">
            <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo">
                <el-menu-item index="1">
                    <i class="el-icon-mnu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
            </el-menu>
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
            handleSelect: {},
        },
        mounted() {
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>