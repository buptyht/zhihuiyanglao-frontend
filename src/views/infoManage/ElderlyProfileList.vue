<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="5" :sm="15">
            <a-form-item label="现名">
              <a-input placeholder="请输入现名" v-model="queryParam.currentName"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="性别">
              <a-input placeholder="请输入性别" v-model="queryParam.gender"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="照片">
              <a-input placeholder="请输入照片" v-model="queryParam.photo"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="曾用名">
              <a-input placeholder="请输入曾用名" v-model="queryParam.oldName"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="职业">
              <a-input placeholder="请输入职业" v-model="queryParam.career"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="原籍">
              <a-input placeholder="请输入原籍" v-model="queryParam.originHometown"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="宗教">
              <a-input placeholder="请输入宗教" v-model="queryParam.religion"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="民族">
              <a-input placeholder="请输入民族" v-model="queryParam.nation"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="出生地">
              <a-input placeholder="请输入出生地" v-model="queryParam.birthPlace"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="身份证号">
              <a-input placeholder="请输入身份证号" v-model="queryParam.idNumber"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="家庭住址">
              <a-input placeholder="请输入家庭住址" v-model="queryParam.homeAddress"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="手机号">
              <a-input placeholder="请输入手机号" v-model="queryParam.phoneNumber"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="邮箱">
              <a-input placeholder="请输入邮箱" v-model="queryParam.email"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="现实问题">
              <a-input placeholder="请输入现实问题" v-model="queryParam.realProblem"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="家庭状况">
              <a-input placeholder="请输入家庭状况" v-model="queryParam.familySituation"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="教育史">
              <a-input placeholder="请输入教育史" v-model="queryParam.educationHistory"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="健康状况">
              <a-input placeholder="请输入健康状况" v-model="queryParam.healthState"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="详细婚姻状况">
              <a-input placeholder="请输入详细婚姻状况" v-model="queryParam.maritalStatusExplicit"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="就业史">
              <a-input placeholder="请输入就业史" v-model="queryParam.employmentHistory"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="以前与社会机构的接触">
              <a-input placeholder="请输入以前与社会机构的接触" v-model="queryParam.contactInstitutionHistory"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="兴趣爱好">
              <a-input placeholder="请输入兴趣爱好" v-model="queryParam.hobby"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="其他需要说明的情况">
              <a-input placeholder="请输入其他需要说明的情况" v-model="queryParam.otherSituation"/>
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
    <elderlyProfile-modal ref="modal" @ok="handleOk"/>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { getElderlyProfileList, delElderlyProfile } from '@/api/infoManage/elderlyProfile'
import ElderlyProfileModal from './modules/ElderlyProfileModal.vue'
import { checkPermission } from '@/utils/permissions'

export default {
  name: 'TableList',
  components: {
    STable,
    ElderlyProfileModal
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
          title: '现名',
          dataIndex: 'currentName'
        },
        {
          title: '性别',
          dataIndex: 'gender'
        },
        {
          title: '出生年月日',
          dataIndex: 'birthDate',
          sorter: true
        },
        {
          title: '照片',
          dataIndex: 'photo'
        },
        {
          title: '曾用名',
          dataIndex: 'oldName'
        },
        {
          title: '政治面貌',
          dataIndex: 'politicalStatus'
        },
        {
          title: '职业',
          dataIndex: 'career'
        },
        {
          title: '原籍',
          dataIndex: 'originHometown'
        },
        {
          title: '宗教',
          dataIndex: 'religion'
        },
        {
          title: '民族',
          dataIndex: 'nation'
        },
        {
          title: '出生地',
          dataIndex: 'birthPlace'
        },
        {
          title: '身份证号',
          dataIndex: 'idNumber'
        },
        {
          title: '婚姻状况(0-从未结婚；1-第一次结婚且在婚；2-再婚且在婚；3-离异；4-丧偶)',
          dataIndex: 'maritalStatus'
        },
        {
          title: '家庭住址',
          dataIndex: 'homeAddress'
        },
        {
          title: '手机号',
          dataIndex: 'phoneNumber'
        },
        {
          title: '邮箱',
          dataIndex: 'email'
        },
        {
          title: '现实问题',
          dataIndex: 'realProblem'
        },
        {
          title: '家庭状况',
          dataIndex: 'familySituation'
        },
        {
          title: '教育史',
          dataIndex: 'educationHistory'
        },
        {
          title: '健康状况',
          dataIndex: 'healthState'
        },
        {
          title: '详细婚姻状况',
          dataIndex: 'maritalStatusExplicit'
        },
        {
          title: '就业史',
          dataIndex: 'employmentHistory'
        },
        {
          title: '以前与社会机构的接触',
          dataIndex: 'contactInstitutionHistory'
        },
        {
          title: '兴趣爱好',
          dataIndex: 'hobby'
        },
        {
          title: '其他需要说明的情况',
          dataIndex: 'otherSituation'
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
        return getElderlyProfileList(Object.assign(parameter, this.queryParam))
      },
      selectedRowKeys: [],
      selectedRows: [],
      addEnable: checkPermission('infoManage:elderlyProfile:add'),
      editEnabel: checkPermission('infoManage:elderlyProfile:edit'),
      removeEnable: checkPermission('infoManage:elderlyProfile:remove')
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
      delElderlyProfile({ ids: ids.join(',') }).then(res => {
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
