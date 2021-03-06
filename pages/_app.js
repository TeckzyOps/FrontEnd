/* eslint-disable */
import React from "react";
import App, { Container } from "next/app";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { create } from "jss";
import { PageTransition } from "next-page-transitions";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Loading from "react-loading-bar";
import { i18n, appWithTranslation } from "../i18n";
import appTheme from "../theme/appTheme";
import Snackbar from "../components/VerifyDialog/Snackbar";
/* import css vendors */
import "../node_modules/react-loading-bar/dist/index.css";
import "../node_modules/animate.css/animate.css";
import "../vendors/animate-extends.css";
import "../vendors/page-transition.css";
import "../vendors/slick/slick.css";
import "../vendors/slick/slick-theme.css";
import AxiosIns from "../utils/httpClient";
import CircularProgress from "@material-ui/core/CircularProgress";
import Router from "next/router";
import Backdrop from "@material-ui/core/Backdrop";
import { AuthProvider } from "../components/provider/Auth";
import Cookies from "js-cookie";
import LocalStorageService from "../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();

let themeType = "light";
import routerLinkProtected from "~static/text/link";
let link = routerLinkProtected.starter;
if (typeof Storage !== "undefined") {
	themeType = localStorage.getItem("luxiTheme") || "light";
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
	let heads = req.headers;
	if (!heads.cookie) {
		return;
	}
	if (heads.cookie.indexOf(";") < 0) {
		return;
	}
	const cookie = heads.cookie
		.split(";")
		.find((c) => c.trim().startsWith(`${cookieKey}=`));

	if (!cookie) return undefined;
	return cookie.split("=")[1];
};
const protectedLink = [
	link.profile,
	link.dashboard,
	link.freelancernew,
	link.freelancerVids,
	link.freelancerImg,
	link.sellernew,
	link.sellerVids,
	link.sellerImg,
	link.vendornew,
	link.vendorVids,
	link.vendorImg,
];
class MyApp extends App {
	state = {
		Netloading: false,
		user: {},
		redirectLink: this.props.router.route,
		token: "",
		loggedIn: false,
		loading: true,
		showSnackbar: false,
		snackbarError: "",
		theme: {
			...appTheme("burgundy", themeType),
			direction: i18n.language === "ar" ? "rtl" : "ltr",
		},
	};

	static async getInitialProps({ Component, router, ctx }) {
		const ISSERVER = typeof localStorage === "undefined";
		let token = null;

		if (!ISSERVER) {
			token = localStorage.getItem("token");
		} else {
			token = getCookieFromReq(ctx.req, "token");
		}

		if (token == null && protectedLink.includes(router.route)) {
			console.log("GOING TO REDIRECT :: ", router.route);
			redirectToLogin(ctx.res);
		}

		let pageProps = {};
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return { pageProps };
	}
	componentDidMount() {
		AxiosIns.interceptors.request.use(
			(config) => {
				this.setState({ Netloading: true });
				const token = Cookies.get("token");
				if (null != token && config.url != "login") {
					config.headers.Authorization = "Bearer " + token;
				}

				return config;
			},
			(error) => {
				Promise.reject(error);
			}
		);

		var self = this;
		AxiosIns.interceptors.response.use(
			function (response) {
				// LocalStorageService.getService().setToken(response.data.access_token);

				self.setState({ Netloading: false });
				return response;
			},
			function (error) {
				console.error(error.response);
				self.setState({ Netloading: false });
				if (error.response) {
					if (401 === error.response.status) {
						Cookies.remove("token");
						Cookies.remove("Details");
						localStorage && localStorageService.clearToken();
						localStorage && localStorageService.removeValue("Details");
						Router.push("/login");
					}
					self.setState({ snackbarError: error.response.data.custom_error });
					self.setState({ showSnackbar: true });
				} else if (
					error instanceof Error &&
					typeof error.message !== "undefined"
				) {
					self.setState({ snackbarError: error.message });
					self.setState({ showSnackbar: true });
				} else if (!error.response) {
					self.setState({ snackbarError: "Err: NO Response, Try Again!" });
					self.setState({ showSnackbar: true });
				}

				return Promise.reject(error);
			}
		);

		// Set layout direction
		document.dir = i18n.language === "ar" ? "rtl" : "ltr";

		// Remove preloader
		const preloader = document.getElementById("preloader");
		if (preloader !== null || undefined) {
			preloader.remove();
		}

		// Remove loading bar
		this.setState({ loading: true });
		setTimeout(() => {
			this.setState({ loading: false });
		}, 2000);

		// Refresh JSS in SSR
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentNode.removeChild(jssStyles);
		}

		let details = localStorageService.getUserDetails("Details");
		// if (
		// 	!this.loggedIn &&
		// 	(null !=
		// 		["login", "id"].reduce(
		// 			(details, level) => details && odetailsbj[level],
		// 			details
		// 		) ||
		// 		undefined !=
		// 			["login", "id"].reduce(
		// 				(details, level) => details && odetailsbj[level],
		// 				details
		// 			))
		// ) {
		// 	this.setState({ loggedIn: true });
		// } else {
		// 	Router.push("/login");
		// }
	}

	toggleDarkTheme = () => {
		const { theme } = this.state;
		const newPaletteType = theme.palette.type === "light" ? "dark" : "light";
		localStorage.setItem(
			"luxiTheme",
			theme.palette.type === "light" ? "dark" : "light"
		);
		this.setState({
			theme: {
				...appTheme("burgundy", newPaletteType),
				direction: theme.direction,
			},
		});
	};

	toggleDirection = (dir) => {
		const { theme } = this.state;
		document.dir = dir;
		this.setState({
			theme: {
				...theme,
				direction: dir,
				palette: {
					...theme.palette,
				},
			},
		});
	};
	getNested = (obj, ...args) => {
		return args.reduce((obj, level) => obj && obj[level], obj);
	};
	render() {
		const { theme, loading, Netloading, loggedIn } = this.state;
		const muiTheme = createMuiTheme(theme);
		const { Component, pageProps, router } = this.props; // eslint-disable-line
		const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

		return (
			<Container>
				<AuthProvider>
					<StylesProvider jss={jss}>
						<MuiThemeProvider theme={muiTheme}>
							<CssBaseline />
							<Backdrop
								style={{ zIndex: 1600, color: "#fff", opacity: 0.5 }}
								open={Netloading}
							/>
							{Netloading && (
								<CircularProgress
									left={50}
									top={30}
									style={{
										position: "fixed",
										left: "50%",
										top: "50%",
										zIndex: 1600,
										textAlign: "center",
									}}
									size={50}
									color="primary"
								/>
							)}

							<Loading
								show={loading}
								color={theme.palette.primary.main}
								showSpinner={false}
							/>
							<Snackbar
								style={{ zIndex: 1600 }}
								isOpen={this.state.showSnackbar}
								message={this.state.snackbarError}
								close={() => this.setState({ showSnackbar: false })}
							/>
							<div id="main-wrap">
								<PageTransition timeout={300} classNames="page-fade-transition">
									<Component
										onToggleDark={this.toggleDarkTheme}
										onToggleDir={this.toggleDirection}
										getNested={this.getNested}
										key={router.route}
									/>
								</PageTransition>
							</div>
						</MuiThemeProvider>
					</StylesProvider>
				</AuthProvider>

			</Container>
		);
	}
}

export default appWithTranslation(MyApp);
