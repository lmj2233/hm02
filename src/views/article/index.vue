<template>
    <div class="article-container">
        <!-- 筛选容器 -->
        <el-card class="header-card">
            <!-- 筛选条件，筛选头 slot插槽 -->
            <div slot="header" class="clearfix">
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
                    <el-select v-model="reqParams.channel_id" placeholder="请选择">
                        <el-option
                        v-for="item in channelOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间">
                    <div class="block">
                        <el-date-picker
                        v-model="date"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">筛选</el-button>
                </el-form-item>
            </el-form>

        </el-card>
        <!-- 容器内容 -->
         <el-card class="content-card">
            <!-- 筛选条件，筛选头 -->
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
        //   文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败
        status: null,
        channel_id: null,
        begin_date: null,
        end_date: null
      },
      //   默认频道数据
      channelOptions: [{ name: '东方卫视', id: 1 }],
      date: []
    }
  }
}
</script>

<style lang="less" scoped>
.el-card{
    margin-bottom: 20px;
}
</style>
