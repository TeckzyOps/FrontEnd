import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Spinner from "../Spinner/spinner";
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

	const [values, setValues] = useState({});
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
		id_proof_type: Yup.string().required("Required"),
		id_proof_number: Yup.string().required("Required"),
		id_proof_path: Yup.mixed()
			.test(
				"fileSize",
				"File Size is too large",
				(value) => value.size <= 2000000
			)
			.test("fileType", "Unsupported File Format, Upload a PDF file", (value) =>
				["application/pdf"].includes(value.type)
			)
			.required("Required"),
	});

	React.useEffect(() => {
		if (localStorageService.getValue("userDetails")) {
			setStates(
				JSON.parse(LocalStorageService.getValue("userDetails"))["states"]
			);
		}
	}, []);
	React.useEffect(() => {
		if (localStorageService.getValue("loginDetails")) {
			setloginData(JSON.parse(LocalStorageService.getValue("loginDetails")));
		}
		if (localStorageService.getValue("userDetails")) {
			setValues(
				JSON.parse(LocalStorageService.getValue("userDetails"))["data"]
			);
		}
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
		gender: values.gender ? gender[parseInt(values.gender) - 1] : "", //Select
		dob: values.dob ? values.dob : "",
		religion: values.religion ? values.religion : "", //Select
		mother_tongue: values.mother_tongue ? values.mother_tongue : "", //Select
		profession: values.profession ? values.profession : "",
		profession_details: values.profession_details
			? values.profession_details
			: "",
		occupation: values.occupation ? values.occupation : "", //Select
		language_speak:
			values.language_speak && Array.isArray(JSON.parse(values.language_speak))
				? JSON.parse(values.language_speak)
				: [], //Select with multi
		interest:
			values.interest && Array.isArray(JSON.parse(values.interest))
				? JSON.parse(values.interest)
				: [],
		education:
			values.education && Array.isArray(JSON.parse(values.education))
				? JSON.parse(values.education)
				: [], //Select with multi
		experience:
			values.experience && Array.isArray(JSON.parse(values.experience))
				? JSON.parse(values.experience)
				: [], //Select with multi
		current_address: values.current_address ? values.current_address : "",
		area: values.area ? values.area : "",
		city: values.city ? values.city : "",
		district: values.district ? values.district : "",
		state: values.state ? values.state : "",
		id_proof_type: values.id_proof_type ? values.id_proof_type : "", //Select Pand Ad dl
		id_proof_number: values.id_proof_number ? values.id_proof_number : "",
		id_proof_path: null,
		password: "",
	};
	const _handleSubmit = ({ vals, setSubmitting, setFieldError }) => {
		console.log(values);
		let payload = new FormData();
		payload.append("id_proof_path", vals["id_proof_path"]);

		for (var i in vals) {
			if ((!values.hasOwnProperty(i) || vals[i] !== values[i]) && vals[i]) {
				if (i != "id_proof_path") {
					if (Array.isArray(vals[i])) {
						if (vals[i].length > 0) {
							payload.append(i, JSON.stringify(vals[i]));
						}
					} else {
						if (vals[i].toString().length > 0) {
							payload.append(i, vals[i]);
						}
					}
				}
			}
		}
		payload.append("login_id", loginData["id"].toString());
		if (payload) {
			profileActions
				.setUserProfileDetails(payload)
				.then(function (response) {
					console.log("ressss", response);
					if (response.data.input_error) {
						Object.keys(response.data.input_error).forEach((k) => {
							setFieldError(k, result[k][0]);
						});
					} else {
					}
				})
				.catch(function (error) {
					console.error("errrrr ", error);
				});
			console.log(payload);
		}
	};

	const handleChange = (e) => {
		console.log(e);

		switch (e.target.name) {
			case "state":
				profileActions
					.getDistrict(e.target.value)
					.then(function (response) {
						console.log("ressss", response);
						if (response.data.districts) {
							setDistrict(response.data.districts);
							// setError(response.data.input_error);
						}
					})
					.catch(function (error) {
						console.error("errrrr ", error);
					});
				break;
			case "district":
				profileActions
					.getCity(e.target.value)
					.then(function (response) {
						console.log("ressss", response);
						if (!response.data.input_error) {
							setCity(response.data.cities);
							// setError(response.data.input_error);
						}
					})
					.catch(function (error) {
						console.error("errrrr ", error);
					});
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
				validator={(e) => {
					console.error(e);
				}}
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
								<Form>
									<Accordion>
										<AccordionSummary
											expandIcon={<ExpandMoreIcon />}
											aria-controls="panel1c-content"
											id="panel1c-header"
										>
											<Typography className={classes.heading}>
												...Expand
											</Typography>
										</AccordionSummary>
										<AccordionDetails>
											<Grid container spacing={3}>
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
																<MenuItem key={option.id} value={option.id}>
																	{option.name}
																</MenuItem>
															))}
														</Field>
													</Box>
												</Grid>
												<Grid item md={4} xs={12}>
													<Box margin={1}>
														<Field
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
															{district.map((option) => (
																<MenuItem key={option.id} value={option.id}>
																	{option.name}
																</MenuItem>
															))}
														</Field>
													</Box>
												</Grid>
												<Grid item md={4} xs={12}>
													<Box margin={1}>
														<Field
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
															{city.map((option) => (
																<MenuItem key={option.id} value={option.id}>
																	{option.name}
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
																<MenuItem key={index} value={option}>
																	{option}
																</MenuItem>
															))}
														</Field>
													</Box>
												</Grid>
												<Grid item md={6} xs={12}>
													<Field
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
																		multiple
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
																			Upload {props.getFie}
																		</Button>
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
															fullWidth
															required
															type="password"
															component={TextField}
															label={
																loginData && loginData.mpin
																	? "M-PIN"
																	: "Password"
															}
															name="password"
															placeholder={
																loginData && loginData.mpin
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
											<Button onClick={props.resetForm} size="small">
												Reset To Default
											</Button>
											<Button type="submit" color="primary" variant="outlined">
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

export default ProfileForm;
