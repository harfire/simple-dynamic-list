<template>
  <div id="app">
    <SimpleList msg="Simple Dynamic List" />
  </div>
</template>

<script>
import SimpleList from './components/SimpleList.vue';

export default {
  name: 'simple-list',
  components: {
    SimpleList
  }
};
</script>

<style lang="scss">
@import './assets/sass/main.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
