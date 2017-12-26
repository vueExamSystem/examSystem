<template>
	<div class="panel">
		<div class="title">
			<span>
			{{paper.name}}
			（总分：{{paper.total}}分 &nbsp;&nbsp; 已有分值：{{paper.hasSet}}分）
			</span>
			<div class="pull-right">
				<el-button type="success" @click="onSave()" class="el-button-shadow">保存</el-button>
				<el-button type="danger" @click="goBack()" class="el-button-shadow">取消</el-button>
			</div>
		</div>
		<div class="content">
			<el-collapse>
				<el-collapse-item>
					<template slot="title">
						<span>单选题（共1题 &nbsp; 每题2分）</span>
						<el-button type="primary" @click.stop="addRadioQuestion">添加试题</el-button>
					</template>
					<div>oooooooooooo</div>
				</el-collapse-item>
				<el-collapse-item>
					<template slot="title">
						<span>多选题（共1题 &nbsp; 每题2分）</span>
						<el-button type="primary" @click.stop="addRadioQuestion">添加试题</el-button>
					</template>
					<div>oooooooooooo</div>
				</el-collapse-item>
				<el-collapse-item>
					<template slot="title">
						<span>判断题（共1题 &nbsp; 每题2分）</span>
						<el-button type="primary" @click.stop="addRadioQuestion">添加试题</el-button>
					</template>
					<div>oooooooooooo</div>
				</el-collapse-item>
				<el-collapse-item>
					<template slot="title">
						<span>选做题（共1题 &nbsp; 每题2分）</span>
						<el-button type="primary" @click.stop="addRadioQuestion">添加试题</el-button>
					</template>
					<div>oooooooooooo</div>
				</el-collapse-item>
			</el-collapse>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				paper:{
					name: '大学物理期中试卷',
					total: '100',
					hasSet: '6'
				},

			}
		},
		methods:{
			onSave(){

			},
			goBack(){
				this.$emit('back');
			},
			addRadioQuestion(){
				console.log('addRadioQuestion');
			}
		},
		mounted(){

		}
	}
</script>
<style lang="scss" scoped>
	@import '~scss_vars';
	
</style>