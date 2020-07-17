import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import { Formik, Field, Form, ErrorMessage } from "formik";
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
			initValues[element.name] = "";
		});

		return initValues;
	}
	return (
		<Formik
			initialValues={getInitVals(props.elements)}
			validationSchema={Yup.object().shape(props.valSchema)}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					setSubmitting(false);
					props.onSubmit(values);
				}, 500);
			}}
		>
			{({ errors, isSubmitting, submitForm, status, touched }) => (
				<Form>
					<Grid container spacing={3}>
						{props.elements.map((item, index) => (
							<Grid key={index} item xs={12}>
								<Box margin={1}>
									{item.type == "checkbox" && (
										<FormControlLabel
											control={
												<Field
													component={CheckboxWithLabel}
													type={item.type}
													name={item.name}
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
											name={item.name}
											type={item.type}
											label={item.label}
											component={UpperCasingTextField}
										/>
									)}
								</Box>
							</Grid>
						))}
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
								disabled={isSubmitting}
								onClick={submitForm}
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
	valSchema: PropTypes.object.isRequired,
	btn: PropTypes.object.isRequired,
};

export default FormContainer;