import React from "react";
import Router from "next/router";
import withAuth from "../../../components/Hoc/withAuth";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Card } from "@material-ui/core";
import Head from "next/head";
import LocalStorageService from "../../../_services/LocalStorageService";
import DashboardWrapper from "../../../components/Dashboard/DashboardWrapper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import routerLink from "~/static/text/link";
import Lifestyledetails from "../../../components/Forms/mat_lifestyle";
import MatrimonyImageUpload from "../../../components/Forms/mat_imageUpload";
import Familydetails from "../../../components/Forms/mat_familydetails";
import Basicdetails from "../../../components/Forms/mat_basicdetails";
import DefaultPrefs from "../../../components/Forms/mat_defaultpreferences";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { matrimonyActions } from "../../../_actions/matrimony.action";
import Header from "../../../components/Header";
const localStorageService = LocalStorageService.getService();
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

function getSteps() {
	return [
		"Basic Details",
		"Family Details",
		"LifeStyle Details",
		"Default Preferences",
	];
}

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: "11vh",
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	addCard: {
		justifyContent: "center",
		alignItems: "center",
		display: "flex",
		height: "100%",
		maxWidth: 345,
		flexDirection: "column",
	},
}));
const Matrimony = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const [activeStep, setActiveStep] = React.useState(0);
	const [details, setDetails] = React.useState({});
	const [matrimony_id, setMatrimonyId] = React.useState(0);
	const [familydetails_id, setfamilydetailsId] = React.useState(0);
	const [lifetsyledetails_id, setlifetsyledetailsId] = React.useState(0);
	const [defaultdetails_id, setdefaultdetailsId] = React.useState(0);

	const autofillFunc = () => {
		let details = localStorageService.getUserDetails("Details");
		setDetails(details.profile.data);

		// Object.keys(basicdetails).forEach((k) => {
		// 	console.error(k);
		// 	if (details.login.hasOwnProperty(k)) {
		// 		if (details.login[k]) {
		// 			setbasicdetails({ ...basicdetails, [k]: details.login[k] });
		// 		}
		// 	} else if (details.profile.data.hasOwnProperty(k)) {
		// 		console.error(details.profile.data.hasOwnProperty(k));
		// 		console.error(details.profile.data[k]);
		// 		if (details.profile.data[k]) {
		// 			setbasicdetails({ ...basicdetails, [k]: details.profile.data[k] });
		// 		}
		// 	}
		// });
	};
	React.useEffect(() => {
		// console.error(Object.keys(state));
		setbasicdetails({
			filled_by: "",
			name: details.name ? details.name : "",
			gender: details.gender ? details.gender : "",
			dob_year: "",
			height: "",
			religion: details.religion ? details.religion : "",
			cast: "",
			mother_tongue: details.mother_tongue ? details.mother_tongue : "",
			marital_status: "",
			childrens: "",
			childrens_living_status: "",
			manglik_status: "",
			country: "",
			state: details.state ? details.state : "",
			district: details.district ? details.district : "",
			education:
				details.education && Array.isArray(JSON.parse(details.education))
					? JSON.parse(details.education)
					: "",
			proffesion: details.proffesion ? details.proffesion : "",
			occupation: details.occupation ? details.occupation : "",
			salary: "",
			gotra: "",
			living_with_parents_status: "",
			wedding_budget: "",
		});
	}, [details]);
	const [basicdetails, setbasicdetails] = React.useState({
		filled_by: "",
		name: details.name ? details.name : "",
		gender: details.gender ? details.gender : "",
		dob_year: "",
		height: "",
		religion: details.religion ? details.religion : "",
		cast: "",
		mother_tongue: details.mother_tongue ? details.mother_tongue : "",
		marital_status: "",
		childrens: "",
		childrens_living_status: "",
		manglik_status: "",
		country: "",
		state: details.state ? details.state : "",
		district: details.district ? details.district : "",
		education:
			details.education && Array.isArray(JSON.parse(details.education))
				? JSON.parse(details.education)
				: "",
		proffesion: details.proffesion ? details.proffesion : "",
		occupation: details.occupation ? details.occupation : "",
		salary: "",
		gotra: "",
		living_with_parents_status: "",
		wedding_budget: "",
	});
	const [familydetails, setfamilydetails] = React.useState({
		father_occupation: "",
		mother_occupation: "",
		brother_count: "",
		brother_married_count: "",
		sister_count: "",
		sister_married_count: "",
		family_income: "",
		family_status: "",
		country: "",
		state: "",
		district: "",
		metrimony_id: matrimony_id,
	});
	const [lifetsyledetails, setlifetsyledetails] = React.useState({
		metrimony_id: matrimony_id,
		language_speak: [],
		diatery_habits: "",
		drinking_habits: "",
		smoking_habits: "",
		house_own: "",
		car_own: "",
		hobbies: [],
		interest: [],
		sports: [],
		email: "",
		gaurdian_number: "",
		alternate_number: "",
		call_time: "",
		disability: "",
	});
	const [defaultdetails, setdefaultdetails] = React.useState({
		metrimony_id: matrimony_id,
		gender: "",
		age_from: "",
		age_to: "",
		height_from: "",
		height_to: "",
		marital_status: "",
		religion: [],
		cast: [],
		language_speak: [],
		wedding_budget_from: "",
		wedding_budget_to: "",
		proffesion: "",
		diatery_habits: "",
		drinking_habits: "",
		smoking_habits: "",
		disability: "",
	});
	React.useEffect(() => {
		setDetails(localStorageService.getUserDetails("Details"));
		if (props.router && props.router.query.id) {
			matrimonyActions
				.getBasicDetails({ id: props.router.query.id })
				.then(function (response) {
					if (response.data.data.id) {
						setbasicdetails(response.data.data);

						setMatrimonyId(response.data.data.id);
					}
				})
				.catch(function (error) {
					console.error("errrrr ", error);
				});
			matrimonyActions
				.getLifeStyleDetails({ metrimony_id: props.router.query.id })
				.then(function (response) {
					if (response.data.data.id) {
						setlifetsyledetails(response.data.data);
					}
				})
				.catch(function (error) {
					console.error("errrrr ", error);
				});
			matrimonyActions
				.getFamilyDetails({ metrimony_id: props.router.query.id })
				.then(function (response) {
					if (response.data.data.id) {
						setfamilydetails(response.data.data);
					}
				})
				.catch(function (error) {
					console.error("errrrr ", error);
				});
			matrimonyActions
				.getDefaultPrefs({ metrimony_id: props.router.query.id })
				.then(function (response) {
					if (response.data.data.id) {
						setdefaultdetails(response.data.data);
					}
				})
				.catch(function (error) {
					console.error("errrrr ", error);
				});
		}
	}, []);
	const [skipped, setSkipped] = React.useState(new Set());
	const steps = getSteps();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};
	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};
	7;
	function getStepContent(step) {
		switch (step) {
			// case 4:
			// 	return (
			// 		<MatrimonyImageUpload
			// 			nextform={handleNext}
			// 			matrimonyid={matrimony_id}
			// 			initvalue={basicdetails}
			// 		/>
			// 	);
			case 0:
				return (
					<Basicdetails
						nextform={handleNext}
						matrimonyid={matrimony_id}
						setmatrimonyid={setMatrimonyId}
						setbasicdetails={setbasicdetails}
						initvalue={basicdetails}
					/>
				);
			case 1:
				return (
					<Familydetails
						backform={handleBack}
						nextform={handleNext}
						familydetailsid={familydetails_id}
						setfamilydetailsid={setfamilydetailsId}
						setfamilydetails={setfamilydetails}
						initvalue={familydetails}
						matrimonyid={matrimony_id}
					/>
				);
			case 2:
				return (
					<Lifestyledetails
						matrimonyid={matrimony_id}
						backform={handleBack}
						lifetsyledetailsid={lifetsyledetails_id}
						setlifetsyledetailsid={setlifetsyledetailsId}
						setlifetsyledetails={setlifetsyledetails}
						initvalue={lifetsyledetails}
						nextform={handleNext}
					/>
				);
			case 3:
				return (
					<DefaultPrefs
						matrimonyid={matrimony_id}
						defaultdetailsid={defaultdetails_id}
						setdefaultdetailsid={setdefaultdetailsId}
						setdefaultdetails={setdefaultdetails}
						initvalue={defaultdetails}
						backform={handleBack}
						nextform={handleNext}
					/>
				);
			default:
				return "Unknown step";
		}
	}

	const handleReset = () => {
		setActiveStep(0);
	};
	const handleStep = (step) => () => {
		setActiveStep(step);
	};

	React.useEffect(() => {
		console.log("MettrimonyID==> ", matrimony_id);
	}, [matrimony_id]);

	return (
		<React.Fragment>
			<Head>
				<title>Dashboard &nbsp; - Matrimony</title>
			</Head>

			<Header
				onToggleDark={props.onToggleDark}
				onToggleDir={props.onToggleDir}
			/>
			<div className={classes.root}>
				<Grid container justifyContent="center" spacing={2}>
					<Grid item xs={12}>
						<Stepper activeStep={activeStep}>
							{isMobile && (
								<Step>
									<StepButton onClick={handleStep(activeStep)}>
										{steps[activeStep]}
									</StepButton>
								</Step>
							)}
							{isDesktop &&
								steps.map((label, index) => {
									const stepProps = {};
									const labelProps = {};

									return (
										<Step key={label} {...stepProps}>
											<StepButton onClick={handleStep(index)}>
												{label}
											</StepButton>
										</Step>
									);
								})}
						</Stepper>
					</Grid>
					<Grid item xs={12}>
						<div>
							{activeStep === steps.length ? (
								<div>
									<Typography className={classes.instructions}>
										All steps completed - you&apos;re finished
									</Typography>
									<Button onClick={handleReset} className={classes.button}>
										Reset
									</Button>
								</div>
							) : (
								<div>
									{activeStep == 0 && (
										<Button
											onClick={autofillFunc}
											color="primary"
											variant="outlined"
										>
											Autofill
										</Button>
									)}
									{getStepContent(activeStep)}
								</div>
							)}
						</div>
					</Grid>
				</Grid>
			</div>
		</React.Fragment>
	);
};
const redirectToLogin = (res) => {
	if (res) {
		res.writeHead(302, { Location: "/login" });
		res.end();
		res.finished = true;
	} else {
		Router.push("/login");
	}
};
const getCookieFromReq = (req, cookieKey) => {
	const cookie = req.headers.cookie
		.split(";")
		.find((c) => c.trim().startsWith(`${cookieKey}=`));

	if (!cookie) return undefined;
	return cookie.split("=")[1];
};

Matrimony.getInitialProps = ({ req, res }) => {
	const ISSERVER = typeof window === "undefined";
	let token = null;

	if (!ISSERVER) {
		token = localStorage.getItem("token");
	} else {
		token = getCookieFromReq(req, "token");
	}

	if (token == null) {
		console.log("GOING TO REDIRECT");
		redirectToLogin(res);
	}
	return {};
};
export default withRouter(Matrimony);
