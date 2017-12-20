<template>
	<el-container>
		<el-header height="50px">
			<Nav></Nav>
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
	import Nav from './common/Nav.vue'
	export default {
		data() {
			return {
				sysName:'VUEADMIN'
			}
		},
        components: {
		    Nav,
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
		}
	}
</style>