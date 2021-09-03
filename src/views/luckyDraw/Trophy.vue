<template>
  <div
    class="trophy-item"
    v-if="data.imgSrc !== undefined && data.imgSrc.length > 0"
  >
    <img
      :src="data.imgSrc"
      :alt="data.name"
      srcset=""
      class="trophy-img-box"
    >
    <p>{{data.locked > 0 ? `再抽${data.locked}次解锁` : data.name}}</p>
    <div
      :class="data.locked > 0 ? 'item-lock': ''"
      v-if="data.locked > 0"
    >
      <svg-icon
        icon-class="lock"
        class="lock"
      ></svg-icon>
    </div>
  </div>
  <div
    class="trophy-item action-button"
    v-else
    @click="doAction"
  >
    <p class="action-title">抽奖</p>
    <p>{{data.name}}</p>
  </div>
</template>

<script>
import { debounce } from '@/utils/common'
export default {
  name: 'Trophy',
  props: {
    data: Object
  },
  methods: {
    doAction: debounce(function () {
      console.log('I will lottery')
      this.$emit('doAction')
    }, 200)
  },
  setup (props) {
    // console.log('props:', props.data.imgSrc)
  }
}
</script>

<style lang="scss" scoped>
.trophy-item {
  position: relative;
  height: 100px;
  width: 32%;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  .trophy-img-box {
    width: 40px;
    height: 40px;
  }
}
.item-lock {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: #ffffff;
  background: rgba(256, 256, 256, 0.7);
  .lock {
    position: absolute;
    right: 20px;
    top: 10px;
  }
}
.action-button {
  // height: 100px;
  // width: 32%;
  // border-radius: 5px;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
  // font-size: 14px;

  background-color: wheat;
  box-shadow: inset 0 0 16px orange;
  cursor: pointer;
  .action-title {
    font-size: 32px;
    color: #a74b00;
    font-weight: bold;
  }
}
</style>
