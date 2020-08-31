import React from "react";
import "@material-ui/core/AppBar";
import DrawerResponsive from "./Componentes/DrawerResponsive";
import estilos from "./EstilosApp";
import { ProveedorContexto } from "./Contexto/contexto";
import BarraSuperior from "./Componentes/BarraSuperior";
import ListaTareas from "./Componentes/ListaTareas";
import ListaTareasTerminadas from "./Componentes/ListaTareasTerminadas";
import ModalDescripcion from "./Componentes/ModalDescripcion";
import Graficas from "./Componentes/Graficas";

export default function ResponsiveDrawer() {
  const classes = estilos.drawer();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [pantalla, setPantalla] = React.useState("Tareas");
  const [items, setItems] = React.useState([]);
  const [itemsTerminados, setItemsTerminados] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [contadorActivo, setContadorActivo] = React.useState(false);
  const [contadorTareas, setContadorTareas] = React.useState(0);
  const [modalDesc, setModalDesc] = React.useState(false);
  const [modalDescTexto, setModalDescTexto] = React.useState("");
  const [modalFiltro, setModalFiltro] = React.useState(false);
  const [tipoFiltro, setTipoFiltro] = React.useState("A");

  const value = {
    mobileOpen,
    setMobileOpen,
    pantalla,
    setPantalla,
    items,
    setItems,
    modal,
    setModal,
    contadorActivo,
    setContadorActivo,
    itemsTerminados,
    setItemsTerminados,
    contadorTareas,
    setContadorTareas,
    modalDesc,
    setModalDesc,
    modalDescTexto,
    setModalDescTexto,
    modalFiltro,
    setModalFiltro,
    tipoFiltro,
    setTipoFiltro,
  };

  return (
    <ProveedorContexto value={value}>
      <div className={classes.root}>
        <BarraSuperior />
        <DrawerResponsive />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {pantalla === "Tareas" && <ListaTareas />}
          {pantalla === "Estadisticas" && <Graficas />}
          {pantalla === "Historial" && <ListaTareasTerminadas />}
        </main>
      </div>
      <ModalDescripcion />
    </ProveedorContexto>
  );
}
