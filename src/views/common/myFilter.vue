<template>
	<section class="filter-wrap">
        <ul class="filter-list">
        	<template v-for="row in list">
        		<li class="filter-row" :field="row.field">
	                <label>{{row.title}}：</label>
	                <ul class="filter-items">
	                    <!-- <li :class="{checked:row.isCheckedAll}" @click="toggleCheck($event);" role="all"><span>全部</span></li> -->
	                    <li class="checked" @click="toggleCheck($event);" role="all"><span>全部</span></li>
	                    <template v-for="item in row.children">
	                		<!-- <li :class="{checked:item.isChecked}" @click="toggleCheck($event);" role="item" :name="item.value"> -->
	                		<li @click="toggleCheck($event);" role="item" :name="item.value">
	                			<span>{{item.text}}</span>
	                		</li>
                		</template>
	                </ul>
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
	import $ from 'jquery'
    export default {
        props: {
            list:{
                required: true,
                type: Array
            }
        },
        data() {
            return {
                isOpen:0,//收起展开未做
                filters: {}
            }
        },
        computed:{
				
        },
        created(){
        	// 初始化checked
			// 初始化filters
			var _this_ = this;
    		for(var i=0;i<_this_.list.length;i++){
    			var row = _this_.list[i];
    			// row.isCheckedAll = 1;
    			_this_.filters[row.field] = [];
    		// 	for(var j=0;j<row.children.length;j++){
    		// 		var item = row.children[j];
    		// 		if(item.isChecked === 1 || item.isChecked === '1'){
						// item.isChecked = 1;
						// row.isCheckedAll = 0;
						// _this_.filters[row.field].push(item.value);
    		// 		}else{
    		// 			item.isChecked = 0;
    		// 		}
    		// 	}
    		}
        },
        methods: {
        	removeArrValue(arr,value){//从数组中删除value
        		for (var i = 0; i < arr.length; i++) {
        			if(arr[i] == value){
        				arr.splice(i,1);
        				break;
        			}
        		}
        	},
            toggleCheck(e){
            	var _this_ = this;
                var $element = $(e.currentTarget);
                var $row = $element.closest('.filter-row');
                var rowIndex = $row.index();
                var itemIndex = $element.index() - 1;//去掉全部一项
                var role = $element.attr('role');
                var field = $row.attr('field');
                if(role == 'all'){

                	if($element.hasClass('checked')){
                		return;
                	}else{
                		$element.addClass('checked');
                		$row.find('[role="item"]').removeClass('checked');
                		_this_.filters[field].length = 0;
                	}

      //           	if(_this_.list[rowIndex].isCheckedAll){
      //           		return;
      //           	}else{
						// _this_.list[rowIndex].isCheckedAll = 1;
						// for(var i=0;i<_this_.list[rowIndex].children.length;i++){
						// 	_this_.list[rowIndex].children[i].isChecked = 0;
						// }
						// _this_.filters[field].length = 0;
      //           	}
                }else{
                	var value = $element.attr('name');
                	$element.toggleClass('checked');
                	if($element.hasClass('checked')){
                		$row.find('[role="all"]').removeClass('checked');
                		_this_.filters[field].push(value);
                	}else{
						_this_.removeArrValue(_this_.filters[field],value);
                		if(_this_.filters[field].length==0){
                			$row.find('[role="all"]').addClass('checked');
                		}
                	}

      //           	_this_.list[rowIndex].children[itemIndex].isChecked = !_this_.list[rowIndex].children[itemIndex].isChecked;

      //           	if(_this_.list[rowIndex].children[itemIndex].isChecked){
      //           		_this_.$set(_this_.list[rowIndex].isCheckedAll,0);
						// _this_.filters[field].push(value);
      //           	}else{
      //           		_this_.removeArrValue(_this_.filters[field],value);
      //           		if(_this_.filters[field].length==0){
      //           			_this_.list[rowIndex].isCheckedAll = 1;
      //           		}
      //           	}
                }
                console.log('_this_.list',_this_.list[rowIndex])
                _this_.$emit('callback', _this_.filters);
           }
        },
        mounted() {
			this.$emit('callback', this.filters);
        }
    }
</script>
<style scoped lang="scss">
    @import '~scss_vars';
	.filter-wrap{
		box-shadow: 0 2px 8px 0 rgba(181,181,205,0.4);
		border-radius: 8px;
		padding: 20px 10px;
		.filter-list{
			.filter-row{
				font-size:0;
				label{
					display:inline-block;
					width: 60px;
					font-size: 14px;
					letter-spacing: 0.87px;
				}
				.filter-items{
					display: inline-block;
					width: calc(100% - 120px);
					&>li{
						display: inline-block;
						font-size: 14px;
						color: #3C5398;
						letter-spacing: 0.87px;
						margin: 6px 12px;
						padding: 6px;
						cursor:pointer;
						user-select:none;
						&.checked{
							margin: 6px;
							padding: 6px 12px;
						 	background: $-color-success;
						 	color:#fff;
							font-size: 16px;
							letter-spacing: 1px;
							box-shadow: 0 3px 4px 0 rgba(134,190,187,0.50);
							border-radius: 8px;
						}
					}
				}
				.filter-events{
					display: inline-block;
					width: 60px;
					font-size: 14px;
					color: #3C5398;
					letter-spacing: 0.87px;
					cursor: pointer;
					vertical-align:top;
					text-align:center;
					margin-top:14px;
				}
			}
		}
	}
</style>
