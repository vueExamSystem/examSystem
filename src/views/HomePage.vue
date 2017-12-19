<template>
	<el-container>
		<el-header>Header</el-header>
		<el-container>
			<el-aside width="120px">Aside</el-aside>
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

</style>