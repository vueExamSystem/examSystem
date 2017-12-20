<template>
	<el-row>
		<div class="el-col- logo">EXAM</div>
		<el-col :span="2"><div class="grid-content bg-purple">试题</div></el-col>
		<el-col :span="2"><div class="grid-content bg-purple">试卷</div></el-col>
		<el-col :span="2"><div class="grid-content bg-purple">练习</div></el-col>
		<el-col :span="2"><div class="grid-content bg-purple">测验</div></el-col>
		<el-col :span="2"><div class="grid-content bg-purple">考试</div></el-col>
		<el-col :span="2"><div class="grid-content bg-purple">监考</div></el-col>
		<el-col :span="2"><div class="grid-content bg-purple">成绩</div></el-col>
		<el-col :span="2"><div class="grid-content bg-purple">统计</div></el-col>
		<el-col :span="2"><div class="grid-content bg-purple">后台</div></el-col>
		<el-col :span="2"><div class="grid-content bg-purple">设置</div></el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				sysName:'VUEADMIN',
                activeIndex: '1',
			}
		},

		methods: {
            handleSelect: {},
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
		.logo{
			font-size: 24px;
			color: $color-primary;
			width: 120px;
			line-height: 50px;
		}
	}
</style>