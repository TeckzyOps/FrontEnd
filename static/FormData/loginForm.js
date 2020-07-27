export const loginForm = [
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
				params: ["UserNMobile/E-Mailame is required"],
			},
			{
				type: "min",
				params: [5, "Mobile/E-Mail cannot be less than 5 characters"],
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
];
