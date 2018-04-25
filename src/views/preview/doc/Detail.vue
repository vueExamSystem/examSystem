<template>
	<div class="panel">
		<div class="title">
			<span>{{detailRow.name}}</span>
			<div class="pull-right">
				<!-- <el-button type="success" class="el-button-shadow"><a href="" style="color:#fff">下载</a></el-button> -->
				<el-button type="danger" class="el-button-shadow" @click="close">关闭</el-button>
			</div>
		</div>
		<div class="el-question-title" v-html="detailRow.content">
		</div>
		<!-- <div class="content">
			<img src="/static/images/logo.png">
		</div> -->
		<video loop="loop"  width="80%" height="400" v-if="detailRow.videoUrl" :src="detailRow.videoUrl" controls="controls"></video>
	</div>
</template>
<script>
	export default{
		props:{
			id:{
				required: true
			},
			detailRow:{
				required: true
			}
		},
		data(){
			return {
				//detail:{}
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
	video{
		margin-top:10px;
		border: 1px solid #eee;
	}
</style>