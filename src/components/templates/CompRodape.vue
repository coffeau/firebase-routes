<template>
  <footer class="footer">
    <p>
      Username: <input v-model="username" type="text">
    </p>
    <button @click="irHome">Ir para Home</button>
    <button @click="irUsuario">Ir para Usuario</button>
  </footer>
</template>

<script>
export default {
  methods: {
    irHome() {
      this.$router.push({ name: "Home" });
    },
    irUsuario() {
      this.$router.push({ name:"usuario", params: { username: this.username }})
    },
  },
}
</script>

<style scoped>

</style>