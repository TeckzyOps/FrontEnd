export const mpinForm = [
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
		id: "mpin",
		label: "M-PIN",
		placeholder: "Enter M-PIN",
		type: "text",
		validationType: "string",
		value: "",
		validations: [
			{
				type: "required",
				params: ["M-PIN is required"],
			},
			{
				type: "length",
				params: [4, "Required 4 characters"],
			},
		],
	},
];
