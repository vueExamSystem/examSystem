<template>
	<el-container>
		<el-header height="50px">
			<div class="logo">EXAM</div>
			<el-row id="nav-header">
				<el-col :span="2" :offset="1">
					<router-link to="/">首页</router-link>
				</el-col>
				<el-col :span="2">
					<router-link to="/question">试题</router-link>
				</el-col>
				<el-col :span="2">
					<router-link to="/paper">试卷</router-link>
				</el-col>
				<el-col :span="2">
					<router-link to="/preview">预习</router-link>
				</el-col>
				<el-col :span="2">
					<router-link to="/test">测验</router-link>
				</el-col>
				<el-col :span="2">
					<router-link to="/exam">考试</router-link>
				</el-col>
				<el-col :span="2">
					<router-link to="/listen">监考</router-link>
				</el-col>
				<el-col :span="2">
					<router-link to="/score">成绩</router-link>
				</el-col>
				<el-col :span="2">
					<router-link to="/statistics">统计</router-link>
				</el-col>
				<el-col :span="2">
					<router-link to="/backstage">后台</router-link>
				</el-col>
				<el-col :span="2">
					<router-link to="/setting">设置</router-link>
				</el-col>
			</el-row>
		</el-header>
		<el-main id="content">
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
	.el-container{
		height:100%;
		.el-header{
			padding-right: 10px;
			padding-left:10px;
			height:50px;
			background: #fff;
			box-shadow: 0 4px 4px 0 rgba(181,181,205,0.50);
			.el-col{
				a{
					font-size: 18px;
					color:#4a4a4a;
					letter-spacing: 2.3px;
					line-height: 50px;
				}
				a.router-link-active.router-link-exact-active{
					color:$color-primary;
				}
			}
			.logo{
				float:left;
				font-size: 24px;
				width: 120px;
				line-height: 50px;
				color: #3C5398;
				letter-spacing: 3.08px;
			}
			#nav-header{
				float:left;
				width: calc(100% - 120px);

			}
		}
		.el-main{
			margin-top:10px;
			padding:0;
			height: calc(100% - 70px;);
		}
	}
</style>