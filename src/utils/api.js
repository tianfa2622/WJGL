import axios, { get, post } from './http'

export const selectAll = paramsData => {
  return axios.get('/api/cpj/conditionPageQueryCpt', {
    params: paramsData
  })
}

export const postApi = p => post('/api/cpj/conditionPageQueryCpt', p)

export const getApi = p => get('/api/cpj/conditionPageQueryCpt', p)
