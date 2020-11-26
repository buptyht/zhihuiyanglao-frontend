<template>
  <a-card title="用户信息" :bordered="false">
    <div id="left"><img src="./timg.jpg" /></div>
    <div id="right">
      <a-descriptions bordered>
        <a-descriptions-item label="本人身份证号">100000194910010000</a-descriptions-item>
        <a-descriptions-item label="本人名字"> 马保国 </a-descriptions-item>
        <a-descriptions-item label="所在国家"> 中国 </a-descriptions-item>
        <a-descriptions-item label="所在省份"> 山东 </a-descriptions-item>
        <a-descriptions-item label="所在城市"> --- </a-descriptions-item>
        <a-descriptions-item label="所在区县">--- </a-descriptions-item>
        <a-descriptions-item label="所在详细地址">--- </a-descriptions-item>
        <a-descriptions-item label="所在经度"> --- </a-descriptions-item>
        <a-descriptions-item label="所在纬度"> --- </a-descriptions-item>
        <a-descriptions-item label="本人联系电话">--- </a-descriptions-item>
        <a-descriptions-item label="本人有无医保"> ---</a-descriptions-item>
        <a-descriptions-item label="本人上层组织ID"> ---</a-descriptions-item>
        <a-descriptions-item label="本人健康状况"> 良好</a-descriptions-item>
        <a-descriptions-item label="本人平台余额"> ---</a-descriptions-item>
        <a-descriptions-item label="创建者"> 杨昊天</a-descriptions-item>
        <a-descriptions-item label="更新者" :span="3"> 杨昊天</a-descriptions-item>
        <a-descriptions-item label="地图定位"> <baidu-map class="map" center="北京"> </baidu-map></a-descriptions-item>
      </a-descriptions>
      <a-button type="primary" class="editbtn">编辑用户信息</a-button>
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'UserInfo'
}
</script>
<style scoped>
#left {
  width: 10%;
  float: left;
}

#right {
  width: 90%;
  float: right;
}

img {
  width: 80%;
  margin: auto;
  display: block;
}
.map {
  width: 100%;
  height: 400px;
}
.editbtn {
  margin-top: 10px;
}
</style>
