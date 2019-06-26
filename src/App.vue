<template>
  <div id="app">

    <el-button type="primary" disabled>主要按钮</el-button>
   
     <el-alert
    title="错误提示的文案"
    type="error"
    effect="dark">
  </el-alert>
  </div>
</template>

<script>
// // 导入第三方的包
// import axios from 'axios';

export default {
  name: 'app',
  
  mounted(){
    //axios会返回promise对象,对象下面then这个方法  https://api.github.com/users
  this.$axios({
      url:"https://api.github.com/users",
      method:"GET",
      params:{},
    }).then(res => {
     alert(res)
    })
  }

}
</script>

<style>
</style>
