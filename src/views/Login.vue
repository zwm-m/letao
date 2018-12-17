<template>
    <div class="box">
          <div class="login">
            <img src="../assets/images/8.jpg" alt="">
      <el-form :model="loginform" :rules="rules" ref="loginform" label-width="80px" class="demo-ruleForm">
          <el-form-item prop="username" >
            <el-input  v-model="loginform.username" placeholder="请输入用户名" prefix-icon="myicon myicon-user" ></el-input>
        </el-form-item>
        <el-form-item  prop="password"  >
            <el-input type='password' v-model="loginform.password" placeholder="请输入密码"   prefix-icon="myicon myicon-key"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="SubmitForm('loginform')" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
        </div>
    </div>
</template>
<script>
import { login } from '@/api'
export default {
  data () {
    return {
      loginform: {
        username: 'root',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    SubmitForm (formnane) {
      this.$refs[formnane].validate(vaild => {
        if (vaild) {
          login(this.loginform).then(res => {
            // console.log(res)
            // 判断是否登录成功
            if (res.data.success === true) {
              // 将token值实现本地存储
              // localStorage.setItem('lt-token', res.data)
              // console.log(res.data)

              // // 把token值储存到store
              // this.$store.dispatch('setUserNameAction', res.data)
              // 登录成功后给出提示
              this.$message({
                message: '登陆成功',
                type: 'success'
              })
              this.$router.push({name: 'Home'})
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    }
  }

}
</script>
<style lang="scss" scoped>
.box{
  background: url('../assets/images/6.jpg') no-repeat ;
  background-size: 100% 100%;
  height: 100%;
  .login{
    position: fixed;
    left: 0;
    right: 0;
    top: 30%;
    margin: 0 auto;
  width:500px;
  height:300px;
  background-color: rgba(0,0,0, 0.2);
  // text-align: center;
  padding-top: 20px;
  img{
    position:absolute;
    left:200px;
    top: -50px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    box-shadow: 0 0 3px 2px #ccc;
    // margin-left: 45%;
  }
  .demo-ruleForm{
    padding: 50px 80px 0 0;
    text-align: center;
  }
}
}
</style>
