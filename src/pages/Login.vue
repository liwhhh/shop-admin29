<template>
<el-row type="flex" justify="center" class="container">
  <!-- model表示整个表单的数据绑定到data哪个属性 -->
  <!-- 1.rules 表单认证规则 -->
  <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="form">
    <div class="title">登录</div>
    <!-- 2.prop 指定规则查找 -->
    <el-form-item label="账号" prop="uname">
      <el-input v-model="form.uname"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="upwd" >
      <el-input v-model="form.upwd" type="password"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</el-row>
</template>
<script>
  export default {
    data() {
      return {
        form: {
         uname:"admin",
         upwd:"123456"
        },
        //表单验证规则
        rules:{
          //多条规则,不同的状态下触发
            // required 是否必填
            // message 报错提示文字
            // trigger 什么时候触发  blur失去焦点
          uname:[
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          upwd:[
           { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        }
      }
    },
    methods: {
      //登录提交
      onSubmit() {
           // 找到表单元素,调用表单的验证
     this.$refs.form.validate(valid => {
      //  当验证不通过的时候,直接返回
        if(!valid) return;
        //获取参数
        // 发起请求
        this.$axios({
          url:"/admin/account/login",
          method:"POST",
          data:this.form,
          //处理跨域请求的参数
          withCredentials:true,
        }).then(res => {
          //解构出来
          const {status,message}=res.data;
          // console.log(res.data.message)
        //判断是否登录成功
        if(status== 0){
          // 把用户的信息保存到本地
          localStorage.setItem("username",message.uname)
          localStorage.setItem("realname",message.realname)

          // 保存到vuex的store
          // 调用store栏目的mutations的方法
          // 调用setUser时候第二个参数用来传参数
          this.$store.commit("setUser",{
            username:message.uname,
            realname:message.realname
            });

          // 跳转到首页
          this.$router.push("/admin");
        }else{
           this.$message({//提示错误
            message: message,
            type: 'error'
            });
         }
        })//axios
     })//refs
      }//onSubmit提交
    }
  }
</script>
<style scoped lang="less">
.title{
  text-align: center;
  margin-bottom:20px;
}
.form{
  width: 350px;
  margin-top: 10%;
}

</style>