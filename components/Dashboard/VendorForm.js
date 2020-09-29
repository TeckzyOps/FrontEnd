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
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { withTranslation } from "~/i18n";
import { withRouter } from "react-router";
import { useRouter } from "next/router";
import Alert from "./../../components/alert/alert";
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
import { state } from "~static/text/state";
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
import * as Yup from "yup";
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
	Chip,
	Paper,
	Button,
	InputAdornment,
	IconButton,
} from "@material-ui/core";
import { vendorActions } from "../../_actions/vendor.action";
import LocalStorageService from "../../_services/LocalStorageService";
import "~/vendors/responsive-table.css";
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
}));
const vendorform = (props) => {
	const { className, ...rest } = props;
	const classes = useStyles();

	const { t } = props;

	const [docData, setDocData] = useState([]);
	const [details, setDetails] = React.useState({});
	const router = useRouter();
	const [docSelected, setDocSelected] = useState(0);
	const [vendorData, setVendorData] = useState({
		gst_file_path: null,
		license_file_path: null,
		certificate_file_path: null,
		advertisement_file_path: null,
		service_category: "",
		sub_service: "",
		bussiness_name: "",
		total_experience: "",
		bussineess_description: "",
		min_service_price: "",
		max_service_price: "",
		address: "",
		city: "",
		state: "",
		district: "",
		service_area: "",
		locality: "",
		office_map_link: "",
		office_number: "",
		catalog_pdf_match: "",
		offer_tagline: "",
		shadiwala_offer_files: "",
		commission_percent: "",
		min_commission: "",
		max_commission: "",
	});

	const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);
	const id = props.router.query.id;
	React.useEffect(() => {
		setDetails(localStorageService.getUserDetails("Details"));
		if (id) {
			vendorActions
				.getVendor({ vendor_id: id })
				.then(function (response) {
					console.log("ressss", response);

					if (response.data.data.id) {
						setVendorData(response.data.data);
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
				setDistrict(state[e.target.value]);
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
	// 		vendorActions
	// 			.createvendor(payload)
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
	const _handleSubmit = ({ vals, setSubmitting, resetForm, setFieldError }) => {
		let payload = new FormData();

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
		let want_advertisement = 0;
		let except_shaadiwala_offer = 0;
		// Object.keys(fileDropdown).forEach((dropdown) => {
		// 	payload.append(dropdown, vendorData[fileDropdown[dropdown]]);
		// 	if (
		// 		dropdown == "Advertisement" &&
		// 		vendorData[fileDropdown[dropdown]] != null
		// 	) {
		// 		want_advertisement = 1;
		// 	}
		// 	if (
		// 		dropdown == "Shaadiwala Offer" &&
		// 		vendorData[fileDropdown[dropdown]] != null
		// 	) {
		// 		except_shaadiwala_offer = 1;
		// 	}
		// });

		docData.forEach((data) => {
			payload.set(fileDropdown[data.document], data.fileObject);
			if (data.document == "Advertisement") {
				want_advertisement = 1;
			}
			if (data.document == "Shaadiwala Offer") {
				except_shaadiwala_offer = 1;
			}
		});

		payload.append("want_advertisement", want_advertisement);
		payload.append("except_shaadiwala_offer", except_shaadiwala_offer);
		payload.delete("doc_type");
		if (payload) {
			vendorActions
				.createVendor(payload)
				.then(function (response) {
					setSubmitting(false);
					console.log("ressss", response);
					if (response.data.data.id) {
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
			router.push(routerLink.starter.vendorVids + "?id=" + id);
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
			.test("fileSize", "File Size is too large", (value) => {
				if (value) {
					return value.size <= 2000000;
				} else {
					return true;
				}
			})
			.test(
				"fileType",
				"Unsupported File Format, Upload a JPEG,JPG or PNG file",
				(value) => {
					if (value) {
						return ["image/png", "image/jpg", "image/jpeg"].includes(
							value.type
						);
					} else {
						return true;
					}
				}
			),
		commission_percent: Yup.string().required("Required"),
		max_commission: Yup.string().required("Required"),
		max_commission: Yup.string().required("Required"),
		advertisement_file_path: Yup.mixed()
			.test("fileSize", "File Size is too large", (value) => {
				if (value) {
					return value.size <= 2000000;
				} else {
					return true;
				}
			})
			.test(
				"fileType",
				"Unsupported File Format, Upload a JPEG,JPG or PNG file",
				(value) => {
					if (value) {
						return ["image/png", "image/jpg", "image/jpeg"].includes(
							value.type
						);
					} else {
						return true;
					}
				}
			),
		gst_file_path: Yup.mixed()
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
		license_file_path: Yup.mixed()
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
		certificate_file_path: Yup.mixed()
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
				<Grid item md={4} xs={12}>
					<Card>
						<CardContent>
							<Typography gutterBottom variant="h6">
								{details.login ? details.login.name : ""}
							</Typography>

							<Typography color="textPrimary" variant="body1">
								{details.login ? details.login.mobile : ""}
							</Typography>

							<Typography color="textPrimary" variant="body1">
								{details.login ? details.login.email : ""}
							</Typography>

							<Divider />
							<MuiThemeProvider theme={theme}>
								<Typography variant="h6" className={classes.title}>
									Uploaded Documents
								</Typography>
							</MuiThemeProvider>
							<Divider />

							<List dense={true}>
								{Object.keys(fileDropdown).map((title, index) => {
									if (vendorData[fileDropdown[title]] != null) {
										return (
											<ListItem key={index}>
												<ListItemAvatar>
													<Avatar>
														<FolderIcon />
													</Avatar>
												</ListItemAvatar>

												<ListItemText
													target="_blank"
													href={vendorData[fileDropdown[title]]}
													primary={title}
												/>

												<ListItemSecondaryAction>
													<IconButton
														edge="end"
														aria-label="comments"
														onClick={() =>
															setVendorData({
																...vendorData,
																[fileDropdown[title]]: null,
															})
														}
													>
														<DeleteIcon />
													</IconButton>
												</ListItemSecondaryAction>
											</ListItem>
										);
									}
									return null;
								})}
							</List>
						</CardContent>
						<Divider />
						{id && (
							<CardActions>
								<Link
									style={{ textDecoration: "none" }}
									href={
										routerLink.starter.vendorVids +
										"?id" +
										props.router.query.id
									}
								>
									<Button variant="text">
										<MuiThemeProvider theme={theme}>
											<Typography variant="button">Upload Videos</Typography>
										</MuiThemeProvider>
									</Button>
								</Link>
								<Link
									style={{ textDecoration: "none" }}
									href={
										routerLink.starter.vendorImg + "?id" + props.router.query.id
									}
								>
									<Button variant="text">
										<MuiThemeProvider theme={theme}>
											<Typography variant="button">Upload Images</Typography>
										</MuiThemeProvider>
									</Button>
								</Link>
							</CardActions>
						)}
					</Card>

					<Grid item md={4} xs={12}>
						<div className={classes.demo}></div>
					</Grid>
				</Grid>

				<Grid item md={8} xs={12}>
					<div>
						<Formik
							enableReinitialize
							initialValues={vendorData}
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
									<Card>
										<CardContent>
											<Grid container spacing={1}>
												<Grid item xs={12}>
													<Typography
														color="primary"
														variant="h3"
														align="center"
														gutterBottom
													>
														Vendor Application Form
													</Typography>
												</Grid>
											</Grid>

											<Divider />

											<Form autocomplete="off">
												<br></br>
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
																	props.errors.hasOwnProperty("sub_service") &&
																	props.errors["sub_service"]
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
																	props.errors.hasOwnProperty("service_area") &&
																	props.errors["service_area"]
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
													<Grid item xs={12}>
														<Typography variant="body2" gutterBottom>
															Service Price
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
																{Object.keys(state).map((option) => (
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
																	state[props.values.state].map(
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
																{["10%", "15%", "20%"].map((option, index) => (
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
																<Grid item md={6} xs={12}>
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
																<Grid item md={6} xs={12}>
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
																							fileOnChange(event, props, field)
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

													<Grid item xs={12}>
														<Divider />

														<Grid container justify="right">
															<Grid item xs={12}>
																{!props.isSubmitting ? (
																	<Button
																		onClick={props.resetForm}
																		size="small"
																	>
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
														</Grid>
													</Grid>
												</Grid>
											</Form>
										</CardContent>
									</Card>
								);
							}}
						</Formik>
					</div>
				</Grid>
			</Grid>

			{_renderModal()}
		</div>
	);
};

export default withRouter(withTranslation(["common"])(vendorform));
