module.exports = {
  pwa: {
    name: 'Inventario',
    short_name: 'Inventario',
    description: 'Aplicación para almacenar registros de productos y sus datos de forma local o en línea.',
    themeColor: '#5D737E',
    display: 'standalone',
    background_color: '#2E3037'
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/main.scss";'
      }
    }
  }
}