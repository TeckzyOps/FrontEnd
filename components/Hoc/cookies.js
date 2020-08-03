import cookie from "js-cookie";
export const cookieActions = {
	setCookie,
	removeCookie,
	getCookie,
	cookie,
};
function setCookie(key, value, sessionCookie = false) {
	if (process.browser) {
		const options = {
			expires: sessionCookie ? 1 / 288 : 1,
			domain: process.env.COOKIE_DOMAIN,
		};
		if (!process.env.COOKIE_DOMAIN) delete options.domain;
		cookie.set(key, value, options);
	}
}

function removeCookie(key, opt) {
	if (process.browser) cookie.remove(key, opt);
}

function getCookie(key, req) {
	process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req);
}

const getCookieFromBrowser = (key) => cookie.get(key);

const getCookieFromServer = (key, req) => {
	if (!req.headers.cookie) return undefined;

	//login  to Get Cookies from browser
	return "";
};
