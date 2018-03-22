<template>
	<div class="panel">
		<div class="title">
			<span>{{name}}（{{remainTime(endtime)}}）</span>
			<div class="pull-right">
                <el-button type="success" @click="onRefresh" class="el-button-shadow">刷新</el-button>
				<el-button type="danger" class="el-button-shadow" @click="close">关闭</el-button>
			</div>
		</div>
		<div class="content" v-loading="allLoading">
			<my-filter v-if="filterList.length > 0" :list="filterList" @callback="search" v-loading="filterLoading"></my-filter>
			<div class="paper-progress">
				<table>
					<tr>
						<td>平均答题进度</td>
						<td>
							<i class="el-icon-loading" v-show="stat_Loading"></i>
							<el-progress v-show="!stat_Loading" :percentage="completePCT" :stroke-width="12"></el-progress>
						</td>
						<td>在线人数/不在线/总人数</td>
						<td>
							<i class="el-icon-loading" v-show="stat_Loading"></i>
							<span v-show="!stat_Loading">{{onlineCount}}/{{outlineCount}}/{{countTotal}}</span>
						</td>
					</tr>
					<tr>
						<td>已交卷比例</td>
						<td>
							<i class="el-icon-loading" v-show="stat_Loading"></i>
							<el-progress v-show="!stat_Loading" :percentage="submitPCT" :stroke-width="12"></el-progress>
						</td>
						<!-- <td>考试总体平均答题</td>
						<td>
							<i class="el-icon-loading" v-show="stat_Loading"></i>
							<el-progress v-show="!stat_Loading" :percentage="avgExamPCT * 100" :stroke-width="12"></el-progress>
						</td> -->
                        <td>未开始答卷</td>
                        <td>
                            <i class="el-icon-loading" v-show="stat_Loading"></i>
                            <el-progress v-show="!stat_Loading" :percentage="unExamPCT" :stroke-width="12"></el-progress>
                        </td>
					</tr>
				<!-- 	<tr>
						<td>未开始答卷</td>
						<td>
							<i class="el-icon-loading" v-show="stat_Loading"></i>
							<el-progress v-show="!stat_Loading" :percentage="unExamPCT * 100" :stroke-width="12"></el-progress>
						</td>
						<td></td>
						<td></td>
					</tr> -->
				</table>
			</div>
			<div class="panel inner-panel">
				<div class="title">
					<el-input placeholder="请输入搜索关键词" v-model="stu_keyword">
						<el-button slot="append" icon="el-icon-search" @click="getStudent"></el-button>
					</el-input>
					<div class="pageArea">
						<Page :pageNo="stu_pageNo" :totalCount="stu_totalCount" :pageSize="pageSize" @page-change="studentPageChange"></Page>
					</div>
				</div>
				<div class="content">
					<el-table :data="studentRows" highlight-current-row v-loading="stu_Loading" fit>
	                    <el-table-column type="index" label="序号" width="60">
	                    </el-table-column>
	                    <el-table-column prop="studentNo" label="学号" min-width="120"></el-table-column>
	                    <el-table-column prop="name" label="姓名" min-width="100"></el-table-column>
	                    <el-table-column prop="groupName" label="班级" min-width="160"></el-table-column>
	                    <el-table-column prop="percent" label="考试进度" min-width="150">
	                    	<template scope="scope">
	                            <el-progress :percentage="scope.row.percent" :stroke-width="12"></el-progress>
	                        </template>
	                    </el-table-column>
	                </el-table>
				</div>
			</div>
			<!-- <div class="panel inner-panel" style="margin-top: 20px;">
				<div class="title">
					<span>异常列表</span>
					<div class="pageArea">
						<Page :pageNo="abn_pageNo" :totalCount="abn_totalCount" :pageSize="pageSize" @page-change="abnormalPageChange"></Page>
					</div>
					<el-input class="pull-right" placeholder="请输入搜索关键词" v-model="abn_keyword">
						<el-button slot="append" icon="el-icon-search" @click="getAbnormal"></el-button>
					</el-input>
				</div>
				<div class="content">
					<el-table :data="abnormalRows" highlight-current-row v-loading="abn_Loading" fit>
	                    <el-table-column type="index" label="序号" width="120">
	                    </el-table-column>
	                    <el-table-column prop="abnTime" label="时间" min-width="120"></el-table-column>
	                    <el-table-column prop="abnEvent" label="事件" min-width="200">
	                    	<template scope="scope">
	                    		<span>{{scope.row.studentName}}（{{scope.row.studentNo}}） {{scope.row.abnEvent}}</span>
	                    	</template>
	                    </el-table-column>
	                    <el-table-column prop="id" label="操作" min-width="160">
	                    	<template scope="scope">
	                            <el-button type="primary" plain disabled v-if="scope.row.isOutline">已强制下线</el-button>
	                            <el-button type="primary" v-else @click="forceToOutline(scope.row)">强制下线</el-button>
	                            <el-button type="danger" plain disabled v-if="scope.row.isCheap">已作弊处理</el-button>
	                            <el-button type="danger" v-else @click="signIncheap(scope.row)">作弊处理</el-button>
	                        </template>
	                    </el-table-column>
	                </el-table>
				</div>
			</div> -->
		</div>
	</div>
</template>
<script>
	import myFilter from '../../common/myFilter.vue'
    import { //api
    	getListenDetailFilter, //过滤器
    	getListentStatistics, //百分比数据（保留两位）
    	getListenDetailList, //考试人员列表
    	getAbnormalList, //异常列表
    	updateAbnormal //更新异常（强制下线，作弊处理）
    } from '../../../api/api';
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
				allLoading: true,
                filter: {},
                filterLoading: false,
                filterList: [],
                pageSize: 10,

                studentRows: [],//考试学生列表
                stu_Loading: false,
                stu_keyword: '',
                stu_totalCount: 0,
                stu_pageNo: 1,

                abnormalRows: [],//异常列表
                abn_Loading: false,
                abn_keyword: '',
                abn_totalCount: 0,
                abn_pageNo: 1,

                stat_Loading: true,
                completePCT: 0, //已完成比例
                onlineCount: 0, //在线人数
                outlineCount: 0, //不在线
                countTotal: 0, //参考总人数
                submitPCT: 0, //已交卷比例
                avgExamPCT: 0, //考试总体平均答题
                unExamPCT: 0, //未开始答卷

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
            onRefresh() {
                this.getList();
            },
            search(obj) {//filter回调
                this.filter = obj;
                this.stu_pageNo = 1;
                this.abn_pageNo = 1;
                this.getList();
            },
            getFilter() {// 获取过滤器数据
                this.filterLoading = true;
            	this.allLoading = true;
            	var para = {
            		examId: this.id //考试id
            	};
                console.log('para',para);
                getListenDetailFilter(para).then((res) => {
                    this.filterList = res.data;
                    this.filterLoading = false;
                    this.getList();
                });
            },
            getList() {//获取列表
        		this.clearMinuteClock();
            	var callback = ()=>{
                    if(!this.stat_Loading && !this.stu_Loading && !this.abn_Loading) {
            			this.minuteTimeClockRun();//分计时器启动
            			if(this.allLoading) this.allLoading = false;
                    }
            	};
            	this.getStatistics(callback); // 统计信息
            	this.getStudent(callback); //考试人员列表
            	this.getAbnormal(callback); // 异常列表
            },
            studentPageChange(val) {//考试人员分页回调
                this.stu_pageNo = val;
                this.getStudent();
            },
            abnormalPageChange(val) {//异常列表分页回调
                this.abn_pageNo = val;
                this.getAbnormal();
            },
            forceToOutline(row){ //强制下线
            	this.$confirm('确定强制下线该账号吗？','提示',{
                    confirmButtonText: '强制下线'
                }).then(res => {
	            	var para = {
	            		id: row.id, //异常记录id
	            		type: 'outline'
	            	};
	            	updateAbnormal(para).then(res => {
	            		if(res.code == '0'){
	            			this.$message({
	            				type: 'success',
	            				message: '账号 ' + row.studentNo + ' 已强制下线',
	            			});

	            			//更新行
	            			row.isOutline = 1;
	            			var index = _.findIndex(this.abnormalRows, {id: row.id});
	            			this.abnormalRows.splice(index, 1, row);

	            		}else{
	            			this.$message({
	            				type: 'error',
	            				message: res.msg,
	            			});
	            		}
	            	});
            	}).catch(res => {});
            },
            signIncheap(row){ //作弊处理
            	this.$confirm('确定将异常做作弊处理吗？','提示',{
                    confirmButtonText: '作弊处理'
                }).then(res => {
	            	var para = {
	            		id: row.id, //异常记录id
	            		type: 'cheap'
	            	};
	            	updateAbnormal(para).then(res => {
	            		if(res.code == '0'){
	            			this.$message({
	            				type: 'success',
	            				message: '账号 ' + row.studentNo + ' 已作弊处理',
	            			});

	            			//更新行
	            			row.isCheap = 1;
	            			var index = _.findIndex(this.abnormalRows, {id: row.id});
	            			this.abnormalRows.splice(index, 1, row);

	            		}else{
	            			this.$message({
	            				type: 'error',
	            				message: res.msg,
	            			});
	            		}
	            	});
            	}).catch(res => {});
            },
            getStatistics(callback){ // 统计信息
            	let basePara = {
            		examId: this.id,//考试id
            	};
                 console.log('getListentStatisticsbasePara',basePara);
            	this.stat_Loading = true;
            	getListentStatistics(basePara).then((res) => {
                    res = res.data;
                    this.completePCT = res.complete; //已完成比例
                    this.onlineCount = res.online; //在线人数
                    this.outlineCount = res.outline; //不在线
                    this.countTotal = res.total; //参考总人数
                    this.submitPCT = res.submitted; //已交卷比例
                    this.avgExamPCT = res.avgExam; //考试总体平均答题
                    this.unExamPCT = res.unExam; //未开始答卷
                    this.stat_Loading = false;
                    if(callback) callback();
                });
            },
            getStudent(callback){ //考试人员列表
            	let detailPara = {
            		examId: this.id,//考试id
                    pageNo: this.stu_pageNo,
                    filter: JSON.stringify(this.filter),
                    keyword: this.stu_keyword,
                    pageSize: this.pageSize,
                };
                this.stu_Loading = true;
                getListenDetailList(detailPara).then((res) => {
                    res = res.data;
                    this.stu_totalCount = res.totalCount;
                    this.studentRows = res.rows;
                    this.stu_Loading = false;
                    if(callback) callback();
                });
            },
            getAbnormal(callback){ // 异常列表
            	/*let abnPara = {
            		examId: this.id,//考试id
                    pageNo: this.abn_pageNo,
                    filter: JSON.stringify(this.filter),
                    keyword: this.abn_keyword,
                    pageSize: this.pageSize,
                };
                this.abn_Loading = true;
                getAbnormalList(abnPara).then((res) => {
                    res = res.data;
                    this.abn_totalCount = res.totalCount;
                    this.abnormalRows = res.rows;
                    this.abn_Loading = false;
                    if(callback) callback();
                });*/
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
                	this.clearSecondClock();//关闭计时器
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
            clearMinuteClock(){//分计时器关闭
                if(this.minuteTimeClock){
                    clearInterval(this.minuteTimeClock);
                }
            },
            clearSecondClock(){//秒计时器关闭
                if(this.secondTimeClock){
                    clearInterval(this.secondTimeClock);
                }
            }
        },
        mounted() {
            this.fullPath = this.$route.fullPath;
            this.getFilter();
            this.secondTimeClockRun();//秒计时器启动
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