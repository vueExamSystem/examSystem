<template>
	<div class="panel">
		<div class="title">
			<span>物理第一章测验（2018/01/01 8:00-8:20）</span>
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
						<td><el-progress :percentage="60" :stroke-width="12"></el-progress></td>
						<td>在线人数/不在线/总人数</td>
						<td>25/5/30</td>
					</tr>
					<tr>
						<td>已交卷比例</td>
						<td><el-progress :percentage="70" :stroke-width="12"></el-progress></td>
						<td>考试总体平均答题</td>
						<td><el-progress :percentage="60" :stroke-width="12"></el-progress></td>
					</tr>
					<tr>
						<td>未开始答卷</td>
						<td><el-progress :percentage="1" :stroke-width="12"></el-progress></td>
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
						<Page :pageNo="pageNo" :totalCount="totalCount" :pageSize="pageSize" @page-change="handleCurrentChange"></Page>
					</div>
				</div>
				<div class="content">
					<el-table :data="rows" highlight-current-row v-loading="listLoading" fit>
	                    <el-table-column type="index" label="序号" width="60">
	                    </el-table-column>
	                    <el-table-column prop="studentNo" label="学号" min-width="120"></el-table-column>
	                    <el-table-column prop="name" label="姓名" min-width="100"></el-table-column>
	                    <el-table-column prop="class" label="班级" min-width="160"></el-table-column>
	                    <el-table-column prop="percentage" label="预习进度" min-width="150">
	                    	<template scope="scope">
	                            <el-progress :percentage="scope.row.percentage" :stroke-width="12"></el-progress>
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
                this.filter = obj;
                this.getList();
            },
            //获取用户列表
            getList() {
                let para = {
                    pageNo: this.pageNo,
                    filter: JSON.stringify(this.filter),
                    keyword: this.keyword,
                    pageSize: this.pageSize,
                };
                if (!this.listLoading) this.listLoading = true;
                getClassTestDetailList(para).then((res) => {
                    res=res.data;
                    this.totalCount = res.totalCount;
                    this.rows = res.rows;
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
        },
        mounted() {
            this.getFilter();
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