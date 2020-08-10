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

const ProfileForm = (props) => {
	const { className, ...rest } = props;
	// const { loginDetails, user, updateUser } = useAuth();

	const classes = useStyles();
	const { t } = props;

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
	React.useEffect(() => {
		if (details.profile && details.profile.data.state) {
			setDistrict(state[details.profile.data.state]);
		}
		if (details.profile && details.profile.data.district) {
			setCity(cities[details.profile.data.district]);
		}
	}, [details]);

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
		gender:
			details.profile && details.profile.data.gender
				? details.profile.data.gender
				: "",
		dob:
			details.profile && details.profile.data.dob
				? details.profile.data.dob
				: "",
		religion:
			details.profile && details.profile.data.religion
				? details.profile.data.religion
				: "",
		mother_tongue:
			details.profile && details.profile.data.mother_tongue
				? details.profile.data.mother_tongue
				: "",
		profession:
			details.profile && details.profile.data.profession
				? details.profile.data.profession
				: "",
		profession_details:
			details.profile && details.profile.data.profession_details
				? details.profile.data.profession_details
				: "",
		occupation:
			details.profile && details.profile.data.occupation
				? details.profile.data.occupation
				: "",
		language_speak:
			details.profile &&
			details.profile.data.language_speak &&
			Array.isArray(JSON.parse(details.profile.data.language_speak))
				? JSON.parse(details.profile.data.language_speak)
				: [],
		interest:
			details.profile &&
			details.profile.data.interest &&
			Array.isArray(JSON.parse(details.profile.data.interest))
				? JSON.parse(details.profile.data.interest)
				: [],
		education:
			details.profile &&
			details.profile.data.education &&
			Array.isArray(JSON.parse(details.profile.data.education))
				? JSON.parse(details.profile.data.education)
				: [],
		experience:
			details.profile &&
			details.profile.data.experience &&
			Array.isArray(JSON.parse(details.profile.data.experience))
				? JSON.parse(details.profile.data.experience)
				: [],
		current_address:
			details.profile && details.profile.data.current_address
				? details.profile.data.current_address
				: "",
		area:
			details.profile && details.profile.data.area
				? details.profile.data.area
				: "",
		city:
			details.profile && details.profile.data.city
				? details.profile.data.city
				: "",
		district:
			details.profile && details.profile.data.district
				? details.profile.data.district
				: "",
		state:
			details.profile && details.profile.data.state
				? details.profile.data.state
				: "",
		id_proof_type: "",
		id_proof_number: "",
		id_proof_path: null,
		password: "",
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

					return (
						<div>
							<CardHeader
								subheader="The information can be edited"
								title="Profile"
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
												Profile
											</Typography>
										</AccordionSummary>
										<AccordionDetails>
											<Grid container spacing={3}>
												<Grid item md={4} xs={12}>
													<Box margin={1}>
														<Field
															required
															onChange={handleChange}
															fullWidth
															component={CustomTextField}
															type="text"
															name="state"
															label="State"
															select
															variant="standard"
															helperText={
																props.errors.hasOwnProperty("state") &&
																props.errors["state"]
															}
															margin="normal"
															InputLabelProps={{
																shrink: true,
															}}
														>
															{states.map((option) => (
																<MenuItem key={option} value={option}>
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
															fullWidth
															component={CustomTextField}
															type="text"
															name="district"
															label="District"
															select
															variant="standard"
															helperText={
																props.errors.hasOwnProperty("district") &&
																props.errors["district"]
															}
															margin="normal"
															InputLabelProps={{
																shrink: true,
															}}
														>
															{district.map((option, index) => (
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
															fullWidth
															component={CustomTextField}
															type="text"
															name="city"
															label="City"
															select
															variant="standard"
															helperText={
																props.errors.hasOwnProperty("city") &&
																props.errors["city"]
															}
															margin="normal"
															InputLabelProps={{
																shrink: true,
															}}
														>
															{city.map((option, index) => (
																<MenuItem key={index} value={option}>
																	{option}
																</MenuItem>
															))}
														</Field>
													</Box>
												</Grid>
												<Grid item md={6} xs={12}>
													<Box margin={1}>
														<Field
															required
															fullWidth
															component={TextField}
															type="text"
															name="gender"
															label="Gender"
															select
															variant="standard"
															value={gender}
															helperText={
																props.errors.hasOwnProperty("gender") &&
																props.errors["gender"]
															}
															margin="dense"
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
												<Grid item md={6} xs={12}>
													<Field
														required
														fullWidth
														type="date"
														component={TextField}
														label=""
														helperText={
															props.errors.hasOwnProperty("dob") &&
															props.errors["dob"]
														}
														name="dob"
														onChange={handleChange}
														placeholder="Date of Birth"
														margin="dense"
													/>
												</Grid>

												<Grid item md={6} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															component={TextField}
															type="text"
															name="religion"
															label="Religion"
															select
															value={religion}
															variant="standard"
															helperText={
																props.errors.hasOwnProperty("religion") &&
																props.errors["religion"]
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
														<Field
															required
															fullWidth
															component={TextField}
															type="text"
															name="mother_tongue"
															label="Mother Tongue"
															select
															onChange={handleChange}
															variant="standard"
															helperText={
																props.errors.hasOwnProperty("mother_tongue") &&
																props.errors["mother_tongue"]
															}
															margin="dense"
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
												<Grid item md={6} xs={12}>
													<Box margin={1}>
														<InputLabel shrink={true} htmlFor="language_speak">
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
															{languages.map((option, index) => (
																<MenuItem key={index} value={option}>
																	{option}
																</MenuItem>
															))}
														</Field>
													</Box>
												</Grid>
												<Grid item md={6} xs={12}>
													<Box margin={1}>
														<InputLabel shrink={true} htmlFor="language_speak">
															Education
														</InputLabel>
														<Field
															fullWidth
															component={Select}
															type="text"
															name="education"
															label="Education"
															select
															multiple={true}
															onChange={handleChange}
															variant="standard"
															helperText={
																props.errors.hasOwnProperty("education") &&
																props.errors["education"]
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
															{education.map((option, index) => (
																<MenuItem key={index} value={option}>
																	{option}
																</MenuItem>
															))}
														</Field>
													</Box>
												</Grid>
												<Grid item md={6} xs={12}>
													<Box margin={1}>
														<InputLabel shrink={true} htmlFor="language_speak">
															Experience
														</InputLabel>
														<Field
															fullWidth
															component={Select}
															type="text"
															name="experience"
															label="Experience"
															select
															multiple={true}
															onChange={handleChange}
															variant="standard"
															helperText={
																props.errors.hasOwnProperty("experience") &&
																props.errors["experience"]
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
															{experience.map((option, index) => (
																<MenuItem key={index} value={option}>
																	{option}
																</MenuItem>
															))}
														</Field>
													</Box>
												</Grid>
												<Grid item md={12} xs={12}>
													<Box margin={1}>
														<InputLabel shrink={true} htmlFor="language_speak">
															Interests
														</InputLabel>
														<Field
															fullWidth
															component={Select}
															type="text"
															name="interest"
															helperText={
																props.errors.hasOwnProperty("interest") &&
																props.errors["interest"]
															}
															select
															multiple={true}
															onChange={handleChange}
															variant="standard"
															// helperText="Enter Language Speak"
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
														<Field
															fullWidth
															component={TextField}
															type="text"
															name="profession"
															label="Profession"
															variant="standard"
															helperText={
																props.errors.hasOwnProperty("profession") &&
																props.errors["profession"]
															}
															margin="dense"
														/>
													</Box>
												</Grid>
												<Grid item md={6} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															component={TextField}
															type="text"
															name="profession_details"
															label="Profession Details"
															variant="standard"
															helperText={
																props.errors.hasOwnProperty(
																	"profession_details"
																) && props.errors["profession_details"]
															}
															margin="dense"
														/>
													</Box>
												</Grid>
												<Grid item md={4} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															type="text"
															component={TextField}
															name="occupation"
															label="Occupation"
															select
															onChange={handleChange}
															variant="standard"
															helperText={
																props.errors.hasOwnProperty("id_proof_type") &&
																props.errors["id_proof_type"]
															}
															margin="dense"
														>
															{occupation.map((option, index) => (
																<MenuItem key={index} value={option}>
																	{option}
																</MenuItem>
															))}
														</Field>
													</Box>
												</Grid>
												<Grid item md={6} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															multiline={true}
															type="text"
															component={TextField}
															name="current_address"
															label="Present Address"
															onChange={handleChange}
															variant="standard"
															helperText={
																props.errors.hasOwnProperty(
																	"current_address"
																) && props.errors["current_address"]
															}
															margin="dense"
															inputprops={{
																inputComponent: TextareaAutosize,
																rows: 3,
															}}
														/>
													</Box>
												</Grid>
												<Grid item md={6} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															multiline
															type="text"
															component={TextField}
															name="area"
															label="Area"
															onChange={handleChange}
															variant="standard"
															helperText={
																props.errors.hasOwnProperty("area") &&
																props.errors["area"]
															}
															margin="normal"
														/>
													</Box>
												</Grid>
												{/* ID PROOOF FILE UPLOAD */}

												<Grid item md={4} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															type="text"
															component={TextField}
															name="id_proof_type"
															label="ID Proof Type"
															select
															onChange={handleChange}
															variant="standard"
															helperText={
																props.errors.hasOwnProperty("id_proof_type") &&
																props.errors["id_proof_type"]
															}
															margin="normal"
														>
															{idType.map((option, index) => (
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
															type="text"
															component={TextField}
															name="id_proof_number"
															label="Identity Number"
															onChange={handleChange}
															variant="standard"
															margin="normal"
														/>
													</Box>
												</Grid>
												<Grid item md={4} xs={12}>
													<Box margin={1}>
														<Field
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
												<Grid item md={12} xs={12}>
													<Box margin={1}>
														<Field
															required
															fullWidth
															type="password"
															component={TextField}
															label={
																details.login && details.login.mpin
																	? "M-PIN"
																	: "Password"
															}
															name="password"
															placeholder={
																details.login && details.login.mpin
																	? "Enter M-PIN"
																	: "Enter Password"
															}
														/>
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

ProfileForm.propTypes = {
	className: PropTypes.string,
};

export default withTranslation(["common"])(ProfileForm);
