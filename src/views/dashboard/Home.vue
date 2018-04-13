<template>
    <el-container id="dashboard">
        <el-aside width="120px">
            <router-link to="/question">
                <div>
                    <i class="iconfont icon-shiti-larger"></i>
                    <span slot="title">
                    试题
                </span>
                </div>
            </router-link>
            <router-link to="/paper">
                <div>
                    <i class="iconfont icon-kaoshi-larger"></i>
                    <span slot="title">
                    试卷
                </span>
                </div>
            </router-link>
            <router-link to="/exam">
                <div>
                    <i class="iconfont icon-pencil-larger"></i>
                    <span slot="title">
                    考试
                </span>
                </div>
            </router-link>
            <router-link to="/paper/quiz">
                <div>
                    <i class="iconfont icon-ceyan-larger"></i>
                    <span slot="title">
                    随堂测试
                </span>
                </div>
            </router-link>
            <router-link to="/preview">
                <div>
                    <i class="iconfont icon-book-larger"></i>
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
                    <span>即将开考，欢迎老师进行监考！</span>
                </div>
                <div class="exam-panel">
                    <router-link to="/exam/list">
                        <el-row :gutter="1" @click="changePath">
                        <el-col :span="12">
                            <div class="grid-content bg-green">
                                <i class="fa fa-th"></i>
                                <dl>
                                    <dt>今日考试</dt>
                                    <dd>{{info.today || 0}}</dd>
                                </dl>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <i class="fa fa-th"></i>
                                <dl>
                                    <dt>全部考试（已结束／未进行）</dt>
                                    <dd>{{info.finished || 0}}/{{info.noStart || 0}}</dd>
                                </dl>
                            </div>
                        </el-col>
                    </el-row>
                    </router-link>
                    <div class="exam-table">
                        <examTable></examTable>
                    </div>
                    <!-- <div class="panel charts">
                        <div class="title">
                            <span>学生成绩统计</span>
                            <el-select v-model="courseId" class="pull-right" placeholder="请选择试题类型">
                                <template v-for="item in courseArr">
                                    <el-option :label="item.name" :value="item.id"></el-option>
                                </template>
                            </el-select>
                        </div>
                        <div class="content">
                            <Echarts :courseId="courseId"></Echarts>
                        </div>
                    </div> -->
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import charts from './Echarts.vue';
    import table from './Table.vue';
    import util from '../../common/js/util';
    import {
        getDashboardInfo
    } from '../../api/api'
    export default {
        data() {
            return {
                info: {},
                loading: false,
            }
        },
        components: {
            'Echarts': charts,
            'examTable': table
        },
        methods: {
            getDefaultInfo(){
                //this.loading = true;
                getDashboardInfo({}).then((res) => {
                    res=res.data;
                    this.info = res;
                });

            },
            changePath(){

            },
        },
        mounted() {
          this.getDefaultInfo();
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