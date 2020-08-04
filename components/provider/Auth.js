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
	const [user, setUser] = useState(null);
	const [loginDetails, setloginDetails] = useState(null);

	useEffect(() => {
		const token = Cookies.get("token");
		const loginDet = Cookies.getJSON("loginDetails");
		if (token) {
			setToken(token);
		}
		if (loginDet) {
			setloginDetails(loginDet);
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

	const updateloginDetails = (loginDetails) => {
		setloginDetails(loginDetails);
	};

	const logout = () => {
		userActions
			.logout()
			.then(function (response) {
				console.log("ressss", response);
				redirectAfterLogout();
				Cookies.remove("token");
				Cookies.remove("loginDetails");
				Cookies.remove("userDetails");
				localStorage && localStorageService.clearToken();
				localStorage && localStorageService.removeValue("loginDetails");
				localStorage && localStorageService.removeValue("userDetails");
				setUser(null);
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

	const setToken = (token, loginDetails) => {
		if (token) {
			Cookies.set("token", token);
			addBearerToken(token);
		}

		if (loginDetails) {
			Cookies.set("loginDetails", JSON.stringify(loginDetails));
			setloginDetails(loginDetails);
		}

		updateUser();
	};

	const redirectAfterLogin = () => {
		Router.push(routerLink.starter.dashboard);
	};
	const redirectAfterLogout = () => {
		Router.push(routerLink.starter.login);
	};

	return (
		<AuthContext.Provider
			value={{
				setToken,
				updateloginDetails,
				updateUser,
				user,
				loginDetails,
				isAuthenticated: !!user,
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
