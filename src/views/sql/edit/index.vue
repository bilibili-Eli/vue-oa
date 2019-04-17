<template>
  <div class="app-container">
    <el-form ref="sqlForm" :rules="rules" :model="sqlForm" label-position="right">
      <el-form-item label="类型：" prop="type">
        <el-select v-model="sqlForm.type" placeholder="请选择">
          <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="sql：" prop="sql">
        <el-input v-model="sqlForm.sql" type="textarea" autosize placeholder="请输入sql"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">获取内容</el-button>
        <el-button type="primary" @click="clear('all')">清除全部</el-button>
        <el-button type="primary" @click="clear('info')">清除结果</el-button>
      </el-form-item>
    </el-form>
    <pre>{{ info }}</pre>
  </div>
</template>

<script>
  export default {
    name: 'SqlIndex',
    data() {
      const validateSql = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('sql不能为空'))
        }
        const type = value.substring(0, 6)
        if (type.search('select') === 0) {
          this.sqlForm.type = 'select'
          callback()
        } else if (type.search('delete') === 0) {
          this.sqlForm.type = 'delete'
          callback()
        } else if (type.search('update') === 0) {
          this.sqlForm.type = 'update'
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
          { label: 'update', value: 'update' }
        ],
        rules: {
          sql: [
            { validator: validateSql, trigger: 'change' }
          ]
        }
      }
    },
    created() {
    },
    methods: {
      onSubmit() {
        this.$refs['sqlForm'].validate((valid) => {
          if (valid) {
            if (this.sqlForm.type === 'select') {
              this.$store.dispatch('selectSql', this.sqlForm).then(response => {
                this.info = response
              })
            } else if (this.sqlForm.type === 'delete') {
              this.info = '功能还在开发中，即将上线'
            } else if (this.sqlForm.type === 'update') {
              this.info = '功能还在开发中，即将上线'
            } else {
              return false
            }
          }
        })
      },
      clear(domain) {
        switch (domain) {
          case 'all':
            this.info = ''
            this.$refs['sqlForm'].resetFields()
            break
          case 'info':
            this.info = ''
            break
        }
      }
    }
  }
</script>

<style scoped>

</style>
