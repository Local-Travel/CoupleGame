<template>
	<view class="page">
	<!-- 	<view class="header">
			<view class="title">重建房间</view>
		</view> -->
		<view class="header-block">
			<swiper 
				class="swiper" 
				circular
				:indicator-dots="indicatorDots" 
				:autoplay="autoplay" 
				:interval="interval"
				:duration="duration"
			>
				<swiper-item class="item" v-for="(item,index) in list" :key="index">
					<image class="img" webp mode="scaleToFill" :src="item.url"></image>
					<view class="plus-con">
						<view class="plus-minus plus" @click="() => handleMinus(item, index)"></view>
						<view class="num">{{item.value}}</view>
						<view class="plus-minus minus" @click="() => handlePlus(item, index)"></view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="select-title">
			已选角色
		</view>
		
		<view class="content-block">
			<view class="role-box">
				<view class='role-container'>
					<view class="f-title">【好人阵营】</view>
					<view class="count-con">
						<view class="count-item" v-for="(item,index) in goodList" :key="index">
							<text class="text">{{item.name}}</text>
							<text class="count">{{item.value}}</text>
						</view>
					</view>
					<view class="f-title">【狼人阵营】</view>
					<view class="count-con">
						<view class="count-item" v-for="(item,index) in wolfList" :key="index">
							<text class="text">{{item.name}}</text>
							<text class="count">{{item.value}}</text>
						</view>
					</view>
					<view class="f-title">【房间总人数】<text class="count">{{totalCount}}</text></view>
				</view>
			</view>
	
			<view class="btn-con">
				<button class='btn' type="primary" @click="handleSubmit">创建房间</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { roleList, RoleType, suggestCount, getInitRoleList, getClientId, getLocalUser, getCreator } from './const.js'
	export default {
		data() {
			return {
				user: null,
				list: [],
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 500,
			}
		},
		onLoad(option) {
			console.log(option);
			const { id, source, count } = option || {}
			this.list = getInitRoleList(count);
			this.user = getLocalUser();
			// if (!this.user) {
			// 	// this.jumpHome()
			// }
		},
		computed: {
			countList() {
				return this.list.filter(item => item.value)
			},
			goodList() {
				return this.countList.filter(item => item.type === RoleType.good)
			},
			wolfList() {
				return this.countList.filter(item => item.type === RoleType.wolf)
			},
			totalCount() {
				return this.countList.reduce((pre, cur) => {
					pre += cur.value || 0
					return pre
				}, 0)
			}
		},
		methods: {
			handlePlus(item, index) {
				// console.log('handlePlus', item)
				if (item.value < 30) {
					item.value += 1 
					this.$set(this.list, index, item)
				}
			},
			handleMinus(item, index) {
				if (item.value > 0) {
					item.value -= 1 
					this.$set(this.list, index, item)
				}
			},
			checkVerify() {
				if (!this.goodList.length) {
					return uni.showToast({
						title: '好人阵营不能为空',
						icon: 'error'
					})
				}
				if (!this.wolfList.length) {
					return uni.showToast({
						title: '狼人阵营不能为空',
						icon: 'error'
					})
				}
				if (this.totalCount < 4 || this.totalCount > 30) {
					return uni.showToast({
						title: '请输入4-30之间的数字',
						icon: 'error'
					})
				}
				// if (!this.user || !this.user.nickName) {
				// 	uni.showToast({
				// 		title: '登录已失效，请重新授权登录',
				// 		icon: 'error',
				// 	})
				// 	return this.jumpHome()
				// }
				return false;
			},
			handleSubmit() {
				try {
					const clientId = getClientId()
					if (this.checkVerify() === false) {
						const roomId = Date.now().toString().substr(-6);
						const { nickName } = this.user || {}
						const data = {
							roomId,
							creator: getCreator(clientId, nickName),
							roomCount: this.totalCount,
							roleList: this.countList,
							userList: [],
						}
						const db = uniCloud.database();
						
						// db.collection("room").where({roomId:"019934"})
						//   .update({
						//     creator: '019934-test2'
						//   }).then((res) => {
						// 	  console.log('update Room res', res)
						// 	  // 重新赋值
						//   }).catch((e) => {
						// 	  console.log('update Room e', e)
						//   });
						  
						db.collection('room').add(data).then(res => {
							console.log('createRoom res',res)
							const { id, errMsg } = res && res.result || {}
							if (errMsg) {
								return uni.showToast({
									icon: 'error',
									title: '创建异常，请稍后重试',
								})
							}
							uni.navigateTo({
								url: `/pages/wolf/room?id=${roomId}`,
							})
						}).catch((e) => {
							console.log('createRoom e', e)
							uni.showToast({
								icon: 'error',
								title: '创建异常，请稍后重试',
							})
						})
					}
				} catch (e) {
					console.error('handleSendServer', e)
				}
			},
			jumpHome() {
				uni.redirectTo({
					url: `/pages/index/index`,
				});
			},
		}
	}
</script>

<style scoped>
	.page {
		width: 100vw;
		min-height: 100vh;
		position: relative;
		font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,PingFang SC,Noto Sans,Noto Sans CJK SC,Microsoft YaHei,微软雅黑,sans-serif;
		background-color: #1F1F21;
	}
	.header-block {
		position: relative;
		height: 500px;
		background-color: #000;
		background-image: url('../../static/icon-home-bg.png');
		background-size: cover;
		background-position: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.swiper {
		margin-top: 45px;
		height: 380px;
		width: 100%;
	}
	.item {
		display: block;
		text-align: center;
	}
	.img {
		width: 200px; 
		height: 280px; 
		background-color: #eeeeee;
	}
	.plus-con {
		display: flex;
		justify-content: center;
		margin-top: 16px;
	}
	.num {
		margin: 0px 16px;
		color: #00ffff;
		font-size: 24px;
		font-weight: 600;
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
	
	.select-title {
		position: relative;
		margin-top: -70px;
		font-family: 'POIZONSans';
		font-style: normal;
		font-weight: 700;
		font-size: 20px;
		line-height: 37px;
		/* identical to box height, or 184% */
		
		text-align: center;
		letter-spacing: -1px;
		color: #fff;
		background: linear-gradient(183.57deg, rgba(31, 31, 33, 0) 2.94%, #1F1F21 72.22%);
		z-index: 10;
	}
	
	.content-block {
		background-color: #1F1F21;
		padding-bottom: 72px;
		position: relative;
	}
	
	.role-box {
		box-sizing: border-box;
		width: 100%;
		min-height: 300px;
		padding: 40px;
		background-size: contain;
		background-image: url('../../static/icon-set-box1.png'),url('../../static/icon-set-box3.png'),url('../../static/icon-set-box2.png');
		background-repeat: no-repeat, no-repeat, repeat-y;
		background-position: center top, center bottom, center top;
	}
	.role-container {
		background-color: #fff;
		padding: 16px;
	}
	
	.count-list {
		width: 100%;
	}
	.f-title {
		font-size: 16px;
		font-weight: 700;
		margin: 8px 0px;
	}
	.count-con {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}
	.count-item {
		margin-left: 8px;
		font-size: 14px;
		padding: 2px 4px;
		font-size: 12px;
		color: #01C2C3;
		border: 1px solid #01C2C3;
		background: #EDFAFA;
		box-shadow: inset 0px -1px 4px #D2F5F6;
	}
	.count {
		color: #01C2C3;
		margin-left: 4px;
	}
	
	.btn-con {
		padding: 24px;
	}
	
	.btn {
		background-color: #01C2C3;
	}
</style>
