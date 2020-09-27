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
import DashboardWrapper from "../../../components/Dashboard/DashboardWrapper";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import IconButton from "@material-ui/core/IconButton";
import { Fab, useMediaQuery, Tab, Tabs } from "@material-ui/core/";
import { useTheme } from "@material-ui/core/styles";
import { useLocation, BrowserRouter as Router } from "react-router-dom";
import api, {
	addBearerToken,
	removeBearerToken,
} from "../../../utils/httpClient";

import { freelancerActions } from "../../../_actions/freelancer.action";
const localStorageService = LocalStorageService.getService();
import { withRouter } from "react-router";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexGrow: 1,
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
	"& hr": {
		margin: theme.spacing(0, 0.5),
	},
	gridList: {
		flexWrap: "nowrap",
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: "translateZ(0)",
	},
	gridList_BG: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		overflow: "hidden",
		backgroundColor: theme.palette.background.paper,
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
const details = (props) => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const theme = useTheme();
	const { onToggleDark, onToggleDir } = props;
	const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const [primaryImage, setprimaryImage] = React.useState(content[0].image);
	const [details, setdetails] = React.useState({});
	const [imageDialog, setimageDialog] = React.useState(false);
	const [familydetails, setfamilydetails] = React.useState({});
	const [lifetsyledetails, setlifetsyledetails] = React.useState({});
	const [defaultdetails, setdefaultdetails] = React.useState({});
	React.useEffect(() => {
		console.log(props);
		freelancerActions
			.getFreelancer({ freelancer_id: props.router.query.id })
			.then(function (response) {
				console.log("ressss", response);

				if (response.data.data.id) {
					setdetails(response.data.data);
				}
			})
			.catch(function (error) {
				console.error("errrrr ", error);
			});
	}, []);

	return (
		<React.Fragment>
			<Head>
				<title>Freelancer &nbsp; - Details</title>
			</Head>
			<DashboardWrapper logindata={props.logindata} userdata={props.userdata} />
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
							image={details.pictures != null ? details.pictures : ""}
						/> */}
						<Grid container>
							<Grid
								item
								style={{
									textAlign: "center",
								}}
								xs={12}
							>
								<img
									src={primaryImage}
									style={{
										textAlign: "center",
										objectFit: "cover",
										width: "200px",
										height: "250px",
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<div className={classes.gridList_BG}>
									<GridList className={classes.gridList} cols={2.5}>
										{content.map((tile) => (
											<GridListTile key={tile.image}>
												<img
													onClick={() => setprimaryImage(tile.image)}
													src={tile.image}
													alt={tile.title}
												/>
											</GridListTile>
										))}
									</GridList>
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
								href={routerLink.starter.freelancernew + "?id=" + details.id}
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
						{/* <TableContainer component={Paper}>
							<Table className={classes.table} aria-label="simple table">
								<TableBody>
									<TableCell align="left">Name</TableCell>
									<TableCell align="left">{details.name}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Gender</TableCell>
									<TableCell align="left">
										{gender[details.gender - 1]}
									</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Birth Year</TableCell>
									<TableCell align="left">{details.dob_year}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Height</TableCell>
									<TableCell align="left">{details.height}"</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Religion</TableCell>
									<TableCell align="left">{details.religion}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Cast</TableCell>
									<TableCell align="left">{details.cast}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Mother Tongue</TableCell>
									<TableCell align="left">{details.mother_tongue}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Marital Status</TableCell>
									<TableCell align="left">
										{maritialStatus[details.marital_status - 1]}
									</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Childrens</TableCell>
									<TableCell align="left">{details.childrens}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Childrens Living Status</TableCell>
									<TableCell align="left">
										{details.childrens_living_status}
									</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Manglik Status</TableCell>
									<TableCell align="left">{details.manglik_status}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Country</TableCell>
									<TableCell align="left">{details.country}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">State</TableCell>
									<TableCell align="left">{details.state}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">District</TableCell>
									<TableCell align="left">{details.district}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Education</TableCell>
									<TableCell align="left">{details.education}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Proffesion</TableCell>
									<TableCell align="left">{details.proffesion}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Occupation</TableCell>
									<TableCell align="left">{details.occupation}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Salary</TableCell>
									<TableCell align="left">{details.salary}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Gotra</TableCell>
									<TableCell align="left">{details.gotra}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Living With Parents ?</TableCell>
									<TableCell align="left">
										{details.living_with_parents_status}
									</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Wedding Budget</TableCell>
									<TableCell align="left">{details.wedding_budget}</TableCell>
								</TableBody>
							</Table>
						</TableContainer> */}
					</Grid>
				</Grid>
			</div>
		</React.Fragment>
	);
};

export default withRouter(withAuth(details));
