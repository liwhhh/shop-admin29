<template>
<!-- default-active	当前激活菜单的 index
      open	展开指定的 sub-menu   -->
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      background-color="#001529"
      text-color="#fff"
      active-text-color="#ffd04b">
       <!-- 加一个唯一的key   动态生成的所以有 :  -->
      <el-submenu v-for="(item,index) in menus" :key="index" :index="`${index+1}`">
       <!-- 自定义模块 -->
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
          <!-- 渲染子页面的数据 -->
          <el-menu-item v-for="(subItem,subIndex) in item.children" 
          :key="subIndex"  
          :index="`${index+1}-${subIndex+1}`">
            <router-link :to="subItem.src">{{subItem.name}}</router-link>
          </el-menu-item>
          
      </el-submenu>
      
    </el-menu>
</template>

<script>
  export default {
    data(){
     return{
       menus:[
         {
           icon:"el-icon-menu",
           name:"购物商城",
           children:[
             {name:"商品管理",src:"/admin/goods-list"},
             {name:"栏目管理",src:"/admin/category-list"}
           ]
         },
         {
           icon:"el-icon-service",
           name:"会员管理",
           children:[
             {name:"会员列表",src:"/admin/account-list"},
           ]
         },
         {
           icon:"el-icon-present",
           name:"商城订单",
           children:[
             {name:"订单管理",src:"/admin/order-list"},
           ]
         }
       ]
     }
    },
    methods: {
    
    }
  }
</script>
<style>
  .el-menu{
     border-right: none;
    }
.el-menu-vertical-demo{
     height: 100%;
}
.el-menu-vertical-demo  a{
     color: inherit;
     text-decoration: none;
    }

</style>