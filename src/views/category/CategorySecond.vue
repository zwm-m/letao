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
            width="200px"
          >
          </el-table-column>
          <el-table-column
            prop="brandName"
            label="品牌名称"
            width="200px"
          >
          </el-table-column>
          <el-table-column label="品牌logo">
            <template slot-scope="scope">
              <img
                :src="'http://127.0.0.1:3000'+ scope.row.brandLogo "
                alt=""
                style="width:80px;height:80px"
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="categoryName"
            label="所属分类"
            width="200px"
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
              placeholder="请选择品牌"
              v-model="secondfrom.categoryId"
            @change='getvalue'
            >
              <el-option
                v-for="item in firstList"
                :key="item.brandId"
                :value='item'
                :label="item.categoryName"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="secondfrom.brandName"
              auto-complete="off"
              placeholder='请输入品牌名称'
            ></el-input>
          </el-form-item>
          <el-upload
            class="upload-demo"
            action="http://127.0.0.1:3000/category/addSecondCategoryPic"
            :with-credentials= "true"
            name="pic1"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
            :on-success='handlSuccess'
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
            @click="addSecond"
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
      <!-- 图片预览 -->
<el-dialog title="图片预览" :visible.sync="picdialogTableVisible">
  <img :src="userpic" alt="">
</el-dialog>
    </el-card>
  </div>
</template>
<script>
import { SecondList, FristList, addCategorySecond } from '@/api'
export default {
  data () {
    return {
      secondlist: [],
      firstList: [],
      formLabelWidth: '120px',
      categorySecond: false,
      page: 1,
      pagesize: 10,
      total: 10,
      // secondfrom: {
      //   proname: '',
      //   oldprice: '',
      //   price: '',
      //   prodesc: '',
      //   size: '',
      //   statu: '',
      //   num: '',
      //   brandld: ''
      // },
      secondfrom: {
        brandName: '',
        categoryId: '',
        brandLogo: [],
        hot: ''
      },
      fileList: [],
      picdialogTableVisible: false,
      userpic: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    getvalue (value) {
      // console.log(value.categoryName)
      var plist = value.categoryName
      // 将循环结构转换为JSON
      var str = JSON.stringify(plist)
      this.secondfrom.categoryId = str
      // this.value.categoryName = this.secondfrom.categoryId
    },
    // 添加二级分类
    addSecond () {
      console.log(this.secondfrom)

      addCategorySecond(this.secondfrom).then(res => {
        console.log(res)
        if (res.data.success === true) {
          this.$message.success('添加分类成功')
          this.categorySecond = false
          this.init()
        }
      })
    },
    init () {
      FristList({ page: this.page, pageSize: this.pagesize }).then(res => {
      // console.log(res)
        this.firstList = res.data.rows
      })
      SecondList({ page: this.page, pageSize: this.pagesize }).then(res => {
        console.log(res.data.rows)
        if (res.status === 200) {
          this.secondlist = res.data.rows
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
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    // 图片预览
    handlePreview (file) {
      console.log(file)
      this.picdialogTableVisible = true
      // this.userpic = 'http://localhost:3000' + file.name
    },
    handlSuccess (file, fileList) {
      console.log(file, fileList)
      this.userpic = 'http://127.0.0.1:3000' + file.picAddr
      // this.secondfrom.brandLogo.push({'brandLogo': '/' + file.picAddr})
      // 赋值给secondfrom.brandLogo
      this.secondfrom.brandLogo = this.userpic
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
