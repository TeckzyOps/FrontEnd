import {
	gender,
	education,
	occupation,
	idType,
	religion,
	maritialStatus,
	caste,
	experience,
	countryList,
	interest,
	languages,
} from "~static/text/profiledata";
import { states } from "~static/text/state";
import { cities } from "~static/text/city";
// {
// 	id: "username",
// 	label: "Mobile/E-Mail",
// 	placeholder: "Enter Mobile/E-Mail",
// 	type: "text",
// 	validationType: "string",
// 	value: "",
// 	validations: [
// 		{
// 			type: "required",
// 			params: ["Mobile/E-Mail is required"],
// 		},
// 		{
// 			type: "min",
// 			params: [5, "Mobile/E-Mail cannot be less than 5 characters"],
// 		},
// 	],
// },
// {
// 	id: "password",
// 	label: "Password",
// 	placeholder: "Password",
// 	type: "password",
// 	validationType: "string",
// 	value: "",
// 	validations: [
// 		{
// 			type: "required",
// 			params: ["Password is required"],
// 		},
// 		{
// 			type: "min",
// 			params: [6, "passowrd cannot be less than 5 characters"],
// 		},
// 	],
// },

export const freelancerForm = [
	[
		{
			id: "service_category",
			label: "Service Category",
			placeholder: "",
			type: "select",
			ElementParams: { variant: "outlined" },
			validationType: "string",
			options: { data: gender },
			value: "",
			validations: [
				{
					type: "required",
					params: ["Field is required"],
				},
				{
					type: "min",
					params: [5, "Mobile/E-Mail cannot be less than 5 characters"],
				},
			],
		},
		{
			id: "sub_service",
			label: "Sub Service",
			placeholder: "",
			type: "select",
			validationType: "string",
			options: { data: gender },
			value: "",
			validations: [
				{
					type: "required",
					params: ["Field is required"],
				},
				{
					type: "min",
					params: [5, "Mobile/E-Mail cannot be less than 5 characters"],
				},
			],
		},
		{
			id: "service_area",
			label: "Service Area",
			placeholder: "",
			type: "select",
			validationType: "string",
			options: { data: gender },
			value: "",
			validations: [
				{
					type: "required",
					params: ["Field is required"],
				},
				{
					type: "min",
					params: [5, "Mobile/E-Mail cannot be less than 5 characters"],
				},
			],
		},
	],
	[
		{
			id: "min_service_price",
			label: "Minimum Sub Service",
			placeholder: "",
			type: "text",
			validationType: "string",

			value: "",
			validations: [
				{
					type: "required",
					params: ["Field is required"],
				},
				{
					type: "min",
					params: [5, "Mobile/E-Mail cannot be less than 5 characters"],
				},
			],
		},
		{
			id: "max_service_price",
			label: "Maximum Service Price",
			placeholder: "",
			type: "text",
			validationType: "string",
			options: { data: gender },
			value: "",
			validations: [
				{
					type: "required",
					params: ["Field is required"],
				},
				{
					type: "min",
					params: [5, "Mobile/E-Mail cannot be less than 5 characters"],
				},
			],
		},
		{},
		{},
	],
	{
		id: "bussiness_name",
		label: "Bussiness Name",
		placeholder: "",
		type: "text",
		validationType: "string",
		value: "",
		validations: [
			{
				type: "required",
				params: ["Field is required"],
			},
			{
				type: "min",
				params: [5, "Mobile/E-Mail cannot be less than 5 characters"],
			},
		],
	},
	{
		id: "bussiness_description",
		label: "Bussiness Description",
		placeholder: "",
		type: "textarea",
		rows: 4,
		validationType: "string",

		value: "",
		validations: [
			{
				type: "required",
				params: ["Field is required"],
			},
			{
				type: "min",
				params: [5, "Mobile/E-Mail cannot be less than 5 characters"],
			},
		],
	},
	[
		{
			id: "offer_tagline",
			label: "Offer Tagline",
			placeholder: "",
			type: "text",
			validationType: "string",

			value: "",
			validations: [
				{
					type: "required",
					params: ["Field is required"],
				},
			],
		},
		{
			id: "total_experience",
			label: "Total Experience",
			placeholder: "",
			type: "text",
			rows: 4,
			validationType: "string",

			value: "",
			validations: [
				{
					type: "required",
					params: ["Field is required"],
				},
			],
		},
	],
	{
		id: "address",
		label: "Bussiness Address",
		placeholder: "",
		type: "textarea",
		rows: 4,
		validationType: "string",

		value: "",
		validations: [
			{
				type: "required",
				params: ["Field is required"],
			},
		],
	},
	[
		{
			id: "office_map_link",
			label: "Map Link",
			placeholder: "",
			type: "text",
			validationType: "string",

			value: "",
			validations: [
				{
					type: "required",
					params: ["Field is required"],
				},
			],
		},
		{
			id: "office_number",
			label: "Office Number",
			placeholder: "",
			type: "text",

			validationType: "string",

			value: "",
			validations: [
				{
					type: "required",
					params: ["Field is required"],
				},
			],
		},
	],
	[
		{
			id: "state",
			label: "State",
			placeholder: "",
			type: "select",
			validationType: "string",
			options: { data: Object.keys(states) },
			value: "",
			validations: [
				{
					type: "required",
					params: ["Field is required"],
				},
			],
		},
		{
			id: "district",
			label: "District",
			placeholder: "",
			type: "select",
			validationType: "string",
			options: { data: states, dependsOn: "state" },
			value: "",
			validations: [
				{
					type: "required",
					params: ["Field is required"],
				},
			],
		},
		{
			id: "city",
			label: "City",
			placeholder: "",
			type: "select",
			validationType: "string",
			options: { data: cities, dependsOn: "district" },
			value: "",
			validations: [
				{
					type: "required",
					params: ["Field is required"],
				},
			],
		},
	],
	[
		{
			id: "locality",
			label: "Locality",
			placeholder: "",
			type: "text",
			validationType: "string",

			value: "",
			validations: [
				{
					type: "required",
					params: ["Field is required"],
				},
			],
		},
		{
			id: "commission_percent",
			label: "Commission Percent",
			placeholder: "",
			type: "select",
			validationType: "string",
			options: { data: ["10%", "15%", "20%"] },
			value: "",
			validations: [
				{
					type: "required",
					params: ["Field is required"],
				},
			],
		},
		{
			id: "min_commission",
			label: "Minimum Commission",
			placeholder: "",
			type: "text",
			validationType: "string",

			value: "",
			validations: [
				{
					type: "required",
					params: ["Field is required"],
				},
				{
					type: "min",
					params: [5, "Mobile/E-Mail cannot be less than 5 characters"],
				},
			],
		},
		{
			id: "max_commission",
			label: "Max Comission",
			placeholder: "",
			type: "text",
			validationType: "string",
			value: "",
			validations: [
				{
					type: "required",
					params: ["Field is required"],
				},
				{
					type: "min",
					params: [5, "Mobile/E-Mail cannot be less than 5 characters"],
				},
			],
		},
	],
];
