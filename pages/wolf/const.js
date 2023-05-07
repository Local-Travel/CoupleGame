import { v4 as uuidv4 } from 'uuid';
// 角色阵营
export const RoleType = {
	'independency': 'independency',
	'wolf': 'wolf',
	'good': 'good',
}

// 角色
export const roleList = [
	{ code: 'god', name: '法官', type: RoleType.independency, roleCount: 0, url: '../../static/god.png' },
	{ code: 'civilian', name: '平民', type: RoleType.good, roleCount: 0, url: '../../static/civilian.jpg' },
	{ code: 'wolf', name: '狼人', type: RoleType.wolf, roleCount: 0, url: '../../static/wolf.jpg' },
	{ code: 'witch', name: '女巫', type: RoleType.good, roleCount: 0, url: '../../static/witch.jpg' },
	{ code: 'prophet', name: '预言家', type: RoleType.good, roleCount: 0, url: '../../static/prophet.jpg' },
	{ code: 'hunter', name: '猎人', type: RoleType.good, roleCount: 0, url: '../../static/hunter.jpg' },
	// { code: 'sheriff', name: '警长', type: RoleType.good, roleCount: 0, url: '../../static/lake.png' },
	// { code: 'cupid', name: '丘比特', type: RoleType.good, roleCount: 0, url: '../../static/lake.png' },
	{ code: 'idiot', name: '白痴', type: RoleType.good, roleCount: 0, url: '../../static/idiot.jpg' },
	{ code: 'wolfking', name: '狼王', type: RoleType.wolf, roleCount: 0, url: '../../static/wolfking.jpg' },
	{ code: 'guard', name: '守卫', type: RoleType.good, roleCount: 0, url: '../../static/guard.jpg' },
	{ code: 'demon-hunter', name: '猎魔人', type: RoleType.good, roleCount: 0, url: '../../static/demon-hunter.jpg' },
	{ code: 'wolf-beauty', name: '狼美人', type: RoleType.wolf, roleCount: 0, url: '../../static/wolf-beauty.jpg' },
	{ code: 'wolf-hide', name: '隐狼', type: RoleType.wolf, roleCount: 0, url: '../../static/wolf-hide.jpg' },
]

// 各角色的介绍
export const roleDescMap = {
	'god': ['法官', '天黑请闭眼，狼人请睁眼，请狼人击杀目标，狼人请确认目标，狼人确认请闭眼。预言家请睁眼，请选择你要看哪一个玩家的身份，好人是这个（拇指朝上），坏人是这个（拇指朝下），ta是这个（拇指朝上或朝下），预言家确认请闭眼。女巫请睁眼，女巫你有一瓶解药，你是否需要使用？你有一瓶毒药是否需要使用？女巫确认请闭眼。猎人请睁眼，猎人请闭眼。天亮了请睁眼，昨夜死亡的玩家是（xx），昨夜是平安夜，无人死亡。'],
	'civilian': ['好人·平民', '你没有技能，白天可以投票，你应该在白天听取他人发言认真分析，找出狼人将他们投票出局，赢得胜利。'],
	'wolf': ['狼人·神职', '你夜晚的时候可以发动猎杀技能，可以猎杀任何人（包括你自己），你应该想方设法淘汰掉所有平民，亦或者淘汰所有好人神职人员，就可以赢得胜利。向月亮仰天狂啸吧，我的狼人们，呜呜呜~'],
	'witch': ['好人·神职', '你有一瓶解药和一瓶毒药，夜晚的时候可以用来救人或杀人，每晚只能使用一瓶药，你可以选择是否使用解药或毒药，或者不使用，解药全程不能自救。你应该想方设法找出狼人，并引导平民，将他们淘汰出局。'],
	'prophet': ['好人·神职', '在夜晚的时候可以查验一名玩家的身份，得知其是狼人还是好人。你的角色很重要，往往起到带领作用，在适当的时机可以选择暴露自己的身份，引导大家投票将狼人淘汰出局。'],
	'hunter': ['好人·神职', '你有一次发动猎杀的技能，第二晚开始在死亡前（被女巫毒死或殉情外）可以选择枪杀一名玩家。在确认对方是狼人的情况下，白天也可以选择自爆，直接猎杀狼人将其带走。'],
	'idiot': ['好人·神职', '你祖上是开国功臣，拥有一张铁卷丹书，只有在白天投票淘汰自己时可以使用，亮明身份可以保命一次，需要注意的是你亮明身份后有发言权，但就失去了投票权。找出狼人，将他们淘汰出局吧'],
	'guard': ['好人·神职', '你作为守护人，夜晚的时候可以守卫一名玩家，但不能连续两夜守护同一位玩家，被守卫的玩家当晚不会被狼人杀害'],
	'demon-hunter': ['好人·神职', '你作为猎魔人，女巫的毒药对你无效，从第二晚开始可以选择一名玩家进行狩猎，如果对方是狼人，则次日狼人淘汰出局，但如果对方是好人，则次日自己会被淘汰出局，所以谨慎使用'],
	'wolfking': ['狼人·神职', '你跟普通的狼人一样，夜晚的时候可以跟狼人猎杀玩家，可以猎杀任何人（包括你自己），你比普通狼人多了一项技能，就是淘汰前（被女巫毒死除外）可以枪杀一名玩家。你应该想方设法淘汰掉所有平民，亦或者淘汰所有神职人员，就可以赢得胜利。'],
	'wolf-beauty': ['狼人·神职', '你跟普通的狼人一样，夜晚的时候可以跟狼人猎杀玩家，你比普通狼人多了一项技能，你可以魅惑他人，晚上指定魅惑的玩家，让对方陪你殉葬，如果你被淘汰了，制定殉情的人将会跟你一起殉葬且无法发动技能。'],
	'wolf-hide': ['狼人·神职', '你是一名隐身的狼人，夜晚的时候你跟狼人一养睁眼，但不能发动猎杀技能，只有当所有狼人淘汰了，你才获得猎杀技能。未成真狼之前，预言家查验的结果始终都是好人，同时你不能自爆'],
}

export const defaultRules = [
	'角色分配：根据游戏人数确定角色数量。通常包括狼人、村民、预言家、女巫、猎人等角色。每个玩家在游戏开始前被分配一个角色身份，但有些角色身份是秘密的。',
	`游戏阶段：游戏通常分为白天和黑夜两个阶段。

白天阶段：所有玩家齐聚一堂，进行讨论和辩论。玩家可以分享自己的怀疑、猜测或者为自己辩护。根据讨论的结果，玩家可以投票选出一名玩家进行投票处决。

黑夜阶段：在黑夜阶段，所有玩家闭眼，特定的角色可以执行特殊能力。例如，狼人可以商议并决定要杀害哪个玩家，预言家可以查验某个玩家的身份等。`,
	`票数计算和角色操作：在白天阶段，玩家根据讨论结果投票选出一名玩家进行投票处决。如果有多个玩家获得相同数量的票数，通常由法官或游戏主持人进行投票决胜。`,
	`角色死亡和揭示：被投票处决的玩家或被狼人杀害的玩家将揭示身份，并被视为已死亡。根据角色的特殊能力，有时死亡的玩家可以在死亡后继续发挥影响力。`,
	`游戏结束和胜利条件：游戏通常在满足某个阵营的胜利条件时结束。如果所有的狼人被投票出局，村民方胜利。如果狼人人数超过或等于村民人数，狼人方胜利。`,
]

// 建议数量
export const suggestCount = {
	'4': {
		'civilian': 1,
		'wolf': 2,
		'witch': 1,
	},
	'5': {
		'civilian': 2,
		'wolf': 2,
		'prophet': 1,
	},
	'6': {
		'civilian': 1,
		'wolf': 2,
		'witch': 1,
		'prophet': 1,
		'hunter': 1,
	},
	'7': {
		'civilian': 2,
		'wolf': 2,
		'witch': 1,
		'prophet': 1,
		'hunter': 1,
	},
	'8': {
		'civilian': 3,
		'wolf': 2,
		'witch': 1,
		'prophet': 1,
		'hunter': 1,
	},
	'9': {
		'civilian': 3,
		'wolf': 3,
		'witch': 1,
		'prophet': 1,
		'hunter': 1,
	},
	'10': {
		'civilian': 4,
		'wolf': 3,
		'witch': 1,
		'prophet': 1,
		'hunter': 1,
	},
	'11': {
		'civilian': 5,
		'wolf': 3,
		'witch': 1,
		'prophet': 1,
		'hunter': 1,
	}
}

// 获取初始化角色数据
export const getInitRoleList = (count) => {
	const num = count ? Number(count) : 4
	let obj = suggestCount[num];
	if (!obj) {
		if (num <= 4) {
			obj = suggestCount[4]
		} else {
			obj = suggestCount[11]
			let c = (num - 3) % 2
			if (c) {
				c = (num - 4) / 2
				obj.wolf = c
				obj.civilian = c + 1
			} else {
				c = (num - 3) / 2
				obj.wolf = c
				obj.civilian = c
			}
		}
	}
	const list = roleList.slice(1)
	list.forEach((item) => {
		item.roleCount = obj[item.code] || 0
	});
	return list;
}

// 获取客户端标记
export const getClientId = () => {
	try {
		return uni.getStorageSync('clientId') || uuidv4();
	} catch(e) {
		return uuidv4();
	}
}

// 获取客户端用户信息
export const getLocalUser = () => {
	let userInfo = null
	try {
		userInfo = uni.getStorageSync('userInfo');
	} catch (e) {
		// error
	}
	console.log('userInfo', userInfo);
	return userInfo;
}

// 获取创建者
export const getCreator = (clientId, nickName = '') => {
	return clientId + '-' + nickName
}

// 随机分配算法
export function randAssignRoles(roles, users) {
  const assignedRoles = [...roles]; // 复制角色数组，用于随机分配
  const assignedUsers = [];

  if (roles.length < users.length) {
    console.log("角色数量不足以分配给所有用户");
    return;
  }

  users.forEach(user => {
    const randomIndex = Math.floor(Math.random() * assignedRoles.length); // 随机生成角色索引
    const assignedRole = assignedRoles.splice(randomIndex, 1)[0]; // 从角色数组中移除已分配的角色并获取该角色

    assignedUsers.push({ user, role: assignedRole }); // 将用户和角色的配对添加到已分配数组中
  });

  return assignedUsers;
}