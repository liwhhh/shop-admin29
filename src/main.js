import Vue from 'vue'
import App from './App.vue'

// 1.element -引入
import ElementUI from 'element-ui';
// 2.element-ui样式
import 'element-ui/lib/theme-chalk/index.css';


//3.element 全局注册组件
Vue.use(ElementUI);

// 是否是生成环境
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  
  // $mount作用相当于el,根实例挂载到节点
}).$mount('#app')
