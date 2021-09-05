<template>
  <div class="setup-box">
    <el-form
      label-position="left"
      label-width="100px"
      size="mini"
    >
      <p v-if="oreSetupShow">矿石设置</p>
      <el-form-item
        label="矿石数量："
        v-if="oreSetupShow"
      >
        <el-input
          v-model="oreAmount"
          class="half-width"
        ></el-input>
      </el-form-item>
      <p>奖品权重设置</p>
      <el-row :gutter="20">
        <el-col
          :span="8"
          v-for="item in weightSetup"
          :key="item.id"
        >
          <el-form-item :label="item.name">
            <el-input
              v-model="item.weight"
              class="half-width"
              :disabled="item.locked > 0"
            ></el-input>
            <span v-if="weight">{{`${ (parseInt(item.weight) / weight * 100).toFixed(2) }%`}}</span>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <el-button
      @click="done"
      type="primary"
    >更新设置</el-button>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useStore } from 'vuex'
import { computed, onMounted } from '@vue/runtime-core'
import { updateLotterySetupApi } from '@/api/lottery'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
export default {
  name: 'LotterySetup',
  setup () {
    const store = useStore()
    const route = useRoute()
    const state = reactive({
      weightSetup: computed(() => store.getters.trophies.filter(item => item.locked <= 0)),
      weight: computed(() => {
        let weight = 0
        store.getters.trophies.forEach(item => {
          if (item.locked <= 0) weight += parseInt(item.weight)
        })
        return weight
      }),
      oreAmount: store.getters.oreAmount,
      oreSetupShow: computed(() => {
        return route.name !== 'LuckyDrawPro'
      })
    })

    onMounted(() => {
      // state.weightSetup = store.getters.trophies
      console.log('.......', state.weightSetup)
    })

    function done () {
      store.dispatch('lottery/updateOre', parseInt(state.oreAmount))
      if (route.name === 'LuckyDrawPro') {
        const params = {
          oreAmount: state.oreAmount,
          trophyList: state.weightSetup
        }
        updateLotterySetupApi(params).then(res => {
          console.log('res', res)
          if (res.retCode === 200) {
            ElMessage.success('权重更新成功')
          } else {
            ElMessage.error(res.retMsg)
          }
        })
      }
    }

    return {
      ...toRefs(state),
      done
    }
  }
}
</script>

<style lang="scss" scoped>
.setup-box {
  margin: 20px;
  p {
    font-size: 1.5rem;
    line-height: 2em;
  }
  .half-width {
    width: 50%;
    margin-right: 20px;
  }
}
</style>
