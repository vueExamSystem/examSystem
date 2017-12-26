<template>
	<div class="panel">
		<div class="title">
			<span>添加{{typeText}}</span>
			<div class="pull-right">
				<el-button type="primary" class="el-button-shadow">添加选中</el-button>
				<el-button type="danger" @click="goBack" class="el-button-shadow">取消</el-button>
			</div>
		</div>
		<div class="content"></div>
	</div>
</template>
<script>
	export default{
		props:{
			flag:{
				required: true
			}
		},
		data(){
			return {

			}
		},
		computed:{
			typeText(){
				switch(this.flag){
					case 'radio': return '单选';break;
					case 'check': return '多选';break;
					case 'judge': return '判断';break;
					case 'option': return '选做题';break;
					case 'text': return '简答题';break;
					default: return '单选';break;
				}
			},
		},
		methods:{
			
			goBack(){
				this.$emit('back');
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '~scss_vars';
</style>