<template>
  <div class="categoursFrist">
    <el-card class="box-card">
      <!-- 添加 -->
      <el-button
        type="success"
        @click="categoryFrist=true"
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
            prop="username"
            label="分类的编号"
            width="400px"
          >
          </el-table-column>
          <el-table-column
            prop="分类名称"
            label="分类名称"
          >
          </el-table-column>
        </el-table>
      </template>
      <!-- 添加分类模板 -->
      <el-dialog
        title="收货地址"
        :visible.sync="categoryFrist"
      >
        <el-form :model="fristlist">
          <el-form-item
            label="活动名称"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="fristlist.name"
              auto-complete="off"
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
            @click="categoryFrist = false"
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
export default {
  data () {
    return {
      fristlist: [],
      categoryFrist: false,
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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
