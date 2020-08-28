import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListIcon from "@material-ui/icons/List";
import { useTheme } from "@material-ui/core/styles";
import estilos from "../EstilosApp";
import contexto from "../Contexto/contexto";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";

export default function DrawerResponsive() {
  const theme = useTheme();
  const classes = estilos.drawer();
  const { mobileOpen, setMobileOpen, setPantalla } = React.useContext(contexto);
  const drawer = (
    <div>
      <List>
        <ListItem
          onClick={() => {
            setPantalla("Tareas");
            setMobileOpen(false);
          }}
        >
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText>Mis tareas</ListItemText>
        </ListItem>
        <ListItem
          onClick={() => {
            setPantalla("Analisis");
            setMobileOpen(false);
          }}
        >
          <ListItemIcon>
            <DonutLargeIcon />
          </ListItemIcon>
          <ListItemText>Analisis</ListItemText>
        </ListItem>
      </List>
    </div>
  );
  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          onClose={() => setMobileOpen(false)}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}
