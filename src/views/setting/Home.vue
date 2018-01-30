<template>
    <el-container>
        <el-aside width="120px">
            <template v-for="item in routes">
                <router-link :to="item.path">
                    <div>
                        <i :class="item.icon"></i>
                        <span slot="title">
                            {{item.name}}
                        </span>
                    </div>
                </router-link>
            </template>
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
                routes: [],
            }
        },
        components: {
        },
        methods: {
            init(){
                this.getRoutes();
            },
            getRoutes(){
               var topMenu =  _.find(this.$store.getters.addRouters, { path: '/' }).children;
               var sideMenus = _.find(topMenu,{path: '/setting'}).children;
               this.routes = sideMenus;
            }
        },
        mounted() {
            this.init();
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
</style>