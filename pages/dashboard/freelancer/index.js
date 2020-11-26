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
	CardHeader,
	Divider,
	Button,
	Avatar,
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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import logo from "~/static/home/navbarLogo.jpg";
import CustomCard from "./card";
import api, {
	addBearerToken,
	removeBearerToken,
} from "../../../utils/httpClient";
import { freelancerActions } from "../../../_actions/freelancer.action";
const localStorageService = LocalStorageService.getService();
import {
	createMuiTheme,
	responsiveFontSizes,
	MuiThemeProvider,
} from "@material-ui/core/styles";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
const sectionMargin = (margin) => margin * 2;
const useStyles = makeStyles((theme) => ({
	root: { paddingTop: "11vh", flexGrow: 1 },
	details: {
		display: "flex",
		flexDirection: "column",
	},
	content: {
		flex: "1 0 auto",
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
		freelancerActions
			.getFreelancer()
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
				<title>Freelancer</title>
			</Head>

			<Header
				onToggleDark={props.onToggleDark}
				onToggleDir={props.onToggleDir}
			/>

			<div className={classes.root}>
				<Grid alignContent="center" container spacing={2}>
					{/* <Grid item md={3} xs={12}>
						<Card
							style={{ textAlign: "center", height: "100%" }}
							className={classes.card}
						>
							<Typography variant="h6">Add More Profile</Typography>
							<div className={classes.col}>
								<Fab
									href={routerLink.starter.freelancernew}
									color="primary"
									aria-label="add"
								>
									<AddIcon />
								</Fab>
							</div>
							<Typography variant="subtitle" component="h2">
								New Freelancer Application
							</Typography>
						</Card>
					</Grid> */}

					{adList &&
						adList.map((ad, index) => (
							<Grid key={index} item md={4} xs={12}>
								<Link
									style={{ textDecoration: "none" }}
									href={routerLink.starter.freelancernew + "?id=" + ad.id}
								>
									<CustomCard ad={ad} {...props} />
									{/* <Card>
										<CardHeader
											avatar={<Avatar aria-label="recipe" src={logo} />}
											title="Freelancer"
											subheader="ISF00000001"
										/>
										
										<CardContent className={classes.content}>
											<Grid container spacing={3}>
												<Grid container justify="center" spacing={2}>
													<Grid item xs={12} sm container>
														<Table
															className={classes.table}
															size="small"
															aria-label="a dense table"
														>
															<TableBody>
																<TableRow>
																	<TableCell component="th" scope="row">
																		<MuiThemeProvider theme={theme}>
																			<Typography
																				variant="caption"
																				display="block"
																				gutterBottom
																				noWrap
																			>
																				Profession's Name
																			</Typography>
																		</MuiThemeProvider>
																	</TableCell>
																	<TableCell align="left">
																		<MuiThemeProvider theme={theme}>
																			<Typography
																				variant="caption"
																				display="block"
																				gutterBottom
																				noWrap
																			>
																				{ad.bussiness_name}
																			</Typography>
																		</MuiThemeProvider>
																	</TableCell>
																</TableRow>

																<TableRow>
																	<TableCell component="th" scope="row">
																		<MuiThemeProvider theme={theme}>
																			<Typography
																				variant="caption"
																				display="block"
																				gutterBottom
																				noWrap
																			>
																				Profession's Since
																			</Typography>
																		</MuiThemeProvider>
																	</TableCell>
																	<TableCell align="left">
																		<MuiThemeProvider theme={theme}>
																			<Typography
																				variant="caption"
																				display="block"
																				gutterBottom
																				noWrap
																			>
																				{ad.bussiness_since}
																			</Typography>
																		</MuiThemeProvider>
																	</TableCell>
																</TableRow>

																<TableRow>
																	<TableCell component="th" scope="row">
																		<MuiThemeProvider theme={theme}>
																			<Typography
																				variant="caption"
																				display="block"
																				gutterBottom
																				noWrap
																			>
																				Service Area
																			</Typography>
																		</MuiThemeProvider>
																	</TableCell>
																	<TableCell align="left">
																		<MuiThemeProvider theme={theme}>
																			<Typography
																				variant="caption"
																				display="block"
																				gutterBottom
																				noWrap
																			>
																				{ad.service_area}
																			</Typography>
																		</MuiThemeProvider>
																	</TableCell>
																</TableRow>

																<TableRow>
																	<TableCell component="th" scope="row">
																		<MuiThemeProvider theme={theme}>
																			<Typography
																				variant="caption"
																				display="block"
																				gutterBottom
																				noWrap
																			>
																				Service Category
																			</Typography>
																		</MuiThemeProvider>
																	</TableCell>
																	<TableCell align="left">
																		<MuiThemeProvider theme={theme}>
																			<Typography
																				variant="caption"
																				display="block"
																				gutterBottom
																				noWrap
																			>
																				{ad.service_category}
																			</Typography>
																		</MuiThemeProvider>
																	</TableCell>
																</TableRow>

																<TableRow>
																	<TableCell component="th" scope="row">
																		<MuiThemeProvider theme={theme}>
																			<Typography
																				variant="caption"
																				display="block"
																				gutterBottom
																				noWrap
																			>
																				Sub Category
																			</Typography>
																		</MuiThemeProvider>
																	</TableCell>
																	<TableCell align="left">
																		<MuiThemeProvider theme={theme}>
																			<Typography
																				variant="caption"
																				display="block"
																				gutterBottom
																				noWrap
																			>
																				{ad.sub_service.join(", ")}
																			</Typography>
																		</MuiThemeProvider>
																	</TableCell>
																</TableRow>

																<TableRow>
																	<TableCell component="th" scope="row">
																		<MuiThemeProvider theme={theme}>
																			<Typography
																				variant="caption"
																				display="block"
																				gutterBottom
																				noWrap
																			>
																				Offers/Tagline
																			</Typography>
																		</MuiThemeProvider>
																	</TableCell>
																	<TableCell align="left">
																		<MuiThemeProvider theme={theme}>
																			<Typography
																				variant="caption"
																				display="block"
																				gutterBottom
																				noWrap
																			>
																				{ad.offer_tagline}
																			</Typography>
																		</MuiThemeProvider>
																	</TableCell>
																</TableRow>

																<TableRow>
																	<TableCell component="th" scope="row">
																		<MuiThemeProvider theme={theme}>
																			<Typography
																				variant="caption"
																				display="block"
																				gutterBottom
																				noWrap
																			>
																				Email Add.
																			</Typography>
																		</MuiThemeProvider>
																	</TableCell>
																	<TableCell align="left">
																		<MuiThemeProvider theme={theme}>
																			<Typography
																				variant="caption"
																				display="block"
																				gutterBottom
																				noWrap
																			>
																				{ad.office_email}
																			</Typography>
																		</MuiThemeProvider>
																	</TableCell>
																</TableRow>
															</TableBody>
														</Table>
													</Grid>
													<Grid item>
														<Avatar
															alt="Remy Sharp"
															src="https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
														/>
													</Grid>
												</Grid>
											</Grid>

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
									</Card> */}
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
