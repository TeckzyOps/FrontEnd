import React from "react";
import withAuth from "../../../components/Hoc/withAuth";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Formik, Field, Form, useField, FieldArray } from "formik";

import * as Yup from "yup";
import {
	gender,
	languages,
	religion,
	caste,
	maritialStatus,
} from "~static/text/profiledata";
import { TextField, Switch } from "formik-material-ui";
import {
	Grid,
	Button,
	Dialog,
	Select,
	Container,
	ButtonBase,
	FormControl,
	MenuItem,
	InputLabel,
} from "@material-ui/core";
import Head from "next/head";
import LocalStorageService from "../../../_services/LocalStorageService";
import DashboardWrapper from "../../../components/Dashboard/DashboardWrapper";
import Typography from "@material-ui/core/Typography";
import MatrimonyProfile from "../../../components/cards/MatrimonyProfile";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import routerLink from "~/static/text/link";
import Link from "@material-ui/core/Link";
<<<<<<< HEAD
=======
import Pagination from "@material-ui/lab/Pagination";
import Slide from "@material-ui/core/Slide";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Toolbar from "@material-ui/core/Toolbar";
>>>>>>> 2eb69cad9f98587f8f61f10b85e899630956e00b
import api, {
	addBearerToken,
	removeBearerToken,
} from "../../../utils/httpClient";
<<<<<<< HEAD
=======

import Header from "../../../components/Header";
>>>>>>> 2eb69cad9f98587f8f61f10b85e899630956e00b
import { matrimonyActions } from "../../../_actions/matrimony.action";
const localStorageService = LocalStorageService.getService();

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	appBar: {
		position: "relative",
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	image: {
		position: "relative",
		height: 200,
		[theme.breakpoints.down("xs")]: {
			width: "100% !important", // Overrides inline-style
			height: 300,
		},
		"&:hover, &$focusVisible": {
			zIndex: 1,
			"& $imageBackdrop": {
				opacity: 0.15,
			},
			"& $imageMarked": {
				opacity: 0,
			},
			"& $imageTitle": {
				border: "4px solid currentColor",
			},
		},
	},
	focusVisible: {},
	imageButton: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		display: "flex",
<<<<<<< HEAD
		height: "100%",
		maxWidth: 345,
		flexDirection: "column",
		
=======
		alignItems: "center",
		justifyContent: "center",
		color: theme.palette.common.white,
	},
	imageSrc: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundSize: "cover",
		backgroundPosition: "center 40%",
	},
	imageBackdrop: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundColor: theme.palette.common.black,
		opacity: 0.4,
		transition: theme.transitions.create("opacity"),
	},
	imageTitle: {
		position: "relative",
		padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
			theme.spacing(1) + 6
		}px`,
	},
	imageMarked: {
		height: 3,
		width: 18,
		backgroundColor: theme.palette.common.white,
		position: "absolute",
		bottom: -2,
		left: "calc(50% - 9px)",
		transition: theme.transitions.create("opacity"),
>>>>>>> 2eb69cad9f98587f8f61f10b85e899630956e00b
	},
	aHover :{
		textDecoration:"none",
	}
}));
<<<<<<< HEAD
const index = (props) => {
	const classes = useStyles();
	const [adList, setadList] = React.useState([]);
	React.useEffect(() => {
		console.log(routerLink);
		matrimonyActions
			.getMatrimonyAds()
			.then(function (response) {
				console.log("ressss", response);
=======

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const MatrimonySearch = (props) => {
	const classes = useStyles();
	const [adList, setadList] = React.useState([]);
	const [filter, setFilter] = React.useState(false);
	const [page, setPage] = React.useState(1);
	const [lastpage, setLastPage] = React.useState(1);
	const [query, setQuery] = React.useState({});
	const [value, setValue] = React.useState([20, 35]);
	const [payload, setPayload] = React.useState({
		gender: 0,
		agefrom: 0,
		ageto: 0,
		heightfrom: 0,
		heightto: 0,
		marital_status: "",
		religion: "",
		cast: "",
		mother_tongue: "",
		weddingbudgetfrom: "",
		weddingbudgetto: "",
	});

	const resetState = () => {
		setPayload({
			gender: payload.gender,
			agefrom: 0,
			ageto: 0,
			heightfrom: 0,
			heightto: 0,
			marital_status: "",
			religion: "",
			cast: "",
			mother_tongue: "",
			weddingbudgetfrom: "",
			weddingbudgetto: "",
		});
	};
	React.useEffect(() => {
		setFilter(false);
		let obj = {};
		Object.keys(payload).forEach((K) => {
			let key = "filter[" + K + "]";

			if (payload[K].length > 0 || payload[K] > 0) {
				obj[key] = payload[K];
			}
		});
		if (Object.values(obj).length > 0) {
			matrimonyActions
				.search(obj)
				.then(function (response) {
					console.log("ressss", response);

					if (Array.isArray(response.data.data.data)) {
						setadList(response.data.data.data);
						setPage(response.data.data.current_page + 1);
						setLastPage(response.data.data.last_page);
					}
				})
				.catch(function (error) {
					console.error("errrrr ", error);
				});
		}
	}, [payload]);

	const handleFilterOpen = () => {
		setFilter(true);
	};

	const handleFilterClose = () => {
		setFilter(false);
	};
	const handlePageChange = (event, value) => {
		matrimonyActions
			.search({ page: value })
			.then(function (response) {
				console.log("ressss", response);

				if (Array.isArray(response.data.data.data)) {
					setadList(response.data.data.data);
					setPage(response.data.data.current_page + 1);
					setLastPage(response.data.data.last_page);
				}
			})
			.catch(function (error) {
				console.error("errrrr ", error);
			});
	};

	const handleSortChange = (event) => {
		console.log("Sort: " + event);
	};
	function handleGenderChange(event) {
		console.log("handleGenderChange: ", event.currentTarget.id);
		let genderid = event.currentTarget.id || event.target.value;
		if (genderid) {
			setPayload({
				gender: parseInt(genderid, 10),
			});
		}
	}
>>>>>>> 2eb69cad9f98587f8f61f10b85e899630956e00b

				if (Array.isArray(response.data.data)) {
					setadList(response.data.data);
				}
			})
			.catch(function (error) {
				console.error("errrrr ", error);
			});
		console.error("dashboardprops--> ", adList);
	}, []);
	return (
		<React.Fragment>
			<Head>
				<title>Dashboard &nbsp; - Login</title>
			</Head>

<<<<<<< HEAD
			<DashboardWrapper logindata={props.logindata} userdata={props.userdata} />
			<div className={classes.root} >
				<Grid container spacing={4}>
					<Grid item lg={4} md={6} xl={4} xs={12}>
						<Card className={classes.addCard}>
							<div>
								<Typography variant="h6">Add More Profile</Typography>
								<Typography variant="subtitle" component="h2">
									Join You Frined
								</Typography>
							</div>
							<div className={classes.col}>
								<Fab
									href={routerLink.starter.matrimonynew}
									color="primary"
									aria-label="add"
								>
									<AddIcon />
								</Fab>
							</div>
						</Card>
					</Grid>

					{adList &&
						adList.map((ad, index) => (
							<Grid item lg={4} md={6} xl={4} xs={12}>
								<Link
									href={routerLink.starter.matrimonyprofile + "?id=" + ad.id}
								>
									<MatrimonyProfile ad={ad} />
								</Link>
							</Grid>
						))}
				</Grid>
=======
			<Header
				onToggleDark={props.onToggleDark}
				onToggleDir={props.onToggleDir}
			/>
			<div className={classes.root}>
				{payload.gender <= 0 && (
					<Container maxWidth="sm">
						<Grid
							style={{ width: "100%", height: "100vh" }}
							alignItems="center"
							justify="space-evenly"
							container
							spacing={2}
						>
							<Grid item xs={12}>
								<Typography variant="h4" gutterBottom>
									Looking For ?
								</Typography>

								<Grid container spacing={2}>
									{[
										{
											url: "/static/groom.png",
											title: "Male",
											width: "100%",
											id: 1,
										},
										{
											url: "/static/bride.png",
											title: "Female",
											width: "100%",
											id: 2,
										},
										{
											url: "/static/intersexual.png",
											title: "Others",
											width: "100%",
											id: 3,
										},
									].map((image, index) => (
										<Grid item md={4} xs={12}>
											<ButtonBase
												key={index}
												focusRipple
												id={image.id}
												key={image.title}
												onClick={handleGenderChange}
												className={classes.image}
												focusVisibleClassName={classes.focusVisible}
												style={{
													width: image.width,
												}}
											>
												<span
													className={classes.imageSrc}
													style={{
														backgroundImage: `url(${image.url})`,
													}}
												/>
												<span className={classes.imageBackdrop} />
												<span className={classes.imageButton}>
													<Typography
														component="span"
														variant="subtitle1"
														color="inherit"
														className={classes.imageTitle}
													>
														{image.title}
														<span className={classes.imageMarked} />
													</Typography>
												</span>
											</ButtonBase>
										</Grid>
									))}
								</Grid>
								<br></br>
								<Link href={routerLink.starter.matrimonyAds}>
									<Button variant="outlined" color="secondary">
										Post an AD
									</Button>
								</Link>
							</Grid>
						</Grid>
					</Container>
				)}
				{payload.gender > 0 && (
					<div>
						<Grid justify="flex-end" alignItems="center" container>
							<Grid item>
								<FormControl className={classes.formControl}>
									<Select
										value={payload.gender}
										displayEmpty
										onChange={handleGenderChange}
										inputProps={{ "aria-label": "Without label" }}
									>
										{["Male", "Female", "Others"].map((option, index) => (
											<MenuItem key={index} value={index + 1}>
												{option}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid item>
								<FormControl className={classes.formControl}>
									<Select
										value=""
										displayEmpty
										onChange={handleSortChange}
										inputProps={{ "aria-label": "Without label" }}
									>
										<MenuItem value="">
											<em>Sort By</em>
										</MenuItem>
										{["Latest", "Oldest"].map((option, index) => (
											<MenuItem key={index} value={option}>
												{option}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid item>
								<Button
									variant="outlined"
									onClick={handleFilterOpen}
									color="secondary"
								>
									Filters
								</Button>
								&nbsp;
								<Button
									variant="outlined"
									onClick={resetState}
									color="secondary"
								>
									Reset
								</Button>
							</Grid>
							<Grid item>
								<Link href={routerLink.starter.matrimonyAds}>
									<Button variant="outlined" color="secondary">
										Post an AD
									</Button>
								</Link>
							</Grid>
						</Grid>
						<br />
						<Grid container spacing={4}>
							<Grid item xs={12}></Grid>
							{adList &&
								adList.map((ad, index) => (
									<Grid item md={4} xs={12}>
										<Link
											style={{ textDecoration: "none" }}
											href={
												routerLink.starter.matrimonyprofile + "?id=" + ad.id
											}
										>
											<MatrimonyProfile ad={ad} />
										</Link>
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

				<Dialog
					fullWidth={true}
					open={filter}
					scroll="paper"
					onClose={() => setFilter(false)}
					TransitionComponent={Transition}
				>
					<Grid container>
						<Grid item xs={12}>
							<DialogTitle onClose={() => setFilter(false)}>
								Filters
							</DialogTitle>
						</Grid>
					</Grid>

					<Formik
						initialValues={payload}
						validationSchema={Yup.object().shape({
							agefrom: Yup.number().min(18, "Value should not be less than 18"),
							ageto: Yup.number().moreThan(Yup.ref("agefrom"), "Invalid Value"),
							heightfrom: Yup.number().min(
								2,
								"Value should not be less than 2"
							),
							heightto: Yup.number().moreThan(
								Yup.ref("heightfrom"),
								"Invalid Value"
							),
							religion: Yup.string(),
							cast: Yup.string(),
							mother_tongue: Yup.string(),
							marital_status: Yup.string(),
							weddingbudgetfrom: Yup.number().min(
								1000,
								"Value should not be less than 1000"
							),
							weddingbudgetto: Yup.number().moreThan(
								Yup.ref("weddingbudgetfrom"),
								"Invalid Value"
							),
						})}
						onSubmit={(data, { setSubmitting }) => {
							setSubmitting(true);

							setPayload({ ...payload, ...data });

							setTimeout(() => {
								console.log(data);
								setSubmitting(false);
								console.log("Filter Data " + payload);
							}, 5000);
						}}
					>
						{(props) => (
							<Form autoComplete="off">
								<DialogContent dividers>
									<DialogContentText>
										<Grid container>
											<Grid item xs={12}></Grid>
										</Grid>
										<Grid container>
											<Grid item xs={12}>
												<Typography variant="body2" gutterBottom>
													Age (in Years)
												</Typography>
												<div style={{ marginBottom: 20 }}>
													<FieldArray name="Age">
														<div>
															<Grid container spacing={2}>
																<Grid item xs={6}>
																	<Field
																		variant="outlined"
																		fullWidth
																		label="From"
																		component={TextField}
																		name="agefrom"
																		helperText={
																			props.errors.hasOwnProperty("agefrom") &&
																			props.errors["agefrom"]
																		}
																		type="number"
																		style={{ marginRight: 10 }}
																	/>
																</Grid>
																<Grid item xs={6}>
																	<Field
																		variant="outlined"
																		fullWidth
																		label="To"
																		component={TextField}
																		name="ageto"
																		helperText={
																			props.errors.hasOwnProperty("ageto") &&
																			props.errors["ageto"]
																		}
																		type="number"
																		style={{ marginRight: 10 }}
																	/>
																</Grid>
															</Grid>
														</div>
													</FieldArray>
												</div>
											</Grid>
										</Grid>

										<Grid container>
											<Grid item xs={12}>
												<Typography variant="body2" gutterBottom>
													Height
												</Typography>
												<div style={{ marginBottom: 20 }}>
													<FieldArray name="height">
														<div>
															<Grid container spacing={2}>
																<Grid item xs={6}>
																	<Field
																		variant="outlined"
																		fullWidth
																		label="From"
																		component={TextField}
																		type="number"
																		name="heightfrom"
																		helperText={
																			props.errors.hasOwnProperty(
																				"heightfrom"
																			) && props.errors["heightfrom"]
																		}
																		style={{ marginRight: 10 }}
																	/>
																</Grid>
																<Grid item xs={6}>
																	<Field
																		variant="outlined"
																		fullWidth
																		label="To"
																		component={TextField}
																		name="heightto"
																		helperText={
																			props.errors.hasOwnProperty("heightto") &&
																			props.errors["heightto"]
																		}
																		type="number"
																		style={{ marginRight: 10 }}
																	/>
																</Grid>
															</Grid>
														</div>
													</FieldArray>
												</div>
											</Grid>
										</Grid>

										<Grid container spacing={2}>
											<Grid item xs={6}>
												<div>
													<Field
														fullWidth
														component={TextField}
														select
														name="religion"
														label="Religion"
														helperText={
															props.errors.hasOwnProperty("religion") &&
															props.errors["religion"]
														}
														margin="normal"
														variant="outlined"
													>
														{religion.map((option, i) => (
															<MenuItem key={i} value={option}>
																{option}
															</MenuItem>
														))}
													</Field>
												</div>
											</Grid>
											<Grid item xs={6}>
												<div>
													<Field
														fullWidth
														component={TextField}
														select
														name="cast"
														label="Caste"
														helperText={
															props.errors.hasOwnProperty("cast") &&
															props.errors["cast"]
														}
														margin="normal"
														variant="outlined"
													>
														{caste.map((option, i) => (
															<MenuItem key={i} value={option}>
																{option}
															</MenuItem>
														))}
													</Field>
												</div>
											</Grid>
										</Grid>

										<Grid container spacing={2}>
											<Grid item xs={6}>
												<div style={{ marginBottom: 20 }}>
													<Field
														fullWidth
														component={TextField}
														select
														name="marital_status"
														label="Maritial Status"
														helperText={
															props.errors.hasOwnProperty("marital_status") &&
															props.errors["marital_status"]
														}
														margin="normal"
														variant="outlined"
													>
														{maritialStatus.map((option, i) => (
															<MenuItem key={i} value={option}>
																{option}
															</MenuItem>
														))}
													</Field>
												</div>
											</Grid>
											<Grid item xs={6}>
												<div style={{ marginBottom: 20 }}>
													<Field
														fullWidth
														component={TextField}
														select
														name="mother_tongue"
														label="Mother Tongue"
														helperText={
															props.errors.hasOwnProperty("mother_tongue") &&
															props.errors["mother_tongue"]
														}
														margin="normal"
														variant="outlined"
													>
														{languages.map((option, i) => (
															<MenuItem key={i} value={option}>
																{option}
															</MenuItem>
														))}
													</Field>
												</div>
											</Grid>
										</Grid>

										<Grid container>
											<Grid item xs={12}>
												<Typography variant="body2" gutterBottom>
													Wedding Budget
												</Typography>
												<div style={{ marginBottom: 20 }}>
													<FieldArray name="weddingBudget">
														<div>
															<Grid container spacing={2}>
																<Grid item xs={6}>
																	<Field
																		variant="outlined"
																		fullWidth
																		label="From"
																		type="number"
																		component={TextField}
																		helperText={
																			props.errors.hasOwnProperty(
																				"weddingbudgetfrom"
																			) && props.errors["weddingbudgetfrom"]
																		}
																		name="weddingbudgetfrom"
																		style={{ marginRight: 10 }}
																	/>
																</Grid>
																<Grid item xs={6}>
																	<Field
																		variant="outlined"
																		fullWidth
																		label="To"
																		component={TextField}
																		name="weddingbudgetto"
																		helperText={
																			props.errors.hasOwnProperty(
																				"weddingbudgetto"
																			) && props.errors["weddingbudgetto"]
																		}
																		type="number"
																		style={{ marginRight: 10 }}
																	/>
																</Grid>
															</Grid>
														</div>
													</FieldArray>
												</div>
											</Grid>
										</Grid>
									</DialogContentText>
								</DialogContent>
								<DialogActions>
									{/* <Button autoFocus onClick={handleFilterClose} color="primary">
										Save changes
									</Button> */}
									<Button onClick={() => setFilter(false)} color="primary">
										Cancel
									</Button>
									<div>
										<Button
											variant="contained"
											color="primary"
											size="large"
											type="submit"
											disabled={props.isSubmitting}
										>
											Apply Filters
										</Button>
									</div>
								</DialogActions>
							</Form>
						)}
					</Formik>
				</Dialog>
>>>>>>> 2eb69cad9f98587f8f61f10b85e899630956e00b
			</div>
		</React.Fragment>
	);
};

<<<<<<< HEAD
export default withAuth(index);
=======
export default withAuth(MatrimonySearch);
>>>>>>> 2eb69cad9f98587f8f61f10b85e899630956e00b
