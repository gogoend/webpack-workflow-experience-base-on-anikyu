<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

function Log (Ctor, key, target) {
  let originValue = target.value
  target.value = function (...args) {
    console.log(`${key}将被调用`, args)
    originValue.call(this, ...args)
    console.log(`${key}已被调用`, args)
  }
}

class Phone {
  constructor(phoneOwnerName) {
    this.phoneOwnerName = phoneOwnerName
  }
  @Log
  callTo(someone) {
    console.warn(`${this.phoneOwnerName}正在呼叫${someone}`)
  }
}

console.log(new Phone('gogoend').callTo('marry'))

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
