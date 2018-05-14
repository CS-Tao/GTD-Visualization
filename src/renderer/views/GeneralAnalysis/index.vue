<template>
<div class='general-analysis-container'>
    <rotate-selector class='rotate-selecter'></rotate-selector>
    <div class='region-bar-chat-view'></div>
    <div class='attack-pie-chart-view'></div>
    <div class='target-pie-chart-view'></div>
    <div class='weapon-pie-chart-view'></div>
</div>
</template>

<script>
import Mixin from '../Mixin'
import RotateSelector from '@/components/RotateSelector'
export default {
  name: 'GeneralAnalysis',
  components: {
    RotateSelector
  },
  mixins: [Mixin],
  created () {
    this.changeLayout()
  }
}
</script>

<style lang="scss" scoped>
.general-analysis-container{
    height: 100%;
    width: 100%;
}
.rotate-selecter{
    // height: 100%;
    // width: 25%;
    // position: absolute;
    // left: 0;
    background-color: red;
    height: 700px;
    width: 300px;
}
.region-bar-chat-view{
    // width: 75%;
    // height: 50%;
    // position: absolute;
    // right: 0;
    // top: 0;
    background-color: blue;
    height: 350px;
    width: 900px;
    
}
.attack-pie-chart-view{
    // width: 25%;
    // height: 50%;
    background-color: yellow;
    height: 350px;
    width: 300px;
}
.target-pie-chart-view{
    // width: 25%;
    // height: 50%;
    background-color: orange;
    height: 350px;
    width: 300px;
}
.weapon-pie-chart-view{
    // width: 25%;
    // height: 50%;
    background-color: green;
    height: 350px;
    width: 300px;
}
</style>
