<template>
	<view class="page">
		<!-- <view class="header">
			<view class="title">线下狼人局</view>
			<view class="sub-title">
				<view class="bounce-in-text">探索</view>
				<view class="bounce-in-text">互动</view>
				<view class="bounce-in-text">交流</view>
				<view class="bounce-in-text">分享</view>
			</view>
		</view> -->
		<view class="header-block">
			<!-- <image class="header-bg-img" webp mode="scaleToFill" src="https://mp-d2cdecc2-e625-449f-a46d-53232154177c.cdn.bspapp.com/cloudstorage/2f0d9437-521b-4345-a1e2-67c66f67b7f8.png"></image> -->
			<!-- <image class="header-gif-img" webp mode="scaleToFill" src="https://mp-d2cdecc2-e625-449f-a46d-53232154177c.cdn.bspapp.com/cloudstorage/5329b3e7-7252-4269-8dac-ea14044e1300.png"></image> -->
			<view class="header-box">
				<image class="header-gif-img" webp mode="scaleToFill" src="../../static/icon-home-undercover.png"></image>
				<view class="header-title-con">
					<view class="header-top-title">探本卧底 邀TA一起</view>
					<view class="header-limit-title">破解迷局 找出真正间谍</view>
				</view>
			</view>
			<view class="middle-title-con">
				<view class="middle-title">线下卧底局</view>
				<view class="middle-title-tip">找出卧底，展现推理的智慧！</view>
			</view>
		</view>
		<view class="content-block">
			<view class="slog-block">
				<view class="slog-con">
					<view class="slog-item">
						<text class="slog-item-text">潜伏</text>
					</view>
					<view class="slog-item slog-item-middle">
						<text class="slog-item-text">欺骗</text>
					</view>
					<view class="slog-item">
						<text class="slog-item-text">智慧</text>
					</view>
				</view>
			</view>
			<view class="btn-con">
				<!-- <button v-if="user" class='btn btn-create' type="default" @click="handleAuth('create')">立刻开始</button> -->
				<button class='btn btn-create' type="default" @click="handleCreateRoom">立刻开始</button>
				<!-- <button v-if="user" class='btn btn-join' type="default" @click="handleAuth('join')">加入房间</button> -->
				<button class='btn btn-join' type="default" @click="handleJoinRoom">加入房间</button>
			</view>
			<view class="search-con">
				<view class="search-more-tip">
					更多请关注「
					<navigator url="/pages/undercover/index" hover-class="navigator-hover">
						探本卧底
					</navigator>
					」
				</view>
			</view>
		</view>
		<BottomLayer ref="layerRef" />
	</view>
</template>

<script>
	import BottomLayer from '@/components/bottom-layer.vue'
	import { getInitRoleList, getClientId, getLocalUser, setNickName } from '../../utils/const.js'
	
	    
	let db = {};
	export default {
		components: {
			BottomLayer
		},
		data() {
			return {
				user: null,
				phoneNumber: null,
				// key: 'cd58a4a749047985b5ed06b474c407f3',  
				addressName: '',  
			}
		},
		onLoad(option) {
			console.log('index', option);
			this.user = getLocalUser();
			this.getPushClientId();
			if (!this.user) {
				setNickName((user) => {
					this.user = user
				})
			}
			// this.amapPlugin = new amap.AMapWX({  
			// 	key: this.key  
			// }); 
		},
		mounted() {
			// this.getRegeo()
			// this.$refs.layerRef.showModal();
		},
		methods: {
			getPushClientId() {
				if (uni.getStorageSync('clientId')) return
				// uni-app客户端获取push客户端标记
				uni.getPushClientId({
					success: (res) => {
						const cid = res.cid;
						console.log('客户端推送标识:',cid)
						uni.setStorageSync('clientId', cid);
					},
					fail(err) {
						console.log('getPushClientId', err)
						const clientId = getClientId();
						uni.setStorageSync('clientId', clientId);
					}
				})
			},
			handleCreateRoom(){
				this.$refs.layerRef.showModal();
			},
			handleJoinRoom() {
				if (!this.user) {
					return setNickName(() => {
						this.JoinRoom()
					})
				} else {
					this.JoinRoom()
				}
			},
			JoinRoom() {
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
							if (!reg.test(id) || id.length !== 4) {
								return uni.showToast({
									title: '请输入4位数字',
									icon: 'none'
								})
							}
							this.jumpRoomPage(id)
						}
					}
				})
			},
			createUser(userInfo = {}) {
				const data = {
					nickName: userInfo.nickName,
					avatarUrl: userInfo.avatarUrl,
					gender: userInfo.gender,
					clientId: getClientId(),
				}
				const db = uniCloud.database();
				db.collection('user').add(data).then(res => {
					console.log('createUser res',res)
				}).catch((e) => {
					console.log('createUser e', e)
				})
			},
			jumpRoomPage(id) {
				uni.navigateTo({
					url: `/pages/undercover/room?id=${id}&source=home`,
				})
			}
		}
	}
</script>

<style>
	.page {
		width: 100vw;
		min-height: 100vh;
		font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,PingFang SC,Noto Sans,Noto Sans CJK SC,Microsoft YaHei,微软雅黑,sans-serif;
	}
	
	.header-block {
		height: 550px;
		background-color: #000;
		/* background-image: url('../../static/icon-home-bg.png'); */
		/* background-size: cover; */
		/* background-position: center; */
		display: flex;
		flex-direction: column;
		align-items: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		z-index: -1;
	}
	.header-box {
		margin-top: 70px;
		padding: 20px 20px 0px;
		/* border-width: 1px; */
		/* border-style: solid; */
		/* border-image: linear-gradient(to top, #00e1ff, #079db8, #003545) 1; */
		box-shadow: 0px 0px 20px rgba(1, 194, 195, 0.7);
		border-bottom: 1px solid #079db8;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.header-gif-img {
		width: 180px;
		height: 219px;
		/* background: url('../../static/icon-home-gif.png'); */
		/* background-size: cover; */
		/* background-position: center; */
	}
	
	.center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.header-title-con {
		margin-top: 30px;
		margin-bottom: 40px;
	}
	.header-top-title {
		margin-top: -20px;
		font-size: 25px;
		font-weight: 800;
		color: #fff;
	}
	.middle-title-con {
		background: linear-gradient(to bottom, #000000 10%,  #1F1F21 40%,  #1F1F21 60%, #2c2c2f 100%);
		width: 100%;
		padding-bottom: 10px;
	}
	.header-limit-title {
		font-size: 20px;
		font-weight: 800;
		color: #01C2C3;
	}

	.middle-title {
		margin-top: 30px;
		font-family: 'POIZONSans';
		font-style: normal;
		font-weight: 700;
		font-size: 20px;
		line-height: 37px;
		/* identical to box height, or 184% */
		
		text-align: center;
		letter-spacing: -1px;
		
		background: linear-gradient(96.88deg, #FFFFFF 42.2%, #BEC5CA 84.23%, #FFFFFF 106.71%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-fill-color: transparent;
	}
	.middle-title-tip {
		margin-top: 8px;
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 400;
		font-size: 12px;
		line-height: 17px;		
		text-align: center;		
		color: #00FEFF;
	}
	.content-block {
		background-color: #2c2c2f;
		padding-bottom: 72px;
	}
	.slog-block {
		position: relative;
		padding: 6px 24px;
		margin-top: -30px;
		background-color: #2c2c2f;
	}
	
	.slog-con {
		position: relative;
		padding: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #1E1E1E;
		box-shadow: inset 1.81671px -1.81671px 3.63342px rgba(0, 0, 0, 0.5), inset 0px 1.81671px 3.63342px rgba(0, 0, 0, 0.5);
		border-radius: 1.81671px;
	}
	.slog-item {
		width: 100px;
		height: 84px;
		position: relative;
		font-family: 'POIZONSans';
		font-style: normal;
		font-weight: 700;
		text-align: center;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(180deg, #070707 17.76%, #04D5D6 118.22%);
		background-size: cover;
		background-position: center;
	}
	.slog-item-middle {
		margin: 0px 16px;
	}
	.slog-item-text {
		left: 40px;
		font-family: 'POIZONSans';
		font-style: normal;
		font-weight: 700;
		font-size: 21.3831px;
		line-height: 26px;
		text-align: center;
		letter-spacing: -1.15858px;
		color: #FFFFFF;
	}
	
	.btn-con {
		margin-top: 24px;
	}

	.btn {
		width: 188.33px;
		height: 55px;
		line-height: 55px;
		background: linear-gradient(to right, #07accf 20%, #00FEFF, #07accf 80%);
		opacity: 0.8;
		border: 1px solid #00FEFF;
		box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
		color: #ffffff !important;
	}
	.btn + .btn {
		margin-top: 24px;
	}
	.search-con {
		margin-top: 48px;
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 400;
		font-size: 10px;
		line-height: 14px;		
		text-align: center;
		color: #7F7F8E;
	}
	.search-more-tip {
		display: flex;
		align-items: center;
		justify-content: center;
	} 
	.navigator-hover {
		background-color: transparent;
	}
</style>
