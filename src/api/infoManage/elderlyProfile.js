import { axios } from '@/utils/request'

const api = {
  elderlyProfile: '/infoManage/elderlyProfile'
}

export function getElderlyProfileList (parameter) {
  return axios({
    url: api.elderlyProfile + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveElderlyProfile (parameter) {
  return axios({
    url: api.elderlyProfile + (parameter.id > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delElderlyProfile (parameter) {
  return axios({
    url: api.elderlyProfile + '/remove',
    method: 'post',
    params: parameter
  })
}

export const elderlyProfileExport = api.elderlyProfile + '/export'
