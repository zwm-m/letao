<template>
  <div class="categorySecond">
    <el-card
      class="box-card"
      style="height:100%"
    >
      <!-- 添加 -->
      <el-button
        type="success"
        @click="categorySecond=true"
      >添加分类</el-button>
      <!-- 表格 -->
      <template>
        <el-table
          :data="secondlist"
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
            label="品牌编号"
            width="180px"
          >
          </el-table-column>
          <el-table-column
            prop="brandName"
            label="品牌名称"
            width="180px"
          >
          </el-table-column>
          <el-table-column label="品牌logo">
            <template slot-scope="scope">
              <img
                :src="'http://localhost:3000'+ scope.row.brandLogo "
                alt=""
                style="width:80px;height:80px"
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="categoryName"
            label="所属分类"
            width="180px"
          >
          </el-table-column>
        </el-table>
      </template>
      <!-- 添加分类模板 -->
      <el-dialog
        title="添加分类"
        :visible.sync="categorySecond"
      >
        <el-form :model="secondfrom">
          <el-form-item label="请选择分类">
            <el-select
              v-model='secondfrom'
              placeholder="请选择品牌"
            >
              <el-option
                v-for="item in productlist"
                :key="item.id"
                value='item.brandId'
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="secondfrom.size"
              auto-complete="off"
              placeholder='请输入品牌名称'
            ></el-input>
          </el-form-item>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList2"
            list-type="picture"
          >
            <el-button
              size="small"
              type="primary"
            >点击上传</el-button>
            <div
              slot="tip"
              class="el-upload__tip"
            >只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="categorySecond = false">取 消</el-button>
          <el-button
            type="primary"
            @click="categorySecond = false"
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
import { SecondList } from '@/api'
export default {
  data () {
    return {
      secondlist: [],
      formLabelWidth: '120px',
      categorySecond: false,
      page: 1,
      pagesize: 10,
      total: 10,
      secondfrom: {},
      fileList2: []
    }
  },
  mounted () {
    SecondList({ page: this.page, pageSize: this.pagesize }).then(res => {
      console.log(res)
      if (res.status === 200) {
        this.secondlist = res.data.rows
        this.page = res.data.page
        this.pagesize = res.data.size
        this.total = res.data.total
      }
    })
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
