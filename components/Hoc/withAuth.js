import { useIsAuthenticated } from "../provider/Auth";

import Cookies from "js-cookie";
import withConditionalRedirect from "./withConditionalRedirect";
import Router from "next/router";
import routerLink from "~/static/text/link";
import { profileActions } from "../../_actions/profile.action";
import api, { addBearerToken, removeBearerToken } from "../../utils/httpClient";

function isBrowser() {
	return typeof window !== "undefined";
}

/**
 * Require the user to be authenticated in order to render the component.
 * If the user isn't authenticated, forward to the given URL.
 */
const redirectAfterLogin = () => {
	Router.push(routerLink.starter.dashboard);
};
const redirectAfterLogout = () => {
	Router.push(routerLink.starter.login);
};

export const setToken = (token, loginDetails) => {
	if (token) {
		Cookies.set("token", token);
		addBearerToken(token);
	}

	if (loginDetails) {
		Cookies.set("loginDetails", JSON.stringify(loginDetails));
	}
	redirectAfterLogin();
};

export const logout = () => {
	userActions
		.logout()
		.then(function (response) {
			console.log("ressss", response);
			redirectAfterLogout();
			Cookies.remove("token");
			Cookies.remove("loginDetails");
			removeBearerToken();
		})
		.catch(function (error) {
			if (error.response) {
				if (error.response.data.message) {
					// setValues({ ...values, ["error"]: error.response.data.message });
				}
			}

			console.error("errrrr ", error);
		});
};

export default function withAuth(WrappedComponent, location = "/login") {
	return withConditionalRedirect({
		WrappedComponent,
		location,
	});
}
