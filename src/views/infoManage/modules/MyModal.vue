<template>
  <a-modal
    title="操作"
    style="top: 20px"
    :width="800"
    v-model="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
  >

    <a-form :form="form">
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="本人有无医保">
        <a-select
          v-decorator="['healthCare', { rules: [{ required: true, message: '请输入本人有无医保!' }] }]"
          placeholder="本人有无医保"
        >
          <a-select-option value="true"> 有 </a-select-option>
          <a-select-option value="false"> 无 </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="本人健康状况">
        <a-select
          v-decorator="['healthState', { rules: [{ required: true, message: '请输入本人健康状况!' }] }]"
          placeholder="本人健康状况"
        >
          <a-select-option value="true"> 良好 </a-select-option>
          <a-select-option value="false"> 较差 </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所在经度">
        <a-input
          placeholder="所在经度"
          v-decorator="['longitude', { rules: [{ required: true, message: '请输入所在经度!' }] }]"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所在纬度">
        <a-input
          placeholder="所在纬度"
          v-decorator="['latitude', { rules: [{ required: true, message: '请输入所在纬度!' }] }]"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="本人身份证号或组织社会统一信用ID">
        <a-input
          placeholder="本人身份证号或组织社会统一信用ID"
          v-decorator="[
            'identityId',
            { rules: [{ required: true, message: '请输入本人身份证号或组织社会统一信用ID!' }] },
          ]"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="本人名字或组织名字">
        <a-input
          placeholder="本人名字或组织名字"
          v-decorator="['userName', { rules: [{ required: true, message: '请输入本人名字或组织名字!' }] }]"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所在国家">
        <a-input
          placeholder="所在国家"
          v-decorator="['country', { rules: [{ required: true, message: '请输入所在国家!' }] }]"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所在省份">
        <a-input
          placeholder="所在省份"
          v-decorator="['province', { rules: [{ required: true, message: '请输入所在省份!' }] }]"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所在城市">
        <a-input
          placeholder="所在城市"
          v-decorator="['city', { rules: [{ required: true, message: '请输入所在城市!' }] }]"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所在区县">
        <a-input
          placeholder="所在区县"
          v-decorator="['region', { rules: [{ required: true, message: '请输入所在区县!' }] }]"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所在详细地址">
        <a-input
          placeholder="所在详细地址"
          v-decorator="['address', { rules: [{ required: true, message: '请输入所在详细地址!' }] }]"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="本人联系电话或组织负责人电话">
        <a-input
          placeholder="本人联系电话或组织负责人电话"
          v-decorator="['phoneNumber', { rules: [{ required: true, message: '请输入本人联系电话或组织负责人电话!' }] }]"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="本人上层组织ID">
        <a-input
          placeholder="本人上层组织ID"
          v-decorator="['orgId', { rules: [{ required: true, message: '请输入本人上层组织ID!' }] }]"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="本人平台余额">
        <a-input
          placeholder="本人平台余额"
          v-decorator="['residueMoney', { rules: [{ required: true, message: '请输入本人平台余额!' }] }]"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="创建者">
        <a-input
          placeholder="创建者"
          v-decorator="['createdBy', { rules: [{ required: true, message: '请输入创建者!' }] }]"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="更新者">
        <a-input
          placeholder="更新者"
          v-decorator="['updatedBy', { rules: [{ required: true, message: '请输入更新者!' }] }]"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { saveUserInfo } from '@/api/infoManage/userInfo'
export default {
  name: 'MyModal',
  components: {},
  data() {
    return {
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      confirmLoading: false,
      form: this.$form.createForm(this),

    }
  },
  created() {},
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          values.healthCare = values.healthCare == 'true' ? true : false
          values.healthState = values.healthState == 'true' ? true : false
          values.id = this.$store.state.user.userId

          this.confirmLoading = true
          saveUserInfo(values)
            .then((res) => {
              if (res.code === 0) {
                this.$message.success('保存成功')
                this.$emit('ok')
                this.visible = false
              } else {
                this.$message.error(res.msg)
              }
            })
            .catch(() => {
              this.$message.error('系统错误，请稍后再试')
            })
            .finally(() => {
              this.confirmLoading = false
            })
        }
      })
    },

  },
}
</script>
<style scoped>
.map {
  width: 100%;
  height: 400px;
}
</style>