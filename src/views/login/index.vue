<template>
    <div class="login-container">
        <el-card class="login-card">
            <el-form class="login-form" status-icon :rules="LoginRules" :model="LoginForm" ref="LoginForm">
                <el-form-item class="pic">
                    <img src="../../assets/images/logo_index.png" alt="" style="width:50%">
                </el-form-item>
                <el-form-item prop="mobile" >
                    <el-input placeholder="请输入手机号" v-model="LoginForm.mobile" >
                        <span class="el-icon-circle-check"></span>
                    </el-input>

                </el-form-item>
                <el-form-item prop="code">
                    <el-input placeholder="请输入验证码" v-model="LoginForm.code" style="width:70%" class="mobile"></el-input>
                    <el-button type="primary" plain>发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="checked" class="check"></el-checkbox>
                    我已阅读并同意
                    <el-link type="primary" :underline="false">用户协议</el-link>
                    和
                    <el-link type="primary" :underline="false">隐私条款</el-link>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width:100%" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    //   自定义规则，手机号
    const MobileCheck = (rule, value, callback) => {
      // \d{9} 表示后9位都是数字
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不正确'))
      }
    }
    return {
      LoginForm: {
        mobile: '18438626320',
        code: '246810'
      },
      checked: true,
      LoginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: MobileCheck, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码格式错误', trigger: 'blur' }

        ]
      }
    }
  },
  methods: {
    login () {
    //   整体表单验证
      // this.$refs.LoginForm.validate((valid) => {
      //   if (valid) {
      //     this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.LoginForm)
      //       .then(res => {
      //         if (res.status === 201) {
      //           // console.log(res)
      //           // 先获取token再跳转
      //           window.sessionStorage.setItem('hm02', JSON.stringify(res.data.data))
      //           this.$router.push('/')
      //           // 设置 token
      //         }
      //       }).catch(() => {
      //         this.$message.error('用户名或密码错误')
      //       })
      //   } else {
      //     return false
      //   }
      // })

      // await 与 aysnc使用
      this.$refs.LoginForm.validate(async valid => {
        if (valid) {
          try {
            // 发送axios请求，验证用户信息
            const res = await this.$http.post('authorizations', this.LoginForm)
            window.sessionStorage.getItem('hm02', JSON.stringify(res.data.data))
            this.$router.push('/')
          } catch (err) {
            this.$message.error('用户名或密码错误')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container{
    width:100%;
    height:100%;
    position:absolute;
    left:0;
    top:0;
    background: url(../../assets/images/login_bg.jpg) no-repeat center/cover;
    .login-card{
        width: 450px;
        height: 350px;
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        .login-form{
            .pic{
                // display:block;
                text-align: center;
            }
            .mobile{
                margin-right:10px;
            }
            .check{
                margin-right: 5px;
            }
        }
    }
}
</style>
