<template>
  <view v-if="visible" class="modal-mask">
    <view class="modal-view">
		<view :class="textCenter ? 'modal-container modal-text-center' : 'modal-container'">
			<view v-if="title" class="modal-title">{{title}}</view>
			<!-- 自定义内容 -->
			<slot name="header"></slot>
			<scroll-view v-if="content || editable" scroll-y class='modal-content'>
				<view v-if="content">
					{{content}}
				</view>
				<view v-if="editable">
					<input 
						class="uni-input" 
						:placeholder="inputProps.placeholder"
						v-model="inputVal" 
						@input="inputChange" />
				</view>
			</scroll-view>
			<!-- 自定义内容 -->
			<slot name="body"></slot>
			<view v-if="showCancel || showConfirm" class="modal-buttons">
				<button v-if="showCancel" class="modal-button btn-cancel" @click="onCancel">{{ cancelText }}</button>
				<button v-if="showConfirm" class="modal-button" @click="onConfirm">{{ confirmText }}</button>
			</view>
			<!-- 自定义内容 -->
			<slot name="footer"></slot>
		</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
	textCenter: {
		type: Boolean,
		default: true,
	},
	showConfirm: {
		type: Boolean,
		default: true,
	},
	confirmText: {
		type: String,
		default: '确定',
	},
	showCancel: {
		type: Boolean,
		default: true,
	},
	cancelText: {
		type: String,
		default: '取消',
	},
	editable: {
		type: Boolean,
		default: false,
	},
	inputProps: {
		type: Object,
		default: () => ({}),
	},
	// inputVerify: {// 小程序中序列化后函数会被设置null，uniapp太low
	// 	type: Function,
	// 	required: false
	// },
	// conirmProps: {
	// 	type: Object,
	// 	default: () => ({}),
	// },
  },
  data() {
	  return {
		  visible: false,
		  inputVal: '',
		  query: {},
	  }
  },
  mounted() {
	  console.log('ew', this.inputVerify)
  },
  methods: {
	inputChange(e) {
		let val = e.target.value;
		const type = this.inputProps && this.inputProps.type;
		if (type === 'number') {
			val = (val || '').toString().replace(/[^\d]/g, '')
		}
		this.$nextTick(() => {
		  // 将截断后的内容重新赋值给输入框
		  // 注意：使用 `nextTick` 方法确保在DOM更新后再进行赋值操作
		  this.inputVal = val;
		});
	},
	showModal(query = null) {
		this.query = query;
		this.visible = true;
	},
	hideModal() {
		this.visible = false;
		this.inputVal = '';
	},
	onConfirm() {
	  // 确认按钮点击事件
	  const data = {
		  ...this.query,
		  inputVal: this.inputVal,
	  }
	  this.hideModal()
	  this.$emit('confirm', data);
	  
	},
	onCancel() {
	  // 取消按钮点击事件
	  const data = {
		...this.query,
	  }
	  this.hideModal();
	  this.$emit('cancel', data);
	},
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

.modal-view {
  background-color: #fff;
  border-radius: 8px;
  width: 250px;
}

.modal-container {
	padding: 20px;
	border-radius: 8px;
	color: #000000;
	background: linear-gradient(180deg, rgba(40, 197, 201, 0.49175) 2.48%, rgba(255, 255, 255, 0.0001) 100%);
}

.modal-text-center {
	text-align: center;
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.modal-content {
  font-size: 14px;
  margin-bottom: 20px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
}

.modal-button {
  width: 100%;
  border-radius: 4px;
  background-color: #01C2C3;
  color: #fff;
}

.btn-cancel {
	background-color: #fff;
	font-family: 'PingFang SC';
	font-style: normal;
	color: #01C2C3;
}

.modal-button + .modal-button {
	margin-left: 16px;
}

.uni-input {
	border: 0.5px solid #75e5da;
	/* border: 0.5px solid #fff; */
	border-radius: 4px;
	padding: 8px;
	color: #01C2C3;
}
</style>
