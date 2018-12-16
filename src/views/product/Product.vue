<template>
    <div class="product">
        <el-card class="box-card">
      <!-- 添加 -->
      <el-button
        type="success"
        @click="productDisplay=true"
      >添加分类</el-button>
      <!-- 表格 -->
      <template>
        <el-table
          :data="productlist"
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
            label="商品编号"
            width="80px"
          >
          </el-table-column>
          <el-table-column
            prop="商品名称"
            label="商品名称"
          >
          </el-table-column>
          <el-table-column
            prop="商品描述"
            label="商品描述"
            width="100px"
          >
          </el-table-column>
          <el-table-column
            prop="所属分类"
            label="商品库存"
            width="80px"
          >
          </el-table-column>
          <el-table-column
            prop="所属分类"
            label="商品尺寸"
            width="80px"
          >
          </el-table-column>
          <el-table-column
            prop="所属分类"
            label="是否下架"
            width="80px"
          >
          </el-table-column>
          <el-table-column label="操作" width="80px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >禁用</el-button>
          </template>
        </el-table-column>
        </el-table>
      </template>
      <!-- 添加分类模板 -->
      <el-dialog
        title="收货地址"
        :visible.sync="productDisplay"
      >
        <el-form :model="productlist">
          <el-form-item
            label="活动名称"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="productlist.name"
              auto-complete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="productDisplay = false">取 消</el-button>
          <el-button
            type="primary"
            @click="productDisplay = false"
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
        :total=total
      >
      </el-pagination>
    </el-card>
    </div>
</template>
<script>
export default {
  data () {
    return {
      productDisplay: false,
      productlist: [],
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleDelete (index, row) {
      console.log(row)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
