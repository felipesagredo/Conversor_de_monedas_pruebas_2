<template>
  <div>
    <h1>Valor de la UF en CLP para una fecha específica</h1>
    <form @submit.prevent="convertUF">
      <label for="amount">Monto en UF:</label>
      <input type="number" v-model="amount" id="amount" step="1" min="0">
      <input type="date" v-model="selectedDate">
      <button type="submit">Convertir UF a CLP</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <p v-else-if="ufValue">
      Fecha: {{ formattedDate(ufValue.fecha) }}<br>
      Valor UF: ${{ ufValue.valor }}<br>
      Monto en CLP: ${{ convertedAmount }}
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      ufValue: null,
      selectedDate: null,
      amount: null,
      error: null
    };
  },
  computed: {
    convertedAmount() {
      if (!this.amount || !this.ufValue) {
        return 0;
      }
      const amountInCLP = Math.ceil(this.amount * this.ufValue.valor);
      return new Intl.NumberFormat('es-CL', { maximumFractionDigits: 0 }).format(amountInCLP);
    }
  },
  methods: {
    async convertUF() {
      if (!this.selectedDate) {
        this.error = 'Seleccione una fecha.';
        return;
      }

      const formattedDate = this.formatDate(this.selectedDate);

      try {
        const response = await axios.get(`http://localhost:3000/uf/${formattedDate}`);
        this.ufValue = response.data.serie[0];
        this.error = null;  // Limpiar errores anteriores
      } catch (error) {
        console.error('Error al obtener el valor de la UF:', error);
        this.error = 'Error al obtener el valor de la UF.';
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
