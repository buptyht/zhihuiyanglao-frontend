<template>
  <div class="main user-layout-register">
    <h3><span>注册</span></h3>
    <a-form ref="formRegister" :form="form" id="formRegister">
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="邮箱"
          v-decorator="[
            'email',
            {
              rules: [{ required: true, type: 'email', message: '请输入邮箱地址' }],
              validateTrigger: ['change', 'blur'],
            },
          ]"
        ></a-input>
      </a-form-item>

      <a-popover
        placement="rightTop"
        :trigger="['focus']"
        :getPopupContainer="(trigger) => trigger.parentElement"
        v-model="state.passwordLevelChecked"
      >
        <template slot="content">
          <div :style="{ width: '240px' }">
            <div :class="['user-register', passwordLevelClass]">
              强度：<span>{{ passwordLevelName }}</span>
            </div>
            <a-progress :percent="state.percent" :showInfo="false" :strokeColor="passwordLevelColor" />
            <div style="margin-top: 10px">
              <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
            </div>
          </div>
        </template>
        <a-form-item>
          <a-input-password
            size="large"
            @click="handlePasswordInputClick"
            placeholder="至少6位密码，区分大小写"
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: '至少6位密码，区分大小写' },
                  { validator: this.handlePasswordLevel },
                ],
                validateTrigger: ['change', 'blur'],
              },
            ]"
          ></a-input-password>
        </a-form-item>
      </a-popover>

      <a-form-item>
        <a-input-password
          size="large"
          placeholder="确认密码"
          v-decorator="[
            'password2',
            {
              rules: [{ required: true, message: '至少6位密码，区分大小写' }, { validator: this.handlePasswordCheck }],
              validateTrigger: ['change', 'blur'],
            },
          ]"
        ></a-input-password>
      </a-form-item>
      <!--<a-input-group size="large" compact>
            <a-select style="width: 20%" size="large" defaultValue="+86">
              <a-select-option value="+86">+86</a-select-option>
              <a-select-option value="+87">+87</a-select-option>
            </a-select>
            <a-input style="width: 80%" size="large" placeholder="11 位手机号"></a-input>
          </a-input-group>-->

      <a-row :gutter="16">
        <a-col class="gutter-row" :span="16">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="验证码"
              v-decorator="[
                'verifyCode',
                { rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur' },
              ]"
            >
              <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="8">
          <a-button
            class="getCaptcha"
            size="large"
            :disabled="state.smsSendBtn"
            @click.stop.prevent="getCaptcha"
            v-text="(!state.smsSendBtn && '获取验证码') || state.time + ' s'"
          ></a-button>
        </a-col>
      </a-row>

      <a-form-item style="display: none">
        <a-input v-decorator="['userId']" />
      </a-form-item>
      <a-form-item>
        <a-input
          placeholder="用户名"
          v-decorator="['loginName', { rules: [{ required: true, message: '请输入用户名' }] }]"
        />
      </a-form-item>

      <a-form-item>
        <a-input
          v-decorator="[
            'userName',
            {
              rules: [{ required: true, message: '请输入昵称' }],
            },
          ]"
          placeholder="起一个名字"
        />
      </a-form-item>

      <a-form-item>
        <a-select v-decorator="['status', { initialValue: '0', rules: [{ required: true, message: '请选择状态' }] }]">
          <a-select-option :value="'0'">正常</a-select-option>
          <a-select-option :value="'1'">禁用</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item>
        <a-tree-select
          v-decorator="['deptId', { rules: [{ required: true, message: '请选择部门' }] }]"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          :treeData="deptTree"
          @change="onChange"
          placeholder="部门"
          treeDefaultExpandAll
        >
        </a-tree-select>
      </a-form-item>

      <a-form-item>
        <a-textarea
          :rows="5"
          placeholder="..."
          v-decorator="['remark', { rules: [{ required: true, message: '请输入描述' }] }]"
        />
      </a-form-item>

      <a-form-item>
        <a-select
          style="width: 100%"
          v-decorator="['roleIds', { rules: [{ required: true, message: '请选择角色' }] }]"
          :allowClear="true"
          mode="multiple"
        >
          <a-select-option v-for="action in roleAll" :key="action.roleId">{{ action.roleName }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="register-button"
          :loading="registerBtn"
          @click.stop.prevent="handleSubmit"
          :disabled="registerBtn"
          >注册
        </a-button>
        <router-link class="login" :to="{ name: 'login' }">使用已有账户登录</router-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { getRoleAll, getDeptListEnable, regUser } from '@/api/system'
import { getSmsCaptcha } from '@/api/login'
import { deviceMixin } from '@/store/device-mixin'
import qs from 'qs'

const levelNames = {
  0: '低',
  1: '低',
  2: '中',
  3: '强',
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success',
}
const levelColor = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a',
}
export default {
  name: 'Register',
  components: {},
  mixins: [deviceMixin],
  created() {
    this.loadRoleAll()
    getDeptListEnable().then((res) => {
      const data = res.rows
      if (data.length > 0) {
        const min = Math.min(...data.map((m) => m.parentId))
        this.buildtree(data, this.deptTree, min)
        console.log(this.deptTree)
      }
    })
  },
  data() {
    return {
      form: this.$form.createForm(this),
      deptTree: [],

      state: {
        time: 60,
        smsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000',
      },
      registerBtn: false,
      roleAll: [],
    }
  },
  computed: {
    passwordLevelClass() {
      return levelClass[this.state.passwordLevel]
    },
    passwordLevelName() {
      return levelNames[this.state.passwordLevel]
    },
    passwordLevelColor() {
      return levelColor[this.state.passwordLevel]
    },
  },
  methods: {
    onChange(value, label, extra) {
      if (extra.triggerNode.$children.length > 0) {
        this.$message.error('不能选择父节点' + `${label}`)
        this.deptCheck = false
      } else {
        this.deptCheck = true
      }
    },
    buildtree(list, arr, parentId) {
      list.forEach((item) => {
        if (item.parentId === parentId) {
          var child = {
            key: item.deptId,
            value: item.deptId, // value是给modal的select用的，2者属性不一样
            title: item.deptName,
            scopedSlots: { title: 'title' },
            children: [],
          }
          this.buildtree(list, child.children, item.deptId)
          if (child.children.length === 0) {
            delete child.children
          }
          arr.push(child)
        }
      })
    },
    loadRoleAll() {
      getRoleAll().then((res) => {
        this.roleAll = res.rows
      })
    },
    handlePasswordLevel(rule, value, callback) {
      let level = 0

      // 判断这个字符串中有没有数字
      if (/[0-9]/.test(value)) {
        level++
      }
      // 判断字符串中有没有字母
      if (/[a-zA-Z]/.test(value)) {
        level++
      }
      // 判断字符串中有没有特殊符号
      if (/[^0-9a-zA-Z_]/.test(value)) {
        level++
      }
      this.state.passwordLevel = level
      this.state.percent = level * 30
      if (level >= 2) {
        if (level >= 3) {
          this.state.percent = 100
        }
        callback()
      } else {
        if (level === 0) {
          this.state.percent = 10
        }
        callback(new Error('密码强度不够'))
      }
    },

    handlePasswordCheck(rule, value, callback) {
      const password = this.form.getFieldValue('password')
      console.log('value', value)
      if (value === undefined) {
        callback(new Error('请输入密码'))
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error('两次密码不一致'))
      }
      callback()
    },

    handlePhoneCheck(rule, value, callback) {
      console.log('handlePhoneCheck, rule:', rule)
      console.log('handlePhoneCheck, value', value)
      console.log('handlePhoneCheck, callback', callback)

      callback()
    },

    handlePasswordInputClick() {
      if (!this.isMobile) {
        this.state.passwordLevelChecked = true
        return
      }
      this.state.passwordLevelChecked = false
    },

    handleSubmit() {
      const {
        form: { validateFields },
        state,
        $router,
      } = this
      validateFields({ force: true }, (err, values) => {
        if (!err) {
          state.passwordLevelChecked = false
          console.log(values)
          regUser(values)
            .then((res) => {
              console.log(res)
              if ((res.code == 0)) {
                $router.push({ name: 'registerResult' })
              } else {
                this.requestFailed()
              }
            })
            .catch((err) => {
              console.log(err)
              this.requestFailed()
            })
          // $router.push({ name: 'registerResult', params: { ...values } })
        }
      })
    },

    getCaptcha(e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        $message,
        $notification,
      } = this

      validateFields(['email'], { force: true }, (err, values) => {
        if (!err) {
          state.smsSendBtn = true

          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60
              state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)

          const hide = $message.loading('验证码发送中..', 0)

          getSmsCaptcha(qs.stringify({ email: values.email }))
            .then((res) => {
              setTimeout(hide, 2500)
              $notification['success']({
                message: '提示',
                description: '验证码发送成功!',
                duration: 8,
              })
            })
            .catch((err) => {
              setTimeout(hide, 1)
              clearInterval(interval)
              state.time = 60
              state.smsSendBtn = false
              this.requestFailed()
            })
        }
      })
    },
    requestFailed() {
      this.$notification['error']({
        message: '错误',
        description: '请求出现错误，请稍后再试',
        duration: 4,
      })
      this.registerBtn = false
    },
  },
  watch: {
    'state.passwordLevel'(val) {
      console.log(val)
    },
  },
}
</script>
<style lang="less">
.user-register {
  &.error {
    color: #ff0000;
  }

  &.warning {
    color: #ff7e05;
  }

  &.success {
    color: #52c41a;
  }
}

.user-layout-register {
  .ant-input-group-addon:first-child {
    background-color: #fff;
  }
}
</style>
<style lang="less" scoped>
.user-layout-register {
  & > h3 {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .register-button {
    width: 50%;
  }

  .login {
    float: right;
    line-height: 40px;
  }
}
</style>
