import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListIcon from "@material-ui/icons/List";
import CheckIcon from "@material-ui/icons/Check";
import { useTheme } from "@material-ui/core/styles";
import estilos from "../EstilosApp";
import contexto from "../Contexto/contexto";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import Tarea from "../Modelos/Tarea";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
export default function DrawerResponsive() {
  const randomText = (length) => {
    var result = "";
    var caracteres =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      result += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length)
      );
    }
    return result;
  };

  const numeroRandonRango = (a, b) => {
    return Math.floor(Math.random() * (b - a)) + a;
  };

  const getItems = (n) => {
    return Array.from({ length: n }, (v, k) => k).map((k) => {
      var random = numeroRandonRango(1, 120);
      var obj = new Tarea(
        `Tarea${contadorTareas + k + 1}`,
        `Tarea ${contadorTareas + k + 1}`,
        randomText(25),
        random,
        numeroRandonRango(Math.floor(random * 0.8), random)
      );
      return obj;
    });
  };

  const theme = useTheme();
  const classes = estilos.drawer();
  const {
    mobileOpen,
    setMobileOpen,
    setPantalla,
    setItems,
    items,
    contadorTareas,
    setContadorTareas,
  } = React.useContext(contexto);
  const drawer = (
    <div>
      <List>
        <ListItem
          divider
          onClick={() => {
            setPantalla("Tareas");
            setMobileOpen(false);
          }}
        >
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText>Tareas</ListItemText>
        </ListItem>
        <ListItem
          divider
          onClick={() => {
            setPantalla("Estadisticas");
            setMobileOpen(false);
          }}
        >
          <ListItemIcon>
            <DonutLargeIcon />
          </ListItemIcon>
          <ListItemText>Estadisticas</ListItemText>
        </ListItem>
        <ListItem
          divider
          onClick={() => {
            setPantalla("Historial");
            setMobileOpen(false);
          }}
        >
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText>Historial de tareas</ListItemText>
        </ListItem>
        <ListItem
          divider
          onClick={() => {
            var cont = contadorTareas;
            var temp = [...items];
            var arr = getItems(50);
            setItems(temp.concat(arr));
            setMobileOpen(false);
            setContadorTareas(cont + 50);
          }}
        >
          <ListItemIcon>
            <AccessTimeIcon />
          </ListItemIcon>
          <ListItemText>Generar tareas</ListItemText>
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
