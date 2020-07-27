import React, { useState, useEffect, Component } from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { createYupSchema } from "../../utils/yupSchemaCreator";
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

	function stateExtraxtor(state, obj) {
		if (obj.type == "checkbox") {
			state[obj.id] = obj.value ? obj.value : false;
		} else {
			state[obj.id] = obj.value ? obj.value : "";
		}

		return state;
	}

	const renderFormElements = (prop) =>
		props.elements.map((item, index) => {
			const fieldMap = {
				text: TextField,
				checkbox: CheckboxWithLabel,
				select: TextField,
				password: TextField,
			};
			const Component = fieldMap[item.type ? item.type : text];
			let error = prop.errors.hasOwnProperty(item.id) && prop.errors[item.id];

			let styles = { width: "100%" };
			if (item.type && item.type == "checkbox") {
				return (
					<Grid key={index} item xs={12}>
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
					</Grid>
				);
			} else if (item.type && item.type == "select") {
				return (
					<Grid key={index} item xs={12}>
						<Box margin={1}>
							<Field
								component={Component}
								type="text"
								name="select"
								label={item.label}
								select
								variant="standard"
								onChange={prop.handleChange}
								error={error}
								placeholder={
									item.placeholder
										? item.placeholder
										: "Enter " + toTitleCase(item.id)
								}
								helperText={item.helpertext}
								margin="normal"
								InputLabelProps={{
									shrink: true,
								}}
							>
								{item.options.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</Field>
						</Box>
					</Grid>
				);
			} else {
				return (
					<Grid key={index} item xs={12}>
						<Box margin={1}>
							<Field
								style={styles}
								type={item.type ? item.type : "text"}
								component={Component}
								label={
									item.label ? item.label : "Enter " + toTitleCase(item.id)
								}
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
					</Grid>
				);
			}
		});
	const schema = Yup.object().shape(props.elements.reduce(createYupSchema, {}));

	const handleSubmit = (values, { setSubmitting, setFieldError }) => {
		setSubmitting(false);
		const setError = (result) => {
			Object.keys(result).forEach((k) => {
				setFieldError(k, result[k][0]);
			});
		};
		let res = props.onSubmit(values, setError);
	};
	return (
		<Formik
			innerRef={refs}
			enableReinitialize
			initialValues={values}
			validationSchema={schema.concat(props.valSchema)}
			onSubmit={handleSubmit}
		>
			{(prop) => (
				<Form>
					<Grid container spacing={3}>
						{renderFormElements(prop)}
					</Grid>

					{HelperElement && <HelperElement />}
					{props.btn && (
						<div>
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
