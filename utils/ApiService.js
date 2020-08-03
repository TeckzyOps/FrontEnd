import axios from "./httpClient";

class Service {
	vartoken = "";
	constructor() {
		this.service = axios;
	}

	redirectTo = (document, path) => {
		document.location = path;
	};

	get(path, payload) {
		let query = "?";
		if (payload) {
			Object.keys(payload).forEach((k) => {
				query == "?"
					? (query += k + "=" + payload[k])
					: (query += "&" + k + "=" + payload[k]);
			});
		}
		path += query;
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

	post(path, payload, progressUpdater) {
		return this.service.request({
			method: "POST",
			url: path,
			responseType: "json",
			data: payload,
			onUploadProgress: (event) => {
				progressUpdater(event);
			},
		});
	}
}

export default new Service();
