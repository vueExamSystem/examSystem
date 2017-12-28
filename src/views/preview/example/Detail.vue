<template>
	<div class="panel">
		<div class="title">
			<span>物理第一章预习题（2017/12/10 8:00截止）</span>
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
						<td>预习总体进度</td>
						<td><el-progress :percentage="60" :stroke-width="12"></el-progress></td>
					</tr>
					<tr>
						<td>未开始预习</td>
						<td><el-progress :percentage="10" :stroke-width="12"></el-progress></td>
						<td></td>
						<td></td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>
<script>
	import myFilter from '../../common/myFilter.vue'
	export default{
		props:{
			id:{
				required: true
			}
		},
		components:{
			myFilter
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
				}]
			}
		},
		methods:{
			search(filterArr){

			},
			close(){
				this.$emit('close');
			},
		}
	}
</script>
<style lang="scss" scoped="">
	@import '~scss_vars';
	
</style>