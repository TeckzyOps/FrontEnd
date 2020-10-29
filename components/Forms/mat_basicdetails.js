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
	maritialStatus,
	caste,
	experience,
	countryList,
	interest,
	languages,
} from "~static/text/profiledata";
import { states } from "~static/text/state";
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

const Basicdetails = ({
	initvalue,
	setmatrimonyid,
	matrimonyid,
	setbasicdetails,
	nextform,
	...props
}) => {
	const { className, ...rest } = props;
	// const { loginDetails, user, updateUser } = useAuth();

	const classes = useStyles();
	const { t } = props;

	const [states, setStates] = useState([]);
	const [district, setDistrict] = useState([]);
	const [city, setCity] = useState([]);
	const [formAction, setFormAction] = useState(0);
	const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);
	const profileSchema = Yup.object().shape({
		filled_by: Yup.string().required("Required"),
		name: Yup.string().required("Required"),
		gender: Yup.string().required("Required"),
		dob_year: Yup.string().required("Required"),
		height: Yup.string()
			.required("Required")
			.test("isFloat", "Invalid Value", (value) => {
				if (parseFloat(value) === value) {
					return false;
				} else {
					return true;
				}
			}),
		religion: Yup.string().required("Required"),
		cast: Yup.string().required("Required"),
		mother_tongue: Yup.string().required("Required"),
		marital_status: Yup.string().required("Required"),
		country: Yup.string().required("Required"),
		state: Yup.string().required("Required"),
		district: Yup.string().required("Required"),
		proffesion: Yup.string().required("Required"),
		salary: Yup.number().required("Required"),
		living_with_parents_status: Yup.string().required("Required"),
		wedding_budget: Yup.number().required("Required"),
		childrens: Yup.string()
			.when("marital_status", (marital_status, schema) => {
				return marital_status >= 2 ? schema.required("Required") : schema;
			})
			.nullable(), // check if required
		childrens_living_status: Yup.string().when(
			"childrens",
			(childrens, schema) => {
				return childrens >= 1 ? schema.required("Required") : schema;
			}
		), // check if required
		manglik_status: Yup.string(),
		occupation: Yup.string(),
		education: Yup.string(),
		gotra: Yup.string(),
	});

	React.useEffect(() => {
		// console.error(Object.keys(state));
		// setStates(Object.keys(state));
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
				title="Basic Details"
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
			for (var i in vals) {
				if (Array.isArray(vals[i])) {
					if (vals[i].length > 0) {
						payload.append(i, JSON.stringify(vals[i]));
					}
				} else {
					if (vals[i]) {
						payload.append(i, vals[i]);
					}
				}
			}
			if (matrimonyid) {
				payload.append("metrimony_id", matrimonyid);
			}

			if (payload) {
				let action = 0;
				if (matrimonyid && matrimonyid > 0) {
					action = 1;
				}

				matrimonyActions
					.createMatrimony(payload, action)
					.then(function (response) {
						setSubmitting(false);
						console.log("ressss", response);
						if (response.data.input_error) {
							Object.keys(response.data.input_error).forEach((k) => {
								setFieldError(k, response.data.input_error[k][0]);
							});
						}

						if (response.data.data.id) {
							setmatrimonyid(response.data.data.id);
							setbasicdetails(response.data.data);
							nextform();
							// setProfileUpdateSuccess(() => true);
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

	const initialValues = {
		filled_by: "",
		name: "",
		gender: "",
		dob_year: "",
		height: "",
		religion: "",
		cast: "",
		mother_tongue: "",
		marital_status: "",
		childrens: "",
		childrens_living_status: "",
		manglik_status: "",
		country: "",
		state: "",
		district: "",
		education: "",
		proffesion: "",
		occupation: "",
		salary: "",
		gotra: "",
		living_with_parents_status: "",
		wedding_budget: "",
	};

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			{/* <Button type="submit" color="primary" variant="outlined">
				Go To Account Details
			</Button> */}
			<Formik
				enableReinitialize
				initialValues={initvalue}
				// initialValues={Object.keys(initvalue).reduce(function (state, obj) {
				// 	try {
				// 		state[obj] = JSON.parse(initvalue[obj]);
				// 	} catch (e) {
				// 		state[obj] = initvalue[obj];
				// 	}

				// 	return state;
				// }, {})}
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

					return (
						<div>
							<CardHeader
								subheader="The information can be edited"
								title="Basic Details"
							/>
							<Divider />
							<CardContent>
								<Form autoComplete="off">
									<Grid container spacing={3}>
										<Grid item md={4} xs={12}>
											<Box margin={1}>
												<Field
													onChange={handleChange}
													fullWidth
													component={TextField}
													type="text"
													name="filled_by"
													label="Filled By"
													variant="outlined"
													helperText={
														props.errors.hasOwnProperty("filled_by") &&
														props.errors["filled_by"]
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
													name="name"
													label="Candidate Name"
													variant="outlined"
													helperText={
														props.errors.hasOwnProperty("name") &&
														props.errors["name"]
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
													name="gender"
													label="Gender"
													select
													variant="outlined"
													helperText={
														props.errors.hasOwnProperty("gender") &&
														props.errors["gender"]
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
											<Box margin={1}>
												<Field
													onChange={handleChange}
													fullWidth
													component={TextField}
													type="text"
													name="dob_year"
													label="Birth Year"
													variant="outlined"
													helperText={
														props.errors.hasOwnProperty("dob_year") &&
														props.errors["dob_year"]
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
													name="height"
													label="Height"
													variant="outlined"
													helperText={
														props.errors.hasOwnProperty("height") &&
														props.errors["height"]
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
													name="religion"
													label="Religion"
													select
													variant="outlined"
													helperText={
														props.errors.hasOwnProperty("religion") &&
														props.errors["religion"]
													}
													margin="normal"
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

										<Grid item md={4} xs={12}>
											<Box margin={1}>
												<Field
													onChange={handleChange}
													fullWidth
													component={TextField}
													type="text"
													name="cast"
													label="Cast"
													select
													variant="outlined"
													helperText={
														props.errors.hasOwnProperty("cast") &&
														props.errors["cast"]
													}
													margin="normal"
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

										<Grid item md={4} xs={12}>
											<Box margin={1}>
												<Field
													onChange={handleChange}
													fullWidth
													component={TextField}
													type="text"
													name="mother_tongue"
													label="Mother Tongue"
													variant="outlined"
													select
													helperText={
														props.errors.hasOwnProperty("mother_tongue") &&
														props.errors["mother_tongue"]
													}
													margin="normal"
													InputLabelProps={{
														shrink: true,
													}}
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
													onChange={handleChange}
													fullWidth
													component={TextField}
													type="text"
													name="marital_status"
													label="Marital Status"
													select
													variant="outlined"
													helperText={
														props.errors.hasOwnProperty("marital_status") &&
														props.errors["marital_status"]
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
										{}
										<Grid item md={4} xs={12}>
											<Box margin={1}>
												<Field
													onChange={handleChange}
													fullWidth
													component={TextField}
													disabled={
														null == props.values.marital_status ||
														props.values.marital_status < 2
													}
													type="number"
													name="childrens"
													label="Number Of Childrens"
													variant="outlined"
													helperText={
														props.errors.hasOwnProperty("childrens") &&
														props.errors["childrens"]
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
													disabled={
														null == props.values.marital_status ||
														props.values.marital_status < 2
													}
													component={TextField}
													type="text"
													name="childrens_living_status"
													label="Number Of Married Childrens"
													variant="outlined"
													helperText={
														props.errors.hasOwnProperty(
															"childrens_living_status"
														) && props.errors["childrens_living_status"]
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
												<FormControlLabel
													control={
														<Field
															component={Switch}
															type="checkbox"
															name="manglik_status"
														/>
													}
													label="Manglik Status"
												/>
											</Box>
											{/* <Box margin={1}>
														<Field
															onChange={handleChange}
															fullWidth
															component={TextField}
															type="text"
															name="manglik_status"
															label="Manglik Status"
															variant="outlined"
															helperText={
																props.errors.hasOwnProperty("manglik_status") &&
																props.errors["manglik_status"]
															}
															margin="normal"
															InputLabelProps={{
																shrink: true,
															}}
														></Field>
													</Box> */}
										</Grid>

										<Grid item md={4} xs={12}>
											<Box margin={1}>
												<Field
													onChange={handleChange}
													fullWidth
													component={TextField}
													type="text"
													name="country"
													label="Current Residence Of"
													select
													variant="outlined"
													helperText={
														props.errors.hasOwnProperty("country") &&
														props.errors["country"]
													}
													margin="normal"
													InputLabelProps={{
														shrink: true,
													}}
												>
													{countryList.map((option, index) => (
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
													component={CustomTextField}
													type="text"
													name="state"
													label="State"
													select
													variant="outlined"
													helperText={
														props.errors.hasOwnProperty("state") &&
														props.errors["state"]
													}
													margin="normal"
													InputLabelProps={{
														shrink: true,
													}}
												>
													{states.map((option, index) => (
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
													name="district"
													label="District"
													select
													variant="outlined"
													helperText={
														props.errors.hasOwnProperty("district") &&
														props.errors["district"]
													}
													margin="normal"
													InputLabelProps={{
														shrink: true,
													}}
												>
													{props.values.state &&
														state[props.values.state].map((option, index) => (
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
													fullWidth
													component={TextField}
													type="text"
													name="education"
													placeholder="Education"
													label="Education"
													select
													onChange={handleChange}
													variant="outlined"
													helperText={
														props.errors.hasOwnProperty("education") &&
														props.errors["education"]
													}
													margin="normal"
													InputLabelProps={{
														shrink: true,
													}}
												>
													{education.map((option, index) => (
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
													name="proffesion"
													label="Proffesion"
													select
													variant="outlined"
													helperText={
														props.errors.hasOwnProperty("proffesion") &&
														props.errors["proffesion"]
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
													name="occupation"
													label="Occupation"
													select
													variant="outlined"
													helperText={
														props.errors.hasOwnProperty("occupation") &&
														props.errors["occupation"]
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
													name="salary"
													label="Salary"
													variant="outlined"
													helperText={
														props.errors.hasOwnProperty("salary") &&
														props.errors["salary"]
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
													name="gotra"
													label="Gotra"
													variant="outlined"
													helperText={
														props.errors.hasOwnProperty("gotra") &&
														props.errors["gotra"]
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
													select
													name="living_with_parents_status"
													label="Living With Parrents Or Not ?"
													variant="outlined"
													helperText={
														props.errors.hasOwnProperty(
															"living_with_parents_status"
														) && props.errors["living_with_parents_status"]
													}
													margin="normal"
													InputLabelProps={{
														shrink: true,
													}}
												>
													{["Yes", "No"].map((option, index) => (
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
													name="wedding_budget"
													label="Wedding Budget"
													variant="outlined"
													helperText={
														props.errors.hasOwnProperty("wedding_budget") &&
														props.errors["wedding_budget"]
													}
													margin="normal"
													InputLabelProps={{
														shrink: true,
													}}
												></Field>
											</Box>
										</Grid>
									</Grid>

									<Divider />
									<Grid container alignItems="flex-end" justify="flex-end">
										{!props.isSubmitting ? (
											<Button onClick={props.resetForm} size="small">
												Reset To Default
											</Button>
										) : (
											t("common:cant_revert")
										)}

										<Button
											disabled={props.isSubmitting}
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

Basicdetails.propTypes = {
	className: PropTypes.string,
};

export default withTranslation(["common"])(Basicdetails);
