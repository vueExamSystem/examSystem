<template>
	<div class="panel">
		<div class="title">
			<span>添加{{typeText}}</span>
			<div class="pull-right">
				<el-button type="primary" class="el-button-shadow">添加选中</el-button>
				<el-button type="danger" @click="goBack" class="el-button-shadow">取消</el-button>
			</div>
		</div>
		<div class="content">
			<my-filter :list="filterList" @callback="filterChange"></my-filter>
			<div class="panel inner-panel">
	            <div class="title">
	                <el-input placeholder="请输入搜索关键词" v-model="searchkey">
	                    <el-button slot="append" icon="el-icon-search"></el-button>
	                </el-input>
	                <div class="pageArea">
	                    <Page :current="currentPage" :total="total" :pageSize="pageSize" @page-change="pageChange"></Page>
	                </div>
	                
	            </div>
	            <div class="content">
	                <el-table :data="questionList" class="el-table-expand" highlight-current-row v-loading="listLoading" fit :row-class-name="setRowClass">
	                    <el-table-column type="selection" width="60">
	                    </el-table-column>
	                    <el-table-column type="index" label="序号" width="60">
	                    </el-table-column>
	                    <el-table-column prop="name" label="试题名称" min-width="160">
	                        <template scope="scope">
	                            <router-link to="/">{{scope.row.name}}</router-link>
	                        </template>
	                    </el-table-column>
	                    <el-table-column prop="category" label="试题类型" min-width="100">
	                    </el-table-column>
	                    <el-table-column prop="project" label="所属课程" min-width="120">
	                    </el-table-column>
	                    <el-table-column prop="chapter" label="所属章节" min-width="100">
	                    </el-table-column>
	                    <el-table-column align="right" prop="questionGroup" label="所属题组" min-width="120">
	                    </el-table-column>
	                    <el-table-column align="left" type="expand">
	                    	<template scope="scope">
	                    		<div style="margin: -20px -50px;">
		                    		<el-table class="el-inner-table" :data="scope.row.children" :show-header="isShowInnerHeader" highlight-current-row v-loading="listLoading" fit>
					                    <el-table-column prop="index" width="60">
					                    	<template></template>
					                    </el-table-column>
					                    <el-table-column prop="radio" width="60">
					                    	<template scope="scope">
					                    		<el-radio v-model="scope.$index" :label="scope.row.id"></el-radio>
					                    	</template>
					                    </el-table-column>
					                    <el-table-column prop="name" min-width="160">
					                        <template scope="scope">
					                            <router-link to="/">{{scope.row.name}}</router-link>
					                        </template>
					                    </el-table-column>
					                    <el-table-column prop="category" min-width="100">
					                    </el-table-column>
					                    <el-table-column prop="project" min-width="120">
					                    </el-table-column>
					                    <el-table-column prop="chapter" min-width="100">
					                    </el-table-column>
					                    <el-table-column min-width="120">
					                    	<template></template>
					                    </el-table-column>
					                    <el-table-column width="48">
					                    	<template></template>
					                    </el-table-column>
					                </el-table>
				                </div>
	                    	</template>
	                    </el-table-column>
	                </el-table>
	            </div>
	        </div>
		</div>
	</div>
</template>
<script>
	import myFilter from '../../common/myFilter.vue'
	import Pagination from '../../common/Pagination.vue'
	export default{
		props:{
			flag:{
				required: true
			}
		},
		components:{
			myFilter,
			Page: Pagination
		},
		computed:{

		},
		data(){
			return {
				filterList:[{
					title: '分类',
					field: 'category',
					children:[{
						value: 'wuli',
						text: '基础物理'
					},{
						value: 'shuxue1',
						text: '高等数学上'
					},{
						value: 'shuxue2',
						text: '高等数学下'
					},{
						value: 'yingyu',
						text: '英语口语'
					}]
				},{
					title: '标签',
					field: 'label',
					children:[{
						value: 'easy',
						text: '送分题'
					},{
						value: 'simple',
						text: '简单题'
					},{
						value: 'trap',
						text: '易错题'
					}]
				}],
				questionList:[{
					name: '万有引力',
					category: '单选',
					project: '大学物理',
					chapter: '第一章',
					questionGroup: '组别01',
                	innerRadio: '11',
					children:[{
						id: '11',
						name: '万有引力',
						category: '单选',
						project: '大学物理',
						chapter: '第一章'
					},{
						id: '12',
						name: '万有引力',
						category: '单选',
						project: '大学物理',
						chapter: '第一章'
					}]
				},{
					name: '万有引力',
					category: '单选',
					project: '大学物理',
					chapter: '第一章',
					questionGroup: '组别02',
                	innerRadio: '21',
					children:[{
						id: '21',
						name: '万有引力',
						category: '单选',
						project: '大学物理',
						chapter: '第一章'
					},{
						id: '22',
						name: '万有引力',
						category: '单选',
						project: '大学物理',
						chapter: '第一章'
					}]
				},{
					name: '万有引力',
					category: '单选',
					project: '大学物理',
					chapter: '第一章',
					questionGroup: '组别03',
                	innerRadio: '31',
					children:[{
						id: '31',
						name: '万有引力',
						category: '单选',
						project: '大学物理',
						chapter: '第一章'
					},{
						id: '32',
						name: '万有引力',
						category: '单选',
						project: '大学物理',
						chapter: '第一章'
					}]
				},{
					name: '万有引力',
					category: '单选',
					project: '大学物理',
					chapter: '第一章',
					questionGroup: '组别04',
                	innerRadio: '41',
					children:[{
						id: '41',
						name: '万有引力',
						category: '单选',
						project: '大学物理',
						chapter: '第一章'
					},{
						id: '42',
						name: '万有引力',
						category: '单选',
						project: '大学物理',
						chapter: '第一章'
					}]
				},{
					name: '万有引力',
					category: '单选',
					project: '大学物理',
					chapter: '第一章',
					questionGroup: '组别05',
                	innerRadio: '51',
					children:[{
						id: '51',
						name: '万有引力',
						category: '单选',
						project: '大学物理',
						chapter: '第一章'
					},{
						id: '52',
						name: '万有引力',
						category: '单选',
						project: '大学物理',
						chapter: '第一章'
					}]
				},{
					name: '万有引力',
					category: '单选',
					project: '大学物理',
					chapter: '第一章',
					questionGroup: '组别06',
                	innerRadio: '61',
					children:[{
						id: '61',
						name: '万有引力',
						category: '单选',
						project: '大学物理',
						chapter: '第一章'
					},{
						id: '6',
						name: '万有引力',
						category: '单选',
						project: '大学物理',
						chapter: '第一章'
					}]
				}],
				searchkey: '',
                total: 10,
                currentPage: 1,
                pageSize:5,
                listLoading: false,
                isShowInnerHeader: false,
                innerRadio: '11'
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
			},
			filterChange(filterArr){
				
			},
			pageChange(current){

			},
			setRowClass({rowIndex}){
				if(rowIndex%2 == 0){
					return 'el-row-odd';
				}else{
					return 'el-row-even';
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '~scss_vars';
	.filter-wrap{
		box-shadow: none;
		border-radius: 0;
	}
	.inner-panel{
		.content{
			border-width: 0;
		}
	}
</style>