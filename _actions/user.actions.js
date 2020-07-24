import Service from "../utils/ApiService";
import LocalStorageService from "../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();
export const userActions = {
	login,
	logout,
	register,
	sendOTP,
	verifyOTP,
	forgetPassword,
	changePassword,
};

function logout() {
	let apiEndpoint = "logout";
	return Service.post(apiEndpoint);
}

function login(username, password) {
	let apiEndpoint = "login";
	let payload = {
		userid: username,
		password: password,
	};
	return Service.post(apiEndpoint, payload);
}

function changePassword(confirmpassword) {
	let apiEndpoint = "changePassword";
	let payLoad = {};
	return Service.post(apiEndpoint, payLoad);
}

function register(name, mobile, password) {
	let apiEndpoint = "register";
	let payload = {
		name: name,
		mobile: mobile,
		password: password,
	};
	return Service.post(apiEndpoint, payload);
}

function sendOTP(username) {
	let apiEndpoint = "SendOtp";
	let payload = {
		userid: username,
	};
	return Service.post(apiEndpoint, payload);
}

function forgetPassword(username, otp, password) {
	let apiEndpoint = "forgetPassword";
	let payload = {
		userid: username,
		verification_code: otp,
		password: password,
	};
	return Service.post(apiEndpoint, payload);
}
function verifyOTP(username, otp) {
	let apiEndpoint = "VerifyOtp";
	let payload = {
		userid: username,
		otp: otp,
	};
	return Service.post(apiEndpoint, payload);
}
