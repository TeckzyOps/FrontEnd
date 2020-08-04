import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Formik, Field, Form, ErrorMessage } from "formik";
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
import { useAuth } from "../provider/Auth";
const localStorageService = LocalStorageService.getService();
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
	InputAdornment,
	IconButton,
} from "@material-ui/core";
import * as Yup from "yup";

const useStyles = makeStyles(() => ({
	root: {},
}));

const AccountDetails = (props) => {
	const { className, ...rest } = props;
	const { loginDetails, updateloginDetails } = useAuth();

	const classes = useStyles();

	const [values, setValues] = useState({});
	const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);
	const [editUsername, setEditUsername] = useState(false);
	const [password, setpassword] = useState("");

	const email_verified = values["email_verified_at"];

	const mobile_verified = values["mobile_verified_at"];
	React.useEffect(() => {
		if (localStorageService.getValue("loginDetails")) {
			setValues(JSON.parse(LocalStorageService.getValue("loginDetails")));
		}
		// setValues({
		// 	name: cookieActions.cookie.getJSON("userdata")["name"], //JSON.parse(LocalStorageService.getValue("userdata"))["name"],
		// 	email: cookieActions.cookie.getJSON("userdata")["email"], //JSON.parse(LocalStorageService.getValue("userdata"))["email"],
		// 	mobile: cookieActions.cookie.getJSON("userdata")["mobile"], //JSON.parse(LocalStorageService.getValue("userdata"))["mobile"],
		// 	password: "",
		// });

		console.error(values);
	}, []);

	const _handlesubmitkey = (event) => {
		setpassword(event.target.value);
	};

	const mobileTooltip = values.mobile_verified_at
		? "Verified"
		: "Mobile Not Verified!";
	const emailTooltip = values.email
		? values.email_verified_at
			? "Verified"
			: "E-Mail ID Not Verified!"
		: "Add An E-Mail ID!";

	const _handleModalClose = () => {
		setProfileUpdateSuccess(() => true);
	};

	const handleLoginDetailsSubmit = () => {
		if (values.mpin && values.password) {
			profileActions
				.changeMPIN(values.mpin, values.password)
				.then(function (response) {
					console.log("ressss", response);
					if (response.data.input_error) {
						setError(response.data.input_error);
					}
					if (response.data.data) {
						setValues(response.data.data);
					}
				})
				.catch(function (error) {
					console.error("errrrr ", error);
				});
		}
	};

	const _renderModal = () => {
		const onClick = () => {
			setProfileUpdateSuccess(() => false);
		};

		return (
			<Alert
				isOpen={profileUpdateSuccess}
				handleSubmit={onClick}
				title="Password Update"
				text="Your Profile Was Updated  successfully"
				submitButtonText="Done"
			/>
		);
	};

	const handleChange = (event) => {
		console.log(event);
		// setValues({
		// 	...values,
		// 	[event.target.name]: event.target.value,
		// });
	};

	const _handleSubmit = ({ vals, setSubmitting, resetForm }) => {
		console.log(values);
		let payload = {};
		for (var i in vals) {
			if (!values.hasOwnProperty(i) || vals[i] !== values[i]) {
				payload[i] = vals[i];
			}
		}

		if (payload && Object.keys(payload).length > 1) {
			if (loginDetails && loginDetails.mpin) {
				payload["mpin"] = payload.password;
				delete payload["password"];
			}
			console.log(payload);
			profileActions
				.updateLogin(payload)
				.then(function (response) {
					if (response.data.id) {
						setProfileUpdateSuccess(() => true);
						updateloginDetails(response.data);
						setValues(response.data);
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
		}
	};

	const profileSchema = Yup.object().shape({
		name: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
		mobile: Yup.string().length(10, "Too Short!"),
		email: Yup.string().email("Invalid email"),
		password: Yup.string().min(4, "Too Short!").required("Required"),
	});
	const initVals = {
		name: values.name,
		mobile: values.mobile,
		email: values.email,
		password: "",
	};
	return (
		<Card {...rest} className={clsx(classes.root, className)}>
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
				render={(props) => {
					const {
						values,
						touched,
						errors,
						handleBlur,
						handleSubmit,
						handleChange,
						isValid,
						isSubmitting,
					} = props;
					return (
						<Form>
							<CardHeader
								subheader="The information can be edited"
								title="Account Details"
							/>
							<Divider />
							<CardContent>
								<Grid container spacing={3}>
									<Grid item md={12} xs={12}>

										<Box margin={1}>
											<Field
												fullWidth
												type="text"
												component={TextField}
												label="Full Name"
												name="name"
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
												label="Email"
												name="email"
												placeholder="Email"
												InputProps={{
													endAdornment: (
														<InputAdornment position="end">
															<Tooltip
																title={
																	values.email
																		? values.email_verified_at
																			? "Verified"
																			: "E-Mail ID Not Verified!"
																		: "Add An E-Mail ID!"
																}
															>
																<IconButton aria-label="toggle phone">
																	{!email_verified && (
																		<ErrorOutlineIcon color="primary" />
																	)}
																	{email_verified && (
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
												label="Mobile"
												name="mobile"
												placeholder="Enter Mobile"
												InputProps={{
													endAdornment: (
														<InputAdornment position="end">
															<Tooltip
																title={
																	values.mobile_verified_at
																		? "Verified"
																		: "Mobile Not Verified!"
																}
															>
																<IconButton aria-label="toggle phone">
																	{!mobile_verified && (
																		<ErrorOutlineIcon color="primary" />
																	)}
																	{mobile_verified && (
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

									<Grid item md={12} xs={12}>
										<Box margin={1}>
											<Field
												fullWidth
												required
												type="password"
												component={TextField}
												label={
													loginDetails && loginDetails.mpin
														? "M-PIN"
														: "Password"
												}
												name="password"
												placeholder={
													loginDetails && loginDetails.mpin
														? "Enter M-PIN"
														: "Enter Password"
												}
											/>
										</Box>

									</Grid>
								</Grid>
							</CardContent>
							<Divider />
							<CardActions>
								<Button
									disabled={props.isSubmitting}
									type="submit"
									color="primary"
									variant="outlined"
								>
									Save details
								</Button>
							</CardActions>
						</Form>
					);
				}}
			/>
			{_renderModal()}
		</Card>
	);
};

AccountDetails.propTypes = {
	className: PropTypes.string,
};
AccountDetails.getInitialProps = async ({ req }) => {
	console.log("Getting in Init Props");

	const loginDetails = {
		name: "", //JSON.parse(LocalStorageService.getValue("userdata"))["name"],
		email: "", //JSON.parse(LocalStorageService.getValue("userdata"))["email"],
		mobile: "", //JSON.parse(LocalStorageService.getValue("userdata"))["mobile"],
		password: "",
	};
	return { Details: loginDetails };
};

export default AccountDetails;
