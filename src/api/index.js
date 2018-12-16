import axios from 'axios'
// 配置基础路径
axios.defaults.baseURL = 'http://127.0.0.1:3000'

// 登录
export const login = (pa) => {
  return axios.post('/employee/employeeLogin', pa)
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
