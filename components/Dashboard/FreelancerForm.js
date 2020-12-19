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
import { freelancerProperietor } from "~static/FormData/freelancerForms.js";
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
	labelRoot: {
		fontSize: 18,
		fontWeight: "bold",
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
	const [kycData, setKycData] = useState({
		id_proof_path: null,
		id_proof_type: "",
		id_proof_number: "",
		fill_id_number: "",
		kyc_otp: "",
	});
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
		commission_range: "",
		paid_leads: "",
	});

	const [catalogFile, setCatalogFile] = useState({
		visbility: null,
		catalog_path: null,
	});
	const [showCatalogForm, setshowCatalogForm] = useState(false);
	const [profileUpdateSuccess, setProfileUpdateSuccess] = useState({
		open: false,
		title: "",
		text: "",
		submitText: "",
		submitURL: null,
	});
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
						setCatalogFile(response.data.data.catalog_pdf_path);
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
		if (values.catalog_pdf_path) {
			payload.append("catalog_pdf_path", values.catalog_pdf_path);
			proceed = true;
		} else {
			let valKeyArr = Object.keys(values);
			for (var i = 0; i < valKeyArr.length; i++) {
				if (freelancerData[valKeyArr[i]] != values[valKeyArr[i]]) {
					proceed = true;
					break;
				}
			}
			if (proceed) {
				for (var i in values) {
					if (i != "agreement") {
						if (Array.isArray(values[i])) {
							if (values[i].length > 0) {
								payload.append(i, JSON.stringify(values[i]));
							}
						} else {
							payload.append(i, values[i] + "");
						}
					}
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
		if (proceed) {
			if (payload) {
				freelancerActions
					.createFreelancer(payload, id)
					.then(function (response) {
						setSubmitting(false);
						console.log("ressss", response);
						if (response.data.data.id) {
							setId(id);
							setProfileUpdateSuccess({
								open: true,
								title: "Operation Status",
								text: "Operation Completed Successfully",
								submitText: "Done",
								submitURL:
									routerLink.starter.freelancernew +
									"?id=" +
									response.data.data.id,
							});
							setCatalogFile(response.data.data.catalog_pdf_path);
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
		} else {
			setProfileUpdateSuccess({
				open: true,
				title: "Operation Status",
				text: "No Need to submit unchanged form",
				submitText: "Ok",
				submitURL: null,
			});
			setSubmitting(false);
		}
	};

	const convertto24 = (time) => {
		var hours = Number(time.match(/^(\d+)/)[1]);
		var minutes = Number(time.match(/:(\d+)/)[1]);
		var AMPM = time.match(/\s(.*)$/)[1];
		if (AMPM == "PM" && hours < 12) hours = hours + 12;
		if (AMPM == "AM" && hours == 12) hours = hours - 12;
		var sHours = hours.toString();
		var sMinutes = minutes.toString();
		if (hours < 10) sHours = "0" + sHours;
		if (minutes < 10) sMinutes = "0" + sMinutes;
		return sHours + ":" + sMinutes;
	};

	function isLater(time1, time2) {
		return convertto24(time1) > convertto24(time2);
	}
	const _renderModal = () => {
		const onClick = () => {
			setProfileUpdateSuccess(() => false);
			if (profileUpdateSuccess.submitURL != null) {
				router.push(profileUpdateSuccess.submitURL);
				//
			}
		};

		return (
			<Alert
				isOpen={profileUpdateSuccess.open}
				handleSubmit={onClick}
				title={profileUpdateSuccess.title}
				text={profileUpdateSuccess.text}
				submitButtonText={profileUpdateSuccess.submitText}
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
	function GetFilename(url) {
		if (url) {
			var m = url.toString().match(/.*\/(.+?)\./);
			if (m && m.length > 1) {
				return m[1];
			}
		}
		return "";
	}

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
							expandIcon={<ExpandMoreIcon />}
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
							expandIcon={<ExpandMoreIcon />}
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
				</Grid>
				<Grid item xs={12}>
					<Accordion disabled={props.router.query.id == null}>
						<AccordionSummary
							expandIcon={<ArrowForwardIcon />}
							aria-controls="panel1c-content"
							id="panel1c-header"
						>
							<Avatar className={classes.headerBadge}>3</Avatar>

							<Typography>Update Catalog Format</Typography>
						</AccordionSummary>

						<Formik
							enableReinitialize
							initialValues={{
								catalog_pdf_path: null,
							}}
							validationSchema={Yup.object().shape({
								catalog_pdf_path: Yup.mixed()
									.test("fileSize", "File Size is too large", (value) => {
										if (null != value && value.size) {
											return value.size <= 2000000;
										}
										return true;
									})
									.test(
										"fileType",
										"Unsupported File Format, Upload a JPEG,JPG,PNG or PDF file",
										(value) => {
											if (null != value && value.type) {
												return [
													"image/png",
													"image/jpg",
													"image/jpeg",
													"application/pdf",
												].includes(value.type);
											}
											return true;
										}
									),
							})}
							onSubmit={(values, { setSubmitting, resetForm, setFieldError }) =>
								_handleSubmit({
									values,
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
									setFieldValue,
									handleChange,
									isSubmitting,
									resetForm,
								} = formprops;
								console.log("ERROR", formprops);
								// setshowCatalogForm(catalogFile.catalog_path == null);
								return (
									<Form>
										<Grid
											container
											direction="row"
											justify="center"
											alignItems="center"
										>
											<Grid item xs={12}>
												<Divider variant="middle" flexItem />
												<Typography variant="h5">Catalog File :</Typography>

												{null != catalogFile && (
													<Link
														href={catalogFile.catalog_path}
														target="_blank"
														rel="noreferrer"
														variant="body2"
													>
														{catalogFile.catalog_path.split("/").pop()}
													</Link>
												)}

												<Button
													variant="contained"
													onClick={setshowCatalogForm(true)}
													color="primary"
												>
													Change File
												</Button>
											</Grid>

											<Grid item xs={12}>
												<Box margin={1}>
													<Field
														name="catalog_pdf_path"
														margin="normal"
														label="Upload Catalog"
														className={
															"form-check-input " +
															(errors["document"] && touched["document"]
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
																	onChange={(event) => {
																		setFieldValue(
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
																		Choose Catalog File
																	</Button>
																</label>
															</div>
														)}
													</Field>

													{errors.hasOwnProperty("catalog_pdf_path") && (
														<div style={{ color: "red" }} component="div">
															{errors["catalog_pdf_path"]}
														</div>
													)}
												</Box>
												{values.catalog_pdf_path && (
													<Box>
														<table
															style={{
																borderCollapse: "collapse",
																borderSpacing: 0,
																width: "100%",
																border: "1px solid #ddd",
															}}
														>
															<thead>
																<tr>
																	<th>File Name</th>
																	<th>File Type</th>
																	<th>File Size</th>
																</tr>
															</thead>
															<tbody>
																<tr>
																	<td>
																		{props.getNested(
																			formprops,
																			"values",
																			"catalog_pdf_path"
																		) && values.catalog_pdf_path.name}
																	</td>
																	<td>
																		{props.getNested(
																			formprops,
																			"values",
																			"catalog_pdf_path"
																		) && values.catalog_pdf_path.type}
																	</td>
																	<td>
																		{props.getNested(
																			formprops,
																			"values",
																			"catalog_pdf_path"
																		) && values.catalog_pdf_path.size + "MB"}
																	</td>
																</tr>
															</tbody>
														</table>
													</Box>
												)}
											</Grid>

											<Divider />

											<Grid container justify="flex-end">
												{!isSubmitting ? (
													<Button onClick={resetForm} size="small">
														Reset To Default
													</Button>
												) : (
													t("common:cant_revert")
												)}
												<Button
													disable={isSubmitting}
													type="submit"
													color="primary"
													variant="outlined"
												>
													Save details
												</Button>
											</Grid>
										</Grid>
									</Form>
								);
							}}
						</Formik>
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
					<Accordion expanded={false} disabled={true}>
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
					<Accordion disabled={props.router.query.id == null}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1c-content"
							id="panel1c-header"
						>
							<Avatar className={classes.headerBadge}>8</Avatar>

							<Typography>Only Use in Profession KYC</Typography>
						</AccordionSummary>

						<Formik
							enableReinitialize
							initialValues={kycData}
							validationSchema={Yup.object().shape({
								id_proof_type: Yup.string().required("Required"),
								id_proof_number: Yup.string().required("Required"),
								fill_id_number: Yup.string().required("Required"),
								kyc_otp: Yup.string().required("Required"),
							})}
							// onSubmit={(vals, { setSubmitting, resetForm, setFieldError }) =>
							// 	_handleSubmit({
							// 		vals,
							// 		setSubmitting,
							// 		resetForm,
							// 		setFieldError,
							// 	})
							// }
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
								} = formprops;

								return (
									<div>
										<Form autocomplete="off">
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
															InputLabelProps={{
																classes: {
																	root: classes.labelRoot,
																},
															}}
															helperText={
																formprops.errors.hasOwnProperty(
																	"id_proof_type"
																) && formprops.errors["id_proof_type"]
															}
															margin="dense"
														>
															{[
																"License",
																"Certificate",
																"PAN Card",
																"Registration",
																"Other",
															].map((option, index) => (
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
													<Grid item md={8} xs={12}>
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
																InputLabelProps={{
																	classes: {
																		root: classes.labelRoot,
																	},
																}}
															/>
														</Box>
													</Grid>
													<Grid item md={4} xs={12}>
														<Box margin={1}>
															<Field
																margin="dense"
																name="id_proof_path"
																label="Upload Document"
																InputLabelProps={{
																	classes: {
																		root: classes.labelRoot,
																	},
																}}
																className={
																	"form-check-input " +
																	(formprops.errors["id_proof_path"] &&
																	formprops.touched["id_proof_path"]
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
																				formprops.setFieldValue(
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
															{formprops.errors.hasOwnProperty(
																"id_proof_path"
															) && (
																<div style={{ color: "red" }} component="div">
																	{formprops.errors["id_proof_path"]}
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
															name="fill_id_number"
															label="Fill ID Number"
															onChange={handleChange}
															variant="outlined"
															margin="dense"
															InputLabelProps={{
																classes: {
																	root: classes.labelRoot,
																},
															}}
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
															name="kyc_otp"
															label="Enter OTP"
															onChange={handleChange}
															variant="outlined"
															margin="dense"
															InputLabelProps={{
																classes: {
																	root: classes.labelRoot,
																},
															}}
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

											<Divider />

											<Grid container justify="flex-end">
												{!formprops.isSubmitting ? (
													<Button onClick={formprops.resetForm} size="small">
														Reset To Default
													</Button>
												) : (
													t("common:cant_revert")
												)}
												<Button
													disable={formprops.isSubmitting}
													type="submit"
													color="primary"
													variant="outlined"
												>
													Save details
												</Button>
											</Grid>
										</Form>
									</div>
								);
							}}
						</Formik>
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
						editMode={true}
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
