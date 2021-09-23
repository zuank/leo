<template>
  <div class="warp">
    <el-form label-width="100px" label-position="left">
      <el-form-item label="user-token">
        <el-input v-model="userToken"></el-input>
      </el-form-item>
      <el-form-item label="asset-key">
        <el-input v-model="assetKey"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {getUserToken, setUserToken} from '@/util/index'
export default {
  data () {
    return {
      userToken: '',
      assetKey: ''
    }
  },
  created () {
    const info = getUserToken()
    this.userToken = info.userToken
    this.assetKey = info.assetKey
  },
  methods: {
    /**
     * 修改本地用户token
     */
    submit () {
      this.$confirm('确认修改?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setUserToken(this.userToken, this.assetKey)
        location.reload()
      }).catch(() => {
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.warp {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  .el-form {
    width: 400px;
  }
}
</style>
