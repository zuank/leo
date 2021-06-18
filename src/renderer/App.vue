<template>
  <el-container style="border: 1px solid #eee" id="app">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu>
        <el-submenu :index="index+'_'" v-for="(item,index) in bucketList" :key="index">
          <template slot="title"><i class="el-icon-picture-outline"></i>{{ item.bucket_name }}</template>
          <el-menu-item @click="selectMenu(item.bucket_name,_item)" :index="`${index}-${_index}`" v-for="(_item,_index) in getMenuList(item.path_menus)" :key="_index+'_'">
            {{ _item }}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<!--<router-view></router-view>-->
<script>
import {FetchBucketList} from '@/util/request/api'
export default {
  name: 'leo',
  data () {
    return {
      bucketList: []
    }
  },
  methods: {
    getMenuList (pathMenus) {
      const keys = Object.keys(pathMenus)
      return pathMenus[keys[0]]
    },
    selectMenu (bucketName, key) {
      this.$router.push({
        path: '/index',
        query: {
          bucketName,
          key
        }
      })
    }
  },
  async created () {
    const res = await FetchBucketList()
    this.bucketList = res.data.result || []
    console.log(res)
  }
}
</script>

<style lang="scss">
/* CSS */
body,html {
  height: 100%;
  width: 100%;
  margin: 0;
}
.el-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
