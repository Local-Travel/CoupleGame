<template>
	<view v-if="visible" class="wrapper">
		<view class="modal-mask"></view>
			<view class="modal">
				<view class="modal-container">
				  <view class="close-btn" @click="onCancel">
						<view class="close-btn__x"></view>
				  </view>
				  <view class="head-icon">
						<view class="head-icon-title">
							{{ title }}
						</view>
				  </view>
				  <view class="modal-body">
						<view class="body-bg"></view>
						<view class="center">
							<!-- <view class="rotate-scale-up-ver"> -->
								<image :src="roleUrl" alt="icon" class="img"></image>
							<!-- </view> -->
							<view class="body-title">{{ roleGroup }}</view>
							<view class="body-sub-titile">
								{{ roleTip }}
							</view>
						</view>
				  </view>
				  <view class="modal-footer">
						<button class="btn btn-ok" @click="onConfirm">{{confirmText}}</button>
				  </view>
				</view>
			</view>
	</view>
</template>

<script>
export default {
  props: {
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
		default: '我知道了',
	},
	showCancel: {
		type: Boolean,
		default: false,
	},
	cancelText: {
		type: String,
		default: '取消',
	},
  },
  data() {
	  return {
		  visible: false,// 是否显示弹窗
		  roleUrl: '', // 图片地址
		  roleGroup: '',// 文案描述
		  title: '',// 标题
		  roleTip: ''// 文案补充描述
	  }
  },
	methods: {
		showModal({ roleUrl, roleGroup, title, roleTip }) {
			this.roleGroup = roleGroup;
			this.roleUrl = roleUrl;
			this.title = title || '你的角色'
			this.roleTip = roleTip || '请保密自己的角色身份'
			this.visible = true;
		},
		hideModal() {
			this.visible = false;
		},
		getVisible() {
			return this.visible;
		},
		onConfirm() {
			this.hideModal()
			this.$emit('confirm');
		},
		onCancel() {
			this.hideModal();
			this.$emit('cancel');
		},
	},
};
</script>

<style scoped>
	.close-btn {
		position: absolute;
		top: -60px;
		right: -10px;
		display: inline-block;
		width: 36px;
		height: 36px;
		border: none;
		border-radius: 50%;
		background-color: transparent;
		outline: none;
		z-index: 1000;
	}

	.close-btn__x {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 20px;
		height: 2px;
	}

	.close-btn__x::before {
		content: "";
		position: absolute;
		transform: rotate(45deg);
		width: 20px;
		height: 2px;
		background-color: #fff;
		border-radius: 1px;
	}

	.close-btn__x::after {
		content: "";
		position: absolute;
		transform: rotate(-45deg);
		width: 20px;
		height: 2px;
		background-color: #fff;
		border-radius: 1px;
	}

	.head-icon {
		position: absolute;
		width: 135px;
		height: 151px;
		left: 84px;
		top: -60px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.head-icon-title {
		font-family: "PingFang SC";
		font-style: normal;
		font-weight: 600;
		font-size: 24px;
		line-height: 34px;
		/* identical to box height */

		text-align: center;
		/* color: #ffffff; */
		/* color: #01C2C3; */
		text-align: center;
		-webkit-letter-spacing: 2px;
		-moz-letter-spacing: 2px;
		-ms-letter-spacing: 2px;
		letter-spacing: 2px;

		background: linear-gradient(180deg, #ffffff 0%, #01C2C3 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-fill-color: transparent;
	}

	.wrapper {
		height: 100vh;
		width: 100vw;
		overflow: hidden;
		font-family: "PingFang SC";
		font-style: normal;
	}

	.modal {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 310px;
		height: 380px;
		border-radius: 10px;
		z-index: 999;
		/* background-color: #F1F1F5; */
	}

	.modal-mask {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 998;
		background-color: rgba(0, 0, 0, 1);
		/* background-image: url('../static/icon-mask-bg.png'); */
		background-image: url('../static/icon-sonline.png');
		background-size: cover;
		background-position: center;
	}

	.modal-container {
		position: relative;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding: 24px;
	}

	.modal-body {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.body-bg {
		position: absolute;
		top: 30px;
		width: 200px;
		height: 200px;
		/* background: #01C2C3; */
		/* background: #00c4ee; */
		background: #ffffff;
		border-radius: 50%;
		filter: blur(40px);
		z-index: -1;
	}

	.body-title {
		margin-top: 20px;
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 600;
		font-size: 18px;
		height: 25px;
		line-height: 25px;
		text-align: center;

		color: #FFFFFF;
	}
	.body-sub-titile {
		margin-top: 0px;
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 400;
		font-size: 14px;
		color: #fff;
		line-height: 39px;
		text-align: center;
		opacity: 0.7;
	}
	.img {
		width: 100px;
		height: 140px;
		margin-top: 50px;
		/* box-shadow: 0 0 10px 5px gold; */
	}
	.rotate-scale-up-ver {
		-webkit-animation: rotate-scale-up-ver 3s linear both;
		animation: rotate-scale-up-ver 3s linear both;
	}
	@-webkit-keyframes rotate-scale-up-ver {
		0% {
		-webkit-transform: scale(1) rotateY(0);
			transform: scale(1) rotateY(0);
		}
		50% {
		-webkit-transform: scale(2) rotateY(180deg);
			transform: scale(2) rotateY(180deg);
		}
		100% {
		-webkit-transform: scale(1) rotateY(360deg);
			transform: scale(1) rotateY(360deg);
		}
	}
	@keyframes rotate-scale-up-ver {
		0% {
			-webkit-transform: scale(1) rotateY(0);
				transform: scale(1) rotateY(0);
		}
		50% {
			-webkit-transform: scale(2) rotateY(180deg);
				transform: scale(2) rotateY(180deg);
		}
		100% {
			-webkit-transform: scale(1) rotateY(360deg);
				transform: scale(1) rotateY(360deg);
		}
	}
	.center {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.modal-footer {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0px 30px;
		margin-top: 40px;
	}

	.btn {
		width: 100%;
		height: 48px;
		background-color: #fff;
		border-radius: 50px;
		font-family: "PingFang SC";
		font-style: normal;
		font-weight: 600;
		font-size: 18px;
		line-height: 48px;
		text-align: center;
	}

	.btn + .btn {
		margin-left: 16px;
	}

	.btn-cancel {
		color: #7f7f8e;
		background-color: #fff;
		border: 0.5px solid #7f7f8e;
	}

	.btn-ok {
		color: #ffffff;
		background: linear-gradient(to right, #07accf 20%, #00FEFF, #07accf 80%);
		opacity: 0.8;
		border: 1px solid #00FEFF;
		box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
	}

	html body {
		overflow-y: hidden;
		width: calc(100% - 15px);
	}
</style>
