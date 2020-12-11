<template>
  <a-card title="修改老人档案" :borderd="false">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item prop="currentName" label="现名"
        ><a-input v-model="form.currentName"
      /></a-form-model-item>
      <a-form-model-item prop="gender" label="性别"
        ><a-input v-model="form.gender"
      /></a-form-model-item>
      <a-form-model-item prop="birthDate" label="出生年月日"
        ><a-input v-model="form.birthDate"
      /></a-form-model-item>
      <a-form-model-item prop="oldName" label="曾用名"
        ><a-input v-model="form.oldName"
      /></a-form-model-item>
      <a-form-model-item prop="politicalStatus" label="政治面貌"
        ><a-input v-model="form.politicalStatus"
      /></a-form-model-item>
      <a-form-model-item prop="career" label="职业"
        ><a-input v-model="form.career"
      /></a-form-model-item>
      <a-form-model-item prop="originHometown" label="原籍"
        ><a-input v-model="form.originHometown"
      /></a-form-model-item>
      <a-form-model-item prop="religion" label="宗教"
        ><a-input v-model="form.religion"
      /></a-form-model-item>
      <a-form-model-item prop="nation" label="民族"
        ><a-input v-model="form.nation"
      /></a-form-model-item>
      <a-form-model-item prop="birthPlace" label="出生地"
        ><a-input v-model="form.birthPlace"
      /></a-form-model-item>
      <a-form-model-item prop="idNumber" label="身份证号"
        ><a-input v-model="form.idNumber"
      /></a-form-model-item>
      <a-form-model-item prop="maritalStatus" label="婚姻状况"
        ><a-input v-model="form.maritalStatus"
      /></a-form-model-item>
      <a-form-model-item prop="homeAddress" label="家庭住址"
        ><a-input v-model="form.homeAddress"
      /></a-form-model-item>
      <a-form-model-item prop="phoneNumber" label="手机号"
        ><a-input v-model="form.phoneNumber"
      /></a-form-model-item>
      <a-form-model-item prop="email" label="邮箱"
        ><a-input v-model="form.email"
      /></a-form-model-item>
      <a-form-model-item prop="realProblem" label="现实问题"
        ><a-input v-model="form.realProblem"
      /></a-form-model-item>
      <a-form-model-item prop="familySituation" label="家庭状况"
        ><a-input v-model="form.familySituation"
      /></a-form-model-item>
      <a-form-model-item prop="educationHistory" label="教育史"
        ><a-input v-model="form.educationHistory"
      /></a-form-model-item>
      <a-form-model-item prop="healthState" label="健康状况"
        ><a-input v-model="form.healthState"
      /></a-form-model-item>
      <a-form-model-item prop="maritalStatusExplicit" label="详细婚姻状况"
        ><a-input v-model="form.maritalStatusExplicit"
      /></a-form-model-item>
      <a-form-model-item prop="employmentHistory" label="就业史"
        ><a-input v-model="form.employmentHistory"
      /></a-form-model-item>
      <a-form-model-item prop="contactInstitutionHistory" label="以前与社会机构的接触"
        ><a-input v-model="form.contactInstitutionHistory"
      /></a-form-model-item>
      <a-form-model-item prop="hobby" label="兴趣爱好"
        ><a-input v-model="form.hobby"
      /></a-form-model-item>
      <a-form-model-item prop="otherSituation" label="其他需要说明的情况"
        ><a-input v-model="form.otherSituation"
      /></a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit"> 提交 </a-button>
        <a-button style="margin-left: 10px" @click="resetForm"> 重置 </a-button>
        <a-button type="primary" @click="printForm"> 打印form </a-button>
      </a-form-model-item>
    </a-form-model></a-card
  >
</template>
<script>
import { saveElderlyProfile } from "@/api/infoManage/elderlyProfile";
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: { id: this.$store.state.user.userId },
      rules: {
        currentName: [{ required: true, message: "请输入。。。", trigger: "blur" }],
        gender: [{ required: true, message: "请输入。。。", trigger: "blur" }],
        birthDate: [{ required: true, message: "请输入。。。", trigger: "blur" }],
        photo: [{ required: true, message: "请输入。。。", trigger: "blur" }],
        oldName: [{ required: true, message: "请输入。。。", trigger: "blur" }],
        politicalStatus: [{ required: true, message: "请输入。。。", trigger: "blur" }],
        career: [{ required: true, message: "请输入。。。", trigger: "blur" }],
        originHometown: [{ required: true, message: "请输入。。。", trigger: "blur" }],
        religion: [{ required: true, message: "请输入。。。", trigger: "blur" }],
        nation: [{ required: true, message: "请输入。。。", trigger: "blur" }],
        birthPlace: [{ required: true, message: "请输入。。。", trigger: "blur" }],
        idNumber: [{ required: true, message: "请输入。。。", trigger: "blur" }],
        maritalStatus: [{ required: true, message: "请输入。。。", trigger: "blur" }],
        homeAddress: [{ required: true, message: "请输入。。。", trigger: "blur" }],
        phoneNumber: [{ required: true, message: "请输入。。。", trigger: "blur" }],
        email: [{ required: true, message: "请输入。。。", trigger: "blur" }],
        realProblem: [{ required: true, message: "请输入。。。", trigger: "blur" }],
        familySituation: [{ required: true, message: "请输入。。。", trigger: "blur" }],
        educationHistory: [{ required: true, message: "请输入。。。", trigger: "blur" }],
        healthState: [{ required: true, message: "请输入。。。", trigger: "blur" }],
        maritalStatusExplicit: [
          { required: true, message: "请输入。。。", trigger: "blur" },
        ],
        employmentHistory: [{ required: true, message: "请输入。。。", trigger: "blur" }],
        contactInstitutionHistory: [
          { required: true, message: "请输入。。。", trigger: "blur" },
        ],

        hobby: [{ required: true, message: "请输入。。。", trigger: "blur" }],
        otherSituation: [{ required: true, message: "请输入。。。", trigger: "blur" }],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.form);
          saveElderlyProfile(this.form)
            .then((res) => {
              if (res.code === 0) {
                this.$message.success("保存成功");
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch(() => {
              this.$message.error("系统错误，请稍后再试");
            })
        } else {
          console.log("表单校验不通过！");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    printForm() {
      console.log(this.form);
    },
  },
};
</script>
