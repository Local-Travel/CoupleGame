<template>
  <view v-if="visible" class="bottom-layer-role">
	<view class="header">
		<view class="btn-cancel" @click="onCancel">取消</view>
		<view class="btn-ok" @click="onConfirm">完成</view>
	</view>
    <!-- 弹层内容 -->
	<scroll-view class="layer-content" :scroll-y="true">
		<view class="content">
		  <view class="select-item" v-for="(item,index) in list" :key="index">
		  	<view class="plus-con">
		  		<view class="plus-minus plus" @click="() => handleMinus(item, index)"></view>
		  		<view class="middle-num">{{item.name}} <text class="count">{{item.roleCount}}</text></view>
		  		<view class="plus-minus minus" @click="() => handlePlus(item, index)"></view>
		  	</view>
		  </view>
		</view>
	</scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
		visible: false,// 是否显示弹窗
		list: [],
    };
  },
  methods: {
    showModal({ list }) {
		this.list = Array.isArray(list) ? list : []
		this.visible = true;
	},
	hideModal() {
		this.visible = false;
	},
	onCancel() {
		this.hideModal();
		this.$emit('cancel');
	},
	onConfirm() {
		this.hideModal();
		this.$emit('confirm', {});
	},
	handlePlus(item, index) {
		// console.log('handlePlus', item)
		if (item.roleCount < 30) {
			item.roleCount += 1 
			this.$set(this.list, index, item)
		}
	},
	handleMinus(item, index) {
		if (item.roleCount > 0) {
			item.roleCount -= 1 
			this.$set(this.list, index, item)
		}
	},
  }
};
</script>

<style scoped>
.bottom-layer-role {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 300px;
  /* background: linear-gradient(180deg, #07accf 0%, rgba(0, 0, 0, 1) 31.84%); */
  background: linear-gradient(to bottom, #07accf 0%, rgba(0, 0, 0, 1) 100%)
  /* 其他样式属性 */
}
.header {
	font-size: 20px;
	font-weight: 600;
	text-align: center;
	line-height: 48px;
	padding: 0px 20px;
	border-bottom: 0.5px solid #fff;
	color: #fff;
	/* background: #fff; */
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.layer-content {
	height: 250px;
}

.content {
  /* 弹层内容的样式 */
  padding: 0px 0px 24px;
}

.select-item {
	border-width: 1px;
	border-style: solid;
	border-image: linear-gradient(to right, transparent, #ffffff, transparent) 1;
	height: 58px;
	line-height: 58px;
}

.plus-con {
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.middle-num {
	margin: 0px 16px;
	color: #00ffff;
	min-width: 120px;
	font-size: 24px;
	font-weight: 600;
	text-align: center;
}
.count {
	margin-left: 8px;
}
.plus-minus {
  position: relative;
  width: 24px;
  height: 24px;
  border: 1px solid #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}

.plus-minus::before,
.plus-minus::after {
  content: '';
  position: absolute;
  height: 2px;
  width: 12px;
  background-color: #fff;
}

.plus-minus::before {
  transform: rotate(90deg);
}

.plus-minus:hover::before,
.plus-minus:hover::after {
  background-color: #333;
}

.plus-minus:hover {
  border-color: #333;
}

.plus-minus.plus::before {
  transform: rotate(0deg);
}

.plus-minus.minus::before {
  transform: rotate(90deg);
}

</style>
