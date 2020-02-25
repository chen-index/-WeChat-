<template>
  <div>
    <div class="header">
      <span class="title">通讯录</span>
      <van-divider />
    </div>
    <div class="container">
      <van-index-bar :sticky-offset-top="40" :sticky="false">
        <van-cell :clickable="true" title="新的朋友" />
        <van-cell :clickable="true" title="群聊" />
        <van-cell :clickable="true" title="标签" />
        <van-cell :clickable="true" title="公众号" />
        <van-index-anchor index="A" />
        <van-cell title="Aa" />
        <van-cell title="Aa" />
        <van-cell title="Aa" />

        <van-index-anchor index="B" />
        <van-cell title="Bb" />
        <van-cell title="Bb" />
        <van-cell title="Bb" />
        <van-cell title="Bb" />
        <van-cell title="Bb" />
        <van-cell title="Bb" />
        <van-cell title="Bb" />
        <van-cell title="Bb" />
        <van-cell title="Bb" />
        <van-cell title="Bb" />
        <van-cell title="Bb" />
        <van-cell title="Bb" />
        <van-index-anchor index="C" />
        <van-cell title="Cc" />
        <van-cell title="Cc" />
        <van-cell title="Cc" />
        <van-cell title="Cc" />
        <van-cell title="Cc" />
        <van-cell title="Cc" />
        <van-cell title="Cc" />
        <van-cell title="Cc" />
        <van-index-anchor index="H" />
        <van-cell title="Hh" />
        <van-cell title="Hh" />
        <van-cell title="Hh" />
        <van-cell title="Hh" />
        <van-cell title="Hh" />
        <van-cell title="Hh" />
        <van-cell title="Hh" />
        <van-cell title="Hh" />
        <van-index-anchor index="k" />
        <van-cell title="Kk" />
        <van-cell title="Kk" />
        <van-cell title="Kk" />
        <van-cell title="Kk" />
        <van-cell title="Kk" />
        <van-cell title="Kk" />
        <van-cell title="Kk" />
        <van-cell title="Kk" />
        <van-index-anchor index="P" />
        <van-cell title="Pp" />
        <van-cell title="Pp" />
        <van-cell title="Pp" />
        <van-cell title="Pp" />
        <van-cell title="Pp" />
        <van-cell title="Pp" />
        <van-cell title="Pp" />
        <van-cell title="Pp" />
        <van-index-anchor index="W" />
        <van-cell title="Ww" />
        <van-cell title="Ww" />
        <van-cell title="Ww" />
        <van-cell title="Ww" />
        <van-cell title="Ww" />
        <van-cell title="Ww" />
        <van-cell title="Ww" />
        <van-cell title="Ww" />
      </van-index-bar>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
  .header {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: white;
    .title {
      font-weight: bold;
      margin-left: 10px;
    }
  }
  .van-divider {
    margin: 0;
  }
  .container {
    padding-top: 50px;
  }
  .van-index-bar {
    height: 300px;
  }
</style>
