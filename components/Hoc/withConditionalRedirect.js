import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Router from "next/router";
import routerLink from "~/static/text/link";
import { profileActions } from "../../_actions/profile.action";
import api, { addBearerToken, removeBearerToken } from "../../utils/httpClient";
import LocalStorageService from "../../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();

const isBrowser = () => typeof window !== "undefined";

const redirectAfterLogin = () => {
	Router.push(routerLink.starter.dashboard);
};
const redirectAfterLogout = () => {
	Router.push(routerLink.starter.login);
};

/**
 * Support conditional redirecting, both server-side and client-side.
 *
 * Client-side, we can use next/router. But that doesn't exist on the server.
 * So on the server we must do an HTTP redirect. This component handles
 * the logic to detect whether on the server and client and redirect
 * appropriately.
 *
 * @param WrappedComponent The component that this functionality
 * will be added to.
 * @param clientCondition A function that returns a boolean representing
 * whether to perform the redirect. It will always be called, even on
 * the server. This is necessary so that it can have hooks in it (since
 * can't be inside conditionals and must always be called).
 * @param serverCondition A function that returns a boolean representing
 * whether to perform the redirect. It is only called on the server. It
 * accepts a Next page context as a parameter so that the request can
 * be examined and the response can be changed.
 * @param location The location to redirect to.
 */
export default function withConditionalRedirect({
	WrappedComponent,
	location,
}) {
	const WithConditionalRedirectWrapper = (props) => {
		const router = useRouter();
		if (LocalStorageService.is() && !LocalStorageService.getValue("token")) {
			router.push(routerLink.starter.login);
			return <></>;
		}
		// if (isBrowser) {
		// 	if (LocalStorageService.getValue("loginDetails")) {
		// 		logindata = LocalStorageService.getValue("loginDetails");
		// 	} else {
		// 		const logindat = profileActions.getLoginDetails();
		// 		logindata = logindat.data.id && logindat.data;
		// 	}

		// 	if (LocalStorageService.getValue("userdata")) {
		// 		userData = LocalStorageService.getValue("userdata");
		// 	} else {
		// 		const userDat = profileActions.getUserProfileDetails();
		// 		userData = userDat.data.states && userDat.data;
		// 	}
		// }
		// const user = {
		// 	logindata: logindata,
		// 	userData: userData,
		// };
		return <WrappedComponent {...props} />;
	};

	WithConditionalRedirectWrapper.getInitialProps = async (ctx) => {
		const componentProps =
			WrappedComponent.getInitialProps &&
			(await WrappedComponent.getInitialProps(ctx));
		if (!isBrowser) {
			if (!ctx.req.headers.cookie.token) {
				if (ctx.res) {
					ctx.res.writeHead(302, { Location: location });
					ctx.res.end();
				}
			}
		}
		// const logindat = await profileActions.getLoginDetails();
		// var logindata = (await logindat.data.id) && logindat.data;

		// if (!isBrowser) {
		// 	if (ctx.req.headers.cookie.loginDetails) {
		// 		logindata = ctx.req.headers.cookie.loginDetails;
		// 	} else {
		// 		const logindat = await profileActions.getLoginDetails();
		// 		logindata = (await logindat.data.id) && logindat.data;
		// 	}

		// 	if (ctx.req.headers.cookie.userdata) {
		// 		userData = ctx.req.headers.cookie.userdata;
		// 	} else {
		// 		const userDat = await profileActions.getUserProfileDetails();
		// 		userData = (await userDat.data.states) && userDat.data;
		// 	}
		// }

		return { ...componentProps };
	};

	return WithConditionalRedirectWrapper;
}

// export default function withConditionalRedirect({
// 	WrappedComponent,
// 	clientCondition,
// 	serverCondition,
// 	location,
// }) {
// 	const WithConditionalRedirectWrapper = (props) => {
// 		const router = useRouter();
// 		const redirectCondition = clientCondition();
// 		if (isBrowser() && redirectCondition) {
// 			router.push(location);
// 			return <></>;
// 		}
// 		return <WrappedComponent {...props} />;
// 	};

// 	WithConditionalRedirectWrapper.getInitialProps = async (ctx) => {
// 		if (!isBrowser() && ctx.res) {
// 			if (serverCondition(ctx)) {
// 				ctx.res.writeHead(302, { Location: location });
// 				ctx.res.end();
// 			}
// 		}

// 		const componentProps =
// 			WrappedComponent.getInitialProps &&
// 			(await WrappedComponent.getInitialProps(ctx));

// 		return { ...componentProps };
// 	};

// 	return WithConditionalRedirectWrapper;
// }
