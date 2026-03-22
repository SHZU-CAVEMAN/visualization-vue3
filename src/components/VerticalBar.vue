<template>
	<div>
		<div>【服务资源占用比】</div>
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

const target = ref(null)
let mChart = null
onMounted(() => {
	mChart = echarts.init(target.value)
	renderChart()
})

const renderChart = () => {
	const options = {
		// X 轴展示选项
		xAxis: {
			type: 'category',
			data: props.data.servers.map((item) => item.name), // 根据根据服务端数据筛选
			axisLabel: {
				color: '#9EB1C8' // 文字色值
			}
		},
		// Y 轴展示数据
		yAxis: {
			type: 'value', // 数据展示
			show: true, // 显示轴
			max: function (value) { // 最大值（防止触顶）
				return parseInt(value.max * 1.2) // 取整
			}
		},
		// echarts 网格绘制的位置，对应 上、右、下、左
		grid: {
			top: 16,
			right: 0,
			bottom: 26,
			left: -26,
			containLabel: true // 计算边距时，包含标签
		},
		// 柱形图核心配置
		series: {
			type: 'bar', // 柱形图
			data: props.data.servers.map((item) => ({ // 数据筛选
				name: item.name,
				value: item.value
			})),
			// 每个轴的样式
			itemStyle: {
				color: '#479AD3', // 设置柱子的颜色
				barBorderRadius: 5, // 设置柱子的圆角
				shadowColor: 'rgba(0, 0, 0, 0.3)', // 设置柱子的阴影颜色
				shadowBlur: 5 // 设置柱子的阴影模糊大小
			},
			barWidth: 15, // 柱子宽度
			// 文本
			label: {
				show: true,
				position: 'top', // 设置标签位置为顶部
				textStyle: {
					color: '#fff' // 设置标签文本颜色
				},
				formatter: '{c}%'
			}
		}
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

<style lang="scss" scoped></style>
