<template>
    <div>
     <!-- 列表顶部 -->
     <el-row type="flex" justify="space-between" align="middle">
      <el-col>
         <el-button>新增</el-button>
         <el-button @click="handleMoreDelete">删除</el-button>
      </el-col>
        <div  style="margin-top: 15px;">
          <el-input placeholder="请输入内容"  class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
     </el-row>
   <!-- 商品列表 -->
   <!-- data:data,name,address是一个数组,表格的数据 -->
     <el-table
    :data="tableData"
    style="width: 100%"
       @selection-change="handleSelectionChange">

    <!-- 允许多选 -->
     <el-table-column
      type="selection"
      width="55">
    </el-table-column>

    <el-table-column
      label="标题"
      width="250">
        <template slot-scope="scope">
           <el-row type="flex" align="middle">
             <img :src="scope.row.imgurl" alt="" class="goodsImg">
             <p>{{scope.row.title}}</p>
           </el-row>
        </template>
    </el-table-column> 

    <el-table-column
      prop="categoryname"
      label="类型"
      width="160">

    </el-table-column>
    <el-table-column
      prop="sell_price"
      label="价格"
      width="80">
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
   </div>
</template>
<script>
export default {
      data() {
      return {
        tableData: [],
        ids:[]
      }
    },
    // 方法
    methods: {
      getList(){
          // 请求商品的列表数据
          this.$axios({
            url:"/admin/goods/getlist?pageIndex=1&pageSize=7&searchvalue=",
          }).then(res=>{
          const {message}=res.data;
          this.tableData=message;
          })
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      // 单个删除
      handleDelete(row) {
        //获取到id
       const id=row.id;
      //  询问是否删除
         this.$confirm('是否删除').then(() => {
            // 确定按钮触发
             //  调用删除接口
              this.$axios({
                url:`/admin/goods/del/${id}`,
                  //处理跨域请求的参数
                  withCredentials:true
              }).then(res=>{
                const {status,message}=res.data;
                this.$message({
                  type:"success",
                  message
                });
                this.getList();//重新刷新数据
              })//axios
          })//confirm
          .catch(_ => {});
      },//handleDelete 单个删除
        // 👇多选择时候触发
       handleSelectionChange(val) {
         var ids=val.map(v=>{
           return v.id
         });
        //  提供给删除多个时候的接口数据
        this.ids=ids;
      },
      // 删除多个
      handleMoreDelete(){

        const id=this.ids.join(",");
          //  询问是否删除
         this.$confirm('是否删除').then(() => {
            // 确定按钮触发
             //  调用删除接口
              this.$axios({
                url:`/admin/goods/del/${id}`,
                  //处理跨域请求的参数
                  withCredentials:true
              }).then(res=>{
                const {status,message}=res.data;
                this.$message({
                  type:"success",
                  message
                });
                this.getList();//重新刷新数据
              })//axios
          })//confirm
      }

    },//methods


    // 加载完之后请求数据
    mounted(){
      this.getList()
    }
}
</script>

<style>
    .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .goodsImg{
    width: 64px;
    margin-right: 10px;
  }
</style>
