<template>
  <div class="app-container">
    <el-card v-loading="loading">
      <div slot="header" class="clearfix">
        <span>目录列表</span>
        <el-button style="float: right;" type="primary">+ 新建</el-button>
      </div>
      <el-row :gutter="30">
        <el-col v-loading="treeLoading" :span="4">
          <el-input v-model="searchText" placeholder="输入关键字进行过滤"/>
          <el-tree ref="menusTree" :expand-on-click-node="false" :filter-node-method="filterNode" :data="treeData"
                   :props="defaultProps"
                   class="menus-tree" default-expand-all empty-text="暂无数据" @node-click="treeClick"/>
        </el-col>
        <el-col :span="20">
          <el-card shadow="never">
            <el-table v-loading="tableLoading" :data="tableData" empty-text="暂无数据">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="目录标题">
                      <span>{{ props.row.title }}</span>
                    </el-form-item>
                    <el-form-item label="目录名称">
                      <span>{{ props.row.name }}</span>
                    </el-form-item>
                    <el-form-item label="目录地址">
                      <span>{{ props.row.path }}</span>
                    </el-form-item>
                    <el-form-item label="重定向页面">
                      <span>{{ props.row.redirect }}</span>
                    </el-form-item>
                    <el-form-item label="icon">
                      <span><svg-icon :icon-class="props.row.icon"/></span>
                    </el-form-item>
                    <el-form-item label="是否一级目录">
                      <span>{{ props.row.isParent === '0' ? '是' : '否' }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column type="index" align="center" label="#" width="100px"/>
              <el-table-column label="标题" property="title" align="center"/>
              <el-table-column label="名称" property="name" align="center"/>
              <el-table-column label="icon" property="icon" align="center">
                <template slot-scope="scope">
                  <el-tooltip :content="scope.row.icon" placement="right" effect="light">
                    <svg-icon :icon-class="scope.row.icon"/>
                  </el-tooltip>
                </template>
              </el-table-column>
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
  import { Message } from 'element-ui'

  export default {
    name: 'MenusSetting',
    data() {
      return {
        searchText: '',
        loading: false,
        treeLoading: false,
        tableLoading: false,
        initMenus: {},
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
    // 初始化数据
    created() {
      this.loading = true
      // 获取全部目录列表
      this.$store.dispatch('selectMenus', {}).then(response => {
        this.treeData = response.data
        if (this.treeData.length > 0) {
          this.initMenus = this.treeData[0]
          this.getChildAndParent()
        }
      }).catch(() => {
        Message.error('操作异常，请刷新重试')
      })
    },
    methods: {
      // 模糊搜索
      filterNode(value, data) {
        if (!value) return true
        return data.title.indexOf(value) !== -1
      },
      // 树形结构点击事件
      treeClick(value) {
        this.tableLoading = true
        this.initMenus = value
        this.getChildAndParent()
      },
      // 获取子类及父类
      getChildAndParent() {
        this.$store.dispatch('selectMenusChildAndParent', this.initMenus).then(response => {
          this.tableData = response.data
          this.loadingClose()
        })
      },
      // 重载本页数据
      render() {
        this.loading = true
        this.$store.dispatch('selectMenus', {}).then(response => {
          this.treeData = response.data
          this.getChildAndParent()
        }).catch(() => {
          Message.error('操作异常，请刷新重试')
        })
      },
      // 关闭加载框
      loadingClose() {
        this.loading = false
        this.tableLoading = false
        this.treeLoading = false
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .menus-tree {
    margin-top: 10px;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
