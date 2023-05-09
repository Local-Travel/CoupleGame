export default {
    data() {
        return {
            share: {
                // 转发的标题 （默认标题）
                title: '探本狼人',
                // 默认是当前页面，必须是以‘/’开头的完整路径
                path: '',
				// 入参
				query: '',
                //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，
                //支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
                // imageUrl: ''
				content:'我正在玩探本狼人局，赶紧跟我一起来体验吧！',
				success(res){
					uni.showToast({
						title:'分享成功'
					});
				},
				fail(res){
					uni.showToast({
						title:'分享失败',
						icon:'none'
					});
				}
            }
        }
    },
    /*
     在要分享的页面 生命周期中  设计当前页面分享标题
     onLoad() {
         this.share.title = "当前页面分享标题"
     },
     */
    // 发送给朋友
    onShareAppMessage(res) {
        // 来自页面内的按钮的转发
        if (res.from == 'button') {
            console.log("按钮转发--配置");
        }
        // 获取加载的页面
        const pages = getCurrentPages();
        // 获取当前页面的对象
        const view = pages[pages.length - 1];
		const { query } = this.share;
        //转发参数
        return {
			...this.share,
			path: query ? `/${view.route}?${query}` : `/${view.route}`,
		};
    },
    //分享到朋友圈
    onShareTimeline(res) {
        // 获取加载的页面
        const pages = getCurrentPages();
        // 获取当前页面的对象
        const view = pages[pages.length - 1];
        // console.log("获取加载的页面", pages);
        console.log("当前页面的对象", view);
        const { query } = this.share;
        //转发参数
        return {
        	...this.share,
        	path: query ? `/${view.route}?${query}` : `/${view.route}`,
        };
    }
}