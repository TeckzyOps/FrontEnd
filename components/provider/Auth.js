import { createContext, useContext, useState, useEffect } from "react";

import api, { addBearerToken, removeBearerToken } from "../../utils/httpClient";
import axios from "../../utils/httpClient";
import { profileActions } from "../../_actions/profile.action";
import { userActions } from "../../_actions/user.actions";
import Cookies from "js-cookie";
import Router from "next/router";
import routerLink from "~/static/text/link";
const protectedLink = [
	routerLink.starter.profile,
	routerLink.starter.dashboard,
	routerLink.starter.freelancernew,
	routerLink.starter.freelancerVids,
	routerLink.starter.freelancerImg,
];
import LocalStorageService from "../../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [details, setDetails] = useState(null);
	const [token, setToken] = useState(null);
	useEffect(() => {
		const token = Cookies.get("token");
		const loginDet = Cookies.getJSON("loginDetails");
		if (token) {
			setToken(token);
		}
	}, []);

	const updateUser = async () => {
		profileActions
			.getUserProfileDetails()
			.then(function (response) {
				console.log("ressss", response);
				if (!response.data.custom_error) {
					setUser(response.data);
					Cookies.set("userDetails", JSON.stringify(response.data));
					localStorageService.setValue(
						"userDetails",
						JSON.stringify(response.data)
					);

					// Cookies.set("loginDetails", JSON.stringify(loginDetails));
					// redirectAfterLogin();
				}
			})
			.catch(function (error) {
				console.error("errrrr ", error);
				logout();
			});
	};

	const logout = () => {
		userActions
			.logout()
			.then(function (response) {
				console.log("ressss", response);
				Cookies.remove("token");
				Cookies.remove("Details");
				localStorage && localStorageService.clearToken();
				localStorage && localStorageService.removeValue("Details");
				setDetails(null);
				// removeBearerToken();
				// delete axios.defaults.headers.Authorization;
				setToken(null);
				redirectAfterLogout();
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

	const redirectAfterLogin = () => {
		Router.push(routerLink.starter.dashboard);
	};
	const redirectAfterLogout = () => {
		Router.push(routerLink.starter.login);
	};

	const postloginsetToken = (token) => {
		Cookies.set("token", token);
		localStorageService.setToken(token);
	};

	const postsetLoginData = (logindata) => {
		let det = {
			login: logindata,
			profile: {},
		};
		Cookies.set("Details", JSON.stringify(det));
		localStorageService.setValue("Details", JSON.stringify(det));
	};
	const postsetUserData = (userdata) => {
		let det = Cookies.getJSON("Details");
		if (!det) {
			det = localStorageService.getValue("Details");
		}
		det["profile"] = userdata;
		Cookies.set("Details", JSON.stringify(det));
		localStorageService.setValue("Details", JSON.stringify(det));
		setDetails(det);
	};

	return (
		<AuthContext.Provider
			value={{
				postloginsetToken,
				postsetLoginData,
				postsetUserData,
				details,
				isAuthenticated: !!token,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const authContext = useContext(AuthContext);
	return authContext;
};

export function useIsAuthenticated() {
	const context = useAuth();
	return context.isAuthenticated;
}

const redirectToLogin = (res) => {
	if (res) {
		res.writeHead(302, { Location: "/login" });
		res.end();
		res.finished = true;
	} else {
		Router.push("/login");
	}
};
const getCookieFromReq = (req, cookieKey) => {
	const cookie = req.headers.cookie
		.split(";")
		.find((c) => c.trim().startsWith(`${cookieKey}=`));

	if (!cookie) return undefined;
	return cookie.split("=")[1];
};

AuthProvider.getInitialProps = ({ req, res }) => {
	console.log("REQ :: ---------------------------------------", req);
	const ISSERVER = typeof window === "undefined";
	let token = null;

	if (!ISSERVER) {
		token = localStorage.getItem("token");
	} else {
		token = getCookieFromReq(req, "token");
	}

	if (token == null) {
		console.log("GOING TO REDIRECT");
		redirectToLogin(res);
	}
	return {};
};
