import * as Yup from "yup";
// import { withTranslation } from "~/i18n";
// const { t } = withTranslation(["common"]);
export const freelancerProperietor = [
	[
		{
			id: "name",
			label: "Name",
			placeholder: "",
			type: "text",
			validationType: "string",
			ElementParams: {
				disabled: true,
			},
			value: "",
			validations: [
				{
					type: "required",
					params: ["Name is required"],
				},
			],
		},
		{
			id: "gender",
			label: "Gender",
			placeholder: "",
			type: "text",
			ElementParams: {
				disabled: true,
			},
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
			id: "religion",
			label: "Religion",
			placeholder: "",
			type: "text",
			ElementParams: {
				disabled: true,
			},
			validationType: "string",
			value: "",
			validations: [
				{
					type: "required",
					params: ["Name is required"],
				},
			],
		},
	],
	[
		{
			id: "mobile",
			label: "Mobile",
			type: "text",
			ElementParams: {
				disabled: true,
			},
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
			id: "email",
			label: "Email",
			placeholder: "",
			ElementParams: {
				disabled: true,
			},
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
	],
];
