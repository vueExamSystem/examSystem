<template>
	<div class="panel">
		<div class="title">
			<span>{{detailRow.courseName}}</span>
			<div class="pull-right">
				<el-button type="danger" class="el-button-shadow" @click="close">关闭</el-button>
			</div>
		</div>
		<div class="content">
			<my-filter v-if="filterList.length > 0" :list="filterList" @callback="search" v-loading="filterLoading"></my-filter>
			<div class="paper-progress">
				<table>
					<tr>
						<td>姓名</td>
						<td>{{detailRow.studentName}}</td>
						<td>学号</td>
						<td>{{detailRow.studentNo}}</td>
					</tr>
					<tr>
						<td>所属班级</td>
						<td>{{detailRow.groupName}}</td>
						<td>最终成绩</td>
						<td>{{detailRow.totalScore}}</td>
					</tr>
				</table>
			</div>
			<div class="panel inner-panel">
				<!-- <div class="title">
					<el-input placeholder="请输入搜索关键词" v-model="keyword">
						<el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
					</el-input>
					<div class="pageArea">
						<Page :pageNo="pageNo" :totalCount="totalCount" :pageSize="pageSize" @page-change="handleCurrentChange"></Page>
					</div>
				</div> -->
				<div class="content">
					<el-table :data="rows" highlight-current-row v-loading="listLoading" fit>
	                    <el-table-column type="index" label="ID" width="60"></el-table-column>
	                    <el-table-column prop="name" label="名称"></el-table-column>
						<!-- <el-table-column prop="studentNo" label="时间"></el-table-column> -->
	                    <el-table-column prop="percent" label="完成度" sortable></el-table-column>
	                    <el-table-column prop="score" label="分数" sortable></el-table-column>
	                    <el-table-column prop="ranking" label="等级" sortable></el-table-column>
	                </el-table>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import myFilter from '../../common/myFilter.vue'
    import {getStudentScoreDetailList, getStudentScoreDetailFilter} from '../../../api/api';
    import Pagination from '../../common/Pagination.vue';
    import _ from 'lodash';
	export default{
		props:{
			id:{
				required: true
			},
			detailRow:{
				required:true
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
                rows: [],
                totalCount: 0,
                pageNo: 1,
                pageSize: 10,
                listLoading: false,
                filterLoading: false,
                filterList: [],
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
                let para={
                	courseId:this.detailRow.courseId,
                	studentId:this.detailRow.studentId
                };
                if (!this.listLoading) this.listLoading = true;
                getStudentScoreDetailList(para).then((res) => {
                    res=res.data;
                    //this.totalCount = res.totalCount;
                    this.rows = res;
                    if (!this.filterLoading) this.listLoading = false
                });
            },
        },
        mounted() {
            this.getList();
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