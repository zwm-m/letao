<template>
  <div class="categoursFrist">
    <el-card class="box-card">
      <!-- 添加 -->
      <el-button
        type="success"
        @click="addbtn()"
      >添加分类</el-button>
      <!-- 表格 -->
      <template>
        <el-table
          :data="fristlist"
          border
          style="width: 100%"
        >
          <el-table-column
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            prop="id"
            label="分类的编号"
            width="400px"
          >
          </el-table-column>
          <el-table-column
            prop="categoryName"
            label="分类名称"
          >
          </el-table-column>
        </el-table>
      </template>
      <!-- 添加分类模板 -->
      <el-dialog
        title="添加分类"
        :visible.sync="categoryFrist"
      >
        <el-form :model="fristfrom">
          <el-form-item
            label="分类名称"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="fristfrom.categoryName"
              auto-complete="off"
              placeholder='请输入分类名称'
            ></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="categoryFrist = false">取 消</el-button>
          <el-button
            type="primary"
            @click="addCategoryFrist"
          >确 定</el-button>
        </div>
      </el-dialog>
      <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[1, 2, 3, 4]"
      :page-size=page
      layout="total, sizes, prev, pager, next, jumper"
      :total=total>
    </el-pagination>
    </el-card>
  </div>
</template>
<script>
import { FristList, addCategoryFrist } from '@/api'
export default {
  data () {
    return {
      fristlist: [],
      categoryFrist: false,
      fristfrom: {
        categoryName: ''
      },
      formLabelWidth: '120px',
      page: 1,
      pagesize: 10,
      total: 10,
      id: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    addbtn () {
      this.categoryFrist = true
      this.fristfrom.categoryName = ''
    },
    // 添加分类
    addCategoryFrist () {
      addCategoryFrist(this.fristfrom).then(res => {
        // console.log(this.fristlist.categoryName)
        if (res.data.success === true) {
          this.$message.success('添加分类数据成功')
          this.categoryFrist = false
          this.init()
        }
      })
    },
    init () {
      FristList({ page: this.page, pageSize: this.pagesize }).then(res => {
        // console.log(res)

        if (res.status === 200) {
          this.fristlist = res.data.rows
          this.page = res.data.page
          this.pagesize = res.data.size
          this.total = res.data.total
          console.log(this.fristlist[0].categoryName)
        }
      })
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.page = val
      this.init()
    }
  }
}
</script>
<style lang="scss" scoped>
.categoursFrist {
  button {
    margin-bottom: 15px;
  }
}
</style>
