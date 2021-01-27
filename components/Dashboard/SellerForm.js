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
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from "@material-ui/core/Avatar";
import { withTranslation } from "~/i18n";
import { withRouter } from "react-router";
import { useRouter } from "next/router";
import Alert from "./../../components/alert/alert";
import BookingModule from "./../../components/GenericPopup/BookingModule";
import FormContainer from "./../../components/Forms/FormContainer";
import routerLink from "~/static/text/link";
import {
	fieldToTextField,
	TextField,
	CheckboxWithLabel,
	TextFieldProps,
	Select,
	Switch,
} from "formik-material-ui";
import { sellerForm } from "~static/FormData/sellerForms/";
import { Properietor } from "~static/FormData/properietor.js";
import * as Yup from "yup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
	FormHelperText,
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
import { sellerActions } from "../../_actions/seller.action";
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
const SellerForm = (props) => {
	const { className, ...rest } = props;
	const classes = useStyles();

	const { t } = props;
	const [bookingPopup, setBookingPopup] = React.useState(false);
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
	const [docData, setDocData] = useState([]);
	const [details, setDetails] = React.useState({});
	const [properietor_details, setProperietorDetails] = React.useState({});
	const router = useRouter();
	const [kycData, setKycData] = useState({
		id_proof_path: null,
		id_proof_type: "",
		id_proof_number: "",
		fill_id_number: "",
		kyc_otp: "",
	});
	const [sellerData, setSellerData] = useState({
		service_category: null,
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
	const [couponFile, setCouponFile] = useState({
		visbility: null,
		product_coupon_path: null,
		product_coupon_number: null,
	});

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
			sellerActions
				.getSeller({ seller_id: id })
				.then(function (response) {
					console.log("ressss", response);

					if (response.data.data.id) {
						setSellerData(response.data.data);
						setCatalogFile(response.data.data.catalog_pdf_path);
						let coupon = props.getNested(
							response,
							"data",
							"data",
							"product_coupon_path"
						);
						if (coupon) {
							setCouponFile({
								visbility: coupon.visbility,
								product_coupon_path: coupon.catalog_path,
								product_coupon_number: props.getNested(
									response,
									"data",
									"data",
									"product_coupon_number"
								),
							});
						}
					}
				})
				.catch(function (error) {
					console.error("errrrr ", error);
				});
		}
	}, []);

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
		} else if (values.product_coupon_path) {
			payload.append("product_coupon_path", values.product_coupon_path);
			payload.append("product_coupon_number", values.product_coupon_number);
			proceed = true;
		} else {
			delete values["catalog_pdf_path"];

			let valKeyArr = Object.keys(values);
			for (var i = 0; i < valKeyArr.length; i++) {
				if (
					null != values[valKeyArr[i]] &&
					sellerData[valKeyArr[i]] != values[valKeyArr[i]]
				) {
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
		if (id) {
			payload.append("seller_id", id);
		}
		if (proceed) {
			if (payload) {
				sellerActions
					.createSeller(payload, id)
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
									routerLink.starter.sellernew + "?id=" + response.data.data.id,
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
				// router.push(profileUpdateSuccess.submitURL);
				window.location.href = profileUpdateSuccess.submitURL;
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

	const helperElement = (prop) => {
		let show = id;
		return (
			<Grid item xs={12}>
				<Box margin={1}>
					<Field
						required
						type={show ? "hidden" : "checkbox"}
						component={show ? null : CheckboxWithLabel}
						disabled={show}
						name={"agreement"}
						indeterminate={false}
						Label={{
							label: <span>Online/Offline KYC Request send to Indianwala</span>,
						}}
						onChange={prop.handleChange}
					/>

					<FormHelperText error>
						{prop.prop.errors &&
							prop.prop.errors.hasOwnProperty("accept") &&
							prop.prop.errors["accept"]}
					</FormHelperText>
				</Box>
			</Grid>
		);
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
							elements={Properietor}
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

							<Typography gutterBottom>Tell Us About Your Bussiness</Typography>
						</AccordionSummary>
						<FormContainer
							btn={{ label: "Submit" }}
							onSubmit={_handleSubmit}
							elements={sellerForm}
							defaultvals={sellerData}
							helperEle={helperElement}
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

								// setshowCatalogForm(catalogFile.catalog_path == null);
								return (
									<Form>
										<Grid
											container
											direction="row"
											justify="center"
											alignItems="center"
										>
											<Grid
												container
												direction="row"
												justify="center"
												alignItems="center"
												item
												xs={12}
											>
												<Divider variant="middle" flexItem />
												<Typography variant="h5">Catalog File :</Typography>

												{null != catalogFile &&
													null != catalogFile.catalog_path && (
														<Link
															href={catalogFile.catalog_path}
															target="_blank"
															rel="noreferrer"
															variant="body2"
														>
															{catalogFile.catalog_path.split("/").pop()}
														</Link>
													)}
											</Grid>

											<Grid
												container
												direction="row"
												justify="center"
												alignItems="center"
												item
												xs={12}
											>
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
											</Grid>

											<Grid
												container
												justify="center"
												alignItems="center"
												item
												xs={12}
											>
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
														<p style={{ color: "red" }}>
															All the documents uploaded will go under a review
															process which takes maximum 72 hours.{" "}
														</p>
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
					<Accordion disabled={props.router.query.id == null}>
						<AccordionSummary
							expandIcon={<ArrowForwardIcon />}
							aria-controls="panel1c-content"
							id="panel1c-header"
						>
							<Avatar className={classes.headerBadge}>4</Avatar>

							<Typography>Update Offers Coupon</Typography>
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

								// setshowCatalogForm(catalogFile.catalog_path == null);
								return (
									<Form>
										<Grid
											container
											direction="row"
											justify="center"
											alignItems="center"
										>
											<Grid
												container
												direction="row"
												justify="center"
												alignItems="center"
												item
												xs={12}
											>
												<Divider variant="middle" flexItem />
												<Typography variant="h5">
													Offer Coupon File :
												</Typography>

												{null != couponFile &&
													null != couponFile.product_coupon_path && (
														<Link
															href={couponFile.product_coupon_path}
															target="_blank"
															rel="noreferrer"
															variant="body2"
														>
															{couponFile.product_coupon_number}
														</Link>
													)}
											</Grid>

											<Grid
												container
												direction="column"
												justify="center"
												alignItems="center"
												item
												xs={12}
											>
												<Box margin={1}>
													<Field
														name="product_coupon_number"
														margin="normal"
														placeholder="Title"
														variant="outlined"
														component={TextField}
														fullWidth
													/>
												</Box>
												<Box margin={1}>
													<Field
														name="product_coupon_path"
														margin="normal"
														label="Upload Offers Coupon"
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
																		Choose Offers Coupon File
																	</Button>
																</label>
															</div>
														)}
													</Field>

													{errors.hasOwnProperty("product_coupon_path") && (
														<div style={{ color: "red" }} component="div">
															{errors["product_coupon_path"]}
														</div>
													)}
												</Box>
											</Grid>

											<Grid
												container
												justify="center"
												alignItems="center"
												item
												xs={12}
											>
												{values.product_coupon_path && (
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
																			"product_coupon_path"
																		) && values.product_coupon_path.name}
																	</td>
																	<td>
																		{props.getNested(
																			formprops,
																			"values",
																			"product_coupon_path"
																		) && values.product_coupon_path.type}
																	</td>
																	<td>
																		{props.getNested(
																			formprops,
																			"values",
																			"product_coupon_path"
																		) && values.product_coupon_path.size + "MB"}
																	</td>
																</tr>
															</tbody>
														</table>
														<p style={{ color: "red" }}>
															All the documents uploaded will go under a review
															process which takes maximum 72 hours.{" "}
														</p>
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
						href={routerLink.starter.sellerImg + "?id=" + id}
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

								<Typography>Update Photo Gallery</Typography>
							</AccordionSummary>
						</Accordion>
					</Link>
				</Grid>
				<Grid item xs={12}>
					<Link
						style={{ textDecoration: "none", color: "black" }}
						href={routerLink.starter.sellerVids + "?id=" + id}
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
								<Avatar className={classes.headerBadge}>6</Avatar>

								<Typography>Update Video Gallery</Typography>
							</AccordionSummary>
						</Accordion>
					</Link>
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
			{/* <Dialog
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
						apifor="vendor"
						booking_id={props.router.query.id}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setBookingPopup(false)} color="primary">
						Close
					</Button>
				</DialogActions>
			</Dialog> */}
		</div>
	);
};

SellerForm.propTypes = {
	className: PropTypes.string,
};

export default withRouter(withTranslation(["common"])(SellerForm));
