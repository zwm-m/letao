<template>
  <div class="home">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px" style="background-color: rgb(88, 107, 180)">
            <div class="box">
                <div class="profile">
                <router-link to=''>
                  <img src="../assets/images/8.jpg" alt="">
                </router-link>
                <h4>llll</h4>
              </div>
            </div>
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo el-menu-admin"
            @open="handleOpen"
            @close="handleClose"
            background-color="#3b6693"
            text-color="#fff"
            :collapse=btn
            :router='true'
            active-text-color="#ffd04b">
            <el-menu-item index="user">
              <i class="el-icon-tickets"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>分类管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="categoryfrist">一级分类管理</el-menu-item>
                <el-menu-item index="categorysecond">二级分类管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-menu-item index="product">
              <i class="el-icon-date"></i>
              <span slot="title">商品管理</span>
            </el-menu-item>
          </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header style="background-color: rgb(59, 102, 147)">
            <a href="javascript:;" class="myicon myicon-menu toggle-btn" @click="btn=!btn" style="color:#eaa064"></a>
          <div class="right">
            欢迎您
            <router-link to=''>ddd</router-link>
            <router-link to=''>退出</router-link>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      btn: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="scss" scoped>
.home{
  height: 100%;
   .el-menu-admin:not(.el-menu--btn) {
    width: 200px;
    min-height: 400px;
  }
  .box{
    height:20%;
    background-color: #234766;
    text-align: center;
    .profile{
    position: relative;
  //  background-color: rgb(52, 60, 67);
  padding-top: 50px;
    img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        box-shadow: 0 0 3px 2px #ccc;
        // margin-left: 45%;
      }
      h4{
        line-height: 40px;
      }
  }
  }
  .el-container{
    height: 100%;
    .el-menu{
      height: 80%;
    }
  }
  header{
    line-height:60px;
      .right{
        float:right;
        a:nth-of-type(1){
          color:orangered;
        }
        a:nth-of-type(2){
          color: aqua;
        }
      }
  }
}
</style>
