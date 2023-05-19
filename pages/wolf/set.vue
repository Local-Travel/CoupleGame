<template>
	<view class="page">
	<!-- 	<view class="header">
			<view class="title">重建房间</view>
		</view> -->
		<view class="header-block">
			<image class="header-bg-img" webp mode="scaleToFill" src="https://mp-d2cdecc2-e625-449f-a46d-53232154177c.cdn.bspapp.com/cloudstorage/c2f1edec-682a-4fb9-85a1-ffeb0c0e11a3.png"></image>
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
						<view class="num">{{item.roleCount}}</view>
						<view class="plus-minus minus" @click="() => handlePlus(item, index)"></view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="select-title-block">
			<view class="select-title">
				已选角色
			</view>
		</view>
		
		<view class="content-block">
			<view class="select-title-tip">不含法官</view>
			<view class="role-box">
				<!-- <image class="role-box-img" webp mode="scaleToFill" src="https://mp-d2cdecc2-e625-449f-a46d-53232154177c.cdn.bspapp.com/cloudstorage/7781e928-771d-414e-b5bd-2ae2a366fef1.png"></image> -->
				<view class='role-container'>
<!-- 					<view class="role-box-tag-con">
						<view class="role-box-tag">不含法官</view>
					</view> -->
					<view class="f-title">【好人阵营】</view>
					<view class="count-con">
						<view class="count-item" v-for="(item,index) in goodList" :key="index">
							<text class="text">{{item.name}}</text>
							<text class="count">{{item.roleCount}}</text>
						</view>
					</view>
					<view class="f-title">【狼人阵营】</view>
					<view class="count-con">
						<view class="count-item" v-for="(item,index) in wolfList" :key="index">
							<text class="text">{{item.name}}</text>
							<text class="count">{{item.roleCount}}</text>
						</view>
					</view>
					<view class="f-title">【房间总人数】<text class="count">{{totalCount}}</text></view>
				</view>
			</view>
	
			<view class="btn-con">
				<button class='btn' type="primary" @click="handleSubmit">创建房间</button>
			</view>
			<view class="search-con">
				<view class="search-more-tip">
					更多请关注「
					<navigator url="/pages/index/index" hover-class="navigator-hover">
						探本狼人
					</navigator>
					」
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { roleList, RoleType, suggestCount, getInitRoleList, getClientId, getLocalUser, getCreator, setNickName } from '../../utils/const.js'
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
		},
		computed: {
			countList() {
				return this.list.filter(item => item.roleCount)
			},
			goodList() {
				return this.countList.filter(item => item.type === RoleType.good)
			},
			wolfList() {
				return this.countList.filter(item => item.type === RoleType.wolf)
			},
			totalCount() {
				return this.countList.reduce((pre, cur) => {
					pre += cur.roleCount || 0
					return pre
				}, 0)
			}
		},
		methods: {
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
			checkVerify() {
				if (!this.goodList.length) {
					return uni.showToast({
						title: '好人阵营不能空',
						icon: 'error'
					})
				}
				if (!this.wolfList.length) {
					return uni.showToast({
						title: '狼人阵营不能空',
						icon: 'error'
					})
				}
				if (this.totalCount < 2 || this.totalCount > 30) {
					return uni.showToast({
						title: '房间人数4-30',
						icon: 'error'
					})
				}
				if (!this.user) {
					return setNickName((user) => {
						this.user = user;
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
						const data = {
							roomId,
							creator: getCreator(clientId, nickName),
							roomCount: this.totalCount,
							roleList: this.countList,
							userList: [],
							// addressName,
						}
						const db = uniCloud.database();
						uni.showLoading({
							title: '房间创建中'
						})
						db.collection('room').add(data).then(res => {
							console.log('createRoom res',res)
							uni.hideLoading()
							const { id, errMsg } = res && res.result || {}
							if (errMsg) {
								return uni.showToast({
									icon: 'error',
									title: '创建异常请重试',
								})
							}
							uni.navigateTo({
								url: `/pages/wolf/room?id=${roomId}`,
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
		/* background-color: #1F1F21; */
	}
	
	.header-block {
		height: 300px;
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
	}
	.header-bg-img {
		position: absolute;
		top: 0px;
		height: 250px;
		width: 200px;
		z-index: 1;
	}
	.swiper {
		margin-top: 45px;
		height: 220px;
		width: 100%;
		z-index: 10;
	}
	.item {
		display: block;
		text-align: center;
	}
	.img {
		width: 100px; 
		height: 140px; 
		background-color: #eeeeee;
	}
	.plus-con {
		display: flex;
		justify-content: center;
		margin-top: 22px;
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
	
	.select-title-block {
		position: relative;
		margin-top: -60px;
		padding-top: 20px;
		/* padding-bottom: 40px; */
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 10;
		background: linear-gradient(183.57deg, rgba(31, 31, 33, 0) 2.94%, #1F1F21 72.22%);
	}
	
	.select-title {
		font-family: 'POIZONSans';
		font-style: normal;
		font-weight: 700;
		font-size: 20px;
		line-height: 37px;		
		text-align: center;
		letter-spacing: -1px;
		color: #fff;
		
	}
	
	.select-title-tip {
		width: 267px;
		height: 30px;
		line-height: 30px;
		margin-bottom: 8px;
		text-align: center;
		/* background: radial-gradient(47% 2203.06% at 50% 50%, #D7D7D7 0%, rgba(215, 215, 215, 0) 100%) warning: gradient uses a rotation that is not supported by CSS and may not behave as expected; */
		opacity: 0.9;
		color: #fff;
		background: linear-gradient(to right, transparent, transparent, #00FEFF, transparent, transparent);
	}
	
	.content-block {
		background-color: #1F1F21;
		position: relative;
		/* padding: 0px 20px 72px; */
		padding-top: 8px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	
	.role-box {
		position: relative;
		/* box-sizing: border-box; */
		width: 250px;
		min-height: 270px;
		padding: 0px 40px;
		/* background-size: contain; */
		/* background-image: url('../../static/icon-set-box.png'); */
		/* background-repeat: no-repeat; */
		/* background-position: center; */
	}
	.role-box-img {
		position: absolute;
		top: 0px;
		left: 0px;
		height: 300px;
		width: 100%;
		z-index: 0;
	}
	.role-box-tag-con {
		position: absolute;
		top: 10px;
		right: -12px;
		background: #131C23;
		opacity: 0.8;
		border: 1px solid #00FEFF;
		box-shadow: inset 0.5px -0.5px 2px rgba(255, 255, 255, 0.21);
		backdrop-filter: blur(25px);		
		border-radius: 2px;
		padding: 3px 10px;
		transform: rotate(45.22deg);
	}
	.role-box-tag {
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 500;
		font-size: 12px;
		line-height: 17px;		
		color: #00FEFF;
	}
	.role-container {
		position: relative;
		background-color: #fff;
		padding: 16px;
		border-width: 10px;
		border-style: solid;
		border-image: linear-gradient(to right, #00e1ff, #079db8, #003545) 1;
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
		margin-top: 8px;
	}
	.count-item {
		margin-left: 8px;
		margin-bottom: 8px;
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
		margin-top: 0px;
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
