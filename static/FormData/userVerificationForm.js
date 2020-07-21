export const userVerificationForm = [
	{
		id: "username",
		label: "Username",
		placeholder: "Enter Username",
		type: "text",
		validationType: "string",
		value: "",
		validations: [
			{
				type: "required",
				params: ["UserName is required"],
			},
			{
				type: "min",
				params: [5, "UserName cannot be less than 5 characters"],
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
