<template>
	<view class="page">
		<view class="header">
			<view class="title">游戏规则介绍</view>
		</view>
		<view class="content">
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
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad(option) {
			console.log(option);
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		width: 100vw;
		height: 100%;
		font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,PingFang SC,Noto Sans,Noto Sans CJK SC,Microsoft YaHei,微软雅黑,sans-serif;
		background: linear-gradient(to bottom, #5D86A8, #7D6AAD, #B36AA0, #9019CC, #6A0DAD);
	}
	
	.header {
		padding: 24px 0px 16px;
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
		color: #ffffff;
		padding: 24px 24px 72px;
	}
	.block + .block {
		margin-top: 24px;
	}
	.block {
		.b-title {
			font-size: 24px;
		}
		.sub-title {
			font-size: 16px;
			font-weight: 500;
			margin-top: 16px;
		}
		.desc {
			margin-top: 16px;
		}
	}
</style>
