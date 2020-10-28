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

const Familydetails = ({
	initvalue,
	matrimonyid,
	backform,
	nextform,
	setfamilydetails,
	familydetailsid,
	setfamilydetailsid,
	...props
}) => {
	const { className, ...rest } = props;
	// const { loginDetails, user, updateUser } = useAuth();

	const classes = useStyles();
	const { t } = props;

	const [details, setDetails] = useState(props.prefilldata || {});
	const [loginData, setloginData] = React.useState({});
	const [states, setStates] = useState([]);
	const [district, setDistrict] = useState([]);
	const [city, setCity] = useState([]);
	const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);
	const profileSchema = Yup.object().shape({
		metrimony_id: Yup.string().required("Required"),
		father_occupation: Yup.string().required("Required"),
		mother_occupation: Yup.string().required("Required"),
		brother_count: Yup.string().required("Required").nullable(),
		brother_married_count: Yup.string().when(
			"brother_count",
			(brother_count, schema) => {
				return brother_count >= 1 ? schema.required("Required") : schema;
			}
		),
		sister_count: Yup.string().required("Required").nullable(),
		sister_married_count: Yup.string().when(
			"sister_count",
			(sister_count, schema) => {
				return sister_count >= 1 ? schema.required("Required") : schema;
			}
		),
		family_status: Yup.string().required("Required"),
		country: Yup.string().required("Required"),
		state: Yup.string().required("Required"),
		district: Yup.string().required("Required"),

		family_income: Yup.string(),
	});

	React.useEffect(() => {
		// console.error(Object.keys(state));
		setStates(Object.keys(state));
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
				title="Family Details"
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
			payload.append("metrimony_id", matrimonyid);
			if (payload && matrimonyid) {
				matrimonyActions
					.UpdateFamilyDetails(payload)
					.then(function (response) {
						setSubmitting(false);
						console.log("ressss", response);
						if (response.data.input_error) {
							Object.keys(response.data.input_error).forEach((k) => {
								setFieldError(k, response.data.input_error[k][0]);
							});
						}

						if (response.data.data.id) {
							setfamilydetailsid(response.data.data.id);
							setfamilydetails(response.data.data);
							nextform();
						}
					})
					.catch(function (error) {
						setSubmitting(false);
						if (error.response.data.input_error) {
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

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			{/* <Button type="submit" color="primary" variant="outlined">
				Go To Account Details
			</Button> */}
			<Formik
				enableReinitialize
				initialValues={initvalue}
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
						setFieldValue,
					} = props;

					return (
						<div>
							<CardHeader
								subheader="The information can be edited"
								title="Family Details"
							/>
							<Divider />
							<CardContent>
								<Form>
									<Grid container spacing={3}>
										<Grid item md={4} xs={12}>
											<Box margin={1}>
												<Field
													onChange={handleChange}
													fullWidth
													component={TextField}
													type="text"
													name="father_occupation"
													label="Father Occupation"
													variant="outlined"
													helperText={
														formprops.errors.hasOwnProperty(
															"father_occupation"
														) && formprops.errors["father_occupation"]
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
													name="mother_occupation"
													label="Mother Occupation"
													variant="outlined"
													helperText={
														formprops.errors.hasOwnProperty(
															"mother_occupation"
														) && formprops.errors["mother_occupation"]
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
													type="number"
													name="brother_count"
													label="Numbers Of Brother's"
													variant="outlined"
													helperText={
														formprops.errors.hasOwnProperty("brother_count") &&
														formprops.errors["brother_count"]
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
													disabled={
														null == formprops.values.brother_count ||
														formprops.values.brother_count < 1
													}
													type="number"
													name="brother_married_count"
													label="Numbers Of Married Brother's"
													variant="outlined"
													helperText={
														formprops.errors.hasOwnProperty(
															"brother_married_count"
														) && formprops.errors["brother_married_count"]
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
													type="number"
													name="sister_count"
													label="Number Of Sisters"
													variant="outlined"
													helperText={
														formprops.errors.hasOwnProperty("sister_count") &&
														formprops.errors["sister_count"]
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
													disabled={
														null == formprops.values.sister_count ||
														formprops.values.sister_count < 1
													}
													type="number"
													name="sister_married_count"
													label="Numbers Of Married Sister's"
													variant="outlined"
													helperText={
														formprops.errors.hasOwnProperty(
															"sister_married_count"
														) && formprops.errors["sister_married_count"]
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
													name="family_income"
													label="Family Income (In Lpa)"
													variant="outlined"
													helperText={
														formprops.errors.hasOwnProperty("family_income") &&
														formprops.errors["family_income"]
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
													name="family_status"
													label="Family Status"
													variant="outlined"
													helperText={
														formprops.errors.hasOwnProperty("family_status") &&
														formprops.errors["family_status"]
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
													name="country"
													label="Country"
													select
													variant="outlined"
													helperText={
														formprops.errors.hasOwnProperty("country") &&
														formprops.errors["country"]
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
														formprops.errors.hasOwnProperty("state") &&
														formprops.errors["state"]
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
														formprops.errors.hasOwnProperty("district") &&
														formprops.errors["district"]
													}
													margin="normal"
													InputLabelProps={{
														shrink: true,
													}}
												>
													{formprops.values.state &&
														state[formprops.values.state].map(
															(option, index) => (
																<MenuItem key={index} value={option}>
																	{option}
																</MenuItem>
															)
														)}
												</Field>
											</Box>
										</Grid>
									</Grid>

									<Divider />
									<Grid container alignItems="flex-end" justify="flex-end">
										{!formprops.isSubmitting ? (
											<div>
												<Button onClick={formprops.resetForm} size="small">
													Reset To Default
												</Button>
												<Button onClick={backform} size="small">
													Back
												</Button>
											</div>
										) : (
											t("common:cant_revert")
										)}
										<Button
											disabled={formprops.isSubmitting}
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

Familydetails.propTypes = {
	className: PropTypes.string,
};

export default withTranslation(["common"])(Familydetails);
