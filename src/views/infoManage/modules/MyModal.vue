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
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="本人身份证号或组织社会统一信用ID">
        <a-input placeholder="本人身份证号或组织社会统一信用ID" v-decorator="['identityId']" />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="本人名字或组织名字">
        <a-input placeholder="本人名字或组织名字" v-decorator="['userName']" />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所在国家">
        <a-input placeholder="所在国家" v-decorator="['country']" />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所在省份">
        <a-input placeholder="所在省份" v-decorator="['province']" />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所在城市">
        <a-input placeholder="所在城市" v-decorator="['city']" />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所在区县">
        <a-input placeholder="所在区县" v-decorator="['region']" />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所在详细地址">
        <a-input placeholder="所在详细地址" v-decorator="['address']" />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="本人联系电话或组织负责人电话">
        <a-input placeholder="本人联系电话或组织负责人电话" v-decorator="['phoneNumber']" />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="本人上层组织ID">
        <a-input placeholder="本人上层组织ID" v-decorator="['orgId']" />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="本人平台余额">
        <a-input placeholder="本人平台余额" v-decorator="['residueMoney']" />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="创建者">
        <a-input placeholder="创建者" v-decorator="['createdBy']" />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="更新者">
        <a-input placeholder="更新者" v-decorator="['updatedBy']" />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="地图定位"
        ><baidu-map class="map" :center="center" :zoom="zoom" @ready="handler"></baidu-map>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
export default {
  name: 'MyModal',
  props: ['center', 'zoom'],
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

  methods: {
    setVisibleTrue() {
      this.visible = true
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.confirmLoading = true
          var location = this.marker.getPosition()
          this.$emit('ok', { values, location })
          this.confirmLoading = false
          this.visible = false
        }
      })
    },
    handler({ BMap, map }) {
      this.BMap = BMap
      this.map = map
      this.marker = new BMap.Marker(this.map.getCenter(), {
        enableDragging: true,
      })
      map.addOverlay(this.marker)
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