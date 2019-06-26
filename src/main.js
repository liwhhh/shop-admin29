import Vue from 'vue'
import App from './App.vue'


// 是否是生成环境
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //1.  render: function(createElement) {
  //    return createElement(App)
  // }
  //2.  render: (createElement) => {
  //   return createElement(App)
  // }
  //3.  render: (h) => {
  //   return h(App)
  // }
  //4.  render: (h) => h(App)
  // $mount作用相当于el,根实例挂载到节点
}).$mount('#app')
