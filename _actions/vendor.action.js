import Service from "../utils/ApiService";
import LocalStorageService from "../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();
export const vendorActions = {
	createVendor,
	submitMedia,
	getVendor,
	getMedia,
	bookDate,
	getbookDate,
	search,
};

function createVendor(payload) {
	let apiEndpoint = "";
	if (payload.get("vendor_id")) {
		apiEndpoint = "editVendorId";
	} else {
		apiEndpoint = "createVendorId";
	}
	return Service.post(apiEndpoint, payload);
}

function getVendor(payload) {
	let apiEndpoint = "createVendorId";
	return Service.get(apiEndpoint, payload);
}

function bookDate(payload) {
	let apiEndpoint = "vendorBooking";
	return Service.post(apiEndpoint, payload);
}

function getbookDate(payload) {
	let apiEndpoint = "vendorBooking";
	return Service.get(apiEndpoint, payload);
}

function submitMedia(payload) {
	let apiEndpoint = "uploadVendorFile";
	return Service.post(apiEndpoint, payload);
}

function getMedia(payload) {
	let apiEndpoint = "getVendorFile";
	return Service.get(apiEndpoint, payload);
}

function search(payload) {
	let apiEndpoint = "vendorFilter";
	return Service.get(apiEndpoint, payload);
}
