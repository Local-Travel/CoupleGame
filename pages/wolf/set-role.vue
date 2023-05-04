<template>
	<view class="page">
	<!-- 	<view class="header">
			<view class="title">重建房间</view>
		</view> -->
		<view class="content">
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
					<view class="con">
						<view class="plus-minus plus" @click="() => handleMinus(item, index)"></view>
						<view class="num">{{item.value}}</view>
						<view class="plus-minus minus" @click="() => handlePlus(item, index)"></view>
					</view>
				</swiper-item>
			</swiper>
			
			<view class="count-list">
				<view class="f-title">【好人阵营】</view>
				<view class="count-con">
					<view class="count-item" v-for="(item,index) in goodList" :key="index">
						<text class="text">{{item.name}}</text>
						<text>:</text>
						<text class="count">{{item.value}}</text>
					</view>
				</view>
				<view class="f-title">【狼人阵营】</view>
				<view class="count-con">
					<view class="count-item" v-for="(item,index) in wolfList" :key="index">
						<text class="text">{{item.name}}</text>
						<text>:</text>
						<text class="count">{{item.value}}</text>
					</view>
				</view>
				<view class="f-title">【房间总人数】<text class="count">{{totalCount}}</text></view>
			</view>
		</view>
		
		<view class="fixed-bottom">
			<view class="btn-con">
				<button class='btn' type="default" @click="handleBack">返回</button>
				<button class='btn' type="primary" @click="handleSubmit">创建房间</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { roleList, RoleType, suggestCount, getInitRoleList } from './const.js'
	export default {
		data() {
			return {
				user: null,
				list: [],
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 500
			}
		},
		onLoad(option) {
			console.log(option);
			const { id, source, count } = option || {}
			this.list = getInitRoleList(count);
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
			handleBack() {
				uni.redirectTo({
					url: '/pages/index/index'
				});
			},
			handleSubmit() {
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
				// this.totalCount
				const id = 123
				// 重建房间
				uni.navigateTo({
					url: `/pages/room/index?id=${id}`,
				})
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
	.tac {
		text-align: center;
	}
	.content {
		display: flex;
		flex-wrap: wrap;
		padding: 24px 24px 24px;
	}
	.swiper {
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
	.con {
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
	
	.count-list {
		width: 100%;
	}
	.f-title {
		font-size: 16px;
		font-weight: 500;
		margin: 8px 0px;
	}
	.count-con {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}
	.count-item {
		margin-left: 8px;
	}
	.count {
		color: #fff;
		font-weight: 600;
		margin-left: 4px;
	}
	
	.fixed-bottom {
		width: 100%;
		padding-bottom: 48px;
	}
	.btn-con {
		padding: 24px;
		display: flex;
	}
	.btn {
		width: 100%;
		opacity: 0.8;
		// background-color: transparent;
	}
	.btn + .btn {
		margin-left: 16px;
	}
</style>
