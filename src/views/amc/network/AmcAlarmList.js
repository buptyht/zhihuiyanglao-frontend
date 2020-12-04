import { axios } from '@/utils/request'

const api = {
  userInfo: '/infoManage/userInfo/list'
}

export function getAlarmList () {
  return axios({
    url: api.userInfo,
    method: 'get',
  })
}