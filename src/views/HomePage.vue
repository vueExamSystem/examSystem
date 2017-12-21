<template>
	<el-container>
		<el-header height="50px">
			<el-row>
				<div class="el-col- logo">EXAM</div>
				<el-col :span="1">
					<router-link to="/dashbord" class="grid-content bg-purple">首页</router-link>
				</el-col>
				<el-col :span="1">
					<router-link to="/question" class="grid-content bg-purple">试题</router-link>
				</el-col>
				<el-col :span="1">
					<router-link to="/paper" class="grid-content bg-purple">试卷</router-link>
				</el-col>
				<el-col :span="1">
					<router-link to="/preview" class="grid-content bg-purple">预习</router-link>
				</el-col>
				<el-col :span="1">
					<router-link to="/test" class="grid-content bg-purple">测验</router-link>
				</el-col>
				<el-col :span="1">
					<router-link to="/exam" class="grid-content bg-purple">考试</router-link>
				</el-col>
				<el-col :span="1">
					<router-link to="/listen" class="grid-content bg-purple">监考</router-link>
				</el-col>
				<el-col :span="1">
					<router-link to="/score" class="grid-content bg-purple">成绩</router-link>
				</el-col>
				<el-col :span="1">
					<router-link to="/statistics" class="grid-content bg-purple">统计</router-link>
				</el-col>
				<el-col :span="1">
					<router-link to="/backstage" class="grid-content bg-purple">后台</router-link>
				</el-col>
				<el-col :span="1">
					<router-link to="/setting" class="grid-content bg-purple">设置</router-link>
				</el-col>
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