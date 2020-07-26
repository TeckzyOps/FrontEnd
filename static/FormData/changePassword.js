import { ref } from "yup";
export const changePassword = [
	{
		id: "password",
		label: "Current Password",
		placeholder: "Current password",
		type: "password",
	},
	{
		id: "new_password",
		label: "Password",
		placeholder: "New Password",
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
				params: [[ref("new_password")], "Passwords do not match"],
			},
		],
	},
];
