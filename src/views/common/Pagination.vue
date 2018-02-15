<template>
    <section id="pagination" class="clearfix">
        <div class="page">
            第
            <span>{{pageNoParam}}</span>
            /
            <span>{{getPageNumCom}}</span>
            页
        </div>
        <ul>
            <li class="box first" @click="setFirstPage()"><i class="iconfont icon-step-backward"></i></li>
            <li class="box pre" @click="setPrePage()"><i class="iconfont icon-angle-left"></i></li>
            <li class="input">
                <input id="inputVal" type="text" placeholder="页码" v-bind:value="pageNoParam">
            </li>
            <li class="box next" @click="setNextPage()"><i class="iconfont icon-angle-right"></i></li>
            <li class="box last" @click="setLastPage()"><i class="iconfont icon-step-forward"></i></li>
            <li class="btn" @click="setInputPage()">GO</li>
        </ul>
    </section>
</template>

<script>
    import _ from 'lodash';
    import $ from 'jquery';

    export default {
        props: {
            pageNo: {
                require: false,
                default: 1,
            },
            totalCount: [Number, String], // 总共多少条数据
            pageSize: [Number, String], // 每页数据数量
        },
        data() {
            return {
                pageNum: 1,
                pageNoParam: _.parseInt(this.pageNo),
            };
        },
        methods: {
            setFirstPage() {
                if (this.pageNoParam === 1) return;
                this.pageNoParam = 1;
                this.bindPageChangeEve();
            },
            setPrePage() {
                if (this.pageNoParam === 1) return;
                this.pageNoParam = this.pageNoParam - 1;
                this.bindPageChangeEve();
            },
            setNextPage() {
                if (this.pageNoParam === _.parseInt(this.pageNum)) return;
                this.pageNoParam = _.parseInt(this.pageNoParam) + 1;
                this.bindPageChangeEve();
            },
            setLastPage() {
                const allPage = this.pageNum;
                if (this.pageNoParam === allPage) return;
                this.pageNoParam = allPage;
                this.bindPageChangeEve();
            },
            setInputPage() {
                const val = _.parseInt($('#inputVal').val());
                if (val === NaN) return;
                if (val > this.pageNum || val < 1) return;
                if (val === _.parseInt(this.pageNoParam)) return;
                if (_.floor(val) !== val) return;
                this.pageNoParam = val;
                this.bindPageChangeEve();
            },
            getPageNum() {
                let num = 1;
                const totalCount = _.parseInt(this.totalCount);
                const pageSize = _.parseInt(this.pageSize);
                if (totalCount % pageSize > 0) {
                    num = _.floor(totalCount / pageSize) + 1;
                } else {
                    num = _.floor(totalCount / pageSize);
                }
                if (totalCount / pageSize === 0 ||
                totalCount === pageSize) {
                    num = 1;
                }
                return num;
            },
            bindPageChangeEve() {
                this.$emit('page-change', this.pageNoParam);
            }
        },
        watch:{
            pageNo: {
                handler(curVal,oldVal){
                    this.pageNoParam = _.parseInt(curVal);
                },
            }
        },
        computed: {
            gettotalCount() {
                return this.totalCount;
            },
            getPageNumCom() {
                let num = 1;
                const totalCount = _.parseInt(this.totalCount);
                const pageSize = _.parseInt(this.pageSize);
                if (totalCount % pageSize > 0) {
                    num = _.floor(totalCount / pageSize) + 1;
                } else {
                    num = _.floor(totalCount / pageSize);
                }
                if (totalCount / pageSize === 0 ||
                totalCount === pageSize) {
                    num = 1;
                }
                this.pageNum = num;
                return num;
            },
        },
        mounted() {
            this.pageNum = this.getPageNum();
        }
    }

</script>

<style lang="scss" scoped>
    @import '~scss_vars';

    #pagination {
        .page {
            min-width: 72px;
            float: left;
            height: 24px;
            line-height: 24px;
        }
        & > ul {
            float: left;
            margin-left: 10px;

            li {
                height: 24px;
                box-sizing: border-box;
                border: 1px solid $base-border;
                border-right: 0;
                float: left;
                line-height: 22px;
                text-align: center;
                color: $color-primary;

                &:first-child {
                    border-bottom-left-radius: $radius-size;
                    border-top-left-radius: $radius-size;
                }
                &:last-child {
                    border-top-right-radius: $radius-size;
                    border-bottom-right-radius: $radius-size;
                }
            }
            .box {
                display: block;
                width: 40px;
                @include gradientTop(#FFFFFF, #B5B5CD);

                &:last-child {
                    border-right: 1px solid $base-border;
                }
            }
            .input {
                float: left;
                width: 65px;
                background-color: #ffffff;
                input {
                    width: 100%;
                    height: 20px;
                    border: 0;
                    outline: 0;
                    text-align: center;
                }
            }
            .btn {
                width: 40px;
                background-color: $color-primary;
                color: #ffffff;
            }
        }
    }
</style>