import Cookies from "js-cookie";
const LocalStorageService = (function () {
	var _service;
	function _getService() {
		if (!_service) {
			_service = this;
			return _service;
		}
		return _service;
	}
	function _setToken(token) {
		if (token) {
			localStorage.setItem("token", token);
		}
	}
	function _setValue(key, value) {
		if (key && value) {
			localStorage.setItem(key, value);
		}
	}
	function _getValue(key) {
		if (key) {
			return localStorage.getItem(key);
		}
	}
	function _getJSON(key) {
		if (key) {
			return JSON.parse(localStorage.getItem(key));
		}
	}
	function _getAccessToken() {
		return localStorage.getItem("token");
	}
	function _getRefreshToken() {
		return localStorage.getItem("refresh_token");
	}
	function _clearToken() {
		localStorage.removeItem("access_token");
	}

	function _removeKey(key) {
		if (key) {
			localStorage.removeItem(key);
		}
	}

	function _getUserDetails() {
		return Cookies.getJSON("Details")
			? Cookies.getJSON("Details")
			: _getService().getJSON("Details");
	}
	return {
		getService: _getService,
		setToken: _setToken,
		setValue: _setValue,
		getValue: _getValue,
		removeValue: _removeKey,
		getAccessToken: _getAccessToken,
		getRefreshToken: _getRefreshToken,
		clearToken: _clearToken,
		getJSON: _getJSON,
		getUserDetails: _getUserDetails,
		is: () => typeof localStorage !== "undefined",
	};
})();
export default LocalStorageService;
