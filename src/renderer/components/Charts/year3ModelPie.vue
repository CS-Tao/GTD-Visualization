<template>
  <pie id='country-pie'
        height="100%"
        width="100%"
        :data="params"
        :selectName="selectName"
        @click-pie="send">
  </pie>
</template>


<script>
import pie from './pie'

export default {
  name: 'country3Modelpie',
  components: {pie},
  props: {
    obj: {
      type: Object,
      default: function () {
        return {
          'wound': 179,
          'target': [
            {
              'targetType': 1,
              'count': 114,
              'targetTypeName': 'Business'
            },
            {
              'targetType': 4,
              'count': 81,
              'targetTypeName': 'Military'
            },
            {
              'targetType': 3,
              'count': 78,
              'targetTypeName': 'Police'
            },
            {
              'targetType': 2,
              'count': 75,
              'targetTypeName': 'Government (General)'
            },
            {
              'targetType': 8,
              'count': 59,
              'targetTypeName': 'Educational Institution'
            },
            {
              'targetType': 14,
              'count': 56,
              'targetTypeName': 'Private Citizens & Property'
            },
            {
              'targetType': 7,
              'count': 49,
              'targetTypeName': 'Government (Diplomatic)'
            },
            {
              'targetType': 6,
              'count': 21,
              'targetTypeName': 'Airports & Aircraft'
            },
            {
              'targetType': 21,
              'count': 16,
              'targetTypeName': 'Utilities'
            },
            {
              'targetType': 15,
              'count': 13,
              'targetTypeName': 'Religious Figures/Institutions'
            },
            {
              'targetType': 12,
              'count': 8,
              'targetTypeName': 'NGO'
            },
            {
              'targetType': 16,
              'count': 6,
              'targetTypeName': 'Telecommunication'
            },
            {
              'targetType': 10,
              'count': 6,
              'targetTypeName': 'Journalists & Media'
            },
            {
              'targetType': 17,
              'count': 4,
              'targetTypeName': 'Terrorists/Non-State Militia'
            },
            {
              'targetType': 20,
              'count': 4,
              'targetTypeName': 'Unknown'
            },
            {
              'targetType': 9,
              'count': 2,
              'targetTypeName': 'Food or Water Supply'
            },
            {
              'targetType': 19,
              'count': 2,
              'targetTypeName': 'Transportation'
            },
            {
              'targetType': 18,
              'count': 2,
              'targetTypeName': 'Tourists'
            },
            {
              'targetType': 13,
              'count': 1,
              'targetTypeName': 'Other'
            },
            {
              'targetType': 22,
              'count': 1,
              'targetTypeName': 'Violent Political Party'
            }
          ],
          'prop': 24044893.0,
          'num': 598,
          'attack': [
            {
              'attackTypeName': 'Bombing/Explosion',
              'count': 315,
              'attackType': 3
            },
            {
              'attackTypeName': 'Facility/Infrastructure Attack',
              'count': 163,
              'attackType': 7
            },
            {
              'attackTypeName': 'Armed Assault',
              'count': 57,
              'attackType': 2
            },
            {
              'attackTypeName': 'Hostage Taking (Kidnapping)',
              'count': 26,
              'attackType': 6
            },
            {
              'attackTypeName': 'Assassination',
              'count': 17,
              'attackType': 1
            },
            {
              'attackTypeName': 'Hijacking',
              'count': 11,
              'attackType': 4
            },
            {
              'attackTypeName': 'Unknown',
              'count': 4,
              'attackType': 9
            },
            {
              'attackTypeName': 'Unarmed Assault',
              'count': 3,
              'attackType': 8
            },
            {
              'attackTypeName': 'Hostage Taking (Barricade Incident)',
              'count': 2,
              'attackType': 5
            }
          ],
          'kill': 129,
          'weapon': [
            {
              'count': 319,
              'weaponTypeName': 'Explosives/Bombs/Dynamite',
              'weaponType': 6
            },
            {
              'count': 165,
              'weaponTypeName': 'Incendiary',
              'weaponType': 8
            },
            {
              'count': 71,
              'weaponTypeName': 'Firearms',
              'weaponType': 5
            },
            {
              'count': 35,
              'weaponTypeName': 'Unknown',
              'weaponType': 13
            },
            {
              'count': 3,
              'weaponTypeName': 'Chemical',
              'weaponType': 2
            },
            {
              'count': 2,
              'weaponTypeName': 'Melee',
              'weaponType': 9
            },
            {
              'count': 1,
              'weaponTypeName': 'Vehicle (not to include vehicle-borne explosives, i.e., car or truck bombs)',
              'weaponType': 10
            },
            {
              'count': 1,
              'weaponTypeName': 'Sabotage Equipment',
              'weaponType': 11
            },
            {
              'count': 1,
              'weaponTypeName': 'Fake Weapons',
              'weaponType': 7
            }
          ]
        }
      }
    },
    selectName: {
      // 外部传入，用于指定高亮的region名
      type: String,
      default: ''
    },
    model: {
      // 选择要画的图种类，有weapon、attack、target三种值
      type: String,
      default: 'target'
    }
  },
  data () {
    var param = []
    for (var i = 0; i < 5; i++) {
      var dic = {}
      dic.indicator = this.obj[this.model][i][this.model + 'TypeName']
      dic.value = this.obj[this.model][i].count
      param.push(dic)
    }
    return {
      params: param
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {

    initChart () {
      var param = []
      for (var i = 0; i < 5; i++) {
        var dic = {}
        dic.indicator = this.obj[this.model][i][this.model + 'TypeName']
        dic.value = this.obj[this.model][i].count
        param.push(dic)
      }
      this.params = param
    },
    send (param) {
      this.$emit('click-pie', param)
    }
  }
}
</script>

