import { post } from '@/utils/request'

export const login = post('/user/login')
export const changePwd = post('/user/pwd/change')
