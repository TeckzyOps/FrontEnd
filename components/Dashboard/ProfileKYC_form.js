import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Spinner from "../Spinner/spinner";
import { withTranslation } from "~/i18n";
import Alert from "./../alert/alert";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Tooltip from "@material-ui/core/Tooltip";
import { profileActions } from "../../_actions/profile.action";
import LocalStorageService from "../../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import {
	gender,
	education,
	occupation,
	idType,
	religion,
	experience,
	interest,
	languages,
} from "~static/text/profiledata";
import { state } from "~static/text/state";
import { cities } from "~static/text/city";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import { useAuth } from "../provider/Auth";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {
	fieldToTextField,
	TextField,
	CheckboxWithLabel,
	TextFieldProps,
	Select,
	Switch,
} from "formik-material-ui";

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
import MuiTextField from "@material-ui/core/TextField";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
	root: {
		margin: 0,
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

const ProfileForm = (props) => {
	const { className, ...rest } = props;
	// const { loginDetails, user, updateUser } = useAuth();

	const classes = useStyles();
	const { t } = props;
	const [dp, setDP] = React.useState({
		file: null,
		imagePreviewUrl: null,
	});
	const [avatar, setAvatar] = React.useState("");
	const [opeDPDialog, setOpeDPDialog] = React.useState(false);

	const [details, setDetails] = useState({});
	const [loginData, setloginData] = React.useState({});
	const [states, setStates] = useState([]);
	const [district, setDistrict] = useState([]);
	const [city, setCity] = useState([]);
	const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);
	const profileSchema = Yup.object().shape({
		state: Yup.string().required("Required"),
		gender: Yup.string().required("Required"),
		dob: Yup.string().required("Required"),
		religion: Yup.string().required("Required"),
		mother_tongue: Yup.string().required("Required"),
		language_speak: Yup.string().required("Required"),
		district: Yup.string().required("Required"),
		city: Yup.string().required("Required"),
		password: Yup.string().required("Required"),
		id_proof_type: Yup.string(),
		id_proof_number: Yup.string(),
		id_proof_path: Yup.mixed()
			.test("fileSize", "File Size is too large", (value) => {
				if (value) {
					return value.size <= 2000000;
				} else {
					return true;
				}
			})
			.test(
				"fileType",
				"Unsupported File Format, Upload a PDF file",
				(value) => {
					if (value) {
						return ["application/pdf"].includes(value.type);
					} else {
						return true;
					}
				}
			),
	});

	React.useEffect(() => {
		// console.error(Object.keys(state));
		setStates(Object.keys(state));
		setDetails(localStorageService.getUserDetails("Details"));
	}, []);

	const _handleModalClose = () => {
		setProfileUpdateSuccess(() => true);
	};

	const _renderModal = () => {
		const onClick = () => {
			setProfileUpdateSuccess(() => false);
		};

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

	const initVals = {
		password: "",
	};
	const _handledpSubmit = ({ vals, setSubmitting, setFieldError }) => {
		let payload = new FormData();
		payload.append("image_path", vals["image_path"]);
		payload.append("login_id", details.login["id"].toString());
		payload.append("password", vals.password);

		if (details.login && details.login.mpin) {
			payload.append("mpin", vals.password);
			payload.delete("password");
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
					if (response.data.id) {
						setDetails({
							...details,
							["profile"]: {
								...details.profile,
								["image_path"]: response.data.image_path,
							},
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
	const _handleSubmit = ({ vals, setSubmitting, setFieldError }) => {
		let payload = new FormData();
		vals["id_proof_path"] &&
			payload.append("id_proof_path", vals["id_proof_path"]);

		for (var i in vals) {
			if (
				!details.profile.data.hasOwnProperty(i) ||
				vals[i] !== details.profile.data[i]
			) {
				if (i != "id_proof_path") {
					if (Array.isArray(vals[i])) {
						if (vals[i].length > 0) {
							payload.append(i, JSON.stringify(vals[i]));
						}
					} else {
						payload.append(i, vals[i]);
					}
				}
			}
		}
		payload.append("login_id", details.login["id"]);
		if (details.login && details.login.mpin) {
			payload.append("mpin", vals.password);
			payload.delete("password");
		}
		if (payload) {
			setSubmitting(false);
			profileActions
				.setUserProfileDetails(payload)
				.then(function (response) {
					console.log("ressss", response);
					if (response.data.input_error) {
						Object.keys(response.data.input_error).forEach((k) => {
							setFieldError(k, result[k][0]);
						});
					}

					if (response.data.id) {
						setDetails({ ...details, ["profile"]: response.data });
						let det = localStorageService.getUserDetails("Details");
						det["profile"] = response.data;
						Cookies.set("Details", JSON.stringify(det));
						localStorageService.setValue("Details", JSON.stringify(det));
					}
				})
				.catch(function (error) {
					console.error("errrrr ", error);
					if (error.response.data.input_error) {
						Object.keys(error.response.data.input_error).forEach((k) => {
							setFieldError(k, result[k][0]);
						});
					}
				});
		}
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
	function CustomTextField(props) {
		const {
			form: { setFieldValue },
			field: { name },
		} = props;
		const onChange = React.useCallback(
			(event) => {
				const { value } = event.target;
				setFieldValue(name, value ? value : "");
				handleChange(event);
			},
			[setFieldValue, name]
		);
		return <MuiTextField {...fieldToTextField(props)} onChange={onChange} />;
	}

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			{/* <Button type="submit" color="primary" variant="outlined">
				Go To Account Details
			</Button> */}
			<Formik
				enableReinitialize
				initialValues={initVals}
				validationSchema={profileSchema}
				// onSubmit={(vals, { setSubmitting, resetForm, setFieldError }) =>
				// 	_handleSubmit({
				// 		vals,
				// 		setSubmitting,
				// 		resetForm,
				// 		setFieldError,
				// 	})
				// }
			>
				{(props) => {
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
						<div>
							<CardHeader
								subheader="The information can be edited"
								title="Only Use In Member KYC"
							/>
							<Divider />
							<CardContent>
								<Form autocomplete="off">
									<Accordion>
										<AccordionSummary
											expandIcon={<ExpandMoreIcon />}
											aria-controls="panel1c-content"
											id="panel1c-header"
										>
											<Typography className={classes.heading}>
												Click To Expand This Section
											</Typography>
										</AccordionSummary>
										<AccordionDetails>
											<Grid container spacing={3}>
												<Grid container justify="center" xs={12}>
													<Typography variant="h5" component="h5">
														KYC Document of Member
													</Typography>
												</Grid>
												<Grid item md={6} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															type="text"
															component={TextField}
															name="id_proof_type"
															label="Select Document"
															select
															onChange={handleChange}
															variant="outlined"
															helperText={
																props.errors.hasOwnProperty("id_proof_type") &&
																props.errors["id_proof_type"]
															}
															margin="dense"
														>
															{idType.map((option, index) => (
																<MenuItem key={index} value={option}>
																	{option}
																</MenuItem>
															))}
														</Field>
													</Box>
												</Grid>
												<Grid
													item
													md={6}
													container
													alignItems="flex-end"
													xs={12}
												>
													<Grid item md={6} xs={12}>
														<Box margin={1}>
															<Field
																fullWidth
																type="text"
																component={TextField}
																name="id_proof_number"
																label="Last 4-Digit of KYC Document"
																onChange={handleChange}
																variant="outlined"
																margin="dense"
															/>
														</Box>
													</Grid>
													<Grid item md={6} xs={12}>
														<Box margin={1}>
															<Field
																margin="dense"
																name="id_proof_path"
																label="Upload Document"
																className={
																	"form-check-input " +
																	(props.errors["id_proof_path"] &&
																	props.touched["id_proof_path"]
																		? " is-invalid"
																		: "")
																}
															>
																{({ field, form, meta }) => (
																	<div>
																		<input
																			id={field.name}
																			style={{ display: "none" }}
																			name={field.name}
																			type="file"
																			onChange={(event) => {
																				props.setFieldValue(
																					field.name,
																					event.currentTarget.files[0]
																				);
																			}}
																		/>
																		<label htmlFor={field.name}>
																			<Button
																				variant="contained"
																				color="primary"
																				component="span"
																			>
																				Upload
																			</Button>
																			{field.value && field.value.name}
																		</label>
																	</div>
																)}
															</Field>
															{props.errors.hasOwnProperty("id_proof_path") && (
																<div style={{ color: "red" }} component="div">
																	{props.errors["id_proof_path"]}
																</div>
															)}
														</Box>
													</Grid>
												</Grid>
												<Grid container justify="center" xs={12}>
													<Typography variant="h5" component="h5">
														KYC Verify by IWS Advisor
													</Typography>
												</Grid>
												<Grid item md={4} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															type="text"
															component={TextField}
															name="id_proof_number"
															label="Fill ID Number"
															onChange={handleChange}
															variant="outlined"
															margin="dense"
														/>
													</Box>
												</Grid>
												<Grid item md={4} xs={12}>
													<Box margin={1}>
														Send OTP on Registered Mobile No.
														<Button variant="outlined" color="primary">
															Send
														</Button>
													</Box>
												</Grid>
												<Grid item md={4} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															type="text"
															component={TextField}
															name="id_proof_number"
															label="Enter OTP"
															onChange={handleChange}
															variant="outlined"
															margin="dense"
														/>
													</Box>
												</Grid>
												<Divider />
												<Grid item xs={12}>
													<ul>
														<li>
															<Typography variant="body1" component="body1">
																Note: You are in automatic agreement with this
																privacy policy.
															</Typography>
														</li>
														<li>
															<Typography variant="body2" component="body2">
																Get Extra Reward Point On KYC Recharge Offer
															</Typography>
														</li>
													</ul>

													<br></br>
												</Grid>
											</Grid>
										</AccordionDetails>
										<Divider />
										<AccordionActions>
											<Grid container justify="flex-end">
												{!props.isSubmitting ? (
													<Button onClick={props.resetForm} size="small">
														Reset To Default
													</Button>
												) : (
													t("common:cant_revert")
												)}
												<Button
													disable={props.isSubmitting}
													type="submit"
													color="primary"
													variant="outlined"
												>
													Save details
												</Button>
											</Grid>
										</AccordionActions>
									</Accordion>
								</Form>
							</CardContent>
						</div>
					);
				}}
			</Formik>
			{_renderModal()}
		</Card>
	);
};

ProfileForm.propTypes = {
	className: PropTypes.string,
};

export default withTranslation(["common"])(ProfileForm);
