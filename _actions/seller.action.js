import Service from "../utils/ApiService";
import LocalStorageService from "../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();
export const sellerActions = {
	createSeller,
	submitMedia,
	getSeller,
	getMedia,
	bookDate,
	getbookDate,
	search,
};

function createSeller(payload) {
	let apiEndpoint = "";
	if (payload.get("seller_id")) {
		apiEndpoint = "editSellerId";
	} else {
		apiEndpoint = "createSellerId";
	}
	return Service.post(apiEndpoint, payload);
}

function getSeller(payload) {
	let apiEndpoint = "createSellerId";
	return Service.get(apiEndpoint, payload);
}

function bookDate(payload) {
	let apiEndpoint = "sellerBooking";
	return Service.post(apiEndpoint, payload);
}

function getbookDate(payload) {
	let apiEndpoint = "sellerBooking";
	return Service.get(apiEndpoint, payload);
}

function submitMedia(payload) {
	let apiEndpoint = "uploadSellerFile";
	return Service.post(apiEndpoint, payload);
}

function getMedia(payload) {
	let apiEndpoint = "getSellerFile";
	return Service.get(apiEndpoint, payload);
}

function search(payload) {
	let apiEndpoint = "sellerFilter";
	return Service.get(apiEndpoint, payload);
}
