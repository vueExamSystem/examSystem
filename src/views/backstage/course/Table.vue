<template>
    <div>
        <section v-if="courseId === ''" id="courseTable">
            <my-filter v-if="filterList.length > 0" :list="filterList" @callback="search" v-loading="filterLoading"></my-filter>
            <div class="panel">
                <div class="title">
                    <el-input placeholder="请输入搜索关键词" v-model="keyword">
                        <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
                    </el-input>

                    <!--分页-->
                    <div class="pageArea">
                        <Page :current="pageNo" :totalCount="totalCount" :pageSize="pageSize" @page-change="handleCurrentChange"></Page>
                    </div>

                </div>

                <div class="content">
                    <!--列表-->
                    <el-table
                            :data="list"
                            highlight-current-row
                            @selection-change="selsChange"
                            v-loading="listLoading"
                            style="width: 100%;">
                        <el-table-column type="index" label="ID">
                        </el-table-column>
                        <el-table-column prop="course" label="课程" sortable>
                            <template scope="scope">
                                <el-button type="text" @click="detailShow(scope.row.courseId)">{{scope.row.course}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="teacher" label="授课老师">
                        </el-table-column>
                        <el-table-column prop="term" label="学期">
                        </el-table-column>
                        <el-table-column prop="groups" label="班级名称">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="100">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small">添加</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </section>
        <section v-else>
            <course-detail :id="courseId" @close="detailClose"></course-detail>
        </section>
    </div>
</template>

<script>
    import {getSelectCourseList,getBackCourseFilter} from '../../../api/api';
    import myFilter from '../../common/myFilter.vue'
    import Pagination from '../../common/Pagination.vue'
    import courseDetail from './Detail.vue'
    import u from '../../../common/js/util';
    import _ from 'lodash';
    export default {
        data() {
            return {
                keyword: '',
                filter: {},
                list: [],
                totalCount: 0,
                pageNo: 1,
                pageSize: 10,
                listLoading: true,
                sels: [],//列表选中列
                // 过滤器数据
                filterList: [
                    {
                        title: '课程',
                        field: 'project',
                        children: [{
                            value: 'physics',
                            text: '大学物理'
                        }, {
                            value: 'mathematics',
                            text: '高等数学'
                        }, {
                            value: 'english',
                            text: '大学英语'
                        }]
                    }],
                // 选择某个班级id
                courseId: '',
            }
        },
        methods: {
            formatClass: function (row, column) {
                return row.className.join('，');
            },
            handleSizeChange(val) {
                //console.log(val);
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            search(obj) {
                this.filter = obj;this.pageNo = 1;
                //console.log(this.filter);
                this.getList();
            },
             // 获取初始数据
            getDefaultData() {
                getBackCourseFilter({}).then((res) => {
                        res=res.data;
                        this.filterList = res;
                        // filter 对应key默认好 -1
                        this.filter = u.getDefaultFilter(this.filterList);
                        this.getList();
                    });
            },
            //获取用户列表
            getList() {
                if (_.isEmpty(this.filter)) return;
                let para = {
                    pageNo: this.pageNo,
                    filter: JSON.stringify(this.filter),
                    pageSize: this.pageSize,
                    keyword: this.keyword,
                };
                this.listLoading = true;
                //NProgress.start();
                getSelectCourseList(para).then((res) => {
                    res=res.data;
                    this.list = res.rows;
                    this.totalCount=res.totalCount;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            changeCollapse(val) {
                console.log('changeCollapse', val);
            },
            // 显示详情面板
            detailShow(id) {
                this.courseId = id;
                console.log('courseId:',id);
            },
            // 关闭详情面板
            detailClose() {
                this.courseId = '';
            },
        },
        components: {
            'Page': Pagination,
            myFilter,
            courseDetail,
        },
        computed: {

        },
        mounted() {
            this.getDefaultData();
        }
    }

</script>

<style lang="scss">
    @import '~scss_vars';

</style>