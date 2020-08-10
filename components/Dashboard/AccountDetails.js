import React, { useState } from "react";
import clsx from "clsx";
import { withTranslation } from "~/i18n";
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
	const { postsetLoginData } = useAuth();

	const classes = useStyles();
	const { t } = props;

	const [details, setDetails] = useState({});
	const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);
	const [editUsername, setEditUsername] = useState(false);
	const [password, setpassword] = useState("");

	React.useEffect(() => {
		if (localStorageService.getValue("loginDetails")) {
			setValues(JSON.parse(LocalStorageService.getValue("loginDetails")));
		}
		setDetails(localStorageService.getUserDetails("Details"));
		// setValues({
		// 	name: cookieActions.cookie.getJSON("userdata")["name"], //JSON.parse(LocalStorageService.getValue("userdata"))["name"],
		// 	email: cookieActions.cookie.getJSON("userdata")["email"], //JSON.parse(LocalStorageService.getValue("userdata"))["email"],
		// 	mobile: cookieActions.cookie.getJSON("userdata")["mobile"], //JSON.parse(LocalStorageService.getValue("userdata"))["mobile"],
		// 	password: "",
		// });
	}, []);

	const _handlesubmitkey = (event) => {
		setpassword(event.target.value);
	};

	const _handleModalClose = () => {
		setProfileUpdateSuccess(() => true);
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
						setProfileUpdateSuccess(() => true);
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

	const profileSchema = Yup.object().shape({
		name: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
		mobile: Yup.string().length(10, "Too Short!"),
		email: Yup.string().email("Invalid email"),
		password: Yup.string().min(4, "Too Short!").required("Required"),
	});
	const initVals = {
		name: (details.login && details.login.name) || "",
		mobile: (details.login && details.login.mobile) || "",
		email: (details.login && details.login.email) || "",
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
																	details.login && details.login.email
																		? details.login.email_verified_at
																			? "Verified"
																			: "E-Mail ID Not Verified!"
																		: "Add An E-Mail ID!"
																}
															>
																<IconButton aria-label="toggle phone">
																	{!(
																		details.login &&
																		details.login.email_verified_at
																	) ? (
																		<ErrorOutlineIcon color="primary" />
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
												label="Mobile"
												name="mobile"
												placeholder="Enter Mobile"
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
																		<ErrorOutlineIcon color="primary" />
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
									<Grid item md={12} xs={12}>
										<Box margin={1}>
											<Field
												fullWidth
												required
												type="password"
												component={TextField}
												label={
													details.login && details.login.mpin
														? "M-PIN"
														: "Password"
												}
												name="password"
												placeholder={
													details.login && details.login.mpin
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
								{props.isSubmitting && t("common:cant_revert")}
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

export default withTranslation(["common"])(AccountDetails);
