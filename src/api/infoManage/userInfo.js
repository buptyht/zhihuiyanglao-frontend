import { axios } from '@/utils/request'

const api = {
  userInfo: '/infoManage/userInfo'
}

export function getUserInfoList (parameter) {
  return axios({
    url: api.userInfo + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveUserInfo (parameter) {
  return axios({
    url: api.userInfo + (parameter.id > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delUserInfo (parameter) {
  return axios({
    url: api.userInfo + '/remove',
    method: 'post',
    params: parameter
  })
}

export const userInfoExport = api.userInfo + '/export'
