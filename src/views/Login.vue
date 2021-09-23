<template>
  <v-container fill-height fluid text-center>
    <v-container>
      <v-row>
        <v-col
          class="primary--text text-center mx-auto pb-4"
          cols="1"
          sm="4"
          offset="4"
          ><h1 class="h1">Login</h1>
        </v-col>
      </v-row>
      <v-row class="elevation-3 mx-auto">
        <v-col cols="auto">
          <v-img
            max-height="270"
            max-width="500"
            src="@/assets/images/JUEKI.jpg"
          ></v-img>
        </v-col>
        <v-col>
          <v-form class="pa-md-4">
            <v-text-field label="E-mail" v-model="user.email"></v-text-field>
            <v-text-field
              label="Senha"
              v-model="user.password"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="show = !show"
            ></v-text-field>
            <v-btn color="primary" @click="login">Login</v-btn>
            <v-btn color="warning" class="ml-2" @click="reset">Cancelar</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar
      color="red"
      v-model="errorLogin"
      danger
      multline
      timeout="2000"
    >Usuário ou senha inválidos</v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      show: false,
      errorLogin: false,
    };
  },
  methods: {
    reset() {
      this.user = {};
    },
    login() {
      if (this.user.email === "duds" && this.user.password === "1234") {
        this.$router.push({
          name: "Home",
        });
      } else {
        this.errorLogin = true;
      }
    },
  },
};
</script>

<style>
</style>