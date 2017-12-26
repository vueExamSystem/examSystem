<template>
    <el-container id="dashboard">
        <el-aside width="120px">
            <router-link to="/question">
                <div>
                    <i class="fa fa-plus"></i>
                    <span slot="title">
                    试题
                </span>
                </div>
            </router-link>
            <router-link to="/paper">
                <div>
                    <i class="fa fa-plus"></i>
                    <span slot="title">
                    试卷
                </span>
                </div>
            </router-link>
            <router-link to="/exam">
                <div>
                    <i class="fa fa-plus"></i>
                    <span slot="title">
                    考试
                </span>
                </div>
            </router-link>
            <router-link to="/paper/quiz">
                <div>
                    <i class="fa fa-plus"></i>
                    <span slot="title">
                    随堂测试
                </span>
                </div>
            </router-link>
            <router-link to="/preview">
                <div>
                    <i class="fa fa-plus"></i>
                    <span slot="title">
                    预习练习
                </span>
                </div>
            </router-link>
        </el-aside>
        <el-main>
            <div>
                <div class="tip">
                    <i class="fa fa-volume-up"></i>
                    <span>16级大学英语即将开考，请各位同学做好准备！</span>
                </div>
                <div class="exam-panel">
                    <el-row :gutter="1">
                        <el-col :span="12">
                            <div class="grid-content bg-green">
                                <i class="fa fa-th"></i>
                                <dl>
                                    <dt>今日考试</dt>
                                    <dd>2</dd>
                                </dl>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <i class="fa fa-th"></i>
                                <dl>
                                    <dt>全部考试（已结束／未进行）</dt>
                                    <dd>23/4</dd>
                                </dl>
                            </div>
                        </el-col>
                    </el-row>
                    <div class="exam-table">
                        <examTable></examTable>
                    </div>
                    <div class="panel charts">
                        <div class="title">
                            <span>学生成绩统计</span>
                        </div>
                        <div class="content">
                            <Echarts></Echarts>
                        </div>
                    </div>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import charts from './Echarts.vue';
    import table from './Table.vue';
    export default {
        data() {
            return {
            }
        },
        components: {
            'Echarts': charts,
            'examTable': table
        },
        methods: {
            goQue: () => {
                // todo
            },
        },
        mounted() {
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';
    #dashboard{
        .tip{
            height: 40px;
            line-height: 40px;
            color: #ffffff;
            padding: 0 10px;
            box-sizing: border-box;
            font-size: 16px;
            @include gradient(#AA84BC, #8684BC);

            i{
                margin-right: 8px;
            }
        }

        .exam-panel{
            margin-top: 1px;
            .grid-content{
                height: 100px;
                line-height: 80px;
                text-align: center;
                color: #ffffff;
                .fa{
                    font-size: 40px;
                    opacity: 0.7;
                }
                dl{
                    display: inline-block;
                    height: 40px;
                    margin-left: 10px;
                    dt{
                        font-size: 14px;
                        height: 18px;
                    }
                    dd{
                        font-size: 24px;
                        height: 18px;
                        text-align: left;
                    }
                }
            }
            .bg-green{
                @include gradient(#9CC7B4, #87BFBC);
            }
            .bg-purple{
                @include gradient(#D98FBB, #DA7A7A);
            }
        }
        
        .panel{
            margin: 0 10px;
        }

        .exam-table{
            margin-top: 20px;
        }

        .charts{
            margin-top: 20px;
            height: 645px;
            .content{
                height: 400px;
                padding: 20px;
                box-sizing: border-box;
            }
        }

    }
</style>