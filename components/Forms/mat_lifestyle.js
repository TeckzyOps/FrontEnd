import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import Spinner from "../Spinner/spinner";
import { withTranslation } from "~/i18n";
import Alert from "../alert/alert";
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
import { matrimonyActions } from "../../_actions/matrimony.action";
import LocalStorageService from "../../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();
import OutlinedInput from "@material-ui/core/OutlinedInput";
import {
	interest,
	hobbies,
	disability,
	diatery_habits,
	sports,
	languages,
	OcassionallyBoolean,
} from "~static/text/profiledata";
import { state } from "~static/text/state";
import { cities } from "~static/text/city";

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
	Box,
	Grid,
	MenuItem,
	Typography,
	Chip,
	Paper,
	Button,
	FormControlLabel,
	InputAdornment,
	IconButton,
} from "@material-ui/core";
import MuiTextField from "@material-ui/core/TextField";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		justifyContent: "center",
		flexWrap: "wrap",
		listStyle: "none",
		padding: theme.spacing(0.5),
		margin: 0,
	},
	chips: {
		display: "flex",
		flexWrap: "wrap",
	},

	chip: {
		margin: theme.spacing(0.5),
	},
}));

const Lifestyledetails = ({
	initvalue,
	matrimonyid,
	nextform,
	backform,
	setlifetsyledetails,
	lifetsyledetailsid,
	setlifetsyledetailsid,
	...props
}) => {
	const { className, ...rest } = props;
	// const { loginDetails, user, updateUser } = useAuth();

	const classes = useStyles();
	const { t } = props;
	const digitsOnly = (value) =>
		/^([0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
	const [details, setDetails] = useState(props.prefilldata || {});
	const [loginData, setloginData] = React.useState({});
	const [states, setStates] = useState([]);
	const [district, setDistrict] = useState([]);
	const [city, setCity] = useState([]);
	const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);
	const profileSchema = Yup.object().shape({
		metrimony_id: Yup.string().required("Required"),
		language_speak: Yup.string().required("Required"),
		diatery_habits: Yup.string().required("Required"),
		disability: Yup.string().required("Required"),
		family_income: Yup.string(),
		drinking_habits: Yup.string(),
		smoking_habits: Yup.string(),
		house_own: Yup.string(),
		car_own: Yup.string(),
		hobbies: Yup.string(),
		interest: Yup.string(),
		sports: Yup.string(),
		email: Yup.string().email(),
		gaurdian_number: Yup.string().length(10, "Invalid Mobile Number"),
		alternate_number: Yup.string().length(10, "Invalid Mobile Number"),
		callTimeFrom: Yup.string()
			.max(5, "Too Much Characters")
			.required("Required")
			.test(
				"Time Format",
				"Invalid Time,Please input time in 24-hour format",
				digitsOnly
			),
		callTimeTo: Yup.string()
			.max(5, "Too Much Characters")
			.required("Required")
			.test(
				"Time Format",
				"Invalid Time,Please input time in 24-hour format",
				digitsOnly
			),
	});

	React.useEffect(() => {
		// console.error(Object.keys(state));
		setStates(Object.keys(state));
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
				title="Family Details"
				text="Process successfull"
				submitButtonText="Done"
			/>
		);
	};

	const _handleSubmit = ({ vals, setSubmitting, resetForm, setFieldError }) => {
		let payload = new FormData();
		let calltime = vals["callTimeFrom"] + " - " + vals["callTimeTo"];
		let proceed = false;
		let valKeyArr = Object.keys(vals);
		for (var i = 0; i < valKeyArr.length; i++) {
			if (initvalue[valKeyArr[i]] != vals[valKeyArr[i]]) {
				proceed = true;
				break;
			}
		}

		if (proceed) {
			for (var i in vals) {
				if (Array.isArray(vals[i])) {
					if (vals[i].length > 0) {
						payload.append(i, JSON.stringify(vals[i]));
					}
				} else {
					if (vals[i] && (i != "callTimeFrom" || i != "callTimeTo")) {
						payload.append(i, vals[i]);
					}
				}
			}
			payload.append("call_time", calltime);
			payload.append("metrimony_id", matrimonyid);
			if (payload && matrimonyid) {
				matrimonyActions
					.UpdateLifeStyleDetails(payload)
					.then(function (response) {
						setSubmitting(false);
						console.log("ressss", response);
						if (response.data.input_error) {
							Object.keys(response.data.input_error).forEach((k) => {
								setFieldError(k, result[k][0]);
							});
						}

						if (response.data.data.id) {
							setlifetsyledetails(response.data.data);
							setlifetsyledetailsid(response.data.data.id);
							nextform();
						}
					})
					.catch(function (error) {
						setSubmitting(false);
						if (error.response && error.response.data.input_error) {
							Object.keys(error.response.data.input_error).forEach((k) => {
								setFieldError(k, error.response.data.input_error[k][0]);
							});
						}
						console.error("errrrr ", error);
					});
			}
		} else {
			nextform();
		}
	};

	const handleChange = (e) => {
		console.log(e);

		switch (e.target.name) {
			case "state":
				setDistrict(state[e.target.value]);
				break;
			case "district":
				profileActions;
				setCity(cities[e.target.value]);
				break;
			// case "city":
			// 	text = "How you like them apples?";
			// 	break;
		}
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
				initialValues={initvalue}
				validationSchema={profileSchema}
				onSubmit={(vals, { setSubmitting, resetForm, setFieldError }) =>
					_handleSubmit({
						vals,
						setSubmitting,
						resetForm,
						setFieldError,
					})
				}
			>
				{(formprops) => {
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
					console.log(props);
					return (
						<div>
							<CardHeader
								subheader="The information can be edited"
								title="Basic Details"
							/>
							<Divider />
							<CardContent>
								<Form>
									<Grid container spacing={3}>
										<Grid item md={6} xs={12}>
											<Box margin={1}>
												<InputLabel shrink={true} htmlFor="Language Speak">
													Language Speak
												</InputLabel>
												<Field
													required
													fullWidth
													component={Select}
													type="text"
													name="language_speak"
													multiple={true}
													onChange={handleChange}
													variant="standard"
													helperText={
														formprops.errors.hasOwnProperty("language_speak") &&
														formprops.errors["language_speak"]
													}
													margin="dense"
													InputLabelProps={{
														shrink: true,
													}}
													renderValue={(selected) => (
														<div className={classes.chips}>
															{selected.map((value) => (
																<Chip
																	key={value}
																	label={value}
																	className={classes.chip}
																/>
															))}
														</div>
													)}
												>
													{languages.map((option, index) => (
														<MenuItem key={index} value={option}>
															{option}
														</MenuItem>
													))}
												</Field>
											</Box>
										</Grid>

										<Grid item md={4} xs={12}>
											<Box margin={1}>
												<Field
													required
													onChange={handleChange}
													fullWidth
													component={TextField}
													type="text"
													name="diatery_habits"
													label="Diatery Habits"
													select
													variant="standard"
													helperText={
														formprops.errors.hasOwnProperty("diatery_habits") &&
														formprops.errors["diatery_habits"]
													}
													margin="normal"
													InputLabelProps={{
														shrink: true,
													}}
												>
													{diatery_habits.map((option, index) => (
														<MenuItem key={index} value={option}>
															{option}
														</MenuItem>
													))}
												</Field>
											</Box>
										</Grid>

										<Grid item md={4} xs={12}>
											<Box margin={1}>
												<Field
													onChange={handleChange}
													fullWidth
													component={TextField}
													type="text"
													name="drinking_habits"
													label="Drinking Habits"
													select
													variant="standard"
													helperText={
														formprops.hasOwnProperty("drinking_habits") &&
														formprops.errors["drinking_habits"]
													}
													margin="normal"
													InputLabelProps={{
														shrink: true,
													}}
												>
													{OcassionallyBoolean.map((option, index) => (
														<MenuItem key={index} value={index + 1}>
															{option}
														</MenuItem>
													))}
												</Field>
											</Box>
										</Grid>

										<Grid item md={4} xs={12}>
											<Box margin={1}>
												<Field
													onChange={handleChange}
													fullWidth
													component={TextField}
													type="text"
													name="smoking_habits"
													label="Smoking Habits"
													select
													variant="standard"
													helperText={
														formprops.errors.hasOwnProperty("smoking_habits") &&
														formprops.errors["smoking_habits"]
													}
													margin="normal"
													InputLabelProps={{
														shrink: true,
													}}
												>
													{OcassionallyBoolean.map((option, index) => (
														<MenuItem key={index} value={index + 1}>
															{option}
														</MenuItem>
													))}
												</Field>
											</Box>
										</Grid>

										<Grid item md={4} xs={12}>
											<Box margin={1}>
												<FormControlLabel
													control={
														<Field
															component={Switch}
															type="checkbox"
															name="house_own"
														/>
													}
													label="Own A House ?"
												/>
												<ErrorMessage
													style={{ color: "red" }}
													name="house_own"
												/>
											</Box>
										</Grid>

										<Grid item md={4} xs={12}>
											<Box margin={1}>
												<FormControlLabel
													control={
														<Field
															component={Switch}
															type="checkbox"
															name="car_own"
														/>
													}
													label="Own A Car ?"
												/>
												<ErrorMessage style={{ color: "red" }} name="car_own" />
											</Box>
										</Grid>

										<Grid item md={6} xs={12}>
											<Box margin={1}>
												<InputLabel shrink={true} htmlFor="Hobbies">
													Hobbies
												</InputLabel>
												<Field
													fullWidth
													component={Select}
													type="text"
													name="hobbies"
													multiple={true}
													onChange={handleChange}
													variant="standard"
													helperText={
														formprops.errors.hasOwnProperty("hobbies") &&
														formprops.errors["hobbies"]
													}
													margin="dense"
													InputLabelProps={{
														shrink: true,
													}}
													renderValue={(selected) => (
														<div className={classes.chips}>
															{selected.map((value) => (
																<Chip
																	key={value}
																	label={value}
																	className={classes.chip}
																/>
															))}
														</div>
													)}
												>
													{hobbies.map((option, index) => (
														<MenuItem key={index} value={option}>
															{option}
														</MenuItem>
													))}
												</Field>
											</Box>
										</Grid>

										<Grid item md={6} xs={12}>
											<Box margin={1}>
												<InputLabel shrink={true} htmlFor="Interest">
													Interest
												</InputLabel>
												<Field
													fullWidth
													component={Select}
													type="text"
													name="interest"
													multiple={true}
													onChange={handleChange}
													variant="standard"
													helperText={
														formprops.errors.hasOwnProperty("interest") &&
														formprops.errors["interest"]
													}
													margin="dense"
													InputLabelProps={{
														shrink: true,
													}}
													renderValue={(selected) => (
														<div className={classes.chips}>
															{selected.map((value) => (
																<Chip
																	key={value}
																	label={value}
																	className={classes.chip}
																/>
															))}
														</div>
													)}
												>
													{interest.map((option, index) => (
														<MenuItem key={index} value={option}>
															{option}
														</MenuItem>
													))}
												</Field>
											</Box>
										</Grid>

										<Grid item md={6} xs={12}>
											<Box margin={1}>
												<InputLabel shrink={true} htmlFor="Sports">
													Sports
												</InputLabel>
												<Field
													fullWidth
													component={Select}
													type="text"
													name="sports"
													multiple={true}
													onChange={handleChange}
													variant="standard"
													helperText={
														formprops.errors.hasOwnProperty("sports") &&
														formprops.errors["sports"]
													}
													margin="dense"
													InputLabelProps={{
														shrink: true,
													}}
													renderValue={(selected) => (
														<div className={classes.chips}>
															{selected.map((value) => (
																<Chip
																	key={value}
																	label={value}
																	className={classes.chip}
																/>
															))}
														</div>
													)}
												>
													{sports.map((option, index) => (
														<MenuItem key={index} value={option}>
															{option}
														</MenuItem>
													))}
												</Field>
											</Box>
										</Grid>

										<Grid item md={4} xs={12}>
											<Box margin={1}>
												<Field
													onChange={handleChange}
													fullWidth
													component={TextField}
													type="text"
													name="email"
													label="Email"
													variant="standard"
													helperText={
														formprops.errors.hasOwnProperty("email") &&
														formprops.errors["email"]
													}
													margin="normal"
													InputLabelProps={{
														shrink: true,
													}}
												></Field>
											</Box>
										</Grid>

										<Grid item md={4} xs={12}>
											<Box margin={1}>
												<Field
													onChange={handleChange}
													fullWidth
													component={TextField}
													type="text"
													name="gaurdian_number"
													label="Gaurdian Number"
													variant="standard"
													helperText={
														formprops.errors.hasOwnProperty(
															"gaurdian_number"
														) && formprops.errors["gaurdian_number"]
													}
													margin="normal"
													InputLabelProps={{
														shrink: true,
													}}
												></Field>
											</Box>
										</Grid>

										<Grid item md={4} xs={12}>
											<Box margin={1}>
												<Field
													onChange={handleChange}
													fullWidth
													component={TextField}
													type="text"
													name="alternate_number"
													label="Alternate Number"
													variant="standard"
													helperText={
														formprops.errors.hasOwnProperty(
															"alternate_number"
														) && formprops.errors["alternate_number"]
													}
													margin="normal"
													InputLabelProps={{
														shrink: true,
													}}
												></Field>
											</Box>
										</Grid>
										<Grid item xs={6}>
											<Typography variant="body2" gutterBottom>
												Call Timings
											</Typography>
											<div style={{ marginBottom: 20 }}>
												<div>
													<Grid container spacing={2}>
														<Grid item xs={6}>
															<Field
																variant="outlined"
																fullWidth
																label="From"
																onKeyPress={(e) => {
																	if (
																		e.keyCode != 8 &&
																		(formprops.values[e.target.name] === 2 ||
																			formprops.values[e.target.name] === 5)
																	) {
																		formprops.setFieldValue(
																			e.target.name,
																			(formprops.values[e.target.name] += ":")
																		);
																	}
																	//collapse double colons
																	formprops.setFieldValue(
																		e.target.name,
																		formprops.values[e.target.name].replace(
																			/:+/g,
																			":"
																		)
																	);
																}}
																component={TextField}
																type="text"
																name="callTimeFrom"
																helperText={
																	formprops.errors.hasOwnProperty(
																		"callTimeFrom"
																	) && formprops.errors["callTimeFrom"]
																}
																style={{ marginRight: 10 }}
															/>
														</Grid>
														<Grid item xs={6}>
															<Field
																variant="outlined"
																fullWidth
																label="To"
																component={TextField}
																name="callTimeTo"
																helperText={
																	formprops.errors.hasOwnProperty(
																		"callTimeTo"
																	) && formprops.errors["callTimeTo"]
																}
																type="text"
																style={{ marginRight: 10 }}
															/>
														</Grid>
													</Grid>
												</div>
											</div>
										</Grid>

										<Grid item md={4} xs={12}>
											<Box margin={1}>
												<Field
													onChange={handleChange}
													fullWidth
													component={TextField}
													type="text"
													name="disability"
													label="Disability"
													select
													variant="standard"
													helperText={
														formprops.errors.hasOwnProperty("disability") &&
														formprops.errors["disability"]
													}
													margin="normal"
													InputLabelProps={{
														shrink: true,
													}}
												>
													{disability.map((option, index) => (
														<MenuItem key={index} value={option}>
															{option}
														</MenuItem>
													))}
												</Field>
											</Box>
										</Grid>
									</Grid>

									<Divider />
									<Grid container alignItems="flex-end" justify="flex-end">
										{!formprops.isSubmitting ? (
											<div>
												<Button onClick={formprops.resetForm} size="small">
													Reset To Default
												</Button>
												<Button onClick={backform} size="small">
													Back
												</Button>
											</div>
										) : (
											t("common:cant_revert")
										)}
										<Button
											disabled={formprops.isSubmitting}
											type="submit"
											color="primary"
											variant="outlined"
										>
											Save details
										</Button>
									</Grid>
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

Lifestyledetails.propTypes = {
	className: PropTypes.string,
};

export default withTranslation(["common"])(Lifestyledetails);
