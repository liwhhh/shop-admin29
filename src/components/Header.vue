<template>
<!-- align="middle" 垂直对齐   -->
  <el-row type="flex" justify="space-between" align="middle">
     <i class="el-icon-back" @click="handleClick"></i>
     <div class="user-info">
       admin 超级管理员 <span>退出</span>
     </div>
  </el-row>
</template>

<script>
export default {
    methods:{
      //触发传递过来的左侧展开收缩事件
      handleClick(){
        //updataCollapse  e mi t
        this.$emit("updataCollapse")
      }
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
