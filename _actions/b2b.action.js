import Service from "../utils/ApiService";
import LocalStorageService from "../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();
export const b2bActions = {
	createB2b,
	submitMedia,
	getB2b,
	getMedia,
	bookDate,
	getbookDate,
};

function createB2b(payload) {
	let apiEndpoint = "";
	if (payload.get("b2b_id")) {
		apiEndpoint = "editB2bId";
	} else {
		apiEndpoint = "createB2bId";
	}
	return Service.post(apiEndpoint, payload);
}

function getB2b(payload) {
	let apiEndpoint = "createB2bId";
	return Service.get(apiEndpoint, payload);
}

function bookDate(payload) {
	let apiEndpoint = "b2bBooking";
	return Service.post(apiEndpoint, payload);
}

function getbookDate(payload) {
	let apiEndpoint = "b2bBooking";
	return Service.get(apiEndpoint, payload);
}

function submitMedia(payload) {
	let apiEndpoint = "uploadB2bFile";
	return Service.post(apiEndpoint, payload);
}

function getMedia(payload) {
	let apiEndpoint = "getB2bFile";
	return Service.get(apiEndpoint, payload);
}
