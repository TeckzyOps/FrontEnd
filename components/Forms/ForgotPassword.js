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
import {
	forgetPasswordForm,
	otp,
	newPassword,
} from "../../static/FormData/forgetPasswordForm";

function ForgotPassword(props) {
	const classes = useStyles();
	const { t } = props;
	const OTP_TIMER = 15;
	let btnRef = React.useRef();
	const [counter, setCounter] = useState(OTP_TIMER);
	const [values, setValues] = useState({
		username: "",
		otp: "",
	});
	const [formschema, setformschema] = useState(forgetPasswordForm);

	useEffect(() => {
		counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
	}, [counter]);

	const reqOtp = (values) => {
		setCounter(OTP_TIMER);
		if (values.username) {
			userActions
				.sendOTP(values.username)
				.then(function (response) {
					if (forgetPasswordForm.length < 2) {
						setformschema(forgetPasswordForm.push(otp, newPassword));
					}
					setValues({
						...values,
						["otp"]: response.data.otp,
					});
				})
				.catch(function (error) {
					console.error(error);
				});
		}
	};

	const handleSubmit = (values) => {
		console.log("forgetPasswordForm.length == ", forgetPasswordForm.length);
		if (forgetPasswordForm.length < 2) {
			reqOtp(values);
		}
		if (forgetPasswordForm.length > 2) {
			if (values.username && values.otp && values.password) {
				userActions
					.forgetPassword(values.username, values.otp, values.password)
					.then(function (response) {
						console.log("ressss", response);
					})
					.catch(function (error) {
						console.error(error.response);
					});
			}
		}
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
							<Title align="left">{t("common:retrieve_password")}</Title>
						</Grid>
					</div>
				</Grid>
				<FormContainer
					elements={forgetPasswordForm}
					btn={
						forgetPasswordForm.length > 2
							? { label: "Reset Password" }
							: { label: "Request OTP" }
					}
					onSubmit={handleSubmit}
					helperEle={() =>
						forgetPasswordForm.length > 2 && (
							<div className={classes.formHelper}>
								<Button
									size="small"
									ref={btnRef}
									defaultValue={{ otp: values.otp }}
									onClick={reqOtp(values)}
									disabled={counter ? true : false}
								>
									Resend OTP
								</Button>
								<p>{counter}</p>
							</div>
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
