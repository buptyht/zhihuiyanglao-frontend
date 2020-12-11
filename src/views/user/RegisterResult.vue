<template>
  <a-result :isSuccess="true" :content="false" :title="description">
    <template #extra>
      <a-button size="large" style="margin-left: 8px" @click="goHomeHandle">返回首页</a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: 'RegisterResult',
  data() {
    return {
      description: '注册成功！',
    }
  },
  methods: {
    goHomeHandle() {
      this.$router.push({ name: 'login' })
    },
  },
}
</script>

<style scoped>
</style>
