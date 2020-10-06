<<<<<<< HEAD
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
=======
import React, { useState } from "react";
import withAuth from "../../../components/Hoc/withAuth";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Box, Typography } from "@material-ui/core";
import routerLink from "~/static/text/link";
import Link from "@material-ui/core/Link";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Grid, CardContent, Card, Button, Divider } from "@material-ui/core";
import Head from "next/head";
import LocalStorageService from "../../../_services/LocalStorageService";
import Header from "../../../components/Header";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import IconButton from "@material-ui/core/IconButton";
import { Fab, useMediaQuery, Tab, Tabs } from "@material-ui/core/";
>>>>>>> 2eb69cad9f98587f8f61f10b85e899630956e00b
import { useTheme } from "@material-ui/core/styles";
import { useLocation, BrowserRouter as Router } from "react-router-dom";
import api, {
	addBearerToken,
	removeBearerToken,
} from "../../../utils/httpClient";
import {
<<<<<<< HEAD
	fieldToTextField,
	TextField,
	CheckboxWithLabel,
	TextFieldProps,
	Select,
	Switch,
} from "formik-material-ui";
import {
=======
>>>>>>> 2eb69cad9f98587f8f61f10b85e899630956e00b
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
<<<<<<< HEAD
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
=======
import ArtTrack from "@material-ui/icons/ContactMail";
import FavoriteIcon from "@material-ui/icons/People";
import PersonPinIcon from "@material-ui/icons/InsertEmoticon";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MatrimonyImageUpload from "../../../components/Forms/mat_imageUpload";
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
>>>>>>> 2eb69cad9f98587f8f61f10b85e899630956e00b
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
<<<<<<< HEAD
								<Grid item sm={6} xs={6}>

								</Grid>
								</Grid> */}
=======
                                <Grid item sm={6} xs={6}>

                                </Grid>
                                </Grid> */}
>>>>>>> 2eb69cad9f98587f8f61f10b85e899630956e00b
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
<<<<<<< HEAD
=======
		flexGrow: 1,
>>>>>>> 2eb69cad9f98587f8f61f10b85e899630956e00b
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
<<<<<<< HEAD
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
=======

	"& hr": {
		margin: theme.spacing(0, 0.5),
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
	},
	{
		title: "title",
		button: "Buy now",
		image:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTAZgq76yxXxF89lVYZLxDGflB7tS_6XI339g&usqp=CAU",
		user: "Bruno Vizovskyy",
	},
];
const profile = (props) => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const [activeStep, setActiveStep] = React.useState(0);
	const theme = useTheme();
	const { onToggleDark, onToggleDir } = props;
	const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const [images, setImages] = React.useState([]);
	const maxSteps = images.length;
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const [primaryImage, setprimaryImage] = React.useState(content[0].image);
	const [basicdetails, setbasicdetails] = React.useState({});
	const [imageDialog, setimageDialog] = React.useState(false);
>>>>>>> 2eb69cad9f98587f8f61f10b85e899630956e00b
	const [familydetails, setfamilydetails] = React.useState({});
	const [lifetsyledetails, setlifetsyledetails] = React.useState({});
	const [defaultdetails, setdefaultdetails] = React.useState({});
	React.useEffect(() => {
		matrimonyActions
			.getBasicDetails({ id: props.router.query.id })
			.then(function (response) {
<<<<<<< HEAD
				if (response.data.data.id) {
					setbasicdetails(response.data.data);
=======
				console.log("ressss", response);
				if (response.data.data.id) {
					setbasicdetails(response.data.data);
					let img = [];
					img[0] = response.data.data.pictures.path.one;
					img[1] = response.data.data.pictures.path.two;
					img[2] = response.data.data.pictures.path.three;
					img[3] = response.data.data.pictures.path.four;
					img[4] = response.data.data.pictures.path.five;
					img[5] = response.data.data.pictures.path.six;

					setImages(img);
>>>>>>> 2eb69cad9f98587f8f61f10b85e899630956e00b
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
<<<<<<< HEAD

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
=======
	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};
	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

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
		<React.Fragment>
			<Head>
				<title>Dashboard &nbsp; - Login</title>
			</Head>
			<Header
				onToggleDark={props.onToggleDark}
				onToggleDir={props.onToggleDir}
			/>
			<div
				className={classes.root}
				style={{ padding: "0 2%", marginTop: "2%" }}
			>
				<Grid container spacing={3} justify="space-around">
					<Grid
						style={{ borderRight: "0.5px dashed grey", padding: "0.6em" }}
						item
						md={5}
						xs={12}
					>
						{/* <Slider
							image={basicdetails.pictures != null ? basicdetails.pictures : ""}
						/> */}
						<Grid container justify="center">
							<Grid item>
								<div>
									<img
										style={{ maxWidth: 400, maxHeight: 450, flexGrow: 1 }}
										className={classes.img}
										src={images.length > 0 ? images[activeStep] : ""}
										alt={images.length > 0 && "Matrimony_Images"}
									/>
									<MobileStepper
										steps={maxSteps}
										position="static"
										variant="text"
										activeStep={activeStep}
										nextButton={
											<Button
												size="small"
												onClick={handleNext}
												disabled={activeStep === maxSteps - 1}
											>
												Next
												{theme.direction === "rtl" ? (
													<KeyboardArrowLeft />
												) : (
													<KeyboardArrowRight />
												)}
											</Button>
										}
										backButton={
											<Button
												size="small"
												onClick={handleBack}
												disabled={activeStep === 0}
											>
												{theme.direction === "rtl" ? (
													<KeyboardArrowRight />
												) : (
													<KeyboardArrowLeft />
												)}
												Back
											</Button>
										}
									/>
								</div>
							</Grid>
						</Grid>

						<Grid style={{ paddingTop: "2%", textAlign: "center" }}>
							<Button
								variant="contained"
								color="primary"
								size="large"
								style={{ marginRight: "1%" }}
								onClick={() => setimageDialog(true)}
							>
								Change Images
							</Button>
							<Link
								href={
									routerLink.starter.matrimonynew + "?id=" + basicdetails.id
								}
							>
								<Button
									variant="contained"
									color="primary"
									size="large"
									style={{ marginLeft: "1%" }}
								>
									Change Details
								</Button>
							</Link>
						</Grid>
					</Grid>

					<Grid item lg={7} md={7} xl={7} xs={12}>
						<div>
							<Paper
								square
								className={classes.root}
								style={{ postion: "fixed" }}
							>
								<Tabs
									value={value}
									onChange={handleChange}
									variant="fullWidth"
									indicatorColor="primary"
									textColor="primary"
									aria-label="icon label tabs example"
									style={{ width: "100%" }}
								>
									<Tab
										icon={<ArtTrack />}
										label="Basic Details"
										{...a11yProps(0)}
									/>
									<Tab
										icon={<FavoriteIcon />}
										label="Family Details"
										{...a11yProps(1)}
									/>
									<Tab
										icon={<PersonPinIcon />}
										label="Life Style"
										{...a11yProps(2)}
									/>
								</Tabs>
							</Paper>
						</div>
						<TabPanel
							style={{ backgroundColor: "red" }}
							value={value}
							index={0}
							style={{ padding: "0 1%" }}
						>
							<TableContainer component={Paper}>
								<Table className={classes.table} aria-label="simple table">
									<TableBody>
										<TableCell align="left">Name</TableCell>
										<TableCell align="left">{basicdetails.name}</TableCell>
									</TableBody>
									<TableBody>
										<TableCell align="left">Gender</TableCell>
										<TableCell align="left">
											{gender[basicdetails.gender - 1]}
										</TableCell>
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
										<TableCell align="left">
											{basicdetails.mother_tongue}
										</TableCell>
									</TableBody>
									<TableBody>
										<TableCell align="left">Marital Status</TableCell>
										<TableCell align="left">
											{maritialStatus[basicdetails.marital_status - 1]}
										</TableCell>
									</TableBody>
									<TableBody>
										<TableCell align="left">Childrens</TableCell>
										<TableCell align="left">{basicdetails.childrens}</TableCell>
									</TableBody>
									<TableBody>
										<TableCell align="left">Childrens Living Status</TableCell>
										<TableCell align="left">
											{basicdetails.childrens_living_status}
										</TableCell>
									</TableBody>
									<TableBody>
										<TableCell align="left">Manglik Status</TableCell>
										<TableCell align="left">
											{basicdetails.manglik_status}
										</TableCell>
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
										<TableCell align="left">
											{basicdetails.proffesion}
										</TableCell>
									</TableBody>
									<TableBody>
										<TableCell align="left">Occupation</TableCell>
										<TableCell align="left">
											{basicdetails.occupation}
										</TableCell>
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
										<TableCell align="left">
											{basicdetails.living_with_parents_status}
										</TableCell>
									</TableBody>
									<TableBody>
										<TableCell align="left">Wedding Budget</TableCell>
										<TableCell align="left">
											{basicdetails.wedding_budget}
										</TableCell>
									</TableBody>
								</Table>
							</TableContainer>
						</TabPanel>
						<TabPanel value={value} index={1} style={{ padding: "0 1%" }}>
							<TableContainer component={Paper}>
								<Table className={classes.table} aria-label="simple table">
									<TableBody>
										<TableCell align="left">Father Occupation</TableCell>
										<TableCell align="left">
											{familydetails.father_occupation}
										</TableCell>
									</TableBody>
									<TableBody>
										<TableCell align="left">Mother Occupation</TableCell>
										<TableCell align="left">
											{familydetails.mother_occupation}
										</TableCell>
									</TableBody>
									<TableBody>
										<TableCell align="left">Brother's</TableCell>
										<TableCell align="left">
											{familydetails.brother_count}
										</TableCell>
									</TableBody>
									<TableBody>
										<TableCell align="left">Married Brother</TableCell>
										<TableCell align="left">
											{familydetails.brother_married_count}
										</TableCell>
									</TableBody>
									<TableBody>
										<TableCell align="left">Sister's</TableCell>
										<TableCell align="left">
											{familydetails.sister_count}
										</TableCell>
									</TableBody>
									<TableBody>
										<TableCell align="left">Married Sister</TableCell>
										<TableCell align="left">
											{familydetails.sister_married_count}
										</TableCell>
									</TableBody>
									<TableBody>
										<TableCell align="left">Family Income</TableCell>
										<TableCell align="left">
											{familydetails.family_income}
										</TableCell>
									</TableBody>
									<TableBody>
										<TableCell align="left">Family Status</TableCell>
										<TableCell align="left">
											{familydetails.family_status}
										</TableCell>
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
						<TabPanel value={value} index={2} style={{ padding: "0 1%" }}>
							<TableContainer component={Paper}>
								<Table className={classes.table} aria-label="simple table">
									<TableBody>
										<TableCell align="left">Language Speak</TableCell>
										<TableCell align="left">
											{lifetsyledetails.language_speak}
										</TableCell>
									</TableBody>
									<TableBody>
										<TableCell align="left">Diatery Habits</TableCell>
										<TableCell align="left">
											{lifetsyledetails.diatery_habits}
										</TableCell>
									</TableBody>
									<TableBody>
										<TableCell align="left">Drinking Habits</TableCell>
										<TableCell align="left">
											{lifetsyledetails.drinking_habits}
										</TableCell>
									</TableBody>
									<TableBody>
										<TableCell align="left">Smoking Habits</TableCell>
										<TableCell align="left">
											{lifetsyledetails.smoking_habits}
										</TableCell>
									</TableBody>
									<TableBody>
										<TableCell align="left">House Own</TableCell>
										<TableCell align="left">
											{lifetsyledetails.house_own}
										</TableCell>
									</TableBody>
									<TableBody>
										<TableCell align="left">Car Own</TableCell>
										<TableCell align="left">
											{lifetsyledetails.car_own}
										</TableCell>
									</TableBody>
									<TableBody>
										<TableCell align="left">Hobbies</TableCell>
										<TableCell align="left">
											{lifetsyledetails.hobbies}
										</TableCell>
									</TableBody>
									<TableBody>
										<TableCell align="left">Interest</TableCell>
										<TableCell align="left">
											{lifetsyledetails.interest}
										</TableCell>
									</TableBody>
									<TableBody>
										<TableCell align="left">Sports</TableCell>
										<TableCell align="left">
											{lifetsyledetails.sports}
										</TableCell>
									</TableBody>
									<TableBody>
										<TableCell align="left">Email</TableCell>
										<TableCell align="left">{lifetsyledetails.email}</TableCell>
									</TableBody>
									<TableBody>
										<TableCell align="left">Gaurdian Number</TableCell>
										<TableCell align="left">
											{lifetsyledetails.gaurdian_number}
										</TableCell>
									</TableBody>
									<TableBody>
										<TableCell align="left">Alternate Number</TableCell>
										<TableCell align="left">
											{lifetsyledetails.alternate_number}
										</TableCell>
									</TableBody>
									<TableBody>
										<TableCell align="left">Call Time</TableCell>
										<TableCell align="left">
											{lifetsyledetails.call_time}
										</TableCell>
									</TableBody>
									<TableBody>
										<TableCell align="left">Disability</TableCell>
										<TableCell align="left">
											{lifetsyledetails.disability}
										</TableCell>
									</TableBody>
								</Table>
							</TableContainer>
						</TabPanel>
					</Grid>
				</Grid>
			</div>
			<Dialog
				fullWidth={true}
				maxWidth="md"
				open={imageDialog}
				onClose={() => setimageDialog(false)}
				aria-labelledby="max-width-dialog-title"
			>
				<DialogTitle id="max-width-dialog-title">
					Matrimony Profile - Image Upload
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Upload Images to be shown on your Profile.
					</DialogContentText>
					<MatrimonyImageUpload
						images={images}
						matrimonyID={props.router.query.id}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setimageDialog(false)} color="primary">
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
>>>>>>> 2eb69cad9f98587f8f61f10b85e899630956e00b
	);
};

export default withRouter(withAuth(profile));
