<template>
    <div id="chart" v-loading="loading" style="width:100%;height: 100%"></div>
</template>

<script>
    import echarts from 'echarts';
    import {getStudentSta} from '../../api/api';


    export default {
        props: {
            courseId: '', // 总共多少条数据
        },
        data() {
            return {
                chart: null,
                dataParam: {},
                loading: false,
            }
        },
        methods: {
            getChart() {
                console.log('select course', this.courseId);
                const para = {
                    course: this.courseId,
                };
                this.loading = true;
                getStudentSta(para).then(res => {
                    this.dataParam = res.data.data;

                    this.loading = false;
                    this.drawCharts();
                });
            },
            drawCharts() {
                const dataParam = this.dataParam;
                this.chart = echarts.init(document.getElementById('chart'));
                this.chart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['优秀', '良好', '中等', '不及格'],
                        itemWidth: 20,
                        borderRadius: 6,
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            // data : ['班级一','班级二','班级三','班级四','班级五','班级六','班级七'],
                            data: dataParam.name,
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '优秀',
                            type: 'bar',
                            stack: '搜索引擎',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside',
                                    formatter: '{c}'
                                },
                            },
                            // data:[8, 8, 8, 8, 8, 8, 8]
                            data: dataParam.excellect
                        },
                        {
                            name: '良好',
                            type: 'bar',
                            stack: '搜索引擎',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside',
                                    formatter: '{c}'
                                },
                            },
                            data: dataParam.good,
                            // data:[30, 30, 30, 30, 30, 30, 30]
                        },
                        {
                            name: '中等',
                            type: 'bar',
                            stack: '搜索引擎',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside',
                                    formatter: '{c}'
                                },
                            },
                            // data:[54, 54, 54, 54, 54, 54, 54],
                            data: dataParam.mid,
                        },
                        {
                            name: '不及格',
                            type: 'bar',
                            stack: '搜索引擎',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside',
                                    formatter: '{c}'
                                },
                            },
                            // data:[8, 8, 8, 8, 8, 8, 8],
                            data: dataParam.noPass,
                        }
                    ],
                    color: [
                        '#EB8B87',
                        '#F8D39A',
                        '#AEE2AD',
                        '#87BFBC'
                    ]
                });

            },
        },
        computed: {
            getCouserId() {
                this.getChart();
                console.log(this.courseId);
                return this.courseId;
            },
        },
        mounted: function () {
            this.getChart();
        },
        updated: function () {
            this.drawCharts()
        }
    }
</script>

<style scoped>
    @import '~scss_vars';
</style>
