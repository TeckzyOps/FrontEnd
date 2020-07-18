import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Formik } from "formik";
import Spinner from "../Spinner/spinner";
import Alert from "./../alert/alert";
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Divider,
	Grid,
	Button,
	TextField,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
	root: {},
}));

const AccountDetails = (props) => {
	const { className, ...rest } = props;

	const classes = useStyles();

	const [values, setValues] = useState({
		firstName: "Shen",
		lastName: "Zhi",
		email: "shen.zhi@devias.io",
		phone: "",
		state: "Alabama",
		country: "USA",
	});
	const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);

	const _handleModalClose = () => {
		setProfileUpdateSuccess(() => true);
	};

	const _renderModal = () => {
		const onClick = () => {
			setProfileUpdateSuccess(() => false);
		};
		console.log(profileUpdateSuccess);

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
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	const _handleSubmit = ({
		firstName,
		lastName,
		email,
		phone,
		state,
		country,
		setSubmitting,
		resetForm,
	}) => {
		console.log("Submitted");
		setProfileUpdateSuccess(() => true);
		resetForm();
	};

	const states = [
		{
			value: "alabama",
			label: "Alabama",
		},
		{
			value: "new-york",
			label: "New York",
		},
		{
			value: "san-francisco",
			label: "San Francisco",
		},
	];

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<Formik
				initialValues={values}
				onSubmit={(
					{ firstName, lastName, email, phone, state, country },
					{ setSubmitting, resetForm }
				) =>
					_handleSubmit({
						firstName,
						lastName,
						email,
						phone,
						state,
						country,
						setSubmitting,
						resetForm,
					})
				}
				render={(props) => {
					console.log(props);
					const {
						values,
						touched,
						errors,
						handleChange,
						handleBlur,
						handleSubmit,
						isValid,
						isSubmitting,
					} = props;
					return isSubmitting ? (
						<Spinner />
					) : (
						<form autoComplete="off" noValidate onSubmit={handleSubmit}>
							<CardHeader
								subheader="The information can be edited"
								title="Profile"
							/>
							<Divider />
							<CardContent>
								<Grid container spacing={3}>
									<Grid item>
										<TextField
											fullWidth
											helperText="Please specify the first name"
											label="First name"
											margin="dense"
											name="firstName"
											onChange={handleChange}
											required
											value={values.firstName}
											variant="standard"
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Last name"
											margin="dense"
											name="lastName"
											onChange={handleChange}
											required
											value={values.lastName}
											variant="standard"
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Email Address"
											margin="dense"
											name="email"
											onChange={handleChange}
											required
											value={values.email}
											variant="standard"
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Phone Number"
											margin="dense"
											name="phone"
											onChange={handleChange}
											type="number"
											value={values.phone}
											variant="standard"
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Select State"
											margin="dense"
											name="state"
											onChange={handleChange}
											required
											select
											// eslint-disable-next-line react/jsx-sort-props
											SelectProps={{ native: true }}
											value={values.state}
											variant="standard"
										>
											{states.map((option) => (
												<option key={option.value} value={option.value}>
													{option.label}
												</option>
											))}
										</TextField>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Country"
											margin="dense"
											name="country"
											onChange={handleChange}
											required
											value={values.country}
											variant="standard"
										/>
									</Grid>
								</Grid>
							</CardContent>
							<Divider />
							<CardActions>
								<Button type="submit" color="primary" variant="outlined">
									Save details
								</Button>
							</CardActions>
						</form>
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

export default AccountDetails;
