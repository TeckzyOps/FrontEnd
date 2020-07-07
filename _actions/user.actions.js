import Service from "../utils/ApiService";
import LocalStorageService from "../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();
export const userActions = {
	login,
	logout,
};

function login(username, password) {
	let apiEndpoint = "login";
	let payload = {
		username: username,
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
