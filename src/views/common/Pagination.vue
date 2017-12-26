<template>
    <section id="pagination" class="clearfix">
        <div class="page">
            第
            <span>{{currentPage}}</span>
            /
            <span>{{pageNum}}</span>
            页
        </div>
        <ul>
            <li class="box first" @click="setFirstPage()"><i class="fa fa-step-backward"></i></li>
            <li class="box pre" @click="setPrePage()"><i class="fa fa-angle-left"></i></li>
            <li class="input">
                <input id="inputVal" type="text" placeholder="页码" v-bind:value="currentPage">
            </li>
            <li class="box next" @click="setNextPage()"><i class="fa fa-angle-right"></i></li>
            <li class="box last" @click="setLastPage()"><i class="fa fa-step-forward"></i></li>
            <li class="btn" @click="setInputPage()">GO</li>
        </ul>
    </section>
</template>

<script>
    import _ from 'lodash';
    import $ from 'jquery';

    export default {
        props: {
            current: [Number, String], // 当前页
            total: [Number, String], // 总共多少条数据
            pageSize: [Number, String], // 每页数据数量
        },
        data() {
            return {
                pageNum: 1,
                currentPage: _.parseInt(this.current),
                totalNum: _.parseInt(this.total),
                PageSizeNum: _.parseInt(this.pageSize),
            };
        },
        methods: {
            setFirstPage() {
                if (this.currentPage === 1) return;
                this.currentPage = 1;
                this.bindPageChangeEve();
            },
            setPrePage() {
                if (this.currentPage === 1) return;
                this.currentPage = this.currentPage - 1;
                this.bindPageChangeEve();
            },
            setNextPage() {
                if (this.currentPage === this.pageNum) return;
                this.currentPage = this.currentPage + 1;
                this.bindPageChangeEve();
            },
            setLastPage() {
                const allPage = this.pageNum;
                if (this.currentPage === allPage) return;
                this.currentPage = allPage;
                this.bindPageChangeEve();
            },
            setInputPage() {
                const val = _.parseInt($('#inputVal').val());
                if (val === NaN) return;
                if (val > this.pageNum || val < 1) return;
                if (val === this.currentPage) return;
                if (_.round(val) !== val) return;
                this.currentPage = val;
                this.bindPageChangeEve();
            },
            getPageNum() {
                let num = 1;
                if (this.totalNum % this.PageSizeNum > 0) {
                    num = _.round(this.totalNum / this.PageSizeNum) + 1;
                }
                if (this.totalNum % this.PageSizeNum === 0 && this.totalNum !== 0) {
                    num = this.totalNum / this.PageSizeNum;
                }
                return num;
            },
            bindPageChangeEve() {
                this.$emit('page-change', this.currentPage);
            }
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