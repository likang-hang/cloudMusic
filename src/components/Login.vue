<template>
<div class="lg">
  <div class="lg-select-box" :style="selectVisible">
    <div class="lg-top">
      <span class="lg-select-font">登录</span>
    </div>
    <div class="lg-select-contain">
      <div class="lg-select-icon"></div>
      <div class="lg-methods">
        <ul>
          <li><a href="javascript:;" @click=iphoneLoginVisible><i class="lg-iphone"></i><span>手机号登录</span></a></li>
          <li><a href="javascript:;" @click="emailLoginVisible"><i class="lg-email"></i><span>网易邮箱登陆</span></a></li>
        </ul>
        <el-button type="primary" round class="lg-btn" size="mini" @click="getRegist">注册</el-button>
      </div>
      <div class="lg-clause">
        <input type="checkbox" :checked="acceptClause" @change="changeClauseStatus">
        <label for="clause">同意</label>
        <a href="https://st.music.163.com/official-terms/service" target="_blank">《服务条款》</a>
        <a href="https://st.music.163.com/official-terms/privacy" target="_blank">《隐私政策》</a>
        <a href="https://st.music.163.com/official-terms/children" target="_blank">《儿童隐私政策》</a>
      </div>
    </div>
  </div>
  <div class="lg-iphone-box" :style="iphoneVisible">
    <div class="lg-iphone-top">
      <span class="lg-iphone-font">手机号登录</span>
      <span class="lg-iphone-closed" @click="backSelectView">×</span>
    </div>
    <div class="lg-iphone-contain">
      <div class="lg-iphone-form">
        <el-form ref="iphoneFormRef" :model="iphoneForm"  label-width="80px" :rules="iphoneRules" hide-required-asterisk>
          <el-form-item size="mini" prop="iphone">
            <el-input  v-model="iphoneForm.iphone" class="iphone-input" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item size="mini" prop="password">
            <el-input type="password" v-model="iphoneForm.password" class="iphone-input" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="mini" @click="iphoneLogin">登录</el-button>
      </div>
      <div class="lg-iphone-back">
        <a href="javascript:;" class="lg-iphone-other" @click="backSelectView">&lt; 其他方式登录</a>
        <a href="javascript:;" class="lg-iphone-regist" @click="goRegist">没有账号？免费注册 &gt;</a>
      </div>
    </div>
  </div>
  <div class="lg-regist-box" :style="registVisible">
    <div class="regist-top">
      <span class="lg-regist-font">注册</span>
    </div>
    <div class="regist-contain">
      <el-form :label-position="registFormPosition" label-width="80px" :model="registForm" :rules="registFormRule" ref="registRef" hide-required-asterisk>
        <el-form-item label="手机号码" prop="registIphone" size="mini" class="regist-form">
          <el-input v-model="registForm.phone"></el-input>
          <el-button type="primary" @click="sendCaptcha">发送验证码</el-button>
        </el-form-item>
        <el-form-item label="验证码" size="mini" class="captcha-input">
          <el-input v-model="registForm.captcha"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname" size="mini">
          <el-input v-model="registForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" size="mini">
          <el-input v-model="registForm.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <button @click="regist" class="regist-btn">注册</button>
    </div>
    <div class="regist-foot">
      <a href="javascript:;" class="lg-iphone-other" @click="backLogin">&lt; 返回登录</a>
    </div>
  </div>
  <div class="lg-email-box" :style="emailVisible">
    <div class="lg-iphone-top">
      <span class="lg-iphone-font">网易邮箱登录</span>
      <span class="lg-iphone-closed" @click="emailBackSelectView">×</span>
    </div>
    <div class="lg-iphone-contain">
      <div class="lg-iphone-form">
        <el-form ref="emailFormRef" :model="emailForm"  label-width="80px" :rules="emailRules" hide-required-asterisk>
          <el-form-item size="mini" prop="email">
            <el-input  v-model="emailForm.email" class="iphone-input" placeholder="请输入网易邮箱"></el-input>
          </el-form-item>
          <el-form-item size="mini" prop="password">
            <el-input type="password" v-model="emailForm.password" class="iphone-input" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="mini" @click="emailLogin">登录</el-button>
      </div>
      <div class="lg-iphone-back">
        <a href="javascript:;" class="lg-iphone-other" @click="choiseSelectView">&lt; 其他方式登录</a>
        <a href="javascript:;" class="lg-iphone-regist" @click="emailToRegist">没有账号？免费注册 &gt;</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    var checkIphone = (rules, value, callback) => {
      var iponeRule = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if(iponeRule.test(value)) {
        return callback()
      } else {
        return callback(new Error('请输入正确的手机号'))
      }
    }
    return {
      iphoneForm: {
        iphone: '17355488792',
        password: 'mitang126037'
      },
      selectVisible: {
        display: 'block'
      },
      iphoneVisible: {
        display: 'none'
      },
      registVisible: {
        display: 'none'
      },
      emailVisible: {
        display: 'none'
      },
      acceptClause: false,
      iphoneRules: {
        iphone: [
        { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      registFormPosition: 'top',
      registForm: {
        captcha: '',
        phone: '17355488792',
        password: 'mitang1999',
        nickname: '两面宿傩'
      },
      registFormRule: {
        iphone: [
        { required: true, message: '请输入手机号码', trigger: 'blur' },
        { validator: checkIphone, trigger: 'blur' }
        ],
        nickname: [
        { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '最小长度为6个字符', trigger: 'blur' },
        { max: 20, message: '最大长度为20个字符', trigger: 'blur' }
        ]
      },
      emailForm: {
        email: '',
        password: ''
      },
      emailRules: {
        email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '最小长度为6个字符', trigger: 'blur' },
        { max: 20, message: '最大长度为20个字符', trigger: 'blur' }
        ]
      },
      // 节流标志位
      limitClickFlag: true
    }
  },
  methods: {
    // 是否同意条款
    changeClauseStatus() {
      this.acceptClause = !this.acceptClause
    },
    // 从手机登录回到选择登录界面
    backSelectView() {
      this.selectVisible = { display: 'block' }
      this.iphoneVisible = { display: 'none' }
    },
    // 当使用手机登录时，隐藏选择登录方式盒子，显示手机登录盒子
    iphoneLoginVisible() {
      // console.log(this.acceptClause)
      if(this.acceptClause === true) {
      this.selectVisible = { display: 'none' }
      this.iphoneVisible = { display: 'block' }
      } else {
        this.$message.warning('请先勾选同意《服务条款》《隐私政策》《儿童隐私政策》')
      }
    },
    // 手机登录请求
    iphoneLogin() {
      this.$refs.iphoneFormRef.validate(async (valid) => {
      if (valid) {
      const { data: res } = await this.$http.get(`/login/cellphone?phone=${this.iphoneForm.iphone}&password=${this.iphoneForm.password}`)
      console.log(res)
      if(res.code === 200) {
              this.$router.push('/index')
              window.localStorage.userId = res.account.id
              window.cookie = res.cookie
            } else {
              this.$message.error('登录失败')
            }
        } else {
          this.$message.error('格式错误')
          return false
        }
      })
    },
    // 发送验证码
    async sendCaptcha() {
            const { data: res } = await this.$http.get(`/captcha/sent?phone=${this.registForm.phone}`)
            console.log(res)
    },
    // 验证验证码正确性并注册
    regist() {
      this.$refs.registRef.validate(async (valid) => {
        // console.log(valid)
          if (valid) {
            const { data: res } = await this.$http.get(`/captcha/verify?phone=${this.registForm.phone}&captcha=${this.registForm.captcha}`)
            console.log(res.code)
            // 验证码正确
            if(res.code === 200) {
              // 发起注册请求
              const { data: res } = await this.$http.get(`/register/cellphone?phone=${this.registForm.phone}&password=${this.registForm.password}&captcha=${this.registForm.captcha}&nickname=${this.registForm.nickname}`)
              console.log(res)
              if(res.code === 200) {
                this.$message.success('注册成功')
                this.registVisible = { display: 'none' }
                this.iphoneVisible = { display: 'block' }
              } else {
                this.$message.error('注册失败')
              }
            } else {
              this.$message.error('验证码错误')
            }
          } else {
            this.$message.error('格式错误')
            return false
          }
        })
    },
    // 从手机登录到注册页面
    goRegist() {
      this.iphoneVisible = { display: 'none' }
      this.registVisible = { display: 'block' }
    },
    // 从注册到手机登录
    backLogin() {
      this.registVisible = { display: 'none' }
      this.iphoneVisible = { display: 'block' }
    },
    // 从选择界面到注册界面
    getRegist() {
      if(this.acceptClause === true) {
        this.selectVisible = { display: 'none' }
        this.registVisible = { display: 'block' }
      } else {
        this.$message.warning('请先勾选同意《服务条款》《隐私政策》《儿童隐私政策》')
      }
    },
    emailBackSelectView() {
      this.emailVisible = { display: 'none' }
      this.selectVisible = { display: 'block' }
    },
    emailLogin() {
      this.$refs.emailFormRef.validate(async (valid) => {
      if (valid) {
      const { data: res } = await this.$http.get(`/login?email=${this.emailForm.emai}&password=${this.emailForm.password}`)
      console.log(res)
      if(res.code === 200) {
              this.$router.push('/index')
            } else {
              this.$message.error('登录失败')
            }
        } else {
          this.$message.error('格式错误')
          return false
        }
      })
    },
    choiseSelectView() {
      this.emailVisible = { display: 'none' }
      this.selectVisible = { display: 'block' }
    },
    emailToRegist() {
      this.emailVisible = { display: 'none' }
      this.registVisible = { display: 'block' }
    },
    emailLoginVisible() {
      if(this.acceptClause === true) {
      this.selectVisible = { display: 'none' }
      this.emailVisible = { display: 'block' }
      } else {
        this.limitClick()
      }
    },
    async limitClick() {
      console.log(this.limitClickFlag)
      if(this.limitClickFlag) {
        this.limitClickFlag = false
      await setTimeout(() => {
          this.$message.warning('请先勾选同意《服务条款》《隐私政策》《儿童隐私政策》')
          this.limitClickFlag = true
        }, 2000)
      }
    }
  }
}
</script>

<style scoped>
  .lg {
    width: 100%;
    height: 100%;
    background-color: #a19ca1;
    position: relative;
  }
  .lg-select-box {
    /* display: none; */
    position: absolute;
    left: 50%;
    margin-left: -275px;
    top: 50%;
    margin-top: -175px;
    width: 550px;
    height: 350px;
    background-color: #fff;
  }
  .lg-regist-box {
    position: absolute;
    /* display: none; */
    left: 50%;
    margin-left: -275px;
    top: 50%;
    margin-top: -225px;
    width: 550px;
    height: 450px;
    background-color: #fff;
  }
  .lg-top, .lg-iphone-top, .regist-top {
    width: 550px;
    height: 40px;
    background-color: #2d2d2d;
    display: flex;
    justify-content: space-between;
  }
  .lg-select-font, .lg-iphone-font, .lg-regist-font {
    color: #fff;
    line-height: 40px;
    font-size: 15px;
    font-weight: 700;
    margin-left: 10px;
  }
 .lg-iphone-closed {
    margin-top: 7px;
    margin-right: 15px;
    font-size: 17px;
    color: #fff;
    cursor: pointer;
  }
  .lg-select-contain {
    position: relative;
    width: 550px;
    height: 310px;
    background-color: #365f722c;
  }
  .lg-select-icon {
    position: absolute;
    left: 50%;
    margin-left: -77px;
    top: 13%;
    margin-top: -17px;
    width: 155px;
    height: 35px;
    background: url(../assets/topbar.png);
    background-position: 0 -19px;
  }
  .lg-methods {
    position: absolute;
    left: 50%;
    margin-left: -56px;
    top: 25%;
  }
  .lg-methods li {
    list-style: none;
    height: 25px;
    margin: 10px 0;
  }
  .lg-methods ul {
    padding: 0;
    margin: 0;
  }
  .lg-methods a {
    display: inline-block;
    text-decoration: none;
    color: #000;
    height: 25px;
  }
  .lg-methods a:hover {
    text-decoration: underline;
  }
  .lg-methods a .lg-iphone {
    display: inline-block;
    width: 25px;
    height: 25px;
    background: url(../assets/logo\ \(1\).png);
    background-position: -140px 0;
    margin-right: 3px;
    vertical-align: middle;
  }
  .lg-methods a span {
    font-size: 14px;
  }
  .lg-methods a .lg-email {
    display: inline-block;
    width: 25px;
    height: 25px;
    background: url(../assets/logo\ \(1\).png);
    background-position: -110px 0;
    margin-right: 3px;
    vertical-align: middle;
  }
  .lg-methods .lg-btn {
    width: 100px;
    margin-left: 12px;
    margin-top: 15px;
  }
  .lg-clause {
    position: absolute;
    left: 30%;
    margin-left: -40px;
    top: 75%;
    font-size: 14px;
  }
  .lg-clause a {
    text-decoration: none;
    color: #507DAF;
  }
  .lg-iphone-box, .lg-email-box {
    position: absolute;
    left: 50%;
    margin-left: -275px;
    top: 45%;
    margin-top: -150px;
    width: 550px;
    height: 400px;
    background-color: #fff;
  }
  .lg-iphone-form {
    box-sizing: border-box;
    height: 300px;
    padding: 70px 0 0 70px;
  }
   .iphone-input {
    /* padding: 50px; */
    width: 240px;
  }
  .lg-iphone-form .el-button {
    width: 240px;
    margin-left: 80px;
  }
  .lg-iphone-form .el-button:hover {
    background-color: #82bdee;
  }
  .lg-iphone-back {
    height: 30px;
    /* line-height: 30px; */
    border-top: 1px solid #c6c6c6;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    padding-top: 20px;
  }
  .lg-iphone-other {
    color: #0c72c3;
    margin-left: 10px;
    font-size: 12px;
  }
  .lg-iphone-back .lg-iphone-regist {
    color: #b3b3b3;
    margin-right: 10px;
  }
  .lg-regist-box .el-form {
    padding-top: 10px;
    margin: auto;
    width: 280px;
  }
  .lg-regist-box .el-form .el-button {
    margin-top: 8px;
  }
  .regist-btn {
    display: block;
    width: 100px;
    margin: auto;
    background-color: rgb(75, 163, 71);
    cursor: pointer;
    border: none;
  }
  .regist-btn:hover {
    background-color: rgb(65, 201, 106);
  }
  .captcha-input {
    width: 80px;
  }
  .lg-regist-box .el-form .el-form-item {
    padding: 0;
    margin-bottom: 8px;
  }
  .regist-foot {
    margin-top: 10px;
  }
</style>
