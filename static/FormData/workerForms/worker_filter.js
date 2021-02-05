import * as Yup from "yup";
import { serviceCategory } from "~static/text/sellerData.js";
import { states } from "~static/text/state";
import { cities } from "~static/text/city";
export const workerFilter = [
	[
		{
			id: "service_category",
			label: "Job Category",
			placeholder: "",
			type: "select",
			ElementParams: {
				fullWidth: true,
			},
			validationType: "string",
			options: { data: Object.keys(serviceCategory) },
			value: "",
			validations: [],
		},
		{
			id: "sub_service",
			label: "Skill Work",
			placeholder: "",

			type: "select",
			validationType: "string",
			options: { data: serviceCategory, dependsOn: "service_category" },
			value: [],
			validations: [],
		},
	],

	{
		id: "job_monthly_basis",
		label: "Job Monthly Basis",
		placeholder: "",
		type: "select",
		validationType: "string",
		options: { data: ["Yes", "No"] },
		value: "",
		validations: [],
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
			validations: [],
		},
		{
			id: "district",
			label: "District",
			placeholder: "",
			type: "select",

			validationType: "string",
			options: { data: states, dependsOn: "state" },
			value: "",
			validations: [],
		},
		{
			id: "city",
			label: "City/Town",
			placeholder: "",
			type: "select",

			validationType: "string",
			options: { data: cities, dependsOn: "district" },
			value: "",
			validations: [],
		},
	],
	{
		id: "booking_date",
		label: "Booking Date",
		placeholder: "",
		type: "date",
		ElementParams: {
			InputAdornmentProps: { position: "start" },
		},
	},
];
