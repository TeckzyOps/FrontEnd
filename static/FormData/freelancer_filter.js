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
import * as Yup from "yup";
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
const fun = (val) => {
	console.log(val);
};
export const freelancerFilter = [
	[
		{
			id: "service_category",
			label: "Service Category",
			placeholder: "",
			type: "select",

			validationType: "string",
			options: { data: Object.keys(serviceCategory) },
			value: "",
			validations: [],
		},
		{
			id: "sub_service",
			label: "Sub Service Category",
			placeholder: "",

			type: "select",
			validationType: "string",
			options: { data: serviceCategory, dependsOn: "service_category" },
			value: [],
			validations: [],
		},
	],
	[
		{
			id: "booking_date",
			label: "Booking Date",
			placeholder: "",
			type: "date",
			ElementParams: {
				InputAdornmentProps: { position: "start" },
			},
			validationType: "string",
			value: new Date(),
			validations: [],
		},
		{
			id: "service_price",
			label: "Budget Price",
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
];
