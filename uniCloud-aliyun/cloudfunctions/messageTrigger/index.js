'use strict';
const uniPush = uniCloud.getPushManager({appId:"__UNI__97BC0E8"}) //注意这里需要传入你的应用appId
exports.main = async (event, context) => {
	console.log('messageTrigger event', event)
	// console.log('context', context)
	const { roomId, clientId } = event || {}
	if (!roomId) return null;
	const db = uniCloud.databaseForJQL()
	const res = await db.collection('room').where({ roomId }).get()
	const data = res && res.data && res.data[0]
	if (!data) return null
	const { userList = [], creator = '' } = data;
	let clientIdList = userList.map(item => item.clientId);
	clientIdList.push(creator);
	// console.log('clientIdList', clientIdList);
	return await uniPush.sendMessage({
		// "push_clientid": creator,
		"push_clientid": clientIdList,
		"title": "通知栏显示的标题",	
		"content": "通知栏显示的内容",
		"payload": {
			"type": "refresh",
			"clientId": clientId,
			// "userList": userList,
			// "clientIdList": clientIdList,
		}
	})
};
