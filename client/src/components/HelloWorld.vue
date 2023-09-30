<template>
  <div>
    <h1>Valor Actual de la UF en CLP</h1>
    <button @click="getUFValue">Obtener Valor de la UF</button>
    <p v-if="ufValue">{{ ufValue }}</p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      ufValue: null
    };
  },
  methods: {
    async getUFValue() {
      try {
        const response = await axios.get('http://localhost:3000/uf');
        this.ufValue = response.data;
      } catch (error) {
        console.error('Error al obtener el valor de la UF:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Estilos opcionales para tu componente*/
</style>