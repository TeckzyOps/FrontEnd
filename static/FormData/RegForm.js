import * as Yup from "yup";
// import { withTranslation } from "~/i18n";
// const { t } = withTranslation(["common"]);
export const regForm = [
	{
		id: "name",
		label: "Name",
		placeholder: "Enter Name",
		type: "text",
		validationType: "string",
		value: "",
		validations: [
			{
				type: "required",
				params: ["Name is required"],
			},
		],
	},
	{
		id: "mobile",
		label: "Mobile",
		type: "text",
		validationType: "number",
		value: "",
		validations: [
			{
				type: "length",
				params: [10, "Mobile number cannot be less than 10 characters"],
			},

			{
				type: "required",
				params: ["Mobile number is required"],
			},
		],
	},
	{
		id: "password",
		label: "Password",
		placeholder: "Password",
		type: "password",
		validationType: "string",
		value: "",
		validations: [
			{
				type: "required",
				params: ["Password is required"],
			},
			{
				type: "min",
				params: [6, "passowrd cannot be less than 5 characters"],
			},
		],
	},
	{
		id: "confirm",
		label: "Confirm Password",
		placeholder: "Confirm Password",
		type: "password",
		validationType: "string",
		value: "",
		validations: [
			{
				type: "required",
				params: ["Password is required"],
			},
			{
				type: "min",
				params: [6, "Password cannot be less than 5 characters"],
			},
			{
				type: "oneOf",
				params: [[Yup.ref("password"), null], "Passwords must match"],
			},
		],
	},
	{
		id: "agreement",
		name: "accept",
		type: "checkbox",
		label: (
			<span>
				I have read and accept the Terms of&nbsp;
				<a href="#">Service and Privacy Policy *</a>
			</span>
		),
		validationType: "boolean",
		value: false,
		validations: [
			{
				type: "required",
				params: ["Password is required"],
			},
			{
				type: "oneOf",
				params: [[true], "You must accept the terms and conditions"],
			},
		],
	},
];
