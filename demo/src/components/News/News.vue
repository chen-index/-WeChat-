<template>
  <div>
    <div class="header">
      <span class="title">聊天</span>
      <van-divider />
    </div>
    <div class="container">
      <van-cell-group @click="gochat">
        <van-image
          width="48"
          height="48"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <van-cell :clickable="true" title="聊天室" value="现在" label="信息" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userForm: {
        id: '',
        nickname: ''
      }
    }
  },
  mounted() {
    this.getname()
  },
  methods: {
    gochat() {
      this.$router.push('/home')
      this.$socket.emit('login', this.userForm.nickname)
    },
    async getname() {
      this.userForm.id = window.sessionStorage.getItem('_id')
      const { data: res } = await this.$http.get('users/user', { params: { id: this.userForm.id } })
      if (res.status !== '200') {
        return false
      } else {
        this.userForm = res.result.users
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .header {
    position: fixed;
    width: 100%;
    z-index: 999;
    height: 50px;
    line-height: 50px;
    /*background-color: #F9F9F9;*/
    background-color: white;
    .title {
      font-weight: bold;
      margin-left: 10px;
    }
  }
  .van-divider {
    margin: 0;
  }
  .van-cell-group {
    display: flex;
    .van-image {
      padding: 10px 0px 10px 10px;
    }
  }
  .container {
    padding-top: 50px;
  }
</style>
