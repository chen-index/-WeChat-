<template>
  <div>
    <van-nav-bar
      left-text="个人信息"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell-group class="mbottom">
      <van-cell :clickable="true" title="头像" size="large" class="imgbox">
        <van-uploader :after-read="afterRead">
        <van-image
          width="48"
          height="48"
          :src="imgUrl + userForm.picture"
        />
        </van-uploader>
<!--        <van-uploader v-model="fileList" multiple />-->
      </van-cell>
      <van-cell :clickable="true" @click="changename" title="昵称" :value="userForm.nickname"  size="large" />
      <van-cell :clickable="true" title="用户名" :value="userForm.username" size="large" />
      <van-cell :clickable="true" title="二维码样式" size="large" />
      <van-cell :clickable="true" title="更多" class="mbottom" size="large" />
    </van-cell-group>
    <van-cell-group>
      <van-cell :clickable="true" title="我的地址" size="large" />
      <van-cell :clickable="true" title="我的发票抬头" size="large" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userForm: {
        username: '',
        nickname: '',
        id: '',
        picture: ''
      },
      imgUrl: 'http://120.77.79.140/',
      fileList: [
        { url: 'https://img.yzcdn.cn/vant/cat.jpeg' }
      ]
    }
  },
  mounted() {
    this.getname()
  },
  methods: {
    async getname() {
      this.userForm.id = window.sessionStorage.getItem('_id')
      const { data: res } = await this.$http.get('users/user', { params: { id: this.userForm.id } })
      if (res.status !== '200') {
        return false
      } else {
        this.userForm = res.result.users
        console.log(this.userForm)
      }
    },
    onClickLeft() {
      this.$router.push('/me')
    },
    changename() {
      this.$router.push('/changename')
    },
    // 上传图片
    afterRead(file) {
      this.userForm.id = window.sessionStorage.getItem('_id')
      let params = new FormData() // 创建form对象
      params.append('file', file.file) // 通过append向form对象添加数据//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      params.append('id', this.userForm.id)
      params.append('picture', this.userForm.picture)
      // let config = {
      //   headers: { // 添加请求头
      //     Authorization:
      //       "Bearer " + window.localStorage.getItem("managementToken"),
      //     "Content-Type": "multipart/form-data"
      //   }
      // }
      let url = 'users/upload'
      this.$http.post(url, params).then(res => {
        this.getname()
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .van-nav-bar__text, .van-icon {
    color: black;
  }
  .mbottom {
    margin-bottom: 10px;
  }
  .imgbox {
    .van-cell__title {
      line-height: 55px;
    }
  }
</style>
