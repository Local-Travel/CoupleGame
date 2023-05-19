// 角色阵营
export const RoleType = {
	'independency': 'independency',
	'undercover': 'undercover',
	'good': 'good',
}

// 角色
export const roleList = [
	{ code: 'god', name: '法官', word: '', type: RoleType.independency, roleCount: 0, url: 'https://mp-d2cdecc2-e625-449f-a46d-53232154177c.cdn.bspapp.com/cloudstorage/063c77d5-be35-4424-9097-5566ab3393d5.jpg' },
	{ code: 'civilian', name: '平民', word: '', type: RoleType.good, roleCount: 0, url: 'https://mp-d2cdecc2-e625-449f-a46d-53232154177c.cdn.bspapp.com/cloudstorage/8debd655-039b-4eb5-a42c-5ec704788094.jpg', showUrl: 'https://mp-d2cdecc2-e625-449f-a46d-53232154177c.cdn.bspapp.com/cloudstorage/b671ecdb-2197-4219-94a3-a1eecc979c56.jpeg' },
	{ code: 'undercover', name: '卧底', word: '', type: RoleType.undercover, roleCount: 0, url: 'https://mp-d2cdecc2-e625-449f-a46d-53232154177c.cdn.bspapp.com/cloudstorage/740d9010-35f2-4d83-b6fe-2562c170d7dd.jpg', showUrl: 'https://mp-d2cdecc2-e625-449f-a46d-53232154177c.cdn.bspapp.com/cloudstorage/b671ecdb-2197-4219-94a3-a1eecc979c56.jpeg' },
]

// 各角色的介绍
export const roleDescMap = {
	'god': ['法官', '主持流程。天黑请闭眼，狼人请睁眼，请狼人击杀目标，狼人请确认目标，狼人确认请闭眼。预言家请睁眼，请选择你要看哪一个玩家的身份，好人是这个（拇指朝上），坏人是这个（拇指朝下），ta是这个（拇指朝上或朝下），预言家确认请闭眼。女巫请睁眼，女巫你有一瓶解药，你是否需要使用？你有一瓶毒药是否需要使用？女巫确认请闭眼。猎人请睁眼，猎人请闭眼。天亮了请睁眼，昨夜死亡的玩家是（xx），昨夜是平安夜，无人死亡。'],
	'civilian': ['平民', '你没有技能，白天可以投票，你应该在白天听取他人发言认真分析，找出狼人将他们投票出局，赢得胜利。'],
	'undercover': ['卧底', '你夜晚的时候可以发动猎杀技能，可以猎杀任何人（包括你自己），你应该想方设法淘汰掉所有平民，亦或者淘汰所有好人神职人员，就可以赢得胜利。向月亮仰天狂啸吧，我的狼人们，呜呜呜~'],
}

export const defaultRules = [
	'角色分配：确定游戏参与人数和角色分配，一般来说，至少需要四个人以上。其中一人成为游戏主持人，其他人分为平民和卧底。卧底人数应比平民人数少',
	`准备词语：游戏主持人准备一组词语，其中一个词语是卧底不知道的词语，其他参与者都知道。分发词语牌。每位参与者随机选择一张词语牌，但不要让其他人看到自己的词语`,
	`讨论和猜测：游戏开始后，参与者轮流发言，提供有关自己词语的提示和线索。每个人都要注意其他人的发言和行为，试图推测出谁是卧底。`,
	`投票：在一定的讨论时间后，所有参与者进行投票，选择他们认为是卧底的人。`,
	`判定胜负：如果是卧底被淘汰，平民方获胜；如果是平民被淘汰，卧底方获胜`,
]

// 获取初始化角色数据
export const getInitRoleList = (count) => {
	const num = count > 1 ? Number(count) : 4
	let obj = {};
	if (num < 7) {
		obj.undercover = 1
		obj.civilian = num - 1
	} else if (num < 12) {
		obj.undercover = 2
		obj.civilian = num - 2
	} else {
		obj.undercover = 3
		obj.civilian = num - 3
	}
	const list = roleList.slice(1)
	list.forEach((item) => {
		item.roleCount = obj[item.code] || 0
	});
	return list;
}


// 随机生成词组
export function generateRandomWord() {
  try {
	  const wordGroups = [
	    ["苹果", "橙子", "香蕉", "梨子", "草莓"],
	    ["狗", "猫"],
		["金鱼",
		  "鲤鱼",
		],
		[
		  "鲨鱼",
		  "鲈鱼",
		  "三文鱼",
		  "鳄鱼",
		  "黑鱼",
		],
	    ["手机", "电脑", "平板", "相机"],
	    ["太阳", "月亮", "火星", "星星"],
		 ["木星", "土星", "水星"],
	    ["红色", "蓝色", "绿色", "黄色", "紫色"],
	    ["学校", "教室"],
		["球场", "操场"],
		["图书馆","实验室"],
		["音乐", "绘画", "舞蹈", "拍照", "摄影"],
	    ["舞台剧", "话剧", "音乐剧", "戏剧", "歌剧"],
	    ["甜美", "温柔", "娇柔", "柔情", "柔软"],
	    ["排球", "足球", "篮球"],
	    ["笑容", "微笑", "欢笑", "笑脸"],
	    ["狼", "狗", "狐狸"],
		["哈士奇", "阿拉斯加", "萨摩耶"],
		["狮子", "老虎", "雪豹", "豹子"],
	  ]
	  
	  	  
	  const getRandomChar = (chars) => {
	    const randomIndex = Math.floor(Math.random() * chars.length);
	    return chars[randomIndex];
	  };
	  
	  const getIndex = (arr) => Math.floor(Math.random() * arr.length)
	  
	  const getWords = () => {
		  const index = getIndex(wordGroups)
		  const list = wordGroups[index]
		  const fisrtWord = getRandomChar(list)
		  const lastWord = getRandomChar(list)
		  return { fisrtWord, lastWord }
	  }
	  
	  const getName = () => {
		  let obj = getWords()
		  while(obj.fisrtWord === obj.lastWord) {
			  obj = getWords()
		  }
	  	  return obj
	  }
	  return getName();
  } catch(e) {
	  return {}
  }
}
