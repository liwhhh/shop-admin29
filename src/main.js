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
import GoodsList from './pages/GoodsList.vue';
import GoodsAdd from './pages/GoodsAdd.vue';
import GoodsEdit from './pages/GoodsEdit.vue';
import CategoryList from './pages/CategoryList.vue';

// 最后 导入vuexd store
import store from './store/index.js';
//2.3 路由的配置
const routes = [
  { path: "/", redirect: "/admin" },//重定向
  { path: "/login", component: Login, meta: "登录" },//登录页
  //首页
  {
    path: "/admin", component: Admin, meta: "管理后台", children: [
      { path: "goods-list", component: GoodsList, meta: "商品列表", },
      { path: "goods-add", component: GoodsAdd, meta: "新增商品", },
      { path: "goods-edit/:id", component: GoodsEdit, meta: "编辑商品", },
      { path: "category-list", component: CategoryList, meta: "栏目管理", }
    ]
  },
]
//2.4创建路由对象
const router = new VueRouter({ routes })

// 拦截路由的请求,先判断用户是否是登录
// beforeEach中的函数在每个页面组件加载之前执行
// to:要去的页面的路由对象  from:来自哪个页面的路由对象
// next:是否下一步,next如果不执行页面不会加载
router.beforeEach((to, from, next) => {

  if (to.path === "/login") {//如果是登录页
    // 实现如果访问的是登录页并且是登录的状态,就跳转到首页
    return next();
  }

  // 没有登录
  if (!localStorage.getItem("username")) {
    // 跳转到登录页
    next("/login");
  } else {
    next();
  }

})

// 是否是生成环境
Vue.config.productionTip = false
//1.2把axios绑定到vue实例的属性$axios
Vue.prototype.$axios = axios;

axios.defaults.baseURL = 'http://localhost:8899';

new Vue({
  // 把store绑定到根实例
  store,
  //2.5 挂载路由
  router,
  render: h => h(App),

  // $mount作用相当于el,根实例挂载到节点
}).$mount('#app')
