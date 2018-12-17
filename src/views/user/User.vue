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

          label="状态"
        >
         <template slot-scope="scope">
            <span>{{scope.row.isDelete | capitalize}}</span>
        </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleChange(scope.row)"
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
import {getUser, ChangeUserState} from '@/api'
export default {
  data () {
    return {
      page: 1,
      pagesize: 10,
      serachkey: '',
      total: 1,
      userlist: [],
      id: '',
      isdelete: ''
    }
  },
  mounted () {
    this.init()
  },
  // 过滤器
  filters: {
    capitalize (isDelete) {
      if (isDelete === 1) {
        return '已启用'
      } else {
        return '已禁用'
      }
    }
  },
  methods: {

    // 用户的禁用与启用
    handleChange (row) {
      console.log(row)
      this.id = row.id
      this.isdelete = row.isDelete
      ChangeUserState({ id: this.id, isDelete: this.isdelete }).then(res => {
        console.log(res)
      })
    },
    // 初始化
    init () {
      getUser({ page: this.page, pageSize: this.pagesize }).then(res => {
        // console.log(res.data.rows)
        if (res.status === 200) {
          // this.total = res.data.rows.total
          this.userlist = res.data.rows
        }
      })
    },
    searchUsers () {},

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
