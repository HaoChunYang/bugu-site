import { post, get } from '@/utils/request'

export const publish = post('/article/publish')
export const queryList = get('/article/list')
export const queryDetail = get('/article/detail')
