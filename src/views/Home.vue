<template>
  <v-container class="px-8" fluid>

    <v-row class="py-7">
      <h1 class="h1 ms-2">Meu Bloco de Notas</h1>
      <dialogg v-on:adicionar='adicionar'></dialogg>
    </v-row>
    
    <v-divider></v-divider>

      <v-card id="card" class="d-flex justify-center align-center flex-column ma-10 elevation-0">
        <v-icon large color="lime">mdi-pen-plus</v-icon>
        <v-card-title>
          <h2 class="h2">
            Você ainda não tem anotações!
          </h2>
        </v-card-title>
      </v-card>
    
    <v-container fluid>
      <v-row dense>
          <v-col
            v-for="tarefa of tarefas"
            :key="tarefa.id"
            :cols="tarefa.flex"
          >
            <v-card class="lime darken-1 elevation-1 pa-md-2">
              <v-list-item @click.stop='mostrarDialog(tarefa)'>
                <h4 class="h4">
                {{ tarefa.título }}
                </h4>
              </v-list-item>
              <v-list-item class="white--text">
                Editado em: {{ tarefa.dataGravacao }}
                <v-spacer></v-spacer>
                <v-list-item-action @click.stop='deletar(tarefa.id)'>
                  <v-icon color="red">mdi-delete</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-card>
          </v-col>
      </v-row>
    </v-container>

 <v-row>
    <v-dialog v-model="showDialog" max-width="800px">
      <v-card>
        <v-card-title>
          {{titulo}}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-subtitle class="my-2">
            <p style="white-space: pre-line">
              {{texto}}
            </p>
        </v-card-subtitle>
        <v-card-text>
            <v-footer> {{data}} </v-footer>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
  </v-container>
</template>

<script>
import * as fb from "@/plugins/firebase";
import dialogg from '../components/dialog.vue';

export default {
  components: {dialogg} ,
  data() {
    return {
      uid: "",
      novaTarefa: {},
      tarefas: [],
      showDialog: false,
      titulo: "",
      texto: "",
      data: "",
    };
  },
  mounted() {
    this.uid = fb.auth.currentUser.uid;
    this.buscarTarefas();
  },
  methods: {
    async buscarTarefas() {
      this.tarefas = [];
      const logTasks = await fb.tasksCollection
        .where("owner", "==", this.uid)
        .get();
      for (const doc of logTasks.docs) {
        this.tarefas.push({
          id: doc.id,
          título: doc.data().título,
          texto: doc.data().texto,
          dataGravacao: doc.data().dataGravacao
        });
      if (this.tarefas.length > 0){
        const card = document.getElementById('card')
        card.classList.remove('d-flex')
        card.classList.add('d-none')
        }
      }
    },
    async adicionar(novaTarefa) {
      this.novaTarefa = novaTarefa
      await fb.tasksCollection.add({
        título: novaTarefa.titulo,
        texto: novaTarefa.texto,
        dataGravacao: new Date().toISOString().slice(0, 10),
        owner: this.uid,
      });
      this.novaTarefa = {};
      this.buscarTarefas();
    },
    async deletar(id){
      await fb.tasksCollection.doc(id).delete()
      this.buscarTarefas()
    },
    mostrarDialog(tarefa){
      this.titulo = tarefa.título
      this.texto = tarefa.texto
      this.data = tarefa.dataGravacao
      this.showDialog = !this.showDialog
    }
  },
};
</script>

<style scoped>

</style>