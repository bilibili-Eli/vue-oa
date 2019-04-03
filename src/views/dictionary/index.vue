<template>
  <div class="dictionaries_dictionaries">
    <el-container v-loading="loading" class="container">
      <el-aside width="250px" style="padding:10px">
        <el-header style="padding:10px;height:60px;">
          <div class="fontStyle">
            字典分类
          </div>
        </el-header>
        <div class="line" style="border-bottom:1px solid #999999;"></div>
        <el-row v-for="(item, index) in tableData" :key="index" style="padding:10px">
          <el-col :span="12" :offset="6">
            <div class="dictType" @click="getData({ parentId: item.dictionaryId })">
              <i class="el-icon-document">{{ item.dictionaryName }}</i>
            </div>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <div style="padding-top:20px">
          <span class="fontStyleTitle"></span>
          <el-button slot="extra" type="primary" style="float: right" plain @click="addItem">+新建</el-button>
        </div>
        <el-card style="width: 100%;margin-top:30px;border: 1px solid rgba(0, 0, 0, 0.2);  border-radius: 5px;"
                 shadow="never">
          <el-table :data="tableChildren" :default-sort="{prop: 'dictionarySeq', order: 'ascending'}">
            <el-table-column prop="dictionaryName" label="字典属性" align="center"></el-table-column>
            <el-table-column prop="dictionarySeq" label="属性编号" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" class="el-icon-edit" @click="editItem(scope.row)"></el-button>
                <el-button type="text" class="el-icon-delete" style="margin-left:5px"
                           @click="deleteItem(scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-main>
      <!-- 右侧弹出框 -->
      <addItem ref="addItem" :type="type" @getData="getData({ isParent: 20001 })"></addItem>
      <!-- 右侧弹出框-结束 -->
    </el-container>
  </div>
</template>

<script>
  import { Message } from 'element-ui'
  import addItem from './components/addItem'

  export default {
    components: {
      addItem
    },
    data() {
      return {
        type: '',
        loading: false,
        delDialogVisible: false,
        tableData: [],
        tableChildren: []
      }
    },
    mounted() {
      this.getData({ isParent: 20001 })
    },
    methods: {
      // 添加字典数据
      addItem() {
        this.type = 'insert'
        this.$refs.addItem.initItemInfo()
      },
      // 修改字典数据
      editItem(row) {
        this.type = 'edit'
        this.$refs.addItem.detailInit(row)
      },
      // 删除字典数据
      deleteItem(row) {
        this.$confirm('此操作将永久删除字典信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$store.dispatch('removeOperation', row).then(response => {
            if (response.code === 0) {
              Message.success('删除成功')
            } else {
              Message.error('删除失败')
            }
            this.setData()
          }).catch(() => {
            console.log('no')
          })
        }).catch(() => {
          Message.info('已取消删除')
        })
      },
      // 获取数据字典
      getData(val) {
        this.loading = true
        this.$store.dispatch('selectDictionary', val).then(response => {
          if (val.isParent) {
            this.tableData = response.data
            this.getData({ parentId: response.data[0].dictionaryId })
          } else if (val.parentId) {
            this.tableChildren = response.data
            this.loading = false
          }
        }).catch(() => {
          console.log('no')
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .dictionaries_dictionaries {
    .fontStyle {
      display: inline-block;
      width: 100%;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #303133;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-left: 13px;
      margin-top: 4px;
    }

    .fontStyleTitle {
      display: inline-block;
      width: 80%;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #303133;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-left: 13px;
      margin-top: 4px;
    }

    .fadeInRight {
      animation-name: fadeInRight;
      animation-duration: 1s;
      visibility: visible !important;
      -webkit-transform: translate3d(50%, 0, 0);
      transform: translate3d(50%, 0, 0);
      min-height: 100%;
    }

    @keyframes fadeInRight {
      0% {
        opacity: 1;
        -webkit-transform: translate3d(150%, 0, 0);
        transform: translate3d(150%, 0, 0);
      }
      100% {
        opacity: 1;
        /*-webkit-transform: none;*/
        /*transform: none;*/
        -webkit-transform: translate3d(50%, 0, 0);
        transform: translate3d(50%, 0, 0);
      }
    }

    .container {
      min-height: 500px;
      width: 95%;
      left: 0;
      right: 0;
      margin: 2% auto;
      background-color: rgb(255, 255, 255);
      border: 1px solid rgb(156, 154, 154);
      border-radius: 5px;
    }

    .box-card {
      min-height: 280px;
    }

    .el-aside {
      color: rgb(53, 23, 23);
      border-right: 1px solid rgb(156, 154, 154);
    }

    .title {
      font-size: 16px;
    }

    .text {
      font-size: 14px;
    }

    .item {
      margin-bottom: 10px;
    }

    .cardfooter {
      border-top: 1px solid rgba(0, 0, 0, 0.2);
      text-align: center;
      font-size: 17px;
      height: 20px;
    }

    .cardfooter i {
      padding: 10px;
    }

    .dictType {
      font-size: 14px;
      cursor: pointer;
    }
  }
</style>
