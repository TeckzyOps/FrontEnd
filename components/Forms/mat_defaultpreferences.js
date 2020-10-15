import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Spinner from "../Spinner/spinner";
import { withTranslation } from "~/i18n";
import Alert from "../alert/alert";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { InputLabel, Slider } from "@material-ui/core/";
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
	gender,
	religion,
	caste,
	diatery_habits,
	maritialStatus,
	disability,
	occupation,
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

const DefaultPrefs = ({
	initvalue,
	matrimonyid,
	backform,
	setdefaultdetails,
	defaultdetailsid,
	setdefaultdetailsid,
	...props
}) => {
	const { className, ...rest } = props;
	// const { loginDetails, user, updateUser } = useAuth();

	const classes = useStyles();
	const { t } = props;

	const [details, setDetails] = useState(props.prefilldata || {});
	const [loginData, setloginData] = React.useState({});
	const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);
	const profileSchema = Yup.object().shape({
		metrimony_id: Yup.string().required("Required"),
		gender: Yup.string().required("Required"),

		age_from: Yup.string(),
		age_to: Yup.string(),
		height_from: Yup.string(),
		height_to: Yup.string(),
		marital_status: Yup.string(),
		religion: Yup.string(),
		cast: Yup.string(),
		language_speak: Yup.string(),
		wedding_budget_from: Yup.string(),
		wedding_budget_to: Yup.string(),
		proffesion: Yup.string(),
		diatery_habits: Yup.string(),
		drinking_habits: Yup.string(),
		smoking_habits: Yup.string(),
		disability: Yup.string(),
	});

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
		let proceed = false;
		let valKeyArr = Object.keys(vals);
		for (var i = 0; i < valKeyArr.length; i++) {
			if (initvalue[valKeyArr[i]] != vals[valKeyArr[i]]) {
				proceed = true;
				break;
			}
		}
		if (proceed) {
			let calltime = vals["callTimeFrom"] + " - " + vals["callTimeTo"];
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
					.UpdateDefaultPrefs(payload)
					.then(function (response) {
						setSubmitting(false);
						console.log("ressss", response);
						if (response.data.input_error) {
							Object.keys(response.data.input_error).forEach((k) => {
								setFieldError(k, result[k][0]);
							});
						}

						if (response.data.data.id) {
							setdefaultdetails(response.data.data);
							setdefaultdetailsid(response.data.data.id);
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
								subheader="We will Suggest People to you on the basis of these preferences"
								title="Search Preferences"
							/>
							<Divider />
							<CardContent>
								<Form>
									<Grid container spacing={3}>
										<Field
											onChange={handleChange}
											component={TextField}
											type="hidden"
											name="metrimony_id"
											variant="outlined"
											helperText={
												formprops.errors.hasOwnProperty("father_occupation") &&
												formprops.errors["father_occupation"]
											}
										/>
										<Grid item md={4} xs={12}>
											<Box margin={1}>
												<Field
													onChange={handleChange}
													fullWidth
													component={TextField}
													type="text"
													name="gender"
													label="Gender"
													select
													variant="outlined"
													helperText={
														formprops.errors.hasOwnProperty("gender") &&
														formprops.errors["gender"]
													}
													margin="normal"
													InputLabelProps={{
														shrink: true,
													}}
												>
													{gender.map((option, index) => (
														<MenuItem key={index} value={index + 1}>
															{option}
														</MenuItem>
													))}
												</Field>
											</Box>
										</Grid>

										<Grid item md={4} xs={12}>
											<InputLabel shrink={true}>Birth Year</InputLabel>
											<Grid container spacing={2}>
												<Grid item xs={6}>
													<Field
														label="From:"
														type="text"
														name="age_from"
														label="From"
														variant="outlined"
														helperText={
															formprops.errors.hasOwnProperty("age_from") &&
															formprops.errors["age_from"]
														}
														className={classes.textField}
														InputLabelProps={{
															shrink: true,
														}}
													/>
													&nbsp;-&nbsp;
													<Field
														label="To:"
														type="text"
														name="age_to"
														label="To"
														variant="outlined"
														helperText={
															formprops.errors.hasOwnProperty("age_to") &&
															formprops.errors["age_to"]
														}
														className={classes.textField}
														InputLabelProps={{
															shrink: true,
														}}
													/>
												</Grid>
											</Grid>
										</Grid>

										<Grid item md={4} xs={12}>
											<InputLabel shrink={true}>Height</InputLabel>
											<Grid container spacing={2}>
												<Grid item xs={6}>
													<Field
														label="From:"
														type="text"
														name="height_from"
														label="From"
														variant="outlined"
														helperText={
															formprops.errors.hasOwnProperty("height_from") &&
															formprops.errors["height_from"]
														}
														className={classes.textField}
														InputLabelProps={{
															shrink: true,
														}}
													/>
													&nbsp;-&nbsp;
													<Field
														label="To:"
														type="text"
														name="height_to"
														label="To"
														variant="outlined"
														helperText={
															formprops.errors.hasOwnProperty("height_to") &&
															formprops.errors["height_to"]
														}
														className={classes.textField}
														InputLabelProps={{
															shrink: true,
														}}
													/>
												</Grid>
											</Grid>
										</Grid>

										<Grid item md={4} xs={12}>
											<Box margin={1}>
												<Field
													onChange={handleChange}
													fullWidth
													component={TextField}
													type="text"
													name="marital_status"
													label="Marital Status"
													select
													variant="outlined"
													helperText={
														formprops.errors.hasOwnProperty("marital_status") &&
														formprops.errors["marital_status"]
													}
													margin="normal"
													InputLabelProps={{
														shrink: true,
													}}
												>
													{maritialStatus.map((option, index) => (
														<MenuItem key={index} value={index + 1}>
															{option}
														</MenuItem>
													))}
												</Field>
											</Box>
										</Grid>

										<Grid item md={6} xs={12}>
											<Box margin={1}>
												<InputLabel shrink={true} htmlFor="Religion">
													Religion
												</InputLabel>
												<Field
													fullWidth
													component={Select}
													type="text"
													name="religion"
													select
													onChange={handleChange}
													variant="outlined"
													helperText={
														formprops.errors.hasOwnProperty("religion") &&
														formprops.errors["religion"]
													}
													margin="dense"
													InputLabelProps={{
														shrink: true,
													}}
												>
													{religion.map((option, index) => (
														<MenuItem key={index} value={option}>
															{option}
														</MenuItem>
													))}
												</Field>
											</Box>
										</Grid>

										<Grid item md={6} xs={12}>
											<Box margin={1}>
												<InputLabel shrink={true} htmlFor="Cast">
													Cast
												</InputLabel>
												<Field
													fullWidth
													component={Select}
													type="text"
													name="cast"
													select
													onChange={handleChange}
													variant="outlined"
													helperText={
														formprops.errors.hasOwnProperty("cast") &&
														formprops.errors["cast"]
													}
													margin="dense"
													InputLabelProps={{
														shrink: true,
													}}
												>
													{caste.map((option, index) => (
														<MenuItem key={index} value={option}>
															{option}
														</MenuItem>
													))}
												</Field>
											</Box>
										</Grid>

										<Grid item md={6} xs={12}>
											<Box margin={1}>
												<InputLabel shrink={true} htmlFor="Language Speak">
													Language Speak
												</InputLabel>
												<Field
													fullWidth
													component={Select}
													type="text"
													name="language_speak"
													multiple={true}
													onChange={handleChange}
													variant="outlined"
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
											<InputLabel shrink={true}>Wedding Budget</InputLabel>
											<Grid container spacing={2}>
												<Grid item xs={6}>
													<Field
														label="From:"
														type="text"
														name="wedding_budget_from"
														label="From"
														variant="outlined"
														helperText={
															formprops.errors.hasOwnProperty(
																"wedding_budget_from"
															) && formprops.errors["wedding_budget_from"]
														}
														className={classes.textField}
														InputLabelProps={{
															shrink: true,
														}}
													/>
													&nbsp;-&nbsp;
													<Field
														label="To:"
														type="text"
														name="wedding_budget_to"
														label="To"
														variant="outlined"
														helperText={
															formprops.errors.hasOwnProperty(
																"wedding_budget_to"
															) && formprops.errors["wedding_budget_to"]
														}
														className={classes.textField}
														InputLabelProps={{
															shrink: true,
														}}
													/>
												</Grid>
											</Grid>
										</Grid>

										<Grid item md={4} xs={12}>
											<Box margin={1}>
												<Field
													onChange={handleChange}
													fullWidth
													component={TextField}
													type="text"
													name="proffesion"
													label="Proffesion"
													select
													variant="outlined"
													helperText={
														formprops.errors.hasOwnProperty("proffesion") &&
														formprops.errors["proffesion"]
													}
													margin="normal"
													InputLabelProps={{
														shrink: true,
													}}
												>
													{occupation.map((option, index) => (
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
													name="diatery_habits"
													label="Diatery Habits"
													select
													variant="outlined"
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
													variant="outlined"
													helperText={
														formprops.errors.hasOwnProperty(
															"drinking_habits"
														) && formprops.errors["drinking_habits"]
													}
													margin="normal"
													InputLabelProps={{
														shrink: true,
													}}
												>
													{OcassionallyBoolean.map((option, index) => (
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
													name="smoking_habits"
													label="Smoking Habits"
													select
													variant="outlined"
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
													name="disability"
													label="Disability"
													select
													variant="outlined"
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

DefaultPrefs.propTypes = {
	className: PropTypes.string,
};

export default withTranslation(["common"])(DefaultPrefs);
