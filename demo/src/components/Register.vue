<template>
  <div class="register_container">
    <van-nav-bar
      title="注册"
      left-text="返回"
      @click-left="onClickLeft"
    />
    <van-form @submit="register">
      <van-field
        v-model="ruleForm.username"
        name="用户名"
        label="用户名"
        placeholder="请输入用户名"
        :rules="[{ required: true, message: '请填写名字' }]"
      />
      <van-field
        v-model="ruleForm.nickname"
        name="昵称"
        label="昵称"
        placeholder="请输入昵称"
        :rules="[{ required: true, message: '请填写名字' }]"
      />
      <van-field
        readonly
        clickable
        name="picker"
        :value="ruleForm.gender"
        label="选择器"
        placeholder="点击选择性别"
        @click="showPicker = true"
        :rules="[{ required: true, message: '请选择性别' }]"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-field
        v-model="ruleForm.personality"
        rows="3"
        autosize
        label="留言"
        type="textarea"
        placeholder="请输入留言"
      />
      <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" @click="register">
            提交
          </van-button>
        </div>
    </van-form>
    <!--      <el-card>在这里记录你</el-card>-->
    <!--      <el-card class="register">-->
    <!--        <el-form label-width="100px" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">-->
    <!--          <el-form-item label="填写你的名字:" prop="name">-->
    <!--            <el-input v-model="ruleForm.name"></el-input>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label-width="100px" label="性别:" prop="gender">-->
    <!--            <el-select v-model="ruleForm.gender" placeholder="请选择你的性别">-->
    <!--              <el-option label="男" value="male"></el-option>-->
    <!--              <el-option label="女" value="female"></el-option>-->
    <!--            </el-select>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label-width="120px" label="填写你的个性宣言:" prop="personality">-->
    <!--            <el-input type="textarea" v-model="ruleForm.personality"></el-input>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item>-->
    <!--            <el-button type="primary" @click="register">立即记录</el-button>-->
    <!--            <el-button @click="qx">重置</el-button>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item>-->
    <!--            <el-link type="warning" @click="gologin">已经登记了?去输入你的大名</el-link>-->
    <!--          </el-form-item>-->
    <!--        </el-form>-->
    <!--      </el-card>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: ['男', '女'],
      showPicker: false,
      ruleForm: {
        username: '',
        nickname: '',
        gender: '',
        personality: '暂时没有什么宣言 ~',
        picture: '/wechat/cat.jpeg'
      }
      // rules: {
      //   name: [
      //     {required: true, message: '请输入你的名字', trigger: 'blur'},
      //     {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
      //   ],
      //   gender: [
      //     {required: true, message: '请选择性别', trigger: 'change'}
      //   ],
      //   personality: [
      //     {required: true, message: '请填写你的个人宣言', trigger: 'blur'}
      //   ]
      // }
    }
  },
  methods: {
    onConfirm(value) {
      this.ruleForm.gender = value
      this.showPicker = false
    },
    async register() {
      const { data: res } = await this.$http.post('/users/register', this.ruleForm)
      if (res.status !== '200') {
        // return this.$message.error('error')
        return this.$notify('注册失败')
      } else {
        this.$store.dispatch('register', res.result.name)
        this.$notify({
          type: 'success',
          message: '注册成功'
        })
        // this.$message.success('登记success')
        // window.sessionStorage.setItem('name', res.result.name)
        // window.sessionStorage.setItem('gender', res.result.gender)
        // window.sessionStorage.setItem('personality', res.result.personality)
        // window.localStorage.setItem('_id', res.result._id)
        window.sessionStorage.setItem('username', res.result.username)
        window.sessionStorage.setItem('nickname', res.result.nickname)
        window.sessionStorage.setItem('gender', res.result.gender)
        window.sessionStorage.setItem('personality', res.result.personality)
        window.sessionStorage.setItem('_id', res.result._id)
        this.$router.push('/news')
        console.log(res)
      }
    },
    onClickLeft() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
 .van-nav-bar {
   margin-bottom: 20%;
 }
</style>
