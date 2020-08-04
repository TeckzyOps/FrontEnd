import axios from "axios";
import Router from "next/router";
import LocalStorageService from "../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();

var AxiosIns = axios.create({
	baseURL: "https://shaadiwala.herokuapp.com/api/",
	responseType: "json",
	headers: { csrf: "token" },
});

export const addBearerToken = (token) => {
	AxiosIns.defaults.headers.Authorization = "Bearer " + token;
};
export const removeBearerToken = () => {
	delete AxiosIns.defaults.headers.Authorization;
};
export default AxiosIns;
