<template>
	<div class="panel">
		<div class="title">
			<span>添加{{typeText}}</span>
			<div class="pull-right">
				<el-button type="primary" class="el-button-shadow">添加选中</el-button>
				<el-button type="danger" @click="goBack" class="el-button-shadow">取消</el-button>
			</div>
		</div>
		<div class="content" v-loading="!isInited" style="min-height:300px;">
			<my-filter v-show="isInited" v-if="isFilterInited" :list="filterList" @callback="filterCallback"></my-filter>
			<div class="panel inner-panel" v-if="isInited">
	            <div class="title">
	                <el-input placeholder="请输入搜索关键词" v-model="keyword" @change="searchClick">
	                    <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
	                </el-input>
	                <div class="pageArea">
	                    <Page v-if="!isNewPage" :pageNo="pageNo" :totalCount="totalCount" :pageSize="pageSize" @page-change="pageChange"></Page>
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
					                    	<template scope="props">
					                    		<el-radio v-model="scope.row.innerRadio" :label="props.row.id"></el-radio>
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
	import { getProblemFilter, getProblemList } from '../../../api/api';
	import u from '../../../common/js/util';
	export default{
		props:{
			id:{//试卷id
				required: true
			},
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
				isInited: false,
				isFilterInited: false,
				filter:[],
				filterList: [],
				questionList: [],
				keyword: '',
				isNewPage: true,//是否新分页
                totalCount: 10,
                pageNo: 1,
                pageSize:5,
                listLoading: false,
                isShowInnerHeader: false
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
            // 获取过滤器数据
            getFilter() {
                this.isInited = false;
                this.listLoading = true;
                getProblemFilter({}).then((res) => {
                    this.filterList = res.data;
                    // filter 对应key默认好 -1
                    this.filter = u.getDefaultFilter(this.filterList);
                    this.isFilterInited = true;
                });
            },
            search(){
                this.listLoading = true;
                var params = {
                    keyword: this.keyword,
                    filter: JSON.stringify(this.filter),
                    pageNo: this.pageNo,
                    pageSize: this.pageSize
                };
                getProblemList(params).then(res => {
                    this.questionList = res.data.rows;
                    this.totalCount = res.data.totalCount;
                    this.isNewPage = false;
                    this.listLoading = false;
                    this.isInited = true;
                });
            },
            searchClick(){
            	this.isNewPage = true;
                this.pageNo = 1;
                this.search();
            },
            filterCallback(filter){
                this.filter = filter;
                this.isNewPage = true;
                this.pageNo = 1;
                this.search();
            },
            pageChange(pageNo){
                this.pageNo = pageNo;
                this.search();
            },
			setRowClass({rowIndex}){
				if(rowIndex%2 == 0){
					return 'el-row-odd';
				}else{
					return 'el-row-even';
				}
			},
			goBack(){
				this.$emit('back');
			}
		},
		mounted(){
			this.getFilter();
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