<template>
    <div class="article-container">
        <!-- 筛选容器 -->
        <el-card class="header-card">
            <!-- 筛选条件，筛选头 slot插槽 -->
            <div slot="header">
            <!-- 面包屑导航 -->
                <my-bread>内容管理</my-bread>
            </div>
            <!-- 表单 size="small" label-width="80px"-->
            <el-form  :model="reqParams"  >
                <el-form-item label="状态">
                    <el-radio-group v-model="reqParams.status">
                        <el-radio :label="null">全部</el-radio>
                        <el-radio :label="0">草稿</el-radio>
                        <el-radio :label="1">待审核</el-radio>
                        <el-radio :label="2">审核通过</el-radio>
                        <el-radio :label="3">审核失败</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="频道">
                    <my-channel v-model="reqParams.channel_id"></my-channel>
                </el-form-item>
                <el-form-item label="时间">
                    <div class="block">
                        <el-date-picker
                        v-model="dateValues"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="shai()">筛选</el-button>
                </el-form-item>
            </el-form>

        </el-card>
        <!-- 容器内容 -->
         <el-card class="content-card">
             <div slot="header" >
                 根据筛选条件共查询到 <b>{{ total }}</b>条结果：
            </div>
            <el-table  :data="articles">
                <el-table-column label="封面"  >
                    <template slot-scope="scope">
                        <el-image :src="scope.row.cover.images[0]" style="width:100px;height:75px">
                            <div slot="error" class="image-slot">
                            <img src="../../assets/images/error.gif" alt="" width="100" height="75">
                        </div>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="标题"  ></el-table-column>
                <el-table-column prop="status" label="状态"  >
                    <template slot-scope="scope">
                        <el-tag type="info" v-if="scope.row.status === 0">草稿</el-tag>
                        <el-tag v-if="scope.row.status===1">待审核</el-tag>
                        <el-tag type="success" v-if="scope.row.status===2">审核通过</el-tag>
                        <el-tag type="warning" v-if="scope.row.status===3">审核失败</el-tag>
                        <el-tag type="danger" v-if="scope.row.status===4">已删除</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="pubdate" label="发布时间" ></el-table-column>
                <el-table-column  label="操作" width="120px" >
                    <template slot-scope="scope">
                        <el-button type="primary" plain circle icon="el-icon-edit" @click="edit(scope.row.id)"></el-button>
                        <el-button type="danger" plain circle  icon="el-icon-delete" @click="del(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="box">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="changePage"
                    :current-page="reqParams.page"
                    :page-size="reqParams.per_page"
                    :total="total"
                    ></el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
// 导入面包屑插槽
// import MyBread from '@/components/my-bread.vue'

export default {
//   components: {
//     MyBread
//   },
  data () {
    return {
      reqParams: {
        page: 1,
        per_page: 10,
        //   文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      //   默认频道数据
      // channelOptions: [],
      // 日期组件的数据
      dateValues: [],
      //   表格获取到的文章内容
      articles: [],
      total: 0
    }
  },
  created () {
    // this.getChannel()
    this.getArticles()
  },
  methods: {
    //   频道列表获取
    // async getChannel () {
    //   const { data: { data } } = await this.$http.get('channels')
    //   this.channelOptions = data.channels
    // },
    // 获取文章列表信息
    async getArticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
      console.log(data.results)
      // console.log(this.reqParams.channel_id)
    },
    // 选中时间，开始和结束的时间重新赋值
    changeDate (values) {
      this.reqParams.begin_pubdate = values[0]
      this.reqParams.end_pubdate = values[1]
    },
    // 筛选
    shai () {
      this.getArticles()
    },
    // 当前页发生改变的时候触发的事件
    changePage (newPage) {
      // 当前点击的页面提交给后台
      this.reqParams.page = newPage
      this.getArticles()
    },
    // 编辑功能
    edit (id) {
      // 传参对象的形式，query来传参
      this.$router.push({ path: '/publish', query: { id } })
    },
    // 删除
    del (id) {
      this.$confirm('亲，此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`articles${id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-card{
    margin-bottom: 20px;
}
.box{
    text-align: center;
}
</style>
