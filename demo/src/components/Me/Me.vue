<template>
  <div class="container">
    <div class="mebox" @click="goMeData">
      <van-image
        width="60"
        height="60"
        :src="imgUrl + userForm.picture"
      />
      <div class="mebox_title">
        <h2>{{ userForm.nickname }}</h2>
        <span>聊天号：{{ userForm.username }}</span>
      </div>
    </div>
    <van-cell :clickable="true" title="支付" icon="location-o" class="mbottom"/>

    <van-cell-group>
      <van-cell :clickable="true" title="收藏" icon="location-o" />
      <van-cell :clickable="true" title="相册" class="mbottom" icon="location-o" />
      <van-cell :clickable="true" title="卡包" class="mbottom" icon="location-o" />
      <van-cell :clickable="true" title="表情" class="mbottom" icon="location-o" />
    </van-cell-group>
    <van-cell :clickable="true" title="设置" icon="location-o" class="mbottom"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userForm: {
        id: '',
        picture: ''
      },
      imgUrl: 'http://120.77.79.140/'
    }
  },
  mounted() {
    this.getname()
  },
  methods: {
    goMeData() {
      this.$router.push('/medata')
    },
    async getname() {
      this.userForm.id = window.sessionStorage.getItem('_id')
      const { data: res } = await this.$http.get('users/user', { params: { id: this.userForm.id } })
      if (res.status !== '200') {
        return false
      } else {
        this.userForm = res.result.users
        console.log(this.userForm)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .container {
    background-color: #F9F9F9;
  }
  .mbottom {
    margin-bottom: 10px;
  }
  .mebox {
    position: relative;
    background-color: white;
    height: 180px;
    margin-bottom: 10px;
  }
  .van-image {
    position: absolute;
    top: 70px;
    left: 20px;
  }
  .mebox_title {
    position: absolute;
    top: 58px;
    left: 100px;
    h2 {
      font-size: 16px;
    }
    span {
      font-size: 12px;
      color: gray;
    }
  }
</style>
