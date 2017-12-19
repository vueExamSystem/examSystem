<template>
	<el-container>
		<el-header height="50px">
			<el-row :gutter="23">
				<el-col :span="3"><div class="grid-content bg-purple">EXAM</div></el-col>
				<el-col :span="2"><div class="grid-content bg-purple">首页</div></el-col>
				<el-col :span="2"><div class="grid-content bg-purple">试题</div></el-col>
				<el-col :span="2"><div class="grid-content bg-purple">试卷</div></el-col>
				<el-col :span="2"><div class="grid-content bg-purple">考试</div></el-col>
				<el-col :span="2"><div class="grid-content bg-purple">考试</div></el-col>
				<el-col :span="2"><div class="grid-content bg-purple">考试</div></el-col>
				<el-col :span="2"><div class="grid-content bg-purple">考试</div></el-col>
				<el-col :span="2"><div class="grid-content bg-purple">考试</div></el-col>
				<el-col :span="2"><div class="grid-content bg-purple">考试</div></el-col>
				<el-col :span="2"><div class="grid-content bg-purple">考试</div></el-col>
			</el-row>
		</el-header>
		<el-container>
			<el-aside width="120px">
				<ul>
					<li>试题</li>
				</ul>
			</el-aside>
			<el-main>Main</el-main>
		</el-container>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				sysName:'VUEADMIN'
			}
		},

		methods: {
		},
		mounted() {
		}
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';
	header{
		.el-col{
			line-height: 50px;
			font-size: 18px;
		}
		.el-col-3{
			font-size: 24px;
			color: $color-primary;
			font-weight: bold;
		}
	}
</style>