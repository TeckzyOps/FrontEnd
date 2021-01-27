import React, { Fragment } from "react";
import Router from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Header from "../../components/Header";
import Head from "next/head";

import AccountProfile from "../../components/Dashboard/Accountprofile";
import AccountDetails from "../../components/Dashboard/AccountDetails";
import ProfileForm from "../../components/Dashboard/ProfileForm";
import KYCForm from "../../components/Dashboard/ProfileKYC_form";
import withAuth from "../../components/Hoc/withAuth";
import { useAuth } from "../../components/provider/Auth";
import LocalStorageService from "../../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();

import { profileActions } from "../../_actions/profile.action";
const useStyles = makeStyles((theme) => ({
	root: { paddingTop: "11vh" },
}));

const Account = (props) => {
	const classes = useStyles();
	const { postloginsetToken, postsetLoginData, postsetUserData } = useAuth();

	return (
		<Fragment>
			<Head>
				<title>Dashboard &nbsp; - Profile</title>
			</Head>
			<Header
				onToggleDark={props.onToggleDark}
				onToggleDir={props.onToggleDir}
			/>
			<div className={classes.root}>
				<Grid container spacing={1}>
					{/* <Grid item lg={4} md={6} xl={4} xs={12}>
						<AccountProfile
							logindata={props.logindata}
							userdata={props.userdata}
						/>
					</Grid> */}
					<Grid item xs={12}>
						<AccountDetails {...props} />
					</Grid>
					<Grid item xs={12}>
						<ProfileForm
							{...props}
							logindata={props.logindata}
							userdata={props.userdata}
						/>
					</Grid>
					<Grid item xs={12}>
						<KYCForm {...props} />
					</Grid>
				</Grid>
			</div>
		</Fragment>
	);
};
// Account.getInitialProps = async (ctx) => {
// 	return {
// 		logindata:
// 			typeof window !== "undefined"
// 				? ctx.req.headers.cookie.loginDetails
// 				: JSON.parse(LocalStorageService.getValue("loginDetails")),
// 		userdata:
// 			typeof window !== "undefined"
// 				? ctx.req.headers.cookie.userDetails
// 				: JSON.parse(LocalStorageService.getValue("userDetails")),
// 	};
// };

const redirectToLogin = (res) => {
	if (res) {
		res.writeHead(302, { Location: "/login" });
		res.end();
		res.finished = true;
	} else {
		Router.push("/login");
	}
};
const refreshLocalData = async () => {
	profileActions
		.getUserProfileDetails()
		.then(function (response) {
			console.log("Called from Intital");
			if (response.data) {
				postsetUserData(response.data);
			}
		})
		.catch(function (error) {
			console.error("errrrr ", error);
		});
	profileActions
		.getLoginDetails()
		.then(function (response) {
			console.log("Called from Intital");
			if (response.data) {
				postsetLoginData(response.data.data);
			}
		})
		.catch(function (error) {
			console.error("errrrr ", error);
		});
};
const getCookieFromReq = (req, cookieKey) => {
	const cookie = req.headers.cookie
		.split(";")
		.find((c) => c.trim().startsWith(`${cookieKey}=`));

	if (!cookie) return undefined;
	return cookie.split("=")[1];
};

Account.getInitialProps = async ({ req, res }) => {
	// let profileres = await profileActions.getUserProfileDetails();
	// if (profileres.data) {
	// 	postsetUserData(profileres.data);
	// }
	// let logineres = await profileActions.getLoginDetails();
	// if (logineres.data) {
	// 	postsetLoginData(logineres.data.data);
	// }
	// const ISSERVER = typeof window === "undefined";
	// let token = null;

	// if (!ISSERVER) {
	// 	token = localStorage.getItem("token");
	// } else {
	// 	token = getCookieFromReq(req, "token");
	// }

	// if (token == null) {
	// 	console.log("GOING TO REDIRECT");
	// 	redirectToLogin(res);
	// }
	return {};
};

export default Account;
