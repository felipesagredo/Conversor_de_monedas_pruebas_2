<template>
  <div>
    <h1>Valor de la UF en CLP para una fecha específica</h1>
    <label for="amount">Monto en UF:</label>
    <input type="number" v-model="amount" id="amount" step="1" min="0">
    <input type="date" v-model="selectedDate">
    <button @click="getUFValue">Convertir UF a CLP</button>
    <p v-if="ufValue">Fecha: {{ formattedDate(ufValue.fecha) }}<br>Valor UF: ${{ ufValue.valor }}<br>Monto en CLP: ${{
      convertedAmount }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      ufValue: null,
      selectedDate: null,
      amount: null
    };
  },
  computed: {
    convertedAmount() {
      if (!this.amount || !this.ufValue) {
        return 0;
      }
      // Realiza la conversión y redondea hacia arriba
      const amountInCLP = Math.ceil(this.amount * this.ufValue.valor);
      // Formatea a un número sin decimales
      return new Intl.NumberFormat('es-CL', { maximumFractionDigits: 0 }).format(amountInCLP);
    }
  },
  methods: {
    async getUFValue() {
      if (!this.selectedDate) {
        alert('Seleccione una fecha.');
        return;
      }

      const formattedDate = this.formatDate(this.selectedDate);

      try {
        const response = await axios.get(`http://localhost:3000/uf/${formattedDate}`);
        this.ufValue = response.data.serie[0];  // Obtiene el primer elemento de la serie
      } catch (error) {
        console.error('Error al obtener el valor de la UF:', error);
      }
    },
    formatDate(date) {
      const [year, month, day] = date.split('-');
      return `${day}-${month}-${year}`;
    },
    formattedDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-CL', options);
    }
  }
};
</script>

<style scoped>
/* Estilos opcionales para tu componente */
</style>