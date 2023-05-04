<template>
	<view class="page">
		<view class="header">
			<view class="title">线下狼人局</view>
		</view>
		<view class="content">
			<view v-for="(item,index) in list" :key="index" class="item">
				<image class="img" webp mode="scaleToFill" :src="item.url"></image>
				<view class="name">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { roleList, RoleType, suggestCount } from '../wolf/const.js'
	export default {
		data() {
			return {
				user: null,
				list: roleList.slice(0),
			}
		},
		onLoad(option) {
			console.log(option);
			const { id, source } = option || {}
			if (id) {// 请求远程数据库
				
			} else {
				this.jumpHome(source)
			}
			this.handleAuth()
		},
		computed: {
			showList() {
				
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
						}
					},
					fail:(err) => {
						console.log("您取消了授权,登录失败")
					},
				});
			},
			jumpHome(source = null) {
				uni.redirectTo({
					url: '/pages/index/index' + `${source ? ('?source=' + source) : ''}`,
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
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

	.content {
		display: flex;
		flex-wrap: wrap;
		padding: 24px;
		.item {
			display: block;
			text-align: center;
			margin-left: 8px;
		}
		.img {
			width: 50px; 
			height: 70px; 
			background-color: #eeeeee;
		}
	}
	.btn + .btn {
		margin-top: 16px;
	}
</style>
