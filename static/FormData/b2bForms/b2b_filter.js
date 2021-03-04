import * as Yup from "yup";
import { serviceCategory } from "~static/text/vendorData.js";
import { states } from "~static/text/state";
import { cities } from "~static/text/city";

export const b2bFilter = [
	[
		{
			id: "service_category",
			label: "Category",
			placeholder: "",
			type: "select",

			validationType: "string",
			options: { data: Object.keys(serviceCategory) },
			value: "",
			validations: [],
		},
		{
			id: "sub_service",
			label: "Service",
			placeholder: "",

			type: "select",
			validationType: "string",
			options: { data: serviceCategory, dependsOn: "service_category" },
			value: [],
			validations: [],
		},
		{
			id: "service_price",
			label: "Budget",
			placeholder: "",
			type: "text",
			validationType: "string",
			value: "",
			validations: [],
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
