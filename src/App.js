import React from "react";
import "@material-ui/core/AppBar";
import DrawerResponsive from "./Componentes/DrawerResponsive";
import estilos from "./EstilosApp";
import { ProveedorContexto } from "./Contexto/contexto";
import BarraSuperior from "./Componentes/BarraSuperior";
import ListaTareas from "./Componentes/ListaTareas";

const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `Tarea-${k + 1}`,
    primary: `Tarea ${k + 1}`,
    secondary: k % 2 === 0 ? `Whatever for ${k}` : undefined,
  }));

export default function ResponsiveDrawer() {
  const classes = estilos.drawer();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [pantalla, setPantalla] = React.useState("Tareas");
  const [items, setItems] = React.useState(getItems(10));
  const [modal, setModal] = React.useState(false);

  const value = {
    mobileOpen,
    setMobileOpen,
    pantalla,
    setPantalla,
    items,
    setItems,
    modal,
    setModal,
  };

  return (
    <ProveedorContexto value={value}>
      <div className={classes.root}>
        <BarraSuperior />
        <DrawerResponsive />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {pantalla === "Tareas" && <ListaTareas />}
          {pantalla === "Analisis"}
        </main>
      </div>
    </ProveedorContexto>
  );
}
