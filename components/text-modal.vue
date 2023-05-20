<template>
	<view v-if="visible" class="modal-mask">
		<view class="modal-view">
			<view class="modal-container">
				<scroll-view scroll-y class='modal-body'>
					<view :class="'modal-invald-text'">
						{{ content }}
					</view>
				</scroll-view>
				<view class='modal-footer'>
					<template v-if="isShare">
						<button class='modal-btn modal-confirm-btn' open-type="share" @click="visible = false">邀请</button>
					</template>
					<button v-else class='modal-btn modal-confirm-btn' @click="onConfirm">确定</button>
				</view>
			</view>
			<view v-if="showClose" class="close-box" @click="onCancel">
				<view class="close-button">
					<view class="close-button-inner"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
  props: {},
  data() {
	  return {
		  visible: false,
		  content: '', 
		  isShare: false,
			showClose: true,
	  }
  },
	methods: {
		showModal({ content, isShare, showClose }) {
			this.content = content;
			this.isShare = typeof isShare === 'boolean' ? isShare : false;
			this.showClose = typeof showClose === 'boolean' ? showClose : true;
			this.visible = true;
		},
		hideModal() {
			this.visible = false;
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
.modal-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 99;
	}

	.modal-view {
		position: relative;
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

	.modal-invald-text {
		font-weight: 500;
		line-height: 31px;
		text-align: center;
	}
	.modal-invite-text {
		font-weight: 500;
	}
	.modal-footer {
		padding: 24px 20px 0px;
		display: flex;
		justify-content: space-between;
	}
	.modal-btn {
		width: 100%;
		border-radius: 4px;
	}
	.modal-btn + .modal-btn {
		margin-left: 16px;
	}
	.modal-cancel-btn {
		background-color: #fff;
		color: #01C2C3;
	}
	.modal-confirm-btn {
		background-color: #01C2C3;
		color: #fff;
	}

	.close-box {
		margin-top: 16px;
		position: absolute;
		right: -10px;
		top: -50px;
	}

	.close-button {
		position: relative;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		cursor: pointer;
		/* background-color: #01C2C3; */
		/* background-color: rgba(0, 0, 0, 0.5); */
	}

	.close-button-inner {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 18px;
		height: 2px;
		/* background-color: #00FEFF; */
		background-color: #fff;
		transform: translate(-50%, -50%) rotate(45deg);
	}

	.close-button-inner:before,
	.close-button-inner:after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #fff;
	}

	.close-button-inner:before {
		transform: rotate(-90deg);
	}

	.close-button-inner:after {
		transform: rotate(90deg);
	}
</style>