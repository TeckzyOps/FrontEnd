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

function FormContainer(props) {
	const HelperElement = props.helperEle;

	function UpperCasingTextField(props) {
		const {
			form: { setFieldValue },
			field: { name },
		} = props;
		const onChange = React.useCallback(
			(event) => {
				const { value } = event.target;
				setFieldValue(name, value);
			},
			[setFieldValue, name]
		);
		return <MuiTextField {...fieldToTextField(props)} onChange={onChange} />;
	}
	function getInitVals(obj) {
		let initValues = {};
		obj.forEach((element) => {
			initValues[element.id] = "";
		});

		return initValues;
	}
	const renderFormElements = (prop) =>
		props.elements.map((item, index) => {
			const fieldMap = {
				text: TextField,
				checkbox: CheckboxWithLabel,
				select: TextField,
				password: TextField,
			};
			const Component = fieldMap[item.type];
			let error = prop.errors.hasOwnProperty(item.id) && prop.errors[item.id];
			let styles = { width: "100%" };
			if (item.type == "checkbox") {
				return (
					<Grid key={index} item xs={12}>
						<Box margin={1}>
							<FormControlLabel
								control={
									<Field
										component={Component}
										label={item.label}
										name={item.id}
										placeholder={item.placeholder}
										onChange={prop.handleChange}
										error={error}
									/>
								}
								label={item.label}
							/>
						</Box>
					</Grid>
				);
			} else if (item.type == "select") {
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
								placeholder={item.placeholder}
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
								component={Component}
								label={item.label}
								name={item.id}
								placeholder={item.placeholder}
								value={prop.values[item.id]}
								onChange={prop.handleChange}
								error={"error"}
							/>
						</Box>
					</Grid>
				);
			}
			return "";
		});
	const schema = Yup.object().shape(props.elements.reduce(createYupSchema, {}));
	return (
		<Formik
			initialValues={getInitVals(props.elements)}
			validationSchema={schema.concat(props.valSchema)}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					setSubmitting(false);
					props.onSubmit(values);
				}, 500);
			}}
		>
			{(prop) => (
				<Form>
					<Grid container spacing={3}>
						{renderFormElements(prop)}

						{/* {props.elements.map((item, index) => (
							<Grid key={index} item xs={12}>
								<Box margin={1}>
									{item.type == "checkbox" && (
										<FormControlLabel
											control={
												<Field
													component={CheckboxWithLabel}
													type={item.type}
													name={item.id}
												/>
											}
											label={item.label}
										/>
									)}
									{item.type == "select" && (
										<Field
											component={TextField}
											type="text"
											name="select"
											label={item.label}
											select
											variant="standard"
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
									)}
									{item.type != "checkbox" && item.type != "select" && (
										<Field
											style={{
												width: "100%",
											}}
											name={item.id}
											type={item.type}
											label={item.label}
											component={UpperCasingTextField}
										/>
									)}
								</Box>
							</Grid>
						))} */}
					</Grid>

					{HelperElement && <HelperElement />}
					<div>
						<Box margin={1}>
							<Button
								variant="contained"
								fullWidth
								type="submit"
								color="secondary"
								size="large"
								disabled={prop.isSubmitting}
								onClick={prop.submitForm}
							>
								{props.btn.label}
							</Button>
						</Box>
					</div>
				</Form>
			)}
		</Formik>
	);
}

FormContainer.propTypes = {
	elements: PropTypes.array.isRequired,
	onSubmit: PropTypes.func,
	helperEle: PropTypes.func,
	valSchema: PropTypes.array,
	btn: PropTypes.object.isRequired,
};

export default FormContainer;
