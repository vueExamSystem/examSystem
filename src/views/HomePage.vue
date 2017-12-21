<template>
	<el-container>
		<el-header height="50px">
			<el-row>
				<div class="el-col- logo">EXAM</div>
				<el-col :span="1"><a href="/" class="grid-content bg-purple">首页</a></el-col>
				<el-col :span="1"><a href="/question" class="grid-content bg-purple">试题</a></el-col>
				<el-col :span="1"><div class="grid-content bg-purple">试卷</div></el-col>
				<el-col :span="1"><div class="grid-content bg-purple">练习</div></el-col>
				<el-col :span="1"><div class="grid-content bg-purple">测验</div></el-col>
				<el-col :span="1"><div class="grid-content bg-purple">考试</div></el-col>
				<el-col :span="1"><div class="grid-content bg-purple">监考</div></el-col>
				<el-col :span="1"><div class="grid-content bg-purple">成绩</div></el-col>
				<el-col :span="1"><div class="grid-content bg-purple">统计</div></el-col>
				<el-col :span="1"><div class="grid-content bg-purple">后台</div></el-col>
				<el-col :span="1"><div class="grid-content bg-purple">设置</div></el-col>
			</el-row>
		</el-header>
		<el-main>
			<router-view></router-view>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
        components: {
		},
		methods: {
		},
		mounted() {
		}
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';
	.el-header{
		padding-right: 0;
		.el-col{
			line-height: 50px;
			font-size: 18px;
			cursor: pointer;
		}
		.logo{
			font-size: 24px;
			color: $color-primary;
			width: 120px;
			line-height: 50px;
		}
	}
</style>