<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>在线用户</span>
      </div>
      <el-table :data="tableData">
        <el-table-column type="index" align="center" label="#" width="100px"/>
        <el-table-column label="用户名" property="userName"/>
        <el-table-column label="邮箱" property="userMail"/>
        <el-table-column label="手机" property="userPhone"/>
        <el-table-column fixed="right" label="操作" width="240">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-view" size="small">查看</el-button>
            <el-button type="text" icon="el-icon-edit" size="small">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'Online',
    data() {
      return {
        tableData: []
      }
    },
    created() {
      this.$store.dispatch('GetOnlineUser').then(response => {
        this.tableData = response.data
      })
    },
    methods: {}
  }
</script>

<style scoped>

</style>
