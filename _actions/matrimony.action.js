import Service from "../utils/ApiService";
import LocalStorageService from "../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();
export const matrimonyActions = {
	createMatrimony,
	UpdateFamilyDetails,
	UpdateLifeStyleDetails,
	getBasicDetails,
	getLoginDetails,
	getDistrict,
	getCity,
	setUserProfileDetails,
};

function createMatrimony(payload) {
	let apiEndpoint = "createMetrimonyId";
	return Service.post(apiEndpoint, payload);
}

function UpdateFamilyDetails(payload) {
	let apiEndpoint = "createUpdateMetrimonyFamily";
	return Service.post(apiEndpoint, payload);
}

function UpdateLifeStyleDetails(payload) {
	let apiEndpoint = "createUpdateMatrimonyLifeStyle";

	return Service.post(apiEndpoint, payload);
}
function getBasicDetails(payload) {
	let apiEndpoint = "createMetrimonyId";
	return Service.get(apiEndpoint, payload);
}

function setUserProfileDetails(payload, progressUpdater) {
	let apiEndpoint = "createProfile";
	return Service.post(apiEndpoint, payload, progressUpdater);
}

function getDistrict(stateid) {
	let apiEndpoint = "districtData";
	let payload = {
		state_id: stateid,
	};

	return Service.get(apiEndpoint, payload);
}

function getCity(districtid) {
	let apiEndpoint = "cityData";
	let payload = {
		district_id: districtid,
	};

	return Service.get(apiEndpoint, payload);
}

function getLoginDetails() {
	let apiEndpoint = "details";
	return Service.get(apiEndpoint);
}
