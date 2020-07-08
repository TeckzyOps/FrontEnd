import axios from "./httpClient";

class Service {
	vartoken = "";
	constructor() {
		this.service = axios;
	}

	redirectTo = (document, path) => {
		document.location = path;
	};

	get(path) {
		return this.service.get(path);
	}

	patch(path, payload) {
		return this.service.request({
			method: "PATCH",
			url: path,
			responseType: "json",
			data: payload,
		});
	}

	post(path, payload) {
		return this.service.request({
			method: "POST",
			url: path,
			responseType: "json",
			data: payload,
		});
	}
}

export default new Service();
