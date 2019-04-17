<template>
  <div class="app-container">
    <el-form ref="sqlForm" :rules="rules" :model="sqlForm" label-position="right">
      <el-form-item label="类型：" prop="type" size="small">
        <el-select v-model="sqlForm.type" placeholder="请选择">
          <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="SQL语句：" prop="sql">
        <el-input v-model="sqlForm.sql" type="textarea" autosize placeholder="请输入SQL"/>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit">获取内容</el-button>
        <el-button type="primary" @click="clear('info')">清除结果</el-button>
        <el-button type="primary" @click="clear('all')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-card>
      <div slot="header" class="clearfix">
        <span>查询结果</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="showType = !showType">切换显示</el-button>
      </div>
      <el-table v-loading="loading" v-show="showType" :data="tableData" border empty-text="你要的数据这个星球上找不到哟~">
        <el-table-column v-if="columnList.length > 6" type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="demo-table-expand" inline>
              <el-form-item v-for="item in columnList" :key="item" :label="item + '：'" :property="item">
                <span>{{ props.row[item] }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column v-for="item in columnList.slice(0, 6)" :key="item" :label="item" :property="item"
                         show-overflow-tooltip/>
      </el-table>
      <pre v-show="!showType">{{ info }}</pre>
    </el-card>
  </div>
</template>

<script>
  import { array_remove_repeat } from '@/utils/auth'

  export default {
    name: 'SqlIndex',
    data() {
      const validateSql = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('sql不能为空'))
        }
        const type = value.substring(0, 6).toLowerCase()
        if (type.search('select') === 0) {
          this.sqlForm.type = 'select'
          callback()
        } else if (type.search('delete') === 0) {
          this.sqlForm.type = 'delete'
          callback()
        } else if (type.search('update') === 0) {
          this.sqlForm.type = 'update'
          callback()
        } else if (type.search('alert') === 0) {
          this.sqlForm.type = 'alert'
          callback()
        } else if (type.search('drop') === 0) {
          this.sqlForm.type = 'drop'
          callback()
        } else if (type.search('create') === 0) {
          this.sqlForm.type = 'create'
          callback()
        } else if (type.search('insert') === 0) {
          this.sqlForm.type = 'insert'
          callback()
        } else {
          if (value.length > 6) {
            callback(new Error('请输入正确的sql语句'))
          } else {
            callback()
          }
        }
      }
      return {
        sqlForm: {
          type: '',
          sql: ''
        },
        info: '',
        typeList: [
          { label: 'select', value: 'select' },
          { label: 'delete', value: 'delete' },
          { label: 'update', value: 'update' },
          { label: 'insert', value: 'insert' },
          { label: 'alert', value: 'alert' },
          { label: 'drop', value: 'drop' },
          { label: 'create', value: 'create' }
        ],
        rules: {
          sql: [
            { validator: validateSql, trigger: 'change' }
          ]
        },
        tableData: [],
        columnList: [],
        showType: true,
        loading: false
      }
    },
    created() {
    },
    methods: {
      onSubmit() {
        this.clear('info')
        this.loading = true
        this.$refs['sqlForm'].validate((valid) => {
          if (valid) {
            switch (this.sqlForm.type) {
              case 'select':
                this.$store.dispatch('selectSql', this.sqlForm).then(response => {
                  this.info = response
                  this.tableData = response.data
                  let list = []
                  this.tableData.forEach(function(item) {
                    list = list.concat(Object.keys(item))
                  })
                  this.columnList = array_remove_repeat(list)
                  this.loading = false
                }).catch(() => {
                  this.loading = false
                })
                break
              case 'delete':
              case 'drop':
                this.$store.dispatch('deleteSql', this.sqlForm).then(() => {
                  this.loading = false
                })
                this.loading = false
                break
              case 'create':
              case 'insert':
                this.$store.dispatch('insertSql', this.sqlForm).then(() => {
                  this.loading = false
                })
                break
              case 'alert':
              case 'update':
                this.$store.dispatch('updateSql', this.sqlForm).then(() => {
                  this.loading = false
                })
                break
              default:
                this.loading = false
                return false
            }
          }
        })
      },
      clear(domain) {
        switch (domain) {
          case 'all':
            this.info = ''
            this.tableData = []
            this.columnList = []
            this.$refs['sqlForm'].resetFields()
            break
          case 'info':
            this.info = ''
            this.tableData = []
            this.columnList = []
            break
        }
      }
    }
  }
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
