import {
	serviceCategory,
	serviceArea,
	closeDay,
	workTime,
	commissionRange,
} from "~static/text/workerData.js";
import { states } from "~static/text/state";
import { cities } from "~static/text/city";

export const workerForm = [
	[
		{
			id: "service_category",
			label: "Job Category",
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
			label: "Skill Work",
			placeholder: "",

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
			label: "Work's Area",
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
			label: "Minimum Salary per Day Range",
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
			label: "Maximum Salary per Day Range",
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
			id: "job_monthly_basis",
			label: "Job Monthly Basis",
			placeholder: "",
			type: "select",

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
		{
			id: "experience",
			label: "Work's Experience (Other Field)",
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
			id: "office_number",
			label: "Candidate's Contact Number",
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
			id: "office_email",
			label: "Candidate's Email",
			placeholder: "",
			ElementParams: { variant: "outlined" },
			type: "text",
			validationType: "string",

			value: "",
			validations: [],
		},
		{
			id: "address",
			label: "Candidate's Add",
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

	[
		{
			id: "work_start_time",
			label: "Call/Visit Time From",
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
			label: "Call/Visit Time To",
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
			label: "Don't Call/Visit",

			placeholder: "",
			type: "select",
			validationType: "string",

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
			label: "20 Points per Paid Leads",
			placeholder: "",
			type: "select",
			options: { data: ["Yes", "No"] },

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
