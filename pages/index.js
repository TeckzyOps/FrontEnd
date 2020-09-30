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
	console.log(service);
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
					<section className={clsx(classes.spaceTop, "my-5")} id="feature">
						<Container fixed>
							<Paper elevation={0}>
								<Feature />
							</Paper>
						</Container>
					</section>
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

Landing.getInitialProps = async () => ({
	namespacesRequired: ["common"],
});

Landing.propTypes = {
	onToggleDark: PropTypes.func.isRequired,
	onToggleDir: PropTypes.func.isRequired,
};

export default Landing;
