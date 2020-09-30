import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { withTranslation } from "~/i18n";
import Alert from "./../../components/alert/alert";
import InputLabel from "@material-ui/core/InputLabel";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import MuiTextField from "@material-ui/core/TextField";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import UploadButton from "../Forms/reusable/UploadButton";

import {
	fieldToTextField,
	TextField,
	CheckboxWithLabel,
	TextFieldProps,
	Select,
	Switch,
} from "formik-material-ui";

import * as Yup from "yup";
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
const freelancerform = (props) => {
	const { className, ...rest } = props;
	const classes = useStyles();
	const { t } = props;
	const [states, setStates] = useState([]);
	const [district, setDistrict] = useState([]);
	const [city, setCity] = useState([]);
	const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);
	const uploader = (files) => {
		console.log("Upload ", files);
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

	const CustomSwitchInput = (props) => {
		const {
			form: { setFieldValue },
			field: { name },
			label,
		} = props;
		const onChange = React.useCallback(
			(event) => {
				const { value } = event.target;
				setFieldValue(name, value ? value : "");
				handleChange(event);
			},
			[setFieldValue, name]
		);
		return (
			<FormControlLabel
				value="end"
				control={<Switch {...props} color="primary" onChange={onChange} />}
				label={label}
				labelPlacement="end"
			/>
		);
	};
	const CustomUpladInput = (props) => {
		console.log(props);
		const {
			form: { setFieldValue },
			field: { name },
			label,
			fileTypes,
		} = props;
		const onChange = React.useCallback(
			(event) => {
				const { value } = event.target;
				setFieldValue(name, value ? value : "");
				handleChange(event);
			},
			[setFieldValue, name]
		);
		return (
			<UploadButton uploader={uploader} label={label} fileTypes={fileTypes} />
		);
	};

	const handleChange = (e) => {
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
		gst_file_path: null,
		license_file_path: null,
		certificate_file_path: null,
		advertisement_file_path: null,
		service_category: "",
		sub_service: "",
		business_name: "",
		total_experience: "",
		business_description: "",
		min_service_price: "",
		max_service_price: "",
		address: "",
		city: "",
		state: "",
		district: "",
		locality: "",
		office_map_link: "",
		office_number: "",
		catalog_pdf_match: "",
		offer_tagline: "",
		except_shadiwala_offer: "",
		shadiwala_offer_files: "",
		want_advertisement: "",
		comission_persent: "",
		min_comission: "",
		max_comission: "",
	};

	const profileSchema = Yup.object().shape({
		service_category: Yup.string().required("Required"),
		sub_service: Yup.string().required("Required"),
		business_name: Yup.string().required("Required"),
		business_description: Yup.string().required("Required"),
		total_experience: Yup.string().required("Required"),
		min_service_price: Yup.string().required("Required"),
		max_service_price: Yup.string().required("Required"),
		address: Yup.string().required("Required"),
		city: Yup.string().required("Required"),
		state: Yup.string().required("Required"),
		district: Yup.string().required("Required"),
		locality: Yup.string().required("Required"),
		office_map_link: Yup.string().required("Required"),
		office_number: Yup.string().required("Required"),
		catalog_pdf_match: Yup.string(),
		offer_tagline: Yup.string(),
		except_shadiwala_offer: Yup.string().required("Required"),
		shadiwala_offer_files: Yup.string().required("Required"),
		want_advertisement: Yup.string().required("Required"),
		comission_persent: Yup.string().required("Required"),
		min_comission: Yup.string().required("Required"),
		max_comission: Yup.string().required("Required"),
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
				"Unsupported File Format, Upload a PDF file",
				(value) => {
					if (value) {
						return ["application/pdf"].includes(value.type);
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
								subheader="Freelancer Application Form"
								title="Freelancer"
							/>
							<Divider />
							<CardContent>
								<Form autocomplete="off">
									<Accordion className="mb-4">
										<AccordionSummary
											expandIcon={<ExpandMoreIcon />}
											aria-controls="panel1c-content"
											id="panel1c-header"
										>
											<Typography className={classes.heading}>
												Account Details <CheckCircleIcon></CheckCircleIcon>
											</Typography>
										</AccordionSummary>
										<AccordionDetails></AccordionDetails>
									</Accordion>
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
												<Grid item md={12} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															component={TextField}
															type="text"
															name="business_name"
															label="Business Name"
															variant="standard"
															helperText={
																props.errors.hasOwnProperty("business_name") &&
																props.errors["business_name"]
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
															name="business_description"
															label="Business Description"
															onChange={handleChange}
															variant="standard"
															helperText={
																props.errors.hasOwnProperty(
																	"business_description"
																) && props.errors["business_description"]
															}
															margin="dense"
															inputprops={{
																inputComponent: TextareaAutosize,
																rows: 3,
															}}
														/>
													</Box>
												</Grid>

												<Grid item md={12} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															component={TextField}
															type="text"
															name="offer_tagline"
															label="Offer Tagline"
															variant="standard"
															helperText={
																props.errors.hasOwnProperty("offer_tagline") &&
																props.errors["offer_tagline"]
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
															name="total_experience"
															label="Total Experince"
															onChange={handleChange}
															variant="standard"
															margin="normal"
														/>
													</Box>
												</Grid>
												<Grid item md={4} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															type="text"
															component={TextField}
															name="min_service_price"
															label="Max Service Price"
															onChange={handleChange}
															variant="standard"
															margin="normal"
														/>
													</Box>
												</Grid>
												<Grid item md={4} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															type="text"
															component={TextField}
															name="max_service_price"
															label="Min Service Price"
															onChange={handleChange}
															variant="standard"
															margin="normal"
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
															onChange={handleChange}
															variant="standard"
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

												<Grid item md={12} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															type="text"
															component={TextField}
															name="office_map_link"
															label="Map  Link"
															onChange={handleChange}
															variant="standard"
															margin="normal"
														/>
													</Box>
												</Grid>

												<Grid item md={12} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															type="text"
															component={TextField}
															name="office_number"
															label="Office Number"
															onChange={handleChange}
															variant="standard"
															margin="normal"
														/>
													</Box>
												</Grid>
												<Grid item md={4} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															type="text"
															component={CustomSwitchInput}
															name="catalog_pdf_match"
															label="Catalog  Pdf"
															onChange={handleChange}
															variant="standard"
															margin="normal"
														></Field>
													</Box>
												</Grid>
												<Grid item md={4} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															type="text"
															component={CustomSwitchInput}
															name="except_shadiwala_offer"
															label="Except ShadiWala  Offer"
															onChange={handleChange}
															variant="standard"
															margin="normal"
														></Field>
													</Box>
												</Grid>
												<Grid item md={4} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															type="text"
															component={CustomSwitchInput}
															name="want_advertisement"
															label="Want Advertisement"
															onChange={handleChange}
															variant="standard"
															margin="normal"
														></Field>
													</Box>
												</Grid>

												<Grid item md={6} xs={12}>
													<Box margin={1}>
														<Field
															required
															onChange={handleChange}
															fullWidth
															component={CustomTextField}
															type="text"
															name="service_category"
															label="Services"
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
															{/* {states.map((option) => ( */}
															<MenuItem key="1" value="1">
																1
															</MenuItem>
															{/* ))} */}
														</Field>
													</Box>
												</Grid>
												<Grid item md={6} xs={12}>
													<Box margin={1}>
														<Field
															required
															onChange={handleChange}
															fullWidth
															component={CustomTextField}
															type="text"
															name="sub_service"
															label="Sub Services"
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
															{/* {states.map((option) => ( */}
															<MenuItem key="1" value="1">
																2
															</MenuItem>
															{/* ))} */}
														</Field>
													</Box>
												</Grid>

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

												<Grid item md={4} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															component={TextField}
															type="text"
															name="comission_persent"
															label="Comission Persent"
															variant="standard"
															helperText={
																props.errors.hasOwnProperty(
																	"comission_persent"
																) && props.errors["comission_persent"]
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
															type="text"
															name="min_comission"
															label="Min Comission"
															variant="standard"
															helperText={
																props.errors.hasOwnProperty("min_comission") &&
																props.errors["min_comission"]
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
															type="text"
															name="max_comission"
															label="Max Comission"
															variant="standard"
															helperText={
																props.errors.hasOwnProperty("max_comission") &&
																props.errors["max_comission"]
															}
															margin="dense"
														/>
													</Box>
												</Grid>

												{/* ID PROOOF FILE UPLOAD */}

												<Grid item md={4} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															type="text"
															component={CustomUpladInput}
															name="advertisement_file_path"
															label="Advertisement File"
															fileTypes={[".glb"]}
															onChange={handleChange}
															variant="standard"
															margin="normal"
														/>
													</Box>
												</Grid>
												<Grid item md={4} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															type="text"
															component={CustomUpladInput}
															name="gst_file_path"
															label="GST File"
															fileTypes={[".glb"]}
															onChange={handleChange}
															variant="standard"
															margin="normal"
														/>
													</Box>
												</Grid>
												<Grid item md={4} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															type="text"
															component={CustomUpladInput}
															name="license_file_path"
															label="Lisence File"
															fileTypes={[".glb"]}
															onChange={handleChange}
															variant="standard"
															margin="normal"
														/>
													</Box>
												</Grid>
												<Grid item md={4} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															type="text"
															component={CustomUpladInput}
															name="certificate_file_path"
															label="Certificate File"
															fileTypes={[".glb"]}
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

freelancerform.propTypes = {
	className: PropTypes.string,
};

export default withTranslation(["common"])(freelancerform);
