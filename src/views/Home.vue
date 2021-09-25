<template>
  <v-container class="px-8" fluid>
    <h1 class="h1">Meu Bloco de Notas</h1>

    <v-form>
      <v-text-field
        label="Título"
        v-model="novaTarefa"
      >
        <v-icon slot="append" @click="adicionar">mdi-send</v-icon>
      </v-text-field>
    </v-form>
    <v-divider></v-divider>

      <v-card id="card" class="d-flex justify-center align-center flex-column ma-10 elevation-0">
        <v-icon large color="lime">mdi-pen-plus</v-icon>
        <v-card-title>
          <h2 class="h2">
            Você ainda não tem anotações!
          </h2>
        </v-card-title>
      </v-card>
    <v-list>
      <v-list-item-group class="d-flex justify-between flex-column">
        <v-list-item
          class="lime darken-1 rounded-br-xl elevation-1 d-inline-flex flex-wrap mt-3 pa-md-4"
          v-for="tarefa of tarefas"
          :key="tarefa.id"
        >
          <v-list-item>
            {{ tarefa.título }}
          </v-list-item>
          <v-list-item class="white--text">
            Editado em: {{ tarefa.dataGravacao }}
            <v-spacer></v-spacer>
            <v-list-item-action @click.stop='deletar(tarefa.id)'>
              <v-icon color="red">mdi-delete</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-item>
      </v-list-item-group>
    </v-list>

  </v-container>
</template>

<script>
import * as fb from "@/plugins/firebase";
export default {
  data() {
    return {
      uid: "",
      novaTarefa: "",
      tarefas: [],
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
          dataGravacao: doc.data().dataGravacao
        });
      if (this.tarefas.length > 0){
        const card = document.getElementById('card')
        card.classList.remove('d-flex')
        card.classList.add('d-none')
        }
      }
    },
    async adicionar() {
      await fb.tasksCollection.add({
        título: this.novaTarefa,
        dataGravacao: new Date().toISOString().slice(0, 10),
        owner: this.uid,
      });
      this.novaTarefa = "";
      this.buscarTarefas();
    },
    async deletar(id){
      await fb.tasksCollection.doc(id).delete()
      this.buscarTarefas()
    }
  },
};
</script>

<style scoped>

</style>