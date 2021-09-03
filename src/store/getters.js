const getters = {
  roles: state => state.user.roles,
  isLogin: state => state.user.isLogin,
  trophies: state => state.lottery.trophies,
  oreAmount: state => state.lottery.oreAmount
}
export default getters
