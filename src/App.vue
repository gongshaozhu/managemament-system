<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  },
  async mounted() {
    /* const eventSource = new EventSource('http://localhost:3000/cats/sse');
     eventSource.onmessage = ({ data }) => {
       console.log('New message', data);
     };
     eventSource.onerror = () => {
       console.log('error')
     }
     const b = await this.$api.a.getHome()
     console.log(b)*/
  },
  methods: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  height: 100%;
}
</style>
