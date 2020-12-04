<template>
  <div id="alarm-div">
    <button id="alarm-button" @click="testClick">告警</button>
    <div>
      <a-modal v-model="visible" title="详细信息" @ok="handleOk" :width="800">
        <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item label="告警用户">
            马保国
          </a-form-model-item>
          <a-form-model-item label="告警用户ID">
            1
          </a-form-model-item>
          <a-form-model-item label="告警名称">
            <a-input v-model="form.name" />
          </a-form-model-item>
          <a-form-model-item label="告警区域">
            <a-select v-model="form.region" placeholder="请选择所在地区">
              <a-select-option value="shanghai"> 上海 </a-select-option>
              <a-select-option value="beijing"> 北京 </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="告警时间">
            <a-date-picker v-model="form.date1" show-time type="date" placeholder="选择一个时间" style="width: 100%" />
          </a-form-model-item>
          <a-form-model-item label="紧急处理">
            <a-switch v-model="form.delivery" />
          </a-form-model-item>
          <a-form-model-item label="处理方式">
            <a-radio-group v-model="form.type">
              <a-radio value="1" name="type"> 线上</a-radio>
              <a-radio value="2" name="type"> 线下 </a-radio>
              <a-radio value="3" name="type"> 线上及线下 </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="Resources">
            <a-radio-group v-model="form.resource">
              <a-radio value="1"> Sponsor </a-radio>
              <a-radio value="2"> Venue </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="情况详述">
            <a-input v-model="form.desc" type="textarea" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Alarm',
  data() {
    return {
      visible: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: '',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      }
    }
  },
  components: {
    
  },
  methods: {
    testClick() {
      this.visible = true
    },
    handleOk() {
      console.log('submit!', this.form);
      this.visible = false
    }
  },
}
</script>

<style>
#alarm-button {
  background-color: red;
  font-size: 44px;
}

#alarm-div {
  padding: 50% 10% 0px;
}
</style>

