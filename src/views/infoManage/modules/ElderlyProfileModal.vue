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
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="现名">
        <a-input placeholder="现名" v-decorator="['currentName']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="性别">
        <a-input placeholder="性别" v-decorator="['gender']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="照片">
        <a-input placeholder="照片" v-decorator="['photo']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="曾用名">
        <a-input placeholder="曾用名" v-decorator="['oldName']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="职业">
        <a-input placeholder="职业" v-decorator="['career']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="原籍">
        <a-input placeholder="原籍" v-decorator="['originHometown']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="宗教">
        <a-input placeholder="宗教" v-decorator="['religion']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="民族">
        <a-input placeholder="民族" v-decorator="['nation']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="出生地">
        <a-input placeholder="出生地" v-decorator="['birthPlace']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="身份证号">
        <a-input placeholder="身份证号" v-decorator="['idNumber']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="家庭住址">
        <a-input placeholder="家庭住址" v-decorator="['homeAddress']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="手机号">
        <a-input placeholder="手机号" v-decorator="['phoneNumber']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="邮箱">
        <a-input placeholder="邮箱" v-decorator="['email']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="现实问题">
        <a-input placeholder="现实问题" v-decorator="['realProblem']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="家庭状况">
        <a-input placeholder="家庭状况" v-decorator="['familySituation']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="教育史">
        <a-input placeholder="教育史" v-decorator="['educationHistory']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="健康状况">
        <a-input placeholder="健康状况" v-decorator="['healthState']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="详细婚姻状况">
        <a-input placeholder="详细婚姻状况" v-decorator="['maritalStatusExplicit']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="就业史">
        <a-input placeholder="就业史" v-decorator="['employmentHistory']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="以前与社会机构的接触">
        <a-input placeholder="以前与社会机构的接触" v-decorator="['contactInstitutionHistory']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="兴趣爱好">
        <a-input placeholder="兴趣爱好" v-decorator="['hobby']"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="其他需要说明的情况">
        <a-input placeholder="其他需要说明的情况" v-decorator="['otherSituation']"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { saveElderlyProfile } from '@/api/infoManage/elderlyProfile'
import pick from 'lodash.pick'
export default {
  name: 'ElderlyProfileModal',
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
        this.form.setFieldsValue(pick(this.mdl, 'id', 'currentName', 'gender', 'birthDate', 'photo', 'oldName', 'politicalStatus', 'career', 'originHometown', 'religion', 'nation', 'birthPlace', 'idNumber', 'maritalStatus', 'homeAddress', 'phoneNumber', 'email', 'realProblem', 'familySituation', 'educationHistory', 'healthState', 'maritalStatusExplicit', 'employmentHistory', 'contactInstitutionHistory', 'hobby', 'otherSituation'))
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.confirmLoading = true
          saveElderlyProfile(values).then(res => {
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
