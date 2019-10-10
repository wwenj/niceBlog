<template>
  <div class="home">
    <input class="upload" type="file" id="file" accept="image/*" multiple @change="upLoad(this)" />
    <!-- <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog> -->
  </div>
</template>
<script>
import OSS from 'ali-oss'
// import { getFlowList } from '../../../../account'
const account = require('utils/account')
export default {
  name: 'Test',
  data () {
    return {
      client: null, // oss对象
      dialogImageUrl: '',
      dialogVisible: false,
      file: null, // 上传文件
      imgList: [] // 上传的图片列表
    }
  },
  mounted () {
    this.initOss()
    console.log(account)
    // this.putBlob()
  },
  methods: {
    initOss () {
      this.client = new OSS({
        ...account.alyOss
      })
    },
    async putBlob () {
      try {
        let result = await this.client.put(
          'niceBlog/wangwenjain.jpg',
          new Blob(this.file)
        )
        // let url = this.client.signatureUrl('niceBlog/wangwenjain.jpg')
        // let url = this.client.list()
        // let url = await this.client.list({ marker: 'niceBlog' })
        let url = await this.client.list({ prefix: 'niceBlog/' })
        // let result = await client.delete('niceBlog/wangwenjain.jpg');
        // 批量删除，quiet返回结果
        // let result = await client.deleteMulti(["obj-1", "obj-2", "obj-3"], {
        //   quiet: true
        // });
        // let url = await this.client.list()
        console.log('url---')
        console.log(url)
        this.imgList.push(result)
        this.$message({
          message: '上传成功',
          type: 'success'
        })
      } catch (e) {
        console.log('上传出错-------')
        this.$message.error(`上传出错：${e}`)
        console.log(e)
      }
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    upLoad (item) {
      this.file = document.getElementById('file').files
      console.log(this.file)
      this.putBlob()
    }
  }
}
</script>
<style lang="scss" scope>
.upload {
  background: red;
}
</style>
