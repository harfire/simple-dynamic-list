<template>
  <div id="app">
    <nav>
      <router-link to="/">
        Home
      </router-link>
    </nav>
    <router-view />
  </div>
</template>

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
