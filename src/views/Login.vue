<template>
  <v-container fill-height fluid text-center class="teal darken-4">
    <v-container>
      <v-row>
        <v-col
          class="red--text text-center mx-auto pb-4"
          cols="1"
          sm="4"
          offset="4"
          ><h1 class="h1">Login</h1>
        </v-col>
      </v-row>
      <v-row class="elevation-3 mx-auto teal darken-3">
        <v-col cols="auto">
          <v-img
            max-height="270"
            max-width="500"
            src="@/assets/images/JUEKI.jpg"
          ></v-img>
        </v-col>
        <v-col>
          <v-form class="pa-md-4">
            <v-text-field
              label="E-mail"
              color="red"
              v-model="user.email"
            ></v-text-field>
            <v-text-field
              color="red"
              label="Senha"
              v-model="user.password"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="show = !show"
            ></v-text-field>
            <v-btn color="lime darken-1" @click="login">Login</v-btn>
            <v-btn color="red" class="ml-2" @click="reset">Cancelar</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar color="red" v-model="errorLogin" danger multline timeout="2000"
      >Usuário ou senha inválidos</v-snackbar
    >
    <v-dialog v-model="novaConta" persistent max-width="300px">
      <v-card>
        <v-card-title>Conta não encontrada.</v-card-title>
        <v-card-text
          >A conta não foi localizada. Deseja criar uma nova conta?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="criarNovaConta">Sim</v-btn>
          <v-btn color="red darken-1" text @click="novaConta = false"
            >Não</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import * as fb from "@/plugins/firebase";
export default {
  data() {
    return {
      user: {},
      show: false,
      errorLogin: false,
      novaConta: false,
    };
  },
  methods: {
    reset() {
      this.user = {};
    },
    async login() {
      try {
        await fb.auth.signInWithEmailAndPassword(
          this.user.email,
          this.user.password
        );
        this.$router.push({
          name: "Home",
        });
      } catch (error) {
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/wrong-password":
            this.errorLogin = true;
            break;
          case "auth/invalid-email":
            this.errorLogin = true;
            break;
          case "auth/user-not-found":
            this.novaConta = true;
            break;
          default:
            this.errorLogin = true;
            break;
        }
      }
    },
    async criarNovaConta() {
      this.novaConta = false;
      await fb.auth.createUserWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      this.login();
    },
  },
};
</script>

<style scoped>
</style>