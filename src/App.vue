<script setup>
import HorizontaslBar from './components/HorizontaslBar.vue';
import MapChart from './components/MapChart.vue';
import RadiueBar from './components/RadiueBar.vue';
import Relation from './components/Relation.vue';
import TotalData from './components/TotalData.vue';
import VerticalBar from './components/VerticalBar.vue';
import WordCloud from './components/WordCloud.vue';
import { ref } from 'vue'
import { getVisualization } from './utils/visualization.js'
import RadarBar from './components/RadarBar.vue';

const data = ref(null)

const loadData = async () => {
	data.value = await getVisualization()
	console.log("返回数据",data.value)
}

loadData()

setInterval(() => {
	loadData()
}, 2000)

</script>

<template>
  <div class="bg-[url('assets/imgs/bg.jpg')] bg-cover bg-center h-screen text-white p-5 flex overflow-hidden" v-if="data">
      <!--左-->
      <div class="flex-1 mr-5 opacity-50 bg-slate-800 p-3 flex flex-col">
        <HorizontaslBar class="h-1/3 box-border pb-4" :data="data.regionData"></HorizontaslBar>
        <RadarBar class="h-1/3 box-border pb-4" :data="data.riskData"></RadarBar>
        <Relation class="h-1/3" :data="data.relationData"></Relation>
      </div>

      <!--中-->
      <div class="w-1/2 mr-5 flex flex-col">
        <TotalData class=" opacity-75 bg-slate-800 p-3 " :data="data.totalData"></TotalData>
        <MapChart class=" opacity-75 bg-slate-800 p-3 mt-4 flex-1" :data="data.mapData"></MapChart>
      </div>

       <!--右-->
      <div class="flex-1 mr-5 opacity-50 bg-slate-800 p-3 flex flex-col">
        <VerticalBar class="h-1/3 box-border pb-4" :data="data.serverData"></VerticalBar>
        <RadiueBar class="h-1/3 box-border pb-4" :data="data.abnormalData" ></RadiueBar>
        <WordCloud class="h-1/3 box-border" :data="data.wordCloudData" ></WordCloud>
      </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
