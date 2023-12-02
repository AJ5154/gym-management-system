import {
    DashboardRounded,
    Download,
    GridView,
    People,
    SubscriptionsRounded
} from "@mui/icons-material";
import {
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
} from "@mui/material";
import React from "react";


export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <SubscriptionsRounded />
      </ListItemIcon>
      <ListItemText primary="Subscription" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <DashboardRounded />
      </ListItemIcon>
      <ListItemText primary="DashBoard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Download />
      </ListItemIcon>
      <ListItemText primary="Download Member" />
    </ListItemButton>
  </React.Fragment>
);
export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader inset>Manage Gym</ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <People />
      </ListItemIcon>
      <ListItemText primary="Members" />
    </ListItemButton>
  </React.Fragment>
);
export const ternaryListItems = (
  <React.Fragment>
    <ListSubheader inset>Master</ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <GridView />
      </ListItemIcon>
      <ListItemText primary="Plan" />
    </ListItemButton>
    <ListItemButton >
      <ListItemIcon>
        <People />
      </ListItemIcon>
      <ListItemText primary="Batch" />
    </ListItemButton>
    
  </React.Fragment>
);
