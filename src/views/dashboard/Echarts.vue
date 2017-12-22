<template>
    <div id="chart" style="width:100%;height: 100%"></div>
</template>

<script>
    import echarts from 'echarts';

    export default {
        data() {
            return {
                chart: null
            }
        },
        methods: {
            drawCharts() {
                this.chart = echarts.init(document.getElementById('chart'));
                this.chart.setOption({
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data:['优秀','良好','中等','不及格'],
                        itemWidth: 20,
                        borderRadius: 6,
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ['班级一','班级二','班级三','班级四','班级五','班级六','班级七']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'优秀',
                            type:'bar',
                            stack: '搜索引擎',
                            data:[8, 8, 8, 8, 8, 8, 8]
                        },
                        {
                            name:'良好',
                            type:'bar',
                            stack: '搜索引擎',
                            data:[30, 30, 30, 30, 30, 30, 30]
                        },
                        {
                            name:'中等',
                            type:'bar',
                            stack: '搜索引擎',
                            data:[54, 54, 54, 54, 54, 54, 54]
                        },
                        {
                            name:'不及格',
                            type:'bar',
                            stack: '搜索引擎',
                            data:[8, 8, 8, 8, 8, 8, 8]
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
