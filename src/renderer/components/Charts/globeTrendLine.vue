<template>
  <ePolyline id='trend-line'
        height="100%"
        width="100%"
        :data="params"
        :start="1970"
        :end="2017"
        :selectName="selectName"
        @click-radar="send">
  </ePolyline>
</template>

<script>
import ePolyline from './ePolyline'

export default {
  name: 'globeTrendLine',
  components: {ePolyline},
  props: {
    obj: {
      // 接受到的数据
      type: Array,
      default: function () {
        return [
          {
            'count': 598,
            'sumKill': 129,
            'sumWound': 179,
            'sumProp': 24044893.0,
            'year': 1970
          },
          {
            'count': 434,
            'sumKill': 123,
            'sumWound': 82,
            'sumProp': 2628800.0,
            'year': 1971
          },
          {
            'count': 479,
            'sumKill': 532,
            'sumWound': 273,
            'sumProp': 10193900.0,
            'year': 1972
          },
          {
            'count': 455,
            'sumKill': 359,
            'sumWound': 495,
            'sumProp': 13103550.0,
            'year': 1973
          },
          {
            'count': 548,
            'sumKill': 469,
            'sumWound': 487,
            'sumProp': 18111600.0,
            'year': 1974
          },
          {
            'count': 672,
            'sumKill': 558,
            'sumWound': 532,
            'sumProp': 5634961.0,
            'year': 1975
          },
          {
            'count': 838,
            'sumKill': 539,
            'sumWound': 685,
            'sumProp': 15378800.0,
            'year': 1976
          },
          {
            'count': 1176,
            'sumKill': 414,
            'sumWound': 397,
            'sumProp': 143642703.0,
            'year': 1977
          },
          {
            'count': 1375,
            'sumKill': 1306,
            'sumWound': 1205,
            'sumProp': 41363435.0,
            'year': 1978
          },
          {
            'count': 2382,
            'sumKill': 1657,
            'sumWound': 1936,
            'sumProp': 59328083.0,
            'year': 1979
          },
          {
            'count': 2415,
            'sumKill': 3984,
            'sumWound': 3285,
            'sumProp': 156002397.78,
            'year': 1980
          },
          {
            'count': 2377,
            'sumKill': 4440,
            'sumWound': 2915,
            'sumProp': 95439525.92,
            'year': 1981
          },
          {
            'count': 2333,
            'sumKill': 4776,
            'sumWound': 2840,
            'sumProp': 744443544.0,
            'year': 1982
          },
          {
            'count': 2545,
            'sumKill': 7795,
            'sumWound': 3612,
            'sumProp': 74915361.1,
            'year': 1983
          },
          {
            'count': 2973,
            'sumKill': 8245,
            'sumWound': 3879,
            'sumProp': 66726255.0,
            'year': 1984
          },
          {
            'count': 2513,
            'sumKill': 5429,
            'sumWound': 3702,
            'sumProp': 51311899.0,
            'year': 1985
          },
          {
            'count': 2503,
            'sumKill': 4383,
            'sumWound': 4957,
            'sumProp': 39247214.0,
            'year': 1986
          },
          {
            'count': 2856,
            'sumKill': 5426,
            'sumWound': 5077,
            'sumProp': 68431161.0,
            'year': 1987
          },
          {
            'count': 3196,
            'sumKill': 5844,
            'sumWound': 5828,
            'sumProp': 87813000.0,
            'year': 1988
          },
          {
            'count': 3839,
            'sumKill': 6978,
            'sumWound': 4763,
            'sumProp': 161384545.02,
            'year': 1989
          },
          {
            'count': 3414,
            'sumKill': 5597,
            'sumWound': 5090,
            'sumProp': 38407381.00008,
            'year': 1990
          },
          {
            'count': 4092,
            'sumKill': 7236,
            'sumWound': 6649,
            'sumProp': 181159300.0,
            'year': 1991
          },
          {
            'count': 4390,
            'sumKill': 7673,
            'sumWound': 7939,
            'sumProp': 2786749143.0,
            'year': 1992
          },
          {
            'count': 2545,
            'sumKill': 7795,
            'sumWound': 3612,
            'sumProp': 74915361.1,
            'year': 1993
          },
          {
            'count': 2970,
            'sumKill': 6670,
            'sumWound': 6632,
            'sumProp': 58392728.0,
            'year': 1994
          },
          {
            'count': 2640,
            'sumKill': 4826,
            'sumWound': 12970,
            'sumProp': 655181206.0,
            'year': 1995
          },
          {
            'count': 2660,
            'sumKill': 5650,
            'sumWound': 9516,
            'sumProp': 1266807161.0,
            'year': 1996
          },
          {
            'count': 2829,
            'sumKill': 9598,
            'sumWound': 8228,
            'sumProp': 28439821.0,
            'year': 1997
          },
          {
            'count': 821,
            'sumKill': 3995,
            'sumWound': 7968,
            'sumProp': 30915820.0,
            'year': 1998
          },
          {
            'count': 1211,
            'sumKill': 3104,
            'sumWound': 4634,
            'sumProp': 18902443.0,
            'year': 1999
          },
          {
            'count': 1619,
            'sumKill': 4053,
            'sumWound': 5070,
            'sumProp': 8433638.0,
            'year': 2000
          },
          {
            'count': 1710,
            'sumKill': 7098,
            'sumWound': 20443,
            'sumProp': 363253971.58,
            'year': 2001
          },
          {
            'count': 1196,
            'sumKill': 4204,
            'sumWound': 5826,
            'sumProp': 85119999.9998,
            'year': 2002
          },
          {
            'count': 1156,
            'sumKill': 3037,
            'sumWound': 5911,
            'sumProp': 27568890.0,
            'year': 2003
          },
          {
            'count': 1038,
            'sumKill': 5457,
            'sumWound': 11435,
            'sumProp': 42005000.0,
            'year': 2004
          },
          {
            'count': 1718,
            'sumKill': 5790,
            'sumWound': 11696,
            'sumProp': 1509857.0,
            'year': 2005
          },
          {
            'count': 2514,
            'sumKill': 8796,
            'sumWound': 14683,
            'sumProp': 11865000.0,
            'year': 2006
          },
          {
            'count': 2975,
            'sumKill': 12197,
            'sumWound': 21264,
            'sumProp': 36940774.0,
            'year': 2007
          },
          {
            'count': 4494,
            'sumKill': 8590,
            'sumWound': 17444,
            'sumProp': 7755168.98,
            'year': 2008
          },
          {
            'count': 4513,
            'sumKill': 9054,
            'sumWound': 18358,
            'sumProp': 3165876.51,
            'year': 2009
          },
          {
            'count': 4625,
            'sumKill': 7418,
            'sumWound': 14985,
            'sumProp': 2587504.0,
            'year': 2010
          },
          {
            'count': 4874,
            'sumKill': 7945,
            'sumWound': 14101,
            'sumProp': 5076961.0,
            'year': 2011
          },
          {
            'count': 8148,
            'sumKill': 14966,
            'sumWound': 24312,
            'sumProp': 9045874.22,
            'year': 2012
          },
          {
            'count': 11016,
            'sumKill': 20826,
            'sumWound': 34399,
            'sumProp': 22944009.91,
            'year': 2013
          },
          {
            'count': 15882,
            'sumKill': 42218,
            'sumWound': 38818,
            'sumProp': 124579819.89,
            'year': 2014
          },
          {
            'count': 13688,
            'sumKill': 36912,
            'sumWound': 40852,
            'sumProp': 2430463.18,
            'year': 2015
          },
          {
            'count': 12508,
            'sumKill': 33134,
            'sumWound': 37177,
            'sumProp': 211874091.45,
            'year': 2016
          }
        ]
      }
    },
    selectName: {
      // 外部传入，用于指定高亮的region名
      type: String,
      default: ''
    },
    model: {
      // 选择要画的图种类，有count、sumKill、sumProp三种值
      type: String,
      default: 'sumProp'
    }
  },
  data () {
    return {
      params: []
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {

    initChart () {
      var param = []
      var objCount = {}
      objCount.listName = this.model
      objCount.value = []
      for (var i = 0; i < this.obj.length; i++) {
        objCount.value.push(this.obj[i][this.model])
      }
      param.push(objCount)
      this.params = param
    },
    send (param) {
      this.$emit('click-line', param)
    }
  }
}
</script>