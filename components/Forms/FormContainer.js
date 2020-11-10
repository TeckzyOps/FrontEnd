import React, { useState, useEffect, Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { createYupSchema } from "../../utils/yupSchemaCreator";
import DateFnsUtils from "@date-io/date-fns";
import Autocomplete from "@material-ui/lab/Autocomplete";
import * as Yup from "yup";
import {
	Button,
	Box,
	LinearProgress,
	MenuItem,
	FormControl,
	InputLabel,
	FormControlLabel,
	Typography,
} from "@material-ui/core";
import MuiTextField from "@material-ui/core/TextField";
import {
	fieldToTextField,
	TextField,
	CheckboxWithLabel,
	TextFieldProps,
	Select,
	Switch,
} from "formik-material-ui";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
let theme = createMuiTheme();
export const styles = makeStyles((theme) => ({
	labelRoot: {
		fontSize: 18,
		fontWeight: "bold",
	},
}));
const toTitleCase = (s) => {
	if (typeof s === "string" && s.length > 0) {
		const words = s.split(" ");
		if (Array.isArray(words) && words.length > 0) {
			if (words.length === 1) {
				const word = words[0];
				const matches = word.charAt(0).match(/\w+/i);
				const lines = word.split("\n");
				if (Array.isArray(lines) && lines.length > 1) {
					return lines
						.map((line) => {
							return toTitleCase(line);
						})
						.join("\n");
				} else if (Array.isArray(matches)) {
					return word
						.split("")
						.map((c, i) => {
							if (i === 0) {
								return c.toUpperCase();
							}
							return c.toLowerCase();
						})
						.join("");
				} else {
					return word.charAt(0).concat(toTitleCase(word.slice(1)));
				}
			} else {
				return words.map((word) => toTitleCase(word)).join(" ");
			}
		}
	}
	return "";
};

const FormContainer = React.forwardRef((props, refs) => {
	const HelperElement = props.helperEle;
	const classes = styles();
	const [values, setValues] = useState(
		props.elements.reduce(stateExtraxtor, {})
	);

	useEffect(() => {
		if (props.defaultvals) {
			setValues(props.defaultvals);
		}

		// for (const [key, value] of Object.entries(props.defaultvals)) {
		// 	console.log(`${key}: ${value}`);
		// 	Form.setFieldValue(key, value);
		// }
	}, [props.defaultvals ? props.defaultvals : ""]);
	const getNested = (obj, ...args) => {
		return args.reduce((obj, level) => obj && obj[level], obj);
	};
	function stateExtraxtor(state, obj) {
		if (Array.isArray(obj)) {
			obj.map((obj) => {
				if (obj.id) {
					if (obj.type == "checkbox") {
						state[obj.id] = obj.value ? obj.value : false;
					} else {
						state[obj.id] = obj.value ? obj.value : "";
					}
				}
			});
		} else {
			if (obj.id) {
				if (obj.type == "checkbox") {
					state[obj.id] = obj.value ? obj.value : false;
				} else {
					state[obj.id] = obj.value ? obj.value : "";
				}
			}
		}

		return state;
	}
	const fieldMap = {
		text: TextField,
		checkbox: CheckboxWithLabel,
		select: TextField,
		textarea: TextField,
		password: TextField,
		autocomplete: Autocomplete,
	};
	function getElement(item, prop) {
		console.log(prop);
		if (item.id == "undefined") {
			return;
		}
		let styles = { width: "100%" };
		let Component = fieldMap[item.type ? item.type : "text"];
		let error = prop.errors.hasOwnProperty(item.id) && prop.errors[item.id];
		let params = item.ElementParams;
		let type = item.type;
		switch (type) {
			case "checkbox":
				return (
					<Box margin={1}>
						<Field
							type={item.type}
							component={Component}
							name={item.id}
							className={
								"form-check-input " +
								(prop.errors[item.id] && prop.touched[item.id]
									? " is-invalid"
									: "")
							}
						/>
						<label htmlFor="acceptTerms" className="form-check-label">
							{item.label}
						</label>
						<ErrorMessage
							style={{ color: "red" }}
							name={item.id}
							component="div"
							className="invalid-feedback"
						/>
					</Box>
				);
				break;
			case "select":
				let opts = null;
				if (getNested(item, "options", "dependsOn")) {
					let opt = getNested(item, "options", "data");
					let index = getNested(item, "options", "dependsOn");
					opts = opt[prop.values[index]];
				} else {
					opts = getNested(item, "options", "data");
				}

				return (
					<Box margin={1}>
						<Field
							{...params}
							fullWidth
							component={Component}
							name={item.id}
							label={item.label}
							select
							onChange={prop.handleChange}
							InputLabelProps={{
								classes: {
									root: classes.labelRoot,
								},
							}}
							error={error}
							placeholder={
								item.placeholder
									? item.placeholder
									: "Enter " + toTitleCase(item.id)
							}
							helperText={item.helpertext}
						>
							{/* {getNested(item, "options", "data", "dependsOn")
								? getNested(item, "options", "data")[
										prop.values[getNested(item, "options", "dependsOn")]
								  ].map((option, index) => (
										<MenuItem key={index} value={option}>
											{option}
										</MenuItem>
								  ))
								: Array.isArray(getNested(item, "options", "data")) &&
								  getNested(item, "options", "data").map((option, index) => (
										<MenuItem key={index} value={option}>
											{option}
										</MenuItem>
								  ))} */}

							{Array.isArray(opts) &&
								opts.map((option, index) => (
									<MenuItem key={index} value={option}>
										{option}
									</MenuItem>
								))}
						</Field>
					</Box>
				);
				break;

			case "autocomplete":
				return (
					<Box margin={1}>
						<Field
							fullWidth
							component={Component}
							name={item.id}
							{...params}
							multiple
							InputLabelProps={{
								classes: {
									root: classes.labelRoot,
								},
							}}
							options={item.options}
							getOptionLabel={(label) => label}
							renderInput={(params) => (
								<MuiTextField
									{...params}
									onChange={prop.handleChange}
									variant="outlined"
									label={item.label}
									helperText={
										prop.errors.hasOwnProperty("experience") &&
										prop.errors["experience"]
									}
								/>
							)}
						></Field>
					</Box>
				);
				break;
			case "textarea":
				return (
					<Box margin={1}>
						<Field
							fullWidth
							{...params}
							type={item.type ? item.type : "text"}
							component={Component}
							label={item.label ? item.label : "Enter " + toTitleCase(item.id)}
							name={item.id}
							multiline={true}
							InputLabelProps={{
								classes: {
									root: classes.labelRoot,
								},
							}}
							rows={item.rows || 4}
							placeholder={
								item.placeholder
									? item.placeholder
									: "Enter " + toTitleCase(item.id)
							}
							onChange={prop.handleChange}
							error={"error"}
						/>
					</Box>
				);
				break;
			default:
				return (
					<Box margin={1}>
						<Field
							fullWidth
							{...params}
							type={item.type ? item.type : "text"}
							component={Component}
							InputLabelProps={{
								classes: {
									root: classes.labelRoot,
								},
							}}
							label={item.label ? item.label : "Enter " + toTitleCase(item.id)}
							name={item.id}
							placeholder={
								item.placeholder
									? item.placeholder
									: "Enter " + toTitleCase(item.id)
							}
							onChange={prop.handleChange}
							error={"error"}
						/>
					</Box>
				);
		}
	}

	function isInt(n) {
		return Number(n) === n && n % 1 === 0;
	}
	const renderFormElements = (prop) =>
		props.elements.map((item, index) => {
			let md = isInt(12 / item.length)
				? 12 / item.length
				: 2 * Math.round(12 / item.length / 2);

			if (Array.isArray(item)) {
				return item.map(
					(item, index) =>
						Object.keys(item).length > 1 && (
							<Grid key={item.id || index} item sm={md} xs={12}>
								{getElement(item, prop)}
							</Grid>
						)
				);
			} else {
				return (
					<Grid key={index} item xs={12}>
						{getElement(item, prop)}
					</Grid>
				);
			}
		});
	const schema = Yup.object().shape(props.elements.reduce(createYupSchema, {}));

	// const handleSubmit = (onSubmitProps) => {
	// 	setSubmitting(false);
	// 	const setError = (result) => {
	// 		Object.keys(result).forEach((k) => {
	// 			setFieldError(k, result[k][0]);
	// 		});
	// 	};
	// 	let res = props.onSubmit(values, setError);
	// };
	return (
		<Formik
			innerRef={refs}
			enableReinitialize
			initialValues={values}
			validationSchema={schema.concat(props.valSchema)}
			onSubmit={(values, { setSubmitting, resetForm, setFieldError }) =>
				props.onSubmit({ values, setSubmitting, resetForm, setFieldError })
			}
		>
			{(prop) => (
				<Form>
					<Grid container spacing={3}>
						{renderFormElements(prop)}
					</Grid>

					{HelperElement && <HelperElement props={prop} />}
					{props.btn && (
						<div>
							{prop.isSubmitting && "You Can't go back, Now!"}
							<Box margin={1}>
								<Button
									variant="contained"
									fullWidth
									type="submit"
									color="secondary"
									size="large"
									disabled={prop.isSubmitting}
								>
									{props.btn.label}
								</Button>
							</Box>
						</div>
					)}
				</Form>
			)}
		</Formik>
	);
});

FormContainer.propTypes = {
	elements: PropTypes.array.isRequired,
	onSubmit: PropTypes.func,
	helperEle: PropTypes.func,
	valSchema: PropTypes.array,
	defaultvals: PropTypes.object,
	btn: PropTypes.object,
};

export default FormContainer;
