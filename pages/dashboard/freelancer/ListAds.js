import React from "react";
import withAuth from "../../../components/Hoc/withAuth";
import {
	makeStyles,
	useTheme,
	createMuiTheme,
	responsiveFontSizes,
	MuiThemeProvider,
} from "@material-ui/core/styles";
import BrokenImageIcon from "@material-ui/icons/BrokenImage";
import { Formik, Field, Form, useField, FieldArray } from "formik";
import Router from "next/router";
import cookies from "js-cookie";
import * as Yup from "yup";
import DateFnsUtils from "@date-io/date-fns";
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { TextField, Switch } from "formik-material-ui";
import {
	Grid,
	Button,
	Dialog,
	Select,
	Container,
	ButtonBase,
	FormControl,
	Box,
	MenuItem,
	InputLabel,
} from "@material-ui/core";
import Head from "next/head";
import LocalStorageService from "../../../_services/LocalStorageService";
import DashboardWrapper from "../../../components/Dashboard/DashboardWrapper";
import Typography from "@material-ui/core/Typography";
import CustomCard from "./card";
import routerLink from "~/static/text/link";
import Link from "@material-ui/core/Link";
import Pagination from "@material-ui/lab/Pagination";
import Slide from "@material-ui/core/Slide";
import AppBar from "@material-ui/core/AppBar";
import FormContainer from "./../../../components/Forms/FormContainer";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import Avatar from "@material-ui/core/Avatar";
import { freelancerFilter } from "~static/FormData/freelancerForms.js";
import Header from "../../../components/Header";
import Divider from "../../../components/CustomElements/Divider/";
import { freelancerActions } from "../../../_actions/freelancer.action";
import broken_image from "~/static/images/broken_image.svg";
import FilterCard from "./filterCard";
const localStorageService = LocalStorageService.getService();
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
const useStyles = makeStyles((theme) => ({
	root: { paddingTop: "11vh", flexGrow: 1 },
	appBar: {
		position: "relative",
	},
	title: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},

	labelRoot: {
		fontSize: 18,
		fontWeight: "bold",
		backgroundColor: "white",
	},
	Dividercontainer: {
		display: "flex",
		alignItems: "center",
	},
	img: {
		height: 200,

		overflow: "hidden",
		display: "block",
		width: "100%",
	},
	brokenImg: {
		width: 50,
	},
	border: {
		borderBottom: "1px solid black",
		width: "100%",
	},
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
	content: {
		padding: "0 10px 0 10px",
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const MatrimonySearch = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const [activeStep, setActiveStep] = React.useState(0);
	const [details, setDetails] = React.useState({});
	const [images, setImages] = React.useState([]);
	const maxSteps = images.length;

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};
	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const [adList, setadList] = React.useState([]);
	const [ad, setAd] = React.useState({});
	const [filter, setFilter] = React.useState(true);

	const [profile, setProfile] = React.useState(false);

	const [nextpage, setNextPage] = React.useState(0);
	const [currentpage, setCurrentPage] = React.useState(1);
	const [lastpage, setLastPage] = React.useState(1);
	const [query, setQuery] = React.useState({});
	const [value, setValue] = React.useState([20, 35]);
	const [payload, setPayload] = React.useState({
		service_category: "",
		sub_service: "",
		booking_date: null,
		service_price: "",
		city: props.getNested(details, "profile", "data", "city")
			? details.profile.data.city
			: "",
		district: props.getNested(details, "profile", "data", "district")
			? details.profile.data.district
			: "",
		state: props.getNested(details, "profile", "data", "state")
			? details.profile.data.state
			: "",
		freelancer_member_id: "",
	});
	function addDefaultSrc(ev) {
		ev.target.src = broken_image;
		ev.target.alt = "Seems a broken link!";
	}
	const resetState = () => {
		setPayload({
			service_category: "",
			sub_service: "",
			booking_date: "",
			service_price: "",
			district: "",
			state: "",
			freelancer_member_id: "",
		});
	};
	function applyFilter(payload, page) {
		let obj = {};

		if (payload["freelancer_member_id"]) {
			obj["freelancer_member_id"] = payload["freelancer_member_id"];
		} else {
			if (payload["booking_date"]) {
				obj["booking_date"] = payload["booking_date"];
			} else {
				Object.keys(payload).forEach((K) => {
					let key = "filter[" + K + "]";
					if (K != "booking_date") {
						if (payload[K]) {
							obj[key] = payload[K];
						}
					}
				});
			}
		}

		if (null != page && page <= lastpage && page != currentpage) {
			obj.page = page;
		}
		if (null != page && page == currentpage) {
			obj = {};
		}
		if (Object.values(obj).length > 0) {
			freelancerActions
				.search(obj)
				.then(function (response) {
					setFilter(false);
					console.log("ressss", response);

					if (Array.isArray(response.data.data.data)) {
						setadList(response.data.data.data);
						setCurrentPage(response.data.data.current_page);
						if (
							response.data.data.current_page < response.data.data.last_page
						) {
							setNextPage(response.data.data.current_page + 1);
						} else {
							setNextPage(1);
						}

						setLastPage(response.data.data.last_page);
					} else if (response.data.data.id) {
						setadList([response.data.data]);
					}
				})
				.catch(function (error) {
					setFilter(false);
					console.error("errrrr ", error);
				});
		}
	}
	React.useEffect(() => {
		setDetails(localStorageService.getUserDetails("Details"));
	}, []);
	const handleFilterOpen = () => {
		setFilter(true);
	};

	const handleFilterClose = () => {
		setFilter(false);
	};

	function handleProfileOpen(index) {
		setImages(adList[index].images.concat(adList[index].videos));
		setAd(adList[index]);
	}

	const handlePageChange = (event, value) => {
		setFilter(false);
		applyFilter(payload, value);
	};
	const DatePickerField = ({ field, form, ...other }) => {
		const currentError = form.errors[field.name];

		return (
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardDatePicker
					clearable
					name={field.name}
					format="yyyy/MM/dd"
					style={{ width: "100%" }}
					value={field.value}
					helperText={currentError}
					error={Boolean(currentError)}
					onError={(error) => {
						// handle as a side effect
						if (error !== currentError) {
							form.setFieldError(field.name, error);
						}
					}}
					// if you are using custom validation schema you probably want to pass `true` as third argument
					onChange={(date) => form.setFieldValue(field.name, date, false)}
					{...other}
				/>
			</MuiPickersUtilsProvider>
		);
	};

	const helperElement = (prop) => {
		return (
			<Grid item xs={12}>
				<Divider>OR</Divider>

				<Box margin={1}>
					<Field
						fullWidth
						component={TextField}
						InputLabelProps={{
							classes: {
								root: classes.labelRoot,
							},
						}}
						label={"Freelancer ID"}
						name={"freelancer_member_id"}
						variant="outlined"
						onChange={prop.handleChange}
					/>
				</Box>
			</Grid>
		);
	};

	return (
		<React.Fragment>
			<Head>
				<title>Freelancer - Search</title>
			</Head>

			<Header
				onToggleDark={props.onToggleDark}
				onToggleDir={props.onToggleDir}
			/>
			<div className={classes.root}>
				<div>
					<Grid justify="flex-end" alignItems="center" container>
						<Grid item>
							<Button
								variant="outlined"
								onClick={handleFilterOpen}
								color="secondary"
							>
								Filters
							</Button>
						</Grid>
					</Grid>
					<br />
					{adList.length > 0 && (
						<div>
							<Grid container spacing={4}>
								<Grid item xs={12}></Grid>
								{adList &&
									adList.map((ad, index) => (
										<Grid item md={4} xs={12}>
											<FilterCard
												ad={ad}
												{...props}
												index={index}
												setAd={handleProfileOpen}
												fullview={false}
											/>
										</Grid>
									))}
							</Grid>
							<Pagination
								count={lastpage}
								color="primary"
								onChange={handlePageChange}
							/>
						</div>
					)}

					{adList.length === 0 && !filter && (
						<Container maxWidth="sm">
							<Grid
								style={{
									flex: 1,
									alignItems: "center",
									justifyContent: "center",
									paddingTop: 20,
								}}
								container
							>
								<Grid
									item
									container
									direction="column"
									justify="center"
									alignItems="center"
									xs={12}
								>
									<Avatar color="secondary" className={classes.large}>
										<SentimentVeryDissatisfiedIcon />
									</Avatar>
									<Typography variant="h4" gutterBottom>
										Sorry! No Results Found.
									</Typography>
									<Button
										variant="outlined"
										onClick={handleFilterOpen}
										color="secondary"
									>
										Filters
									</Button>
								</Grid>
							</Grid>
						</Container>
					)}
				</div>

				<Dialog
					fullWidth={true}
					maxWidth={"md"}
					open={filter}
					scroll="paper"
					onClose={() => setFilter(false)}
					TransitionComponent={Transition}
				>
					<Grid container>
						<FormContainer
							resetLabel="Reset"
							onSubmit={({ values, setSubmitting, setFieldError }) => {
								setSubmitting(true);
								let shouldSubmit = true;
								if (values["booking_date"]) {
									values["booking_date"] = new Date(values["booking_date"])
										.toISOString()
										.split("T")[0];
								}
								if (values.freelancer_member_id) {
									applyFilter(values);
								} else {
									if (values["booking_date"]) {
										values["booking_date"] = new Date(values["booking_date"])
											.toISOString()
											.split("T")[0];
									} else {
										Object.keys(values).forEach((k) => {
											if (k != "freelancer_member_id" && k != "booking_date") {
												if (!values[k]) {
													setFieldError(k, "Field is required");
													shouldSubmit = false;
												}
											}
										});
									}

									if (shouldSubmit) {
										applyFilter(values);
									}
								}

								if (shouldSubmit) {
									setPayload(values);
									setTimeout(() => {
										setSubmitting(false);
									}, 5000);
								} else {
									setSubmitting(false);
								}
							}}
							elements={freelancerFilter}
							defaultvals={payload}
							helperEle={helperElement}
						/>
					</Grid>
				</Dialog>

				{/* Full Profile View Dialog */}

				<Dialog
					fullWidth={true}
					maxWidth={"md"}
					open={ad.id != null}
					scroll="paper"
					onClose={() => setAd({})}
					TransitionComponent={Transition}
				>
					<Grid container>
						<Grid item xs={12}>
							<DialogTitle onClose={() => setFilter(false)}>
								Freelancer Member : {ad.freelancer_member_id}
							</DialogTitle>
						</Grid>

						<Grid container justify="center">
							<Grid
								style={{ padding: theme.spacing(2) }}
								item
								md={6}
								sm={6}
								xs={12}
							>
								{maxSteps <= 0 && (
									<Typography
										align="center"
										component="h1"
										variant="h6"
										color="inherit"
									>
										Upload Some Images/Videos<br></br>to Showcase Here.
									</Typography>
								)}
								{maxSteps > 0 && (
									<div style={{ maxWidth: 345, flexGrow: 1 }}>
										{images[activeStep].file_type == 1 ? (
											<img
												onError={(ev) => addDefaultSrc(ev)}
												className={classes.img}
												src={images.length > 0 && images[activeStep].file_path}
												alt={images.length > 0 && images[activeStep].file_path}
											/>
										) : (
											<video
												width="100%"
												src={images[activeStep].file_path}
												muted="muted"
												loop="loop"
												autoPlay={false}
												controls={true}
											/>
										)}
										<MobileStepper
											steps={maxSteps}
											position="static"
											variant="text"
											activeStep={activeStep}
											nextButton={
												<Button
													size="small"
													onClick={handleNext}
													disabled={activeStep === maxSteps - 1}
												>
													Next
													{theme.direction === "rtl" ? (
														<KeyboardArrowLeft />
													) : (
														<KeyboardArrowRight />
													)}
												</Button>
											}
											backButton={
												<Button
													size="small"
													onClick={handleBack}
													disabled={activeStep === 0}
												>
													{theme.direction === "rtl" ? (
														<KeyboardArrowRight />
													) : (
														<KeyboardArrowLeft />
													)}
													Back
												</Button>
											}
										/>
									</div>
								)}
							</Grid>
							<Grid item md={6} sm={6} xs={12}>
								<FilterCard ad={ad} fullview={true} {...props} />
							</Grid>
						</Grid>
					</Grid>
					<DialogActions>
						<Button onClick={() => setAd({})} color="primary">
							Close
						</Button>
					</DialogActions>
				</Dialog>
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

MatrimonySearch.getInitialProps = ({ req, res }) => {
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
export default MatrimonySearch;
