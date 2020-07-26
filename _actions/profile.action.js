import Service from "../utils/ApiService";
import LocalStorageService from "../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();
export const profileActions = {
	changeMPIN,
	changePassword,
	updateLogin,
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
