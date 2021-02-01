import * as Yup from "yup";
import {
	serviceCategory,
	OffersCouponFilter,
} from "~static/text/sellerData.js";
import { states } from "~static/text/state";
import { cities } from "~static/text/city";
export const sellerFilter = [
	[
		{
			id: "service_category",
			label: "Category",
			placeholder: "",
			type: "select",
			ElementParams: {
				fullWidth: true,
			},
			validationType: "string",
			options: { data: Object.keys(serviceCategory) },
			value: "",
			validations: [
				{
					type: "required",
					params: ["Field is required"],
				},
			],
		},
		{
			id: "sub_service",
			label: "Product",
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
			],
		},
	],
	{
		id: "product_coupon_status",
		label: "Offers Coupon",
		placeholder: "",
		type: "select",
		options: { data: OffersCouponFilter },
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
];
