import React from "react";
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
import { matrimonyActions } from "../../../_actions/matrimony.action";

const localStorageService = LocalStorageService.getService();

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
		padding: theme.spacing(4),
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
	const [activeStep, setActiveStep] = React.useState(0);
	const [details, setDetails] = React.useState({});
	const [matrimony_id, setMatrimonyId] = React.useState(0);
	const [familydetails_id, setfamilydetailsId] = React.useState(0);
	const [lifetsyledetails_id, setlifetsyledetailsId] = React.useState(0);
	const [defaultdetails_id, setdefaultdetailsId] = React.useState(0);
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

			<DashboardWrapper logindata={props.logindata} userdata={props.userdata} />
			<div className={classes.root}>
				<Stepper activeStep={activeStep}>
					{steps.map((label, index) => {
						const stepProps = {};
						const labelProps = {};

						return (
							<Step key={label} {...stepProps}>
								<StepButton onClick={handleStep(index)}>{label}</StepButton>
							</Step>
						);
					})}
				</Stepper>
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
							{getStepContent(activeStep)}

							<div>
								<Button
									disabled={activeStep === 0}
									onClick={handleBack}
									className={classes.button}
								>
									Back
								</Button>
								<Button
									variant="contained"
									color="primary"
									onClick={handleNext}
									className={classes.button}
								>
									{activeStep === steps.length - 1 ? "Finish" : "Next"}
								</Button>
							</div>
						</div>
					)}
				</div>
				{/* <Grid container spacing={2}>
					<Paper className={classes.paper}>
						<Grid container spacing={2}>
							<Grid item md={12} xs={12}>
								<Basicdetails />
							</Grid>
							<Grid item md={12} xs={12}>
								<Lifestyledetails />
							</Grid>
							<Grid item md={12} xs={12}>
								<Familydetails />
							</Grid>
						</Grid>
					</Paper>
				</Grid> */}
			</div>
		</React.Fragment>
	);
};

export default withRouter(withAuth(Matrimony));
