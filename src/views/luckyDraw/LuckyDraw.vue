<template>
  <div>
    <router-link to="/">首页</router-link> |
    <router-link to="/lottery-pro">抽奖Demo切换进阶版</router-link>
    <div class="blue-bg-box">
      <section>
        <p class="sub-title">幸运抽奖</p>
        <div class="lottery-box-header">
          <span class="sub-header">当前矿石数：{{oreAmount}}</span>
        </div>
        <div class="lottery-box">
          <div class="lottery">
            <trophy-item
              v-for="(item) in gridList"
              :class="item.id !== 9999 ? 'trophy' : ''"
              :key="`trophy-id-${item.id}`"
              :data="item"
              @doAction="doAction"
            ></trophy-item>
          </div>
        </div>
      </section>
      <section
        class="right-box"
        v-if="myTrophies.length"
      >
        <p class="sub-title">中奖列表</p>
        <div class="list-box">
          <p
            v-for="item in myTrophies"
            :key="item.id"
          >{{ item.name }}</p>
        </div>
        <div>
          <span>按当前中奖概率</span>
          <el-button
            @click="amountLotteyResult()"
            size="mini"
          >测试</el-button><span>100000次抽奖结果：</span>
          <p>{{ testResult.join(', ') }}</p>
        </div>
      </section>
    </div>
    <section>
      <lottery-setup></lottery-setup>
    </section>
  </div>
</template>

<script>
import TrophyItem from './Trophy.vue'
import LotterySetup from './LotterySetup.vue'
import { reactive, toRefs } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { ElMessageBox } from 'element-plus'
export default {
  name: 'LuckyDraw',
  components: {
    TrophyItem,
    LotterySetup
  },
  setup () {
    const store = useStore()
    const state = reactive({
      count: 0,
      gridList: [],
      /**
       * 奖品 id 在九宫格分布
       * 1 4 6
       * 2   lock
       * 3 5 lock
       */
      trophyRange: [1, 4, 6, 5, 3, 2], // 九宫格对应奖品位置
      oreAmount: computed(() => store.getters.oreAmount),
      myTrophies: [],
      testResult: []
    })

    onMounted(() => {
      state.gridList = JSON.parse(JSON.stringify(store.getters.trophies))
      const drawObj = { id: 9999, name: '免费抽奖1次' }
      state.gridList.splice(4, 0, drawObj)
    })

    function randomTrophy () {
      return Math.floor(Math.random() * state.trophyRange.length)
    }

    function getScaleList (validTrophyList) {
      let totalWeight = 0
      validTrophyList.forEach(item => {
        totalWeight += parseInt(item.weight)
      })
      const scaleList = []
      validTrophyList.forEach(item => {
        scaleList.push(parseInt(item.weight) / totalWeight)
      })
      return scaleList
    }

    function getTrophyResult (list) {
      return function (random) {
        let leftRange = 0
        for (let i = 0; i < list.length; i++) {
          leftRange += list[i]
          if (leftRange >= random) {
            return i + 1
          }
        }
      }
    }

    function amountLotteyResult (num = 100000) {
      const validTrophyList = store.getters.trophies.filter(item => item.locked <= 0)
      const generateLottery = getTrophyResult(getScaleList(validTrophyList))
      const amountResult = Array(8).fill(0)
      for (let i = 0; i < num; i++) {
        const id = generateLottery(Math.random())
        amountResult[id - 1]++
      }
      state.testResult = amountResult
      return amountResult
    }

    function once (fn) {
      let isDoing = true
      return async function (...args) {
        if (isDoing) {
          isDoing = false
          const ret = await fn.apply(this, args)
          isDoing = true
          return ret
        }
      }
    }

    const doAction = once(luckyDraw)

    async function luckyDraw () {
      if (state.oreAmount < 200) {
        console.log('矿石数量不足~')
        return
      }

      const trophyList = document.getElementsByClassName('trophy')
      const trophiesEle = []
      for (const id of state.trophyRange) {
        trophyList[id - 1].style.background = '#ffffff'
        trophiesEle.push(trophyList[id - 1])
      }
      const randomTrophyIndex = randomTrophy()

      // 随机中奖物品ID
      let trophyId = state.trophyRange[randomTrophyIndex]
      // 根据权重概率得到中奖物品ID
      const random = Math.random()
      const validTrophyList = store.getters.trophies.filter(item => item.locked <= 0)
      console.log('scale list :', getScaleList(validTrophyList), validTrophyList)
      trophyId = getTrophyResult(getScaleList(validTrophyList))(random)
      // trophyId = 6
      console.log(random, trophyId)
      const revolvingLength = 8 * state.trophyRange.length + state.trophyRange.indexOf(trophyId) + 1
      // console.log('===', state.trophyRange, revolvingLength, state.trophyRange.indexOf(trophyId) + 1)
      let time = 450
      const singleRevolvLen = state.trophyRange.length
      for (let i = 0; i < revolvingLength; i++) {
        trophiesEle[i % singleRevolvLen === 0 ? singleRevolvLen - 1 : i % singleRevolvLen - 1].style.background = '#ffffff'
        trophiesEle[i % singleRevolvLen].style.background = '#ffe6a6'
        if (i < 8) time -= 50
        if (i > revolvingLength - 8) time += 50
        await wait(time)
      }
      luckyDrawEnd(trophyId)
    }

    function wait (time) {
      return new Promise(resolve => setTimeout(resolve, time))
    }

    function luckyDrawEnd (trophyId) {
      if (state.count > 0) {
        store.dispatch('lottery/minusOre', 200)
      }
      state.count++
      state.gridList[4].name = '200矿石/次'
      state.gridList[7].locked--
      state.gridList[8].locked--
      store.dispatch('lottery/unlockTrophy')
      if (state.gridList[7].locked === 0) {
        /**
         * 奖品 id 在九宫格分布
         * 1 4 6
         * 2   7
         * 3 5 lock
         */
        state.trophyRange = [1, 4, 6, 7, 5, 3, 2]
      }
      if (state.gridList[8].locked === 0) {
        /**
         * 奖品 id 在九宫格分布
         * 1 4 6
         * 2   7
         * 3 5 8
         */
        state.trophyRange = [1, 4, 6, 7, 8, 5, 3, 2]
      }
      const trophies = store.getters.trophies
      const myTrophy = trophies.filter((item) => item.id === trophyId)[0]
      state.myTrophies.push(myTrophy)
      console.log('恭喜你中奖', myTrophy.name)
      ElMessageBox.confirm(myTrophy.name, '恭喜您中奖', {
        confirmButtonText: '再抽一次',
        showCancelButton: false,
        center: true
      })

      if (trophyId === 1) {
        store.dispatch('lottery/addOre', 66)
      }
    }

    return {
      ...toRefs(state),
      luckyDraw,
      amountLotteyResult,
      doAction
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./css/luckyDraw.scss";
</style>
