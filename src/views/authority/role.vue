<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>角色列表</span>
      </div>
      <el-table :data="tableData">
        <el-table-column type="index" align="center" label="#" width="100px"/>
        <el-table-column label="角色名" property="roleName"/>
        <el-table-column label="描述" property="remarks"/>
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
    name: 'Role',
    data() {
      return {
        tableData: []
      }
    },
    created() {
      this.tableData = [
        {
          roleName: '管理员',
          remarks: '这是一个管理员用户，拥有所有权限'
        },
        {
          roleName: '普通用户',
          remarks: '这是一个普通用户，拥有部分权限'
        },
        {
          roleName: '游客',
          remarks: '这是一个游客，拥有一小部分权限'
        },
        {
          roleName: '会员',
          remarks: '这是一个会员用户，拥有一部分比普通用户多的权限'
        }
      ]
    },
    methods: {}
  }
</script>

<style scoped>

</style>
