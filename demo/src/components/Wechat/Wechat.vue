<template>
  <div>
    <div>
      <router-view></router-view>
    </div>
    <div class="footer">
      <van-tabbar v-model="active" router ref="tabbar">
        <van-tabbar-item info="1" icon="chat" to="/news">聊天</van-tabbar-item>
        <van-tabbar-item icon="friends" to="/address">通讯录</van-tabbar-item>
        <van-tabbar-item icon="browsing-history" to="/find">发现</van-tabbar-item>
        <van-tabbar-item icon="manager" to="me">我</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      icon: {
        active: 'https://img.yzcdn.cn/vant/user-active.png',
        inactive: 'https://img.yzcdn.cn/vant/user-inactive.png'
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
  /*.van-tabbar {*/
  /*  background-color: #F9F9F9;*/
  /*}*/
</style>
