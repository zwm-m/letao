<template>
  <div class="user">
    <el-card class="box-card">
    <!-- 搜索区域 -->
    <div class="search">
      <el-input
        placeholder="请输入内容"
        v-model="serachkey"
        class="input-with-select"
        style="width:300px"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click='searchUsers'
        ></el-button>
      </el-input>
    </div>
    <!-- 表格 -->
    <template>
      <el-table
        :data="userlist"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="1"
          label="状态"
        >
        </el-table-column>
        <el-table-column label="操作">
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
import {getUser} from '@/api'
export default {
  data () {
    return {
      page: 1,
      pagesize: 10,
      serachkey: '',
      total: 1,
      userlist: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      getUser({ page: this.page, pageSize: this.pagesize }).then(res => {
        console.log(res.data.rows)
        if (res.status === 200) {
          // this.total = res.data.rows.total
          this.userlist = res.data.rows
        }
      })
    },
    searchUsers () {},
    handleDelete (index, row) {
      console.log(row)
    },
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
.user {
  .search {
    margin-bottom: 15px;
  }
}
</style>
