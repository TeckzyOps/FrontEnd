import { useIsAuthenticated } from "../provider/Auth";

import Cookies from "js-cookie";
import withConditionalRedirect from "./withConditionalRedirect";
import Router from "next/router";
import routerLink from "~static/text/link";
import { profileActions } from "../../_actions/profile.action";
import api, { addBearerToken, removeBearerToken } from "../../utils/httpClient";
import LocalStorageService from "../../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();

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

export default function withAuth(WrappedComponent, location = "/login") {
	return withConditionalRedirect({
		WrappedComponent,
		location,
	});
}
