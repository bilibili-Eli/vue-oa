<template>
  <el-dialog :visible.sync="addDialogVisible" class="dictionaries_addItem" width="50%" hight="100%" top="0px" left="0px"
             custom-class="fadeInRight" @close="closeDialog">
    <div style="text-align:left" class="fontStyle">字典项目</div>
    <div style="margin: 10px;min-height:200px;">
      <el-form v-loading="loading" ref="itemForm" :rules="rules" :model="itemForm" label-width="70px"
               label-position="top">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="属性名称" prop="dictionaryName">
              <el-input v-model="itemForm.dictionaryName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="属性编号" prop="dictionarySeq">
              <el-input v-model.number="itemForm.dictionarySeq"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="是否父类" prop="isParent">
              <el-select v-model="itemForm.isParent" placeholder="请选择" @change="showParentSelect">
                <el-option v-for="item in booleanList" :key="item.value" :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-show="parentSelectShow" :span="12">
            <el-form-item label="选择父类" prop="parentId">
              <el-select v-loading="parentLoading" v-model="itemForm.parentId" placeholder="请选择">
                <el-option v-for="item in parentList" :key="item.dictionaryId" :label="item.dictionaryName"
                           :value="item.dictionaryId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-button type="primary" @click="saveItemInfo">保 存</el-button>
            <el-button @click="closeDialog">取 消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
  import { Message } from 'element-ui'

  export default {
    props: {
      type: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        itemForm: {},
        booleanList: [
          { value: 0, label: '是' },
          { value: 1, label: '否' }
        ],
        parentList: [],
        loading: false,
        parentLoading: false,
        parentSelectShow: false,
        rules: {
          dictionaryName: [
            { required: true, message: '属性名称不能为空', trigger: 'change' }
          ],
          dictionarySeq: [
            { required: true, message: '属性编号不能为空', trigger: 'change' }
          ],
          isParent: [
            { required: true, message: '请选择', trigger: 'change' }
          ]
        },
        addDialogVisible: false
      }
    },
    created() {
    },
    methods: {
      // 详情页初始化
      detailInit(row) {
        this.$store.dispatch('selectByIdDictionary', row).then(response => {
          this.itemForm = response.data
          this.itemForm.isParent === 0 ? this.parentSelectShow = false : this.parentSelectShow = true
          this.getParentList()
          this.addDialogVisible = true
        })
      },
      // 新建页初始化
      initItemInfo() {
        this.itemForm = {}
        if (this.$refs['itemForm']) {
          this.$refs['itemForm'].resetFields()
          this.parentSelectShow = false
        }
        this.addDialogVisible = true
      },
      // 关闭弹出窗
      closeDialog() {
        this.addDialogVisible = false
        this.$emit('getData')
      },
      // 显示/隐藏父类显示select
      showParentSelect(checked) {
        if (checked === 1) {
          this.parentSelectShow = true
          this.getParentList()
        } else if (checked === 0) {
          this.parentSelectShow = false
        }
      },
      // 获取父类列表
      getParentList() {
        this.parentLoading = true
        this.$store.dispatch('selectDictionary', { isParent: 0 }).then(response => {
          this.parentList = response.data
          this.parentLoading = false
        }).catch(() => {
          console.log('no')
        })
      },
      // 保存/修改详情
      saveItemInfo() {
        this.$refs['itemForm'].validate(valid => {
          if (valid) {
            if (this.type === 'insert') {
              this.$store.dispatch('insertDictionary', this.itemForm).then(response => {
                if (response.code === 0) {
                  Message.success(response.msg)
                  this.closeDialog()
                }
              }).catch(() => {
                console.log('no')
              })
            } else {
              this.$store.dispatch('updateDictionary', this.itemForm).then(response => {
                if (response.code === 0) {
                  Message.success(response.msg)
                  this.closeDialog()
                }
              }).catch(() => {
                console.log('no')
              })
            }
          }
        })
      }
    }
  }
</script>
