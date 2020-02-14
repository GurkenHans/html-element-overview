<template>
  <div id="app">
    <nav class="title-bar">
      <div class="container">
        <router-link to="/" class="brand">
          <img :src="require('@/assets/main-icon.svg')" alt="logo">

          <span>HTML Element Overview<sup class="beta-tag">beta</sup></span>
        </router-link>
      </div>
    </nav>

    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>

    <footer>
      <div class="container">
        <router-link to="/">Home</router-link>
        <span class="divider">|</span>
        <router-link to="/about">About</router-link>
        <span class="divider">|</span>
        <router-link to="/privacy">Privacy policy</router-link>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .15s;
}

.fade.fade-enter-active {
  transition-delay: .15s;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}

*,
::before,
::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box
}

*:focus {
  outline: .2rem solid rgba(12, 26, 29, .4);
}

body {
  font-family: 'Nunito', sans-serif;
  color: #0D1B1E;
  font-size: 1.1rem;
  line-height: 1.4;
  background-color: #eee
}

a {
  color: #0D1B1E;
  text-decoration: underline;
  transition: color .2s ease
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Manjari', sans-serif;
  margin: 1rem 0 .5rem;
}

h3 {
  font-size: 2rem;
}

h1 {
  margin-top: 0;
}

p {
  margin: 0 0 .5rem;
}

#app {
  position: relative;
  min-height: calc(100vh - 3.5rem);
  margin-bottom: 3.5rem;
}

nav.title-bar {
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  background: #fff;
  padding: .25rem 0;
  height: 3.5rem;
  box-shadow: 0 0 6px 5px rgba(0, 0, 0, .15);
  z-index: 80;
}

nav.title-bar .container {
  padding-top: 0;
  padding-bottom: 0;
  height: 100%;
  display: flex;
  align-items: center;
}

nav.title-bar .brand {
  font-size: 1.2rem;
  display: inline-flex;
  align-items: center;
}

nav.title-bar .brand img {
  height: 100%;
  max-height: 32px;
  width: auto;
  margin: 0 .5rem 0 0;
}

nav.title-bar a {
  text-decoration: none;
}

nav.title-bar button {
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  font-size: 2rem;
}

.beta-tag {
  font-size: 1rem;
}

.container {
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

footer {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #0D1B1E;
  color: #fff;
  height: 3.5rem;
}

footer a {
  color: #fff;
}

footer .container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem .75rem;
}

footer .divider {
  margin: 0 .5rem;
}
</style>