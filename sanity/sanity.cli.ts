import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '2il0jzpa',
    dataset: 'production'
  },
  studioHost: 'vicenteestay',
  deployment: {
    autoUpdates: true,
    appId: 'kce8da36ns7tagp4ocmd9npw',
  }
})
