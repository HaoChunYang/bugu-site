const state = {
  totalWeight: 0,
  oreAmount: 10000,
  trophies: [
    {
      id: 1,
      imgSrc: 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32ed6a7619934144882d841761b63d3c~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp',
      name: '66矿石',
      locked: 0,
      weight: 40
    },
    {
      id: 2,
      imgSrc: 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a4ce25d48b8405cbf5444b6195928d4~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp',
      name: 'Bug',
      locked: 0,
      weight: 50
    },
    {
      id: 3,
      imgSrc: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab31c183950541d4a0731c0b8765b173~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp',
      name: '掘金马克杯',
      locked: 0,
      weight: 10
    },
    {
      id: 4,
      imgSrc: 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71c68de6368548bd9bd6c8888542f911~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp',
      name: '随机限量徽章',
      locked: 0,
      weight: 0
    },
    {
      id: 5,
      imgSrc: 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33f4d465a6a9462f9b1b19b3104c8f91~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp',
      name: 'Yoyo抱枕',
      locked: 0,
      weight: 0
    },
    {
      id: 6,
      imgSrc: 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5bf91038a6384fc3927dee294a38006b~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp',
      name: '掘金新款T恤',
      locked: 0,
      weight: 0
    },
    {
      id: 7,
      imgSrc: 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aabe49b0d5c741fa8d92ff94cd17cb90~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp',
      name: '乐高海洋巨轮',
      locked: 2,
      weight: 0
    },
    {
      id: 8,
      imgSrc: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4decbd721b2b48098a1ecf879cfca677~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp',
      name: 'Switch',
      locked: 3,
      weight: 100000
    }
  ]
}

const mutations = {
  UNLOCK_TROPHY: (state) => {
    state.trophies.forEach(item => {
      item.locked > 0 && item.locked--
    })
  },
  UPDATE_TROPHIES: (state, trophies) => {
    state.trophies = trophies
  },
  UPDATE_ORE: (state, oreAmount) => {
    state.oreAmount = oreAmount
  },
  ADD_ORE: (state, oreAmount) => {
    state.oreAmount += oreAmount
  },
  MINUS_ORE: (state, oreAmount) => {
    state.oreAmount -= oreAmount
  }
}

const actions = {
  unlockTrophy ({ commit }) {
    commit('UNLOCK_TROPHY')
  },
  updateTrophies ({ commit }, trophies) {
    commit('UPDATE_TROPHIES', trophies)
  },
  updateOre ({ commit }, oreAmount) {
    commit('UPDATE_ORE', oreAmount)
  },
  addOre ({ commit }, ore) {
    commit('ADD_ORE', ore)
  },
  minusOre ({ commit }, ore) {
    commit('MINUS_ORE', ore)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
