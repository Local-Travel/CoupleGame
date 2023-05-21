import { v4 as uuidv4 } from 'uuid';

// 游戏类型
export const GameType = {
	'undercover': 'undercover',
	'wolf': 'wolf'
}

// 角色阵营
export const RoleType = {
	'independency': 'independency',
	'wolf': 'wolf',
	'good': 'good',
}

// 角色
export const roleList = [
	{ code: 'god', name: '法官', type: RoleType.independency, roleCount: 0, url: 'https://mp-c43790a0-8ddb-4e40-9026-fb0f159fdf24.cdn.bspapp.com/cloudstorage/18d6fb12-b514-4bc8-8492-245eb0ecc4f6.jpg' },
	{ code: 'civilian', name: '平民', type: RoleType.good, roleCount: 0, url: 'https://mp-c43790a0-8ddb-4e40-9026-fb0f159fdf24.cdn.bspapp.com/cloudstorage/18d6fb12-b514-4bc8-8492-245eb0ecc4f6.jpg' },
	{ code: 'wolf', name: '狼人', type: RoleType.wolf, roleCount: 0, url: 'https://mp-c43790a0-8ddb-4e40-9026-fb0f159fdf24.cdn.bspapp.com/cloudstorage/7735e9b0-473e-4254-aae3-8b15f1adf8bf.jpg' },
	{ code: 'witch', name: '女巫', type: RoleType.good, roleCount: 0, url: 'https://mp-c43790a0-8ddb-4e40-9026-fb0f159fdf24.cdn.bspapp.com/cloudstorage/c06b0de5-4485-4904-83e8-a37ac56de23d.jpg' },
	{ code: 'prophet', name: '预言家', type: RoleType.good, roleCount: 0, url: 'https://mp-c43790a0-8ddb-4e40-9026-fb0f159fdf24.cdn.bspapp.com/cloudstorage/6a637f70-2b34-4293-a220-5a99e4d4a034.jpg' },
	{ code: 'hunter', name: '猎人', type: RoleType.good, roleCount: 0, url: 'https://mp-c43790a0-8ddb-4e40-9026-fb0f159fdf24.cdn.bspapp.com/cloudstorage/64d8467e-90e2-4842-92b1-6bf49d5256c5.jpg' },
	{ code: 'idiot', name: '白痴', type: RoleType.good, roleCount: 0, url: 'https://mp-c43790a0-8ddb-4e40-9026-fb0f159fdf24.cdn.bspapp.com/cloudstorage/bcf2c9fe-47c8-4dc6-9b71-69de1891ded1.jpg' },
	{ code: 'wolfking', name: '狼王', type: RoleType.wolf, roleCount: 0, url: 'https://mp-c43790a0-8ddb-4e40-9026-fb0f159fdf24.cdn.bspapp.com/cloudstorage/48d1c061-e7b8-4c6a-8fbb-af4a7af55675.jpg' },
	{ code: 'guard', name: '守卫', type: RoleType.good, roleCount: 0, url: 'https://mp-c43790a0-8ddb-4e40-9026-fb0f159fdf24.cdn.bspapp.com/cloudstorage/158a5463-f180-44e7-937b-5c2a2697a2ee.jpg' },
	{ code: 'demon-hunter', name: '猎魔人', type: RoleType.good, roleCount: 0, url: 'https://mp-c43790a0-8ddb-4e40-9026-fb0f159fdf24.cdn.bspapp.com/cloudstorage/af4a3822-a3d7-4a5f-8613-7300d18d9c09.jpg' },
	{ code: 'wolf-beauty', name: '狼美人', type: RoleType.wolf, roleCount: 0, url: 'https://mp-c43790a0-8ddb-4e40-9026-fb0f159fdf24.cdn.bspapp.com/cloudstorage/d8d64368-2291-4576-bbbb-6779778b5be5.jpg' },
	{ code: 'wolf-hide', name: '隐狼', type: RoleType.wolf, roleCount: 0, url: 'https://mp-c43790a0-8ddb-4e40-9026-fb0f159fdf24.cdn.bspapp.com/cloudstorage/fb991d3b-0d74-4ba7-a9d1-4c5898c3df38.jpg' },
]

// 各角色的介绍
export const roleDescMap = {
	'god': ['法官', '主持流程。天黑请闭眼，狼人请睁眼，请狼人击杀目标，狼人请确认目标，狼人确认请闭眼。预言家请睁眼，请选择你要看哪一个玩家的身份，好人是这个（拇指朝上），坏人是这个（拇指朝下），ta是这个（拇指朝上或朝下），预言家确认请闭眼。女巫请睁眼，女巫你有一瓶解药，你是否需要使用？你有一瓶毒药是否需要使用？女巫确认请闭眼。猎人请睁眼，猎人请闭眼。天亮了请睁眼，昨夜死亡的玩家是（xx），昨夜是平安夜，无人死亡。'],
	'civilian': ['好人·平民', '你没有技能，白天可以投票，你应该在白天听取他人发言认真分析，找出狼人将他们投票出局，赢得胜利。'],
	'wolf': ['狼人·狼人', '你夜晚的时候可以发动猎杀技能，可以猎杀任何人（包括你自己），你应该想方设法淘汰掉所有平民，亦或者淘汰所有好人神职人员，就可以赢得胜利。向月亮仰天狂啸吧，我的狼人们，呜呜呜~'],
	'witch': ['好人·女巫', '你有一瓶解药和一瓶毒药，夜晚的时候可以用来救人或杀人，每晚只能使用一瓶药，你可以选择是否使用解药或毒药，或者不使用，解药全程不能自救。你应该想方设法找出狼人，并引导平民，将他们淘汰出局。'],
	'prophet': ['好人·预言家', '在夜晚的时候可以查验一名玩家的身份，得知其是狼人还是好人。你的角色很重要，往往起到带领作用，在适当的时机可以选择暴露自己的身份，引导大家投票将狼人淘汰出局。'],
	'hunter': ['好人·猎人', '你有一次发动猎杀的技能，第二晚开始在死亡前（被女巫毒死或殉情外）可以选择枪杀一名玩家。在确认对方是狼人的情况下，白天也可以选择自爆，直接猎杀狼人将其带走。'],
	'idiot': ['好人·白痴', '你祖上是开国功臣，拥有一张铁卷丹书，只有在白天投票淘汰自己时可以使用，亮明身份可以保命一次，需要注意的是你亮明身份后有发言权，但就失去了投票权。找出狼人，将他们淘汰出局吧'],
	'guard': ['好人·守卫', '你作为守护人，夜晚的时候可以守卫一名玩家，但不能连续两夜守护同一位玩家，被守卫的玩家当晚不会被狼人杀害'],
	'demon-hunter': ['好人·猎魔人', '你作为猎魔人，女巫的毒药对你无效，从第二晚开始可以选择一名玩家进行狩猎，如果对方是狼人，则次日狼人淘汰出局，但如果对方是好人，则次日自己会被淘汰出局，所以谨慎使用'],
	'wolfking': ['狼人·狼王', '你跟普通的狼人一样，夜晚的时候可以跟狼人猎杀玩家，可以猎杀任何人（包括你自己），你比普通狼人多了一项技能，就是淘汰前（被女巫毒死除外）可以枪杀一名玩家。你应该想方设法淘汰掉所有平民，亦或者淘汰所有神职人员，就可以赢得胜利。'],
	'wolf-beauty': ['狼人·狼美人', '你跟普通的狼人一样，夜晚的时候可以跟狼人猎杀玩家，你比普通狼人多了一项技能，你可以魅惑他人，晚上指定魅惑的玩家，让对方陪你殉葬，如果你被淘汰了，制定殉情的人将会跟你一起殉葬且无法发动技能。'],
	'wolf-hide': ['狼人·隐狼', '你是一名隐身的狼人，夜晚的时候你跟狼人一养睁眼，但不能发动猎杀技能，只有当所有狼人淘汰了，你才获得猎杀技能。未成真狼之前，预言家查验的结果始终都是好人，同时你不能自爆'],
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
		'civilian': 2,
		'wolf': 1,
		'prophet': 1,
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

export const getUuid = () => uuidv4();

// 随机生成名字
export function generateRandomName() {
  try {
	  const familyNames = [
	  	'赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许',
	  	'何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章',
	  	'云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '任', '袁', '柳', '酆',
	  	'鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐',
	  	'于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚',
	  	'邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊',
	  	'纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危', '江',
	  	'童', '颜', '郭', '梅', '盛', '林', '刁', '钟', '徐', '邱', '骆', '高', '夏', '蔡', '田', '樊', '胡', '凌', '霍', '虞',
	  	'万', '支', '柯', '咎', '管', '卢', '莫', '经', '房', '裘', '缪', '干', '解', '应', '宗', '丁', '宣', '贲', '邓', '郁',
	  	'单', '杭', '洪', '包', '诸', '左'
	  ];
	  
	  const compoundSurnames = [
	  	'欧阳', '上官', '东方', '南宫', '司马', '独孤', '夏侯', '诸葛', '皇甫', '尉迟', '赫连', '澹台',
	  	'轩辕', '令狐', '钟离', '闾丘', '长孙', '慕容', '宇文', '司徒', '司空', '端木', '百里', '东郭', '南门', '呼延',
	  	'羊舌', '公孙'
	  ];
	  
	  const elegantFemaleNames = [
	    '雨', '芷', '思', '瑶', '晴', '静', '婉', '欣', '梦', '馨', '雅', '璇', '舒', '妍', '雯', '露', '娅', '悦', '婷', '萍',
	    '琳', '莉', '艳', '婵', '蓉', '凝', '晓', '彤', '柔', '颖', '茜', '玉', '珊', '洁', '芳', '霞', '爽', '薇', '宛', '淑', '青',
	    '娜', '佳', '宁', '蓝', '瑞', '艺', '慧', '雪', '云', '媛', '秀', '琼', '红', '美', '瑾', '萱', '琪', '蕾', '婧', '菲', '娣',
	    '涵', '颜', '岚', '荷', '若', '翠', '芬', '瑛', '筠', '萍', '宜', '岑', '秋', '雅', '霜', '丹', '青', '妙', '玲', '雁', '念',
	    '莺', '凌', '珍', '怡', '月', '琴', '黛', '蓝', '蕊', '柔', '纯', '灵', '曼', '颖', '香', '真', '玟', '彩', '希', '蔚', '潇'
	  ];
	  
	  const elegantMaleNames = [
	    '泽', '瀚', '宇', '煜', '皓', '晟', '昊', '晨', '轩', '睿', '潇', '韦', '弘', '文', '辰', '浩', '涛', '皓', '逸', '远',
	    '俊', '杰', '骏', '博', '翰', '祺', '凯', '彬', '宸', '炎', '峻', '颜', '嘉', '胤', '奕', '朗', '锦', '成', '豪', '竣',
	    '煊', '宏', '毅', '烨', '哲', '钧', '维', '懿', '航', '彦', '钊', '瑞', '越', '昕', '翔', '运', '霖', '琪', '睿', '擎',
	    '宣', '崇', '义', '康', '宪', '颂', '琛', '志', '乾', '皆', '瀛', '炫', '榕', '运', '熠', '宸', '涵', '艺', '承', '丰',
	    '翰', '天', '谦', '楷', '伦', '睿', '熙', '风', '靖', '俨', '咏', '鸿', '润', '舒', '萧', '雅', '荣', '炳', '岳', '鑫'
	  ];
	  
	  const lastNames = familyNames.concat(compoundSurnames);
	  
	  const getRandomChar = (chars) => {
	    const randomIndex = Math.floor(Math.random() * chars.length);
	    return chars[randomIndex];
	  };
	  
	  const getIndex = () => Math.floor(Math.random() * 2)
	  
	  const getName = () => {
	  	  const genderNames = getIndex() === 1 ? elegantMaleNames : elegantFemaleNames
	  	  const fisrtName = getRandomChar(genderNames)
	  	  const lastName = getRandomChar(lastNames)
	  	  return lastName + fisrtName
	  }
	  return getName();
  } catch(e) {
	  return ''
  }
}


export function generateUser(nickName) {
	return {
		nickName,
		avatarUrl: '../../static/avatar.png',
		gender: 0,
	}
}

// 获取客户端用户信息
export const getLocalUser = () => {
	try {
		return uni.getStorageSync('userInfo') || null;
	} catch (e) {
		// error
		return null;
	}
}

// 获取创建者
export const getCreator = (clientId, nickName = '') => {
	return clientId
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

export function setNickName(cb = null){
	const defaultName = generateRandomName()
	uni.showModal({
		title: '设置游戏昵称',
		editable: true,
		content: defaultName,
		placeholderText: '游戏昵称（30字以内）',
		showCancel: false,
		success: (res) => {
			console.log('res', res)
			if (res.confirm) {
				console.log('res.content', res.content)
				const nickname = (res.content || '').trim()
				if (!nickname.length || nickname.length > 30) {
					return uni.showToast({
						title: '设置失败',
						icon: 'error',
					})
				}
				const user = generateUser(nickname);
				uni.setStorageSync('userInfo', user);
				uni.showToast({
					'title': '设置成功'
				})
				cb && cb(user);
			}
		}
	})
}