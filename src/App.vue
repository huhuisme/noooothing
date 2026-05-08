<template>
  <div id="app">
    <div class="container">
      <router-view />
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Footer
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Roboto, sans-serif;
}

body {
  background: linear-gradient(135deg, #121218, #1a1a25, #201a2b);
  min-height: 100vh;
  color: #fff;
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

header {
  text-align: center;
  margin: 50px 0 30px;
}

.title {
  font-size: 42px;
  color: #ff4655;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 18px;
  color: #b0b0c8;
  max-width: 600px;
  margin: 0 auto;
}
</style>