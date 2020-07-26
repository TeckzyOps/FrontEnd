import React, { Component } from "react";
import FormWrapper from "./../../Forms/FormContainer";
import { changePassword } from "./../../../static/FormData/changePassword";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Card } from "@material-ui/core";
import Alert from "../../alert/alert";
import { userActions } from "../../../_actions/user.actions";

const useStyles = (theme) => {
	return {
		root: {
			minWidth: 275,
			marginTop: 20,
			padding: 16,
		},
		[theme.breakpoints.down("sm")]: {
			root: {
				minWidth: 275,
				marginTop: 20,
				padding: 16,
				margin: "1rem 2rem",
			},
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
	}
}

export default withStyles(useStyles)(FormPasswordReset);
