import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "~/i18n";
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
import Cookies from "js-cookie";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { useTheme } from "@material-ui/core/styles";
import * as Yup from "yup";
import { matrimonyActions } from "../../_actions/matrimony.action";
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

const MatrimonyImageUpload = (props) => {
	const { t, className, ...rest } = props;
	const [dp, setDP] = React.useState({
		file1: null,
		imagePreviewUrl1: null,
		file2: null,
		imagePreviewUrl2: null,
		file3: null,
		imagePreviewUrl3: null,
		file4: null,
		imagePreviewUrl4: null,
		file5: null,
		imagePreviewUrl5: null,
		file6: null,
		imagePreviewUrl6: null,
	});
	const [avatar, setAvatar] = React.useState("");
	const [uploadProgress, updateUploadProgress] = React.useState(0);
	const [loading, setLoading] = React.useState(false);

	const [profile, setProfile] = React.useState({});
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

	React.useEffect(() => {
		console.log(dp);
	}, [dp]);

	const classes = useStyles();

	const _handledpSubmit = ({ vals, setSubmitting, setFieldError }) => {
		let payload = new FormData();
		let pics = [];

		for (var i in vals) {
			if (vals[i]) {
				pics.push(vals[i]);
			}
		}
		payload.append("pictures", pics);
		payload.append("metrimony_id", 1);
		if (payload) {
			matrimonyActions
				.uploadMatrimonyImage(payload, (ev) => {
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
					}
				})
				.catch(function (error) {
					setSubmitting(false);
					console.error("errrrr ", error);
				});
			console.log(payload);
		}
	};

	const showPreloadImage = (index) => {
		let comp = null;

		if (dp["file" + index]) {
			comp = (
				<img src={dp["imagePreviewUrl" + index]} width="200px" alt="..." />
			);
		} else {
			comp = <AddPhotoAlternateIcon color="primary" style={{ fontSize: 60 }} />;
		}
		return comp;
	};

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<div>
				<CardContent>
					<Formik
						enableReinitialize
						initialValues={{ image_path: null }}
						validationSchema={Yup.object().shape({
							image_1: Yup.mixed()
								.test(
									"fileSize",
									"File Size is too large",
									(value) => value.size <= 2000000
								)
								.test(
									"fileType",
									"Only [png,jpg,jpeg] File Formats Accepted",
									(value) =>
										["image/png", "image/jpg", "image/jpeg"].includes(
											value.type
										)
								)
								.required("Required"),
							image_2: Yup.mixed()
								.test("fileSize", "File Size is too large", (value) => {
									if (!value) {
										return true;
									} else {
										return value.size <= 2000000;
									}
								})
								.test(
									"fileType",
									"Only [png,jpg,jpeg] File Formats Accepted",
									(value) => {
										if (!value) {
											return true;
										} else {
											return ["image/png", "image/jpg", "image/jpeg"].includes(
												value.type
											);
										}
									}
								),
							image_3: Yup.mixed()
								.test("fileSize", "File Size is too large", (value) => {
									if (!value) {
										return true;
									} else {
										return value.size <= 2000000;
									}
								})
								.test(
									"fileType",
									"Only [png,jpg,jpeg] File Formats Accepted",
									(value) => {
										if (!value) {
											return true;
										} else {
											return ["image/png", "image/jpg", "image/jpeg"].includes(
												value.type
											);
										}
									}
								),
							image_4: Yup.mixed()
								.test("fileSize", "File Size is too large", (value) => {
									if (!value) {
										return true;
									} else {
										return value.size <= 2000000;
									}
								})
								.test(
									"fileType",
									"Only [png,jpg,jpeg] File Formats Accepted",
									(value) => {
										if (!value) {
											return true;
										} else {
											return ["image/png", "image/jpg", "image/jpeg"].includes(
												value.type
											);
										}
									}
								),
							image_5: Yup.mixed()
								.test("fileSize", "File Size is too large", (value) => {
									if (!value) {
										return true;
									} else {
										return value.size <= 2000000;
									}
								})
								.test(
									"fileType",
									"Only [png,jpg,jpeg] File Formats Accepted",
									(value) => {
										if (!value) {
											return true;
										} else {
											return ["image/png", "image/jpg", "image/jpeg"].includes(
												value.type
											);
										}
									}
								),
							image_6: Yup.mixed()
								.test("fileSize", "File Size is too large", (value) => {
									if (!value) {
										return true;
									} else {
										return value.size <= 2000000;
									}
								})
								.test(
									"fileType",
									"Only [png,jpg,jpeg] File Formats Accepted",
									(value) => {
										if (!value) {
											return true;
										} else {
											return ["image/png", "image/jpg", "image/jpeg"].includes(
												value.type
											);
										}
									}
								),
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
											{[
												"image_1",
												"image_2",
												"image_3",
												"image_4",
												"image_5",
												"image_6",
											].map((name, index) => (
												<Grid item md={4} xs={12}>
													<Box margin={1}>
														<Field
															name={name}
															label=""
															className={
																"form-check-input " +
																(props.errors[name] && props.touched[name]
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
																						...dp,
																						["file" + (index + 1)]: file,
																						["imagePreviewUrl" +
																						(index + 1)]: reader.result,
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
																		<IconButton
																			color="primary"
																			component="span"
																		>
																			<Avatar
																				variant="square"
																				className={classes.large}
																				style={{
																					width: "250px",
																					height: "250px",
																				}}
																			>
																				{showPreloadImage(index + 1)}
																			</Avatar>
																		</IconButton>
																	</label>
																</div>
															)}
														</Field>
														{props.errors.hasOwnProperty(name) && (
															<div style={{ color: "red" }} component="div">
																{props.errors[name]}
															</div>
														)}
													</Box>
												</Grid>
											))}
											{/* <Grid item md={4} xs={12}>
												<Box margin={1}>
													<Field
														name="image_1"
														label=""
														className={
															"form-check-input " +
															(props.errors["image_1"] &&
															props.touched["image_1"]
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
																					...dp,
																					["file1"]: file,
																					["imagePreviewUrl1"]: reader.result,
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
																			className={classes.large}
																			style={{
																				width: "100%",
																				height: "100%",
																			}}
																		>
																			{!avatar && showPreloadImage(1)}
																		</Avatar>
																	</IconButton>
																</label>
															</div>
														)}
													</Field>
													{props.errors.hasOwnProperty("image_1") && (
														<div style={{ color: "red" }} component="div">
															{props.errors["image_1"]}
														</div>
													)}
												</Box>
											</Grid>

											<Grid item md={4} xs={12}>
												<Box margin={1}>
													<Field
														name="image_2"
														label=""
														className={
															"form-check-input " +
															(props.errors["image_2"] &&
															props.touched["image_2"]
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
																					...dp,
																					["file2"]: file,
																					["imagePreviewUrl2"]: reader.result,
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
																			className={classes.large}
																			style={{
																				width: "100%",
																				height: "100%",
																			}}
																		>
																			{!avatar && showPreloadImage(2)}
																		</Avatar>
																	</IconButton>
																</label>
															</div>
														)}
													</Field>
													{props.errors.hasOwnProperty("image_2") && (
														<div style={{ color: "red" }} component="div">
															{props.errors["image_2"]}
														</div>
													)}
												</Box>
											</Grid>
											<Grid item md={4} xs={12}>
												<Box margin={1}>
													<Field
														name="image_3"
														label=""
														className={
															"form-check-input " +
															(props.errors["image_3"] &&
															props.touched["image_3"]
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
																					...dp,
																					["file3"]: file,
																					["imagePreviewUrl3"]: reader.result,
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
																		variant="square"
																			className={classes.large}
																			style={{
																				width: "100%",
																				height: "100%",
																			}}
																		>
																			{!avatar && showPreloadImage(3)}
																		</Avatar>
																	</IconButton>
																</label>
															</div>
														)}
													</Field>
													{props.errors.hasOwnProperty("image_3") && (
														<div style={{ color: "red" }} component="div">
															{props.errors["image_3"]}
														</div>
													)}
												</Box>
											</Grid>
											<Grid item md={4} xs={12}>
												<Box margin={1}>
													<Field
														name="image_4"
														label=""
														className={
															"form-check-input " +
															(props.errors["image_4"] &&
															props.touched["image_4"]
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
																					...dp,
																					["file4"]: file,
																					["imagePreviewUrl4"]: reader.result,
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
																		variant="square"
																			className={classes.large}
																			style={{
																				width: "100%",
																				height: "100%",
																			}}
																		>
																			{!avatar && showPreloadImage(4)}
																		</Avatar>
																	</IconButton>
																</label>
															</div>
														)}
													</Field>
													{props.errors.hasOwnProperty("image_4") && (
														<div style={{ color: "red" }} component="div">
															{props.errors["image_4"]}
														</div>
													)}
												</Box>
											</Grid>
											<Grid item md={4} xs={12}>
												<Box margin={1}>
													<Field
														name="image_5"
														label=""
														className={
															"form-check-input " +
															(props.errors["image_5"] &&
															props.touched["image_5"]
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
																					...dp,
																					["file5"]: file,
																					["imagePreviewUrl5"]: reader.result,
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
																		variant="square"
																			className={classes.large}
																			style={{
																				width: "100%",
																				height: "100%",
																			}}
																		>
																			{!avatar && showPreloadImage(5)}
																		</Avatar>
																	</IconButton>
																</label>
															</div>
														)}
													</Field>
													{props.errors.hasOwnProperty("image_5") && (
														<div style={{ color: "red" }} component="div">
															{props.errors["image_5"]}
														</div>
													)}
												</Box>
											</Grid>
											<Grid item md={4} xs={12}>
												<Box margin={1}>
													<Field
														name="image_6"
														label=""
														className={
															"form-check-input " +
															(props.errors["image_6"] &&
															props.touched["image_6"]
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
																					...dp,
																					["file6"]: file,
																					["imagePreviewUrl6"]: reader.result,
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
																			className={classes.large}
																			style={{
																				width: "100%",
																				height: "100%",
																			}}
																		>
																			{!avatar && showPreloadImage(6)}
																		</Avatar>
																	</IconButton>
																</label>
															</div>
														)}
													</Field>
													{props.errors.hasOwnProperty("image_6") && (
														<div style={{ color: "red" }} component="div">
															{props.errors["image_6"]}
														</div>
													)}
												</Box>
											</Grid> */}
										</Grid>
									</DialogContent>
									<DialogActions>
										{isSubmitting && t("common:cant_revert")}
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
				</CardContent>
				<Divider />
				<CardActions>
					{/* <Button
						className={classes.uploadButton}
						color="primary"
						variant="text"
					>
						<MuiThemeProvider theme={theme}>
							<Typography variant="button">Upload Picture</Typography>
						</MuiThemeProvider>
					</Button> */}
				</CardActions>
			</div>
		</Card>
	);
};

MatrimonyImageUpload.propTypes = {
	className: PropTypes.string,
};

export default withTranslation(["common"])(MatrimonyImageUpload);
