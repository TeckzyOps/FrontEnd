import Service from "../utils/ApiService";
import LocalStorageService from "../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();
export const userActions = {
	login,
	logout,
	register,
	sendOTP,
	verifyOTP,
};

function login(username, password) {
	let apiEndpoint = "login";
	let payload = {
		userid: username,
		password: password,
	};
	return Service.post(apiEndpoint, payload);
	// () => {

	// 	userService.post(apiEndpoint, payload).then((response) => {
	// 		console.log(response.data);
	// 		if (response.data.token) {
	// 			console.log("response => ", response);
	// 			localStorageService.setToken(response.data);
	// 			dispatch(setUserDetails(response.data));
	// 			history.push("/home");
	// 		}
	// 	});
	// };
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

function verifyOTP(username, otp) {
	let apiEndpoint = "VerifyOtp";
	let payload = {
		userid: username,
		otp: otp,
	};
	return Service.post(apiEndpoint, payload);
}

function logout() {
	return (dispatch) => {
		localStorage.removeItem("auth");
		localStorage.removeItem("token");
		dispatch(logoutUser());
		history.push("/");
	};
}

export function setUserDetails(user) {
	return {
		type: "LOGIN_SUCCESS",
		auth: user.auth,
		token: user.token,
	};
}

export function logoutUser() {
	return {
		type: "LOGOUT_SUCCESS",
		auth: false,
		token: "",
	};
}
