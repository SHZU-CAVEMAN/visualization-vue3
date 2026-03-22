import request from "./request";

export const getVisualization = () => {
	return request({
		url: '/visualization'
	})
}
