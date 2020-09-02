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
import Familydetails from "../../../components/Forms/mat_familydetails";
import Basicdetails from "../../../components/Forms/mat_basicdetails";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";

const localStorageService = LocalStorageService.getService();

function getSteps() {
	return ["Basic Details", "Family Details", "LifeStyle Details"];
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
	const [matrimony_id, setMatrimonyId] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set());
	const steps = getSteps();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	function getStepContent(step) {
		switch (step) {
			case 0:
				return (
					<Basicdetails nextForm={handleNext} setMatrimonyID={setMatrimonyId} />
				);
			case 1:
				return (
					<Familydetails
						backForm={handleBack}
						nextForm={handleNext}
						MatrimonyID={matrimony_id}
					/>
				);
			case 2:
				return (
					<Lifestyledetails
						MatrimonyID={matrimony_id}
						backForm={handleBack}
						nextForm={handleNext}
					/>
				);
			default:
				return "Unknown step";
		}
	}
	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

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
							<Typography className={classes.instructions}>
								{getStepContent(activeStep)}
							</Typography>
							{/* <div>
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
							</div> */}
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

export default withAuth(Matrimony);
