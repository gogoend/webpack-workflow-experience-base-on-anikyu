<template>
  <div>
    <div>{{ msg }}</div>
    <input v-model="msg">
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'gogoend',
  data () {
    return {
      msg: ''
    }
  },
  mounted() {
    console.log('Vue', 'RUN!!!','GOGOEND!!!')
    /**
     * if块最终将被我们所编写的Babel插件删除
     */
    if(GOGOEND) {
      console.log('Vue', 'STOP!!!','GOGOEND!!!')
    }
  }
})
</script>
