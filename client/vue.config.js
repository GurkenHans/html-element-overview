module.exports = {
  pwa: {
    name: 'Nico\'s page',
    themeColor: '#0D1B1E',
    msTileColor: '#0D1B1E',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js'
    }
  }
}