<template>
    <section
            v-bind:class="[ !!noBottomBorder ? 'noBottom' : '', 'filter-wrap' ]"
    >
        <ul class="filter-list">
            <template v-for="row in rows">
                <li class="filter-row clearfix" :field="row.field">
                    <label>{{row.title}}：</label>
                    <!--单选-->
                    <ul v-if="row.children && row.children.length > 0 && !row.multiple" class="filter-items">
                        <li
                                v-if="!row.noAll"
                                v-bind:class="{ checked: filters[row.field] === -1 || !filters[row.field] }"
                                @click="toggleCheckCommon(row, true)"
                                role="all">
                            <span>全部</span>
                        </li>
                        <template v-for="item in row.children">
                            <li
                                    @click="toggleCheckCommon(row, item)"
                                    role="item"
                                    :name="item.value"
                                    :key="item.value"
                                    v-bind:class="{ checked: item.value === filters[row.field] }"
                            >
                                <span>{{item.text}}</span>
                            </li>
                        </template>
                    </ul>
                    <!--多选-->
                    <ul v-if="row.children && row.children.length > 0 && row.multiple" class="filter-items">
                        <!-- <li :class="{checked:row.isCheckedAll}" @click="toggleCheck($event);" role="all"><span>全部</span></li> -->
                        <li class="checked" @click="toggleCheck($event);" role="all"><span>全部</span></li>
                        <template v-for="item in row.children">
                            <!-- <li :class="{checked:item.isChecked}" @click="toggleCheck($event);" role="item" :name="item.value"> -->
                            <li @click="toggleCheck($event);" role="item" :name="item.value" :key="item.value">
                                <span>{{item.text}}</span>
                            </li>
                        </template>
                    </ul>
                    <!--特殊列-->
                    <div v-if="row.arr !== undefined && row.arr.length > 0" class="filter-item-special">
                        <template v-for="item in row.arr">
                            <el-select
                                    :key="item.id"
                                    v-if="item.type === 'select'"
                                    placeholder="请选择正确选项">
                                <el-option
                                        v-for="d in item.data"
                                        :label="d.name"
                                        :value="d.id"
                                        :key="d.id"
                                ></el-option>
                            </el-select>
                            <el-button
                                    :key="item.id"
                                    v-if="item.type === 'button'"
                                    :type="item.classType"
                                    @click="addEmit(item.eventName)"
                                    class="el-button-shadow">
                                {{item.text}}
                            </el-button>
                        </template>
                    </div>
                    <!--展开/收起-->
                    <div class="filter-events" v-show="0">
                        <template v-if="isOpen">
                            <i class="iconfont icon-arrow-up"></i>
                            <span>收起</span>
                        </template>
                        <template v-else>
                            <i class="iconfont icon-arrow-down"></i>
                            <span>展开</span>
                        </template>
                    </div>
                </li>
            </template>
        </ul>
    </section>
</template>
<script>
    import $ from 'jquery';
    import _ from 'lodash';
    // import u from '../../common/js/util.js';
    // import Vue from 'vue';

    const demoList = [{ // common
        title: '院系', // label
        field: 'department', // key
        noAll: false, // 是否需要全部
        children: [{ // detail li
            value: '14', // key
            text: '计算机' // text
        }, {
            value: '15',
            text: '物电学院'
        }, {
            value: '16',
            text: '小学教育'
        }]
    }, { // special row 都必填
        title: '班级',
        field: 'class',
        arr: [ // 具体特殊项（目前加入单选，按钮，需要继续加）
            {
                id: 0,
                type: 'select', // 特殊项的类型 （button select等）
                data: [],
            }, {
                id: 1,
                type: 'button',
                classType: 'primary',
                text: '添加',
                eventName: 'backstageCourseAdd', // 绑定的事件
            },
        ],
    }];
    export default {
        props: {
            list: {
                required: true,
                type: Array
            },
            noBottomBorder: {
                required: false,
            }
        },
        data() {
            return {
                isOpen: 0,//收起展开未做
                filters: {},
                rows: this.list,
            }
        },
        watch:{
            list: {
                handler(curVal,oldVal){
                    this.filters = this.getFilterParam();
                    this.$emit('callback', this.filters);
                    this.rows = curVal;
                },
                deep:true
            }
        },
        methods: {
            removeArrValue(arr, value) {//从数组中删除value
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == value) {
                        arr.splice(i, 1);
                        break;
                    }
                }
            },
            toggleCheck(e) {
                var _this_ = this;
                var $element = $(e.currentTarget);
                var $row = $element.closest('.filter-row');
                var rowIndex = $row.index();
                var itemIndex = $element.index() - 1;//去掉全部一项
                var role = $element.attr('role');
                var field = $row.attr('field');
                if (role == 'all') {

                    if ($element.hasClass('checked')) {
                        return;
                    } else {
                        $element.addClass('checked');
                        $row.find('[role="item"]').removeClass('checked');
                        _this_.filters[field].length = 0;
                    }
                } else {
                    var value = $element.attr('name');
                    $element.toggleClass('checked');
                    if ($element.hasClass('checked')) {
                        $row.find('[role="all"]').removeClass('checked');
                        _this_.filters[field].push(value);
                    } else {
                        _this_.removeArrValue(_this_.filters[field], value);
                        if (_this_.filters[field].length == 0) {
                            $row.find('[role="all"]').addClass('checked');
                        }
                    }
                }
                console.log('_this_.list', _this_.list[rowIndex])
                _this_.$emit('callback', _this_.filters);
            },
            toggleCheckCommon(row, item) {
                if(row.isLinkage) {
                    this.$emit('linkage', row.field, item === true ? -1 : item.value);
                }
                this.filters[row.field] = item === true ? -1 : item.value;
                this.$forceUpdate();
                this.filters = this.getFilterParam();
                this.$emit('callback', this.filters);
            },
            addEmit(eveName) {
                this.$emit(eveName);
            },
            isChecked(item, row) {
                let str = '';
                if (typeof item === 'object' && typeof row === 'object') {
                    str = item.value === this.filters[row.field] ? 'checked' : '';
                }
                return str;
            },
            getFilterParam() {
                const res = {};
                const filter = this.filters;
                this.list.forEach(item => {
                    let value = filter[item.field];
                    if (value === undefined || value === '') value = -1;
                    res[item.field] = value;
                });
                return res;
            },
        },
        computed: {

        },
        mounted() {
            this.filters = this.getFilterParam();
            // this.$emit('callback', this.filters);
        }
    }
</script>
<style lang="scss">
    @import '~scss_vars';

    .filter-wrap {
        box-shadow: 0 2px 8px 0 rgba(181, 181, 205, 0.4);
        border-radius: 8px;
        padding: 20px 10px;

        &.noBottom{
            box-shadow: none;
        }
        .filter-list {
            .filter-row {
                font-size: 0;
                label {
                    display: inline-block;
                    width: 60px;
                    font-size: 14px;
                    letter-spacing: 0.87px;
                    line-height: 46px;
                    float: left;
                }
                .filter-items {
                    display: inline-block;
                    width: calc(100% - 120px);
                    & > li {
                        display: inline-block;
                        font-size: 14px;
                        color: #3C5398;
                        letter-spacing: 0.87px;
                        margin: 6px 12px;
                        padding: 6px;
                        cursor: pointer;
                        user-select: none;
                        &.checked {
                            margin: 6px;
                            padding: 6px 12px;
                            background: $-color-success;
                            color: #fff;
                            font-size: 16px;
                            letter-spacing: 1px;
                            box-shadow: 0 3px 4px 0 rgba(134, 190, 187, 0.50);
                            border-radius: 8px;
                        }
                    }
                }
                .filter-item-special {
                    display: inline-block;
                    padding-top: 5px;
                    .el-input,
                    .el-select,
                    .el-button {
                        margin-right: 20px;
                    }
                }
                .filter-events {
                    display: inline-block;
                    width: 60px;
                    font-size: 14px;
                    color: #3C5398;
                    letter-spacing: 0.87px;
                    cursor: pointer;
                    vertical-align: top;
                    text-align: center;
                    margin-top: 14px;
                }
            }
        }
    }
</style>
