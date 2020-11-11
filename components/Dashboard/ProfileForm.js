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
import ListSubheader from "@material-ui/core/ListSubheader";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Tooltip from "@material-ui/core/Tooltip";
import { profileActions } from "../../_actions/profile.action";
import DateFnsUtils from "@date-io/date-fns";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core/styles";
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
import { states } from "~static/text/state";
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
import { useAuth } from "../provider/Auth";
import Cookies from "js-cookie";
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
	ListItemIcon,
	Button,
	InputAdornment,
	IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MuiTextField from "@material-ui/core/TextField";
import * as Yup from "yup";
let theme = createMuiTheme();
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
	headerBadge: {
		width: 30,
		height: 30,
		marginRight: 10,
		backgroundColor: theme.palette.primary.light,
	},
	labelRoot: {
		fontSize: 18,
		fontWeight: "bold",
	},
}));

const ProfileForm = (props) => {
	const { className, ...rest } = props;

	// const { loginDetails, user, updateUser } = useAuth();

	const classes = useStyles();
	const { t } = props;

	

	const { postloginsetToken } = useAuth();
	const [details, setDetails] = useState({});
	const [loginData, setloginData] = React.useState({});

	const [district, setDistrict] = useState([]);
	const [city, setCity] = useState([]);
	const [openselect, setopenselect] = useState(false);
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
	const postsetLoginData = (logindata) => {
		let det = {
			login: logindata,
			profile: {},
		};
		Cookies.set("Details", JSON.stringify(det));
		localStorageService.setValue("Details", JSON.stringify(det));
	};
	const postsetUserData = (userdata) => {
		let det = Cookies.getJSON("Details");
		if (!det) {
			det = localStorageService.getValue("Details");
		}
		det["profile"] = userdata;
		Cookies.set("Details", JSON.stringify(det));
		localStorageService.setValue("Details", JSON.stringify(det));
		setDetails(det);
	};
	React.useEffect(() => {
		setDetails(localStorageService.getUserDetails("Details"));
		profileActions
			.getUserProfileDetails()
			.then(function (response) {
				if (response.data) {
					postsetUserData(response.data);
				}
			})
			.catch(function (error) {
				console.error("errrrr ", error);
			});
		profileActions
			.getLoginDetails()
			.then(function (response) {
				if (response.data) {
					postsetLoginData(response.data.data);
				}
			})
			.catch(function (error) {
				console.error("errrrr ", error);
			});
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
				text="Your Profile Was Updated Successfully"
				submitButtonText="Done"
			/>
		);
	};

	const hideSelect = (event) => {
		event.nativeEvent.srcElement.hidden = true;
	};
	const initVals = {
		gender: !isNaN(props.getNested(details, "profile", "data", "gender"))
			? props.getNested(details, "profile", "data", "gender")
			: "",
		dob: props.getNested(details, "profile", "data", "dob")
			? props.getNested(details, "profile", "data", "dob")
			: "",
		religion: props.getNested(details, "profile", "data", "religion")
			? details.profile.data.religion
			: "",
		mother_tongue: props.getNested(details, "profile", "data", "mother_tongue")
			? details.profile.data.mother_tongue
			: "",
		profession: props.getNested(details, "profile", "data", "profession")
			? details.profile.data.profession
			: "",
		profession_details: props.getNested(
			details,
			"profile",
			"data",
			"profession_details"
		)
			? details.profile.data.profession_details
			: "",
		occupation: props.getNested(details, "profile", "data", "occupation")
			? details.profile.data.occupation
			: "",
		language_speak: props.getNested(
			details,
			"profile",
			"data",
			"language_speak"
		)
			? JSON.parse(details.profile.data.language_speak)
			: [],
		interest: props.getNested(details, "profile", "data", "interest")
			? JSON.parse(details.profile.data.interest)
			: [],
		education: props.getNested(details, "profile", "data", "education")
			? JSON.parse(details.profile.data.education)
			: [],
		experience: props.getNested(details, "profile", "data", "experience")
			? JSON.parse(props.getNested(details, "profile", "data", "experience"))
			: [],
		current_address: props.getNested(
			details,
			"profile",
			"data",
			"current_address"
		)
			? details.profile.data.current_address
			: "",
		area: props.getNested(details, "profile", "data", "area")
			? details.profile.data.area
			: "",
		city: props.getNested(details, "profile", "data", "city")
			? details.profile.data.city
			: "",
		district: props.getNested(details, "profile", "data", "district")
			? details.profile.data.district
			: "",
		state: props.getNested(details, "profile", "data", "state")
			? details.profile.data.state
			: "",
		id_proof_type: "",
		id_proof_number: "",
		id_proof_path: null,
		password: "",
	};
	function formatDate(date) {
		var d = new Date(date),
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		return [year, month, day].join("-");
	}
	const _handleSubmit = ({ vals, setSubmitting, resetForm, setFieldError }) => {
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
							setFieldError(k, response.data.input_error[k][0]);
						});
					}

					if (response.data.data.id) {
						setDetails({ ...details, ["profile"]: response.data });
						let det = localStorageService.getUserDetails("Details");
						det["profile"] = response.data;
						Cookies.set("Details", JSON.stringify(det));
						setProfileUpdateSuccess(true);
						localStorageService.setValue("Details", JSON.stringify(det));
						resetForm();
					}
				})
				.catch(function (error) {
					console.error("errrrr ", error);
					if (props.getNested(error, "response", "data", "input_error")) {
						Object.keys(error.response.data.input_error).forEach((k) => {
							setFieldError(k, error.response.data.input_error[k][0]);
						});
					}
				});
		}
	};

	const handleChange = (e) => {
		console.log(e);

		switch (e.target.name) {
			case "state":
				setDistrict(states[e.target.value]);
				setCity(null);
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

	const DatePickerField = ({ field, form, ...other }) => {
		const currentError = form.errors[field.name];

		return (
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardDatePicker
					clearable
					name={field.name}
					format="yyyy/MM/dd"
					style={{ width: "100%" }}
					value={field.value}
					helperText={currentError}
					error={Boolean(currentError)}
					onError={(error) => {
						// handle as a side effect
						if (error !== currentError) {
							form.setFieldError(field.name, error);
						}
					}}
					// if you are using custom validation schema you probably want to pass `true` as third argument
					onChange={(date) => form.setFieldValue(field.name, date, false)}
					{...other}
				/>
			</MuiPickersUtilsProvider>
		);
	};

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
							<Form autocomplete="off">
								<Accordion>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1c-content"
										id="panel1c-header"
									>
										<Avatar className={classes.headerBadge}>2</Avatar>

										<Typography className={classes.heading}>
											Please Fill Personal Other Details For Best Services
										</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Grid container spacing={3}>
											<Grid
												container
												direction="row"
												justify="center"
												alignItems="flex-end"
											>
												<Grid item md={6} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															component={TextField}
															type="text"
															name="gender"
															label="Gender"
															select
															onChange={handleChange}
															variant="outlined"
															helperText={
																props.errors.hasOwnProperty("gender") &&
																props.errors["gender"]
															}
															InputLabelProps={{
																classes: {
																	root: classes.labelRoot,
																},
															}}
														>
															<MenuItem
																value={props.values["gender"]}
																style={{
																	position: "sticky",
																	backgroundColor: "grey",
																	zIndex: 999,
																	top: 0,
																}}
															>
																<ListItemIcon>
																	<CloseIcon fontSize="small" />
																</ListItemIcon>
																<Typography variant="inherit">Close</Typography>
															</MenuItem>
															{gender.map((option, index) => (
																<MenuItem key={index} value={index + 1}>
																	{option}
																</MenuItem>
															))}
														</Field>
													</Box>
												</Grid>
												<Grid item md={6} xs={12}>
													<Box margin={1}>
														<Field
															fullwidth
															autoOk
															variant="inline"
															component={DatePickerField}
															name="dob"
															label="Date Of Birth"
															inputVariant="outlined"
															InputAdornmentProps={{ position: "start" }}
															helperText={
																props.errors.hasOwnProperty("dob") &&
																props.errors["dob"]
															}
															InputLabelProps={{
																classes: {
																	root: classes.labelRoot,
																},
															}}
														/>
													</Box>
												</Grid>
											</Grid>
											<Grid
												container
												direction="row"
												justify="center"
												alignItems="flex-end"
											>
												<Grid item md={4} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															component={TextField}
															type="text"
															name="mother_tongue"
															label="Preference Language"
															select
															onChange={handleChange}
															variant="outlined"
															helperText={
																props.errors.hasOwnProperty("mother_tongue") &&
																props.errors["mother_tongue"]
															}
															InputLabelProps={{
																classes: {
																	root: classes.labelRoot,
																},
															}}
														>
															<MenuItem
																value={props.values["mother_tongue"]}
																style={{
																	position: "sticky",
																	backgroundColor: "grey",
																	zIndex: 999,
																	top: 0,
																}}
															>
																<ListItemIcon>
																	<CloseIcon fontSize="small" />
																</ListItemIcon>
																<Typography variant="inherit">Close</Typography>
															</MenuItem>

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
															fullWidth
															component={Autocomplete}
															name="language_speak"
															multiple
															options={languages}
															getOptionLabel={(label) => label}
															renderInput={(params) => (
																<MuiTextField
																	{...params}
																	onChange={handleChange}
																	variant="outlined"
																	label="Language I Speak"
																	InputLabelProps={{
																		classes: {
																			root: classes.labelRoot,
																		},
																	}}
																	helperText={
																		props.errors.hasOwnProperty(
																			"language_speak"
																		) && props.errors["language_speak"]
																	}
																/>
															)}
														></Field>
													</Box>
												</Grid>
												<Grid item md={4} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															component={TextField}
															type="text"
															select
															name="religion"
															label="Religion"
															onChange={handleChange}
															variant="outlined"
															helperText={
																props.errors.hasOwnProperty("religion") &&
																props.errors["religion"]
															}
															InputLabelProps={{
																classes: {
																	root: classes.labelRoot,
																},
															}}
														>
															<MenuItem
																value={props.values["religion"]}
																style={{
																	position: "sticky",
																	backgroundColor: "grey",
																	zIndex: 999,
																	top: 0,
																}}
															>
																<ListItemIcon>
																	<CloseIcon fontSize="small" />
																</ListItemIcon>
																<Typography variant="inherit">Close</Typography>
															</MenuItem>
															{religion.map((option, index) => (
																<MenuItem key={index} value={option}>
																	{option}
																</MenuItem>
															))}
														</Field>
													</Box>
												</Grid>
											</Grid>
											<Grid
												container
												direction="row"
												justify="center"
												alignItems="flex-end"
											>
												<Grid item md={6} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															component={Autocomplete}
															name="experience"
															multiple
															options={experience}
															getOptionLabel={(label) => label}
															renderInput={(params) => (
																<MuiTextField
																	{...params}
																	onChange={handleChange}
																	variant="outlined"
																	label="Experience/Knowledge"
																	InputLabelProps={{
																		classes: {
																			root: classes.labelRoot,
																		},
																	}}
																	helperText={
																		props.errors.hasOwnProperty("experience") &&
																		props.errors["experience"]
																	}
																/>
															)}
														></Field>
													</Box>
												</Grid>
												<Grid item md={6} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															component={Autocomplete}
															name="interest"
															multiple
															options={interest}
															getOptionLabel={(label) => label}
															renderInput={(params) => (
																<MuiTextField
																	{...params}
																	onChange={handleChange}
																	variant="outlined"
																	label="Interests/Hobbies"
																	InputLabelProps={{
																		classes: {
																			root: classes.labelRoot,
																		},
																	}}
																	helperText={
																		props.errors.hasOwnProperty("interest") &&
																		props.errors["interest"]
																	}
																/>
															)}
														></Field>
													</Box>
												</Grid>

												<Grid item md={6} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															type="text"
															component={TextField}
															name="occupation"
															label="Employed in Occupation"
															select
															onChange={handleChange}
															variant="outlined"
															InputLabelProps={{
																classes: {
																	root: classes.labelRoot,
																},
															}}
															helperText={
																props.errors.hasOwnProperty("id_proof_type") &&
																props.errors["id_proof_type"]
															}
														>
															<MenuItem
																value={props.values["occupation"]}
																style={{
																	position: "sticky",
																	backgroundColor: "grey",
																	zIndex: 999,
																	top: 0,
																}}
															>
																<ListItemIcon>
																	<CloseIcon fontSize="small" />
																</ListItemIcon>
																<Typography variant="inherit">Close</Typography>
															</MenuItem>
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
															component={TextField}
															type="text"
															name="profession"
															label="Occupation Field"
															variant="outlined"
															InputLabelProps={{
																classes: {
																	root: classes.labelRoot,
																},
															}}
															select
															helperText={
																props.errors.hasOwnProperty("profession") &&
																props.errors["profession"]
															}
														>
															<MenuItem
																value={props.values["profession"]}
																style={{
																	position: "sticky",
																	backgroundColor: "grey",
																	zIndex: 999,
																	top: 0,
																}}
															>
																<ListItemIcon>
																	<CloseIcon fontSize="small" />
																</ListItemIcon>
																<Typography variant="inherit">Close</Typography>
															</MenuItem>
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
															component={TextField}
															type="text"
															name="lookingfor"
															label="Looking For Part Time Job"
															select
															disabled={true}
															onChange={handleChange}
															variant="outlined"
															defaultValue="Yes"
															helperText={
																props.errors.hasOwnProperty("lookingfor") &&
																props.errors["lookingfor"]
															}
															InputLabelProps={{
																classes: {
																	root: classes.labelRoot,
																},
															}}
														>
															{["Yes"].map((option, index) => (
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
															name="education"
															label="Education"
															select
															onChange={handleChange}
															variant="outlined"
															helperText={
																props.errors.hasOwnProperty("lookingfor") &&
																props.errors["lookingfor"]
															}
															InputLabelProps={{
																classes: {
																	root: classes.labelRoot,
																},
															}}
														>
															<MenuItem
																value={props.values["education"]}
																style={{
																	position: "sticky",
																	backgroundColor: "grey",
																	zIndex: 999,
																	top: 0,
																}}
															>
																<ListItemIcon>
																	<CloseIcon fontSize="small" />
																</ListItemIcon>
																<Typography variant="inherit">Close</Typography>
															</MenuItem>
															{education.map((option, index) => (
																<MenuItem key={index} value={option}>
																	{option}
																</MenuItem>
															))}
														</Field>
													</Box>
												</Grid>

												<Grid item xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															multiline
															rows={4}
															type="text"
															component={TextField}
															name="current_address"
															label="Present Address"
															onChange={handleChange}
															variant="outlined"
															InputLabelProps={{
																classes: {
																	root: classes.labelRoot,
																},
															}}
															helperText={
																props.errors.hasOwnProperty(
																	"current_address"
																) && props.errors["current_address"]
															}
															inputprops={{
																inputComponent: TextareaAutosize,
																rows: 3,
															}}
														/>
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
																classes: {
																	root: classes.labelRoot,
																},
															}}
														>
															<MenuItem
																value={props.values["state"]}
																style={{
																	position: "sticky",
																	backgroundColor: "grey",
																	zIndex: 999,
																	top: 0,
																}}
															>
																<ListItemIcon>
																	<CloseIcon fontSize="small" />
																</ListItemIcon>
																<Typography variant="inherit">Close</Typography>
															</MenuItem>
															{Object.keys(states).map((option) => (
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
																classes: {
																	root: classes.labelRoot,
																},
															}}
														>
															<MenuItem
																value={props.values["district"]}
																style={{
																	position: "sticky",
																	backgroundColor: "grey",
																	zIndex: 999,
																	top: 0,
																}}
															>
																<ListItemIcon>
																	<CloseIcon fontSize="small" />
																</ListItemIcon>
																<Typography variant="inherit">Close</Typography>
															</MenuItem>
															{props.values.state &&
																states[props.values.state].map(
																	(option, index) => (
																		<MenuItem key={index} value={option}>
																			{option}
																		</MenuItem>
																	)
																)}
														</Field>
													</Box>
												</Grid>
												<Grid item md={4} xs={12}>
													<Box margin={1}>
														<Field
															required
															fullWidth
															component={TextField}
															type="text"
															name="city"
															label="City"
															select
															variant="outlined"
															helperText={
																props.errors.hasOwnProperty("city") &&
																props.errors["city"]
															}
															margin="normal"
															InputLabelProps={{
																classes: {
																	root: classes.labelRoot,
																},
															}}
														>
															<MenuItem
																value={props.values["city"]}
																style={{
																	position: "sticky",
																	backgroundColor: "grey",
																	zIndex: 999,
																	top: 0,
																}}
															>
																<ListItemIcon>
																	<CloseIcon fontSize="small" />
																</ListItemIcon>
																<Typography variant="inherit">Close</Typography>
															</MenuItem>
															{props.values.district &&
																cities[props.values.district].map(
																	(option, index) => (
																		<MenuItem key={index} value={option}>
																			{option}
																		</MenuItem>
																	)
																)}
														</Field>
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
															label="Area/Locality"
															select
															onChange={handleChange}
															variant="outlined"
															InputLabelProps={{
																classes: {
																	root: classes.labelRoot,
																},
															}}
															helperText={
																props.errors.hasOwnProperty("area") &&
																props.errors["area"]
															}
															margin="normal"
														>
															<MenuItem
																value={props.values["area"]}
																style={{
																	position: "sticky",
																	backgroundColor: "grey",
																	zIndex: 999,
																	top: 0,
																}}
															>
																<ListItemIcon>
																	<CloseIcon fontSize="small" />
																</ListItemIcon>
																<Typography variant="inherit">Close</Typography>
															</MenuItem>
															{["Ghantaghar", "Premnagar"].map(
																(option, index) => (
																	<MenuItem key={index} value={option}>
																		{option}
																	</MenuItem>
																)
															)}
														</Field>
													</Box>
												</Grid>
												<Grid item md={6} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															multiline
															type="text"
															component={TextField}
															name="googlemap"
															label="Google Map Link"
															disabled={true}
															InputLabelProps={{
																classes: {
																	root: classes.labelRoot,
																},
															}}
															onChange={handleChange}
															variant="outlined"
															helperText={
																props.errors.hasOwnProperty("googlemap") &&
																props.errors["googlemap"]
															}
															margin="normal"
														/>
													</Box>
												</Grid>
												{/* ID PROOOF FILE UPLOAD */}

												<Grid item md={12} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															type="password"
															variant="outlined"
															component={TextField}
															InputLabelProps={{
																classes: {
																	root: classes.labelRoot,
																},
															}}
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
