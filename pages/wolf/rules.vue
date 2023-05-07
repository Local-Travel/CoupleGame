<template>
	<view class="page">
		<view class="header">
			<view>
				<view class="title">游戏规则介绍</view>
				<image class="icon-star" webp mode="scaleToFill" src="../../static/icon-star.png"></image>
			</view>
			<view class="wait-tip">邀请朋友一起开嗨</view>
			<view class="header-bg"></view>
		</view>
		<view class="header-bottom"></view>
		<view class="content">
			<view class="top-box">
				<view class="box-tag">
					<view class="box-tag-text">规则说明</view>
				</view>
				<view class="content-container">
					<view class="block">
						<view class="b-title">
							游戏概述
						</view>
						<view class="desc">
							狼人杀是一种多人推理游戏，由法国人拿破仑在征服欧洲时期发明。玩家分为狼人、好人两个阵营，狼人阵营的目标是杀死所有村民，而好人阵营的目标是找出狼人并将其处决。游戏的胜负取决于哪一方最终获得胜利。
						</view>
					</view>
					<view class="block">
						<view class="b-title">
							游戏流程
						</view>
						<view class="sub-title">
							1. 分配角色
						</view>
						<view class="desc">
							每个玩家在游戏开始前会被分配一个角色，可能是狼人、村民或特殊角色。每个角色有不同的技能和属性。
						</view>
						<view class="sub-title">
							2. 第一个夜晚
						</view>
						<view class="desc">
							所有玩家闭眼。主持人宣布夜幕降临，狼人可以睁眼互相确认身份，然后选择一名平民进行杀害。特殊角色（如预言家、女巫等）也可以依次睁眼执行自己的操作
						</view>
						<view class="sub-title">
							3. 第一个白天
						</view>
						<view class="desc">
							主持人宣布天亮了，所有玩家睁开眼睛。被杀的平民会直接出局，其他玩家可以开始互相交流并分析局势，试图找出狼人。玩家可以发表自己的观点、质问其他玩家、透露自己的身份等等。
						</view>
						<view class="sub-title">
							4. 第二个夜晚和白天
						</view>
						<view class="desc">
							夜晚和第二个白天的流程和第一个夜晚和白天相同。在白天结束后，所有玩家进行一次公投，选择出一名玩家进行处决。如果被处决的是平民，则狼人获得胜利；如果被处决的是狼人，则平民获得胜利。特殊角色也可以在这个时候展现自己的技能，帮助自己的队伍获胜。
						</view>
						<view class="sub-title">
							5. 游戏结果
						</view>
						<view class="desc">
							如果狼人全部被处决，则平民获胜；如果平民全部被杀死，则狼人获胜。如果游戏中还有特殊角色，那么他们的胜利或失败将视情况而定。
						</view>
					</view>
					<view class="block">
						<view class="b-title">
							角色介绍
						</view>
						<view v-for="(item,index) in getRoleList" :key="index">
							<view class="sub-title">
								{{ index + 1}}. {{ item.name }}
							</view>
							<view class="desc">
								<view><text class="blod">[阵营]：</text>{{ item.group }}</view>
								<view><text class="blod">[技能]：</text>{{ item.desc }}</view>
							</view>
						</view>
						
					</view>
							
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { roleList, roleDescMap } from './const.js'
	export default {
		data() {
			return {
				list: roleList.slice(1),
			}
		},
		computed: {
			getRoleList() {
				const list = this.list.map(item => ({
					name: item.name,
					group: roleDescMap[item.code][0],
					desc: roleDescMap[item.code][1],
				}));
				return list
			}
		},
		onLoad(option) {
			console.log(option);
			const { roomId } = option || {}
			this.roomId = roomId;
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.page {
		width: 100vw;
		height: 100%;
		font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,PingFang SC,Noto Sans,Noto Sans CJK SC,Microsoft YaHei,微软雅黑,sans-serif;
		background-color: #E5E5E5;
	}
	
	.header {
		padding: 24px 0px;
		background-color: #000;
		/* background-image: url('../../static/icon-swell.png'); */
		background-size: cover;
		background-position: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.title {
		font-size: 30px;
		line-height: 36px;
		color: #01C2C3;
		text-align: center;
		-webkit-letter-spacing: 2px;
		-moz-letter-spacing: 2px;
		-ms-letter-spacing: 2px;
		letter-spacing: 2px;
	}
	.icon-star {
		position: relative;
		width: 20px;
		height: 20px;
		margin-top: -20px;
		margin-left: -25px;
		z-index: 1;
	}
	.wait-tip {
		width: 132px;
		height: 25px;
		padding-left: 10px;
		border-radius: 15px;
		color: #fff;
		font-size: 12px;
		line-height: 25px;
		background: linear-gradient(90deg, #009192 0%, #005B5B 37.56%, rgba(0, 8, 8, 0) 104.76%);
	}
	.header-bottom {
	  position: relative;
	  overflow: hidden;
	  height: 70px;
	}
	
	.header-bottom::after {
	  content: " ";
	  position: absolute;
	  bottom: 0;
	  left: 0;
	  width: 100%;
	  height: 80px; /* 调整高度以控制弧形的曲率 */
	  background: #000; /* 背景颜色 */
	  border-radius: 0 0 50% 50%; /* 通过调整border-radius属性设置底部弧形 */
	}
	.top-box {
		box-sizing: border-box;
		position: relative;
		margin-top: -95px;
		min-height: 104px;
		width: 100%;
		padding: 0 12px 48px;
		
		background: linear-gradient(97.92deg, #FFFFFF 44.6%, #DEFFFF 100%);
		border-radius: 2px;
	}
	.box-tag {
		position: relative;
		width: 60px;
		height: 20px;
		background: #EDFAFA;
		box-shadow: inset 0px -1px 4px #D2F5F6;
	}
	.box-tag-text {
		margin-left: 8px;
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 500;
		font-size: 11px;
		line-height: 20px;
		color: #01C2C3;
	}
	.content {
		color: #14151A;
		padding: 24px 12px;
	}
	.content-container {
		margin-top: 16px;
	}
	.block + .block {
		margin-top: 24px;
	}
	.b-title {
		font-size: 24px;
	}
	.sub-title {
		font-size: 16px;
		font-weight: 700;
		margin-top: 16px;
	}
	.desc {
		margin-top: 14px;
	}
	.blod {
		font-size: 14px;
		font-weight: 700;
	}
</style>
