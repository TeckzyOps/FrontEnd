import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
} from "@material-ui/core/";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// import LangIcon from '@material-ui/icons/Language';
// import InputAdornment from '@material-ui/core/InputAdornment';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
// import Select from '@material-ui/core/Select';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import MenuItem from '@material-ui/core/MenuItem';
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import FacebookIcon from "react-ionicons/lib/LogoFacebook";
import TwitterIcon from "react-ionicons/lib/LogoTwitter";
import InstagramIcon from "react-ionicons/lib/LogoInstagram";
import LinkedinIcon from "react-ionicons/lib/LogoLinkedin";
import YoutubeIcon from "react-ionicons/lib/LogoYoutube";
import { i18n, withTranslation } from "~/i18n";
import logo from "~/static/home/mainlogo.jpg";
import playstore from "~/static/home/playstore.png";
import brand from "~/static/text/brand";
import { useTextAlign } from "~/theme/common";
import useStyles from "./footer-style";
import Divider from "@material-ui/core/Divider";
/* eslint-disable */
function Copyright() {
	return (
		<Typography
			variant="body2"
			display="block"
			color="textSecondary"
			style={{ marginLeft: "4%", marginTop: "4%" }}
		>
			&copy;&nbsp;
			{brand.starter.footerText}
		</Typography>
	);
}

const footers = [
	{
		title: "Company",
		description: [
			"Portfolio",
			"Testimonials",
			"Franchise Store",
			"Reward Store",
			"Help & Support",
			"Contact US",
		],
		link: ["#"],
	},
	{
		title: "Our Projects",
		description: [
			"Indian Shaadiwala",
			"Coming Soon",
			"Coming Soon",
			"Coming Soon",
			"Coming Soon",
			"Coming Soon",
		],
		link: ["#"],
	},
	{
		title: "Request",
		description: [
			"Franchise",
			"IBC (Agent)",
			"Office Job",
			"Home Job",
			"Freelancing",
			"Tender",
		],
		link: ["#"],
	},
	{
		title: "Policy",
		description: [
			"Legal",
			"Fraud Alert",
			"Terms of Use",
			"Disclaimer",
			"Cookies",
			"Privacy",
		],
		link: ["#"],
	},
];

function Footer(props) {
	// Theme breakpoints
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	// Translation Function
	const { t } = props;

	const classes = useStyles();
	const align = useTextAlign();
	const [values, setValues] = useState({
		lang: "en",
	});

	useEffect(() => {
		setValues({ lang: i18n.language });
	}, []);

	// function handleChange(event) {
	//   setValues(oldValues => ({
	//     ...oldValues,
	//     [event.target.name]: event.target.value,
	//   }));
	//   if (event.target.value === 'ar') {
	//     i18n.changeLanguage('ar');
	//     props.toggleDir('rtl');
	//   } else {
	//     i18n.changeLanguage(event.target.value);
	//     props.toggleDir('ltr');
	//   }
	// }

	return (
		<Container
			maxWidth="lg"
			component="footer"
			className={classes.footer}
			style={{ borderTop: "0.5px Solid Black", marginTop: "1%" }}
		>
			<Grid container spacing={4}>
				<Grid
					item
					xs={12}
					justify="center"
					alignItems="center"
					container
					md={4}
				>
					<div className={classes.logo}>
						<img src={logo} alt="logo" width="50%" />
					</div>
					<center>
						<img src={playstore} alt="Play Store" width="50%" />
					</center>
					{isDesktop && <Copyright />}
				</Grid>
				<Grid item xs={12} md={8}>
					<Grid container spacing={4} justify="space-evenly">
						{footers.map((footer, i) => (
							<Grid item xs={12} md={3} key={i} className={classes.siteMapItem}>
								{isDesktop && (
									<div>
										<Typography
											variant="h6"
											className={classes.title}
											color="textPrimary"
											gutterBottom
										>
											{footer.title}
										</Typography>
										<ul>
											{footer.description.map((item, index) => (
												<li key={item}>
													<Link
														href={footer.link[index]}
														variant="subtitle1"
														color="textSecondary"
													>
														{item}
													</Link>
												</li>
											))}
										</ul>
									</div>
								)}
								{isMobile && (
									<Accordion
										square
										classes={{
											root: classes.accordionRoot,
										}}
									>
										<AccordionSummary
											expandIcon={
												<ExpandMoreIcon className={classes.accordionIcon} />
											}
											aria-controls="panel1a-content"
											id="panel1a-header"
											classes={{
												content: classes.accordionContent,
											}}
										>
											<strong>{footer.title}</strong>
										</AccordionSummary>
										<AccordionDetails>
											<ul>
												{footer.description.map((item, index) => (
													<li key={index}>
														<Link
															href={footer.link[index]}
															variant="subtitle1"
															color="textSecondary"
														>
															{item}
														</Link>
													</li>
												))}
											</ul>
										</AccordionDetails>
									</Accordion>
								)}
							</Grid>
						))}
					</Grid>
				</Grid>
				<Grid item xs={12} md={3}>
					<div className={classes.socmed}>
						<IconButton
							aria-label="FacebookIcon"
							className={classes.margin}
							size="small"
						>
							<FacebookIcon fontSize="64" />
						</IconButton>
						<IconButton
							aria-label="TwitterIcon"
							className={classes.margin}
							size="small"
						>
							<TwitterIcon fontSize="64px" />
						</IconButton>
						<IconButton
							aria-label="Instagram"
							className={classes.margin}
							size="small"
						>
							<InstagramIcon fontSize="64px" />
						</IconButton>
						<IconButton
							aria-label="LinkedinIcon"
							className={classes.margin}
							size="small"
						>
							<LinkedinIcon fontSize="64px" />
						</IconButton>
						<IconButton
							aria-label="YoutubeIcon"
							className={classes.margin}
							size="small"
						>
							<YoutubeIcon fontSize="64px" />
						</IconButton>
					</div>
					{/* <Select
            value={values.lang}
            onChange={handleChange}
            startAdornment={(
              <InputAdornment className={classes.icon} position="start">
                <LangIcon />
              </InputAdornment>
            )}
            className={classes.selectLang}
            input={<OutlinedInput labelWidth={200} name="lang" id="outlined-lang-simple" />}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="de">Deutsch</MenuItem>
            <MenuItem value="ar">العربيّة</MenuItem>
            <MenuItem value="id">Bahasa Indonesia</MenuItem>
            <MenuItem value="pt">Português</MenuItem>
            <MenuItem value="zh">简体中文</MenuItem>
          </Select> */}
				</Grid>
			</Grid>
			{isMobile && (
				<div className={align.textCenter}>
					<Box p={4}>
						<Copyright />
					</Box>
				</div>
			)}
		</Container>
	);
}

Footer.propTypes = {
	t: PropTypes.func.isRequired,
	toggleDir: PropTypes.func,
};

Footer.defaultProps = {
	toggleDir: () => {},
};

export default withTranslation(["starter-landing"])(Footer);
