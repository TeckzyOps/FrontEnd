import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Cookies from "js-cookie";
import { Button, Link, Badge } from "@material-ui/core/";
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
function createData(name, url) {
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
		createData(navMenu[0], "/"),
		createData(navMenu[1], "#" + navMenu[1]),
		createData(navMenu[2], "#" + navMenu[2]),
		createData(navMenu[3], "#" + navMenu[3]),
		createData(navMenu[4], "#" + navMenu[4]),
		createData(navMenu[5], "#" + navMenu[5]),
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
								<Scrollspy items={navMenu} currentClassName="active">
									{menuList.map((item) => (
										<li key={item.id.toString()}>
											<Link href={item.url} style={{ textDecoration: "none" }}>
												<Button color="primary">{item.name}</Button>
											</Link>
										</li>
									))}
									{/* <li>
										<Button href="/contact">Contact</Button>
									</li> */}
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
										<IconButton color="primary">
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
		</Fragment>
	);
}

Header.propTypes = {
	onToggleDark: PropTypes.func.isRequired,
	onToggleDir: PropTypes.func.isRequired,
};

export default Header;
