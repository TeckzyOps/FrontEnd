import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Spinner from "../Spinner/spinner";
import { withTranslation } from "~/i18n";
import Alert from "./../alert/alert";
import EditIcon from "@material-ui/icons/Edit";
import PersonIcon from "@material-ui/icons/Person";
import Tooltip from "@material-ui/core/Tooltip";
import { profileActions } from "../../_actions/profile.action";
import LocalStorageService from "../../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as Yup from "yup";
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Divider,
	Avatar,
	Box,
	Grid,
	Dialog,
	MenuItem,
	Typography,
	Chip,
	Paper,
	Button,
	InputAdornment,
	IconButton,
} from "@material-ui/core";
import {
	fieldToTextField,
	TextField,
	CheckboxWithLabel,
	TextFieldProps,
	Select,
	Switch,
} from "formik-material-ui";
import { useAuth } from "../provider/Auth";
const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	chips: {
		display: "flex",
		flexWrap: "wrap",
	},

	chip: {
		margin: theme.spacing(0.5),
	},
	avatar: {
		marginLeft: "auto",
		height: 110,
		width: 100,
		flexShrink: 0,
		flexGrow: 0,
	},
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
}));

const dpcomponent = (props) => {
	const { className, ...rest } = props;
	const { postsetUserData } = useAuth();
	// const { loginDetails, user, updateUser } = useAuth();

	const classes = useStyles();
	const { t } = props;
	const [dp, setDP] = React.useState({
		file: null,
		imagePreviewUrl: null,
	});
	const [avatar, setAvatar] = React.useState("");
	const [opeDPDialog, setOpeDPDialog] = React.useState(false);
	React.useEffect(() => {
		console.log("dpcomponent", props);
		if (props.img) {
			setAvatar(props.img);
			setDP({ ...dp, ["imagePreviewUrl"]: props.img });
		}

		// if (loginDet) {
		// 	setUser({
		// 		name: details.login.name, //JSON.parse(LocalStorageService.getValue("userdata"))["name"],
		// 		city: "",
		// 		avatar: details.profile["image_path"] || "",
		// 		email: details.login.email, //JSON.parse(LocalStorageService.getValue("userdata"))["email"],
		// 		mobile: details.login.mobile, //JSON.parse(LocalStorageService.getValue("userdata"))["mobile"],
		// 	});
		// }
	}, []);
	const _handledpSubmit = ({ vals, setSubmitting, setFieldError }) => {
		let payload = new FormData();
		payload.append("image_path", vals["image_path"]);
		payload.append("login_id", props.userid.toString());
		payload.append("password", vals.password);

		if (payload) {
			profileActions
				.setUserProfileDetails(payload)
				.then(function (response) {
					setSubmitting(false);
					console.log("ressss", response);
					if (response.data.input_error) {
						console.log("input_error", response);
					} else if (!response.data.custom_error) {
						setOpeDPDialog(!opeDPDialog);
					}
					if (response.data.id) {
						postsetUserData(response);
					}
				})
				.catch(function (error) {
					setSubmitting(false);
					console.error("errrrr ", error);
				});
			console.log(payload);
		}
	};

	const showPreloadImage = () => {
		let comp = null;

		if (dp.imagePreviewUrl) {
			comp = <img src={dp.imagePreviewUrl} width="200px" alt="..." />;
		} else {
			comp = <PersonIcon color="primary" style={{ fontSize: 60 }} />;
		}
		return comp;
	};

	return (
		<div>
			<IconButton
				onClick={() => setOpeDPDialog(!opeDPDialog)}
				color="primary"
				component="span"
			>
				<Avatar
					key={avatar}
					className={classes.large}
					style={{
						width: "100px",
						height: "100px",
					}}
				>
					{showPreloadImage()}
				</Avatar>
			</IconButton>

			<Dialog
				maxWidth="md"
				open={opeDPDialog}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">
					{"Upload Profile Image?"}
				</DialogTitle>

				<Formik
					enableReinitialize
					initialValues={{ image_path: null, password: "" }}
					validationSchema={Yup.object().shape({
						password: Yup.string().required("Required"),
						image_path: Yup.mixed()
							.test(
								"fileSize",
								"File Size is too large",
								(value) => value.size <= 2000000
							)
							.test(
								"fileType",
								"Only [png,jpg,jpeg] File Formats Accepted",
								(value) =>
									["image/png", "image/jpg", "image/jpeg"].includes(value.type)
							)
							.required("Required"),
					})}
					onSubmit={(vals, { setSubmitting, setFieldError }) =>
						_handledpSubmit({
							vals,
							setSubmitting,
							setFieldError,
						})
					}
					render={(props) => {
						console.error(props.errors);
						const {
							values,
							touched,
							errors,
							handleBlur,
							handleSubmit,
							handleChange,
							isValid,
							isSubmitting,
						} = props;
						return (
							<Form>
								<DialogContent>
									<Grid container justify="center">
										<Grid item xs={12}>
											<Box margin={1}>
												<Field
													name="image_path"
													label=""
													className={
														"form-check-input " +
														(props.errors["profiledp"] &&
														props.touched["profiledp"]
															? " is-invalid"
															: "")
													}
												>
													{({ field, form, meta }) => (
														<div>
															<input
																style={{ display: "none" }}
																id={field.name}
																name={field.name}
																type="file"
																onChange={(event) => {
																	props.setFieldValue(
																		field.name,
																		event.currentTarget.files[0]
																	);
																	let reader = new FileReader();
																	let file = event.target.files[0];
																	if (file) {
																		reader.onloadend = () => {
																			setDP({
																				file: file,
																				imagePreviewUrl: reader.result,
																			});
																		};
																		reader.readAsDataURL(file);
																	}
																}}
															/>
															<label
																style={{
																	display: "flex",
																	justifyContent: "center",
																}}
																htmlFor={field.name}
															>
																<IconButton color="primary" component="span">
																	<Avatar
																		src={
																			props.values[field.name]
																				? dp.imagePreviewUrl
																				: avatar
																		}
																		className={classes.large}
																		style={{
																			width: "200px",
																			height: "200px",
																		}}
																	>
																		{!avatar && showPreloadImage()}
																	</Avatar>
																</IconButton>
															</label>
														</div>
													)}
												</Field>
												{props.errors.hasOwnProperty("profiledp") && (
													<div style={{ color: "red" }} component="div">
														{props.errors["profiledp"]}
													</div>
												)}
											</Box>
										</Grid>
										<Grid item md={12} xs={12}>
											<Box margin={1}>
												<Field
													fullWidth
													required
													type="password"
													component={TextField}
													label="Password"
													name="password"
													placeholder="Password"
												/>
											</Box>
										</Grid>
									</Grid>
								</DialogContent>
								<DialogActions>
									{!isSubmitting ? (
										<Button
											autoFocus
											onClick={() => {
												setDP({ file: null });
												showPreloadImage();
												setOpeDPDialog(!opeDPDialog);
											}}
											color="primary"
										>
											Cancel
										</Button>
									) : (
										t("common:cant_revert")
									)}
									<div className={classes.wrapper}>
										<Button
											disabled={isSubmitting}
											type="submit"
											color="primary"
											autoFocus
										>
											Upload
										</Button>
										{/* {isSubmitting && (
											<CircularProgress
												variant="static"
												className={classes.Progress}
											/>
										)} */}
									</div>
								</DialogActions>
							</Form>
						);
					}}
				/>
			</Dialog>
		</div>
	);
};

export default withTranslation(["common"])(dpcomponent);
