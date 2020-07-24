import React, { Component } from "react";
import FormWrapper from "./../../Forms/FormContainer";
import { changePassword } from "./../../../static/FormData/changePassword";
import { Formik, Field } from "formik";
import { object, ref, string } from "yup";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Card } from "@material-ui/core";

import Spinner from "../../Spinner/spinner";
import Alert from "../../alert/alert";
import { TextField } from "formik-material-ui";
import { userActions } from "../../../_actions/user.actions";

const useStyles = (theme) => {
	return {
		root: {
			minWidth: 275,
			marginTop: 20,
		},
		bullet: {
			display: "inline-block",
			margin: "0 2px",
			transform: "scale(0.8)",
		},
		title: {
			fontSize: 14,
		},
		pos: {
			marginBottom: 12,
		},
		flex: {
			display: "flex",
		},

		form: {
			margin: 14,
		},
	};
};

class FormPasswordReset extends Component {
	classes;

	state = {
		passChangeSuccess: false,
	};

	_handleModalClose = () => {
		this.setState(() => ({
			passChangeSuccess: false,
		}));
	};

	_renderModal = () => {
		const onClick = () => {
			this.setState(() => ({ passChangeSuccess: false }));
		};

		console.log(this._handleClose);
		return (
			<Alert
				isOpen={this.state.passChangeSuccess}
				handleSubmit={onClick}
				title="Password Reset"
				text="Your password was changed successfully"
				submitButtonText="Done"
			/>
		);
	};

	_handleSubmit = (formdata, data) => {
		userActions
			.changePassword(formdata)
			.then(() => {
				console.log("Success");
				this.setState(() => ({
					passChangeSuccess: true,
				}));
				data(false);
			})
			.catch(() => {
				console.log("failssxs");
				data(false);
			});
	};

	btn = {
		label: "Reset Password",
	};

	render() {
		return (
			<Card className={this.props.classes.root} elevation={10}>
				<FormWrapper
					elements={changePassword}
					btn={this.btn}
					onSubmit={this._handleSubmit}
				/>
			</Card>
		);

		// <Formik
		// 	initialValues={{
		// 		currentPass: "",
		// 		newPass: "",
		// 		confirmPass: "",
		// 	}}
		// 	validationSchema={object().shape({
		// 		currentPass: string().required("Current password is required"),
		// 		newPass: string().required("New password is required"),
		// 		confirmPass: string()
		// 			.oneOf([ref("newPass")], "Passwords do not match")
		// 			.required("Password is required"),
		// 	})}
		// 	onSubmit={(
		// 		{ currentPass, newPass, confirmPass },
		// 		{ setSubmitting, resetForm }
		// 	) =>
		// 		this._handleSubmit({
		// 			currentPass,
		// 			newPass,
		// 			confirmPass,
		// 			setSubmitting,
		// 			resetForm,
		// 		})
		// 	}
		// 	render={(props) => {
		// 		const {
		// 			values,
		// 			touched,
		// 			errors,
		// 			handleChange,
		// 			handleBlur,
		// 			handleSubmit,
		// 			isValid,
		// 			isSubmitting,
		// 		} = props;
		// 		return isSubmitting ? (
		// 			<Spinner />
		// 		) : (
		// 			<Paper className={this.props.classes.root} elevation={10}>
		// 				<form className={this.props.classes.form} onSubmit={handleSubmit}>
		// 					<FormControl fullWidth margin="dense">
		// 						<InputLabel
		// 							htmlFor="password-current"
		// 							error={Boolean(touched.currentPass && errors.currentPass)}
		// 						>
		// 							{"Current Password"}
		// 						</InputLabel>
		// 						<Input
		// 							variant="outlined"
		// 							id="password-current"
		// 							name="currentPass"
		// 							type="password"
		// 							value={values.currentPass}
		// 							onChange={handleChange}
		// 							onBlur={handleBlur}
		// 							error={Boolean(touched.currentPass && errors.currentPass)}
		// 						/>
		// 						<FormHelperText
		// 							error={Boolean(touched.currentPass && errors.currentPass)}
		// 						>
		// 							{touched.currentPass && errors.currentPass
		// 								? errors.currentPass
		// 								: ""}
		// 						</FormHelperText>
		// 					</FormControl>
		// 					<FormControl
		// 						fullWidth
		// 						margin="dense"
		// 						error={Boolean(touched.newPass && errors.newPass)}
		// 					>
		// 						<InputLabel
		// 							htmlFor="password-new"
		// 							error={Boolean(touched.newPass && errors.newPass)}
		// 						>
		// 							{"New Password"}
		// 						</InputLabel>
		// 						<Input
		// 							id="password-new"
		// 							name="newPass"
		// 							type="password"
		// 							value={values.newPass}
		// 							onChange={handleChange}
		// 							onBlur={handleBlur}
		// 							error={Boolean(touched.newPass && errors.newPass)}
		// 						/>
		// 						<FormHelperText
		// 							error={Boolean(touched.newPass && errors.newPass)}
		// 						>
		// 							{touched.newPass && errors.newPass ? errors.newPass : ""}
		// 						</FormHelperText>
		// 					</FormControl>
		// 					<FormControl
		// 						fullWidth
		// 						margin="dense"
		// 						error={Boolean(touched.confirmPass && errors.confirmPass)}
		// 					>
		// 						<InputLabel
		// 							htmlFor="password-confirm"
		// 							error={Boolean(touched.confirmPass && errors.confirmPass)}
		// 						>
		// 							{"Confirm Password"}
		// 						</InputLabel>
		// 						<Input
		// 							id="password-confirm"
		// 							name="confirmPass"
		// 							type="password"
		// 							value={values.confirmPass}
		// 							onChange={handleChange}
		// 							onBlur={handleBlur}
		// 							error={Boolean(touched.confirmPass && errors.confirmPass)}
		// 						/>
		// 						<FormHelperText
		// 							error={Boolean(touched.confirmPass && errors.confirmPass)}
		// 						>
		// 							{touched.confirmPass && errors.confirmPass
		// 								? errors.confirmPass
		// 								: ""}
		// 						</FormHelperText>
		// 					</FormControl>
		// 					<Grid justify="center" className={this.props.classes.flex}>
		// 						<Button
		// 							type="submit"
		// 							variant="outlined"
		// 							color="primary"
		// 							disabled={Boolean(!isValid || isSubmitting)}
		// 							style={{ margin: "16px" }}
		// 						>
		// 							{"Reset Password"}
		// 						</Button>
		// 					</Grid>
		// 				</form>
		// 				{this._renderModal()}
		// 			</Paper>
		// 		);
		// 	}}
		// />
	}
}

export default withStyles(useStyles)(FormPasswordReset);
