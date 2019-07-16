<template>
    <div>
        <el-select :value="value" @change="fn">
            <el-option  v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
         </el-select>
    </div>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    fn (value) {
      this.$emit('input', value)
    },
    //   获取频道列表
    async getData () {
      const { data: { data } } = await this.$http.get('channels')
      //   console.log(data)
      this.channelOptions = data.channels
    }
  }
}
</script>

<style lang="less" scoped>
</style>
