<template>
	<div class="panel">
		<div class="title">
			<span>物理第一章预习题（2017/12/10 8:00截止）</span>
			<div class="pull-right">
				<el-button type="danger" class="el-button-shadow" @click="close">关闭</el-button>
			</div>
		</div>
		<div class="content">
			
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			id:{
				required: true
			}
		},
		data(){
			return {

			}
		},
		methods:{
			close(){
				this.$emit('close');
			},
		}
	}
</script>
<style lang="scss" scoped="">
	@import '~scss_vars';
</style>