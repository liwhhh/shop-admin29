<template>
 <div class="page-container">
    <el-container>
      <el-aside width="auto">
        <!-- 侧边栏组件 -->
          <Aside :collapse="isCollapse"/>

      </el-aside>
      <el-container>

        <el-header>
          <!-- 头部组件 -->
          <Header @updataCollapse="updataCollapse"/>

        </el-header>
        <el-main>
          <!-- 展示子页面 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
 </div>
</template>

<script>
// 导入组件
import Aside from '../components/Aside.vue';
import Header from '../components/Header.vue';
export default {
   data(){
      return {
        // 侧边栏展开
         isCollapse:false
      }
   },
    //  方法
    methods:{
      // 修改左侧栏的展开收缩 function
       updataCollapse(){
         this.isCollapse=!this.isCollapse;
       }
    },
   //  组成部分
    components:{
      Aside,
      Header, 
    } 
}
</script>

<style>
  .el-header{
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    
  }
  .el-main{
    background-color:#E9EEF3;
  }
  /* 首页布局的高度需要修改为100% */
  .page-container > .el-container {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
