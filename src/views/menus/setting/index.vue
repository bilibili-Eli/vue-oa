<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>目录列表</span>
      </div>
      <el-row :gutter="30">
        <el-col :span="4">
          <el-input v-model="searchText" placeholder="输入关键字进行过滤"/>
          <el-tree ref="menusTree" :expand-on-click-node="false" :filter-node-method="filterNode" :data="treeData"
                   :props="defaultProps"
                   class="menus-tree" default-expand-all empty-text="暂无数据"/>
        </el-col>
        <el-col :span="20">
          <el-card shadow="never">
            <el-table :data="tableData" empty-text="暂无数据">
              <el-table-column type="index" align="center" label="#" width="100px"/>
              <el-table-column label="目录" property="menusName"/>
              <el-table-column label="描述" property="remarks"/>
              <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                  <el-button type="text" icon="el-icon-view" size="small">查看</el-button>
                  <el-button type="text" icon="el-icon-edit" size="small">编辑</el-button>
                  <el-button type="text" icon="el-icon-delete" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'MenusSetting',
    data() {
      return {
        searchText: '',
        tableData: [],
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'title'
        }
      }
    },
    watch: {
      searchText(val) {
        this.$refs.menusTree.filter(val)
      }
    },
    created() {
      this.tableData = [
        {
          menusName: '首页',
          remarks: '这是首页'
        },
        {
          menusName: '权限设置',
          remarks: '这是权限设置'
        },
        {
          menusName: '目录配置',
          remarks: '这是目录设置'
        }
      ]
      // 获取全部目录列表
      this.$store.dispatch('selectMenus', {}).then(response => {
        this.treeData = response.data
      })
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true
        return data.title.indexOf(value) !== -1
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .menus-tree {
    margin-top: 10px;
  }
</style>
