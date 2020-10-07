/* eslint-disable */

import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import clsx from "clsx";
import Head from "next/head";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Header from "../components/Header";
import TopSlider from "../components/AnimateSlider";
import Feature from "../components/Feature";
import Counter from "../components/Counter";

import { Paper } from "@material-ui/core";
import Footer from "../components/Footer";
import brand from "../static/text/brand";
import PageNav from "../components/PageNav";
import service from "./../utils/ApiService";
import Notification from "../components/Notification";
import Subscribe from "../components/Subscribe";
import Pricing from "../components/Pricing";
import routerLink from "~/static/text/link";
import { useRouter } from "next/router";
import LocalStorageService from "../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();
const sectionMargin = (margin) => margin * 2;
const useStyles = makeStyles((theme) => ({
	mainWrap: {
		position: "relative",
		width: "100%",
		overflow: "hidden",
	},
	spaceBottom: {
		marginBottom: sectionMargin(theme.spacing(2)),
	},
	spaceTop: {
		paddingTop: sectionMargin(theme.spacing(0)),
	},
	containerWrap: {
		marginTop: "11vh",
	},
}));

function Landing(props) {
	const classes = useStyles();
	const { onToggleDark, onToggleDir } = props;
	const router = useRouter();
	React.useEffect(() => {
		if (localStorageService.getAccessToken()) {
			router.push(routerLink.starter.dashboard);
		}
	}, []);

	return (
		<React.Fragment>
			<Head>
				<title>
					{brand.starter.name}
					&nbsp; - Home Page
				</title>
			</Head>
			<CssBaseline />
			<section id="home" />
			<div className={classes.mainWrap}>
				<Header onToggleDark={onToggleDark} onToggleDir={onToggleDir} />
				<main className={clsx(classes.spaceTop)}>
					<section className={classes.containerWrap}>
						<Container fixed>
							<TopSlider />
						</Container>
					</section>

					<Container fixed>
						<Paper elevation={0}>
							<Feature />
						</Paper>
					</Container>

					{/* <section className={classes.pageSection}>
						<Counter />
					</section> */}
					{/* <section className={classes.spaceTop} id="testimonials">
            <Testimonials />
          </section> */}
					{/* <section className={classes.spaceTop} id="pricing">
						<Pricing />
					</section> */}
					{/* <section className={clsx(classes.spaceTop, classes.spaceBottom)} id="blog">
            <Blog />
          </section> */}
					<br />
					{/* <section id="subscribe">
						<Subscribe />
					</section> */}
				</main>
				<Hidden mdDown>
					<PageNav />
				</Hidden>
				<Footer toggleDir={onToggleDir} />
				{/* <Hidden mdDown>
					<Notification />
				</Hidden> */}
			</div>
		</React.Fragment>
	);
}

Landing.getInitialProps = (ctx) => {
	let token = null;
	if (typeof localStorage !== "undefined") {
		token = localStorage.getItem("token");
	} else if (ctx.req) {
		token = ctx.req.headers.cookie.token;
	}

	if (token) {
		if (ctx.res) {
			// Seems to be the version used by zeit
			ctx.res.writeHead(302, {
				Location: routerLink.starter.dashboard,
				// Add the content-type for SEO considerations
				"Content-Type": "text/html; charset=utf-8",
			});
			ctx.res.end();
		}
	}

	return { namespacesRequired: ["common"] };
};

Landing.propTypes = {
	onToggleDark: PropTypes.func.isRequired,
	onToggleDir: PropTypes.func.isRequired,
};

export default Landing;
