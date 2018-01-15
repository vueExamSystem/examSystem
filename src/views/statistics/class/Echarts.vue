<template>
    <div class="chart-show-area" style="width:100%;height: 100%"></div>
</template>

<script>
    import echarts from 'echarts';

    export default {
        props: {
            index: {
                required: true,
            }
        },
        data() {
            return {
                chart: null,
                id: this.index,
            }
        },
        methods: {
            drawCharts() {
                const $ele = document.getElementsByClassName('chart-show-area')[this.id];
                console.log($ele);
                this.chart = echarts.init($ele);
                this.chart.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}:<br/> {c} ({d}%)"
                    },
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['20%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside',
                                    formatter: "{b}{d}%"
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '24',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:200, name:'良好率'},
                                {value:200, name:'中等率'},
                                {value:200, name:'不及格率'},
                                {value:200, name:'优秀率'},
                            ]
                        }
                    ],
                    color: [
                        '#AEE2AD',
                        '#F8D39A',
                        '#EB8B87',
                        '#87BFBC'
                    ]
                });
            },
        },
        mounted: function () {
            this.drawCharts()
        },
        updated: function () {
            this.drawCharts()
        }
    }
</script>

<style scoped>
    @import '~scss_vars';
</style>
