import Service from "../utils/ApiService";
import LocalStorageService from "../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();
export const freelancerActions = {
	createFreelancer,
	submitMedia,
	getFreelancer,
	getMedia,
	bookDate,
	getbookDate,
	search,
};

function createFreelancer(payload, id) {
	let apiEndpoint = "";
	if (id) {
		apiEndpoint = "editFreelancerId";
	} else {
		apiEndpoint = "createFreelancerId";
	}
	return Service.post(apiEndpoint, payload);
}

function getFreelancer(payload) {
	let apiEndpoint = "createFreelancerId";
	return Service.get(apiEndpoint, payload);
}

function bookDate(payload) {
	let apiEndpoint = "freelancerBooking";
	return Service.post(apiEndpoint, payload);
}

function getbookDate(payload) {
	let apiEndpoint = "freelancerBooking";
	return Service.get(apiEndpoint, payload);
}

function submitMedia(payload) {
	let apiEndpoint = "uploadFreelancerFile";
	return Service.post(apiEndpoint, payload);
}

function getMedia(payload) {
	let apiEndpoint = "getFreelancerFile";
	return Service.get(apiEndpoint, payload);
}

function search(payload) {
	let apiEndpoint = "freelancerFilter";
	return Service.get(apiEndpoint, payload);
}
