<template>
  <a-card title="老人档案" :bordered="false">
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
    </div>
    <div id="right">
      <a-descriptions bordered>
        <a-descriptions-item label="现名">{{values.currentName}}</a-descriptions-item>
        <a-descriptions-item label="性别">{{values.gender}}</a-descriptions-item>
        <a-descriptions-item label="出生年月日">{{values.birthDate}}</a-descriptions-item>
        <a-descriptions-item label="曾用名">{{values.oldName}}</a-descriptions-item>
        <a-descriptions-item label="政治面貌">{{values.politicalStatus}}</a-descriptions-item>
        <a-descriptions-item label="职业">{{values.career}}</a-descriptions-item>
        <a-descriptions-item label="原籍">{{values.originHometown}}</a-descriptions-item>
        <a-descriptions-item label="宗教">{{values.religion}}</a-descriptions-item>
        <a-descriptions-item label="民族">{{values.nation}}</a-descriptions-item>
        <a-descriptions-item label="出生地">{{values.birthPlace}}</a-descriptions-item>
        <a-descriptions-item label="身份证号">{{values.idNumber}}</a-descriptions-item>
        <a-descriptions-item label="婚姻状况">{{values.maritalStatus}}</a-descriptions-item>
        <a-descriptions-item label="家庭住址">{{values.homeAddress}}</a-descriptions-item>
        <a-descriptions-item label="手机号">{{values.phoneNumber}}</a-descriptions-item>
        <a-descriptions-item label="邮箱">{{values.email}}</a-descriptions-item>
        <a-descriptions-item label="现实问题">{{values.realProblem}}</a-descriptions-item>
        <a-descriptions-item label="家庭状况">{{values.familySituation}}</a-descriptions-item>
        <a-descriptions-item label="教育史">{{values.educationHistory}}</a-descriptions-item>
        <a-descriptions-item label="健康状况">{{values.healthState}}</a-descriptions-item>
        <a-descriptions-item label="详细婚姻状况">{{values.maritalStatusExplicit}}</a-descriptions-item>
        <a-descriptions-item label="就业史">{{values.employmentHistory}}</a-descriptions-item>
        <a-descriptions-item label="以前与社会机构的接触">{{values.contactInstitutionHistory}}</a-descriptions-item>
        <a-descriptions-item label="兴趣爱好">{{values.hobby}}</a-descriptions-item>
        <a-descriptions-item label="其他需要说明的情况">{{values.otherSituation}}</a-descriptions-item>
      </a-descriptions>
      <a-button type="primary" class="editbtn" @click="$router.push('UpdateElderlyProfile')">修改老人档案</a-button>
    </div>
  </a-card>
</template>

<script>
import { axios } from "@/utils/request";
export default {
  name: "ElderlyProfile",
  components: {},
  data() {
    return {
      values: {},
      headers: {
        token: this.$store.state.user.token,
      },
    };
  },
  methods: {
    getElderlyProfileValues() {
      return axios({
        url: "/infoManage/elderlyProfile/getCurrentUserProfile",
        method: "get",
      });
    },
    setNewValue() {
      this.getElderlyProfileValues()
        .then((res) => {
          console.log(res);
          this.values = res;
        })
        .catch((err) => {
          console.log(err);
        });
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
    this.getElderlyProfileValues()
      .then((res) => {
        console.log(res);
        this.values = res;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
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
