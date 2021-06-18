<template>
  <div class="wrapper" >
    <el-card v-for="(item,index) in list" :key="index">
      <div class="img-box" v-if="item.mimeType.includes('image')">
        <el-image
            @load="(e)=>imgLoad(e,index)"
            lazy
            :src="`${baseImg}${item.key}`"
            :preview-src-list="[`${baseImg}${item.key}`]"
            fit="scale-down">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        <div class="footer">
          {{getName(item.key)}}
        </div>
        <div class="footer">
          宽：{{item.naturalWidth}} 高:{{item.naturalHeight}}
        </div>
        <el-button type="text" @click="copyUrl(baseImg+item.key)">复制图片地址</el-button>
      </div>
      <div class="folder" v-else @click="jumpFolder(item.key)">
        文件夹：{{getName(item.key)}}
      </div>
    </el-card>
  </div>
</template>

<script>
import {FetchStaticList} from '@/util/request/api'
import { clipboard } from 'electron'
export default {
  name: 'index',
  data () {
    return {
      bucketName: '',
      key: '',
      list: [],
      baseImg: 'https://file.40017.cn/wisdomtravel/'
    }
  },
  methods: {
    copyUrl (str) {
      clipboard.writeText(str, 'selection')
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    },
    imgLoad (e, index) {
      this.$set(this.list[index], 'naturalWidth', e.path[0].naturalWidth)
      this.$set(this.list[index], 'naturalHeight', e.path[0].naturalHeight)
    },
    async getList () {
      const res = await FetchStaticList({
        bucket_name: this.bucketName,
        key: this.key,
        limit: 10000
      })
      this.list = res.data.result || []
      console.log(res)
    },
    getName (url) {
      const list = url.split('/').filter(_ => _)
      return list.slice(-1)[0]
    },
    jumpFolder (key) {
      this.$router.push({
        path: '/index',
        query: {
          bucketName: this.bucketName,
          key: '/' + key
        }
      })
    }
  },
  watch: {
    $route () {
      console.log(this.$route.query)
      this.bucketName = this.$route.query.bucketName || ''
      this.key = this.$route.query.key || ''
      this.list = []
      this.getList()
    }
  },
  created () {
    console.log(this.$router)
  }
}
</script>
<style>
.el-card__body {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
}
</style>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.el-card {
  width: 200px;
  height: 291px;
  box-sizing: border-box;
  margin-top: 5px;
  display: flex;
  background-color: blanchedalmond;
  .folder {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-image {
    height: 160px;
    width: 160px;
    margin-bottom: 10px;
  }
}

</style>
