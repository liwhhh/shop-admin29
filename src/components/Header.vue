<template>
<!-- align="middle" 垂直对齐   -->
  <el-row type="flex" justify="space-between" align="middle">
     <i class="el-icon-back" @click="handleClick"></i>
     <div class="user-info">
       {{uname}} {{realname}} 
       <span @click="handleLogout">退出</span>
     </div>
  </el-row>
</template>

<script>
export default {
  data(){
    return{
      uname:"",
      realname:""
    }
  },
    methods:{
      //触发传递过来的左侧展开收缩事件
      handleClick(){
        //updataCollapse  e mi t
        this.$emit("updataCollapse")
      },

      // 用户退出
      handleLogout(){
        this.$axios({
          url:"/admin/account/logout"
        }).then(res=>{
          const {status} =res.data;

          // if(!status){
            if(status=== 0){
            //跳转到登录页  (push不是最优的方案,因为有权限返回上一页)
            // replace也是处理跳转,直接换掉当前的页面
             this.$router.replace("/login");

            // 清除本地的数据 
            localStorage.removeItem("uname");
            localStorage.removeItem("realname");
          }//if
        })
      }//退出
    },
    // 组件加载完成之后拿
    mounted(){
      // 从本地获取到用户的信息
        this.uname=localStorage.getItem("uname")
        this.realname=localStorage.getItem("realname")
    }
}
</script>

<style>
.el-icon-back{
  cursor:pointer;
}
.user-info span{
  cursor:pointer;

}
</style>
