import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/accounts/list',
    method: 'get',
    params: query
  })
}
