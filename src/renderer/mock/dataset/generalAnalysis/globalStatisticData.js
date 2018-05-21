/* eslint-disable */
import Mock from "mockjs";

export default () => {
  let data = []
  for (var regionId = 1; regionId <= 12; regionId++) {
    data.push(Mock.mock({
      'sumKill|0-100': 45,
      'sumProp|5000-1000000': 93500,
      'regionName': "North America",
      'sumWound|0-50': 33,
      'region': regionId,
      'count|1-300': 54
    }))
  }
  return data
}
