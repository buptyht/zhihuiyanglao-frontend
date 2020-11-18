<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="5" :sm="15">
            <a-form-item label="本人身份证号或组织社会统一信用ID">
              <a-input placeholder="请输入本人身份证号或组织社会统一信用ID" v-model="queryParam.identityId"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="本人名字或组织名字">
              <a-input placeholder="请输入本人名字或组织名字" v-model="queryParam.userName"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="所在国家">
              <a-input placeholder="请输入所在国家" v-model="queryParam.country"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="所在省份">
              <a-input placeholder="请输入所在省份" v-model="queryParam.province"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="所在城市">
              <a-input placeholder="请输入所在城市" v-model="queryParam.city"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="所在区县">
              <a-input placeholder="请输入所在区县" v-model="queryParam.region"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="所在详细地址">
              <a-input placeholder="请输入所在详细地址" v-model="queryParam.address"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="所在经度">
              <a-input placeholder="请输入所在经度" v-model="queryParam.longitude"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="所在纬度">
              <a-input placeholder="请输入所在纬度" v-model="queryParam.latitude"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="本人联系电话或组织负责人电话">
              <a-input placeholder="请输入本人联系电话或组织负责人电话" v-model="queryParam.phoneNumber"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="本人上层组织ID">
              <a-input placeholder="请输入本人上层组织ID" v-model="queryParam.orgId"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="本人平台余额">
              <a-input placeholder="请输入本人平台余额" v-model="queryParam.residueMoney"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="创建者">
              <a-input placeholder="请输入创建者" v-model="queryParam.createdBy"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="更新者">
              <a-input placeholder="请输入更新者" v-model="queryParam.updatedBy"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="table-operator">
      <a-button v-if="addEnable" type="primary" icon="plus" @click="$refs.modal.add()">新建</a-button>
      <a-dropdown v-if="removeEnable&&selectedRowKeys.length > 0">
        <a-button type="danger" icon="delete" @click="delByIds(selectedRowKeys)">删除</a-button>
      </a-dropdown>
    </div>
    <s-table
      size="default"
      ref="table"
      rowKey="id"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :columns="columns"
      :data="loadData"
    >
      <span slot="action" slot-scope="text, record">
        <a v-if="editEnabel" @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a v-if="removeEnable" @click="delByIds([record.id])">删除</a>
      </span>
    </s-table>
    <userInfo-modal ref="modal" @ok="handleOk"/>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { getUserInfoList, delUserInfo } from '@/api/infoManage/userInfo'
import UserInfoModal from './modules/UserInfoModal.vue'
import { checkPermission } from '@/utils/permissions'

export default {
  name: 'TableList',
  components: {
    STable,
    UserInfoModal
  },
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      form: this.$form.createForm(this),
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '本人身份证号或组织社会统一信用ID',
          dataIndex: 'identityId'
        },
        {
          title: '本人名字或组织名字',
          dataIndex: 'userName'
        },
        {
          title: '所在国家',
          dataIndex: 'country'
        },
        {
          title: '所在省份',
          dataIndex: 'province'
        },
        {
          title: '所在城市',
          dataIndex: 'city'
        },
        {
          title: '所在区县',
          dataIndex: 'region'
        },
        {
          title: '所在详细地址',
          dataIndex: 'address'
        },
        {
          title: '所在经度',
          dataIndex: 'longitude'
        },
        {
          title: '所在纬度',
          dataIndex: 'latitude'
        },
        {
          title: '本人联系电话或组织负责人电话',
          dataIndex: 'phoneNumber'
        },
        {
          title: '本人有无医保',
          dataIndex: 'healthCare'
        },
        {
          title: '本人上层组织ID',
          dataIndex: 'orgId'
        },
        {
          title: '本人健康状况',
          dataIndex: 'healthState'
        },
        {
          title: '本人平台余额',
          dataIndex: 'residueMoney'
        },
        {
          title: '创建者',
          dataIndex: 'createdBy'
        },
        {
          title: '更新者',
          dataIndex: 'updatedBy'
        },
        {
          title: '操作',
          width: '200px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getUserInfoList(Object.assign(parameter, this.queryParam))
      },
      selectedRowKeys: [],
      selectedRows: [],
      addEnable: checkPermission('infoManage:userInfo:add'),
      editEnabel: checkPermission('infoManage:userInfo:edit'),
      removeEnable: checkPermission('infoManage:userInfo:remove')
    }
  },
  filters: {
  },
  created () {
  },
  methods: {
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleAdd () {
      this.$refs.modal.add()
    },
    handleEdit (record) {
      this.$refs.modal.edit(record)
    },
    handleOk () {
      this.$refs.table.refresh(true)
      console.log('handleSaveOk')
    },
    delByIds (ids) {
      delUserInfo({ ids: ids.join(',') }).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.handleOk()
        } else {
          this.$message.error(res.msg)
        }
        this.selectedRowKeys = []
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
