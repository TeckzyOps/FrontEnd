import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Slider from "react-animated-slider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import "react-animated-slider/build/horizontal.css";
import { withTranslation } from "~/i18n";

import imgAPI from "~/static/images/imgAPI";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	heroButtons: {
		marginTop: theme.spacing(4),
	},
	heroContent: {
		position: "relative",
	},
	sliderwrapper: {
		height: "100%",
	},
}));

const content = [
	{
		title: "title",
		button: "Read More",
		image:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRBqiygfS-vkmnRHUq9Py3TE9sL8uxrWIii5w&usqp=CAU",
		user: "Luanda Gjokaj",
		userProfile: "",
	},
	{
		title: "title",
		button: "Discover",
		image:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT-Sove5vNZ_9gnleioO8HxSpI6Pe2bTi27Yw&usqp=CAU",
		user: "Erich Behrens",
		userProfile: imgAPI.avatar[7],
	},
	{
		title: "title",
		button: "Buy now",
		image:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTAZgq76yxXxF89lVYZLxDGflB7tS_6XI339g&usqp=CAU",
		user: "Bruno Vizovskyy",
		userProfile: imgAPI.avatar[8],
	},
];

function AnimateSlider({ image, ...props }) {
	const classes = useStyles();
	const { t } = props;

	const img = () => {
		return Object.values(image);
	};
	return (
		<div className={classes.heroContent}>
			<Slider className="slider-wrapper">
				{content.map((item, index) => (
					<img
						src={item.image}
						key={index.toString()}
						className="slider-content"
					/>
				))}
			</Slider>
		</div>
	);
}

AnimateSlider.propTypes = {
	t: PropTypes.func.isRequired,
};

AnimateSlider.getInitialProps = async () => ({
	namespacesRequired: ["common", "starter-landing"],
});

export default withTranslation(["common", "starter-landing"])(AnimateSlider);
