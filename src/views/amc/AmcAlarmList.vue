<template>
  <div>
    <a-menu v-model="current" mode="horizontal" style="display: flex" @click="testChange">
      <a-menu-item key="0" style="width: 300px"> <a-icon type="mail" />未处理的工单</a-menu-item>
      <a-menu-item key="1" style="width: 300px"> <a-icon type="appstore"/>进行中的工单</a-menu-item>
      <a-sub-menu>
        <span slot="title" class="submenu-title-wrapper"
        ><a-icon type="setting" />已完成的工单</span
        >
        <a-menu-item-group title="Item 1" style="width: 300px">
          <a-menu-item key="setting:1">
            Option 1
          </a-menu-item>
          <a-menu-item key="setting:2">
            Option 2
          </a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group title="Item 2">
          <a-menu-item key="setting:3">
            Option 3
          </a-menu-item>
          <a-menu-item key="setting:4">
            Option 4
          </a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
    </a-menu>
    <a-table :data-source="data" :columns="columns" rowKey="id">
      <div
        slot="filterDropdown"
        slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
        style="padding: 8px"
      >
        <a-input
          v-ant-ref="c => (searchInput = c)"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block;"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          type="primary"
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          搜索
        </a-button>
        <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
          重置
        </a-button>
      </div>
      <a-icon
        slot="filterIcon"
        slot-scope="filtered"
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <template slot="customRender" slot-scope="text, record, index, column">
      <span v-if="searchText && searchedColumn === column.dataIndex">
        <template
          v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
        >
          <mark
            v-if="fragment.toLowerCase() === searchText.toLowerCase()"
            :key="i"
            class="highlight"
          >{{ fragment }}</mark
          >
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
        <template v-else>
          {{ text }}
        </template>
      </template>
      <div slot="action" slot-scope="text,record,index">
        <a @click="testClick(index)">详情</a>
        <a-modal v-model="visible" title="详细信息" @ok="handleOk" :width="800">
          <p>{{userData.userName}}</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </a-modal>
        <a-divider type="vertical"></a-divider>
        <a>处理</a>
      </div>
    </a-table>
  </div>
</template>
<script>
  import { getAlarmList } from '@/views/amc/network/AmcAlarmList'

  export default {
    data() {
      return {
        dataBox: [],
        userData: {},
        visible: false,
        current: ['0'],
        queryParam: '',
        data: [],
        searchText: '',
        searchInput: null,
        searchedColumn: '',
        columns: [
          {
            id:1,
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
            width: 200,
            scopedSlots: {
              filterDropdown: 'filterDropdown',
              filterIcon: 'filterIcon',
              customRender: 'customRender',
            },
            onFilter: (value, record) =>
              record.userName
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: visible => {
              if (visible) {
                setTimeout(() => {
                  this.searchInput.focus();
                }, 0);
              }
            },
          },
          {
            id:2,
            title: '国籍',
            dataIndex: 'country',
            key: 'country',
            width: 200,
            scopedSlots: {
              filterDropdown: 'filterDropdown',
              filterIcon: 'filterIcon',
              customRender: 'customRender',
            },
            onFilter: (value, record) =>
              record.country
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: visible => {
              if (visible) {
                setTimeout(() => {
                  this.searchInput.focus();
                });
              }
            },
          },
          {
            id:3,
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            width: 400,
            scopedSlots: {
              filterDropdown: 'filterDropdown',
              filterIcon: 'filterIcon',
              customRender: 'customRender',
            },
            onFilter: (value, record) =>
              record.id
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: visible => {
              if (visible) {
                setTimeout(() => {
                  this.searchInput.focus();
                });
              }
            },
          },
          {
            id:4,
            title: 'action',
            dataIndex: '',
            key: 'x',
            scopedSlots:  { customRender: 'action' }
          }
        ],
      };
    },
    created() {
      getAlarmList().then(res => {
        this.dataBox[0] = res.rows;
        this.data = this.dataBox[0]
      })
    },
    methods: {
      testChange(obj) {
        this.data = this.dataBox[obj.key]
      },
      testClick(index) {
        this.userData = this.data[index];
        console.log(this.userData);
        this.visible = true;
        console.log(this.visible)
      },
      handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
        this.searchText = selectedKeys[0];
        this.searchedColumn = dataIndex;
      },
      handleReset(clearFilters) {
        clearFilters();
        this.searchText = '';
      },
      handleOk(e) {
        console.log(e);
        this.visible = false;
      },
    },
  };
</script>


<style scoped>

</style>

