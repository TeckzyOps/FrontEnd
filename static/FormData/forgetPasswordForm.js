export const forgetPasswordForm = [
	{
		id: "username",
		label: "Mobile/E-Mail",
		placeholder: "Enter Mobile/E-Mail",
		type: "text",
		validationType: "string",
		value: "",
		validations: [
			{
				type: "required",
				params: ["Mobile/E-Mail is required"],
			},
			{
				type: "min",
				params: [5, "Mobile/E-Mail cannot be less than 5 characters"],
			},
		],
	},
];

export const otp = {
	id: "otp",
	label: "OTP",
	placeholder: "Enter OTP",
	type: "text",
	validationType: "number",
	value: "",
	validations: [
		{
			type: "required",
			params: ["OTP is required"],
		},
		{
			type: "length",
			params: [4, "Required 4 characters"],
		},
	],
};
export const newPassword = {
	id: "password",
	label: "Enter New Passowrd",
	placeholder: "Enter New Passowrd",
	type: "password",
	validationType: "string",
	validations: [
		{
			type: "required",
			params: ["Password is required"],
		},
		{
			type: "min",
			params: [6, "Password cannot be less than 6 characters"],
		},
	],
};
