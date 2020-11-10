import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Cookies from "js-cookie";
import { Button, Link, Badge, ListItem, Collapse } from "@material-ui/core/";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import AnchorLink from "react-anchor-link-smooth-scroll";
import Scrollspy from "react-scrollspy";
import Settings from "./Settings";
import MobileMenu from "./MobileMenu";
import logo from "~/static/home/navbarLogo.jpg";
import "~/vendors/hamburger-menu.css";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import useStyles from "./header-style";
import { useAuth } from "../provider/Auth";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import routerLink from "~/static/text/link";

import LocalStorageService from "../../_services/LocalStorageService";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
const localStorageService = LocalStorageService.getService();
import navMenu from "./menu";

let counter = 0;
function createNavs(name, url) {
	counter += 1;
	return {
		id: counter,
		name,
		url,
	};
}

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
	return <AnchorLink to={props.to} {...props} innerRef={ref} />;
});

function Header(props) {
	const [fixed, setFixed] = useState(false);
	const { logout } = useAuth();
	const [isAuthenticated, setIsAuthenticated] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [LocationanchorEl, setLocationanchorEl] = React.useState(null);
	const [details, setDetails] = useState({});
	let flagFixed = false;
	const handleScroll = () => {
		const doc = document.documentElement;
		const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
		const newFlagFixed = scroll > -1;
		if (flagFixed !== newFlagFixed) {
			setFixed(newFlagFixed);
			flagFixed = newFlagFixed;
		}
	};
	const classes = useStyles();
	const theme = useTheme();
	const { onToggleDark, onToggleDir } = props;
	const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const [expandjoinus, setExpandJoinus] = React.useState(null);
	const [joinusanchorEl, setJoinusAnchorEl] = React.useState(null);
	const isMenuOpen = Boolean(anchorEl);
	const isLocationMenuOpen = Boolean(LocationanchorEl);
	useEffect(() => {
		handleScroll();
		if (localStorageService.getAccessToken()) {
			setIsAuthenticated(true);
		}
		setDetails(localStorageService.getUserDetails("Details"));
		// window.addEventListener("scroll", handleScroll);
	}, []);
	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleLocationMenuOpen = (event) => {
		setLocationanchorEl(event.currentTarget);
	};
	const [menuList] = useState([
		createNavs(navMenu[0].name, navMenu[0].link),
		createNavs(navMenu[1].name, navMenu[1].link),
		createNavs(navMenu[2].name, navMenu[2].link),
		createNavs(navMenu[3].name, navMenu[3].link),
		createNavs(navMenu[4].name, navMenu[4].link),
	]);
	const [openDrawer, setOpenDrawer] = useState(false);
	const handleOpenDrawer = () => {
		setOpenDrawer(!openDrawer);
	};
	const menuId = "primary-search-account-menu";
	const LocationmenuId = "primary-Location-menu";
	const handleMenuClose = () => {
		setAnchorEl(null);
		setLocationanchorEl(null);
	};
	const handleLogout = () => {
		setAnchorEl(null);
		handleMenuClose();
		logout();
	};

	const renderLocationMenu = (
		<Menu
			anchorEl={LocationanchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={LocationmenuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isLocationMenuOpen}
			onClose={handleMenuClose}
		>
			<Link>
				<MenuItem onClick={handleMenuClose}>Mumbai</MenuItem>
			</Link>
			<Link>
				<MenuItem onClick={handleMenuClose}>Lucknow</MenuItem>
			</Link>
		</Menu>
	);

	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<Link href={routerLink.starter.profile}>
				<MenuItem onClick={handleMenuClose}>Wallet</MenuItem>
			</Link>
			<Link href={routerLink.starter.profile}>
				<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			</Link>

			<MenuItem onClick={handleLogout}>Logout</MenuItem>
		</Menu>
	);
	function createData(services, newlink, existingLink) {
		return { services, newlink, existingLink };
	}

	const joinusrows = [
		createData(
			"Matrimony",
			routerLink.starter.matrimonynew,
			routerLink.starter.matrimonyAds
		),
		createData(
			"Freelancer",
			routerLink.starter.freelancernew,
			routerLink.starter.freelancer
		),

		createData(
			"Services Vendor",
			routerLink.starter.vendornew,
			routerLink.starter.vendor
		),
		createData(
			"Goods Vendor",
			routerLink.starter.sellernew,
			routerLink.starter.seller
		),
		createData(
			"Hunarbaaz",
			routerLink.starter.workernew,
			routerLink.starter.worker
		),
		createData("B2B Vendor", routerLink.starter.b2bnew, routerLink.starter.b2b),
	];

	const handlejoinusClick = (event) => {
		setJoinusAnchorEl(event.currentTarget);
	};

	const handlejoinusClose = () => {
		setJoinusAnchorEl(null);
		setExpandJoinus(null);
	};
	const joinusMenu = (
		<Menu
			id="joinus-menu"
			anchorEl={joinusanchorEl}
			keepMounted
			open={Boolean(joinusanchorEl)}
			onClose={handlejoinusClose}
		>
			<List component="nav">
				{joinusrows.map((item, index) => (
					<div keys={index}>
						<ListItem button onClick={() => setExpandJoinus(item.services)}>
							<ListItemText primary={item.services} />
							{expandjoinus == item.services ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
						<Collapse
							in={expandjoinus == item.services}
							timeout="auto"
							unmountOnExit
						>
							<List component="div" disablePadding>
								<ListItem button className={classes.nested}>
									<Link style={{ textDecoration: "none" }} href={item.newlink}>
										<ListItemText primary="New" />
									</Link>
								</ListItem>
								<ListItem button className={classes.nested}>
									<Link
										style={{ textDecoration: "none" }}
										href={item.existingLink}
									>
										<ListItemText primary="Existing" />
									</Link>
								</ListItem>
							</List>
						</Collapse>
					</div>
				))}
			</List>

			{/* <MenuItem onClick={handlejoinusClose}>Matrimony</MenuItem>
			<MenuItem onClick={handlejoinusClose}>Freelancer</MenuItem>
			<MenuItem onClick={handlejoinusClose}>Services Vendor</MenuItem>
			<MenuItem onClick={handlejoinusClose}>Goods Vendor</MenuItem>
			<MenuItem onClick={handlejoinusClose}>Hunarbaaz</MenuItem>
			<MenuItem onClick={handlejoinusClose}>B2B Vendor</MenuItem> */}
		</Menu>
	);

	return (
		<Fragment>
			{isMobile && (
				<MobileMenu open={openDrawer} toggleDrawer={handleOpenDrawer} />
			)}
			<AppBar
				position="relative"
				id="header"
				className={clsx(
					classes.header,
					fixed && classes.fixed,
					openDrawer && classes.openDrawer
				)}
			>
				<Container fixed>
					<div className={classes.headerContent}>
						<nav className={classes.navMenu}>
							{isMobile && (
								<IconButton
									onClick={handleOpenDrawer}
									className={clsx(
										"hamburger hamburger--spin",
										classes.mobileMenu,
										openDrawer && "is-active"
									)}
								>
									<span className="hamburger-box">
										<span className={clsx(classes.bar, "hamburger-inner")} />
									</span>
								</IconButton>
							)}
							<div>
								<Link style={{ textDecoration: "none" }} href="/">
									<img src={logo} width="100px" alt="logo" />
								</Link>
							</div>
							{isDesktop && (
								<Scrollspy items={navMenu.name} currentClassName="active">
									{menuList.map((item) => (
										<li key={item.id.toString()}>
											<Link href={item.url} style={{ textDecoration: "none" }}>
												<Button color="primary">{item.name}</Button>
											</Link>
										</li>
									))}
									<li>
										<Button
											color="primary"
											aria-controls="joinus-menu"
											aria-haspopup="true"
											onClick={handlejoinusClick}
										>
											Join Us
										</Button>
									</li>
								</Scrollspy>
							)}
						</nav>
						<nav className={classes.userMenu}>
							{/* { isDesktop && <Button href="/login">Login</Button> } */}

							{isAuthenticated ? (
								<div>
									{/* <IconButton
										aria-controls={LocationmenuId}
										aria-haspopup="true"
										onClick={handleLocationMenuOpen}
										color="primary"
									>
										<LocationCityIcon color="primary" />
									</IconButton> */}
									{isMobile && (
										<IconButton
											aria-controls="joinus-menu"
											aria-haspopup="true"
											onClick={handlejoinusClick}
											color="primary"
										>
											<PersonAddIcon color="primary" />
										</IconButton>
									)}
									<IconButton color="primary">
										<ShoppingCartIcon color="primary" />
									</IconButton>
									<IconButton color="inherit">
										<Badge badgeContent={4} color="primary">
											<NotificationsIcon />
										</Badge>
									</IconButton>
									<IconButton
										edge="end"
										aria-label="account of current user"
										aria-controls={menuId}
										aria-haspopup="true"
										onClick={handleProfileMenuOpen}
										color="primary"
									>
										<AccountCircle />
									</IconButton>
								</div>
							) : (
								<div>
									<Link style={{ textDecoration: "none" }} href="/login">
										<Button variant="contained" color="primary">
											Login
										</Button>
									</Link>
									&nbsp;
									<Link style={{ textDecoration: "none" }} href="/register">
										<Button variant="contained" color="primary">
											Register
										</Button>
									</Link>
								</div>
							)}

							{isDesktop && <span className={classes.vDivider} />}
							<Settings toggleDark={onToggleDark} toggleDir={onToggleDir} />
						</nav>
					</div>
				</Container>
			</AppBar>
			{renderMenu}
			{renderLocationMenu}
			{joinusMenu}
		</Fragment>
	);
}

Header.propTypes = {
	onToggleDark: PropTypes.func.isRequired,
	onToggleDir: PropTypes.func.isRequired,
};

export default Header;
