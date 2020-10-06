import React,{useState} from "react";
import withAuth from "../../../components/Hoc/withAuth";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Grid, CardContent, Card, Button,Divider } from "@material-ui/core";
import Head from "next/head";
import LocalStorageService from "../../../_services/LocalStorageService";
import DashboardWrapper from "../../../components/Dashboard/DashboardWrapper";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import IconButton from "@material-ui/core/IconButton";
import { Fab, useMediaQuery, Tab, Tabs } from "@material-ui/core/";

import TopSlider from "../../../components/AnimateSlider";
import AddIcon from "@material-ui/icons/Add";
import routerLink from "~/static/text/link";
import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
import { useTheme } from "@material-ui/core/styles";
import { useLocation, BrowserRouter as Router } from "react-router-dom";
import api, {
	addBearerToken,
	removeBearerToken,
} from "../../../utils/httpClient";
import {
	fieldToTextField,
	TextField,
	CheckboxWithLabel,
	TextFieldProps,
	Select,
	Switch,
} from "formik-material-ui";
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
import { matrimonyActions } from "../../../_actions/matrimony.action";
const localStorageService = LocalStorageService.getService();
import { withRouter } from "react-router";
import Paper from "@material-ui/core/Paper";
import ArtTrack from '@material-ui/icons/ContactMail';
import FavoriteIcon from '@material-ui/icons/People';
import PersonPinIcon from '@material-ui/icons/InsertEmoticon';
import Slider from  "./matrimonyProfileSlider";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					{/* <Grid container>
								<Grid item sm={6} xs={6}>

								</Grid>
								</Grid> */}
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		"aria-controls": `vertical-tabpanel-${index}`,
	};
}

function TabPanelMob(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yPropsMob(index) {
	return {
		id: `scrollable-auto-tab-${index}`,
		"aria-controls": `scrollable-auto-tabpanel-${index}`,
	};
}
const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	card: {
		minWidth: 275,
	},
	title: {
		fontSize: 14,
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
	},
	dl: {
		marginBottom: "50px",
	},
	dt: {
		background: "#5f9be3",
		color: "#fff",
		float: "left",
		fontWeight: "bold",
		marginRight: "10px",
		padding: "5px",
		width: "100px",
	},
	dd: {
		margin: "2px 0",
		padding: "5px 0",
	},
	'& hr': {
		margin: theme.spacing(0, 0.5),
	  },
}));

const profile = (props) => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const theme = useTheme();
	const { onToggleDark, onToggleDir } = props;
	const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const [basicdetails, setbasicdetails] = React.useState({});
	const [familydetails, setfamilydetails] = React.useState({});
	const [lifetsyledetails, setlifetsyledetails] = React.useState({});
	const [defaultdetails, setdefaultdetails] = React.useState({});
	React.useEffect(() => {
		matrimonyActions
			.getBasicDetails({ id: props.router.query.id })
			.then(function (response) {
				if (response.data.data.id) {
					setbasicdetails(response.data.data);
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
	}, []);

	function FamilyDetails() {
		return (
			<React.Fragment>
				{/* <Box fontWeight="fontWeightLight" m={2}>
					<Typography variant="h5" color="primary" component="p">
						Family Details
					</Typography>
				</Box>

				<Card className={classes.card}>
					<CardContent>
						<Grid container spacing={2}>
							<dl className={(classes.dl, classes.dt, classes.dd)}>
								<dt className={classes.dt}>Name</dt>
								<dd className={classes.dd}>{basicdetails["name"]}</dd>
								<dt className={classes.dt}>Gender</dt>
								<dd className={classes.dd}>{basicdetails["gender"]}</dd>
								<dt className={classes.dt}>Date Of Birth</dt>
								<dd className={classes.dd}>{basicdetails["dob_year"]}</dd>
								<dt className={classes.dt}>Height</dt>
								<dd className={classes.dd}>{basicdetails["height"]}</dd>
								<dt className={classes.dt}>Education</dt>
								<dd className={classes.dd}>{basicdetails["education"]}</dd>
								<dt className={classes.dt}>Profession</dt>
								<dd className={classes.dd}>{basicdetails["proffesion"]}</dd>
							</dl>

							<dl className={(classes.dl, classes.dt, classes.dd)}>
								<dt className={classes.dt}>Religion</dt>
								<dd className={classes.dd}>{basicdetails["religion"]}</dd>
								<dt className={classes.dt}>Cast</dt>
								<dd className={classes.dd}>{basicdetails["cast"]}</dd>

								<dt className={classes.dt}>Married</dt>
								<dd className={classes.dd}>
									{maritialStatus[basicdetails["marital_status"]]}
								</dd>
								<dt className={classes.dt}>Gotra</dt>
								<dd className={classes.dd}>{basicdetails["gotra"]}</dd>
								<dt className={classes.dt}>Mother Tongue</dt>
								<dd className={classes.dd}>{basicdetails["mother_tongue"]}</dd>
							</dl>
						</Grid>
					</CardContent>
				</Card> */}
			</React.Fragment>
		);
	}
	function BasicDetails() {
		return (
			<React.Fragment>
				
				<Box fontWeight="fontWeightLight" m={2}>
					<Typography variant="h5" color="primary" component="p">
						Basic Details
					</Typography>
				</Box>

				<Box fontWeight="fontWeightLight" m={2}>
					<Card className={classes.card}>
						<CardContent>
							<Grid container>
								<Grid item sm={6} xs={6}>
									<dt className={classes.dt}>Name</dt>
									<dd className={classes.dd}>{basicdetails["name"]}</dd>
									<dt className={classes.dt}>Gender</dt>
									<dd className={classes.dd}>{basicdetails["gender"]}</dd>
									<dt className={classes.dt}>Date Of Birth</dt>
									<dd className={classes.dd}>{basicdetails["dob_year"]}</dd>
									<dt className={classes.dt}>Height</dt>
									<dd className={classes.dd}>{basicdetails["height"]}</dd>
									<dt className={classes.dt}>Education</dt>
									<dd className={classes.dd}>{basicdetails["education"]}</dd>
									<dt className={classes.dt}>Profession</dt>
									<dd className={classes.dd}>{basicdetails["proffesion"]}</dd>
								</Grid>
								<Grid item sm={6} xs={6}>
									<dt className={classes.dt}>Religion</dt>
									<dd className={classes.dd}>{basicdetails["religion"]}</dd>
									<dt className={classes.dt}>Cast</dt>
									<dd className={classes.dd}>{basicdetails["cast"]}</dd>

									<dt className={classes.dt}>Married</dt>
									<dd className={classes.dd}>
										{maritialStatus[basicdetails["marital_status"]]}
									</dd>
									<dt className={classes.dt}>Gotra</dt>
									<dd className={classes.dd}>{basicdetails["gotra"]}</dd>
									<dt className={classes.dt}>Mother Tongue</dt>
									<dd className={classes.dd}>
										{basicdetails["mother_tongue"]}
									</dd>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Box>
			</React.Fragment>
		);
	}

	function LifestyleDetails() {
		return (
			<React.Fragment>
				<Box fontWeight="fontWeightLight" m={2}>
					<Typography variant="h5" color="primary" component="p">
						LifeStyle Details
					</Typography>
				</Box>
				<Box fontWeight="fontWeightLight" m={2}>
					<Card className={classes.card}>
						<CardContent>
							<Grid container>
								<Grid item sm={6} xs={6}>
									<dl className={(classes.dl, classes.dt, classes.dd)}>
										<dt className={classes.dt}>Name</dt>
										<dd className={classes.dd}>{basicdetails["name"]}</dd>
										<dt className={classes.dt}>Gender</dt>
										<dd className={classes.dd}>{basicdetails["gender"]}</dd>
										<dt className={classes.dt}>Date Of Birth</dt>
										<dd className={classes.dd}>{basicdetails["dob_year"]}</dd>
										<dt className={classes.dt}>Height</dt>
										<dd className={classes.dd}>{basicdetails["height"]}</dd>
										<dt className={classes.dt}>Education</dt>
										<dd className={classes.dd}>{basicdetails["education"]}</dd>
										<dt className={classes.dt}>Profession</dt>
										<dd className={classes.dd}>{basicdetails["proffesion"]}</dd>
									</dl>
								</Grid>
								<Grid item sm={6} xs={6}>
									<dl className={(classes.dl, classes.dt, classes.dd)}>
										<dt className={classes.dt}>Religion</dt>
										<dd className={classes.dd}>{basicdetails["religion"]}</dd>
										<dt className={classes.dt}>Cast</dt>
										<dd className={classes.dd}>{basicdetails["cast"]}</dd>
										<dt className={classes.dt}>Married</dt>
										<dd className={classes.dd}>
											{maritialStatus[basicdetails["marital_status"]]}
										</dd>
										<dt className={classes.dt}>Gotra</dt>
										<dd className={classes.dd}>{basicdetails["gotra"]}</dd>
										<dt className={classes.dt}>Mother Tongue</dt>
										<dd className={classes.dd}>
											{basicdetails["mother_tongue"]}
										</dd>
									</dl>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Box>
			</React.Fragment>
		);
	}

	function MatchPrefereneces() {
		return (
			<React.Fragment>
				<Box fontWeight="fontWeightLight" m={2}>
					<Typography variant="h5" color="primary" component="p">
						Match Preferences
					</Typography>
				</Box>
				<Box fontWeight="fontWeightLight" m={2}>
					<Card className={classes.card}>
						<CardContent>
							<Grid container>
								<Grid item sm={6} xs={6}>
									<dl className={(classes.dl, classes.dt, classes.dd)}>
										<dt className={classes.dt}>Name</dt>
										<dd className={classes.dd}>{basicdetails["name"]}</dd>
										<dt className={classes.dt}>Gender</dt>
										<dd className={classes.dd}>{basicdetails["gender"]}</dd>
										<dt className={classes.dt}>Date Of Birth</dt>
										<dd className={classes.dd}>{basicdetails["dob_year"]}</dd>
										<dt className={classes.dt}>Height</dt>
										<dd className={classes.dd}>{basicdetails["height"]}</dd>
										<dt className={classes.dt}>Education</dt>
										<dd className={classes.dd}>{basicdetails["education"]}</dd>
										<dt className={classes.dt}>Profession</dt>
										<dd className={classes.dd}>{basicdetails["proffesion"]}</dd>
									</dl>
								</Grid>
								<Grid item sm={6} xs={6}>
									<dl className={(classes.dl, classes.dt, classes.dd)}>
										<dt className={classes.dt}>Religion</dt>
										<dd className={classes.dd}>{basicdetails["religion"]}</dd>
										<dt className={classes.dt}>Cast</dt>
										<dd className={classes.dd}>{basicdetails["cast"]}</dd>
										<dt className={classes.dt}>Married</dt>
										<dd className={classes.dd}>
											{maritialStatus[basicdetails["marital_status"]]}
										</dd>
										<dt className={classes.dt}>Gotra</dt>
										<dd className={classes.dd}>{basicdetails["gotra"]}</dd>
										<dt className={classes.dt}>Mother Tongue</dt>
										<dd className={classes.dd}>
											{basicdetails["mother_tongue"]}
										</dd>
									</dl>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Box>
			</React.Fragment>
		);
	}

	

	function TabPanel(props) {
		const { children, value, index, ...other } = props;
	  
		return (
		  <div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-prevent-tabpanel-${index}`}
			aria-labelledby={`scrollable-prevent-tab-${index}`}
			{...other}
		  >
			{value === index && (
			  <Box p={3}>
				<Typography>{children}</Typography>
			  </Box>
			)}
		  </div>
		);
	  }
	 
	return (
		// <div className={classes.root}>
			/* <Grid container spacing={2}>
				<Grid item md={4} xs={6}>
					<Grid justify="center" alignItems="center" container>
						<Grid item>
							<Avatar
								style={{
									width: "25%",
									height: "auto",
								}}
								alt="Remy Sharp"
								src="/static/images/logo.png"
							/>

							<Box fontWeight="fontWeightLight">
								<Link
									href={
										routerLink.starter.matrimonynew +
										"?id=" +
										props.router.query.id
									}
								>
									<Button variant="outlined" color="primary">
										Edit Details
									</Button>
								</Link>
							</Box>
							
						</Grid>
					</Grid>
				</Grid>

				<Grid item md={8} xs={6}>
					<Grid container>
						<Grid item>
							
						</Grid>
					</Grid>
				</Grid>
			</Grid> */

			/* <Tabs
				orientation="vertical"
				variant="scrollable"
				value={value}
				onChange={handleChange}
				className={classes.tabs}
				style={{ "text-align": "center" }}
			>
				<Tab label="Basic Details" {...a11yProps(0)} />
				<Tab label="Family Details" {...a11yProps(1)} />
				<Tab label="LifeStyle Details" {...a11yProps(2)} />
				<Tab label="Match Preferences" {...a11yProps(3)} />
				<Tab label="Item Five" {...a11yProps(4)} />
				<Link
					href={
						routerLink.starter.matrimonynew + "?id=" + props.router.query.id
					}
				>
					<Button variant="outlined" color="primary">
						Edit Details
					</Button>
				</Link>
			</Tabs>

			<TabPanel value={value} index={1}>
				<FamilyDetails />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<LifestyleDetails />
			</TabPanel>
			<TabPanel value={value} index={3}>
				<MatchPrefereneces />
			</TabPanel> */
			
		// </div>
	
		<React.Fragment>
		<Head>
			<title>Dashboard &nbsp; - Login</title>
		</Head>
		<DashboardWrapper logindata={props.logindata} userdata={props.userdata} />
		<div className={classes.root} style={{padding:'0 2%', marginTop:"2%"}}>

			
		<Grid container spacing={3} justify="space-around" >
			<Grid  style={{ borderRight: "0.5px dashed grey", padding: "0.6em" }} item lg={5} md={5} xl={5} xs={12} >
			<Slider image={basicdetails.pictures != null ?basicdetails.pictures :"" }/>
			
			<Grid style={{paddingTop:'2%', textAlign:'center'}}>
				<Button variant="contained" color="primary" size="large" style={{marginRight:'1%'}}>
				Change Images
				</Button>
				<Button variant="contained" color="primary" size="large" style={{marginLeft:'1%'}}>
				Change Details
				</Button>
			</Grid>
			</Grid>
			
			
			<Grid item lg={7} md={7} xl={7} xs={12} >
		
				<div >
					
			<Paper square className={classes.root} style={{postion:'fixed'}}>
			<Tabs
				value={value}
				onChange={handleChange}
				variant="fullWidth"
				indicatorColor="primary"
				textColor="primary"
				aria-label="icon label tabs example"
				
				style={{width:'100%' }}
			>
				<Tab icon={<ArtTrack />} label="Basic Details" {...a11yProps(0)}/>
				<Tab icon={<FavoriteIcon />} label="Family Details" {...a11yProps(1)}/>
				<Tab icon={<PersonPinIcon />} label="Life Style" {...a11yProps(2)}/>

				</Tabs>
							
			</Paper>
			</div>
				<TabPanel style={{backgroundColor:"red"}} value={value} index={0} style={{padding:'0 1%'}}>
				<TableContainer component={Paper} >
					<Table className={classes.table} aria-label="simple table">
						
						<TableBody >
							<TableCell align="left">Name</TableCell>
							<TableCell align="left">{basicdetails.name}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">Gender</TableCell>
							<TableCell align="left">{gender[basicdetails.gender-1] }</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">Birth Year</TableCell>
							<TableCell align="left">{basicdetails.dob_year}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">Height</TableCell>
							<TableCell align="left">{basicdetails.height}"</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">Religion</TableCell>
							<TableCell align="left">{basicdetails.religion}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">Cast</TableCell>
							<TableCell align="left">{basicdetails.cast}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">Mother Tongue</TableCell>
							<TableCell align="left">{basicdetails.mother_tongue}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">Marital Status</TableCell>
							<TableCell align="left">{maritialStatus[basicdetails.marital_status-1]}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">Childrens</TableCell>
							<TableCell align="left">{basicdetails.childrens}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">Childrens Living Status</TableCell>
							<TableCell align="left">{basicdetails.childrens_living_status}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">Manglik Status</TableCell>
							<TableCell align="left">{basicdetails.manglik_status}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">Country</TableCell>
							<TableCell align="left">{basicdetails.country}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">State</TableCell>
							<TableCell align="left">{basicdetails.state}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">District</TableCell>
							<TableCell align="left">{basicdetails.district}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">Education</TableCell>
							<TableCell align="left">{basicdetails.education}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">Proffesion</TableCell>
							<TableCell align="left">{basicdetails.proffesion}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">Occupation</TableCell>
							<TableCell align="left">{basicdetails.occupation}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">Salary</TableCell>
							<TableCell align="left">{basicdetails.salary}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">Gotra</TableCell>
							<TableCell align="left">{basicdetails.gotra}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">Living With Parents ?</TableCell>
							<TableCell align="left">{basicdetails.living_with_parents_status}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">Wedding Budget</TableCell>
							<TableCell align="left">{basicdetails.wedding_budget}</TableCell>
						</TableBody>
					</Table>
					</TableContainer>
				</TabPanel>
				<TabPanel value={value} index={1} style={{padding:'0 1%'}}>
				<TableContainer component={Paper} >
					<Table className={classes.table} aria-label="simple table">
						
						<TableBody>
							<TableCell align="left">Father Occupation</TableCell>
							<TableCell align="left">{familydetails.father_occupation}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">Mother Occupation</TableCell>
							<TableCell align="left">{familydetails.mother_occupation}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">Brother's</TableCell>
							<TableCell align="left">{familydetails.brother_count}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">Married Brother</TableCell>
							<TableCell align="left">{familydetails.brother_married_count}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">Sister's</TableCell>
							<TableCell align="left">{familydetails.sister_count}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">Married Sister</TableCell>
							<TableCell align="left">{familydetails.sister_married_count}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">Family Income</TableCell>
							<TableCell align="left">{familydetails.family_income}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">Family Status</TableCell>
							<TableCell align="left">{familydetails.family_status}</TableCell>
						</TableBody>
						
						<TableBody>
							<TableCell align="left">Country</TableCell>
							<TableCell align="left">{familydetails.country}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">State</TableCell>
							<TableCell align="left">{familydetails.state}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left">District</TableCell>
							<TableCell align="left">{familydetails.district}</TableCell>
						</TableBody>
					</Table>
					</TableContainer>
				</TabPanel>
				<TabPanel value={value} index={2} style={{padding:'0 1%'}}>
				<TableContainer component={Paper} >
					<Table className={classes.table} aria-label="simple table">
						
						<TableBody>
							<TableCell align="left" >Language Speak</TableCell>
							<TableCell align="left">{lifetsyledetails.language_speak}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left" >Diatery Habits</TableCell>
							<TableCell align="left">{lifetsyledetails.diatery_habits}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left" >Drinking Habits</TableCell>
							<TableCell align="left">{lifetsyledetails.drinking_habits}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left" >Smoking Habits</TableCell>
							<TableCell align="left">{lifetsyledetails.smoking_habits}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left" >House Own</TableCell>
							<TableCell align="left">{lifetsyledetails.house_own}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left" >Car Own</TableCell>
							<TableCell align="left">{lifetsyledetails.car_own}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left" >Hobbies</TableCell>
							<TableCell align="left">{lifetsyledetails.hobbies}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left" >Interest</TableCell>
							<TableCell align="left">{lifetsyledetails.interest}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left" >Sports</TableCell>
							<TableCell align="left">{lifetsyledetails.sports}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left" >Email</TableCell>
							<TableCell align="left">{lifetsyledetails.email}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left" >Gaurdian Number</TableCell>
							<TableCell align="left">{lifetsyledetails.gaurdian_number}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left" >Alternate Number</TableCell>
							<TableCell align="left">{lifetsyledetails.alternate_number}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left" >Call Time</TableCell>
							<TableCell align="left">{lifetsyledetails.call_time}</TableCell>
						</TableBody>
						<TableBody>
							<TableCell align="left" >Disability</TableCell>
							<TableCell align="left">{lifetsyledetails.disability}</TableCell>
						</TableBody>
						

						

						
					</Table>
					</TableContainer>
				</TabPanel>
			
			</Grid>
		</Grid>
		</div>
  </React.Fragment>
	);
};

export default withRouter(withAuth(profile));
