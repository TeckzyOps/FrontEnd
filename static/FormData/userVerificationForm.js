export const userVerificationForm = [
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
	{
		id: "otp",
		label: "OTP",
		placeholder: "Enter OTP",
		type: "text",
		validationType: "string",
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
	},
];
