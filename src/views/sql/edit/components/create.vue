<template>
  <el-dialog v-loading="loading" :visible.sync="createShow" title="查询创建工具" width="80%" fullscreen center>
    <el-container>
      <el-aside width="20%">
        <el-tree :data="treeData" :props="defaultProps" onselectstart="return false">
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <svg-icon v-if="data.children === undefined" icon-class="table" class="svg-table"/>
            <svg-icon v-else icon-class="schema" class="svg-schema"/>
            <span @dblclick="tableClick(node)">{{ node.label }}</span>
          </span>
        </el-tree>
      </el-aside>
      <el-main>
        <el-row :gutter="12">
          <el-col v-for="(table, index) in tableList" :key="index" :span="4" style="margin-bottom: 10px">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span>{{ table.tableName }}</span>
                <el-button type="text" style="float: right; padding: 3px 0" class="el-icon-close"
                           @click="cancelTable(table, index)"/>
              </div>
              <el-scrollbar style="height: 150px">
                <el-checkbox-group v-model="checkList">
                  <div v-for="column in table.tableColumn" :key="column" class="text item">
                    <el-checkbox :label="table.simple + '.' + column" @change="getSQL">{{ column }}</el-checkbox>
                  </div>
                </el-checkbox-group>
              </el-scrollbar>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <div slot="footer" class="dialog-footer">
      <el-button @click="createShow = false">取 消</el-button>
      <el-button :loading="sureLoading" type="primary" @click="sure">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        createShow: false,
        form: {},
        // tree控件
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'schemaName'
        },
        tableList: [],
        simpleList: [],
        checkList: [],
        sureLoading: false
      }
    },
    created() {
    },
    methods: {
      init() {
        this.loading = true
        this.tableList = []
        this.simpleList = []
        this.checkList = []
        this.$store.dispatch('getSchemata', {}).then(response => {
          this.treeData = response.data
          this.loading = false
          this.createShow = true
        })
      },
      cancelTable(table, index) {
        console.log(this.checkList)
        for (let i = 0; i < this.checkList.length; i++) {
          for (let j = 0; j < table.tableColumn.length; j++) {
            if (this.checkList[i] === (table.simple + '.' + table.tableColumn[j])) this.checkList.splice(i, 1)
          }
        }
        this.tableList.splice(index, 1)
      },
      tableClick(node) {
        const schema = node.parent.data.schemaName
        const table = node.label
        if (schema !== undefined && schema !== null) {
          this.$store.dispatch('getColumnByTable', { schemaName: schema, tableName: table }).then(response => {
            if (response.code === 0) {
              response.data['simple'] = this.generateName(this.simpleList, '')
              response.data['schemaName'] = schema
              this.tableList.push(response.data)
            }
          })
        }
      },
      generateName(list, value) {
        let flag = false
        value += String.fromCharCode(97 + Math.ceil(Math.random() * 25))
        list.forEach(function(item) {
          if (value === item) {
            flag = true
          }
        })
        if (flag) {
          return this.generateName(list, value)
        } else {
          list.push(value)
          return value
        }
      },
      getSQL() {
        let tableSql = ''
        let columnSql = ''
        this.tableList.forEach(function(item) {
          tableSql += ('`' + item.schemaName + '`.' + '`' + item.tableName + '` ' + item.simple + ',')
        })
        this.checkList.forEach(function(item) {
          columnSql += item + ','
        })
        columnSql = (columnSql.substring(0, columnSql.lastIndexOf(',')) + ' ')
        tableSql = (tableSql.substring(0, tableSql.lastIndexOf(',')) + ' ')
        return ('select ' + columnSql + 'from ' + tableSql).trim()
      },
      sure() {
        this.sureLoading = true
        this.$emit('getSql', this.getSQL())
        this.sureLoading = false
        this.createShow = false
      }
    }
  }
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 5px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
