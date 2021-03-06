import React from "react";
import Router from "next/router";
import withAuth from "../../../components/Hoc/withAuth";
import { makeStyles } from "@material-ui/core/styles";
import {
	Grid,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Divider,
	Button,
} from "@material-ui/core";
import Head from "next/head";
import LocalStorageService from "../../../_services/LocalStorageService";
import Header from "../../../components/Header";
import Typography from "@material-ui/core/Typography";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import IconButton from "@material-ui/core/IconButton";
import ExploreIcon from "@material-ui/icons/Explore";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import routerLink from "~/static/text/link";
import Link from "@material-ui/core/Link";

import api, {
	addBearerToken,
	removeBearerToken,
} from "../../../utils/httpClient";
import { workerActions } from "../../../_actions/worker.action";
const localStorageService = LocalStorageService.getService();
import {
	createMuiTheme,
	responsiveFontSizes,
	MuiThemeProvider,
} from "@material-ui/core/styles";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
const useStyles = makeStyles((theme) => ({
	root: { paddingTop: "11vh" },

	card: {
		maxWidth: 300,
		margin: "auto",
		display: "flex",
		flexDirection: "column",
		transition: "0.3s",
		boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
		"&:hover": {
			boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
		},
	},
	media: {
		paddingTop: "56.25%",
	},
	content: {
		textAlign: "left",
		padding: theme.spacing(1),
	},
	divider: {
		margin: `${theme.spacing(3)}px 0`,
	},
	heading: {
		fontWeight: "bold",
	},
	subheading: {
		lineHeight: 1.8,
	},
	avatar: {
		display: "inline-block",
		border: "2px solid white",
		"&:not(:first-of-type)": {
			marginLeft: -theme.spacing(),
		},
	},
}));
const index = (props) => {
	const classes = useStyles();
	const [adList, setadList] = React.useState([]);
	React.useEffect(() => {
		workerActions
			.getWorker()
			.then(function (response) {
				console.log("ressss", response);

				if (Array.isArray(response.data.data)) {
					setadList(response.data.data);
				}
			})
			.catch(function (error) {
				console.error("errrrr ", error);
			});
	}, []);
	return (
		<React.Fragment>
			<Head>
				<title>Dashboard &nbsp; - Login</title>
			</Head>

			<Header
				onToggleDark={props.onToggleDark}
				onToggleDir={props.onToggleDir}
			/>
			<div className={classes.root}>
				<Grid alignContent="center" container spacing={2}>
					<Grid item md={3} xs={12}>
						<Card
							style={{ textAlign: "center", height: "100%" }}
							className={classes.card}
						>
							<Typography variant="h6">Add More Profile</Typography>
							<div className={classes.col}>
								<Fab
									href={routerLink.starter.workernew}
									color="primary"
									aria-label="add"
								>
									<AddIcon />
								</Fab>
							</div>
							<Typography variant="subtitle" component="h2">
								New Worker Application
							</Typography>
						</Card>
					</Grid>

					{adList &&
						adList.map((ad, index) => (
							<Grid key={index} item md={3} xs={12}>
								<Link
									style={{ textDecoration: "none" }}
									href={routerLink.starter.workerDetails + "?id=" + ad.id}
								>
									<Card className={classes.card}>
										{/* <CardMedia
											className={classes.media}
											image={
												"https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
											}
										/> */}
										<CardContent className={classes.content}>
											<MuiThemeProvider theme={theme}>
												Tagline:
												<Typography
													className={"MuiTypography--heading"}
													variant={"h5"}
													gutterBottom
												>
													{ad.offer_tagline}
												</Typography>
												Business Name:
												<Typography
													className={"MuiTypography--heading"}
													variant={"h6"}
													gutterBottom
												>
													{ad.bussiness_name}
												</Typography>
												<Typography variant="subtitle1" color="textSecondary">
													{ad.sub_service + " | " + ad.service_area}
												</Typography>
												Business Description:
												<Typography
													className={"MuiTypography--subheading"}
													variant={"caption"}
												>
													{ad.bussineess_description}
												</Typography>
											</MuiThemeProvider>
											<Divider className={classes.divider} light />
										</CardContent>
										<CardActions>
											<Link
												target="_blank"
												href={"https://maps.google.com"}
												rel="noopener"
											>
												<IconButton>
													<ExploreIcon fontSize="large" />
												</IconButton>
											</Link>
										</CardActions>
									</Card>
								</Link>
							</Grid>
						))}
				</Grid>
			</div>
		</React.Fragment>
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
	const cookie = req.headers.cookie
		.split(";")
		.find((c) => c.trim().startsWith(`${cookieKey}=`));

	if (!cookie) return undefined;
	return cookie.split("=")[1];
};

index.getInitialProps = ({ req, res }) => {
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
export default index;
