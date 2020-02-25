<template>
  <div>
    <div class="header">
      <span class="title">发现</span>
      <van-divider />
    </div>
    <div class="container">
      <van-cell :clickable="true" title="朋友圈" icon="location-o" class="mbottom"/>
      <van-cell :clickable="true" title="视频号" icon="location-o" class="mbottom"/>

      <van-cell-group>
        <van-cell :clickable="true" title="扫一扫" icon="location-o" />
        <van-cell :clickable="true" title="摇一摇" class="mbottom" icon="location-o" />
      </van-cell-group>
      <van-cell-group>
        <van-cell :clickable="true" title="看一看" icon="location-o" />
        <van-cell :clickable="true" title="搜一搜" class="mbottom" icon="location-o" />
      </van-cell-group>

      <van-cell :clickable="true" title="附近的人" icon="location-o" class="mbottom" />

      <van-cell-group>
        <van-cell :clickable="true" title="购物" icon="location-o" />
        <van-cell :clickable="true" title="游戏" class="mbottom" icon="location-o" />
      </van-cell-group>

      <van-cell :clickable="true" title="小程序" class="mbottom" icon="location-o" />
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
    padding-top: 51px;
    background-color: #F9F9F9;
    height: 613px;
  }
  .mbottom {
    margin-bottom: 10px;
  }
</style>
