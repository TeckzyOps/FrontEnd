import { ref } from "yup";
export const changePassword = [
	{
		id: "password-current",
		label: "Current Password",
		placeholder: "**********",
		type: "password",
		// validationType: "string",
		// value: "",
		// validations: [
		// 	{
		// 		type: "required",
		// 		params: ["UserName is required"],
		// 	},
		// 	{
		// 		type: "min",
		// 		params: [5, "UserName cannot be less than 5 characters"],
		// 	},
		// ],
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
		id: "password-confirm",
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
			{
				type: "oneOf",
				params: [[ref("password")], "Passwords do not match"],
			},
		],
	},
];
