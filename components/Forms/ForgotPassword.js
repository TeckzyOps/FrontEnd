/* eslint-disable */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withTranslation } from "~/i18n";
import routeLink from "~/static/text/link";
import SocialAuth from "./SocialAuth";
import Title from "../Title/TitleSecondary";
import AuthFrame from "./AuthFrame";
import useStyles from "./form-style";
import FormContainer from "./FormContainer";
import { userActions } from "../../_actions/user.actions";
import Timer from "../timer/Timer";
import { useRouter } from "next/router";
import {
	forgetPasswordForm,
	otp,
	newPassword,
} from "../../static/FormData/forgetPasswordForm";
import {
	createMuiTheme,
	responsiveFontSizes,
	MuiThemeProvider,
	makeStyles,
} from "@material-ui/core/styles";
import { useTextAlign } from "~/theme/common";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
let otpval = "";
function ForgotPassword(props) {
	const router = useRouter();
	const classes = useStyles();
	const { t } = props;
	const OTP_TIMER = 15;
	let btnRef = React.useRef();
	const [counter, setCounter] = useState(true);
	const [values, setValues] = useState({
		username: "",
		otp: "",
		counterid: "",
	});
	const [formschema, setformschema] = useState(forgetPasswordForm);
	const changeOTPBtnState = () => {
		setCounter(!counter);
	};

	React.useEffect(() => {
		if (forgetPasswordForm.length > 2) {
			reqOtp(values);
		}
	}, [formschema]);
	const reqOtp = (values) => {
		if (values.username) {
			userActions
				.sendOTP(values.username)
				.then(function (response) {
					// if (forgetPasswordForm.length < 2) {
					// 	setformschema(forgetPasswordForm.push(otp, newPassword));
					// }
				})
				.catch(function (error) {
					console.error(error);
				});
		}
	};

	const handleSubmit = (submitProps) => {
		let vals = submitProps.values;
		console.log(forgetPasswordForm.length);
		if (forgetPasswordForm.length < 2) {
			setValues({ ...values, ["username"]: vals.username });
			if (forgetPasswordForm.length < 2) {
				setformschema(forgetPasswordForm.push(otp, newPassword));
			}
		} else {
			if (vals.username && vals.otp && vals.password) {
				userActions
					.forgetPassword(vals.username, vals.otp, vals.password)
					.then(function (response) {
						console.log("ressss", response);
						if (response.status == 201) {
							router.push("/login");
						}
						submitProps.setSubmitting(false);
					})
					.catch(function (error) {
						console.error(error.response);
						submitProps.setSubmitting(false);
					});
			}
		}
	};

	const resendClicked = () => {
		reqOtp(values);
	};

	return (
		<AuthFrame
			title={t("common:forgot_title")}
			subtitle={t("common:forgot_subtitle")}
		>
			<div>
				<Grid justify="center" container spacing={3}>
					<div>
						<Grid item xs={12}>
							<MuiThemeProvider theme={theme}>
								<Title align="left">{t("common:retrieve_password")}</Title>
							</MuiThemeProvider>
						</Grid>
					</div>
				</Grid>
				<FormContainer
					elements={forgetPasswordForm}
					defaultValue={{ otp: otpval }}
					btn={
						forgetPasswordForm.length > 2
							? { label: "Reset Password" }
							: { label: "Request OTP" }
					}
					onSubmit={handleSubmit}
					helperEle={() =>
						forgetPasswordForm.length > 2 && (
							<Timer resendClicked={resendClicked} />
						)
					}
				/>
				<Grid justify="center" container spacing={3}>
					<div>
						<Grid item xs={12}>
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
								onChange={handleChange("email")}
								name="username"
								value={values.email}
								validators={["required"]}
								errorMessages={["This field is required"]}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextValidator
								variant="filled"
								type="text"
								className={classes.input}
								label={t("common:otp")}
								validators={["required"]}
								onChange={handleChange("password")}
								errorMessages={["This field is required"]}
								name="password"
								value={values.password}
							/>
						</Grid>
					</Grid>
					<div className={classes.btnArea}>
						<Button
							variant="contained"
							fullWidth
							type="submit"
							color="secondary"
							size="large"
						>
							{t("common:request_otp")}
						</Button>
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
				</Grid>
			</div>
		</AuthFrame>
	);
}

ForgotPassword.propTypes = {
	t: PropTypes.func.isRequired,
};

export default withTranslation(["common"])(ForgotPassword);
