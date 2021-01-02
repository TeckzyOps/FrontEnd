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
	commissionRange,
} from "~static/text/freelancerData.js";
import { states } from "~static/text/state";
import { cities } from "~static/text/city";
import { makeStyles } from "@material-ui/core/styles";

export const freelancerForm = [
	[
		{
			id: "service_category",
			label: "Service Category",
			placeholder: "",
			type: "select",

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
					params: [1, "Field cannot be less than 5 characters"],
				},
			],
		},
		{
			id: "sub_service",
			label: "Sub Service Category",
			placeholder: "",
			ElementParams: {
				multiple: true,
			},
			type: "select",
			validationType: "string",
			options: { data: serviceCategory, dependsOn: "service_category" },
			value: [],
			validations: [
				{
					type: "required",
					params: ["Field is required"],
				},
				{
					type: "min",
					params: [1, "Field cannot be less than 5 characters"],
				},
			],
		},
		{
			id: "service_area",
			label: "Service's Area",
			placeholder: "",
			type: "select",

			validationType: "string",
			options: { data: serviceArea },
			value: "",
			validations: [
				{
					type: "required",
					params: ["Field is required"],
				},
			],
		},
	],
	//2nd row---------------
	[
		{
			id: "min_service_price",
			label: "Minimum Service's Price Range",
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
			id: "max_service_price",
			label: "Maximum Service's Price Range",
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
			],
		},
	],
	[
		{
			id: "bussiness_name",
			label: "Profession's Name",
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
			id: "bussiness_since",
			label: "Profession's Since",
			placeholder: "",

			type: "select",
			validationType: "string",
			value: "",
			options: { data: professionSince },
			validations: [
				{
					type: "required",
					params: ["Field is required"],
				},
			],
		},
	],
	{
		id: "bussineess_description",
		label: "Profession's Description",
		ElementParams: { variant: "outlined" },
		placeholder: "",
		type: "textarea",
		rows: 4,
		validationType: "string",

		value: "",
		validations: [
			{
				type: "max",
				params: [100, "Maximum 100 words will be accepted!"],
			},
		],
	},
	{
		id: "address",
		label: "Profession's Add",
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
			label: "City/Town",
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
	{
		id: "area",
		label: "Locality/Area/Village",
		placeholder: "",
		type: "select",

		validationType: "string",
		options: { data: ["Others"] },
		value: "",
	},
	{
		id: "offer_tagline",
		label: "Offer/Special Tagline",
		placeholder: "",
		type: "select",
		options: { data: tagline },

		validationType: "string",

		value: "",
		validations: [],
	},
	[
		{
			id: "work_start_time",
			label: "Office/Shop's Work Time From",
			placeholder: "",
			type: "select",
			options: { data: workTime },
			ElementParams: { variant: "outlined" },
			validationType: "string",

			validations: [
				{
					type: "required",
					params: ["Field is required"],
				},
			],
		},
		{
			id: "work_end_time",
			label: "Office/Shop's Work Time To",
			placeholder: "",
			type: "select",
			options: { data: workTime },
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
			id: "close_day",
			label: "Office/Shop Close Day",

			placeholder: "",
			type: "select",
			validationType: "string",
			ElementParams: {
				multiple: true,
			},
			options: { data: closeDay },
			value: [],
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
			validations: [],
		},
		{
			id: "office_number",
			label: "Profession's Contact Number",
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
			id: "gst_no",
			label: "If Available GST Number",
			placeholder: "",
			type: "text",
			validationType: "string",
			ElementParams: { variant: "outlined" },
			value: "",
			validations: [],
		},
		// {
		// 	id: "commission_percent",
		// 	label: "Commission Calculate On 10%",
		// 	placeholder: "",
		// 	type: "text",
		// 	validationType: "string",
		// 	ElementParams: { variant: "outlined" },
		// 	value: "",
		// 	validations: [
		// 		{
		// 			type: "required",
		// 			params: ["Field is required"],
		// 		},
		// 	],
		// },
		{
			id: "commission_range",
			label: "10% Commission on Booking Value",
			placeholder: "",
			type: "select",
			validationType: "string",

			options: { data: commissionRange },
			value: "",
			validations: [
				{
					type: "required",
					params: ["Field is required"],
				},
			],
		},
		{
			id: "paid_leads",
			label: "Paid Leads",
			placeholder: "",
			type: "select",
			options: { data: [1, 2, 3, 4, 5, 6] },

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
];
