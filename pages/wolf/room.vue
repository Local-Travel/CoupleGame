<template>
	<view class="page">
		<view>
			<view class="status-bar">
				<!-- 这里是状态栏 -->
				<image class="icon-back" webp mode="scaleToFill" src="../../static/icon-back.png"></image>
				<view>
					<view class="rules" @click="jumpRules">
						<image class="icon-question" webp mode="scaleToFill" src="../../static/icon-question.png"></image>
						<text>规则说明</text>
					</view>
				</view>
			</view>
		</view>
		<view class="header">
			<view>
				<view class="title">房间号：<text class="room-id">{{ roomId }}</text></view>
				<image class="icon-star" webp mode="scaleToFill" src="../../static/icon-star.png"></image>
			</view>
			<view class="wait-tip">邀请朋友一起开嗨</view>
			<view class="header-bg"></view>
		</view>
		<view class="header-bottom"></view>
		<view class="content">
			<!-- 角色列表 -->
			<view class="top-box">
				<view class="box-tag">
					<view class="box-tag-text">房间角色</view>
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
					<view v-for="(item,index) in showUserList" :key="index" class="user-item" @click="handleInvite(item)">
						<view class="user-num">{{index + 1}}</view>
						<view class="user-img-con">
							<image v-if="item.avatarUrl" class="user-img" webp mode="scaleToFill" :src="item.avatarUrl"></image>
							<view v-else class="user-plus"></view>
						</view>
						<view class="user-name">{{item.nickName || '邀请'}}</view>
						<view v-if="isCreator && item.role" :class="item.role.type === RoleType.good ? 'user-role-name-good': 'user-role-name-back'">{{item.role.name || '未知'}}</view>
					</view>
				</view>
			</view>
			<!-- 自己角色 -->
			<view class="role-con" v-if="myRole">
				<view class="role-box">
					<view class="role-group">{{ roleGroup }}</view>
					<view class="role-img-con">
						<image class="role-img" webp mode="scaleToFill" :src="myRole.url"></image>
					</view>
					<view class="role-desc">{{ roleDesc }}</view>
				</view>
			</view>
			<!-- 按钮 -->
			<view class="btn-con">
				<button v-if="isCreator" :class="'btn-submit'" @click="handleSubmit">
					{{ btnText }}
				</button>
			</view>
		</view>
		<view class="modal-view" v-if="showModal">
			<view class="modal">
				<scroll-view scroll-y class='modal-body'>
					<view>
						请先授权登录
					</view>
				</scroll-view>
				<view class='modal-footer'>
				  <button class='modal-confirm-btn' @click="handleAuth">一键登录</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { RoleType, roleDescMap, getClientId, getLocalUser, getCreator, randAssignRoles } from './const.js'
	    
	const db = uniCloud.databaseForJQL();
	export default {
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
				showModal: false,
				RoleType,
			}
		},
		onLoad(option) {
			console.log('onLoad option', option);
			const { id, source } = option || {}
			const self = this;
			if (!id) {
				// return this.jumpHome(source)
			}
			this.roomId = id;
			this.user = getLocalUser()
			if (!this.user) {
				this.showModal = true;
			}
			this.getPushClientId();
			this.queryRoom(() => {
				self.userBindRoom();
			});
			//启动推送事件监听
			uni.onPushMessage(this.pushMessageListener);
		},
		onUnload(option) {
			console.log('onUnload option', option);
			//关闭推送事件监听
			uni.offPushMessage(this.pushMessageListener);
		},
		onPullDownRefresh() {
			console.log('onPullDownRefresh')
			this.queryRoom(() => uni.stopPullDownRefresh());
		},
		computed: {
			roleGroup() {
				return this.myRole ? roleDescMap[this.myRole.code][0] : ''
			},
			roleDesc() {
				return this.myRole ? roleDescMap[this.myRole.code][1] : ''
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
				uni.getPushClientId({
					success: (res) => {
						console.log('客户端推送标识:',res.cid)
						uni.setStorage('clientId', res.cid);
						this.clientId = res.cid;
						// bd4d901aaf7a930900158c3fd28dbf42
						// uniCloud.callFunction({
						// 	name: 'testUniPush',
						// 	data: { push_clientid: this.clientId }
						// }).then((res) => {
						// 	console.log('uniCloud.callFunction', res.result) // 结果是 {sum: 3}
						// }).catch((err) => {
						// 	console.error(err)
						// })
					},
					fail(err) {
						console.log('getPushClientId', err)
						const clientId = getClientId();
						uni.setStorage('clientId', clientId);
						this.clientId = clientId;
					}
				})
			},
			pushMessageListener(res) {
				console.log("收到推送消息：",res) //监听推送消息
			},
			handleAuth(){
			    const self = this;
			    this.showModal = false;
			    uni.getUserProfile({
			    	desc:"获取你的昵称和头像",
			    	success: (res) => {
			    		console.log('getUserProfile res', res)
			    		if (res.errMsg === 'getUserProfile:ok') {
			    			uni.setStorage({
			    				key: 'userInfo', 
			    				data: res.userInfo
			    			});
			    			self.createUser(res.userInfo);
			    		}
			    	},
			    	fail:(err) => {
			    		console.log("您取消了授权,登录失败")
			    		self.jumpHome();
			    	}
			    });
			},
			createUser(userInfo = {}) {
				const data = {
					nickName: userInfo.nickName,
					avatarUrl: userInfo.avatarUrl,
					gender: userInfo.gender,
					clientId: getClientId(),
				}
				
				db.collection('user').add(data).then(res => {
					console.log('createUser res',res)
				}).catch((e) => {
					console.log('createUser e', e)
				})
				
				this.userBindRoom();
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
						db.collection("room").where(`roomId=="${this.roomId}"`)
						  .update({
						    userList: list,
						  }).then((res) => {
							  console.log('userBindRoom res', res)
							  // 重新查询赋值
							  this.queryRoom()
							  // 触发其他用户刷新
						  }).catch(() => {
							  uni.showToast({
							  	icon: 'none',
							  	title: '加入房间失败，请下拉刷新重试',
							  })
						  });
					}
				} catch(e) {
					console.error('userBindRoom e', e)
				}
			},
			queryRoom(successCB = null, failCB = null) {
				if (!this.roomId) return
				uni.showLoading({
					title: '加载中'
				});
				db.collection('room').where(`roomId=="${this.roomId}"`).get().then(res => {
					console.log('queryRoom res',res)
					const data = res && res.data && res.data[0]
					console.log('data', data)
					if (data) {
						const { roomCount = 0, userList, roleList, userRoleMap } = data || {};
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
						} else {
							this.myRole = null;
						}
						this.record = data;
						this.showUserList = list;
						this.userList = userList || [];
						this.roomRoleList = roleList || [];
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
					uni.showModal({
						title: '房间已失效',
						showCancel: false,
						confirmText: '确定',
						success: function (res) {
							if (res.confirm) {
								// console.log('用户点击确定');
								// 转跳首页
								this.jumpHome();
							} else if (res.cancel) {
								// console.log('用户点击取消');
							}
						}
					})
				})
			},
			handleSubmit() {
				console.log('handleSubmit')
				if (this.checkVerify() === true) {
					 const userCodeList = this.userList.map(item => item.clientId)
					 const newRoleList = this.roleList.reduce((pre, cur) => {
						 const num = (cur && cur.roleCount) || 0
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
						 	title: '发牌异常，请下拉刷新重试'
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
					 db.collection('room').where(`roomId=="${this.roomId}"`)
					   .update({
					     userRoleMap,
					   }).then((res) => {
							console.log('userBindRoom res', res)
							// 重新查询赋值
							this.queryRoom()
							// 触发其他用户刷新
						}).catch(() => {
							uni.showToast({
								icon: 'none',
								title: '发牌异常，请下拉刷新重试',
							})
						}).finally(() => uni.hideLoading());
				}
			},
			checkVerify() {
				const { roomCount } = this.record || {}
				const useLen = this.userList.length
				if (!roomCount || useLen > roomCount) {
					return uni.showToast({
						icon: 'error',
						title: '数据异常，请下拉刷新重试'
					})
				}
				if (useLen < roomCount) {
					 return uni.showModal({
						content: `还差${leftCount}玩家，邀请其他朋友一起来玩吧`,
						confirmText: '邀请朋友',
						success: (res) => {
							console.log('res', res)
							if (res.confirm) {
								// 邀请其他朋友
								this.handleInvite();
							}
						}
					})
				}
				return true;
			},
			handleInvite(item = null) {
				if (item && !item.avatarUrl) {
					return
				}
				// 邀请其他玩家
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 1,
					summary: "我正在玩探本狼人局，赶紧跟我一起来体验吧！",
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			jumpHome(source = null) {
				uni.redirectTo({
					url: '/pages/index/index' + `${source ? ('?source=' + source) : ''}`,
				});
			},
			jumpRules() {
				uni.navigateTo({
					url: `/pages/wolf/rules?roomId=${this.roomId}`,
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
		background-color: #1F1F21;
	}
	.status-bar {
		box-sizing: border-box;
		height: var(--status-bar-height);
		width: 100%;
		line-height:var(--status-bar-height);
		display: flex;
		justify-content: space-between;
		padding-left: 22px;
		padding-right: 22px;
	}
	.icon-back {
		height: 20px;
		width: 12px;
	}
	.rules {
		box-sizing: border-box;
		width: 74px;
		height: 24px;
		display: flex;
		align-items: center;
		padding: 0 5px;
		background: #363636;
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
		padding: 24px 0px;
		background-color: #000;
		background-image: url('../../static/icon-swell.png');
		background-size: cover;
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
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: center;
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
		box-shadow: inset 0.5px -0.5px 2px rgba(255, 255, 255, 0.21);
		backdrop-filter: blur(25px);		
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
	
	.btn-invite {
		height: 46px;
		width: 211px;
		text-align: center;
		border-radius: 2px;
		font-family: 'PingFang TC';
		font-style: normal;
		font-weight: 600;
		font-size: 18px;
		line-height: 46px;
		color: #FFFFFF;
		background-color: #01C2C3;
	}
	
	.role-con {
		margin-top: 24px;
		box-sizing: border-box;
		width: 100%;
		min-height: 300px;
		padding: 40px;
		background-size: contain;
		background-image: url('../../static/icon-set-box1.png'),url('../../static/icon-set-box3.png'),url('../../static/icon-set-box2.png');
		background-repeat: no-repeat, no-repeat, repeat-y;
		background-position: center top, center bottom, center top;
	}
	.role-box {
		background-color: #fff;
		padding: 16px;
	}
	.role-group {
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 500;
		font-size: 22px;
		line-height: 31px;
		text-align: center;
	}
	.role-img-con {
		display: flex;
		justify-content: center;
	}
	
	.role-img {
		width: 200px;
		height: 280px;
	}
	.role-desc {
		margin-top: 8px;
		font-size: 14px;
	}
	.btn-submit {
		height: 46px;
		line-height: 46px;
		margin-top: 16px;
		text-align: center;
		background-color: #01C2C3;
		color: #fff;
		border-radius: 2px;
		font-family: 'PingFang TC';
		font-style: normal;
		font-weight: 600;
		font-size: 18px;
	}
	.btn-disable {
		background-color: #C7C7D7;		
		color: #FFFFFF;
	}
	.modal-view {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0,0,0,0.4);
		z-index: 99;
	}
	.modal {
		display: flex;
		flex-direction: column;
		width: 250px;
		/* height: 80%; */
		background-color: #fff;
		border-radius: 4px;
	}
	.modal-body {
		padding: 24px 0px;
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 500;
		/* font-size: 22px; */
		line-height: 31px;
		/* identical to box height */
		text-align: center;
		color: #000000;
		background: linear-gradient(180deg, rgba(40, 197, 201, 0.49175) 2.48%, rgba(255, 255, 255, 0.0001) 100%);
	}
	.modal-footer {
		padding: 0px 20px 24px;
	}
	.modal-confirm-btn {
		background-color: #01C2C3;
		color: #fff;
	}

</style>
