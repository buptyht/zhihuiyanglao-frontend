<template>
  <a-modal
    title="操作"
    style="top: 20px;"
    :width="800"
    v-model="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
  >
    <a-form :form="form">
      <a-form-item style="display:none">
        <a-input v-decorator="['id']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="本人或本组织的平台中ID">
        <a-input placeholder="本人或本组织的平台中ID" v-decorator="['id', {rules: [{required: true, message: '请输入本人或本组织的平台中ID'}]}]"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="本人身份证号或组织社会统一信用ID">
        <a-input placeholder="本人身份证号或组织社会统一信用ID" v-decorator="['identityId']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="本人名字或组织名字">
        <a-input placeholder="本人名字或组织名字" v-decorator="['userName']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所在国家">
        <a-input placeholder="所在国家" v-decorator="['country']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所在省份">
        <a-input placeholder="所在省份" v-decorator="['province']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所在城市">
        <a-input placeholder="所在城市" v-decorator="['city']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所在区县">
        <a-input placeholder="所在区县" v-decorator="['region']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所在详细地址">
        <a-input placeholder="所在详细地址" v-decorator="['address']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所在经度">
        <a-input placeholder="所在经度" v-decorator="['longitude']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所在纬度">
        <a-input placeholder="所在纬度" v-decorator="['latitude']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="本人联系电话或组织负责人电话">
        <a-input placeholder="本人联系电话或组织负责人电话" v-decorator="['phoneNumber']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="本人上层组织ID">
        <a-input placeholder="本人上层组织ID" v-decorator="['orgId']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="本人平台余额">
        <a-input placeholder="本人平台余额" v-decorator="['residueMoney']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="创建者">
        <a-input placeholder="创建者" v-decorator="['createdBy']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="更新者">
        <a-input placeholder="更新者" v-decorator="['updatedBy']"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { saveUserInfo } from '@/api/infoManage/userInfo'
import pick from 'lodash.pick'
export default {
  name: 'UserInfoModal',
  props: {
  },
  components: {
  },
  data () {
    return {
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      mdl: {},
      form: this.$form.createForm(this)
    }
  },
  beforeCreate () {
  },
  created () {
  },
  methods: {
    add () {
      this.form.resetFields()
      this.edit({ id: 0 })
    },
    edit (record) {
      this.mdl = Object.assign(record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'id', 'identityId', 'userName', 'country', 'province', 'city', 'region', 'address', 'longitude', 'latitude', 'phoneNumber', 'healthCare', 'orgId', 'healthState', 'residueMoney', 'createTime', 'updateTime', 'createdBy', 'updatedBy'))
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.confirmLoading = true
          saveUserInfo(values).then(res => {
            if (res.code === 0) {
              this.$message.success('保存成功')
              this.$emit('ok')
              this.visible = false
            } else {
              this.$message.error(res.msg)
            }
          }).catch(() => {
            this.$message.error('系统错误，请稍后再试')
          }).finally(() => {
            this.confirmLoading = false
          })
        }
      })
    }
  },
  watch: {
    /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
  }
}
</script>
