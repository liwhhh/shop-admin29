<template>
  <div id="app">
<router-view ></router-view>
  </div>
</template>

<script>
// // 导入第三方的包
// import axios from 'axios';

export default {
  name: 'app',
  // 生命周期用axios请求的
  mounted(){
    //axios会返回promise对象,对象下面then这个方法  https://api.github.com/users
  this.$axios({
      url:"https://api.github.com/users",
      method:"GET",
      params:{},//get请求参数   data:{}//post请求参数
    }).then(res => {
     
    })
  }

}
</script>

<style>
</style>
