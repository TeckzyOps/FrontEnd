import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
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
import LocalStorageService from "../../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();

function Login(props) {
	const classes = useStyles();
	const router = useRouter();
	const [check, setCheck] = useState(false);
	const [snackbar, showsnackbar] = useState(false);
	const [showOTP, setOTP] = useState(false);

	const { t } = props;
	const [values, setValues] = useState({
		username: "",
		password: "",
		error: "",
	});

	useEffect(() => {
		ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
			if (value !== values.password) {
				return false;
			}
			return true;
		});
	});

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const handleCheck = (event) => {
		setCheck(event.target.checked);
	};

	const handleSubmit = () => {
		console.log("data submited: ", values);
		if (values.username && values.password) {
			if (check) {
				localStorageService.setValue("username", values.username);
				localStorageService.setValue("password", base64.btoa(values.password));
			}
			userActions
				.login(values.username, values.password)
				.then(function (response) {
					console.log("ressss", response);
					if (
						response.data.is_mobile_verified &&
						response.data.is_mobile_verified == "0"
					) {
						setOTP(true);
					}

					if (
						response.data.is_email_verified &&
						response.data.is_email_verified == "0"
					) {
						setOTP(true);
					}
					router.push("/dashboard");
				})
				.catch(function (error) {
					if (error.response.data.message) {
						setValues({ ...values, ["error"]: error.response.data.message });
					}

					console.error("errrrr ", error);
					showsnackbar(true);
				});
		}
	};

	return (
		<AuthFrame
			title={t("common:login_title")}
			subtitle={t("common:login_subtitle")}
		>
			<Snackbar
				isOpen={snackbar}
				message={values.error}
				close={() => showsnackbar(false)}
			/>
			<div className={classes.separator}>
				<Typography>
					{showOTP ? t("common:otp_sentto") + values.username : ""}
				</Typography>
			</div>
			{showOTP && <Otpdialog mobile={values.username} />}
			{!showOTP && (
				<div>
					<div className={classes.head}>
						<Title align="left">{t("common:login")}</Title>
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
					</div>
					{/* <SocialAuth /> */}
					{/* <div className={classes.separator}>
					<Typography>{t("common:login_or")}</Typography>
				</div> */}
					<ValidatorForm
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
					</ValidatorForm>
				</div>
			)}
		</AuthFrame>
	);
}

Login.propTypes = {
	t: PropTypes.func.isRequired,
};

export default withTranslation(["common"])(Login);
