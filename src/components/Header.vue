<template>
<!-- align="middle" 垂直对齐   -->
  <el-row type="flex" justify="space-between" align="middle">
     <i class="el-icon-back" @click="handleClick"></i>
     <div class="user-info">
       {{username}} {{realname}} <span>退出</span>
     </div>
  </el-row>
</template>

<script>
export default {
  data(){
    return{
      username:"",
      realname:""
    }
  },
    methods:{
      //触发传递过来的左侧展开收缩事件
      handleClick(){
        //updataCollapse  e mi t
        this.$emit("updataCollapse")
      }
    },
    // 组件加载完成之后拿
    mounted(){
      // 从本地获取到用户的信息
        this.username=localStorage.getItem("username")
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
