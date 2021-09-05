import { get, post } from '@/utils/request'

export const getTrophiesApi = get('/lottery/trophies')
export const lotteryPlayApi = post('/lottery/play')
export const updateLotterySetupApi = post('/lottery/setup/update')
