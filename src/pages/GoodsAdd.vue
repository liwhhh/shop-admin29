<template>
    <el-form ref="form" :model="form" label-width="80px" style="margin-top:20px;">

        <el-form-item label="所属类别">
            <el-select v-model="form.category_id" placeholder="请选择活动区域">
                <el-option :label="item.title" :value="item.category_id" v-for="(item, index) in categorys" :key="index"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="是否发布">
            <el-switch v-model="form.status"></el-switch>
        </el-form-item>

        <el-form-item label="推荐类型">
            <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
            <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
        </el-form-item>

        <el-form-item label="内容标题">
            <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="副标题">
            <el-input v-model="form.sub_title"></el-input>
        </el-form-item>

        <!-- 封面图片，这个组件不支持v-model，因为不是表单组件
        需要组件的事件里面赋值，赋给form.imgList -->
        <el-form-item label="封面图片">

            <!-- action：上传图片的地址
                show-file-list: 是否展示文件列表
                on-success：上传成功之后的函数，有3个参数
                before-upload：上传之前的判断
             -->
            <el-upload
            class="avatar-uploader"
            action="http://localhost:8899/admin/article/uploadimg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <!-- 预览图片 -->
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>

        <el-form-item label="商品货号">
            <el-input v-model="form.goods_no"></el-input>
        </el-form-item>

        <el-form-item label="库存数量">
            <el-input v-model="form.stock_quantity"></el-input>
        </el-form-item>

        <el-form-item label="市场价格">
            <el-input v-model="form.market_price"></el-input>
        </el-form-item>

        <el-form-item label="销售价格">
            <el-input v-model="form.sell_price"></el-input>
        </el-form-item>

         <!-- 封面图片，这个组件不支持v-model，因为不是表单组件
        需要组件的事件里面赋值，赋给form.fileList -->
        <el-form-item label="图片相册">
            <div>

                <!-- list-type 声明为列表类型 -->
                <!-- on-preview: 预览图片 -->
                <!-- on-remove：删除图片 -->
                <el-upload
                action="http://localhost:8899/admin/article/uploadimg"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handePicSuccess">
                <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
        </el-form-item>
        
        <el-form-item label="内容摘要">
            <el-input type="textarea" v-model="form.zhaiyao"></el-input>
        </el-form-item>


        <el-form-item label="内容描述">
            <quillEditor v-model="form.content"></quillEditor>
        </el-form-item>
        

        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
// 导入富文本编辑器的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor';//导入组件
// const {quillEditor}=abc;
  export default {
    data() {
      return {
        form: {
           category_id: "",
            status: false,
            is_top: false,
            is_hot: false,
            title: "",
            sub_title: "",
            imgList: [],
            goods_no: "",
            stock_quantity: "",
            market_price: "",
            sell_price:"",
            fileList: [],
            zhaiyao: "",
            content: "",
            // 表单中没有的，只需要给一个默认值
            is_slide: false,
        },
        categorys: [],
        // 封面图片
        imageUrl: "",
        // 图片相册
        dialogImageUrl: "",
        dialogVisible: false
        // disabled: false
      }
    },
      // 注册组件
    components: {
      quillEditor
    },
  
    // 页面加载完就执行
    mounted() {
      this.$axios({
        url: "/admin/category/getlist/goods"
      }).then(res => {
        // message是分类数据
        const { message } = res.data;
        this.categorys = message;
      });
    },
    // 方法
    methods: {
      onSubmit() {
        // console.log(this.form)
        this.$axios({
          url:"/admin/goods/add/goods",
          method:"POST",
          data:this.form,
          //处理跨域请求的参数
           withCredentials:true
        }).then(res => {
        //  console.log(res)
        // 成功提示 
        const {status,message}=res.data
        if(status === 0){
          this.$message({
            message,
            type:"success"
          })
          // 返回上一页
          this.$router.back();
        }

        })
      },
      // 图片上传成功之后的回调
      handleAvatarSuccess(res, file) {
        //封面图片
        this.imageUrl = URL.createObjectURL(file.raw); // 图片预览
         // 成功之后赋值给form.imgList
        this.form.imgList = [res];
      },
      beforeAvatarUpload(file) {
        //封面图片 上传之前判断
        // const isJPG = file.type === "image/jpeg";
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isLt2M;
      },
      //图片相册 删除 file已被删除的 
      // fileList:保留的图片,response属性中
      handleRemove(file, fileList) {
        // console.log(file, fileList);
        this.form.fileList= fileList.map(v => {
             return v.response
        })
      },
      handePicSuccess(res,file,fileList){ //图片相册上传成功
      //  console.log(res,file,fileList)
      // 只要fileList每一条数据的response
      this.form.fileList=fileList.map(v => {
           return v.response
      })
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    }
  };
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>