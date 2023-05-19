'use strict';

const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");

exports.main = async (event, context) => {
	console.log('timeDeleteUndercoverTrigger event', event)
	try {
		const db = uniCloud.database();
		
		// 获取当前日期
		const currentDate = new Date();
		
		// 获取昨天日期
		const yesterday = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
		
		// 设置昨天的起始时间和结束时间
		yesterday.setHours(0, 0, 0, 0);
		const yesterdayStart = yesterday.getTime();
		yesterday.setHours(23, 59, 59, 999);
		const yesterdayEnd = yesterday.getTime();
		
		const dd = yesterday.getDate();
		const mm = yesterday.getMonth() + 1; // 注意月份是从 0 开始的，所以要加1
		const yy = yesterday.getFullYear();
		const dateStr = yy + (mm < 10 ? '0' : '') + mm + (dd < 10 ? '0' : '') + dd 
		console.log('yesterday', dateStr)
		// console.log('yesterdayStart', yesterdayStart)
		// console.log('yesterdayEnd', yesterdayEnd)
		// 构造查询条件
		const condition = {
			createTime: db.command.gt(yesterdayStart).and(db.command.lt(yesterdayEnd))
		};
		
		// 调用云函数查询数据
		const res = await db.collection('room-undercover').where(condition).get();
		const data = res && res.data;
		const updateIdList = [];
		if (Array.isArray(data) && data.length) {
			const roomNum = data.length;
			console.log('data', roomNum);
			let roomSuccessNum = 0
			let roomInviteNum = 0
			let roomIdList = []
			data.forEach((item) => {
				roomIdList.push(item.roomId)
				if (item.userRoleMap) {
					roomSuccessNum++
				}
				if (item.userList && item.userList.length) {
					roomInviteNum++
				}
			})
			
			const batchUpdate = async (ids) => {
				// 数据过大可能会有问题
				console.log('ready to batch update roomIds', ids, ids.length)
				for(let roomId of ids) {
					await db.collection('room-undercover').where({ roomId }).update({
						roomId: dateStr + '-' + roomId,
					})
					// console.log('resp', resp)
					updateIdList.push(roomId)
				}
				console.log('updateIdList', updateIdList, updateIdList.length)
			}
			await db.collection('room-undercover-history').add({ room_num: roomNum, room_success_num: roomSuccessNum, room_invite_num: roomInviteNum, updateTime: new Date() })
			await batchUpdate(roomIdList)
		}
	} catch(e) {
		console.log('e', e)
	}
	return null
};
