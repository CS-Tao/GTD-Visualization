/* eslint-disable */
import Mock from 'mockjs'

export default () => {
    let data = Mock.mock({
      'target': [
        Mock.mock({ 'targetTypeName': "Private Citizens & Property", 'targetType': 14, 'count|80-200': 124 }),
        Mock.mock({ 'targetTypeName': "Military", 'targetType': 4, 'count|30-100': 88 }),
        Mock.mock({ 'targetTypeName': "Business", 'targetType': 1, 'count|30-100': 76 }),
        Mock.mock({ 'targetTypeName': "Government (Diplomatic)", 'targetType': 7, 'count|30-100': 57 }),
        Mock.mock({ 'targetTypeName': "Police", 'targetType': 3, 'count|20-80': 28 }),
        Mock.mock({ 'targetTypeName': "Government (General)", 'targetType': 2, 'count|10-50': 22 }),
        Mock.mock({ 'targetTypeName': "Airports & Aircraft", 'targetType': 6, 'count|10-40': 20 }),
        Mock.mock({ 'targetTypeName': "Terrorists/Non-State Militia", 'targetType': 17, 'count|10-25': 17 }),
        Mock.mock({ 'targetTypeName': "Educational Institution", 'targetType': 8, 'count|5-15': 5 }),
        Mock.mock({ 'targetTypeName': "Utilities", 'targetType': 21, 'count|5-15': 4 }),
        Mock.mock({ 'targetTypeName': "Maritime", 'targetType': 11, 'count|5-15': 3 }),
        Mock.mock({ 'targetTypeName': "Other", 'targetType': 13, 'count|5-15': 3 }),
        Mock.mock({ 'targetTypeName': "Religious Figures/Institutions", 'targetType': 15, 'count|5-15': 2 }),
        Mock.mock({ 'targetTypeName': "Journalists & Media", 'targetType': 10, 'count|5-15': 2 }),
        Mock.mock({ 'targetTypeName': "NGO", 'targetType': 12, 'count|5-15': 2 }),
        Mock.mock({ 'targetTypeName': "Transportation", 'targetType': 19, 'count|5-15': 2 })
      ],
      'prop|500000-100000000': 13103550,
      'kill|100-20000': 359,
      'num|200-5000': 455,
      'attack': [
        Mock.mock({ 'attackTypeName': "Assassination", 'attackType': 1, 'count|80-200': 160 }),
        Mock.mock({ 'attackTypeName': "Bombing/Explosion", 'attackType': 3, 'count|80-200': 144 }),
        Mock.mock({ 'attackTypeName': "Armed Assault", 'attackType': 2, 'count|30-100': 58 }),
        Mock.mock({ 'attackTypeName': "Hostage Taking (Kidnapping)", 'attackType': 6, 'count|20-50': 39 }),
        Mock.mock({ 'attackTypeName': "Facility/Infrastructure Attack", 'attackType': 7, 'count|20-50': 35 }),
        Mock.mock({ 'attackTypeName': "Hijacking", 'attackType': 4, 'count|10-20': 8 }),
        Mock.mock({ 'attackTypeName': "Hostage Taking (Barricade Incident)", 'attackType': 5, 'count|5-10': 7 }),
        Mock.mock({ 'attackTypeName': "Unarmed Assault", 'attackType': 8, 'count|5-10': 3 }),
        Mock.mock({ 'attackTypeName': "Unknown", 'attackType': 9, 'count|5-10': 1 })
      ],
      'wound': 495,
      'weapon': [
        Mock.mock({ 'weaponTypeName': "Firearms", 'weaponType': 5, 'count|80-200': 197 }),
        Mock.mock({ 'weaponTypeName': "Explosives/Bombs/Dynamite", 'weaponType': 6, 'count|80-200': 157 }),
        Mock.mock({ 'weaponTypeName': "Incendiary", 'weaponType': 8, 'count|30-70': 47 }),
        Mock.mock({ 'weaponTypeName': "Unknown", 'weaponType': 13, 'count|30-60': 43 }),
        Mock.mock({ 'weaponTypeName': "Melee", 'weaponType': 9, 'count|5-20': 7 }),
        Mock.mock({ 'weaponTypeName': "Chemical", 'weaponType': 2, 'count|5-10': 4 })
      ]
    })
    return data
}
