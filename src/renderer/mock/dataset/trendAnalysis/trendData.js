/* eslint-disable */
import Mock from 'mockjs'

export default () => {
  let data = []


  for(var year = 1970; year <= 2016; year++) {
    data.push({
      'sumProp': Mock.Random.integer(10000 + 1000 * (year - 1970) * (year - 1970), 10000000 + 1000 * (year - 1970) * (year - 1970) * (year - 1970)),
      'sumWound': Mock.Random.integer(10 * (year - 1970), 100 * (year - 1970)),
      'sumKill': Mock.Random.integer(5 * (year - 1970), 50 * (year - 1970)),
      'year': year,
      'count': Mock.Random.integer(50 * (year - 1970), 200 * (year - 1970))
    })
  }

  return data
}