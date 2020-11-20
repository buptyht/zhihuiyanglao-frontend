import { axios } from '@/utils/request'

const api = {
  userOldYoung: '/infoManage/userOldYoung'
}

export function getUserOldYoungList (parameter) {
  return axios({
    url: api.userOldYoung + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveUserOldYoung (parameter) {
  return axios({
    url: api.userOldYoung + (parameter.idOld >= 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delUserOldYoung (parameter) {
  return axios({
    url: api.userOldYoung + '/remove',
    method: 'post',
    params: parameter
  })
}

export const userOldYoungExport = api.userOldYoung + '/export'
