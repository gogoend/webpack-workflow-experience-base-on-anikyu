<template>
  <div>
    <div>{{ msg }}</div>
    <input v-model="msg">
  </div>
</template>

<script>
export default {
  name: 'gogoend',
  data () {
    return {
      msg: ''
    }
  }
}
</script>
