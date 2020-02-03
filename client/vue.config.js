module.exports = {
  pwa: {
    name: 'HTML Element Overview',
    themeColor: '#0D1B1E',
    msTileColor: '#0D1B1E',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js'
    }
  }
}