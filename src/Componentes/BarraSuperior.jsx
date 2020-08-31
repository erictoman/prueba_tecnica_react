import React from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import estilos from "../EstilosApp";
import contexto from "../Contexto/contexto";

export default function Barra() {
  //Cambio responsive de la barra
  const { setMobileOpen } = React.useContext(contexto);
  const classes = estilos.drawer();
  //Se cambia a mobile
  const cambiosDrawer = () => {
    setMobileOpen(true);
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={cambiosDrawer}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Aplicacion tareas
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
