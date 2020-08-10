import { createContext, useContext, useState, useEffect } from "react";

import Cookies from "js-cookie";
import api, { addBearerToken, removeBearerToken } from "../../utils/httpClient";
import { profileActions } from "../../_actions/profile.action";
import { userActions } from "../../_actions/user.actions";
import Router from "next/router";
import routerLink from "~/static/text/link";
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
				removeBearerToken();
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
		addBearerToken(token);
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
