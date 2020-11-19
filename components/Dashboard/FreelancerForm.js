import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
	lighten,
	makeStyles,
	createMuiTheme,
	responsiveFontSizes,
	MuiThemeProvider,
} from "@material-ui/core/styles";
import { Formik, Field, Form, ErrorMessage } from "formik";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from "@material-ui/core/Avatar";
import { withTranslation } from "~/i18n";
import { withRouter } from "react-router";
import { useRouter } from "next/router";
import Alert from "./../../components/alert/alert";
import BookingModule from "./../../components/GenericPopup/BookingModule";
import FormContainer from "./../../components/Forms/FormContainer";
import routerLink from "~/static/text/link";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import MuiTextField from "@material-ui/core/TextField";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import UploadButton from "../Forms/reusable/UploadButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import { states } from "~static/text/state";
import { cities } from "~static/text/city";
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
import {
	fieldToTextField,
	TextField,
	CheckboxWithLabel,
	TextFieldProps,
	Select,
	Switch,
} from "formik-material-ui";
import FolderIcon from "@material-ui/icons/Folder";
import { freelancerForm } from "~static/FormData/freelancerForm.js";
import { freelancerProperietor } from "~static/FormData/form.js";
import * as Yup from "yup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Divider,
	Box,
	Grid,
	Link,
	MenuItem,
	Typography,
	Accordion,
	Container,
	Chip,
	useMediaQuery,
	Paper,
	Button,
	InputAdornment,
	IconButton,
} from "@material-ui/core";
import { freelancerActions } from "../../_actions/freelancer.action";
import LocalStorageService from "../../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(1),
	},
	demo: {
		backgroundColor: theme.palette.background.paper,
	},
	title: {
		margin: theme.spacing(4, 0, 2),
	},
	headerBadge: {
		width: 30,
		height: 30,
		marginRight: 10,
		backgroundColor: theme.palette.primary.light,
	},
}));
const freelancerform = (props) => {
	const { className, ...rest } = props;
	const classes = useStyles();

	const { t } = props;
	const [bookingPopup, setBookingPopup] = React.useState(false);
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
	const [docData, setDocData] = useState([]);
	const [details, setDetails] = React.useState({});
	const [properietor_details, setProperietorDetails] = React.useState({});
	const router = useRouter();
	const [docSelected, setDocSelected] = useState(0);
	const [freelancerData, setFreelancerData] = useState({
		service_category: "",
		sub_service: [],
		service_area: "",
		min_service_price: "",
		max_service_price: "",
		bussiness_name: "",
		bussiness_since: "",
		bussineess_description: "",
		address: "",
		state: "",
		district: "",
		city: "",
		area: "",
		offer_tagline: "",
		work_start_time: "",
		work_end_time: "",
		close_day: [],
		office_email: "",
		office_number: "",
		gst_no: "",
		commission_percent: "",
		commission_range: "",
		paid_leads: "",
	});

	const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);
	const [id, setId] = useState(props.router.query.id);

	React.useEffect(() => {
		setDetails(localStorageService.getUserDetails("Details"));
		let name = props.getNested(
			localStorageService.getUserDetails("Details"),
			"login",
			"name"
		);
		let email = props.getNested(
			localStorageService.getUserDetails("Details"),
			"login",
			"email"
		);
		let mobile = props.getNested(
			localStorageService.getUserDetails("Details"),
			"login",
			"mobile"
		);
		let religion = props.getNested(
			localStorageService.getUserDetails("Details"),
			"profile",
			"data",
			"religion"
		);
		let gender = props.getNested(
			localStorageService.getUserDetails("Details"),
			"profile",
			"data",
			"gender"
		);
		setProperietorDetails({
			name: name,
			email: email,
			mobile: mobile,
			religion: religion,
			gender: gender,
		});
		if (id) {
			freelancerActions
				.getFreelancer({ freelancer_id: id })
				.then(function (response) {
					console.log("ressss", response);

					if (response.data.data.id) {
						setFreelancerData(response.data.data);
					}
				})
				.catch(function (error) {
					console.error("errrrr ", error);
				});
		}
	}, []);
	const fileDropdown = {
		Catalog: "catalog_pdf_path",
		GST: "gst_file_path",
		"Shaadiwala Offer": "shaadiwala_offer_file",
		Advertisement: "advertisement_file_path",
		License: "license_file_path",
		Certificate: "certificate_file_path",
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

	const handleChange = (e) => {
		switch (e.target.name) {
			case "state":
				setDistrict(states[e.target.value]);
				break;
			case "district":
				profileActions;
				setCity(cities[e.target.value]);
				break;
		}
	};
	function deleteFile(doc, props) {
		const docs = docData.filter((obj) => obj.document !== doc);
		if (doc == "Advertisement") {
			props.setFieldValue("want_advertisement", "0");
		} else if (doc == "Shaadiwala Offer") {
			props.setFieldValue("except_shaadiwala_offer", "0");
		}
		setDocData(docs);
	}

	// function submitManually(payload, setSubmitting, resetForm, setFieldError){
	// 	if (payload) {
	// 		freelancerActions
	// 			.createFreelancer(payload)
	// 			.then(function (response) {
	// 				setSubmitting(false);
	// 				console.log("ressss", response);
	// 				if (response.data.data.id) {
	// 					setProfileUpdateSuccess(() => true);
	// 					resetForm();
	// 				}
	// 			})
	// 			.catch(function (error) {
	// 				setSubmitting(false);
	// 				if (error.response && error.response.data.input_error) {
	// 					Object.keys(error.response.data.input_error).forEach((k) => {
	// 						setFieldError(k, error.response.data.input_error[k][0]);
	// 					});
	// 				}
	// 				console.error("errrrr ", error);
	// 			});
	// 	}
	// }
	const _handleSubmit = ({
		values,
		setSubmitting,
		resetForm,
		setFieldError,
	}) => {
		let payload = new FormData();

		let proceed = false;
		let valKeyArr = Object.keys(values);
		for (var i = 0; i < valKeyArr.length; i++) {
			if (freelancerData[valKeyArr[i]] != values[valKeyArr[i]]) {
				proceed = true;
				break;
			}
		}

		if (proceed) {
			for (var i in values) {
				if (Array.isArray(values[i])) {
					if (values[i].length > 0) {
						payload.append(i, JSON.stringify(values[i]));
					}
				} else {
					payload.append(i, values[i] + "");
				}
			}
		}
		let want_advertisement = 0;
		let except_shaadiwala_offer = 0;
		// Object.keys(fileDropdown).forEach((dropdown) => {
		// 	payload.append(dropdown, freelancerData[fileDropdown[dropdown]]);
		// 	if (
		// 		dropdown == "Advertisement" &&
		// 		freelancerData[fileDropdown[dropdown]] != null
		// 	) {
		// 		want_advertisement = 1;
		// 	}
		// 	if (
		// 		dropdown == "Shaadiwala Offer" &&
		// 		freelancerData[fileDropdown[dropdown]] != null
		// 	) {
		// 		except_shaadiwala_offer = 1;
		// 	}
		// });

		// docData.forEach((data) => {
		// 	payload.set(fileDropdown[data.document], data.fileObject);
		// 	if (data.document == "Advertisement") {
		// 		want_advertisement = 1;
		// 	}
		// 	if (data.document == "Shaadiwala Offer") {
		// 		except_shaadiwala_offer = 1;
		// 	}
		// });

		// payload.append("want_advertisement", want_advertisement);
		// payload.append("except_shaadiwala_offer", except_shaadiwala_offer);
		// payload.delete("doc_type");
		if (id) {
			payload.append("freelancer_id", id);
		}

		if (payload) {
			freelancerActions
				.createFreelancer(payload, id)
				.then(function (response) {
					setSubmitting(false);
					console.log("ressss", response);
					if (response.data.data.id) {
						setId(id);
						setProfileUpdateSuccess(() => true);
						resetForm();
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
	};
	const _renderModal = () => {
		const onClick = () => {
			setProfileUpdateSuccess(() => false);
			router.push(routerLink.starter.freelancernew + "?id=" + id);
		};

		return (
			<Alert
				isOpen={profileUpdateSuccess}
				handleSubmit={onClick}
				title="Process Status"
				text="Operation Completed successfully"
				submitButtonText="Done"
			/>
		);
	};
	function validURL(str) {
		if (!str) {
			return false;
		}
		var pattern = new RegExp(
			"^(https?:\\/\\/)?" + // protocol
				"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
				"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
				"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
				"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
				"(\\#[-a-z\\d_]*)?$",
			"i"
		); // fragment locator
		return !!pattern.test(str);
	}
	const profileSchema = Yup.object().shape({
		service_category: Yup.string().required("Required"),
		sub_service: Yup.string().required("Required"),
		bussiness_name: Yup.string().required("Required"),
		bussineess_description: Yup.string().required("Required"),
		total_experience: Yup.number().required("Required"),
		min_service_price: Yup.string().required("Required"),
		max_service_price: Yup.string().required("Required"),
		address: Yup.string().required("Required"),
		city: Yup.string().required("Required"),
		state: Yup.string().required("Required"),
		district: Yup.string().required("Required"),
		locality: Yup.string().required("Required"),
		office_map_link: Yup.string().url().required("Required"),
		office_number: Yup.number().required("Required"),
		catalog_pdf_match: Yup.string(),
		offer_tagline: Yup.string(),
		shadiwala_offer_files: Yup.mixed()
			.test("filevalid", "Remote File Error", (value) => {
				if (null != value && !validURL(value)) {
					return false;
				}
				return true;
			})
			.test("fileSize", "File Size is too large", (value) => {
				if (null != value && value.size) {
					return value.size <= 2000000;
				}
				return true;
			})
			.test(
				"fileType",
				"Unsupported File Format, Upload a JPEG,JPG or PNG file",
				(value) => {
					if (null != value && value.type) {
						return ["image/png", "image/jpg", "image/jpeg"].includes(
							value.type
						);
					}
					return true;
				}
			),
		commission_percent: Yup.string().required("Required"),
		max_commission: Yup.string().required("Required"),
		max_commission: Yup.string().required("Required"),
		advertisement_file_path: Yup.mixed()
			.test("fileSize", "File Size is too large", (value) => {
				if (null != value && value.size) {
					return value.size <= 2000000;
				}
				return true;
			})
			.test(
				"fileType",
				"Unsupported File Format, Upload a JPEG,JPG or PNG file",
				(value) => {
					if (null != value && value.type) {
						return ["image/png", "image/jpg", "image/jpeg"].includes(
							value.type
						);
					}
					return true;
				}
			)
			.test("filevalid", "Remote File Error", (value) => {
				if (null != value && !validURL(value)) {
					return false;
				}
				return true;
			}),
		gst_file_path: Yup.mixed()
			.test("filevalid", "Remote File Error", (value) => {
				if (null != value && !validURL(value)) {
					return false;
				}
				return true;
			})
			.test("fileSize", "File Size is too large", (value) => {
				if (null != value && value.size) {
					return value.size <= 2000000;
				}
				return true;
			})
			.test(
				"fileType",
				"Unsupported File Format, Upload a PDF file",
				(value) => {
					if (null != value && value.type) {
						return ["application/pdf"].includes(value.type);
					}
					return true;
				}
			),
		license_file_path: Yup.mixed()
			.test("filevalid", "Remote File Error", (value) => {
				if (null != value && !validURL(value)) {
					return false;
				}
				return true;
			})
			.test("fileSize", "File Size is too large", (value) => {
				if (null != value && value.size) {
					return value.size <= 2000000;
				}
				return true;
			})
			.test(
				"fileType",
				"Unsupported File Format, Upload a PDF file",
				(value) => {
					if (null != value && value.type) {
						return ["application/pdf"].includes(value.type);
					}
					return true;
				}
			),
		certificate_file_path: Yup.mixed()

			.test("filevalid", "Remote File Error", (value) => {
				if (null != value && !validURL(value)) {
					return false;
				}
				return true;
			})
			.test("fileSize", "File Size is too large", (value) => {
				if (null != value && value.size) {
					return value.size <= 2000000;
				}
				return true;
			})
			.test(
				"fileType",
				"Unsupported File Format, Upload a PDF file",
				(value) => {
					if (null != value && value.type) {
						return ["application/pdf"].includes(value.type);
					}
					return true;
				}
			),
	});

	function getFileLink(fileObject) {
		let reader = new FileReader();

		if (fileObject) {
			reader.readAsDataURL(fileObject);
			reader.onloadend = () => {
				var anchor = document.createElement("a");
				anchor.href = reader.result;
				anchor.target = "_blank";

				anchor.click();
				window.open(reader.result, "_blank");
			};
		}
	}
	function search(nameKey, myArray) {
		if (!nameKey || !myArray) {
			return false;
		}
		for (var i = 0; i < myArray.length; i++) {
			if (myArray[i].document === nameKey) {
				return true;
			}
		}
		return false;
	}
	const fileOnChange = (event, formprops, field) => {
		if (search(formprops.values["doc_type"], docData)) {
			return;
		}
		if (formprops.values["doc_type"] && event.currentTarget.files) {
			if (formprops.values["doc_type"] == "Advertisement") {
				formprops.setFieldValue("want_advertisement", "1");
			} else if (formprops.values["doc_type"] == "Shaadiwala Offer") {
				formprops.setFieldValue("except_shaadiwala_offer", "1");
			}
			setDocData(
				docData.concat({
					document: formprops.values["doc_type"],
					name: event.currentTarget.files[0].name,
					type: event.currentTarget.files[0].type,
					size: (event.currentTarget.files[0].size / (1024 * 1024)).toFixed(2),
					fileObject: event.currentTarget.files[0],
				})
			);
		}
	};
	return (
		<div {...rest} className={clsx(classes.root, className)}>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<Accordion disabled={details == null}>
						<AccordionSummary
							expandIcon={<ArrowForwardIcon />}
							aria-controls="panel1c-content"
							id="panel1c-header"
						>
							<Avatar className={classes.headerBadge}>1</Avatar>

							<Typography>Proprietor Detail (Do Not Edit)</Typography>
						</AccordionSummary>
						<FormContainer
							elements={freelancerProperietor}
							defaultvals={properietor_details}
						/>
					</Accordion>
				</Grid>
				<Grid item xs={12}>
					<Accordion>
						<AccordionSummary
							expandIcon={<ArrowForwardIcon />}
							aria-controls="panel1c-content"
							id="panel1c-header"
						>
							<Avatar className={classes.headerBadge}>2</Avatar>

							<Typography gutterBottom>
								Tell Us About Your Profession
							</Typography>
						</AccordionSummary>
						<FormContainer
							btn={{ label: "Submit" }}
							onSubmit={_handleSubmit}
							elements={freelancerForm}
							defaultvals={freelancerData}
						/>
					</Accordion>
					<div>
						{/* <Formik
							enableReinitialize
							initialValues={freelancerData}
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
													<Typography gutterBottom>
														Tell Us About Your Profession
													</Typography>
												</AccordionSummary>
												<AccordionDetails>
													<Grid container spacing={3}>
														<Grid item xs={12}>
															<Typography
																align="center"
																variant="h6"
																gutterBottom
															>
																Tell us about the service you provide!
															</Typography>
														</Grid>
														<Grid item md={4} xs={12}>
															<Box margin={1}>
																<Field
																	onChange={handleChange}
																	fullWidth
																	component={TextField}
																	type="text"
																	name="service_category"
																	label="Service Category"
																	select
																	variant="outlined"
																	helperText={
																		props.errors.hasOwnProperty(
																			"service_category"
																		) && props.errors["service_category"]
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
																	name="sub_service"
																	label="Sub Service"
																	select
																	variant="outlined"
																	helperText={
																		props.errors.hasOwnProperty(
																			"sub_service"
																		) && props.errors["sub_service"]
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
																	name="service_area"
																	label="Service Area"
																	select
																	variant="outlined"
																	helperText={
																		props.errors.hasOwnProperty(
																			"service_area"
																		) && props.errors["service_area"]
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
														<Grid item xs={6}>
															<Typography variant="body2" gutterBottom>
																Service Price Range
															</Typography>
															<div style={{ marginBottom: 20 }}>
																<div>
																	<Grid container spacing={2}>
																		<Grid item xs={6}>
																			<Field
																				variant="outlined"
																				fullWidth
																				label="Minimum"
																				component={TextField}
																				onChange={handleChange}
																				name="min_service_price"
																				helperText={
																					props.errors.hasOwnProperty(
																						"min_service_price"
																					) && props.errors["min_service_price"]
																				}
																				type="text"
																				style={{ marginRight: 10 }}
																			/>
																		</Grid>
																		<Grid item xs={6}>
																			<Field
																				variant="outlined"
																				fullWidth
																				label="Maximum"
																				component={TextField}
																				onChange={handleChange}
																				type="text"
																				name="max_service_price"
																				helperText={
																					props.errors.hasOwnProperty(
																						"max_service_price"
																					) && props.errors["max_service_price"]
																				}
																				style={{ marginRight: 10 }}
																			/>
																		</Grid>
																	</Grid>
																</div>
															</div>
														</Grid>
														<Grid item xs={12}>
															<Typography
																align="center"
																variant="h6"
																gutterBottom
															>
																Tell us about your bussiness!
															</Typography>
														</Grid>

														<Grid item md={12} xs={12}>
															<Box margin={1}>
																<Field
																	fullWidth
																	component={TextField}
																	onChange={handleChange}
																	type="text"
																	name="bussiness_name"
																	label="Business Name"
																	variant="outlined"
																	helperText={
																		props.errors.hasOwnProperty(
																			"bussiness_name"
																		) && props.errors["bussiness_name"]
																	}
																	margin="dense"
																/>
															</Box>
														</Grid>

														<Grid item md={12} xs={12}>
															<Box margin={1}>
																<Field
																	fullWidth
																	multiline={true}
																	type="text"
																	component={TextField}
																	multiline
																	rows={4}
																	name="bussineess_description"
																	label="Business Description"
																	onChange={handleChange}
																	variant="outlined"
																	helperText={
																		props.errors.hasOwnProperty(
																			"bussineess_description"
																		) && props.errors["bussineess_description"]
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
																	component={TextField}
																	onChange={handleChange}
																	type="text"
																	name="offer_tagline"
																	label="Offer Tagline"
																	variant="outlined"
																	helperText={
																		props.errors.hasOwnProperty(
																			"offer_tagline"
																		) && props.errors["offer_tagline"]
																	}
																	margin="dense"
																/>
															</Box>
														</Grid>

														<Grid item md={6} xs={12}>
															<Box margin={1}>
																<Field
																	fullWidth
																	type="text"
																	component={TextField}
																	name="total_experience"
																	label="Total Experince"
																	onChange={handleChange}
																	variant="outlined"
																	helperText={
																		props.errors.hasOwnProperty(
																			"offer_tagline"
																		) && props.errors["offer_tagline"]
																	}
																	margin="dense"
																/>
															</Box>
														</Grid>

														<Grid item md={12} xs={12}>
															<Box margin={1}>
																<Field
																	fullWidth
																	multiline={true}
																	type="text"
																	component={TextField}
																	name="address"
																	label="Business Address"
																	multiline
																	rows={4}
																	onChange={handleChange}
																	variant="outlined"
																	helperText={
																		props.errors.hasOwnProperty("address") &&
																		props.errors["address"]
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
																	type="text"
																	component={TextField}
																	name="office_map_link"
																	label="Map Link"
																	onChange={handleChange}
																	variant="outlined"
																	margin="normal"
																/>
															</Box>
														</Grid>

														<Grid item md={6} xs={12}>
															<Box margin={1}>
																<Field
																	fullWidth
																	type="text"
																	component={TextField}
																	name="office_number"
																	label="Office Number"
																	onChange={handleChange}
																	variant="outlined"
																	margin="normal"
																/>
															</Box>
														</Grid>

														<Grid item md={4} xs={12}>
															<Box margin={1}>
																<Field
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
																		shrink: true,
																	}}
																>
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
																	fullWidth
																	component={TextField}
																	onChange={handleChange}
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
																	{props.values["state"] &&
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
																	fullWidth
																	component={TextField}
																	onChange={handleChange}
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
																		shrink: true,
																	}}
																>
																	{props.values["district"] &&
																		cities[props.values["district"]].map(
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
																	fullWidth
																	component={TextField}
																	onChange={handleChange}
																	type="text"
																	name="locality"
																	label="Locality"
																	variant="outlined"
																	helperText={
																		props.errors.hasOwnProperty("locality") &&
																		props.errors["locality"]
																	}
																	margin="dense"
																/>
															</Box>
														</Grid>

														<Grid item md={4} xs={12}>
															<Box margin={1}>
																<Field
																	fullWidth
																	component={TextField}
																	onChange={handleChange}
																	type="text"
																	name="commission_percent"
																	label="Comission Persent"
																	variant="outlined"
																	select
																	helperText={
																		props.errors.hasOwnProperty(
																			"commission_percent"
																		) && props.errors["commission_percent"]
																	}
																	margin="dense"
																>
																	{["10%", "15%", "20%"].map(
																		(option, index) => (
																			<MenuItem key={index} value={index + 1}>
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
																	fullWidth
																	component={TextField}
																	onChange={handleChange}
																	type="text"
																	name="min_commission"
																	label="Min Comission"
																	variant="outlined"
																	helperText={
																		props.errors.hasOwnProperty(
																			"min_commission"
																		) && props.errors["min_commission"]
																	}
																	margin="dense"
																/>
															</Box>
														</Grid>
														<Grid item md={4} xs={12}>
															<Box margin={1}>
																<Field
																	fullWidth
																	component={TextField}
																	onChange={handleChange}
																	type="text"
																	name="max_commission"
																	label="Max Comission"
																	variant="outlined"
																	helperText={
																		props.errors.hasOwnProperty(
																			"max_commission"
																		) && props.errors["max_commission"]
																	}
																	margin="dense"
																/>
															</Box>
														</Grid>

														<Grid item xs={12}>
															<TableContainer component={Paper}>
																<Grid
																	container
																	direction="row"
																	justify="flex-start"
																	alignItems="flex-end"
																>
																	<Grid item xs={6}>
																		<Box margin={1}>
																			<Field
																				onChange={handleChange}
																				fullWidth
																				component={TextField}
																				type="text"
																				name="doc_type"
																				label="Choose Document To Upload"
																				select
																				variant="outlined"
																				helperText={
																					props.errors.hasOwnProperty(
																						"doc_type"
																					) && props.errors["doc_type"]
																				}
																				margin="normal"
																				InputLabelProps={{
																					shrink: true,
																				}}
																			>
																				{[
																					"",
																					"Catalog",
																					"GST",
																					"Shaadiwala Offer",
																					"Advertisement",
																					"License",
																					"Certificate",
																				].map((option, index) => (
																					<MenuItem key={index} value={option}>
																						{option}
																					</MenuItem>
																				))}
																			</Field>
																		</Box>
																	</Grid>
																	<Grid item xs={6}>
																		<Box margin={1}>
																			<Field
																				name="doc"
																				margin="normal"
																				label="Upload Document"
																				className={
																					"form-check-input " +
																					(props.errors["document"] &&
																					props.touched["document"]
																						? " is-invalid"
																						: "")
																				}
																			>
																				{({ field, form, meta }) => (
																					<div>
																						<input
																							id={field.name}
																							onClick="this.value = null"
																							style={{ display: "none" }}
																							name={field.name}
																							type="file"
																							onChange={(event) =>
																								fileOnChange(
																									event,
																									props,
																									field
																								)
																							}
																						/>
																						<label htmlFor={field.name}>
																							<Button
																								disabled={
																									form.values["doc_type"] ==
																										null ||
																									search(
																										props.values["doc_type"],
																										docData
																									)
																								}
																								variant="contained"
																								color="primary"
																								component="span"
																							>
																								Choose
																							</Button>
																						</label>
																					</div>
																				)}
																			</Field>
																		</Box>
																	</Grid>
																</Grid>
																<Table
																	className={classes.table}
																	aria-label="simple table"
																>
																	<TableHead>
																		<TableRow>
																			<TableCell>Document</TableCell>
																			<TableCell align="right">
																				File Name
																			</TableCell>
																			<TableCell align="right">
																				File Size
																			</TableCell>
																			<TableCell align="right">
																				File Type
																			</TableCell>
																			<TableCell align="right"></TableCell>
																		</TableRow>
																	</TableHead>
																	<TableBody>
																		{docData.map((row) => (
																			<TableRow key={row.name}>
																				<TableCell component="th" scope="row">
																					{row.document}
																				</TableCell>
																				<TableCell
																					onClick={() =>
																						getFileLink(row.fileObject)
																					}
																					align="right"
																				>
																					{row.name}
																				</TableCell>
																				<TableCell align="right">
																					{row.size}MB
																				</TableCell>
																				<TableCell align="right">
																					{row.type}
																				</TableCell>
																				<TableCell align="right">
																					<IconButton
																						onClick={() =>
																							deleteFile(row.document, props)
																						}
																					>
																						<DeleteIcon />
																					</IconButton>
																				</TableCell>
																			</TableRow>
																		))}
																		{Object.keys(fileDropdown).map((obj) => {
																			if (
																				props.errors.hasOwnProperty(
																					fileDropdown[obj]
																				)
																			) {
																				return (
																					<TableRow>
																						<TableCell style={{ color: "red" }}>
																							Error [{obj}]
																						</TableCell>
																						<TableCell
																							style={{ color: "red" }}
																							align="left"
																						>
																							{props.errors[fileDropdown[obj]]}
																						</TableCell>
																					</TableRow>
																				);
																			}
																		})}
																	</TableBody>
																</Table>
															</TableContainer>
														</Grid>
													</Grid>
												</AccordionDetails>
												<Divider />
												<AccordionActions>
													<Grid container justify="right" item xs={12}>
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
									</div>
								);
							}}
						</Formik> */}
					</div>
				</Grid>
				<Grid item xs={12}>
					<Accordion expanded={false} disabled={props.router.query.id == null}>
						<AccordionSummary
							expandIcon={<ArrowForwardIcon />}
							aria-controls="panel1c-content"
							id="panel1c-header"
						>
							<Avatar className={classes.headerBadge}>3</Avatar>

							<Typography>Update Catalog Format</Typography>
						</AccordionSummary>
					</Accordion>
				</Grid>

				<Grid item xs={12}>
					<Link
						style={{ textDecoration: "none", color: "black" }}
						href={routerLink.starter.freelancerImg + "?id=" + id}
					>
						<Accordion
							expanded={false}
							disabled={props.router.query.id == null}
						>
							<AccordionSummary
								expandIcon={<ArrowForwardIcon />}
								aria-controls="panel1c-content"
								id="panel1c-header"
							>
								<Avatar className={classes.headerBadge}>4</Avatar>

								<Typography>Update Photo Gallery</Typography>
							</AccordionSummary>
						</Accordion>
					</Link>
				</Grid>
				<Grid item xs={12}>
					<Link
						style={{ textDecoration: "none", color: "black" }}
						href={routerLink.starter.freelancerVids + "?id=" + id}
					>
						<Accordion
							expanded={false}
							disabled={props.router.query.id == null}
						>
							<AccordionSummary
								expandIcon={<ArrowForwardIcon />}
								aria-controls="panel1c-content"
								id="panel1c-header"
							>
								<Avatar className={classes.headerBadge}>5</Avatar>

								<Typography>Update Video Gallery</Typography>
							</AccordionSummary>
						</Accordion>
					</Link>
				</Grid>
				<Grid item xs={12}>
					<Accordion
						onClick={() => setBookingPopup(true)}
						expanded={false}
						disabled={props.router.query.id == null}
					>
						<AccordionSummary
							expandIcon={<ArrowForwardIcon />}
							aria-controls="panel1c-content"
							id="panel1c-header"
						>
							<Avatar className={classes.headerBadge}>6</Avatar>
							<Typography>Booking Calendar</Typography>
						</AccordionSummary>
					</Accordion>
				</Grid>
				<Grid item xs={12}>
					<Accordion expanded={false} disabled={props.router.query.id == null}>
						<AccordionSummary
							expandIcon={<ArrowForwardIcon />}
							aria-controls="panel1c-content"
							id="panel1c-header"
						>
							<Avatar className={classes.headerBadge}>7</Avatar>

							<Typography>Update Advertise Status</Typography>
						</AccordionSummary>
					</Accordion>
				</Grid>
				<Grid item xs={12}>
					<Accordion expanded={false} disabled={props.router.query.id == null}>
						<AccordionSummary
							expandIcon={<ArrowForwardIcon />}
							aria-controls="panel1c-content"
							id="panel1c-header"
						>
							<Avatar className={classes.headerBadge}>8</Avatar>

							<Typography>Only Use in Profession KYC</Typography>
						</AccordionSummary>
					</Accordion>
				</Grid>
			</Grid>

			{_renderModal()}
			<Dialog
				fullWidth
				fullScreen={fullScreen}
				maxWidth={"md"}
				open={bookingPopup}
				onClose={() => setBookingPopup(false)}
				aria-labelledby="max-width-dialog-title"
			>
				<DialogTitle id="max-width-dialog-title">Booking Calendar</DialogTitle>
				<DialogContent>
					<BookingModule
						apifor="freelancer"
						booking_id={props.router.query.id}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setBookingPopup(false)} color="primary">
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

freelancerform.propTypes = {
	className: PropTypes.string,
};

export default withRouter(withTranslation(["common"])(freelancerform));
