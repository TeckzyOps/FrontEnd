import React from "react";
import {
	makeStyles,
	useTheme,
	createMuiTheme,
	responsiveFontSizes,
	MuiThemeProvider,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { CardMedia, CardHeader, Avatar, Grid } from "@material-ui/core/";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import logo from "~/static/home/navbarLogo.jpg";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(2),
	},
	paper: {
		padding: theme.spacing(2),
		margin: "auto",
		maxWidth: 500,
	},
	image: {
		width: 115,
		height: 120,
	},
	img: {
		float: "left",
		display: "block",
		maxWidth: "100%",
		maxHeight: "100%",
	},
	table: {
		minWidth: 250,
	},
}));

export default function CustomCard({ ad, ...props }) {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<Grid direction="row" container>
					<Grid item xs={6}>
						<img src={logo} width="100px" alt="logo" />
					</Grid>
					<Grid container justify="flex-end" item justify="flex-end" xs={6}>
						<MuiThemeProvider theme={theme}>
							<Typography variant="caption" color="inherit" noWrap>
								ID : &nbsp;
							</Typography>
							<Typography variant="caption" color="inherit" noWrap>
								{ad.worker_member_id} <br /> Worker
							</Typography>
						</MuiThemeProvider>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={8} sm container>
						<Grid item xs container alignItems="center" direction="row">
							<Grid item xs={12} zeroMinWidth>
								<div style={{ display: "flex" }}>
									<MuiThemeProvider theme={theme}>
										<Typography
											style={{ fontWeight: 500 }}
											variant="caption"
											color="inherit"
											noWrap
										>
											Candidate’s Name : &nbsp;
										</Typography>
										<Typography
											variant="caption"
											color="inherit"
											gutterBottom
											noWrap
										>
											{ad.bussiness_name}
										</Typography>
									</MuiThemeProvider>
								</div>

								<div style={{ display: "flex" }}>
									<MuiThemeProvider theme={theme}>
										<Typography
											style={{ fontWeight: 500 }}
											variant="caption"
											color="inherit"
											noWrap
										>
											Skill Work : &nbsp;
										</Typography>
										<Typography
											variant="caption"
											color="inherit"
											gutterBottom
											noWrap
										>
											{ad.sub_service}
										</Typography>
									</MuiThemeProvider>
								</div>

								<div style={{ display: "flex" }}>
									<MuiThemeProvider theme={theme}>
										<Typography
											style={{ fontWeight: 500 }}
											variant="caption"
											color="inherit"
											noWrap
										>
											Work's Area : &nbsp;
										</Typography>
										<Typography
											variant="caption"
											color="inherit"
											gutterBottom
											noWrap
										>
											{ad.service_area}
										</Typography>
									</MuiThemeProvider>
								</div>
								<div style={{ display: "flex" }}>
									<MuiThemeProvider theme={theme}>
										<Typography
											style={{ fontWeight: 500 }}
											variant="caption"
											color="inherit"
											noWrap
										>
											Contact Number : &nbsp;
										</Typography>
										<Typography
											variant="caption"
											color="inherit"
											gutterBottom
											noWrap
										>
											{ad.office_number}
										</Typography>
									</MuiThemeProvider>
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={4}>
						<ButtonBase className={classes.image}>
							<img
								className={classes.img}
								alt="complex"
								src="https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
							/>
						</ButtonBase>
					</Grid>
				</Grid>

				<Grid container>
					<Grid item xs={12}>
						<div style={{ display: "flex" }}>
							<MuiThemeProvider theme={theme}>
								<Typography
									style={{ fontWeight: 500 }}
									variant="caption"
									color="inherit"
									noWrap
								>
									Call/Visit Time : &nbsp;
								</Typography>
								<Typography
									variant="caption"
									color="inherit"
									gutterBottom
									noWrap
								>
									{ad.work_start_time + " - " + ad.work_end_time}
								</Typography>
							</MuiThemeProvider>
						</div>
						<div style={{ display: "flex" }}>
							<MuiThemeProvider theme={theme}>
								<Typography
									style={{ fontWeight: 500 }}
									variant="caption"
									color="inherit"
									noWrap
								>
									Don't Call/Visit : &nbsp;
								</Typography>
								<Typography
									variant="caption"
									color="inherit"
									gutterBottom
									noWrap
								>
									{ad.close_day}
								</Typography>
							</MuiThemeProvider>
						</div>
						<div style={{ display: "flex" }}>
							<MuiThemeProvider theme={theme}>
								<Typography
									style={{ fontWeight: 500 }}
									variant="caption"
									color="inherit"
									noWrap
								>
									Work's Experience : &nbsp;
								</Typography>
								<Typography
									variant="caption"
									color="inherit"
									gutterBottom
									noWrap
								>
									{ad.experience}
								</Typography>
							</MuiThemeProvider>
						</div>

						<div style={{ display: "flex" }}>
							<MuiThemeProvider theme={theme}>
								<Typography
									style={{ fontWeight: 500 }}
									variant="caption"
									color="inherit"
									noWrap
								>
									Candidate’s Email : &nbsp;
								</Typography>
								<Typography
									variant="caption"
									color="inherit"
									gutterBottom
									noWrap
								>
									{ad.office_email}
								</Typography>
							</MuiThemeProvider>
						</div>
						<div style={{ display: "flex" }}>
							<MuiThemeProvider theme={theme}>
								<Typography
									style={{ fontWeight: 500 }}
									variant="caption"
									color="inherit"
									noWrap
								>
									Candidate’s Address : &nbsp;
								</Typography>
								<Typography
									variant="caption"
									color="inherit"
									gutterBottom
									noWrap
								>
									{ad.address}
								</Typography>
							</MuiThemeProvider>
						</div>
						<div style={{ display: "flex" }}>
							<MuiThemeProvider theme={theme}>
								<Typography
									style={{ fontWeight: 500 }}
									variant="caption"
									color="inherit"
									noWrap
								>
									Candidate’s Profile : &nbsp;
								</Typography>
								<Typography
									variant="caption"
									color="inherit"
									gutterBottom
									noWrap
								>
									<a href="#">View</a>
								</Typography>
							</MuiThemeProvider>
						</div>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
}
