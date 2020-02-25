<template>
  <div style="height:100%;background-color: white">
    <van-nav-bar
      left-text="更改名字"
      left-arrow
      @click-left="onClickLeft"
    >
      <van-button type="primary" size="small" slot="right" @click="changename">保存</van-button>
    </van-nav-bar>
    <van-cell-group>
      <van-field v-model="user.nickname" placeholder="请输入用户名" />
    </van-cell-group>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', margin: '0' }"/>
    <div>
      <span class="content">好名字可以让你的朋友更容易记住你</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        nickname: '',
        id: ''
      }
    }
  },
  mounted() {
    this.getname()
  },
  methods: {
    async getname() {
      this.user.id = window.sessionStorage.getItem('_id')
      const { data: res } = await this.$http.get('users/user', { params: { id: this.user.id } })
      if (res.status !== '200') {
        return false
      } else {
        this.user = res.result.users
        console.log(this.user)
      }
    },
    onClickLeft() {
      this.$router.push('/medata')
    },
    async changename() {
      this.user.id = window.sessionStorage.getItem('_id')
      console.log(this.user)
      const { data: res } = await this.$http.post('users/edituser', this.user)
      console.log(res)
      if (res.status !== '200') {
        return false
      } else {
        // this.getname()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .van-nav-bar__text, .van-icon {
    color: black;
  }
  .content {
    margin-left: 10px;
    font-size: 12px;
    color: gray;
  }
</style>
