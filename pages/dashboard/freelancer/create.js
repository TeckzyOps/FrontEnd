import React, { Fragment } from "react";
import Router from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import Head from "next/head";
import routerLink from "~/static/text/link";
import Link from "@material-ui/core/Link";
import withAuth from "../../../components/Hoc/withAuth";
import LocalStorageService from "../../../_services/LocalStorageService";
import Header from "../../../components/Header";
const localStorageService = LocalStorageService.getService();
import FreelancerForm from "../../../components/Dashboard/FreelancerForm";
import jsHttpCookie from "cookie";

const useStyles = makeStyles((theme) => ({
	root: { paddingTop: "11vh" },
}));

const Freelancer = (props) => {
	const classes = useStyles();

	return (
		<Fragment>
			<Head>
				<title>Freelancer &nbsp; - Create</title>
			</Head>
			<Header
				onToggleDark={props.onToggleDark}
				onToggleDir={props.onToggleDir}
			/>
			<div className={classes.root}>
				<FreelancerForm {...props} />
			</div>
		</Fragment>
	);
};
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
	let cookie = "";
	if (req != null && req.headers != null && req.headers.cookie != null) {
		cookie = req.headers.cookie
			.split(";")
			.find((c) => c.trim().startsWith(`${cookieKey}=`));
	}

	if (!cookie) return undefined;
	return cookie.split("=")[1];
};

Freelancer.getInitialProps = ({ req, res }) => {
	const ISSERVER = typeof window === "undefined";

	let token = null;

	if (!ISSERVER) {
		token = localStorage.getItem("token");
	} else {
		const cookies = req.headers.cookie;
		if (typeof cookies === "string") {
			const cookiesJSON = jsHttpCookie.parse(cookies);
			token = cookiesJSON.token;
		}
	}

	if (token == null) {
		console.log("GOING TO REDIRECT");
		redirectToLogin(res);
	}
	return {};
};
export default Freelancer;
