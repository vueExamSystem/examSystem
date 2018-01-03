<template>
	<div class="panel">
		<div class="title">
			<span>物理第一章测验（2018/01/01 8:00-8:20）</span>
			<div class="pull-right">
				<el-button type="danger" class="el-button-shadow" @click="close">关闭</el-button>
			</div>
		</div>
		<div class="content">
			<my-filter :list="filterList" @callback="search"></my-filter>
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
					<el-input placeholder="请输入搜索关键词" v-model="searchkey">
	                    <el-button slot="append" icon="el-icon-search"></el-button>
	                </el-input>
	                <div class="pageArea">
	                    <Page :current="currentPage" :total="total" :pageSize="pageSize" @page-change="pageChange"></Page>
	                </div>
				</div>
				<div class="content">
					<el-table :data="previewList" highlight-current-row v-loading="listLoading" fit>
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
	import Pagination from '../../common/Pagination.vue'
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
				filterList:[{
					title: '院系',
					field: 'department',
					children: [{
						value: 'computer',
						text: '计算机'
					},{
						value: 'accounting',
						text: '会计'
					},{
						value: 'traffic',
						text: '交运'
					},{
						value: 'park',
						text: '园林'
					},{
						value: 'architecture ',
						text: '建筑与艺术'
					}]
				},{
					title: '班级',
					field: 'class',
					children: [{
						value: '20170801',
						text: '1班'
					},{
						value: '20170802',
						text: '2班'
					},{
						value: '20170803',
						text: '3班'
					}]
				}],
				searchkey: '',
				currentPage: 1,
				total: 4,
				pageSize: 5,
				previewList:[{
					studentNo: '01112307',
					name: '叶子',
					class: '16级计算机3班',
					percentage: 70
				},{
					studentNo: '01112307',
					name: '叶子',
					class: '16级计算机3班',
					percentage: 70
				},{
					studentNo: '01112307',
					name: '叶子',
					class: '16级计算机3班',
					percentage: 70
				},{
					studentNo: '01112307',
					name: '叶子',
					class: '16级计算机3班',
					percentage: 70
				},{
					studentNo: '01112307',
					name: '叶子',
					class: '16级计算机3班',
					percentage: 70
				},{
					studentNo: '01112307',
					name: '叶子',
					class: '16级计算机3班',
					percentage: 70
				}],
                listLoading: false,
			}
		},
		methods:{
			search(filterArr){

			},
			pageChange(){

			},
			close(){
				this.$emit('close');
			},
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