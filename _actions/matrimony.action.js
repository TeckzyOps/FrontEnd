import Service from "../utils/ApiService";
import LocalStorageService from "../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();
export const matrimonyActions = {
	createMatrimony,
	UpdateFamilyDetails,
	UpdateLifeStyleDetails,
	getBasicDetails,
	getDefaultPrefs,
	getFamilyDetails,
<<<<<<< HEAD
	getLifeStyleDetails,
	getMatrimonyAds,
	uploadMatrimonyImage,
=======
	editMatrimony,
	getLifeStyleDetails,
	getMatrimonyAds,
	UpdateDefaultPrefs,
	uploadMatrimonyImage,
	search,
>>>>>>> 2eb69cad9f98587f8f61f10b85e899630956e00b
};

function uploadMatrimonyImage(payload) {
	let apiEndpoint = "metrimonyImageUpload";
	return Service.post(apiEndpoint, payload);
}

<<<<<<< HEAD
function createMatrimony(payload) {
	let apiEndpoint = "createMetrimonyId";
=======
function createMatrimony(payload, action) {
	return action == 0
		? Service.post("createMetrimonyId", payload)
		: Service.post("editMetrimonyId", payload);
}

function editMatrimony(payload) {
	let apiEndpoint = "editMetrimonyId";
>>>>>>> 2eb69cad9f98587f8f61f10b85e899630956e00b
	return Service.post(apiEndpoint, payload);
}

function UpdateFamilyDetails(payload) {
	let apiEndpoint = "createUpdateMetrimonyFamily";
	return Service.post(apiEndpoint, payload);
}

function UpdateLifeStyleDetails(payload) {
	let apiEndpoint = "createUpdateMetrimonyLifeStyle";
<<<<<<< HEAD

	return Service.post(apiEndpoint, payload);
}
function UpdateDefaultPrefs(payload) {
	let apiEndpoint = "createUpdateMetrimonyDefaultSetting";

	return Service.post(apiEndpoint, payload);
}
=======

	return Service.post(apiEndpoint, payload);
}
function UpdateDefaultPrefs(payload) {
	let apiEndpoint = "createUpdateMetrimonyDefaultSetting";

	return Service.post(apiEndpoint, payload);
}
>>>>>>> 2eb69cad9f98587f8f61f10b85e899630956e00b

function getDefaultPrefs(payload) {
	let apiEndpoint = "createUpdateMetrimonyDefaultSetting";

	return Service.get(apiEndpoint, payload);
}
function getFamilyDetails(payload) {
	let apiEndpoint = "createUpdateMetrimonyFamily";
	return Service.get(apiEndpoint, payload);
}
function getBasicDetails(payload) {
	let apiEndpoint = "createMetrimonyId";
	return Service.get(apiEndpoint, payload);
}
function getLifeStyleDetails(payload) {
	let apiEndpoint = "createUpdateMetrimonyLifeStyle";

	return Service.get(apiEndpoint, payload);
}
function getMatrimonyAds() {
	let apiEndpoint = "selfMetrimonyData";
	return Service.get(apiEndpoint);
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

function search(payload) {
	let apiEndpoint = "metrimonyFilters";

	return Service.get(apiEndpoint, payload);
}

function getLoginDetails() {
	let apiEndpoint = "details";
	return Service.get(apiEndpoint);
}
