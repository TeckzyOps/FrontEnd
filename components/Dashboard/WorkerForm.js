import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
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
import { workerActions } from "../../_actions/worker.action";
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		margin: 0,
	},
	demo: {
		backgroundColor: theme.palette.background.paper,
	},
	title: {
		margin: theme.spacing(4, 0, 2),
	},
}));
const workerform = (props) => {
	const { className, ...rest } = props;
	const classes = useStyles();

	const { t } = props;

	const [docData, setDocData] = useState([]);
	const router = useRouter();
	const [docSelected, setDocSelected] = useState(0);
	const [workerData, setWorkerData] = useState({
		license_file_path: null,
		service_category: "",
		sub_service: "",
		alternate_number: "",
		total_experience: "",
		bussineess_description: "",
		working_address: "",
		present_working: "",
		city: "",
		state: "",
		district: "",
		service_area: "",
		salary_per_day: "",
		salary_per_month: "",
		google_location: "",
		work_prefer: "",
		noc_file_path: "",
	});

	const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);
	const id = props.router.query.id;
	React.useEffect(() => {
		if (props.router.query.id) {
			workerActions
				.getWorker({ worker_id: props.router.query.id })
				.then(function (response) {
					console.log("ressss", response);

					if (response.data.data.id) {
						setWorkerData(response.data.data);
					}
				})
				.catch(function (error) {
					console.error("errrrr ", error);
				});
		}
	}, []);
	const fileDropdown = {
		"NOC Document": "noc_file_path",
		"License Document": "license_file_path",
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
			// case "city":
			// 	text = "How you like them apples?";
			// 	break;
		}
	};
	function deleteFile(doc, props) {
		const docs = docData.filter((obj) => obj.document !== doc);
		setDocData(docs);
	}
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
		// Object.keys(fileDropdown).forEach((dropdown) => {
		// 	payload.append(dropdown, workerData[fileDropdown[dropdown]]);
		// 	if (
		// 		dropdown == "Advertisement" &&
		// 		workerData[fileDropdown[dropdown]] != null
		// 	) {
		// 		want_advertisement = 1;
		// 	}
		// 	if (
		// 		dropdown == "Shaadiwala Offer" &&
		// 		workerData[fileDropdown[dropdown]] != null
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
		if (id) {
			payload.append("freelancer_id", id);
		}
		if (payload) {
			workerActions
				.createWorker(payload)
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
			router.push(routerLink.starter.workerVids + "?id=" + id);
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
		alternate_number: "",
		total_experience: "",
		bussineess_description: "",
		working_address: Yup.string().required("Required"),
		present_working: Yup.string().required("Required"),
		city: Yup.string().required("Required"),
		state: Yup.string().required("Required"),
		district: Yup.string().required("Required"),
		service_area: Yup.string().required("Required"),
		salary_per_day: Yup.string().required("Required"),
		salary_per_month: Yup.string().required("Required"),
		google_location: Yup.string(),
		work_prefer: Yup.string().required("Required"),
		noc_file_path: Yup.mixed()
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
		<Card {...rest} className={clsx(classes.root, className)}>
			<Grid container spacing={4}>
				<Grid item lg={4} md={4} xl={4} xs={12}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Link href={routerLink.starter.workerVids}>
								<Button variant="contained" color="primary">
									Upload Videos
								</Button>
							</Link>
						</Grid>

						<Grid item xs={12}>
							<Link href={routerLink.starter.workerImg}>
								<Button variant="contained" color="primary">
									Upload Images
								</Button>
							</Link>
						</Grid>
					</Grid>

					<Grid item xs={12} md={6}>
						<Typography variant="h6" className={classes.title}>
							Uploaded Documents
						</Typography>
						<div className={classes.demo}>
							<List dense={true}>
								{Object.keys(fileDropdown).map((title, index) => {
									if (workerData[fileDropdown[title]] != null) {
										return (
											<ListItem>
												<ListItemAvatar>
													<Avatar>
														<FolderIcon />
													</Avatar>
												</ListItemAvatar>
												<div
													key={index}
													target="_blank"
													href={workerData[fileDropdown[title]]}
												>
													<ListItemText primary={title} />
												</div>
												<ListItemSecondaryAction>
													<IconButton
														edge="end"
														aria-label="comments"
														onClick={() =>
															setWorkerData({
																...workerData,
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
						</div>
					</Grid>
				</Grid>
				{/* <AccountProfile
							logindata={props.logindata}
							userdata={props.userdata}
						/> */}

				<Grid item lg={8} md={8} xl={8} xs={12}>
					<div>
						<Formik
							enableReinitialize
							initialValues={workerData}
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
										<Grid container spacing={3}>
											<Grid item xs={12}>
												<Typography
													color="primary"
													variant="h3"
													align="center"
													gutterBottom
												>
													Worker Application Form
												</Typography>
											</Grid>
										</Grid>

										<Divider />

										<Form autocomplete="off">
											<br></br>
											<Grid container spacing={3}>
												<Grid item xs={12}>
													<Typography align="center" variant="h6" gutterBottom>
														Tell us about the service you provide!
													</Typography>
												</Grid>

												<Grid item md={4} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															component={TextField}
															type="number"
															name="alternate_number"
															label="Alternate Contact No."
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
															required
															onChange={handleChange}
															fullWidth
															component={TextField}
															type="text"
															name="present_working"
															label="Are You Working Presently?"
															select
															variant="standard"
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
															{["No", "Yes"].map((option, index) => (
																<MenuItem key={index} value={index}>
																	{option}
																</MenuItem>
															))}
														</Field>
													</Box>
												</Grid>
												<Grid item xs={12}>
													<Typography align="center" variant="h6" gutterBottom>
														Tell us about your bussiness!
													</Typography>
												</Grid>
												<Grid item md={4} xs={12}>
													<Box margin={1}>
														<Field
															required
															onChange={handleChange}
															fullWidth
															component={TextField}
															type="text"
															name="service_category"
															label="Service Category"
															select
															variant="standard"
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
															required
															onChange={handleChange}
															fullWidth
															component={TextField}
															type="text"
															name="sub_service"
															label="Sub Service"
															select
															variant="standard"
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
															required
															onChange={handleChange}
															fullWidth
															component={TextField}
															type="text"
															name="service_area"
															label="Service Area"
															select
															variant="standard"
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

												<Grid item md={12} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															multiline={true}
															type="text"
															component={TextField}
															name="work_address"
															label="Work Address"
															multiline
															rows={4}
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

												<Grid item md={6} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															type="text"
															component={TextField}
															name="google_location"
															label="Map Link"
															onChange={handleChange}
															variant="standard"
															margin="normal"
														/>
													</Box>
												</Grid>

												<Grid item md={6} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															type="number"
															component={TextField}
															name="salary_per_month"
															label="Salary (Monthly)"
															onChange={handleChange}
															variant="standard"
															margin="normal"
														/>
													</Box>
												</Grid>
												<Grid item md={6} xs={12}>
													<Box margin={1}>
														<Field
															fullWidth
															type="number"
															component={TextField}
															name="salary_per_day"
															label="Salary (Daily)"
															onChange={handleChange}
															variant="standard"
															margin="normal"
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
															required
															fullWidth
															component={TextField}
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
															required
															fullWidth
															component={TextField}
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
															type="text"
															name="work_prefer"
															label="Work Prefer"
															variant="standard"
															select
															helperText={
																props.errors.hasOwnProperty("locality") &&
																props.errors["locality"]
															}
															margin="dense"
														>
															{["Doesn't Matter", "Only Religion"].map(
																(option, index) => (
																	<MenuItem key={index} value={index + 1}>
																		{option}
																	</MenuItem>
																)
															)}
														</Field>
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
																		variant="standard"
																		helperText={
																			props.errors.hasOwnProperty("doc_type") &&
																			props.errors["doc_type"]
																		}
																		margin="normal"
																		InputLabelProps={{
																			shrink: true,
																		}}
																	>
																		{Object.keys(fileDropdown).map(
																			(option, index) => (
																				<MenuItem key={index} value={option}>
																					{option}
																				</MenuItem>
																			)
																		)}
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
																						fileOnChange(event, props, field)
																					}
																				/>
																				<label htmlFor={field.name}>
																					<Button
																						disabled={
																							form.values["doc_type"] == null ||
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
																	<TableCell align="right">File Name</TableCell>
																	<TableCell align="right">File Size</TableCell>
																	<TableCell align="right">File Type</TableCell>
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
													</Grid>
												</Grid>
											</Grid>
										</Form>
									</div>
								);
							}}
						</Formik>
					</div>
				</Grid>
			</Grid>

			{_renderModal()}
		</Card>
	);
};

export default withRouter(withTranslation(["common"])(workerform));
