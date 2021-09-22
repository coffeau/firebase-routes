<template>
  <div id="app">
    <compCabecalho />
    <div class="nav">
      <router-link :to="{ name: 'Home' }">Home</router-link> 
      <router-link to="/p2">P2</router-link> 
      <router-link :to="{ name: 'usuario', params: { username }}">Perfil</router-link> 
    </div>

    <div class="content">
      <router-view></router-view>
      <br />

    </div>
    <compRodape />
  </div>
</template>

<script>
import CompCabecalho from "@/components/templates/CompCabecalho"
import CompRodape from "@/components/templates/CompRodape"
import './assets/css/main.css'
export default {
  name: "App",
  components:{ CompCabecalho, CompRodape },
  data(){
    return{
      username: ""
    }
  },
};
</script>

<style>

</style>