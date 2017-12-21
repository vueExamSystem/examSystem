<template>
    <el-container>
        <el-header>
            <Nav></Nav>
        </el-header>
        <el-container>
            <el-aside width="120px">
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose">
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Nav from '../common/Nav.vue'
    export default {
        data() {
            return {
            }
        },
        components: {
            Nav,
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
    .el-header{
        padding-right: 0;
        .el-col{
            line-height: 50px;
            font-size: 18px;
        }
        .logo{
            font-size: 24px;
            color: $color-primary;
            width: 120px;
            line-height: 50px;
        }
    }
</style>