<template>
  <v-app>
    <v-img max-height="150px" class="rounded-br-xl" src="@/assets/images/foto1.jpg">
      <v-app-bar app flat color="rgba(0, 0, 0, 0)">
        <v-spacer></v-spacer>
        <v-icon color="red">mdi-account</v-icon>
      </v-app-bar>
    </v-img>
    <v-navigation-drawer app v-model="sidebar" :mini-variant.sync="mini" color="teal darken-4" dark>
      <v-list dense>
        <v-list-item @click.stop="mini = !mini">
          <v-list-item-action >
            <v-icon>mdi-chevron-left</v-icon>
          </v-list-item-action>
          <v-list-item-title><h3>Lista de Tarefas</h3></v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>{{ nome }}</v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item v-for="item of items" :key="item.title" link :to="item.to" class="teal--text">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>{{ item.title }}</v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer app class="py teal darken-3" dark
      ><span class="caption">Eduarda Saibert &copy;2021</span></v-footer
    >
  </v-app>
</template>

<script>
import * as fb from '@/plugins/firebase'
export default {
  name: "App",
  components: {},
  data() {
    return{
      sidebar:true,
      mini: false,
      nome: "",
      items: [
        {title: "Home", icon:"mdi-home", to:"/"},
        {title: "Perfil", icon:"mdi-account-cog", to:"/perfil"},
        {title: "Sair", icon:"mdi-exit-to-app", to:"/login"},
      ]
    }
  },
  async mounted(){
    this.uid = fb.auth.currentUser.uid;
    const userProfile = await fb.profileCollection
      .where("uid", "==", this.uid)
      .get();
    if (userProfile.docs.length > 0) {
      const perfil = userProfile.docs[0]
      this.nome = perfil.data().nome
    }
  },
};
</script>

<style></style>
