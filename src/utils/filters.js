import Vue from 'vue'

// Formatea palabras agregando "s" en caso de ser necesario
const format_plural = (amount, word) => {
  if (amount === 1) return `${amount} ${word}`
  return `${amount} ${word}s`
}

const filters = {
  format_plural
}

Object.keys(filters)
  .forEach( key => Vue.filter(key, filters[key]) )