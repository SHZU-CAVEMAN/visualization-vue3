<template>
	<div>
		<div>【云端报警风险】</div>
		<div ref="target" class="w-full h-full"></div>
	</div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
	data: {
		type: Object,
		required: true
	}
})
const count = ref(0)
const target = ref(null)
let mChart = null
onMounted(() => {
	mChart = echarts.init(target.value)
	renderChart()
    window.addEventListener('resize', resize)
})
const resize = ()=>{
    count.value++
    console.log("屏幕变了",count.value)
}
const renderChart = () => {
	const options = {
		// 雷达图坐标系配置
		radar: {
			name: { // 坐标系名
				textStyle: {
					color: '#05D5FF',
					fontSize: 14
				}
			},
			shape: 'polygon', // 雷达绘制类型。polygon 多边形
			center: ['50%', '50%'], // 居中
			radius: '80%', // 占据范围
			startAngle: 120, // 开始的角度（可以避免绘制到边框之外）
			axisLine: { // 轴线配置
				lineStyle: {
					color: 'rgba(5, 213, 255, .8)'
				}
			},
			splitLine: { // 网格线配置
				show: true,
				lineStyle: {
					width: 1,
					color: 'rgba(5, 213, 255, .8)' // 设置网格的颜色
				}
			},
			indicator: props.data.risks.map((item) => ({ // 指示器文字
				name: item.name,
				max: 100
			})),
			splitArea: { // 不展示拆分区域
				show: false
			}
		},
		polar: { // 坐标居中
			center: ['50%', '50%'], // 默认全局居中
			radius: '0%'
		},
		angleAxis: { // 坐标角度
			min: 0, // 坐标轴刻度最小值
			interval: 5, // 坐标轴分割间隔
			clockwise: false, // 刻度增长逆时针
			axisTick: {
				show: false // 不显示坐标轴刻度
			},
			axisLabel: {
				show: false // 不显示坐标轴文字
			},
			axisLine: {
				show: false // 不显示坐标轴线
			},
			splitLine: {
				show: false // 不显示分割线
			}
		},
		radiusAxis: { // 径向轴
			min: 0, // 最小值
			interval: 20, // 间隔
			splitLine: { // 不显示分割线
				show: false
			}
		},
		series: [ // 图表核心配置
			{
				type: 'radar', // 雷达图
				symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
				symbolSize: 8, // 拐点的大小
				itemStyle: { // 折线拐点标志的样式
					normal: {
						color: '#05D5FF'
					}
				},
				areaStyle: { // 区域填充样式
					normal: {
						color: '#05D5FF',
						opacity: 0.6
					}
				},
				lineStyle: { 	// 线条样式
					width: 1,
					color: '#05D5FF'
				},
				label: { // 图形上的文本标签
					normal: {
						show: false,
						formatter: (params) => {
							return params.value
						},
						color: '#fff'
					}
				},
				data: [
					{
						value: props.data.risks.map((item) => item.value)
					}
				]
			}
		]
	}

	mChart.setOption(options)
}

// 监听数据的变化，重新渲染图表
watch(
	() => props.data,
	() => {
		renderChart()
	}
)
</script>
