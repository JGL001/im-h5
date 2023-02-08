import Vue, { createApp } from 'vue'
import { initRoutes } from './router/index';
// import './style.css'
import App from './App.vue'
import 'vant/es/toast/style';
// import 'vant/es/dialog/style';
// import 'vant/es/notify/style';
// import 'vant/es/image-preview/style';
import SocketService from './utils/websocket';

const app = createApp(App);

// 注册路由
initRoutes(app)

// 将websocket实例绑定到vue实例原型方法上
app.config.globalProperties.$socket = SocketService.Instance;

// 挂载dom节点
app.mount('#app')
