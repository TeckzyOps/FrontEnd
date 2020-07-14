import axios from "axios";
import Router from "next/router";
import LocalStorageService from "../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();

var AxiosIns = axios.create({
	baseURL: "https://shaadiwala.herokuapp.com/api/",
	responseType: "json",
	headers: { csrf: "token" },
});

const loaderhtml = () => {
	return obj;
};
/*AxiosIns.interceptors.request.use(
	(config) => {
		// var obj = document.createElement("div");
		// obj.id = "::preloader";
		// obj.style.cssText = "position:fixed;z-index:10000;width:100%;height:100%;";

		var newimg = document.createElement("img");
		newimg.setAttribute("src", "/static/images/loading.svg");
		newimg.id = "interceptorPreloader";
		newimg.style.cssText =
			"opacity: 0.5;position:fixed;top: calc(50% - 50px);left: calc(50% - 50px);";
		// obj.appendChild(newimg);
		document.body.appendChild(newimg);
		const token = LocalStorageService.getService().getAccessToken();
		if (token) {
			config.headers["Authorization"] = "Bearer " + token;
		}
		// config.headers['Content-Type'] = 'application/json';
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

//Add a response interceptor

AxiosIns.interceptors.response.use(
	(response) => {
		var element = document.getElementById("interceptorPreloader");
		if (element !== null || undefined) {
			element.parentNode.removeChild(element);
		}

		if (response.data.access_token) {
			LocalStorageService.getService().setToken(response.data.access_token);
		}
		return response;
	},
	function (error) {
		const originalRequest = error.config;
		console.error("Request Failed:", originalRequest);
		if (error.response) {
			// Request was made but server responded with something
			// other than 2xx
			console.error("Status:", error.response.status);
			console.error("Data:", error.response.data);
			console.error("Headers:", error.response.headers);
		} else {
			// Something else happened while setting up the request
			// triggered the error
			console.error("Error Message:", error.message);
		}

		if (error.response.status === 401) {
			Router.push("/login");
			return Promise.reject(error);
		}

		// if (error.response.status === 401 && !originalRequest._retry) {

		// 	originalRequest._retry = true;
		// 	const refreshToken = localStorageService.getRefreshToken();
		// 	return axios.post('/auth/token',
		// 		{
		// 			"refresh_token": refreshToken
		// 		})
		// 		.then(res => {
		// 			if (res.status === 201) {
		// 				localStorageService.setToken(res.data);
		// 				axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
		// 				return axios(originalRequest);
		// 			}
		// 		})
		// }
		return Promise.reject(error);
	}
);

// axios.interceptors.request.use(
// 	function (config) {
// 		return config;
// 	},
// 	function (error) {
// 		return Promise.reject(error);
// 	}
// );

// // Add a response interceptor
// axios.interceptors.response.use(
// 	function (response) {
// 		return response;
// 	},
// 	function (error) {
// 		switch (error.response.status) {
// 			case 401:
// 				this.redirectTo(document, "/");
// 				break;
// 			case 404:
// 				this.redirectTo(document, "/404");
// 				break;
// 			default:
// 				this.redirectTo(document, "/500");
// 				break;
// 		}
// 		return Promise.reject(error);
// 	}
// );*/
export default AxiosIns;
