const state = {
  roles: [],
  isLogin: false
}

const mutations = {
  UPDATE_ROLES: (state, roles) => {
    state.roles = roles
  },
  UPTATE_LOGIN_STATUS: (state, status) => {
    state.isLogin = status
    console.log(state.isLogin, '-----------')
  }
}

const actions = {
  updateRoles ({ commit }, roles) {
    commit('UPDATE_ROLES', roles)
  },
  updateLoginStatus ({ commit, dispatch }, status) {
    console.log('to update lgin s')
    if (!status) {
      localStorage.removeItem('userInfo')
      localStorage.removeItem('token')
      localStorage.setItem('userRoles', JSON.stringify({ roles: 'visitor' }))
      dispatch('updateRoles', [])
    }
    commit('UPTATE_LOGIN_STATUS', status)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
