<template>
  <div class="setup-box">
    <el-form
      label-position="left"
      label-width="100px"
      size="mini"
    >
      <p>矿石设置</p>
      <el-form-item label="矿石数量：">
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
export default {
  name: 'LotterySetup',
  setup () {
    const store = useStore()
    const state = reactive({
      weightSetup: computed(() => store.getters.trophies.filter(item => item.locked <= 0)),
      weight: computed(() => {
        let weight = 0
        store.getters.trophies.forEach(item => {
          if (item.locked <= 0) weight += parseInt(item.weight)
        })
        return weight
      }),
      oreAmount: store.getters.oreAmount
    })

    onMounted(() => {
      // state.weightSetup = store.getters.trophies
      console.log('.......', state.weightSetup)
    })

    function done () {
      // state.weight = 0
      // state.weightSetup.forEach(item => {
      //   state.weight += parseInt(item.weight)
      // })
      store.dispatch('lottery/updateOre', parseInt(state.oreAmount))
      console.log('-------0->', state.weightSetup)
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
