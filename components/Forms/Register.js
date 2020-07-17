import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import clsx from "clsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withTranslation } from "~/i18n";
import routeLink from "~/static/text/link";
import Title from "../Title/TitleSecondary";
import AuthFrame from "./AuthFrame";
import useStyles from "./form-style";
import FormContainer from "./FormContainer";
import { regForm } from "../../static/FormData/RegForm";
import * as Yup from "yup";

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
	console.log(withTranslation(["common"]));

	// const elements = [
	// 	{ name: "name", type: "text", label: t("common:register_name") },
	// 	{ name: "mobile", type: "text", label: t("common:register_mobile") },
	// 	{
	// 		name: "password",
	// 		type: "password",
	// 		label: t("common:register_password"),
	// 	},
	// 	{ name: "confirm", type: "password", label: t("common:register_confirm") },
	// 	{
	// 		name: "accept",
	// 		type: "checkbox",
	// 		label: (
	// 			<span>
	// 				{t("common:form_terms")}&nbsp;
	// 				<a href="#">{t("common:form_privacy")}</a>
	// 			</span>
	// 		),
	// 	},
	// ];
	const btn = { label: "Register" };

	useEffect(() => {
		ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
			if (value !== values.password) {
				return false;
			}
			return true;
		});
		ValidatorForm.addValidationRule("isShort", (value) => {
			if (value.length >= 1 && value.length < 6) {
				return false;
			}
			return true;
		});
		ValidatorForm.addValidationRule("isMobile", (value) => {
			var phoneno = /^\d{10}$/;
			if (value.length >= 1 && !value.match(phoneno)) {
				return false;
			}
			return true;
		});
	}, [values]);

	const handleChange = (name) => (event) => {
		console.log("Handle Change");
		setValues({ ...values, [name]: event.target.value });
	};

	const handleCheck = (event) => {
		console.log("Handle Check");

		setCheck(event.target.checked);
		// setOTP(true);
	};

	const handleSubmit = (values) => {
		if (values.name && values.mobile && values.password) {
			userActions
				.register(values.name, values.mobile, values.password)
				.then(function (response) {
					console.log("ressss", response);
					// userActions.sendOTP(value.mobile).then(() => {
					setOTP(!showOTP);
					// });
				})
				.catch(function (error) {
					console.error(error.response);
				});
		}
	};

	return (
		<AuthFrame
			title={t("common:register_title")}
			subtitle={t("common:register_subtitle")}
		>
			<div>
				<div className={classes.head}>
					<Title align="left">{t("common:register")}</Title>
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
				</div>

				<div className={classes.separator}>
					<Typography>
						{showOTP
							? t("common:otp_sentto") + values.mobile
							: t("common:register_or")}
					</Typography>
				</div>
				{/* OTP FORM---------------------------------------- */}
				{showOTP && <Otpdialog mobile={values.mobile} />}
				{/* Register Form Starts from here---- */}
				{!showOTP && (
					<FormContainer elements={regForm} btn={btn} onSubmit={handleSubmit} />
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
