<template>
  <view v-if="visible" class="bottom-layer">
	<view class="close-btn" @click="onCancel">
		<view class="close-btn__x"></view>
	</view>
	<view class="header">创建房间</view>
    <!-- 弹层内容 -->
	<scroll-view class="layer-content" :scroll-y="true">
		<view class="content">
		  <view class="form-item">
			<view class="title">游戏人数</view>
			<input class="uni-input" :value="roomCount" @input="roomCountChange" placeholder="请输入" />
		  </view>
		  <view class="form-item-role">
			<view class="count-item" v-for="(item,index) in showList" :key="index">
				<text class="text">{{item.name}}</text>
				<text class="count">{{item.roleCount}}</text>
			</view>
		  </view>
		  <view class="form-item">
			<view class="title">卧底词</view>
			<input class="uni-input" v-model="undercoverWord" placeholder="请输入" />
		  </view>
		  <view class="form-item">
			<view class="title">平民词</view>
			<input class="uni-input" v-model="civilianWord" placeholder="请输入" />
		  </view>
		</view>
		<view class="modal-footer">
			<view class="layer-btn btn-ok" @click="randomWord">随机换词</view>
			<view class="layer-btn btn-ok" @click="handleSubmit">创建房间</view>
		</view>
	</scroll-view>
  </view>
</template>

<script>
import { getClientId, getLocalUser, getCreator } from '../utils/const.js'
import { getInitRoleList, generateRandomWord, RoleType } from '../utils/undercover.js'
export default {
  data() {
    return {
			user: null,
			list: [],
			visible: false,// 是否显示弹窗
			roomCount: '4',// 房间人数
			undercoverWord: '',// 刺客词条
			civilianWord: '',// 平民词条
    };
  },
  mounted() {
	  this.user = getLocalUser();
	  this.list = getInitRoleList();
	  this.randomWord();
  },
  computed: {
	  showList() {
		  return this.list
	  },
	  countList() {
	  	return this.list.filter(item => item.roleCount)
	  },
  },
  methods: {
	roomCountChange(e) {
		console.log('e', e)
		let val = e.target.value
		val = val.toString().replace(/[^\d]/g, '')
		this.roomCount = val
		this.list = getInitRoleList(val);
	},
	randomWord() {
		const { fisrtWord, lastWord } = generateRandomWord()
		this.civilianWord = fisrtWord
		this.undercoverWord = lastWord
	},
    showModal() {
		this.visible = true;
	},
	hideModal() {
		this.visible = false;
	},
	onCancel() {
		this.hideModal();
		this.$emit('cancel');
	},
	checkVerify() {
		if (this.roomCount < 2 || this.roomCount > 15) {
			return uni.showToast({
				title: '请输入4-15之间的数字',
				icon: 'none'
			})
		}
		if (!this.civilianWord || !this.civilianWord.trim()) {
			return uni.showToast({
				title: '请输入有效的平民词',
				icon: 'none'
			})
		}
		if (!this.undercoverWord || !this.undercoverWord.trim()) {
			return uni.showToast({
				title: '请输入有效的卧底词',
				icon: 'none'
			})
		}
		return false;
	},
	handleSubmit() {
		try {
			const clientId = getClientId()
			if (this.checkVerify() === false) {
				const roomId = Date.now().toString().substr(-4);
				const { nickName } = this.user || {}
				// const addressName = uni.getStorageSync('addressName') || '';
				const roleList = this.countList.map(item => {
					if (item.type === RoleType.undercover) {
						item.word = this.undercoverWord
					} else {
						item.word = this.civilianWord
					}
					return item
				});
				const data = {
					roomId,
					creator: getCreator(clientId, nickName),
					roomCount: Number(this.roomCount),
					roleList,
					userList: [],
					// addressName,
				}
				const db = uniCloud.database();
				uni.showLoading({
					title: '房间创建中'
				})
				db.collection('room-undercover').add(data).then(res => {
					console.log('createRoom res',res)
					uni.hideLoading()
					const { id, errMsg } = res && res.result || {}
					if (errMsg) {
						return uni.showToast({
							icon: 'error',
							title: '创建异常请重试',
						})
					}
					this.hideModal();
					uni.navigateTo({
						url: `/pages/undercover/room?id=${roomId}`,
					})
				}).catch((e) => {
					console.log('createRoom e', e)
					uni.hideLoading()
					uni.showToast({
						icon: 'error',
						title: '创建异常请重试',
					})
				})
			}
		} catch (e) {
			console.error('handleSendServer', e)
		}
	},
  }
};
</script>

<style scoped>
.bottom-layer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 400px;
  background-color: #000;
  /* 其他样式属性 */
}
.header {
	font-size: 20px;
	font-weight: 600;
	text-align: center;
	line-height: 48px;
	color: #fff;
	background: linear-gradient(to right, transparent, #00FEFF, #01C2C3, #00FEFF, transparent);
}

.layer-content {
	height: 300px;
}

.content {
  /* 弹层内容的样式 */
  padding: 24px 20px;
  color: #01C2C3;
}
.form-item {
  display: flex;
  align-items: center;
  padding: 8px 0px;
}
.form-item-role {
	display: flex;
	align-items: center;
	margin-left: 80px;
	margin-top: 8px;
}
.title {
	font-size: 18px;
	font-weight: 500;
	min-width: 80px;
}
.uni-input {
	border: 0.5px solid #75e5da;
	/* border: 0.5px solid #fff; */
	border-radius: 4px;
	padding: 8px;
	color: #01C2C3;
}
.count-item {
	margin-bottom: 8px;
	font-size: 14px;
	padding: 2px 4px;
	font-size: 14px;
	color: #01C2C3;
	border: 1px solid #01C2C3;
	background: #EDFAFA;
	box-shadow: inset 0px -1px 4px #D2F5F6;
}
.count-item + .count-item {
	margin-left: 8px;
}
.count {
	margin-left: 4px;
}
.modal-footer {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0px 20px;
	margin-top: 16px;
}

.layer-btn {
	width: 100%;
	height: 48px;
	background-color: #fff;
	border-radius: 5px;
	font-family: "PingFang SC";
	font-style: normal;
	font-weight: 600;
	font-size: 18px;
	line-height: 48px;
	text-align: center;
}

.layer-btn + .layer-btn {
	margin-left: 16px;
}

/* .btn-cancel {
	border: 1px solid #00FEFF;
	color: #00FEFF;
} */

.btn-ok {
	color: #ffffff;
	background: linear-gradient(to right, #07accf 20%, #00FEFF, #07accf 80%);
	opacity: 0.8;
	border: 1px solid #00FEFF;
	box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
}

.close-btn {
	position: absolute;
	top: -40px;
	right: 0px;
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

</style>
