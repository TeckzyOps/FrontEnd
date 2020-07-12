import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withTranslation } from "~/i18n";
import routeLink from "~/static/text/link";
import SocialAuth from "./SocialAuth";
import Title from "../Title/TitleSecondary";
import AuthFrame from "./AuthFrame";
import useStyles from "./form-style";
import OtpDialog from "../VerifyDialog/OtpDialog";
import { userActions } from "../../_actions/user.actions";

function Register(props) {
	const classes = useStyles();
	const { t } = props;
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [showOTP, setOTP] = useState(false);

	useEffect(() => {
		ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
			if (value !== values.password) {
				return false;
			}
			return true;
		});
	});

	const [check, setCheck] = useState(false);
	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const handleCheck = (event) => {
		setCheck(event.target.checked);
		setOTP(!showOTP);
	};

	const handleSubmit = () => {
		console.log("data submited");
		if (values.name && values.mobile && values.password) {
			userActions
				.register(values.name, values.mobile, values.password)
				.then(function (response) {
					console.log("ressss", response);
					setOTP(!showOTP);
				})
				.catch(function (error) {
					console.error(error);
				});
		}
	};

	return (
		<AuthFrame
			title={t("common:register_title")}
			subtitle={t("common:register_subtitle")}
		>
			<div>
				{showOTP && <OtpDialog isOpen={showOTP} mobile="7054796555" />}
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
				<SocialAuth />
				<div className={classes.separator}>
					<Typography>{t("common:register_or")}</Typography>
				</div>
				<ValidatorForm
					onError={(errors) => console.log(errors)}
					onSubmit={handleSubmit}
				>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextValidator
								variant="filled"
								className={classes.input}
								label={t("common:register_name")}
								onChange={handleChange("name")}
								name="name"
								value={values.name}
								validators={["required"]}
								errorMessages={["This field is required"]}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextValidator
								variant="filled"
								className={classes.input}
								label={t("common:register_mobile")}
								onChange={handleChange("mobile")}
								name="mobile"
								value={values.mobile}
								validators={["required"]}
								errorMessages={[
									"This field is required",
									"Mobile is not valid",
								]}
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextValidator
								variant="filled"
								type="password"
								className={classes.input}
								label={t("common:register_password")}
								validators={["required"]}
								onChange={handleChange("password")}
								errorMessages={["This field is required"]}
								name="password"
								value={values.password}
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextValidator
								variant="filled"
								type="password"
								className={classes.input}
								label={t("common:register_confirm")}
								validators={["isPasswordMatch", "required"]}
								errorMessages={["Password mismatch", "this field is required"]}
								onChange={handleChange("confirmPassword")}
								name="confirm"
								value={values.confirmPassword}
							/>
						</Grid>
					</Grid>
					<div className={classes.btnArea}>
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
							label={
								<span>
									{t("common:form_terms")}
									&nbsp;
									<a href="#">{t("common:form_privacy")}</a>
								</span>
							}
						/>
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
		</AuthFrame>
	);
}

Register.propTypes = {
	t: PropTypes.func.isRequired,
};

export default withTranslation(["common"])(Register);
