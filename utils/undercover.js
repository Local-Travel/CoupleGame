// 角色阵营
export const RoleType = {
	'independency': 'independency',
	'undercover': 'undercover',
	'good': 'good',
}

// 角色
export const roleList = [
	{ code: 'god', name: '法官', word: '', type: RoleType.independency, roleCount: 0, url: '' },
	{ code: 'civilian', name: '平民', word: '', type: RoleType.good, roleCount: 0, url: '../../static/avatar-civilian.png' },
	{ code: 'undercover', name: '卧底', word: '', type: RoleType.undercover, roleCount: 0, url: '../../static/avatar-undercover.png' },
]

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
			["金鱼","鲤鱼"],
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
			["网球", "乒乓球", "高尔夫球", "羽毛球"],
			["笑容", "微笑", "欢笑", "笑脸"],
			["狼", "狗", "狐狸"],
			["哈士奇", "阿拉斯加", "萨摩耶"],
			["狮子", "老虎", "雪豹", "豹子"],
			["玫瑰", "百合", "茉莉", "牡丹", "薰衣草"],
			["郁金香", "康乃馨", "向日葵"],
			["张学友", "刘德华", "黎明", "陈奕迅", "周华健"],
			["周杰伦", "王力宏"],
			["李宇春", "邓紫棋"],
			["毛阿敏", "林忆莲", "蔡依林"],
			["周润发", "张国荣", "刘德华", "梁朝伟", "黄晓明"],
			["巩俐", "张曼玉", "章子怡", "范冰冰"],
			["李连杰", "甄子丹", "吴京", "洪金宝", "成龙"],
			["波斯猫", "布偶猫", "英短猫", "暹罗猫", "缅因猫", "孟买猫", "埃及猫", "美短猫"],
			["篮球鞋", "足球鞋", "网球鞋"],
			["跑步鞋", "训练鞋", "户外鞋", "运动鞋", "田径鞋"],
			["流行音乐","电子音乐", "古典音乐", "乡村音乐"],
			["摇滚", "爵士乐"],
			["风景摄影", "人像摄影", "街头摄影", "宠物摄影", "婚礼摄影", "体育摄影", "纪实摄影", "时尚摄影"],
			["王者荣耀", "和平精英"],
			["瑜伽", "游泳", "舞蹈"],
			["跳伞", "高空飞行", "蹦极跳", "摩托越野", "跳伞滑翔"],
			["胖子", "肥肉"],
			["纸币", "硬币"],
			["核桃", "板栗"],
			["优酷", "土豆"],
			["警察局", "派出所"],
			["蝙蝠侠", "闪电侠", "钢铁侠"],
			["包装盒", "包装袋"],
			["作业本", "笔记本"],
			["管家", "女仆"],
			["米国", "美国", "美丽国"],
			["拉面", "炒面", "拌面"],
			["林青霞", "张曼玉"],
			["医院", "诊所"],
			["大学", "高中", "中学"],
			["补牙", "洗牙"],
			["大熊猫", "小熊猫"],
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
