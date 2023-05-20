<template>
	<view class="page" :style="isShowModal() ? 'height: 100vh;overflow-y: hidden' : ''">
		<view class="header">
			<view class="header-room">
				<view class="title">卧底房间号：<text class="room-id">{{ roomId }}</text></view>
				<image class="icon-star" webp mode="scaleToFill" src="../../static/icon-star.png"></image>
			</view>

			<view class="header-tag">
				<view class="wait-tip">邀请朋友一起开嗨</view>
			</view>
			<!-- <view class="card">等待玩家进入</view> -->
			<view class="header-bg"></view>
		</view>
		<view class="header-bottom"></view>
		<view class="content">
			<!-- 角色列表 -->
			<view class="top-box">
				<view class="box-tag">
					<view class="box-tag-text">角色数量</view>
				</view>
				<view class="center">
					<view class="icon-role-con">
						<view v-for="(item,index) in roomRoleList" :key="index" class="icon-role-item">
							<view class="number-container">{{item.roleCount}}</view>
							<image class="icon-role-img" webp mode="scaleToFill" :src="item.url"></image>
							<view class="icon-role-name">{{item.name}}</view>
						</view>
					</view>
				</view>
			</view>
			
<!-- 			<view class="invite-block">
				<view class="wait-tip">邀请TA一起来开黑</view>
			</view> -->
			
			<!-- 玩家列表 -->
			<view class="user-con">
				<view class="box-tag">
					<view class="box-tag-text">玩家列表</view>
				</view>
				<view class="box-tag-right-con">
					<view class="box-tag-right-border"></view>
					<view class="box-tag-right">不含法官</view>
				</view>
				<view class="user-item-con">
					<view v-for="(item,index) in showUserList" :key="index" class="user-item">
						<view :class="clientId === item.clientId ? 'user-num user-num-active' : 'user-num'">{{index + 1}}</view>
						<view class="user-img-con">
							<image v-if="item.avatarUrl" class="user-img" webp mode="scaleToFill" :src="item.avatarUrl"></image>
							<button v-else open-type="share" class="btn-share-plus">
								<view class="user-plus"></view>
							</button>
						</view>
						<button class="user-name">{{item.nickName || '邀请'}}</button>
						<template v-if="item.role">
							<view v-if="isCreator" :class="item.role.type === RoleType.good ? 'user-role-name-good': 'user-role-name-back'">{{item.role.word || '未知'}}</view>
							<view v-else class="user-role-name-good">{{ clientId === item.clientId ? item.role.word : '保密' }}</view>
						</template>
					</view>
				</view>
			</view>
			<!-- 按钮 -->
			<view v-if="isCreator" class="btn-con">
				<button :class="'btn btn-submit'" @click="handleSubmit">
					{{ btnText }}
				</button>
			</view>
			<!-- 自己角色 -->
			<view class="role-con">
				<view class="role-group">{{ roleGroup }}</view>
				<view class="role-box">
			<!-- 		<view class="role-img-con">
						<image class="role-img-bg" webp mode="scaleToFill" src="https://mp-d2cdecc2-e625-449f-a46d-53232154177c.cdn.bspapp.com/cloudstorage/516b709d-8723-470b-89ea-a85369b1296c.png"></image>
						<image class="role-img" webp mode="scaleToFill" :src="roleUrl"></image>
					</view> -->
					<view class="role-desc">
						<view v-for="(item,index) in roleDesc" :key="index" class="role-desc-item">
							<view><text class="mr4">{{index + 1}}. </text>{{item}}</view>
						</view>
					</view>
				</view>
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
		<TextModal ref="textRef" @confirm="jumpHome" />
			<!-- <MaskModal ref="maskRef" /> -->
	</view>
</template>

<script>
	import TextModal from '@/components/text-modal.vue'
	// import MaskModal from '@/components/mask-modal.vue'
	import { getClientId, getLocalUser, getCreator, randAssignRoles, setNickName, generateUser, getUuid, GameType } from '../../utils/const.js'
	import { RoleType, roleList as roleList2, defaultRules } from '../../utils/undercover.js'
		
	let db = {};
	export default {
		components: {
			// MaskModal,
			TextModal
		},
		data() {
			return {
				user: null,
				clientId: '',
				roomId: '',
				sWhere: '',
				showUserList: [],
				userList: [],
				roomRoleList: [],
				record: {},
				myRole: null,
				btnType: 'ready',
				RoleType,
			}
		},
		onLoad(option) {
			console.log('onLoad option', option);
			const { id, source, u } = option || {}
			if (!id || (id + '').length !== 4) {
				return this.jumpHome(source)
			}
			this.roomId = id;
			this.user = getLocalUser();
			if (!this.user) {
				setNickName((user) => {
					this.user = user;
					this.userBindRoom();
				})
			}
			db = uniCloud.databaseForJQL();
			this.getPushClientId();
			this.queryRoom(() => {
				this.userBindRoom();
			});
			//启动推送事件监听
			uni.onPushMessage(this.receiveMessage);
			// 分享参数
			this.share.query = `id=${this.roomId}&u=${this.clientId}`;
		},
		onUnload(option) {
			console.log('onUnload option', option);
			//关闭推送事件监听
			uni.offPushMessage(this.receiveMessage);
		},
		onPullDownRefresh() {
			console.log('onPullDownRefresh')
			// this.queryRoom(() => uni.stopPullDownRefresh());
		},
		computed: {
			roleGroup() {
				return '游戏规则'
			},
			roleDesc() {
				return defaultRules.filter(Boolean)
			},
			roleUrl() {
				return this.myRole ? this.myRole.url : roleList2[0].url
			},
			btnText() {
				const obj = {
					'ready': '开始发牌',
					'new': '再来一局',
				}
				return obj[this.btnType]
			},
			isCreator() {
				const { creator } = this.record || {}
				const { nickName } = this.user || {}
				const localCreator = getCreator(this.clientId, nickName)
				return creator && creator === localCreator
			},
			isInUserList() {
				const clientId = getClientId()
				return this.userList.find(item => item.clientId === clientId)
			},
		},
		methods: {
			getPushClientId() {
				// uni-app客户端获取push客户端标记
				// const id = uni.getStorageSync('clientId')
				// if (id) {
				// 	this.clientId = id;
				// 	return
				// }
				uni.getPushClientId({
					success: (res) => {
						console.log('客户端推送标识:',res.cid)
						this.clientId = res.cid;
						uni.setStorageSync('clientId', res.cid);
						// bd4d901aaf7a930900158c3fd28dbf42
					},
					fail(err) {
						console.log('getPushClientId', err)
						const clientId = getClientId();
						this.clientId = clientId;
						uni.setStorageSync('clientId', clientId);
					}
				})
			},
			isShowModal() {
				return this.$refs.textRef && this.$refs.textRef.getVisible()
			},
			userBindRoom() {
				try {
					const { nickName, avatarUrl, gender } = this.user || {}
					const { creator, roomCount } = this.record || {}
					// 当前用户存在，房间人数有效，非创建者，还没有加入该房间
					if (nickName && roomCount && !this.isCreator && !this.isInUserList) {
						const list = this.userList.slice(0)
						const len = roomCount - list.length;
						if (len <= 0) {
							uni.showToast({
								icon: 'none',
								title: '房间人数已满',
							})
							return
						}
						const roomUser = {
							nickName,
							avatarUrl,
							gender,
							clientId: getClientId(),
						}
						list.push(roomUser);
						db.collection("room-undercover").where(`roomId=="${this.roomId}"`)
						  .update({
						    userList: list,
						  }).then((res) => {
							  console.log('userBindRoom res', res)
							  // 重新查询赋值
							  this.queryRoom()
							  // 触发其他用户刷新
							  this.sendMessageTrigger()
						  }).catch(() => {
							  uni.showToast({
							  	icon: 'none',
							  	title: '加入房间失败',
							  })
						  });
					}
				} catch(e) {
					console.error('userBindRoom e', e)
				}
			},
			async queryRoom(successCB = null, failCB = null, isShowLoading = true) {
				if (!this.roomId) return
				if (isShowLoading) {
					uni.showLoading({
						title: '加载中'
					});
				}
				
				// 获取当前日期
				const curTime = Date.now();
				// 获取一天前的日期
				const oneDayAgo = curTime - 1000 * 60 * 60 * 24;
				const dbCmd = db.command
				const whereJson = {
					roomId: this.roomId,
					// createTime: dbCmd.gte(oneDayAgo).and(dbCmd.lte(curTime))
					// createTime: dbCmd.gt(oneDayAgo)
				}
				
				console.log('whereJson', whereJson)
				
				db.collection('room-undercover').where(whereJson).get()
				.then(res => {
					console.log('queryRoom res',res)
					const data = res && res.data && res.data[0]
					console.log('data', data)
					if (data) {
						this.handleSetData(data)
					} else {
						// 空数据认为是失效的
						throw new Error('空数据')
					}
					uni.hideLoading();
					successCB && successCB()
				}).catch((e) => {
					console.log('queryRoom e', e)
					uni.hideLoading()
					failCB && failCB()
					this.$refs.textRef.showModal({
						content: '房间已失效',
						showClose: false,
					});
				})
			},
			handleSetData(data) {
				const { roomCount = 0, userList, roleList, userRoleMap, createTime } = data || {};
				let list = (userList || []).slice(0);
				let len = roomCount - list.length;
				while(len > 0) {
					list.push({});
					len--;
				}
				if (userRoleMap) {
					const cid = getClientId();
					this.myRole = userRoleMap[cid];
					list.forEach((item) => {
						if (item.clientId) {
							item.role = userRoleMap[item.clientId]
						}
					})
					if (this.isCreator) {
						this.myRole = roleList2[0]
						this.btnType = 'new'
					} else {
						if (this.myRole) {
							// this.$refs.maskRef.showModal({
							// 	title: '你的词语牌',
							// 	roleGroup: this.myRole.word,
							// 	roleUrl: this.roleUrl,
							// 	roleTip: '请保密自己的词语'
							// });
							this.$refs.textRef.showModal({
								content: `你的词语`,
								extraWord: this.myRole.word,
								showClose: false,
								isIgonreCB: true,
								confirmText: '我知道了',
							});
						}
					}
				} else {
					this.myRole = null;
				}
				this.record = data;
				this.showUserList = list;
				this.userList = userList || [];
				this.roomRoleList = roleList || [];
			},
			handleSubmit() {
				console.log('handleSubmit')
				if (this.checkVerify() === true) {
					 const userCodeList = this.userList.map(item => item.clientId)
					 const newRoleList = this.roomRoleList.reduce((pre, cur) => {
						 let num = (cur && cur.roleCount) || 0
						 while(num > 0) {
							 num--
							 pre.push(cur)
						 }
						 return pre
					 }, [])
					 const userRoleList = randAssignRoles(newRoleList, userCodeList)
					 if (!userRoleList) {
						 return uni.showToast({
						 	icon: 'error',
						 	title: '发牌异常'
						 })
					 }
					 const userRoleMap = userRoleList.reduce((pre, cur) => {
						 const { user, role } = cur || {}
						 if (user && role) {
							 pre[user] = role
						 }
						 return pre
					 }, {});
					 
					 uni.showLoading({
					 	title: '正在发牌'
					 });
					 db.collection('room-undercover').where(`roomId=="${this.roomId}"`)
					   .update({
					     userRoleMap,
					   }).then((res) => {
							console.log('userBindRoom res', res)
							// 重新查询赋值
							this.queryRoom()
							// 触发其他用户刷新
							this.sendMessageTrigger()
						}).catch(() => {
							uni.showToast({
								icon: 'none',
								title: '数据异常',
							})
						}).finally(() => uni.hideLoading());
				}
			},
			checkVerify() {
				const { roomCount } = this.record || {}
				const useLen = this.userList.length
				if (!roomCount || useLen > roomCount) {
					return uni.showToast({
						icon: 'none',
						title: '数据异常'
					})
				}
				const leftCount = roomCount - useLen
				if (useLen < roomCount) {
					this.$refs.textRef.showModal({
						content: `还差 ${leftCount} 玩家，邀请其他朋友一起来玩吧`,
						isShare: true,
					});
					return false
				}
				return true;
			},
			sendMessageTrigger() {
				uniCloud.callFunction({
					name: 'messageTrigger',
					data: { roomId: this.roomId, clientId: this.clientId, gameType: GameType.undercover }
				}).then((res) => {
					console.log('uniCloud.callFunction', res.result) // 结果是 {sum: 3}
				}).catch((err) => {
					console.error(err)
				})
			},
			receiveMessage(res) {
				console.log("收到推送消息：",res) //监听推送消息
				if (res?.data?.payload?.gameType === GameType.undercover) {
					this.queryRoom(null, null, false)
				}
			},
			jumpHome(source = null) {
				uni.switchTab({
					url: '/pages/undercover/index' + `${source ? ('?source=' + source) : ''}`,
				});
			},
		}
	}
</script>

<style scoped>
	.page {
		min-width: 100vw;
		min-height: 100vh;
		font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,PingFang SC,Noto Sans,Noto Sans CJK SC,Microsoft YaHei,微软雅黑,sans-serif;
		/* background-color: #1F1F21; */
		background-color: #000;
	}
	
	.header-top {
		box-sizing: border-box;
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding-left: 22px;
		padding-right: 22px;
	}
	.mr4 {
		margin-right: 4px;
	}
	.icon-back {
		height: 20px;
		width: 12px;
	}
	.header-room {
		padding: 48px 0px 0px;
	}
	.header-tag {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 0px;
		padding-bottom: 24px;
	}
	.rules {
		box-sizing: border-box;
		width: 74px;
		height: 24px;
		margin-left: 8px;
		display: flex;
		align-items: center;
		padding: 0 5px;
		background-color: #005B5B;
		/* background: linear-gradient(90deg, #009192 0%, #005B5B 37.56%, rgba(0, 8, 8, 0) 104.76%); */
		/* border: 1px solid #01C2C3; */
		border-radius: 17px;
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 400;
		font-size: 11px;
		line-height: 15px;
		color: #FFFFFF;
	}
	.icon-question {
		width: 14px;
		height: 14px;
		margin-right: 4px;
	}
	
	.header {
		padding: 12px 0px 24px;
		background-color: #000;
		background-image: url('../../static/icon-swell.png');
		background-size: contain;
		background-position: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.icon-star {
		position: relative;
		width: 20px;
		height: 20px;
		margin-top: -20px;
		margin-left: -25px;
		z-index: 1;
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
	.room-id {
		color: #ffffff;
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
/* 	.card {
	  width: 200px;
	  height: 28px;
	  line-height: 28px;
	  color: #fff;
	  text-align: center;
	  position: relative;
	  background: linear-gradient(to right, rgba(255, 255, 255, 0), #00FEFF, rgba(255, 255, 255, 0));
	} */

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
		position: relative;
		margin-top: -80px;
		min-height: 104px;
		width: 100%;
		
		background: linear-gradient(97.92deg, #FFFFFF 44.6%, #DEFFFF 100%);
		border-radius: 2px;
	}
	.box-tag {
		position: relative;
		width: 60px;
		height: 20px;
		background: #EDFAFA;
		border-bottom-right-radius: 50%;
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
		position: relative;
		box-sizing: border-box;
		padding: 0px 12px;
		padding-bottom: 72px;
	}
	.center {
		width: 100%;
		text-align: center;
	}
	.icon-role-con {
		margin-top: 4px;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		/* justify-content: center; */
		justify-content: flex-start;
	}
	
	.number-container {
	  position: absolute;
	  top: 0px;
	  right: 0px;
	  width: 20px;
	  height: 20px;
	  background-color: #01C2C3;
	  border-radius: 4px;
	  text-align: center;
	  line-height: 20px;
	  color: white;
	  font-size: 16px;
	  font-weight: 600;
	  z-index: 9;
	}
	.icon-role-item {
		position: relative;
		text-align: center;
		margin-left: 8px;
	}
	.icon-role-name {
		font-size: 12px;
		color: #14151A;
		padding-bottom: 2px;
		margin-top: -2px;
		width: 100%;
	}
	.icon-role-img {
		width: 50px; 
		height: 50px; 
		background-color: #eeeeee;
	}
	
	.invite-block {
		width: 100%;
		margin: 16px 0px;
		display: flex;
		justify-content: center;
	}
	.user-con {
		position: relative;
		margin-top: 24px;
		min-height: 132px;
		background: #FFFFFF;
		box-shadow: 0px 0px 8px #E2E2F1;
		border-radius: 2px;
	}

	.box-tag-right-con {
		position: absolute;
		top: 10px;
		right: -16px;
		/* background: #131C23; */
		/* border-top: 1px solid #FF4859; */
		border-bottom: 1px solid #01C2C3;
		/* box-shadow: inset 0.5px -0.5px 2px rgba(255, 255, 255, 0.21); */
		/* backdrop-filter: blur(25px);		 */
		border-radius: 2px;
		padding: 2px 16px;
		transform: rotate(45deg);
	}
	.box-tag-right-border {
		border-top: 1px solid #01C2C3;
	}
	.box-tag-right {
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 500;
		font-size: 11px;
		line-height: 17px;		
		color: #01C2C3;
	}
	
	.user-item-con {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding-bottom: 16px;
	}
	.user-item {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2px;
		margin-left: 16px;
		margin-top: 16px;
		background-color: #fff;
		border-radius: 4px;
		text-align: center;
		box-shadow: 0 0 15px rgba(255, 255, 255, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.3), 0 0 50px rgba(255, 255, 255, 0.2), 0 0 100px rgba(255, 255, 255, 0.2);
	}
	/* .user-active::before {
		content: '';
		position: absolute;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		border: 1px solid rgba(1, 194, 195, 0.5);
		border-radius: 10px;
		animation: glow 2s infinite alternate;
	} */

	@keyframes glow {
		0% {
			box-shadow: 0 0 5px rgba(1, 194, 195, 0.3);
		}
		50% {
			box-shadow: 0 0 20px rgba(1, 194, 195, 0.7);
		}
		100% {
			box-shadow: 0 0 5px rgba(1, 194, 195, 0.3);
		}
	}

	.user-img-con {
		width: 60px;
		height: 50px;
		
		background-color: #F1F1F5;
		background-image: url('../../static/icon-sonline.png');
		background-size: cover;
		background-position: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.user-img {
		height: 35px;
		width: 35px;
		border-radius: 50%;
	}
	.user-num {
	  position: absolute;
	  top: -10px;
	  left: -8px;
	  width: 25px;
	  height: 25px;
	  background-color: #01C2C3;
	  border-radius: 50%;
	  text-align: center;
	  line-height: 25px;
	  color: white;
	  font-size: 16px;
	  font-weight: 600;
	  z-index: 9;
	}
	.user-num-active {
		background-color: #6126ca;
	}
	
	.user-plus {
	  position: relative;
	  width: 60px;
	  height: 50px;
	  background: #F1F1F5;
	  box-shadow: inset 0px -1px 4px #D2F5F6;
	}
	
	.user-plus:before,
	.user-plus:after {
	  content: "";
	  position: absolute;
	  top: 50%;
	  left: 50%;
	  width: 30px;
	  height: 3px;
	  background: #fff;
	  transform: translate(-50%, -50%);
	}
	
	.user-plus:before {
	  transform: translate(-50%, -50%) rotate(90deg);
	}
	
	.user-name{
		width: 60px;
		font-size: 12px;
		height: 20px;
		line-height: 20px;
		color: #FFFFFF;
		background-color: #01C2C3;
		overflow: hidden;
		text-overflow: ellipsis;
		border: none;
		border-radius: 0px;
		padding: 0px;
		margin: 0px;
	}
	.user-name::after {
		border: none;
	}
	.user-role-name-good {
		margin-top: 4px;
		width: 60px;
		font-size: 12px;
		height: 20px;
		line-height: 20px;
		color: #01C2C3;
		background: #EDFAFA;
		box-shadow: inset 0px -1px 4px #D2F5F6;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.user-role-name-back {
		margin-top: 4px;
		width: 60px;
		font-size: 12px;
		height: 20px;
		line-height: 20px;
		color: #FF4657;
		background: #F7F7F7;
		border: 0.8px dashed #7F7F8E;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.btn-share-plus {
		position: relative;
		width: 100%;
		height: 100%;
		right: 0;
		bottom: 0;
		padding: 0;
		margin: 0;
		background-color: transparent;
		border: none;
	}
	.btn-share-plus::after {
		border: 0;
	}
	
	.role-con {
		margin-top: 24px;
		box-sizing: border-box;
		width: 100%;
		min-height: 300px;
		/* padding: 16px; */
	/* 	background-size: contain;
		background-image: url('../../static/icon-set-box11.png'),url('../../static/icon-set-box3.png'),url('../../static/icon-set-box2.png');
		background-repeat: no-repeat, no-repeat, repeat-y;
		background-position: center top, center bottom, center top; */
		/* background: linear-gradient(180deg, #22D6D7 0%, #04AEAF 2.46%, #09BDBE 100%); */
		/* box-shadow: 0px -3.8806px 7.76119px rgba(0, 0, 0, 0.2); */
		border-radius: 3.8806px;
		background-color: #000;
		color: #fff;
	}
	.role-box {
		/* background-color: #fff; */
		padding: 16px;
		border-radius: 4px;
	}
	.role-group {
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 600;
		font-size: 32px;
		padding: 16px 0px 0px;
		/* line-height: 48px;		 */
		text-align: center;
		color: #FFFFFF;
		background: linear-gradient(180deg, rgba(40, 197, 201, 0.49175) 2.48%, rgba(255, 255, 255, 0.0001) 100%);
	}
	.role-img-con {
		display: flex;
		justify-content: center;
		/* background-image: url('../../static/icon-lightning.png'); */
		/* background-size: cover; */
		/* background-position: center; */
		
		width: 100%;
		height: 280px;
		position: relative;
		perspective: 800px;
		/* overflow: hidden; */
	}
	.role-img-bg {
		width: 100%;
		height: 280px;
		position: absolute;
		z-index: -1;
	}
	
/* 	.role-img {
		width: 200px;
		height: 280px;
	} */
	
	
	.role-img {
		width: 200px;
		height: 280px;
		position: absolute;
		top: 0;
		left: 20%;
		transform: translate(-50%, -50%);
		text-align: center;
		color: #fff;
		opacity: 1;
		transition: opacity 0.3s ease-in-out;
		animation: rotate 8s infinite linear;
	}
	@keyframes rotate {
		0% {
			transform: rotateY(0deg);
		}
		50% {
			transform: rotateY(180deg);
		}
		100% {
			transform: rotateY(360deg);
		}
	}

	.role-desc {
		margin: 16px 0px;
		font-size: 14px;
		/* background: linear-gradient(180deg, rgba(40, 197, 201, 0.49175) 2.48%, rgba(255, 255, 255, 0.0001) 100%); */
	}
	.role-desc-item {
		margin-top: 8px;
		line-height: 24px;
	}
	
	.btn-con {
		margin-top: 24px;
		background-color: #000;
	}
	
	.btn {
		width: 188.33px;
		height: 55px;
		line-height: 50px;
		background: linear-gradient(180deg, rgba(40, 197, 201, 0.49175) 2.48%, rgba(255, 255, 255, 0.0001) 100%);
		opacity: 0.8;
		border: 1px solid #00FEFF;
		box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
		color: #ffffff !important;
	}
	.search-con {
		margin-top: 48px;
		padding-top: 16px;
		border-top: 0.5px solid #7F7F8E;
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 400;
		font-size: 10px;
		line-height: 14px;		
		text-align: center;
		color: #7F7F8E;
	}
	.modal-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 99;
	}

	.modal-view {
		position: relative;
		background-color: #fff;
		border-radius: 8px;
		width: 250px;
	}

	.modal-container {
		padding: 20px;
		border-radius: 8px;
		color: #000000;
		background: linear-gradient(180deg, rgba(40, 197, 201, 0.49175) 2.48%, rgba(255, 255, 255, 0.0001) 100%);
	}

	.modal-invald-text {
		font-weight: 500;
		line-height: 31px;
		text-align: center;
	}
	.modal-invite-text {
		font-weight: 500;
	}
	.modal-footer {
		padding: 24px 20px 0px;
		display: flex;
		justify-content: space-between;
	}
	.modal-btn {
		width: 100%;
		border-radius: 4px;
	}
	.modal-btn + .modal-btn {
		margin-left: 16px;
	}
	.modal-cancel-btn {
		background-color: #fff;
		color: #01C2C3;
	}
	.modal-confirm-btn {
		background-color: #01C2C3;
		color: #fff;
	}

	.close-box {
		margin-top: 16px;
		position: absolute;
		right: -10px;
		top: -50px;
	}

	.close-button {
		position: relative;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		cursor: pointer;
		/* background-color: #01C2C3; */
		/* background-color: rgba(0, 0, 0, 0.5); */
	}

	.close-button-inner {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 18px;
		height: 2px;
		/* background-color: #00FEFF; */
		background-color: #fff;
		transform: translate(-50%, -50%) rotate(45deg);
	}

	.close-button-inner:before,
	.close-button-inner:after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #fff;
	}

	.close-button-inner:before {
		transform: rotate(-90deg);
	}

	.close-button-inner:after {
		transform: rotate(90deg);
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
