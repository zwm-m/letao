import axios from 'axios'
// 配置基础路径
axios.defaults.baseURL = 'http://localhost:3000'
// axios默认不会发送cookie值
axios.defaults.withCredentials = true

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
// 登录
export const login = (pa) => {
  return axios.post('/employee/employeeLogin', pa)
    .then(res => {
      return res
    })
}
// 检查用户是否登录
export const checkLogin = () => {
  return axios.get('/employee/checkRootLogin')
    .then(res => {
      return res
    })
}
// 用户
export const getUser = (pa) => {
  return axios.get('/user/queryUser', {params: pa})
    .then(res => {
      return res
    })
}
// 用户的禁用和启用
export const ChangeUserState = (pa) => {
  return axios.post('/user/updateUser', pa)
    .then(res => {
      return res
    })
}
// 获取商品数据
export const getProductList = (pa) => {
  return axios.get('/product/queryProductDetailList', {params: pa})
    .then(res => {
      return res
    })
}
// 产品的添加
export const addProduct = (pa) => {
  return axios.post('/product/addProduct', pa)
    .then(res => {
      return res
    })
}
// 第一个分类数据
export const FristList = (pa) => {
  return axios.get('/category/queryTopCategoryPaging', {params: pa})
    .then(res => {
      return res
    })
}
// 添加一级分类
export const addCategoryFrist = (pa) => {
  return axios.post('/category/addTopCategory', pa)
    .then(res => {
      return res
    })
}
// 第二个分类数据
export const SecondList = (pa) => {
  return axios.get('/category/querySecondCategoryPaging', {params: pa})
    .then(res => {
      return res
    })
}
