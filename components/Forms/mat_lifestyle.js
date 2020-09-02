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
	gender,
	education,
	occupation,
	idType,
	religion,
	experience,
	countryList,
	interest,
	languages,
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

const Lifestyledetails = (props) => {
	const { className, ...rest } = props;
	// const { loginDetails, user, updateUser } = useAuth();

	const classes = useStyles();
	const { t } = props;

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
		email: Yup.string(),
		gaurdian_number: Yup.string(),
		alternate_number: Yup.string(),
		call_time: Yup.string(),
	});

	React.useEffect(() => {
		// console.error(Object.keys(state));
		setStates(Object.keys(state));
		setDetails(localStorageService.getUserDetails("Details"));
	}, []);
	React.useEffect(() => {}, [details]);

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

	const initVals = {
		language_speak: [],
		diatery_habits: "",
		drinking_habits: "",
		smoking_habits: "",
		house_own: "",
		car_own: "",
		hobbies: [],
		interest: [],
		sports: [],
		email: "",
		gaurdian_number: "",
		alternate_number: "",
		call_time: "",
		disability: "",
	};
	const _handleSubmit = ({ vals, setSubmitting, resetForm, setFieldError }) => {
		let payload = new FormData();

		for (var i in vals) {
			if (Array.isArray(vals[i])) {
				if (vals[i].length > 0) {
					payload.append(i, JSON.stringify(vals[i]));
				}
			} else {
				payload.append(i, vals[i]);
			}
		}

		if (payload) {
			matrimonyActions
				.UpdateFamilyDetails(payload)
				.then(function (response) {
					setSubmitting(false);
					console.log("ressss", response);
					if (response.data.input_error) {
						Object.keys(response.data.input_error).forEach((k) => {
							setFieldError(k, result[k][0]);
						});
					}

					if (response.data.id) {
						setProfileUpdateSuccess(() => true);
					}
				})
				.catch(function (error) {
					setSubmitting(false);
					if (error.response.data.input_error) {
						Object.keys(error.response.data.input_error).forEach((k) => {
							setFieldError(k, result[k][0]);
						});
					}
					console.error("errrrr ", error);
				});
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
				initialValues={initVals}
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
					console.log(props);
					return (
						<div>
							<CardHeader
								subheader="The information can be edited"
								title="Basic Details"
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
												Family Details
											</Typography>
										</AccordionSummary>
										<AccordionDetails>
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
																props.errors.hasOwnProperty("language_speak") &&
																props.errors["language_speak"]
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
															{language_speak.map((option, index) => (
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
																props.errors.hasOwnProperty("diatery_habits") &&
																props.errors["diatery_habits"]
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
																props.errors.hasOwnProperty(
																	"drinking_habits"
																) && props.errors["drinking_habits"]
															}
															margin="normal"
															InputLabelProps={{
																shrink: true,
															}}
														>
															{drinking_habits.map((option, index) => (
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
															variant="standard"
															helperText={
																props.errors.hasOwnProperty("smoking_habits") &&
																props.errors["smoking_habits"]
															}
															margin="normal"
															InputLabelProps={{
																shrink: true,
															}}
														>
															{smoking_habits.map((option, index) => (
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
															name="house_own"
															label="Own A House ?"
															select
															variant="standard"
															helperText={
																props.errors.hasOwnProperty("house_own") &&
																props.errors["house_own"]
															}
															margin="normal"
															InputLabelProps={{
																shrink: true,
															}}
														>
															{house_own.map((option, index) => (
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
															name="car_own"
															label="Own A Car ?"
															select
															variant="standard"
															helperText={
																props.errors.hasOwnProperty("car_own") &&
																props.errors["car_own"]
															}
															margin="normal"
															InputLabelProps={{
																shrink: true,
															}}
														>
															{car_own.map((option, index) => (
																<MenuItem key={index} value={option}>
																	{option}
																</MenuItem>
															))}
														</Field>
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
																props.errors.hasOwnProperty("hobbies") &&
																props.errors["hobbies"]
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
																props.errors.hasOwnProperty("interest") &&
																props.errors["interest"]
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
																props.errors.hasOwnProperty("sports") &&
																props.errors["sports"]
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
																props.errors.hasOwnProperty("email") &&
																props.errors["email"]
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
																props.errors.hasOwnProperty(
																	"gaurdian_number"
																) && props.errors["gaurdian_number"]
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
																props.errors.hasOwnProperty(
																	"alternate_number"
																) && props.errors["alternate_number"]
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
															name="call_time"
															label="Call Timmings"
															select
															variant="standard"
															helperText={
																props.errors.hasOwnProperty("call_time") &&
																props.errors["call_time"]
															}
															margin="normal"
															InputLabelProps={{
																shrink: true,
															}}
														>
															{call_time.map((option, index) => (
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
															variant="standard"
															helperText={
																props.errors.hasOwnProperty("disability") &&
																props.errors["disability"]
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
										</AccordionDetails>
										<Divider />
										<AccordionActions>
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

Lifestyledetails.propTypes = {
	className: PropTypes.string,
};

export default withTranslation(["common"])(Lifestyledetails);
