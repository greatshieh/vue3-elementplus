import request from '@/utils/request'

export function searchUser(name) {
  return request({
    url: '/api/vue-element-admin/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return request({
    url: '/api/transaction/list',
    method: 'get',
    params: query
  })
}
