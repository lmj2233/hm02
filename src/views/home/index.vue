<template>
    <el-container class="home-container">
        <el-aside :width="collapse?'64px':'200px'" class="home-aside">
            <div class="logo" :class="{close:collapse}"></div>
            <!-- :default-active 属性绑定 -->
            <el-menu
                :default-active="$route.path"
                background-color="#002833"
                text-color="#fff"
                active-text-color="#ffd04b"
                style="border-right:none"
                :collapse="collapse"
                :collapse-transition="false"
                router
            >
            <el-menu-item index="/">
                <i class="el-icon-house"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/publish">
                <i class="el-icon-s-promotion"></i>
                <span slot="title">发布文章</span>
            </el-menu-item>
            <el-menu-item index="/article" >
                <i class="el-icon-document"></i>
                <span slot="title">内容管理</span>
            </el-menu-item>
            <el-menu-item index="/comment">
                <i class="el-icon-chat-dot-square"></i>
                <span slot="title">评论管理</span>
            </el-menu-item>
            <el-menu-item index="/image">
                <i class="el-icon-picture"></i>
                <span slot="title">素材管理</span>
            </el-menu-item>
            <el-menu-item index="/fans">
                <i class="el-icon-present"></i>
                <span slot="title">我的粉丝</span>
            </el-menu-item>
            <el-menu-item index="/setting">
                <i class="el-icon-setting"></i>
                <span slot="title">个人设置</span>
            </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header class="home-header">
                <span class="el-icon-s-fold" style="" @click="open"></span>
                <span class="text">江苏传智播客教育科技有限公司</span>
                <el-dropdown class="person">
                    <span class="el-dropdown-link">
                        <img :src="avatar" alt="">
                        <b>{{name}}</b>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-setting" @click.native="setting()">个人设置</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-unlock" @click.native="logout()">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
</el-container>
</template>

<script>
export default {
  data () {
    return {
      collapse: false,
      name: '',
      avatar: ''
    }
  },
  //   在组件创建成功的时候，created()函数中获取个人信息
  created () {
    const user = JSON.parse(window.sessionStorage.getItem('hm02'))
    this.name = user.name
    this.avatar = user.photo
  },
  methods: {
    open () {
      this.collapse = !this.collapse
    },
    // 个人信息处的个人设置
    setting () {
      this.$router.push('/setting')
    },
    // 退出登录
    logout () {
      window.sessionStorage.removeItem('hm73-tt')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.home-container{
    width:100%;
    height:100%;
    position: absolute;
    left: 0;
    top: 0;
    .home-aside{
        height: 100%;
        background-color: #002833;
        // color:#ffd04b;
        .logo{
            height:60px;
            background:#002840 url(../../assets/images/logo_admin.png) no-repeat center / 140px ;
        }
        // .el-menu-vertical-demo{
        //     border-right:none
        // }
        .close{
            background-image:url(../../assets/images/logo_admin_01.png) ;
            background-size: 30px auto;
        }
    }
    .home-header{
        height: 60px;
        line-height: 60px;
        border-bottom: 2px solid #ddd;
        .el-icon-s-fold{
            font-size:26px;
            vertical-align: middle;
            margin-right: 5px;
        }
        .text{
            vertical-align: middle;
        }
        .person{
            float: right;
            img{
                width:30px;
                vertical-align: middle;
                margin-right: 5px;
            }
        }
    }
}
</style>
