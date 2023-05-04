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
			<button class='btn btn-create' type="default" @click="handleCreateRoom">创建房间</button>
			<button class='btn btn-join' type="default" @click="handleJoinRoom">加入房间</button>
		</view>
	</view>
</template>

<script>
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
			if (!this.user) {
				// this.getInfo();
			}
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
			handleCreateRoom(){
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
							// 转跳页面
							uni.navigateTo({
								url: '/pages/room/index?id=123'
							});
						}
					},
					fail:(err) => {
						console.log("您取消了授权,登录失败")
					},
				})
			},
			handleJoinRoom() {
				uni.showModal({
					title: '加入房间',
					editable: true,
					placeholderText: '输入房间号',
					success: (res) => {
						console.log('res', res)
						if (res.confirm && res.content) {
							console.log('res.content', res.content)
						}
					}
				})
			},
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
		margin-top: 16px;
	}
</style>
