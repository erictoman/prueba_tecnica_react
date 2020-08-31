import React from "react";
import "@material-ui/core/AppBar";
import DrawerResponsive from "./Componentes/DrawerResponsive";
import estilos from "./EstilosApp";
import { ProveedorContexto } from "./Contexto/contexto";
import BarraSuperior from "./Componentes/BarraSuperior";
import ListaTareas from "./Componentes/ListaTareas";
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
  var value = {
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

  //Al cargar
  window.addEventListener("load", (e) => {
    var contexto = localStorage.getItem("contexto");
    //Cargar contexto
    if (contexto !== null) {
      contexto = JSON.parse(contexto);
      setItems(contexto.items);
      setItemsTerminados(contexto.itemsTerminados);
      setContadorTareas(contexto.contadorTareas);
    }
  });

  //Antes de salir
  window.addEventListener("beforeunload", (e) => {
    if (value.contadorActivo) {
      value.items[0].activo = 0;
    }
    //Guardar contexto
    localStorage.setItem("contexto", JSON.stringify(value));
  });

  return (
    <ProveedorContexto value={value}>
      <div className={classes.root}>
        <BarraSuperior />
        <DrawerResponsive />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {pantalla === "Tareas" && (
            <ListaTareas activado={true} tareas={items} />
          )}
          {pantalla === "Estadisticas" && <Graficas />}
          {pantalla === "Historial" && (
            <ListaTareas activado={false} tareas={itemsTerminados} />
          )}
        </main>
      </div>
      <ModalDescripcion />
    </ProveedorContexto>
  );
}
