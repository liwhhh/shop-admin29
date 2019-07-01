<template>
  <div>
    <el-row type="flex" justify="space-between" align="middle" style="margin: 15px;">
      <el-col>
         <el-button>新增</el-button>
         <el-button>删除</el-button>
      </el-col>
    </el-row>
    <!-- 内容列表 -->
  
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <!-- scoped.row每一行的数据,一般是一个对象 -->
      <!-- data表示每一行的数据 -->
      <!-- node是每一行的节点,也可以访问到每一行数据 -->
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.title }}</span>
   
         <span>
           <input size="mini" class="input" :value="data.sort_id"/>
         </span>
        
          <el-button
            type="text"
            size="mini"
            >
            编辑
          </el-button>
      </span>
    </el-tree>
  </div>
</template>

<script>
  let id = 1000;

  export default {
    data() {
      // const data = [{
      //   id: 1,
      //   label: '一级 1',
      //   children: [{
      //     id: 4,
      //     label: '二级 1-1',
      //     children: [{
      //       id: 9,
      //       label: '三级 1-1-1'
      //     }, {
      //       id: 10,
      //       label: '三级 1-1-2'
      //     }]
      //   }]
      // }];
      return {
        data:[]
      }
    },
 // 方法
    methods: {
     
    },
    // 页面加载完之后
    mounted(){
      // 获取分类数据
      // 请求分类数据
      this.$axios({
        url:"/admin/category/getlist/goods"
      }).then(res => {
        const {message}=res.data;
        // this.data=message;
        // 使用递归的方式实现---------------
        let arr=[];
        // 递归函数,循环判断是否有子选项
        function loop(arr,item){
          // 循环当前数组
          arr.forEach(v =>{
            // 当子选项的parent_id和arr中某个栏目的category_id相等的话
            // 就认为是他的子选项
               if(v.category_id == item.parent_id){
                 if(!v.children){//是否有children
                   v.children=[];
                 }
                 v.children.push(item);
                //  {
                //    ...item,
                //    id:item.category_id,
                //    label:item.title
                //  }
                 return;
               }
               if(v.children){//如果有children
                   loop(v.children,item);
               }
          })
        }

        message.forEach(v => {
          // 是否是顶级
          if(v.parent_id === 0){
            // 如果是顶级栏目,直接把栏目添加到arr第一层
            arr.push(v)
          }else{
            // 如果不是顶级,交给递归函数去判断是哪一个栏目的子选项
            loop(arr,v);
          }
        })
        this.data=arr;
       //---------------------------------------
        
      })
    }
  };
</script>

<style lang="less" scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .input{
    width: 42px;
    height: 18px;
    line-height: 18px;

  }
</style>
