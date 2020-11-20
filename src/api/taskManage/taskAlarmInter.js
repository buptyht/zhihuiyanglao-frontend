import { axios } from '@/utils/request'

const api = {
  taskAlarmInter: '/taskManage/taskAlarmInter'
}

export function getTaskAlarmInterList (parameter) {
  return axios({
    url: api.taskAlarmInter + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveTaskAlarmInter (parameter) {
  return axios({
    url: api.taskAlarmInter + (parameter.taskId >= 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delTaskAlarmInter (parameter) {
  return axios({
    url: api.taskAlarmInter + '/remove',
    method: 'post',
    params: parameter
  })
}

export const taskAlarmInterExport = api.taskAlarmInter + '/export'
