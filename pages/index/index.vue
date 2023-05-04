<template>
	<view class="page">
		<view class="header">
			<view class="title">线下狼人局</view>
			<view class="sub-title">
				<view class="bounce-in-text">探索</view>
				<view class="bounce-in-text">互动</view>
				<view class="bounce-in-text">交流</view>
				<view class="bounce-in-text">分享</view>
			</view>
		</view>
		<view class="content">
			<button v-if="user" class='btn btn-create' type="default" @click="handleAuth">创建房间</button>
			<button v-else class='btn btn-create' type="default" @click="handleCreateRoom">创建房间</button>
			<button class='btn btn-join' type="default" @click="handleJoinRoom">加入房间</button>
		</view>
	</view>
</template>

<script>
	import { getInitRoleList } from '../wolf/const.js'
	export default {
		data() {
			return {
				user: null,
				phoneNumber: null,
			}
		},
		onLoad(option) {
			console.log(option);
			this.getLocalUser();
		},
		methods: {
			getLocalUser() {
				try {
					const userInfo = uni.getStorageSync('userInfo');
					console.log('userInfo', userInfo);
					this.user = userInfo;
				} catch (e) {
					// error
				}
			},
			handleAuth(){
			    let self = this;
			    uni.getUserProfile({
					desc:"获取你的昵称和头像",
					success: (res) => {
						console.log('getUserProfile res', res)
						if (res.errMsg === 'getUserProfile:ok') {
							uni.setStorage({
								key: 'userInfo', 
								data: res.userInfo
							});
							self.handleCreateRoom();
						}
					},
					fail:(err) => {
						console.log("您取消了授权,登录失败")
					},
				})
			},
			handleCreateRoom(){
			    uni.showModal({
			    	title: '设置房间人数',
			    	editable: true,
			    	placeholderText: '请输入数字（4-30）',
			    	success: (res) => {
			    		console.log('res', res)
						const reg = /^\d+$/
			    		if (res.confirm) {
			    			console.log('res.content', res.content)
							const num = (res.content || '').trim()
							if (!reg.test(num)) {
								return uni.showToast({
									title: '请输入数字',
									icon: 'error'
								})
							}
							const count = Number(num);
							if (count < 4 || count > 30) {
								return uni.showToast({
									title: '请输入4-30之间的数字',
									icon: 'error'
								})
							}
							uni.navigateTo({
								url: `/pages/wolf/set-role?count=${count}&source=home`,
							})
			    		}
			    	}
			    })
			},
			handleJoinRoom() {
				uni.showModal({
					title: '加入房间',
					editable: true,
					placeholderText: '输入房间号',
					success: (res) => {
						console.log('res', res)
						const reg = /^\d+$/
						if (res.confirm) {
							console.log('res.content', res.content)
							const id = (res.content || '').trim()
							if (!reg.test(id)) {
								return uni.showToast({
									title: '请输入数字',
									icon: 'error'
								})
							}
							this.jumpRoomPage(id)
						}
					}
				})
			},
			jumpRoomPage(id) {
				uni.navigateTo({
					url: `/pages/room/index?id=${id}&source=home`,
				})
			}
		}
	}
</script>

<style>
	.page {
		width: 100vw;
		height: 100vh;
		font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,PingFang SC,Noto Sans,Noto Sans CJK SC,Microsoft YaHei,微软雅黑,sans-serif;
		background: linear-gradient(to bottom, #5D86A8, #7D6AAD, #B36AA0, #9019CC, #6A0DAD);
	}
	
	.header {
		padding: 48px 0px;
	}

	.title {
		font-size: 30px;
		line-height: 36px;
		color: #ffffff;
		text-align: center;
		-webkit-letter-spacing: 2px;
		-moz-letter-spacing: 2px;
		-ms-letter-spacing: 2px;
		letter-spacing: 2px;
	}

	.sub-title {
		display: flex;
		justify-content: center;
		margin-top: 8px;
		font-size: 24px;
		font-weight: 100;
		color: #ffffff;
		-webkit-letter-spacing: 1px;
		-moz-letter-spacing: 1px;
		-ms-letter-spacing: 1px;
		letter-spacing: 1px;
		text-align: center;
	}
	@keyframes jump-in {
	  0% {
	    opacity: 0;
	    transform: translateX(-100%) rotate(-90deg);
	  }
	  100% {
	    opacity: 1;
	    transform: translateX(0px) rotate(0deg);
	  }
	}
	.bounce-in-text {
	  animation: jump-in 2s cubic-bezier(0.215, 0.61, 0.355, 1) both;
	}
	.bounce-in-text + .bounce-in-text {
		margin-left: 16px;
	}
	.content {
		padding: 24px;
	}
	.btn + .btn {
		margin-top: 24px;
	}
</style>
