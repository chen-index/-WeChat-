<template>
  <div class="container">
    <div class="header">
      <img src="../assets/logo.png" alt="">
    </div>
    <div class="context">
      <!-- 输入任意文本 -->
      <van-form @submit="login">
        <van-field
          v-model="ruleForm.username"
          name="用户名"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="ruleForm.nickname"
          name="昵称"
          label="昵称"
          placeholder="请输入昵称"
          :rules="[{ required: true, message: '请填写昵称' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
    <div class="footer_link">
      <span class="gduo" @click="alertMenu">更多</span>
    </div>
<!--    弹出层-->
    <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" round @cancel="toCancel" @select="onSelect" />
    <!--    <van-action-sheet v-model="show" :actions="actions" @select="onSelect"/>-->
<!--    <el-card class="login_container">-->
<!--      来这里记录你的一句话-->
<!--    </el-card>-->
<!--    <el-card class="login">-->
<!--      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">-->
<!--        <el-form-item label="请输入你的名字：" prop="name">-->
<!--          <el-input v-model="ruleForm.name"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="login">立即进入</el-button>-->
<!--          <el-button @click="qx">重置</el-button>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-link type="warning" @click="goregister">没有来过？去登记</el-link>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </el-card>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      msg: '',
      show: false,
      actions: [
        { name: '注册' }
      ],
      ruleForm: {
        username: '',
        nickname: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入你的名字', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      username: state => state.username
    })
  },
  sockets: {
    connect: function () {
      console.log('已连接')
    },
    disconnect() {
      console.log('断开链接')
    }, // 检测socket断开链接
    reconnect() {
      console.log('重新链接')
    },
    customEmit: function (data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
    // 客户端接收后台传输的socket事件
    // message(data) {
    //   this.$notify({
    //     title: '新消息',
    //     message: data,
    //     type: 'warning',
    //     duration: 10000
    //   })
    //   console.log('data', data) // 接收的消息
    // }
  },
  methods: {
    // 弹出层
    alertMenu() {
      this.show = true
    },
    onSelect(item) {
      this.goregister()
      this.show = false
    },
    toCancel() {
      // console.log('点击了取消')
    },
    goregister() {
      this.$router.push('/register')
    },
    qx() {
      this.$refs.ruleForm.resetFields()
    },
    async login() {
      const { data: res } = await this.$http.post('users/login', this.ruleForm)
      console.log(res)
      if (res.status !== '200') {
        return this.$notify('用户名或者昵称错误')
        // return this.$message.error('你需要登记进入')
      } else {
        this.$notify({
          type: 'success',
          message: '登录成功'
        })
        this.$store.dispatch('login', res.result.name)
        // console.log(this.user)
        // window.sessionStorage.setItem('user', res.result.user)
        // window.sessionStorage.setItem('role', res.result.role)
        // window.sessionStorage.setItem('username', res.result.username)
        // window.localStorage.setItem('_id', res.result._id)
        window.sessionStorage.setItem('gender', res.result.gender)
        window.sessionStorage.setItem('personality', res.result.personality)
        window.sessionStorage.setItem('_id', res.result._id)
        window.sessionStorage.setItem('name', res.result.name)
        this.$router.push('/wechat')
        // this.$router.push(`/backstage/${this.user._id}`)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .container {
    position: relative;
    height: 100%;
    .header {
      position: relative;
      height: 40%;
      img {
        width: 125Px;
        height: 125Px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }
  .btn {
    margin: 0 10px;
    margin-top: 40px;
  }
  .footer_link {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%,0);
    text-align: center;
    .gduo {
      font-size: 12px;
    }
  }

</style>
