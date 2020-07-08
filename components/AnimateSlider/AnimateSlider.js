/* eslint-disable */
import IconButton from "@material-ui/core/IconButton";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Slider from "react-animated-slider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import useStyles from "./slider-style";
import "react-animated-slider/build/horizontal.css";
import { withTranslation } from "~/i18n";
import "~/vendors/animate-slider.css";
import imgAPI from "~/static/images/imgAPI";

import AwesomeSlider from "react-awesome-slider";
import CoreStyles from "react-awesome-slider/src/core/styles.scss";
import AnimationStyles from "react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss";

const content = [
	{
		url: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",
	},
	{
		url:
			"http://e14aaeb709f7cde1ae68-a1d0a134a31b545b257b15f8a8ba5726.r70.cf3.rackcdn.com/projects/31432/1427815464209-bf74131a7528d0ea5ce8c0710f530bb5/1280x720.mp4",
	},
	{
		url:
			"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
	},
];
let isPlay = false;

function AnimateSlider(props) {
	const classes = useStyles();
	const { t } = props;
	return (
		<div className={classes.heroContent}>
			<Slider className="slider-wrapper">
				{content.map((item, index) => (
					<div
						key={index.toString()}
						className="slider-content"
						// style={{
						// 	background: `url('${item.image}') no-repeat center center`,
						// }}
					>
						{/* <iframe width="100%" height="100%" className="video"
                src="https://www.youtube.com/embed/tgbNymZ7vqY?rel=0&modestbranding=0&autohide=1&controls=0">
                </iframe> */}
						<div className="inner">
							<video
								className="video"
								playsInline="playsinline"
								muted="muted"
								loop="loop"
								controls={true}
								// onClick={handlePlay.bind(this)}
								id={index.toString()}
							>
								<source
									src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4"
									type="video/mp4"
								/>
								<track default kind="captions" srcLang="en" src="" />
							</video>
						</div>
					</div>
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
