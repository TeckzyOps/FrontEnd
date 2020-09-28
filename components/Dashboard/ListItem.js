import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
// import Link from "next/link";
import routerLink from "~/static/text/link";
import Link from "@material-ui/core/Link";

import CardMembershipIcon from "@material-ui/icons/CardMembership";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import SettingsIcon from "@material-ui/icons/Settings";
import StoreIcon from "@material-ui/icons/Store";
import HelpIcon from "@material-ui/icons/Help";

export const mainListItems = (
	<div>
		<ListItem component={Link} href={routerLink.starter.dashboard} button>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<ListItemText primary="Dashboard" />
		</ListItem>
		<ListItem component={Link} href={routerLink.starter.profile} button>
			<ListItemIcon>
				<ShoppingCartIcon />
			</ListItemIcon>
			<ListItemText primary="Order" />
		</ListItem>
		<ListItem component={Link} href={routerLink.starter.matrimony} button>
			<ListItemIcon>
				<PeopleIcon />
			</ListItemIcon>
			<ListItemText primary="Matrimony" />
		</ListItem>
		<ListItem component={Link} href={routerLink.starter.profile} button>
			<ListItemIcon>
				<BarChartIcon />
			</ListItemIcon>
			<ListItemText primary="Reports" />
		</ListItem>
		<ListItem component={Link} href={routerLink.starter.profile} button>
			<ListItemIcon>
				<SettingsIcon />
			</ListItemIcon>
			<ListItemText primary="Setting" />
		</ListItem>
		<ListItem component={Link} href={routerLink.starter.freelancer} button>
			<ListItemIcon>
				<CardMembershipIcon />
			</ListItemIcon>
			<ListItemText primary="Freelancer" />
		</ListItem>
	</div>
);

export const secondaryListItems = (
	<div>
		<ListSubheader inset>Services</ListSubheader>
		<ListItem component={Link} href={routerLink.starter.worker} button>
			<ListItemIcon>
				<HelpIcon />
			</ListItemIcon>
			<ListItemText primary="Workers" />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<StoreIcon />
			</ListItemIcon>
			<ListItemText primary="Vendors" />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Year-end sale" />
		</ListItem>
	</div>
);
