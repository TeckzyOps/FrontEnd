import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withTranslation } from "~/i18n";
import routeLink from "~/static/text/link";
import Snackbar from "../VerifyDialog/Snackbar";
import Title from "../Title/TitleSecondary";
import AuthFrame from "./AuthFrame";
import useStyles from "./form-style";
import { useRouter } from "next/router";
import { userActions } from "../../_actions/user.actions";
import base64 from "../../utils/Base64";
import { useAuth } from "../provider/Auth";
import FormContainer from "./FormContainer";
import { loginForm } from "../../static/FormData/loginForm";
import Otpdialog from "../VerifyDialog/OtpDialog";
import api, { addBearerToken, removeBearerToken } from "../../utils/httpClient";
// import { setToken } from "../Hoc/withAuth";
import Cookies from "js-cookie";
import {
	createMuiTheme,
	responsiveFontSizes,
	MuiThemeProvider,
	makeStyles,
} from "@material-ui/core/styles";
import { profileActions } from "../../_actions/profile.action";
import { useTextAlign } from "~/theme/common";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
import LocalStorageService from "../../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();

function Login(props) {
	const classes = useStyles();
	const router = useRouter();
	const { postloginsetToken, postsetLoginData, postsetUserData } = useAuth();
	const [check, setCheck] = useState(false);
	const [showOTP, setOTP] = useState(false);

	const { t } = props;
	const [values, setValues] = useState({
		username: "",
		password: "",
		error: "",
	});

	const btn = { label: "Login" };
	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};
	React.useEffect(() => {
		if (
			localStorageService.getValue("username") &&
			localStorageService.getValue("password")
		) {
			setCheck(true);
			setValues({
				...values,
				["username"]: localStorageService.getValue("username"),
				["password"]: base64.atob(localStorageService.getValue("password")),
			});
		}

		console.error("dashboardprops--> ", props);
	}, []);

	const handleCheck = (event) => {
		setCheck(event.target.checked);
	};

	const handleSubmit = ({
		values,
		setSubmitting,
		resetForm,
		setFieldError,
	}) => {
		if (values.username && values.password) {
			if (check) {
				localStorageService.setValue("username", values.username);
				localStorageService.setValue("password", base64.btoa(values.password));
			} else {
				localStorageService.removeValue("username");
				localStorageService.removeValue("password");
			}
			userActions
				.login(values.username, values.password)
				.then(function (response) {
					console.log("ressss", response);
					if (response.data.input_error) {
						setError(response.data.input_error);
					} else {
						if (
							((response.data.is_mobile_verified &&
								response.data.is_mobile_verified != "0") ||
								(response.data.is_email_verified &&
									response.data.is_email_verified != "0")) &&
							response.data.user_data
						) {
							if (response.data.user_data && response.data.access_token) {
								postsetLoginData(response.data.user_data);
								postloginsetToken(response.data.access_token);
								profileActions
									.getUserProfileDetails()
									.then(function (response) {
										if (response.data) {
											postsetUserData(response.data);
											router.push("/dashboard");
										}
									})
									.catch(function (error) {
										console.error("errrrr ", error);
									});
							}

							// setToken(response.data.access_token, response.data.user_data);
						} else {
							setFieldError({ username: ["Username not verified"] });
							setValues({ ...values, ["username"]: values.username });
							console.error("errrrr ", "Username not verified");
							setOTP(true);
						}
					}
					setSubmitting(false);
				})
				.catch(function (error) {
					if (error.response && error.response.data.input_error) {
						Object.keys(error.response.data.input_error).forEach((k) => {
							setFieldError(k, error.response.data.input_error[k][0]);
						});
					}
					console.error("errrrr ", error);
					setSubmitting(false);
				});
		}
	};

	const closeOTPDialog = () => {
		setOTP(false);
	};

	return (
		<AuthFrame
			title={t("common:login_title")}
			subtitle={t("common:login_subtitle")}
		>
			<Typography>
				{showOTP ? t("common:otp_sentto") + values.username : ""}
			</Typography>
			<div className={classes.separator}></div>
			{showOTP && (
				<Otpdialog doClose={closeOTPDialog} username={values.username} />
			)}
			{!showOTP && (
				<div>
					<div>
						<Grid justify="center" container spacing={3}>
							<div>
								<Grid item xs={12}>
									<MuiThemeProvider theme={theme}>
										<Title align="left">{t("common:login")}</Title>
									</MuiThemeProvider>
								</Grid>
							</div>
						</Grid>
					</div>
					<FormContainer
						elements={loginForm}
						btn={btn}
						defaultvals={values}
						onSubmit={handleSubmit}
						helperEle={() => (
							<div className={classes.formHelper}>
								<FormControlLabel
									control={
										<Checkbox
											checked={check}
											onChange={(e) => handleCheck(e)}
											color="secondary"
											value={check}
											className={classes.check}
										/>
									}
									label={<span>{t("common:login_remember")}</span>}
								/>
								<Button
									size="small"
									className={classes.buttonLink}
									href="/forgot"
								>
									{t("common:login_forgot")}
								</Button>
							</div>
						)}
					/>
					<Grid justify="center" container spacing={3}>
						<div>
							<Grid item xs={12} className="my-4">
								<Button
									size="small"
									className={classes.buttonLink}
									href={routeLink.starter.register}
								>
									<Icon className={clsx(classes.icon, classes.signArrow)}>
										arrow_forward
									</Icon>
									{t("common:login_create")}
								</Button>
							</Grid>
						</div>
					</Grid>
					{/* <ValidatorForm
						onError={(errors) => console.log(errors)}
						onSubmit={handleSubmit}
					>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<TextValidator
									variant="filled"
									className={classes.input}
									label={t("common:login_username")}
									onChange={handleChange("username")}
									name="username"
									value={values.username}
									validators={["required"]}
									errorMessages={[
										"This field is required",
										"username is not valid",
									]}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextValidator
									variant="filled"
									type="password"
									className={classes.input}
									label={t("common:login_password")}
									validators={["required"]}
									onChange={handleChange("password")}
									errorMessages={["This field is required"]}
									name="password"
									value={values.password}
								/>
							</Grid>
						</Grid>
						<div className={classes.formHelper}>
							<FormControlLabel
								control={
									<Checkbox
										checked={check}
										onChange={(e) => handleCheck(e)}
										color="secondary"
										value={check}
										className={classes.check}
									/>
								}
								label={<span>{t("common:login_remember")}</span>}
							/>
							<Button
								size="small"
								className={classes.buttonLink}
								href="/forgot"
							>
								{t("common:login_forgot")}
							</Button>
						</div>
						<div className={classes.btnArea}>
							<Button
								variant="contained"
								fullWidth
								type="submit"
								color="secondary"
								size="large"
							>
								{t("common:continue")}
							</Button>
						</div>
					</ValidatorForm> */}
				</div>
			)}
		</AuthFrame>
	);
}

Login.propTypes = {
	t: PropTypes.func.isRequired,
};

export default withTranslation(["common"])(Login);
