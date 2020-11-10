import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Grid, Icon, Checkbox, Typography, Button } from "@material-ui/core";
import CheckCircleSharpIcon from "@material-ui/icons/CheckCircleSharp";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withTranslation } from "~/i18n";
import routeLink from "~/static/text/link";
import Title from "../Title/TitleSecondary";
import AuthFrame from "./AuthFrame";
import useStyles from "./form-style";
import FormContainer from "./FormContainer";
import { regForm } from "../../static/FormData/RegForm";
import * as Yup from "yup";
import {
	createMuiTheme,
	responsiveFontSizes,
	MuiThemeProvider,
	makeStyles,
} from "@material-ui/core/styles";
import { useTextAlign } from "~/theme/common";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

import Otpdialog from "../VerifyDialog/OtpDialog";
import { userActions } from "../../_actions/user.actions";

function Register(props) {
	const classes = useStyles();

	const { t } = props;
	const [values, setValues] = useState({
		name: "",
		mobile: "",
		password: "",
		confirmPassword: "",
		otp: "",
		otpStatus: "",
		otpTimer: 15,
	});
	const [showOTP, setOTP] = useState(false);
	const [check, setCheck] = useState(false);
	const btn = { label: "Register" };

	const handleChange = (name) => (event) => {
		console.log("Handle Change");
		setValues({ ...values, [name]: event.target.value });
	};

	const handleSubmit = ({ values, setFieldError, setSubmitting }) => {
		let res = {};
		if (values.name && values.mobile && values.password) {
			userActions
				.register(values.name, values.mobile, values.password)
				.then(function (response) {
					if (response.data.input_error) {
						Object.keys(response.data.input_error).forEach((k) => {
							setFieldError(k, response.data.input_error[k][0]);
						});
					}

					if (response.data.message) {
						setValues({ ...values, ["mobile"]: values.mobile });
						setOTP(!showOTP);
					}
					console.log("ressss", response);
					// userActions.sendOTP(value.mobile).then(() => {
					// setOTP(!showOTP);
					// });
					setSubmitting(false);
				})
				.catch(function (error) {
					if (error.response && error.response.data.input_error) {
						Object.keys(error.response.data.input_error).forEach((k) => {
							setFieldError(k, error.response.data.input_error[k][0]);
						});
					}
					console.error(error.response);
					setSubmitting(false);
				});
		}
	};

	return (
		<AuthFrame
			title={t("common:register_title")}
			subtitle={t("common:register_subtitle")}
		>
			<div>
				<div>
					<Grid justify="center" container spacing={3}>
						<div>
							<Grid item xs={12}>
								<MuiThemeProvider theme={theme}>
									<Title align="left">{t("common:register")}</Title>
								</MuiThemeProvider>
							</Grid>
						</div>
					</Grid>
				</div>

				<div className={classes.separator}>
					<Typography>
						{showOTP
							? t("common:otp_sentto") + values.mobile
							: t("common:register_or")}
					</Typography>
					{showOTP && <CheckCircleSharpIcon />}
				</div>
				{/* OTP FORM---------------------------------------- */}
				{showOTP && <Otpdialog username={values.mobile} />}
				{/* Register Form Starts from here---- */}
				{!showOTP && (
					<div>
						<FormContainer
							elements={regForm}
							btn={btn}
							onSubmit={handleSubmit}
						/>

						<Grid justify="center" container spacing={3}>
							<div>
								<Grid item xs={12} className="my-4">
									<Button
										size="small"
										className={classes.buttonLink}
										href={routeLink.starter.login}
									>
										<Icon className={clsx(classes.icon, classes.signArrow)}>
											arrow_forward
										</Icon>
										{t("common:register_already")}
									</Button>
								</Grid>
							</div>
						</Grid>
					</div>
					// <ValidatorForm
					// 	onError={(errors) => console.log(errors)}
					// 	onSubmit={handleSubmit}
					// >
					// 	<Grid container spacing={3}>
					// 		<Grid item xs={12}>
					// 			<TextValidator
					// 				variant="filled"
					// 				className={classes.input}
					// 				label={t("common:register_name")}
					// 				onChange={handleChange("name")}
					// 				name="name"
					// 				value={values.name}
					// 				validators={["required"]}
					// 				errorMessages={["This field is required"]}
					// 			/>
					// 		</Grid>
					// 		<Grid item xs={12}>
					// 			<TextValidator
					// 				variant="filled"
					// 				className={classes.input}
					// 				label={t("common:register_mobile")}
					// 				onChange={handleChange("mobile")}
					// 				name="mobile"
					// 				value={values.mobile}
					// 				validators={["isMobile", "required"]}
					// 				errorMessages={[
					// 					"Mobile is not valid",
					// 					"This field is required",
					// 				]}
					// 			/>
					// 		</Grid>
					// 		<Grid item md={6} xs={12}>
					// 			<TextValidator
					// 				variant="filled"
					// 				type="password"
					// 				className={classes.input}
					// 				label={t("common:register_password")}
					// 				validators={["isShort", "required"]}
					// 				onChange={handleChange("password")}
					// 				errorMessages={[
					// 					"Password too short!",
					// 					"This field is required",
					// 				]}
					// 				name="password"
					// 				value={values.password}
					// 			/>
					// 		</Grid>
					// 		<Grid item md={6} xs={12}>
					// 			<TextValidator
					// 				variant="filled"
					// 				type="password"
					// 				className={classes.input}
					// 				label={t("common:register_confirm")}
					// 				validators={["isShort", "isPasswordMatch", "required"]}
					// 				errorMessages={[
					// 					"Password too short!",
					// 					"Password mismatch",
					// 					"this field is required",
					// 				]}
					// 				onChange={handleChange("confirmPassword")}
					// 				name="confirm"
					// 				value={values.confirmPassword}
					// 			/>
					// 		</Grid>
					// 	</Grid>
					// 	<div className={classes.btnArea}>
					// 		<FormControlLabel
					// 			control={
					// 				<Checkbox
					// 					onClick={(e) => handleCheck(e)}
					// 					checked={check}
					// 					color="secondary"
					// 					value={check}
					// 					className={classes.check}
					// 					required
					// 				/>
					// 			}
					// 			label={
					// 				<span>
					// 					{t("common:form_terms")}
					// 					&nbsp;
					// 					<a href="#">{t("common:form_privacy")}</a>
					// 				</span>
					// 			}
					// 		/>
					// 		<Button
					// 			variant="contained"
					// 			fullWidth
					// 			type="submit"
					// 			color="secondary"
					// 			size="large"
					// 		>
					// 			{t("common:continue")}
					// 		</Button>
					// 	</div>
					// </ValidatorForm>
				)}
			</div>
		</AuthFrame>
	);
}

Register.propTypes = {
	t: PropTypes.func.isRequired,
};

export default withTranslation(["common"])(Register);
