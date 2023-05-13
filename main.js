import App from './App'
import 'umtrack-wx';

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import wxShare from './utils/wxShare.js'
import uma from 'umtrack-wx';

uma.init({
	appKey: '645f6b2bba6a5259c4501790', //由友盟分配的APP_KEY
	useOpenid: true,// 是否使用openid进行统计，此项为false时将使用友盟+随机ID进行用户统计。使用openid来统计微信小程序的用户，会使统计的指标更为准确，对系统准确性要求高的应用推荐使用OpenID。
	// 如若需要，请到友盟后台"设置管理-应用信息"(https://mp.umeng.com/setting/appset)中设置appId及secret
	autoGetOpenid: true,// 是否需要通过友盟后台获取openid，如若需要，请到友盟后台设置appId及secret
	debug: false, //是否打开调试模式
	uploadUserInfo: false // 上传用户信息，上传后可以查看有头像的用户分享信息，同时在查看用户画像时，公域画像的准确性会提升。
})

uma.install = function (Vue) {
	Vue.prototype.$uma = uma;
}

Vue.use(uma)
Vue.config.productionTip = false
Vue.mixin(wxShare)
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif