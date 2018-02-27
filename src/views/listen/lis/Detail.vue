<template>
	<div class="panel">
		<div class="title">
			<span>{{name}}（{{remainTime(endtime)}}）</span>
			<div class="pull-right">
				<el-button type="danger" class="el-button-shadow" @click="close">关闭</el-button>
			</div>
		</div>
		<div class="content">
			<my-filter v-if="filterList.length > 0" :list="filterList" @callback="search" v-loading="filterLoading"></my-filter>
			<div class="paper-progress">
				<table>
					<tr>
						<td>已完成比例</td>
						<td><el-progress :percentage="completePCT * 100" :stroke-width="12"></el-progress></td>
						<td>在线人数/不在线/总人数</td>
						<td>{{onlineCount}}/{{outlineCount}}/{{countTotal}}</td>
					</tr>
					<tr>
						<td>已交卷比例</td>
						<td><el-progress :percentage="submitPCT * 100" :stroke-width="12"></el-progress></td>
						<td>考试总体平均答题</td>
						<td><el-progress :percentage="avgExamPCT * 100" :stroke-width="12"></el-progress></td>
					</tr>
					<tr>
						<td>未开始答卷</td>
						<td><el-progress :percentage="unExamPCT * 100" :stroke-width="12"></el-progress></td>
						<td></td>
						<td></td>
					</tr>
				</table>
			</div>
			<div class="panel inner-panel">
				<div class="title">
					<el-input placeholder="请输入搜索关键词" v-model="keyword">
						<el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
					</el-input>
					<div class="pageArea">
						<Page :pageNo="stu_pageNo" :totalCount="stu_totalCount" :pageSize="pageSize" @page-change="handleCurrentChange"></Page>
					</div>
				</div>
				<div class="content">
					<el-table :data="studentRows" highlight-current-row v-loading="listLoading" fit>
	                    <el-table-column type="index" label="序号" width="60">
	                    </el-table-column>
	                    <el-table-column prop="studentNo" label="学号" min-width="120"></el-table-column>
	                    <el-table-column prop="name" label="姓名" min-width="100"></el-table-column>
	                    <el-table-column prop="class" label="班级" min-width="160"></el-table-column>
	                    <el-table-column prop="percentage" label="考试进度" min-width="150">
	                    	<template scope="scope">
	                            <el-progress :percentage="scope.row.percentage" :stroke-width="12"></el-progress>
	                        </template>
	                    </el-table-column>
	                </el-table>
				</div>
			</div>
			<div class="panel inner-panel" style="margin-top: 20px;">
				<div class="title">
					<span>异常列表</span>
					<div class="pageArea">
						<Page :pageNo="abn_pageNo" :totalCount="abn_totalCount" :pageSize="pageSize" @page-change="handleCurrentChange"></Page>
					</div>
					<el-input class="pull-right" placeholder="请输入搜索关键词" v-model="keyword">
						<el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
					</el-input>
				</div>
				<div class="content">
					<el-table :data="abnormalRows" highlight-current-row v-loading="listLoading" fit>
	                    <el-table-column type="index" label="序号" width="120">
	                    </el-table-column>
	                    <el-table-column prop="abnTime" label="时间" min-width="120"></el-table-column>
	                    <el-table-column prop="abnEvent" label="事件" min-width="200"></el-table-column>
	                    <el-table-column prop="id" label="操作" min-width="160">
	                    	<template scope="scope">
	                            <el-button type="primary" @click="">强制下线</el-button>
	                            <el-button type="danger" @click="">作弊处理</el-button>
	                        </template>
	                    </el-table-column>
	                </el-table>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import myFilter from '../../common/myFilter.vue'
    import {getClassTestDetailList, getClassTestDetailFilter} from '../../../api/api';
    import Pagination from '../../common/Pagination.vue';
    import _ from 'lodash';
	export default{
		props:{
			id:{
				required: true
			},
			name:{
				required: true
			},
			endtime:{
				required: true
			}
		},
		components:{
			myFilter,
			'Page': Pagination
		},
		data(){
			return {
                keyword: '',
                filter: {},
                studentRows: [],//考试学生列表
                stu_totalCount: 0,
                stu_pageNo: 1,
                abnormalRows: [{
                	id: 1,
                	abnTime: '2018/02/25 16:08:29',
                	abnEvent: '黄烨（0112307）多端登录，有作弊现象',
                }],//异常列表
                abn_totalCount: 0,
                abn_pageNo: 1,
                pageSize: 10,
                listLoading: false,
                filterLoading: false,
                filterList: [],
                completePCT: 0.6, //已完成比例
                onlineCount: 25, //在线人数
                outlineCount: 5, //不在线
                countTotal: 30, //参考总人数
                submitPCT: 0.7, //已交卷比例
                avgExamPCT: 0.6, //考试总体平均答题
                unExamPCT: 0.01, //未开始答卷

                fullPath: '',
                nowDate: new Date(),
                minuteTimeClock: '',
                secondTimeClock: ''
			}
		},
        methods:{
            close() {
                this.$emit('close');
            },
            handleCurrentChange(val) {
                this.pageNo = val;
                this.getUsers();
            },
            search(obj) {
                this.filter = obj;this.pageNo = 1;
                this.getList();
            },
            //获取用户列表
            getList() {
                let para = {
                    pageNo: this.stu_pageNo,
                    filter: JSON.stringify(this.filter),
                    keyword: this.keyword,
                    pageSize: this.pageSize,
                };
                if (!this.listLoading) this.listLoading = true;
                getClassTestDetailList(para).then((res) => {
                    res=res.data;
                    this.stu_totalCount = res.totalCount;
                    this.studentRows = res.rows;
                    if (!this.filterLoading) this.listLoading = false
                });
            },
            // 获取过滤器数据
            getFilter() {
                this.filterLoading = true;
                this.listLoading = true;
                getClassTestDetailFilter({}).then((res) => {
                    this.filterList = res.data;
                    this.filterLoading = false;
                    this.getList();
                });
            },
            dateParse(dateString){
                return new Date(dateString);
            },
            getRemainSeconds(dateString){//获取剩余总秒数
                var thisD = this.dateParse(dateString);
                var totalSeconds = (thisD.getTime() - this.nowDate.getTime());
                return totalSeconds;
            },
            remainTime(dateString, isDynamic){//倒计时
                var totalSeconds = this.getRemainSeconds(dateString);//剩余总秒数
                if(totalSeconds <= 0){
                    return '考试结束';
                }else{
                    var hourStr = '0';
                    var minuteStr = '0';
                    var secondStr = '0';
                    var minuteSeconds = 1000 * 60;//一分钟毫秒数
                    var hourSeconds = minuteSeconds * 60;//一小时毫秒数
                    var remainHours = Math.floor(totalSeconds / hourSeconds);//对应剩余小时
                    var remainMinutes = Math.floor(totalSeconds % hourSeconds / minuteSeconds);//对应剩余分钟
                    var remainSeconds = Math.floor(totalSeconds % hourSeconds % minuteSeconds / 1000);//对应剩余秒
                    if(remainHours < 10){//剩余小时小于10小时
                        hourStr += remainHours;
                    }else{
                        hourStr = remainHours + '';
                    }
                    if(remainMinutes < 10){//剩余分钟小于10分钟
                        minuteStr += remainMinutes;
                    }else{
                        minuteStr = remainMinutes + '';
                    }
                    if(remainSeconds < 10){//剩余秒小于10秒
                        secondStr += remainSeconds;
                    }else{
                        secondStr = remainSeconds + '';
                    }
                    return hourStr + ':' + minuteStr + ':' + secondStr;
                }
            },
            minuteTimeClockRun(){//每分钟刷新表格
                this.minuteTimeClock = setInterval(()=>{
                    if(this.$route.fullPath != this.fullPath){
                        this.clearMinuteClock();
                    }else{
                        this.getList();
                    }
                }, 60000);
            },
            secondTimeClockRun(){//每秒刷新剩余时间一次
                this.secondTimeClock = setInterval(()=>{
                    if(this.$route.fullPath != this.fullPath){
                        this.clearSecondClock();
                    }else{
                        this.nowDate = new Date();
                    }
                }, 1000);
            },
            clearMinuteClock(){
                if(this.minuteTimeClock){
                    clearInterval(this.minuteTimeClock);
                }
            },
            clearSecondClock(){
                if(this.secondTimeClock){
                    clearInterval(this.secondTimeClock);
                }
            }
        },
        mounted() {
            this.fullPath = this.$route.fullPath;
            this.getFilter();
            this.minuteTimeClockRun();
            this.secondTimeClockRun();
        }
	}
</script>
<style lang="scss" scoped="">
	@import '~scss_vars';
	.filter-wrap{
		box-shadow: none;
		border-radius: 0;
	}
	.inner-panel{
		.content{
			border-width: 0;
		}
	}
</style>