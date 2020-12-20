import React, { useState, useEffect, Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { createYupSchema } from "../../utils/yupSchemaCreator";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Autocomplete from "@material-ui/lab/Autocomplete";
import * as Yup from "yup";
import ReactDOM from "react-dom";
import {
	Button,
	Box,
	LinearProgress,
	MenuItem,
	FormControl,
	InputLabel,
	FormControlLabel,
	FormHelperText,
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
		backgroundColor: "white",
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

	const inputLabel = React.useRef(null);
	const [labelWidth, setLabelWidth] = React.useState(0);
	React.useEffect(() => {
		if (inputLabel != null && inputLabel.current != null) {
			setLabelWidth(inputLabel.current.offsetWidth);
		}
	}, []);

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
						if (typeof obj.value === "object") {
							state[obj.id] = obj.value;
						} else {
							state[obj.id] = obj.value ? obj.value : "";
						}
					}
				}
			});
		} else {
			if (obj.id) {
				if (obj.type == "checkbox") {
					state[obj.id] = obj.value ? obj.value : false;
				} else {
					if (typeof obj.value === "object") {
						state[obj.id] = obj.value;
					} else {
						state[obj.id] = obj.value ? obj.value : "";
					}
				}
			}
		}

		return state;
	}
	function containsAll(needles, haystack) {
		if (Array.isArray(haystack)) {
			for (var i = 0; i < needles.length; i++) {
				if (!haystack.includes(needles[i])) return false;
			}
			return true;
		}
		return null;
	}
	const DatePickerField = ({ field, form, ...other }) => {
		const currentError = form.errors[field.name];

		return (
			<MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
				<DatePicker
					style={{ width: "100%" }}
					helperText={currentError}
					value={field.value}
					error={Boolean(currentError)}
					onError={(error) => {
						// handle as a side effect
						if (error !== currentError) {
							form.setFieldError(field.name, error);
						}
					}}
					// if you are using custom validation schema you probably want to pass `true` as third argument
					onChange={(date) => {
						form.setFieldValue(field.name, date, true);
					}}
					{...other}
				/>
			</MuiPickersUtilsProvider>
		);
	};
	const fieldMap = {
		text: TextField,
		checkbox: CheckboxWithLabel,
		select: Select,
		textarea: TextField,
		password: TextField,
		date: DatePickerField,
		autocomplete: Autocomplete,
	};
	function getElement(item, prop) {
		if (item.id == "undefined") {
			return;
		}
		let styles = { width: "100%" };
		let Component = fieldMap[item.type ? item.type : "text"];
		let error = prop.errors.hasOwnProperty(item.id) && prop.errors[item.id];
		let params = item.ElementParams;

		let type = item.type;
		let opts = null;
		if (getNested(item, "options", "dependsOn")) {
			let opt = getNested(item, "options", "data");
			let index = getNested(item, "options", "dependsOn");
			opts = opt[prop.values[index]];
			if (
				Array.isArray(prop.values[item.id]) &&
				prop.values[item.id].length > 0 &&
				!containsAll(prop.values[item.id], opts)
			) {
				prop.setFieldValue(item.id, []);
			}
		} else {
			opts = getNested(item, "options", "data");
		}

		switch (type) {
			case "date":
				return (
					<Box margin={1}>
						<Field
							fullwidth
							{...params}
							inputVariant="outlined"
							component={Component}
							InputLabelProps={{
								classes: {
									root: classes.labelRoot,
								},
							}}
							label={item.label ? item.label : "Enter " + toTitleCase(item.id)}
							name={item.id}
							InputAdornmentProps={{ position: "start" }}
						/>
					</Box>
				);
				break;
			case "checkbox":
				return (
					<Box margin={1}>
						<Field
							{...params}
							type={item.type}
							component={Component}
							name={item.id}
							indeterminate={false}
							Label={{ label: item.label }}
							onChange={prop.handleChange}
						/>

						<FormHelperText error>
							{prop.errors.hasOwnProperty(item.id) && prop.errors[item.id]}
						</FormHelperText>
					</Box>
				);
				break;
			case "select":
				return (
					<Box margin={1}>
						<FormControl variant="outlined" fullWidth>
							<InputLabel
								className={classes.labelRoot}
								ref={inputLabel}
								htmlFor={item.id}
							>
								{item.label}
							</InputLabel>
							<Field
								component={Select}
								{...params}
								onChange={prop.handleChange}
								type="text"
								name={item.id}
								labelWidth={labelWidth}
							>
								{Array.isArray(opts) &&
									opts.map((option, index) => (
										<MenuItem key={index} value={option}>
											{option}
										</MenuItem>
									))}
							</Field>
							{prop.touched[item.id] && (
								<FormHelperText error>
									{prop.errors.hasOwnProperty(item.id) && prop.errors[item.id]}
								</FormHelperText>
							)}
						</FormControl>
					</Box>
				);
				break;

			case "autocomplete":
				return (
					<Box margin={1}>
						<Field
							readOnly
							fullWidth
							component={Component}
							name={item.id}
							{...params}
							options={null == opts ? [] : opts}
							getOptionLabel={(label) => label}
							renderInput={(params) => (
								<MuiTextField
									{...params}
									onChange={prop.handleChange}
									variant="outlined"
									label={item.label}
									InputLabelProps={{
										classes: {
											root: classes.labelRoot,
										},
									}}
									helperText={
										prop.errors.hasOwnProperty(item.id) && prop.errors[item.id]
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
							// placeholder={
							// 	item.placeholder
							// 		? item.placeholder
							// 		: "Enter " + toTitleCase(item.id)
							// }
							onChange={prop.handleChange}
						/>
						{/* {prop.touched[item.id] && (
							<FormHelperText error>
								{prop.errors.hasOwnProperty(item.id) && prop.errors[item.id]}
							</FormHelperText>
						)} */}
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
							variant="outlined"
							// placeholder={
							// 	item.placeholder
							// 		? item.placeholder
							// 		: "Enter " + toTitleCase(item.id)
							// }
							onChange={prop.handleChange}
						/>
						{/* {prop.touched[item.id] && (
							<FormHelperText error>
								{prop.errors.hasOwnProperty(item.id) && prop.errors[item.id]}
							</FormHelperText>
						)} */}
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
	const schema = Yup.object().shape(
		props.elements.flat().reduce(createYupSchema, {})
	);

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
					<Grid container justify="center" alignItems="center" spacing={1}>
						{renderFormElements(prop)}
					</Grid>

					{HelperElement && <HelperElement prop={prop} />}
					<Grid justify="center" container spacing={2}>
						<Grid item xs={6}>
							{props.resetLabel && (
								<Box margin={1}>
									<Button
										variant="contained"
										fullWidth
										color="secondary"
										size="large"
										onClick={() => prop.resetForm()}
										disabled={prop.isSubmitting}
									>
										{props.resetLabel ? props.resetLabel : "Reset"}
									</Button>
								</Box>
							)}
						</Grid>
						<Grid item xs={props.resetLabel ? 6 : 12}>
							<Box margin={1}>
								<Button
									variant="contained"
									fullWidth
									type="submit"
									color="secondary"
									size="large"
									disabled={prop.isSubmitting}
								>
									{props.submitLabel ? props.submitLabel : "Submit"}
								</Button>
							</Box>
						</Grid>
					</Grid>
					{props.submitLabel && (
						<div>{prop.isSubmitting && "You Can't go back, Now!"}</div>
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
	submitLabel: PropTypes.string,
	resetLabel: PropTypes.string,
};

export default FormContainer;
