<template>
  <div class="content_Box">
    <van-nav-bar
      title="聊天室"
      left-text="退出"
      @click-left="onClickLeft"
    />
    <van-notice-bar
      color="#1989fa"
      background="#ecf9ff"
      left-icon="volume-o"
      v-if="loginmsg"
    >
      {{loginuser}}上线了
    </van-notice-bar>
    <van-notice-bar left-icon="volume-o" v-if="outmsg">
      {{outuser}}离开了
    </van-notice-bar>
    <div class="content">
      <div class="box" id="hua">
        <div class="content_wx" v-for="(item,i) in socketsMessageList" :key="i">
          <div :class="item.commentator === user ? 'msgbox_r clearfix' : 'msgbox_l'">
            <van-image
              :class="item.commentator === user ? 'msgbox_img_r' : 'msgbox_img_l'"
              width="48"
              height="48"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
            <span :class="item.commentator === user ? 'msgbox_title_r' : 'msgbox_title_l'">{{item.commentator}}</span>
            <div :class="item.commentator === user ? 'chat-bubble_r chat-bubble-right' : 'chat-bubble_l chat-bubble-left'">
              {{item.commentContent}}
            </div>
          </div>
        </div>
      </div>
    <div class="footer_input">
      <van-field
        v-model="messageForm.commentContent"
        rows="1"
        autosize
        type="textarea"
        placeholder="请输入内容"
      >
        <van-button slot="button" size="small" type="primary" @click="gomsg">发送</van-button>
      </van-field>
    </div>
  </div>
<!--  <el-container>-->
<!--    <el-main>-->
<!--      <el-card style="text-align: center">-->
<!--        说一句话吧 ~ {{ username ? username : messageForm.commentator }}-->
<!--      </el-card>-->
<!--       <el-card class="container" v-if="messagelist !== []">-->
<!--         <div class="msg_box" id="hua">-->
<!--          <div class="hua" v-for="(item,i) in socketsMessageList" :key="i">-->
<!--            <span class="ator">{{ item.commentator }}</span><el-tag size="mini" type="info">迷人可爱</el-tag>-->
<!--            <p class="time">{{ item.commentDate | dateFormat }}</p>-->
<!--            <p class="content">{{ item.commentContent }}</p>-->
<!--            <el-divider></el-divider>-->
<!--          </div>-->
<!--         </div>-->
<!--       </el-card>-->
<!--      <div class="footer" v-scroll>-->
<!--        <el-input-->
<!--          placeholder="请输入内容"-->
<!--          v-model="messageForm.commentContent">-->
<!--        </el-input>-->
<!--        <el-button type="primary" :loading="loading" @click="gomsg">发送</el-button>-->
<!--      </div>-->
<!--    </el-main>-->
<!--  </el-container>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      messageForm: {
        commentator: '',
        commentDate: Date.now(),
        commentContent: ''
      },
      socketsMessageList: [],
      messagelist: [],
      msg: 'ss',
      loading: false,
      user: '',
      loginuser: '',
      loginmsg: false,
      outuser: '',
      outmsg: false
    }
  },
  directives: {
    scroll: {
      inserted(el) {
        el.scrollIntoView()
      }
    }
  },
  computed: {
    ...mapState({
      username: state => state.username
    })
  },
  updated() {
    let ele = document.getElementById('hua')
    ele.scrollTop = ele.scrollHeight
  },
  mounted() {
    this.getMessageList()
    this.getname()
    this.getsocket()
    this.getlogin()
    this.getlogout()
    // this.scrollToBottom()
  },
  sockets: {
    connect: function () {
      console.log('已连接')
    },
    disconnect() {
      console.log('断开链接')
      this.$socket.emit('logout', this.user)
    } // 检测socket断开链接
    // 客户端接收后台传输的socket事件
  },
  methods: {
    onClickLeft() {
      this.$router.push('/login')
      sessionStorage.clear()
      this.$socket.emit('logout', this.user)
    },
    getlogin() {
      this.sockets.subscribe('logincount', (data) => {
        this.loginuser = data
        this.loginmsg = true
        setTimeout(() => {
          this.loginmsg = false
        }, 5000)
      })
    },
    getlogout() {
      this.sockets.subscribe('logoutuser', (data) => {
        this.outuser = data
        this.outmsg = true
        setTimeout(() => {
          this.outmsg = false
        }, 5000)
      })
    },
    getsocket() {
      this.sockets.subscribe('msg', (data) => {
        console.log(data)
        this.socketsMessageList.push(data)
        console.log(this.socketsMessageList)
      })
    },
    getname() {
      this.user = window.sessionStorage.getItem('name')
      console.log(this.user)
    },
    async gomsg() {
      // this.messageForm.commentator = this.$store.state.username
      this.messageForm.commentator = window.sessionStorage.getItem('name')
      if (this.messageForm.commentContent === '') {
        return this.$notify('不能发送空内容')
      } else {
        const { data: res } = await this.$http.post('/message/messages', this.messageForm)
        if (res.status !== '200') {
          return this.$message.error('发表评论失败')
        } else {
          this.$notify({
            type: 'success',
            message: '已发送'
          })
          // 推送sokets信息
          this.$socket.emit('message', this.messageForm)
          this.messageForm.commentContent = ''
          // this.getMessageList()
        }
      }
    },
    async getMessageList() {
      const { data: res } = await this.$http.get('/message/messages')
      if (res.status !== '200') {
        return this.$message.error('获取评论列表失败')
      } else {
        this.messagelist = res.result.reverse()
        this.socketsMessageList = res.result.reverse()
        // console.log(this.messagelist)
      }
    }

  }
}
</script>

<style lang="less" scoped>
  .footer_input {
    position: absolute;
    width: 100%;
    bottom: 0;
    background: #ccc;
  }
  .msgbox_qp {
    float: right;
    position:relative;
    right:5px;
    width:auto;
    max-width:180px;
    min-height:32px;
    line-height: 32px;
    padding: 2px 8px;
    font-size: 14px;
    background:#F8C301;
    border-radius:5px; /* 圆角 */
    margin:10px 0px;
  }
  .arrow {
    position:absolute;
    top:5px;
    right:-16px; /* 圆角的位置需要细心调试哦 */
    width:0;
    height:0;
    font-size:0;
    border:solid 8px;
    border-color:#f5f5f5 #f5f5f5 #f5f5f5 #F8C301;
  }
  .msgbox_l {
     margin-top: 60px;
     margin-left: 10px;
     position: relative;
   }
  .msgbox_r {
    margin-top: 60px;
    position: relative;
  }
  .clearfix:after {
    content: ".";
    display: block;
    height: 52px;
    visibility: hidden;
    clear: both;
  }
  .clearfix {
    *zoom: 1;
  }
  .msgbox_img_l {
  }
  .msgbox_title_l {
    font-size: 10px;
    position: absolute;
    margin-left: 10px;
  }
  .msgbox_img_r {
    position: absolute;
    right: 10px;
  }
  .msgbox_title_r {
    font-size: 10px;
    position: absolute;
    right: 68px;
  }
  .chat-bubble_l{
    font-size: 12px;
    position: absolute;
    left: 55px;
    top: 15px;
    margin:12px;
    padding:5px 8px;
    word-break: break-all;
    background:#fff;
    border: 1px solid #eee;
    border-radius: 5px;
    max-width:180px;
  }
  .chat-bubble_r{
    font-size: 12px;
    position: absolute;
    right: 65px;
    top: 15px;
    margin:12px;
    padding:5px 8px;
    word-break: break-all;
    background:springgreen;
    border: 1px solid #eee;
    border-radius: 5px;
    max-width:180px;
  }

  .chat-bubble-left {}
  .chat-bubble-left:before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: -20px;
    top:5px;
    border: 10px solid;
    border-color:transparent #eee transparent  transparent ;
  }
  .chat-bubble-left:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left:-16px;
    top:7px;
    border: 8px solid;
    border-color:transparent #ffffff transparent  transparent ;
  }
  .chat-bubble-right {}
  .chat-bubble-right:before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    right: -20px;
    top:5px;
    border: 10px solid;
    border-color:transparent transparent transparent #eee;
  }
  .chat-bubble-right:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    right:-16px;
    top:7px;
    border: 8px solid;
    border-color:transparent transparent transparent springgreen ;
  }
  .content_Box {
    height: 100%;
    overflow: hidden
  }
  .van-nav-bar {
  }
  .footer_input {
  }
  .content {
    height: 82%;
    .box {
      height: 100%;
      overflow: auto;
    }
  }
  .van-notice-bar {
    position: relative;
  }
</style>
