// import {
//   USER_NAME
// } from './mutation-types'

export default {
  // async login (commit) {
  //   const { data: res } = await this.$http.post('users/login', this.ruleForm)
  //   if (res.status !== '200') {
  //     return this.$message.error('你需要登记进入')
  //   } else {
  //     this.$message.success('已进入留言板')
  //     const name = res.result.name
  //     commit(USER_NAME, { name })
  //   }
  // }
  login(content, username) {
    content.commit('username', username)
  },
  register(content, username) {
    content.commit('username', username)
  }
}
