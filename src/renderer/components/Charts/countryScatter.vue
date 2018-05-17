<template>
  <scatter :id='id'
        height="100%"
        width="100%"
        :data="params"
        :time="timeList"
        :countryName="[selectName]">
  </scatter>
</template>

<script>
import scatter from './scatter'

export default {
  name: 'countryScatter',
  components: {scatter},
  props: {
    id: {
      type: String,
      default: ''
    },
    countryNameList: {
      type: Array,
      default () {
        return [
          {id: 0, name: 'Canada'},
          {id: 1, name: 'Greenland'},
          {id: 2, name: 'Iceland'},
          {id: 3, name: 'United States'}
        ]
      }
    },
    startString: {
      type: String,
      default () {
        return '19900101'
      }
    },
    endString: {
      type: String,
      default () {
        return '19910101'
      }
    },
    obj: {
      // 接受到的数据
      type: Object,
      default: function () {
        return {
          'type': 'FeatureCollection',
          'features': [
            {
              'id': '199011050006',
              'type': 'Feature',
              'geometry': {
                'coordinates': [
                  -74.005941,
                  40.712784
                ],
                'type': 'Point'
              },
              'properties': {
                'year': 1990,
                'month': 11,
                'day': 5,
                'city': 'New York City ',
                'country': {
                  'countryId': 165,
                  'countryName': 'United States',
                  'region': 1
                },
                'dayInYear': 309
              }
            },
            {
              'id': '199011000002',
              'type': 'Feature',
              'geometry': {
                'coordinates': [
                  -85.139351,
                  41.079273
                ],
                'type': 'Point'
              },
              'properties': {
                'year': 1990,
                'month': 11,
                'day': 28,
                'city': 'Fort Wayne ',
                'country': {
                  'countryId': 165,
                  'countryName': 'United States',
                  'region': 1
                },
                'dayInYear': 332
              }
            },
            {
              'id': '199009220011',
              'type': 'Feature',
              'geometry': {
                'coordinates': [
                  -77.12916,
                  38.848033
                ],
                'type': 'Point'
              },
              'properties': {
                'year': 1990,
                'month': 9,
                'day': 22,
                'city': "Bailey's Crossroads ",
                'country': {
                  'countryId': 165,
                  'countryName': 'United States',
                  'region': 1
                },
                'dayInYear': 265
              }
            },
            {
              'id': '199009150005',
              'type': 'Feature',
              'geometry': {
                'coordinates': [
                  -117.164736,
                  32.71361
                ],
                'type': 'Point'
              },
              'properties': {
                'year': 1990,
                'month': 9,
                'day': 15,
                'city': 'San Diego ',
                'country': {
                  'countryId': 165,
                  'countryName': 'United States',
                  'region': 1
                },
                'dayInYear': 258
              }
            },
            {
              'id': '199009120015',
              'type': 'Feature',
              'geometry': {
                'coordinates': [
                  -71.802354,
                  42.26299
                ],
                'type': 'Point'
              },
              'properties': {
                'year': 1990,
                'month': 9,
                'day': 12,
                'city': 'Worcester ',
                'country': {
                  'countryId': 165,
                  'countryName': 'United States',
                  'region': 1
                },
                'dayInYear': 255
              }
            },
            {
              'id': '199009040008',
              'type': 'Feature',
              'geometry': {
                'coordinates': [
                  -122.031073,
                  37.977978
                ],
                'type': 'Point'
              },
              'properties': {
                'year': 1990,
                'month': 9,
                'day': 4,
                'city': 'Concord ',
                'country': {
                  'countryId': 165,
                  'countryName': 'United States',
                  'region': 1
                },
                'dayInYear': 247
              }
            },
            {
              'id': '199008160013',
              'type': 'Feature',
              'geometry': {
                'coordinates': [
                  -122.891429,
                  47.039225
                ],
                'type': 'Point'
              },
              'properties': {
                'year': 1990,
                'month': 8,
                'day': 16,
                'city': 'Olympia ',
                'country': {
                  'countryId': 165,
                  'countryName': 'United States',
                  'region': 1
                },
                'dayInYear': 228
              }
            },
            {
              'id': '199007280007',
              'type': 'Feature',
              'geometry': {
                'coordinates': [
                  -117.867834,
                  33.745573
                ],
                'type': 'Point'
              },
              'properties': {
                'year': 1990,
                'month': 7,
                'day': 28,
                'city': 'Santa Ana ',
                'country': {
                  'countryId': 165,
                  'countryName': 'United States',
                  'region': 1
                },
                'dayInYear': 209
              }
            },
            {
              'id': '199007110005',
              'type': 'Feature',
              'geometry': {
                'coordinates': [
                  -122.392934,
                  40.587515
                ],
                'type': 'Point'
              },
              'properties': {
                'year': 1990,
                'month': 7,
                'day': 11,
                'city': 'Redding ',
                'country': {
                  'countryId': 165,
                  'countryName': 'United States',
                  'region': 1
                },
                'dayInYear': 192
              }
            },
            {
              'id': '199006140008',
              'type': 'Feature',
              'geometry': {
                'coordinates': [
                  -80.201529,
                  25.764367
                ],
                'type': 'Point'
              },
              'properties': {
                'year': 1990,
                'month': 6,
                'day': 14,
                'city': 'Miami ',
                'country': {
                  'countryId': 165,
                  'countryName': 'United States',
                  'region': 1
                },
                'dayInYear': 165
              }
            },
            {
              'id': '199006100013',
              'type': 'Feature',
              'geometry': {
                'coordinates': [
                  -86.778365,
                  36.167783
                ],
                'type': 'Point'
              },
              'properties': {
                'year': 1990,
                'month': 6,
                'day': 10,
                'city': 'Nashville ',
                'country': {
                  'countryId': 165,
                  'countryName': 'United States',
                  'region': 1
                },
                'dayInYear': 161
              }
            },
            {
              'id': '199005240021',
              'type': 'Feature',
              'geometry': {
                'coordinates': [
                  -122.273024,
                  37.805065
                ],
                'type': 'Point'
              },
              'properties': {
                'year': 1990,
                'month': 5,
                'day': 24,
                'city': 'Oakland ',
                'country': {
                  'countryId': 165,
                  'countryName': 'United States',
                  'region': 1
                },
                'dayInYear': 144
              }
            },
            {
              'id': '199005230019',
              'type': 'Feature',
              'geometry': {
                'coordinates': [
                  -76.147389,
                  43.04999
                ],
                'type': 'Point'
              },
              'properties': {
                'year': 1990,
                'month': 5,
                'day': 23,
                'city': 'Syracuse ',
                'country': {
                  'countryId': 165,
                  'countryName': 'United States',
                  'region': 1
                },
                'dayInYear': 143
              }
            },
            {
              'id': '199005230013',
              'type': 'Feature',
              'geometry': {
                'coordinates': [
                  -74.005941,
                  40.712784
                ],
                'type': 'Point'
              },
              'properties': {
                'year': 1990,
                'month': 5,
                'day': 23,
                'city': 'New York City ',
                'country': {
                  'countryId': 165,
                  'countryName': 'United States',
                  'region': 1
                },
                'dayInYear': 143
              }
            },
            {
              'id': '199005200014',
              'type': 'Feature',
              'geometry': {
                'coordinates': [
                  -74.005941,
                  40.712784
                ],
                'type': 'Point'
              },
              'properties': {
                'year': 1990,
                'month': 5,
                'day': 20,
                'city': 'New York City ',
                'country': {
                  'countryId': 165,
                  'countryName': 'United States',
                  'region': 1
                },
                'dayInYear': 140
              }
            },
            {
              'id': '199005100013',
              'type': 'Feature',
              'geometry': {
                'coordinates': [
                  -123.017709,
                  38.8061
                ],
                'type': 'Point'
              },
              'properties': {
                'year': 1990,
                'month': 5,
                'day': 10,
                'city': 'Cloverdale ',
                'country': {
                  'countryId': 165,
                  'countryName': 'United States',
                  'region': 1
                },
                'dayInYear': 130
              }
            },
            {
              'id': '199005090009',
              'type': 'Feature',
              'geometry': {
                'coordinates': [
                  -122.675629,
                  45.511795
                ],
                'type': 'Point'
              },
              'properties': {
                'year': 1990,
                'month': 5,
                'day': 9,
                'city': 'Portland ',
                'country': {
                  'countryId': 165,
                  'countryName': 'United States',
                  'region': 1
                },
                'dayInYear': 129
              }
            },
            {
              'id': '199004270007',
              'type': 'Feature',
              'geometry': {
                'coordinates': [
                  -75.979278,
                  36.848311
                ],
                'type': 'Point'
              },
              'properties': {
                'year': 1990,
                'month': 4,
                'day': 27,
                'city': 'Virginia Beach ',
                'country': {
                  'countryId': 165,
                  'countryName': 'United States',
                  'region': 1
                },
                'dayInYear': 117
              }
            },
            {
              'id': '199004230010',
              'type': 'Feature',
              'geometry': {
                'coordinates': [
                  -121.954262,
                  37.355509
                ],
                'type': 'Point'
              },
              'properties': {
                'year': 1990,
                'month': 4,
                'day': 23,
                'city': 'Santa Clara ',
                'country': {
                  'countryId': 165,
                  'countryName': 'United States',
                  'region': 1
                },
                'dayInYear': 113
              }
            },
            {
              'id': '199004220007',
              'type': 'Feature',
              'geometry': {
                'coordinates': [
                  -77.087384,
                  38.793002
                ],
                'type': 'Point'
              },
              'properties': {
                'year': 1990,
                'month': 4,
                'day': 22,
                'city': 'Alexandria ',
                'country': {
                  'countryId': 165,
                  'countryName': 'United States',
                  'region': 1
                },
                'dayInYear': 112
              }
            },
            {
              'id': '199004220006',
              'type': 'Feature',
              'geometry': {
                'coordinates': [
                  -121.789444,
                  36.940556
                ],
                'type': 'Point'
              },
              'properties': {
                'year': 1990,
                'month': 4,
                'day': 22,
                'city': 'Freedom ',
                'country': {
                  'countryId': 165,
                  'countryName': 'United States',
                  'region': 1
                },
                'dayInYear': 112
              }
            },
            {
              'id': '199003300018',
              'type': 'Feature',
              'geometry': {
                'coordinates': [
                  -71.004164,
                  42.252285
                ],
                'type': 'Point'
              },
              'properties': {
                'year': 1990,
                'month': 3,
                'day': 30,
                'city': 'Quincy ',
                'country': {
                  'countryId': 165,
                  'countryName': 'United States',
                  'region': 1
                },
                'dayInYear': 89
              }
            },
            {
              'id': '199002220013',
              'type': 'Feature',
              'geometry': {
                'coordinates': [
                  -118.245319,
                  34.05349
                ],
                'type': 'Point'
              },
              'properties': {
                'year': 1990,
                'month': 2,
                'day': 22,
                'city': 'Los Angeles ',
                'country': {
                  'countryId': 165,
                  'countryName': 'United States',
                  'region': 1
                },
                'dayInYear': 53
              }
            },
            {
              'id': '199002080006',
              'type': 'Feature',
              'geometry': {
                'coordinates': [
                  -84.016279,
                  36.012576
                ],
                'type': 'Point'
              },
              'properties': {
                'year': 1990,
                'month': 2,
                'day': 8,
                'city': 'Knoxville ',
                'country': {
                  'countryId': 165,
                  'countryName': 'United States',
                  'region': 1
                },
                'dayInYear': 39
              }
            },
            {
              'id': '199001300018',
              'type': 'Feature',
              'geometry': {
                'coordinates': [
                  -110.925752,
                  32.222232
                ],
                'type': 'Point'
              },
              'properties': {
                'year': 1990,
                'month': 1,
                'day': 30,
                'city': 'Tucson ',
                'country': {
                  'countryId': 165,
                  'countryName': 'United States',
                  'region': 1
                },
                'dayInYear': 30
              }
            },
            {
              'id': '199001300017',
              'type': 'Feature',
              'geometry': {
                'coordinates': [
                  -95.433578,
                  29.729316
                ],
                'type': 'Point'
              },
              'properties': {
                'year': 1990,
                'month': 1,
                'day': 30,
                'city': 'Houston ',
                'country': {
                  'countryId': 165,
                  'countryName': 'United States',
                  'region': 1
                },
                'dayInYear': 30
              }
            }
          ]
        }
      }
    },
    selectId: {
      // 外部传入，用于指定高亮的country名
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      params: [],
      timeList: [],
      dataList: [],
      monthList: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    }
  },
  mounted () {
    this.initChart()
  },
  computed: {
    selectName: function () {
      return this.getNameById(this.selectId)
    },
    start () {
      return (Number(this.startString.substring(0, 4)) - 1970) * 12 + Number(this.startString.substring(4, 6))
    },
    end () {
      return (Number(this.endString.substring(0, 4)) - 1970) * 12 + Number(this.endString.substring(4, 6)) + 1
    }
  },
  watch: {
    obj () {
      this.initChart()
    },
    endString (newEnd, oldEnd) {
      var res = []
      if (this.start >= newEnd) {
        console.log('start time error!')
        return
      }
      for (var i = this.start; i < newEnd; i++) {
        res.push(this.monthList[i % 12])
      }
      this.timeList = res
    },
    selectId (newId, oldId) {
      if (this.obj === {} || newId === -1) {
        return
      }
      var d = this.dataList[this.getNameById(newId)]
      this.params = d
    }
  },
  methods: {

    initChart () {
      if (this.obj === {} || this.selectId === -1) {
        return
      }
      var res = []
      if (this.start >= this.end) {
        console.log('start time error!')
        return
      }
      for (var k = this.start; k < this.end; k++) {
        res.push(this.monthList[k % 12])
      }
      this.timeList = res
      var list = this.obj.features
      for (var j = 0; j < this.countryNameList.length; j++) {
        this.dataList[this.countryNameList[j].name] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
      for (var i = 0; i < list.length; i++) {
        var nowTime = (list[i].properties.year - 1970) * 12 + list[i].properties.month - 1
        this.dataList[list[i].properties.country.countryName][this.getTimeValue(nowTime)]++
      }
      var d = this.dataList[this.getNameById(this.selectId)]
      this.params = d
    },
    getTimeValue (time) {
      var day = Math.floor((time - this.start) / (this.end - this.start) * this.timeList.length)

      return day
    },
    getNameById (id) {
      if (id < 0) { return '' }
      for (var i = 0; i < this.countryNameList.length; i++) {
        if (this.countryNameList[i].id === id) {
          return this.countryNameList[i].name
        }
      }
    }
  }
}
</script>

