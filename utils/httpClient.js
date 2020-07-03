import axios from "axios";

axios.create({
	baseURL: "https://randomuser.me/api/",
	responseType: "json",
	headers: { csrf: "token" },
});

axios.interceptors.request.use(
	function (config) {
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

// Add a response interceptor
axios.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		switch (error.response.status) {
			case 401:
				this.redirectTo(document, "/");
				break;
			case 404:
				this.redirectTo(document, "/404");
				break;
			default:
				this.redirectTo(document, "/500");
				break;
		}
		return Promise.reject(error);
	}
);
export default axios;
