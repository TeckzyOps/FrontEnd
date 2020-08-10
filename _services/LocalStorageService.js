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
			localStorage.setItem("access_token", token);
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
	function _getAccessToken() {
		return localStorage.getItem("access_token");
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
	return {
		getService: _getService,
		setToken: _setToken,
		setValue: _setValue,
		getValue: _getValue,
		removeValue: _removeKey,
		getAccessToken: _getAccessToken,
		getRefreshToken: _getRefreshToken,
		clearToken: _clearToken,
		is: () => typeof localStorage !== "undefined",
	};
})();
export default LocalStorageService;
