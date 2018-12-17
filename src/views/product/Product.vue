<template>
  <div class="product">
    <el-card class="box-card">
      <!-- 添加 -->
      <el-button
        type="success"
        @click="productDisplay = true"
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
            prop="id"
            label="商品编号"
            width="80px"
          >
          </el-table-column>
          <el-table-column
            prop="proName"
            label="商品名称"
          >
          </el-table-column>
          <el-table-column
            prop="proDesc"
            label="商品描述"
            width="100px"
          >
          </el-table-column>
          <el-table-column
            prop="num"
            label="商品库存"
            width="80px"
          >
          </el-table-column>
          <el-table-column
            prop="size"
            label="商品尺寸"
            width="80px"
          >
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="是否下架"
            width="80px"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="80px"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
              >已下架</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 添加分类模板 -->
      <el-dialog
        title="添加商品"
        :visible.sync="productDisplay"
      >
        <el-form :model="productFrom">
          <el-form-item
            label="请选择品牌"
          >
            <el-select :model='productFrom' placeholder="请选择品牌">
              <el-option v-for="item in productFrom" :key="item.id"
                value='item.brandId'
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="productFrom.proName"
              auto-complete="off"
              placeholder='请输入产品名称'
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="productFrom.proDesc"
              auto-complete="off"
              placeholder='请输入产品描述'
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="productFrom.num"
              auto-complete="off"
              placeholder='请输入产品数量'
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="productFrom.size"
              auto-complete="off"
              placeholder='请输入产品尺码：如20-39'
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="productFrom.oldPrice"
              auto-complete="off"
              placeholder='请输入商品原价'
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="productFrom.price"
              auto-complete="off"
              placeholder='请输入商品折扣价'
            ></el-input>
          </el-form-item>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button
              size="small"
              type="primary"
            >点击上传</el-button>
            <div
              slot="tip"
              class="el-upload__tip"
            >请选择三张图片</div>
          </el-upload>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="productDisplay = false">取 消</el-button>
          <el-button
            type="primary"
            @click="addProduct"
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
import { getProductList, addProduct } from '@/api'
export default {
  data () {
    return {
      productDisplay: false,
      productlist: [],
      formLabelWidth: '120px',
      page: 1,
      pagesize: 6,
      total: 1,
      fileList: [],
      productFrom: {
        id: '',
        proname: '',
        oldprice: '',
        price: '',
        prodesc: '',
        size: '',
        statu: '',
        num: '',
        brandld: ''
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 添加产品
    addProduct () {
      this.productDisplay = false
      addProduct(this.productFrom).then(res => {
        console.log(res)
      })
    },
    // 初始化
    init () {
      getProductList({ page: this.page, pageSize: this.pagesize }).then(res => {
        console.log(res)

        if (res.status === 200) {
          this.productlist = res.data.rows
          this.page = res.data.page
          this.pagesize = res.data.size
          this.total = res.data.total
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
    },
    handleDelete (index, row) {
      // console.log(row)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
