import Vue from 'vue';
import App from './App.vue';
//1.1引入axios
import axios from 'axios';
//2.1引入路由
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//3.element 全局注册组件
Vue.use(ElementUI);
//2.2 注册路由
Vue.use(VueRouter);

//1.导入组件
import Login from './pages/Login.vue';
import Admin from './pages/Admin.vue';

//2.3 路由的配置
const routes = [
  {path:"/",redirect:"/admin"},//重定向
  {path:"/login",component:Login},//登录页
  {path:"/admin",component:Admin},//首页
]
//2.4创建路由对象
const router=new VueRouter({routes})

// 是否是生成环境
Vue.config.productionTip = false
//1.2把axios绑定到vue实例的属性$axios
Vue.prototype.$axios=axios;
new Vue({
  //2.5 挂载路由
  router,
  render: h => h(App),
  
  // $mount作用相当于el,根实例挂载到节点
}).$mount('#app')
