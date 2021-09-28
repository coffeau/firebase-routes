<template>
  <v-row justify="end" class="px-7">
    <v-dialog v-model="dialog" max-width="800px">
        <template v-slot:activator="{ on, attrs }">
                <v-btn
                class="teal darken-3"
                dark
                icon
                fab
                large
                v-bind="attrs"
                v-on="on"
                >
                <v-icon dark>mdi-pen-plus</v-icon>
                </v-btn>
        </template>
        <v-card>
            <v-form>
                <v-row justify="center" class="ma-lg-2">
                    <v-col cols="10">
                        <v-text-field v-model="notas.titulo" label="Título"></v-text-field>
                        <v-textarea auto-grow outlined label="Conteúdo" v-model="notas.texto"></v-textarea>
                        <v-btn color="lime darken-1" @click="salvar">Salvar</v-btn>
                        <v-btn color="red" class="ml-2" @click="reset">Cancelar</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>
    </v-dialog>
    </v-row>
</template>

<script>
export default {
    data(){
        return{
            notas: {},
            dialog:false,
        }
    },
    methods:{
        reset() {
            this.notas = {};
            this.dialog = false
        },

        salvar() {
            this.$emit('adicionar', this.notas)
            this.dialog = false
        }
    }
};
</script>

<style>
</style>