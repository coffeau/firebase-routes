<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="sidebar = !sidebar"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-icon>mdi-account</v-icon>
    </v-app-bar>
    <v-navigation-drawer app v-model="sidebar" :mini-variant.sync="mini">
      <v-list dense color="primary" dark>
        <v-list-item>
          <v-list-item-action @click.stop="sidebar = !sidebar">
            <v-icon>mdi-chevron-left</v-icon>
          </v-list-item-action>
          <v-list-item-title><h3>Lista de Tarefas</h3></v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list-item @click.stop="mini = !mini">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>Duds</v-list-item-content>
        <v-btn icon small ><v-icon>mdi-chevron-left</v-icon></v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item v-for="item of items" :key="item.title" link :to="item.to">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>{{ item.title }}</v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer app class="py"
      ><span class="caption">MyTodoList &copy;2021</span></v-footer
    >
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return{
      sidebar:true,
      mini: false,
      items: [
        {title: "Home", icon:"mdi-home", to:"/"},
        {title: "Perfil", icon:"mdi-account-cog", to:"/perfil"},
        {title: "Sair", icon:"mdi-exit-to-app", to:"/login"},
      ]
    }
  },
};
</script>

<style></style>
