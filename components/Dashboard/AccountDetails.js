import React, { useState } from "react";
import clsx from "clsx";
import { withTranslation } from "~/i18n";
import PropTypes from "prop-types";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Spinner from "../Spinner/spinner";
import Alert from "./../alert/alert";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import EditIcon from "@material-ui/icons/Edit";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Tooltip from "@material-ui/core/Tooltip";
import { profileActions } from "../../_actions/profile.action";
import LocalStorageService from "../../_services/LocalStorageService";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { cookieActions } from "../Hoc/cookies";
import routeLink from "~/static/text/link";
import { useRouter } from "next/router";
import { useAuth } from "../provider/Auth";
const localStorageService = LocalStorageService.getService();
import { userActions } from "../../_actions/user.actions";
import Cookies from "js-cookie";
import DP_Component from "../Dashboard/DP_Component";
import Otpdialog from "../VerifyDialog/OtpDialog";
import Avatar from "@material-ui/core/Avatar";
import {
	fieldToTextField,
	TextField,
	CheckboxWithLabel,
	TextFieldProps,
	Select,
	Switch,
} from "formik-material-ui";

import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Divider,
	Box,
	Grid,
	Button,
	MenuItem,
	InputAdornment,
	Typography,
	IconButton,
} from "@material-ui/core";
import * as Yup from "yup";
let theme = createMuiTheme();
const useStyles = makeStyles((theme) => ({
	root: {},
	removeHover: {
		"&:hover": {
			backgroundColor: "transparent",
		},
	},
	labelRoot: {
		fontSize: 18,
		fontWeight: "bold",
	},
	headerBadge: {
		width: 30,
		height: 30,
		marginRight: 10,
		backgroundColor: theme.palette.primary.light,
	},
}));

const AccountDetails = (compprops) => {
	const { className, ...rest } = compprops;
	const { postsetLoginData } = useAuth();
	const router = useRouter();
	const classes = useStyles();
	const { t } = compprops;
	const [showOTP, setOTP] = useState(false);
	const [MessagePopup, setMessagePopup] = useState(false);
	const [verifyUsername, setverifyUsername] = useState("");
	const [Message, setMessage] = useState("");
	const [details, setDetails] = useState({});
	const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);
	const [editUsername, setEditUsername] = useState(false);
	const [password, setpassword] = useState("");
	var dp_img = "";
	React.useEffect(() => {
		if (verifyUsername) {
			setOTP(true);
		}
	}, [verifyUsername]);
	React.useEffect(() => {
		console.log(compprops);
		if (localStorageService.getValue("login")) {
			setValues(JSON.parse(LocalStorageService.getValue("login")));
		}
		setDetails(localStorageService.getUserDetails("Details"));
		let img = compprops.getNested(
			localStorageService.getUserDetails("Details"),
			"profile",
			"data",
			"image_path"
		);
		if (img) {
			dp_img = img;
		}
		// setValues({
		// 	name: cookieActions.cookie.getJSON("userdata")["name"], //JSON.parse(LocalStorageService.getValue("userdata"))["name"],
		// 	email: cookieActions.cookie.getJSON("userdata")["email"], //JSON.parse(LocalStorageService.getValue("userdata"))["email"],
		// 	mobile: cookieActions.cookie.getJSON("userdata")["mobile"], //JSON.parse(LocalStorageService.getValue("userdata"))["mobile"],
		// 	password: "",
		// });
	}, []);

	const _renderModal = (ele) => {
		if (ele == "EmailVerify") {
			setMessage(
				"Logging You Out, Please use your Email to login to get it Verified!"
			);
			setMessagePopup(() => true);
		}
		const onClick = () => {
			setMessagePopup(() => false);
			// window.location.reload(false);
			if (ele == "EmailVerify") {
				logout();
			}
		};

		return (
			<Alert
				isOpen={MessagePopup}
				handleSubmit={onClick}
				title="Process Status"
				text={Message}
				submitButtonText="Ok."
			/>
		);
	};
	const _handlesubmitkey = (event) => {
		setpassword(event.target.value);
	};

	const _handleModalClose = () => {
		setProfileUpdateSuccess(() => true);
	};

	const handleChange = (event) => {
		console.log(event);
	};

	const logout = () => {
		// Cookies.remove("token");
		// Cookies.remove("Details");
		// localStorage && localStorageService.clearToken();
		// localStorage && localStorageService.removeValue("Details");
		// window.location.reload(false);
		userActions
			.logout()
			.then(function (response) {
				console.log("ressss", response);
				Cookies.remove("token");
				Cookies.remove("Details");
				localStorage && localStorageService.clearToken();
				localStorage && localStorageService.removeValue("Details");

				router.push(routerLink.starter.login);
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
	const _handleSubmit = ({ vals, setSubmitting, resetForm }) => {
		console.log(details);
		let payload = {};
		for (var i in vals) {
			if (
				(!details.login.hasOwnProperty(i) || vals[i] !== details.login[i]) &&
				vals[i].toString() != ""
			) {
				payload[i] = vals[i] && vals[i];
			}
		}

		if (payload && Object.keys(payload).length > 1) {
			if (details.login && details.login.mpin) {
				payload["mpin"] = payload.password;
				delete payload["password"];
			}
			console.log(payload);
			profileActions
				.updateLogin(payload)
				.then(function (response) {
					if (response.data.id) {
						setMessage("Operation Completed Succesfully!");
						setMessagePopup(() => true);
						postsetLoginData(response.data);
						setDetails({ ...details, ["login"]: response.data });
					}
					setSubmitting(false);
					resetForm();
					console.log("ressss", response);
					if (response.data.input_error) {
						setError(response.data.input_error);
					}
				})
				.catch(function (error) {
					setSubmitting(false);
					console.error("errrrr ", error);
				});
		} else {
			setSubmitting(false);
			resetForm();
		}
	};
	const closeOTPDialog = () => {
		setOTP(false);
	};
	const profileSchema = Yup.object().shape({
		name: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
		mobile: Yup.string().length(10, "Mobile should be of 10 digits"),
		email: Yup.string().email("Invalid email"),
		password: Yup.string().min(4, "Too Short!").required("Required"),
		mpin: Yup.string().length(4, "M-PIN should be of 4 digits"),
	});
	const initVals = {
		name: (details.login && details.login.name) || "",
		mobile: (details.login && details.login.mobile) || "",
		email: (details.login && details.login.email) || "",
		password: "",
		mpin: "",
	};
	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			{showOTP && (
				<Otpdialog doClose={closeOTPDialog} username={verifyUsername} />
			)}
			{!showOTP && (
				<Formik
					enableReinitialize
					initialValues={initVals}
					validationSchema={profileSchema}
					onSubmit={(vals, { setSubmitting, resetForm }) =>
						_handleSubmit({
							vals,
							setSubmitting,
							resetForm,
						})
					}
				>
					{(props) => {
						const {
							touched,
							errors,
							handleBlur,
							handleSubmit,
							handleChange,
							isValid,
							isSubmitting,
						} = props;
						return (
							<div>
								<Form>
									<Accordion>
										<AccordionSummary
											expandIcon={<ExpandMoreIcon />}
											aria-controls="panel1c-content"
											id="panel1c-header"
										>
											<Avatar className={classes.headerBadge}>1</Avatar>

											<Typography className={classes.heading}>
												Account Details Of Member
											</Typography>
										</AccordionSummary>
										<AccordionDetails>
											<Grid container spacing={3}>
												<Grid container justify="center" spacing={2}>
													<Grid item>
														<DP_Component
															userid={compprops.getNested(
																details,
																"login",
																"id"
															)}
															img={compprops.getNested(
																details,
																"profile",
																"data",
																"image_path"
															)}
														/>
													</Grid>
													<Grid item xs={12} sm container>
														<Grid item md={6} xs={12}>
															<Box margin={1}>
																<Field
																	fullWidth
																	type="text"
																	component={TextField}
																	label="Full Name"
																	variant="outlined"
																	name="name"
																	InputLabelProps={{
																		classes: {
																			root: classes.labelRoot,
																		},
																	}}
																	placeholder="Full Name"
																/>
															</Box>
														</Grid>
														<Grid item md={6} xs={12}>
															<Box margin={1}>
																<Field
																	fullWidth
																	type="text"
																	component={TextField}
																	label="Mobile"
																	name="mobile"
																	variant="outlined"
																	placeholder="Enter Mobile"
																	InputLabelProps={{
																		classes: {
																			root: classes.labelRoot,
																		},
																	}}
																	InputProps={{
																		endAdornment: (
																			<InputAdornment position="end">
																				<Tooltip
																					title={
																						details.login &&
																						details.login.mobile_verified_at
																							? "Verified"
																							: "Mobile Not Verified!"
																					}
																				>
																					<IconButton aria-label="toggle phone">
																						{!(
																							details.login &&
																							details.login.mobile_verified_at
																						) ? (
																							<div>
																								<ErrorOutlineIcon color="primary" />
																								<Button
																									size="small"
																									onClick={() =>
																										setverifyUsername(
																											props.values.mobile
																										)
																									}
																									color="primary"
																								>
																									Verify
																								</Button>
																							</div>
																						) : (
																							<CheckCircleIcon
																								style={{ color: "green" }}
																							/>
																						)}
																					</IconButton>
																				</Tooltip>
																			</InputAdornment>
																		),
																	}}
																/>
															</Box>
														</Grid>
														<Grid item md={6} xs={12}>
															<Box margin={1}>
																<Field
																	fullWidth
																	type="text"
																	component={TextField}
																	label="Email"
																	name="email"
																	variant="outlined"
																	placeholder="Email"
																	InputLabelProps={{
																		classes: {
																			root: classes.labelRoot,
																		},
																	}}
																	InputProps={{
																		endAdornment: (
																			<InputAdornment position="end">
																				<Tooltip
																					className={classes.removeHover}
																					title={
																						details.login && details.login.email
																							? details.login.email_verified_at
																								? "Verified"
																								: "E-Mail ID Not Verified!"
																							: "Add An E-Mail ID!"
																					}
																				>
																					<IconButton>
																						{!(
																							details.login &&
																							details.login.email_verified_at
																						) ? (
																							<div>
																								<ErrorOutlineIcon color="primary" />
																								<Button
																									size="small"
																									onClick={() =>
																										setverifyUsername(
																											props.values.email
																										)
																									}
																									color="primary"
																								>
																									Verify
																								</Button>
																							</div>
																						) : (
																							<CheckCircleIcon
																								style={{ color: "green" }}
																							/>
																						)}
																					</IconButton>
																				</Tooltip>
																			</InputAdornment>
																		),
																	}}
																/>
															</Box>
														</Grid>

														<Grid item md={6} xs={12}>
															<Box margin={1}>
																<Field
																	fullWidth
																	component={TextField}
																	type="text"
																	name="nationality"
																	label="Nationality"
																	select
																	disabled={true}
																	onChange={handleChange}
																	variant="outlined"
																	defaultValue="Indian (Default)"
																	helperText={
																		props.errors.hasOwnProperty(
																			"nationality"
																		) && props.errors["nationality"]
																	}
																	InputLabelProps={{
																		classes: {
																			root: classes.labelRoot,
																		},
																	}}
																>
																	{["Indian (Default)"].map((option, index) => (
																		<MenuItem key={index} value={option}>
																			{option}
																		</MenuItem>
																	))}
																</Field>
															</Box>
														</Grid>
														<Grid item md={6} xs={12}>
															<Box margin={1}>
																<Field
																	fullWidth
																	type="text"
																	component={TextField}
																	label="Generate/Update MPIN (4 Digit)"
																	name="mpin"
																	variant="outlined"
																	placeholder="Enter 4-Digit M-PIN"
																	InputLabelProps={{
																		classes: {
																			root: classes.labelRoot,
																		},
																	}}
																/>
															</Box>
														</Grid>
														<Grid item md={6} xs={12}>
															<Box margin={1}>
																<Field
																	fullWidth
																	type="password"
																	variant="outlined"
																	component={TextField}
																	label="Password"
																	name="password"
																	placeholder="Enter Password"
																	InputLabelProps={{
																		classes: {
																			root: classes.labelRoot,
																		},
																	}}
																/>
															</Box>
														</Grid>
													</Grid>
												</Grid>
											</Grid>

											<Divider />
										</AccordionDetails>
										<Divider />
										<AccordionActions>
											{props.isSubmitting && t("common:cant_revert")}
											<Button
												disabled={props.isSubmitting}
												type="submit"
												color="primary"
												variant="outlined"
											>
												Save details
											</Button>
										</AccordionActions>
									</Accordion>
								</Form>
							</div>
						);
					}}
				</Formik>
			)}
			{_renderModal()}
		</Card>
	);
};

AccountDetails.propTypes = {
	className: PropTypes.string,
};

export default withTranslation(["common"])(AccountDetails);
