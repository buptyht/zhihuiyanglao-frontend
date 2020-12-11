<template>
  <a-card title="用户信息" :bordered="false">
    <div id="left">
      <img :src="values.photo" />
      <a-upload
        name="photo"
        action="http://localhost:8000/api/infoManage/userInfo/uploadPhoto"
        :headers="headers"
        @change="handleChange"
        :showUploadList="false"
      >
        <a-button> <a-icon type="upload" /> Click to Upload </a-button>
      </a-upload>
      <alarm></alarm>
    </div>
    <div id="right">
      <a-descriptions bordered>
        <a-descriptions-item label="本人身份证号">{{ values.identityId }}</a-descriptions-item>
        <a-descriptions-item label="本人名字"> {{ values.userName }} </a-descriptions-item>
        <a-descriptions-item label="所在国家"> {{ values.country }} </a-descriptions-item>
        <a-descriptions-item label="所在省份"> {{ values.province }} </a-descriptions-item>
        <a-descriptions-item label="所在城市"> {{ values.city }} </a-descriptions-item>
        <a-descriptions-item label="所在区县">{{ values.region }} </a-descriptions-item>
        <a-descriptions-item label="所在详细地址">{{ values.address }} </a-descriptions-item>
        <a-descriptions-item label="所在经度"> {{ values.longitude }} </a-descriptions-item>
        <a-descriptions-item label="所在纬度"> {{ values.latitude }}</a-descriptions-item>
        <a-descriptions-item label="本人联系电话">{{ values.phoneNumber }} </a-descriptions-item>
        <a-descriptions-item label="本人有无医保">{{ values.healthCare ? '有' : '无' }}</a-descriptions-item>
        <a-descriptions-item label="本人上层组织ID"> {{ values.orgId }}</a-descriptions-item>
        <a-descriptions-item label="本人健康状况"> {{ values.healthState ? '良好' : '较差' }}</a-descriptions-item>
        <a-descriptions-item label="本人平台余额"> {{ values.residueMoney }}</a-descriptions-item>
        <a-descriptions-item label="创建者"> {{ values.createdBy }}</a-descriptions-item>
        <a-descriptions-item label="更新者" :span="3"> {{ values.updatedBy }}</a-descriptions-item>
      </a-descriptions>
      <a-button type="primary" class="editbtn" @click="onClick">编辑用户信息</a-button>
      <a-button type="primary" @click="$router.push('userInfoManage')">跳转到用户信息列表</a-button>
      <my-modal ref="mymodal" @ok="setNewValue"></my-modal>
    </div>
  </a-card>
</template>

<script>
import { axios } from '@/utils/request'
import MyModal from './modules/MyModal'
import Alarm from './modules/Alarm.vue'

export default {
  name: 'UserInfo',
  components: {
    MyModal,
    Alarm
  },
  data() {
    return {
      values: {},
      headers: {
        // authorization: 'authorization-text',
        token: this.$store.state.user.token,
      },
    }
  },
  methods: {
    onClick() {
      this.$refs.mymodal.visible = true
      var values = JSON.parse(JSON.stringify(this.values))
      values.healthCare = values.healthCare ? 'true' : 'false'
      values.healthState = values.healthState ? 'true' : 'false'
      console.log(this.values)
      console.log(values)
      this.$nextTick(() => {
        this.$refs.mymodal.form.setFieldsValue(values)
      })
    },
    getUserInfoValues() {
      return axios({
        url: '/infoManage/userInfo/get/' + this.$store.state.user.userId,
        method: 'get',
      })
    },
    setNewValue() {
      this.getUserInfoValues()
        .then((res) => {
          console.log(res)
          this.values = res
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
        this.setNewValue()
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
  },
  created() {
    this.getUserInfoValues()
      .then((res) => {
        console.log(res)
        this.values = res
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
</script>
<style scoped>
#left{
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
  padding-bottom: 10px;
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
