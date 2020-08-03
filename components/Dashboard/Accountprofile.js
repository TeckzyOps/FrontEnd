import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form, ErrorMessage } from "formik";
import clsx from "clsx";
import moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import { green } from "@material-ui/core/colors";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SimpleDialog from "../GenericPopup/GenericPopup";
import { profileActions } from "../../_actions/profile.action";
import Cookies from "js-cookie";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { useTheme } from "@material-ui/core/styles";
import * as Yup from "yup";

import LocalStorageService from "../../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();

import {
	Card,
	CardActions,
	CardContent,
	Avatar,
	Icon,
	IconButton,
	Box,
	Grid,
	Typography,
	CardMedia,
	CircularProgress,
	Divider,
	Button,
	LinearProgress,
} from "@material-ui/core";
import {
	createMuiTheme,
	responsiveFontSizes,
	MuiThemeProvider,
	makeStyles,
} from "@material-ui/core/styles";
import {
	fieldToTextField,
	TextField,
	CheckboxWithLabel,
	TextFieldProps,
	Select,
	Switch,
} from "formik-material-ui";
import { useTextAlign } from "~/theme/common";
import { mpinForm } from "~/static/FormData/mpinForm";
import { useAuth } from "../provider/Auth";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

import Link from "next/link";

const useStyles = makeStyles((theme) => ({
	root: {},
	details: {
		display: "flex",
	},
	wrapper: {
		margin: theme.spacing(1),
		position: "relative",
	},
	Progress: {
		color: green[500],
		position: "absolute",
		top: "50%",
		left: "50%",
		marginTop: -12,
		marginLeft: -12,
	},
	avatar: {
		marginLeft: "auto",
		height: 110,
		width: 100,
		flexShrink: 0,
		flexGrow: 0,
	},

	progress: {
		marginTop: theme.spacing(2),
	},
	uploadButton: {
		marginRight: theme.spacing(2),
	},
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
}));

const AccountProfile = (props) => {
	const { className, ...rest } = props;
	const [loginDetails, updateloginDetails] = React.useState({});
	const [dp, setDP] = React.useState({
		file: null,
		imagePreviewUrl: null,
	});
	const [openmpin, setmpinOpen] = React.useState(false);
	const [uploadProgress, updateUploadProgress] = React.useState(0);
	const [loading, setLoading] = React.useState(false);
	const [opeDPDialog, setOpeDPDialog] = React.useState(false);
	const [editDetails, seteditDetails] = React.useState({
		email: false,
		mobile: false,
	});

	const [user, setUser] = React.useState({
		name: "",
		city: "",
		avatar: "",
		email: "",
		mobile: "",
	});
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

	React.useEffect(() => {
		const token = Cookies.get("token");
		const loginDet = Cookies.getJSON("loginDetails");
		if (localStorageService.getValue("loginDetails")) {
			updateloginDetails(
				JSON.parse(LocalStorageService.getValue("loginDetails"))
			);
		}
		if (loginDet) {
			setUser({
				name: loginDet.name, //JSON.parse(LocalStorageService.getValue("userdata"))["name"],
				city: "Goarkhpur",
				avatar: "/images/avatars/avatar_11.png",
				email: loginDet.email, //JSON.parse(LocalStorageService.getValue("userdata"))["email"],
				mobile: loginDet.mobile, //JSON.parse(LocalStorageService.getValue("userdata"))["mobile"],
			});
		}
	}, []);

	const classes = useStyles();
	const handlempinOpen = () => {
		setmpinOpen(true);
	};
	const _handledpSubmit = ({ vals, setSubmitting, setFieldError }) => {
		let payload = new FormData();
		payload.append("image_path", vals["image_path"]);
		payload.append("login_id", loginDetails["id"].toString());
		payload.append("password", vals.password);

		if (loginDetails && loginDetails.mpin) {
			payload.append("mpin", vals.password);
			delete payload["password"];
		}
		if (payload) {
			profileActions
				.setUserProfileDetails(payload, (ev) => {
					const progress = (ev.loaded / ev.total) * 100;
					updateUploadProgress(Math.round(progress));
				})
				.then(function (response) {
					setSubmitting(false);
					console.log("ressss", response);
					if (response.data.input_error) {
						Object.keys(response.data.input_error).forEach((k) => {
							setFieldError(k, result[k][0]);
						});
					} else if (!response.data.custom_error) {
						setOpeDPDialog(!opeDPDialog);
					}
				})
				.catch(function (error) {
					setSubmitting(false);
					console.error("errrrr ", error);
				});
			console.log(payload);
		}
	};
	const handlempinsubmit = (values, setError, setFieldError) => {
		if (values.mpin && values.password) {
			profileActions
				.changeMPIN(values.mpin, values.password)
				.then(function (response) {
					console.log("ressss", response);
					if (response.data.input_error) {
						setFieldError(response.data.input_error);
					} else {
						setmpinOpen(false);
					}
				})
				.catch(function (error) {
					console.error("errrrr ", error);
				});
		}
	};
	const handlempinClose = () => {
		setmpinOpen(false);
	};

	const showPreloadImage = () => {
		let comp = null;

		if (dp.file) {
			comp = <img src={dp.imagePreviewUrl} width="200px" alt="..." />;
		} else {
			comp = <AddPhotoAlternateIcon color="primary" style={{ fontSize: 60 }} />;
		}
		return comp;
	};

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			{openmpin && (
				<SimpleDialog
					onClose={handlempinClose}
					title="Change/Update M-PIN"
					open={openmpin}
					formElements={mpinForm}
					handleSubmit={handlempinsubmit}
				/>
			)}

			<div>
				<CardContent>
					<div className={classes.details}>
						<div>
							<Typography gutterBottom variant="h6">
								{user.name}
							</Typography>
							<Typography
								className={classes.locationText}
								color="textSecondary"
								variant="body1"
							>
								{user.city}
							</Typography>
							<Typography
								className={classes.locationText}
								color="textPrimary"
								variant="body1"
							>
								{user.mobile} {editDetails.mobile && <EditIcon />}
							</Typography>
							<Typography
								className={classes.locationText}
								color="textPrimary"
								variant="body1"
							>
								{user.email} {editDetails.email && <EditIcon />}
							</Typography>
							{/* <Typography
								className={classes.dateText}
								color="textSecondary"
								variant="body1"
							>
								{moment().format("hh:mm A")} ({user.timezone})
							</Typography> */}
						</div>

						<div className={classes.avatar}>
							<IconButton
								onClick={() => setOpeDPDialog(!opeDPDialog)}
								color="primary"
								component="span"
							>
								<Avatar
									className={classes.large}
									style={{
										width: "100px",
										height: "100px",
									}}
								>
									{showPreloadImage()}
								</Avatar>
							</IconButton>
						</div>
					</div>
					<div className={classes.progress}>
						<Typography variant="body1">Profile Completeness: 70%</Typography>
						<LinearProgress value={70} variant="determinate" />
					</div>
				</CardContent>
				<Divider />
				<CardActions>
					<Button
						className={classes.uploadButton}
						color="primary"
						variant="text"
					>
						<MuiThemeProvider theme={theme}>
							<Typography variant="button">Upload Picture</Typography>
						</MuiThemeProvider>
					</Button>
					<Button onClick={handlempinOpen} variant="text">
						<MuiThemeProvider theme={theme}>
							<Typography variant="button">Generate MPIN</Typography>
						</MuiThemeProvider>
					</Button>
					<Link href="changepassword">
						<Button variant="text">
							<MuiThemeProvider theme={theme}>
								<Typography variant="button">Change Password</Typography>
							</MuiThemeProvider>
						</Button>
					</Link>
				</CardActions>
			</div>
			<Dialog open={opeDPDialog} aria-labelledby="responsive-dialog-title">
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
															<label htmlFor={field.name}>
																<IconButton color="primary" component="span">
																	<Avatar
																		className={classes.large}
																		style={{
																			width: "100%",
																			height: "100%",
																		}}
																	>
																		{showPreloadImage()}
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
													label={
														loginDetails && loginDetails.mpin
															? "M-PIN"
															: "Password"
													}
													name="password"
													placeholder={
														loginDetails && loginDetails.mpin
															? "Enter M-PIN"
															: "Enter Password"
													}
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
										"You Can't go back, Now!"
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
										{isSubmitting && (
											<CircularProgress
												variant="static"
												className={classes.Progress}
											/>
										)}
									</div>
								</DialogActions>
							</Form>
						);
					}}
				/>
			</Dialog>
		</Card>
	);
};

AccountProfile.propTypes = {
	className: PropTypes.string,
};

export default AccountProfile;
