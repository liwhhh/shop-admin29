import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);//注册插件

const store = new Vuex.Store({
  // 保存的数据,相当于组件中的data
  state: {
    user: {
      username: localStorage.getItem("username") || "",
      realname: localStorage.getItem("realname") || "",
    }
  },
  //修改state的值,属性的是函数
  mutations: {
    // increment (state) {
    //   state.count++
    // }
    //函数中有一个参数就是state(也就是data)
    // 第二个参数就是传递过来的参数
    setUser(state, user) {
      state.user = user;
    }
  },
  // 处理异步数据,用法跟mutation是一样的
  // actions:{},
})

export default store;