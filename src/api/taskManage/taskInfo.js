import { axios } from '@/utils/request'

const api = {
  taskInfo: '/taskManage/taskInfo'
}

export function getTaskInfoList (parameter) {
  return axios({
    url: api.taskInfo + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveTaskInfo (parameter) {
  return axios({
    url: api.taskInfo + (parameter.id >= 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delTaskInfo (parameter) {
  return axios({
    url: api.taskInfo + '/remove',
    method: 'post',
    params: parameter
  })
}

export const taskInfoExport = api.taskInfo + '/export'
