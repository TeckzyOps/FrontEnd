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
import {
	serviceCategory,
	serviceArea,
	professionSince,
	closeDay,
	workTime,
	tagline,
} from "~static/text/freelancerData.js";
import { states } from "~static/text/state";
import { cities } from "~static/text/city";
import { makeStyles } from "@material-ui/core/styles";

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
			type: "autocomplete",
			ElementParams: {
				variant: "outlined",
				InputLabelProps: {
					classes: {
						root: { color: "red" },
					},
				},
			},
			validationType: "string",
			options: { data: Object.keys(serviceCategory) },
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
			ElementParams: { variant: "outlined" },
			type: "autocomplete",
			validationType: "string",
			options: { data: serviceCategory, dependsOn: "service_category" },
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
			type: "autocomplete",
			ElementParams: { variant: "outlined" },
			validationType: "string",
			options: { data: serviceArea },
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
	//2nd row---------------
	[
		{
			id: "min_service_price",
			label: "Minimum Sub Service",
			placeholder: "",
			type: "text",
			validationType: "string",
			ElementParams: { variant: "outlined" },
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
		{},
		{},
	],
	[
		{
			id: "bussiness_name",
			label: "Profession Name",
			placeholder: "",
			type: "text",
			ElementParams: { variant: "outlined" },
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
			id: "bussiness_name",
			label: "Profession Since",
			placeholder: "",
			ElementParams: { variant: "outlined" },
			type: "autocomplete",
			validationType: "string",
			value: "",
			options: { data: professionSince },
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
	{
		id: "bussiness_description",
		label: "Bussiness Description",
		ElementParams: { variant: "outlined" },
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
	{
		id: "address",
		label: "Bussiness Address",
		ElementParams: { variant: "outlined" },
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
			id: "state",
			label: "State",
			placeholder: "",
			type: "autocomplete",
			ElementParams: { variant: "outlined" },
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
			type: "autocomplete",
			ElementParams: { variant: "outlined" },
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
			type: "autocomplete",
			ElementParams: { variant: "outlined" },
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
	{
		id: "locality",
		label: "Locality",
		placeholder: "",
		type: "text",
		ElementParams: { variant: "outlined" },
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
		id: "offer_tagline",
		label: "Offer Tagline",
		placeholder: "",
		type: "text",
		ElementParams: { variant: "outlined" },
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
			id: "shop_work_time_from",
			label: "Shop's Work Time From",
			placeholder: "",
			type: "text",
			ElementParams: { variant: "outlined" },
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
			id: "shop_work_time_to",
			label: "Shop's Work Time To",
			placeholder: "",
			type: "text",
			ElementParams: { variant: "outlined" },
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
			id: "shop_close_day",
			label: "Shop Close Day",
			ElementParams: { variant: "outlined" },
			placeholder: "",
			type: "autocomplete",
			validationType: "string",
			options: { data: closeDay },
			value: "",
			validations: [
				{
					type: "required",
					params: ["Field is required"],
				},
			],
		},
		{
			id: "shop_close_day_on_calendar",
			label: "Show on Calendar?",
			ElementParams: { variant: "outlined" },
			placeholder: "",
			type: "autocomplete",
			validationType: "string",
			options: { data: ["Yes", "No"] },
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
			id: "office_email",
			label: "Profession's Email",
			placeholder: "",
			ElementParams: { variant: "outlined" },
			type: "text",
			validationType: "string",

			value: "",
			validations: [
				{
					type: "email",
					params: [],
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
			ElementParams: { variant: "outlined" },
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
			id: "gst_number",
			label: "GST Number",
			placeholder: "",
			type: "text",
			validationType: "string",
			ElementParams: { variant: "outlined" },
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
			label: "Commission Range",
			placeholder: "",
			type: "text",
			validationType: "string",
			ElementParams: { variant: "outlined" },
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
			label: "Paid Leads",
			placeholder: "",
			type: "autocomplete",
			options: { data: [1, 2, 3, 4, 5, 6] },
			ElementParams: { variant: "outlined" },
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
