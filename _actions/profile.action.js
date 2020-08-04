import Service from "../utils/ApiService";
import LocalStorageService from "../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();
export const profileActions = {
	changeMPIN,
	changePassword,
	updateLogin,
	getUserProfileDetails,
	getLoginDetails,
	getDistrict,
	getCity,
	setUserProfileDetails,
};

function changeMPIN(mpin, password) {
	let apiEndpoint = "manageMpin";
	let payload = {
		mpin: mpin,
		password: password,
	};
	return Service.post(apiEndpoint, payload);
}

function changePassword(username, password, newPassword) {
	let apiEndpoint = "changePassword";
	let payload = {
		userid: username,
		password: password,
		new_password: newPassword,
	};
	return Service.post(apiEndpoint, payload);
}

function updateLogin(payload) {
	let apiEndpoint = "updateLogin";
	return Service.post(apiEndpoint, payload);
}

function getUserProfileDetails() {
	let apiEndpoint = "createProfile";
	return Service.get(apiEndpoint);
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
