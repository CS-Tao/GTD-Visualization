import data from '../dataset/dashboard/generalData'

export default {
  getGeneral: config => {
    console.log('Mock: ' + config.url)
    return data()
  }
}
