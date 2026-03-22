<template>
	<div>
		<div>【大区数据信息】</div>
		<div ref="target" class="w-full h-full"></div>
	</div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'


const props = defineProps({
    // 接收名为data的属性，类型为 Object，并且父组件必须传
    // 通过 defineProps 定义组件对外输入接口，实现组件解耦和类型校验
	data: {
		type: Object,
		required: true
	}
})

// 获取 dom 实例
const target = ref(null)

// echarts 实例变量
let mChart = null
// 在 mounted 生命周期之后，实例化 echarts
onMounted(() => {
	mChart = echarts.init(target.value)
	// 渲染 echarts
	renderChart()
})

// 渲染图表
const renderChart = () => {
	const options = {
		// X 轴展示数据
		xAxis: {
			type: 'value', // 数据展示
			show: true, // 显示轴
			max: function (value) { // 最大值（防止触顶）
				return parseInt(value.max * 1.2) // 取整
			}
		},
		// Y 轴展示选项
		yAxis: {
			type: 'category',
			data: props.data.regions.map((item) => item.name), // 根据根据服务端数据筛选
			inverse: true, // 反向展示
			axisLine: {
				show: false // 不展示轴线
			},
			axisTick: {
				show: true // 取消 Y 轴刻度
			},
			axisLabel: {
				color: '#9EB1C8' // 文字色值
			}
		},
		// echarts 网格绘制的位置，对应 上、右、下、左
		grid: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			containLabel: true // 计算边距时，包含标签
		},
		// 柱形图核心配置
		series: [
			{
				type: 'bar', // 图表类型
				// 数据筛选
				data: props.data.regions.map((item) => ({
					name: item.name,
					value: item.value
				})),
				showBackground: true, // 显示背景
				backgroundStyle: { // 背景色
					color: 'rgba(180, 180, 180, 0.2)'
				},
				// 每个轴的样式
				itemStyle: {
					color: '#479AD3', // 设置柱子的颜色
					barBorderRadius: 5, // 设置柱子的圆角
					shadowColor: 'rgba(0, 0, 0, 0.3)', // 设置柱子的阴影颜色
					shadowBlur: 5 // 设置柱子的阴影模糊大小
				},
				barWidth: 10, // 轴宽度
				// 轴上的字体
				label: {
					show: true,
					position: 'right', // 设置标签位置为右侧
					textStyle: {
						color: '#fff' // 设置标签文本颜色
					}
				}
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

<style lang="scss" scoped></style>
