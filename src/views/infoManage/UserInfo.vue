<template>
  <a-card title="用户信息" :bordered="false">
    <div id="left"><img src="./timg.jpg" /></div>
    <div id="right">
      <a-descriptions bordered>
        <a-descriptions-item label="本人身份证号">{{ values.identityId }}</a-descriptions-item>
        <a-descriptions-item label="本人名字"> {{ values.userName }} </a-descriptions-item>
        <a-descriptions-item label="所在国家"> {{ values.country }} </a-descriptions-item>
        <a-descriptions-item label="所在省份"> {{ values.province }} </a-descriptions-item>
        <a-descriptions-item label="所在城市"> {{ values.city }} </a-descriptions-item>
        <a-descriptions-item label="所在区县">{{ values.region }} </a-descriptions-item>
        <a-descriptions-item label="所在详细地址">{{ values.address }} </a-descriptions-item>
        <a-descriptions-item label="所在经度"> {{ center.lng }} </a-descriptions-item>
        <a-descriptions-item label="所在纬度">{{ center.lat }} </a-descriptions-item>
        <a-descriptions-item label="本人联系电话">{{ values.phoneNumber }} </a-descriptions-item>
        <a-descriptions-item label="本人有无医保"> ---</a-descriptions-item>
        <a-descriptions-item label="本人上层组织ID"> {{ values.orgId }}</a-descriptions-item>
        <a-descriptions-item label="本人健康状况"> ---</a-descriptions-item>
        <a-descriptions-item label="本人平台余额"> {{ values.residueMoney }}</a-descriptions-item>
        <a-descriptions-item label="创建者"> {{ values.createdBy }}</a-descriptions-item>
        <a-descriptions-item label="更新者" :span="3"> {{ values.updatedBy }}</a-descriptions-item>
        <a-descriptions-item label="地图定位">  <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler"></baidu-map>
</a-descriptions-item>
      </a-descriptions>
      <a-button type="primary" class="editbtn" @click="$refs.mymodal.setVisibleTrue()">编辑用户信息</a-button>
      <my-modal ref="mymodal" @ok="setNewValue"></my-modal>
    </div>
  </a-card>
</template>

<script>
import MyModal from './modules/MyModal'
export default {
  name: 'UserInfo',
  components: {
    MyModal,
  },
  data() {
    return {
      values: {
        address: '长安街',
        city: '北京市',
        country: '中国',
        createdBy: 'yht',
        identityId: '100000195101010000',
        latitude: '39',
        longitude: '116',
        orgId: '1',
        phoneNumber: '18800000000',
        province: '北京市',
        region: '海淀区',
        residueMoney: '0.5',
        updatedBy: 'yht',
        userName: '马保国',
      },
      center: { lng: 0, lat: 0 },
      zoom: 3,
    }
  },
  methods: {
    setNewValue(values) {
      this.values = values
      console.log(this.values)
    },
    handler({ BMap, map }) {
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 15
      this.BMap = BMap
      this.map = map
    }
  },
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
