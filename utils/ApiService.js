import request from "./API";

class Service {
	vartoken = "";
	constructor() {
		this.service = request;
	}

	getHeaders() {
		return `Authorization: "Bearer " + ${varToken}`;
	}

	redirectTo = (document, path) => {
		document.location = path;
	};

	get(path) {
		return this.service.get(path, {
			headers: getHeaders(),
		});
	}

	patch(path, payload) {
		return this.service.request(
			{
				method: "PATCH",
				url: path,
				responseType: "json",
				data: payload,
			},
			{
				headers: getHeaders(),
			}
		);
	}

	post(path, payload) {
		return this.service.request(
			{
				method: "POST",
				url: path,
				responseType: "json",
				data: payload,
			},
			{
				headers: getHeaders(),
			}
		);
	}
}

export default new Service();
