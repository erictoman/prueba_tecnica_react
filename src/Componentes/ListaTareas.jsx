import React from "react";
import FormularioModal from "./ModalFormulario";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  List,
  ListItem,
  ListItemIcon,
  Fab,
  Typography,
  Hidden,
  ListItemSecondaryAction,
} from "@material-ui/core";
import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import AddIcon from "@material-ui/icons/Add";
import contexto from "../Contexto/contexto";
import InformacionIconos from "./InformacionIconos";
import SortIcon from "@material-ui/icons/Sort";
import ModalFiltro from "./ModalFiltro";
//Estilo boton derecho
const styleDerecha = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed",
};
//Estilo boton izquierdo
const styleIZquierda = {
  margin: 0,
  top: "auto",
  right: "auto",
  bottom: 20,
  left: 20,
  position: "fixed",
};
//Componente lista de tareas
export default function ListaTareas(props) {
  const {
    items,
    setItems,
    setModal,
    setModalFiltro,
    tipoFiltro,
    setModalDesc,
    setModalDescTexto,
  } = React.useContext(contexto);
  //Reordena el arreglo de tareas
  const reorder = (a, b) => {
    items.splice(b, 0, items.splice(a, 1)[0]);
    return items;
  };
  //Estilos de los items
  const getItemStyle = (isDragging, draggableStyle) => ({
    ...draggableStyle,
    ...(isDragging && {
      background: "rgb(235,235,235)",
    }),
  });
  //Segundos a horas, min, segs
  const tiempoMinHorasSegundos = (actual) => {
    return (
      parseInt(actual / 3600, 10) +
      ":" +
      parseInt((actual / 60) % 60, 10) +
      ":" +
      parseInt(actual % 60, 10)
    );
  };
  //Evento drag
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    setItems(reorder(result.source.index, result.destination.index));
  };
  //Elemento de la lista
  const elemLista = (item, index) => {
    return (
      <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided, snapshot) => (
          <ListItem
            divider
            ContainerComponent="li"
            ContainerProps={{ ref: provided.innerRef }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            <ListItemIcon>
              <DragIndicatorIcon />
            </ListItemIcon>
            <Grid container>
              <Grid item xs={6}>
                <Typography
                  component={"span"}
                  variant="body1"
                  color={item.activo === true ? "secondary" : "primary"}
                >
                  {item.titulo}
                </Typography>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    component={"span"}
                    variant="body1"
                    color="textPrimary"
                    align="justify"
                  >
                    {"Tiempo: " +
                      tiempoMinHorasSegundos(item.tiempo - item.actual) +
                      " de " +
                      tiempoMinHorasSegundos(item.tiempo)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    component={"span"}
                    variant="body1"
                    color="textPrimary"
                    align="justify"
                  >
                    {"Fecha: " + getFecha(item.fecha)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <ListItemSecondaryAction>
              {props.activado && <InformacionIconos index={index} />}
              {!props.activado && (
                <VisibilityIcon
                  onClick={() => {
                    setModalDesc(true);
                    setModalDescTexto({
                      texto: item.descripcion,
                      fecha: item.fecha,
                    });
                  }}
                />
              )}
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </Draggable>
    );
  };
  //Obtener fecha
  const getFecha = (f) => {
    if (f !== undefined) {
      f = new Date(f);
      return f.toLocaleDateString("de-DE");
    } else {
      return "";
    }
  };

  return (
    <div style={{ marginBottom: 50 }}>
      <Typography variant="h6" noWrap>
        Tareas
      </Typography>
      <Grid
        justify="space-between" // Add it here :)
        container
      >
        <Grid item>
          <Hidden xsDown implementation="css">
            {props.activado && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setModal(true);
                }}
              >
                Agregar tarea
              </Button>
            )}
          </Hidden>
        </Grid>
        <Grid item>
          <Hidden xsDown implementation="css">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setModalFiltro(true);
              }}
            >
              Filtrar tareas
            </Button>
          </Hidden>
        </Grid>
        <Grid item xs={12}>
          <DragDropContext onDragEnd={(drag) => onDragEnd(drag)}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <RootRef rootRef={provided.innerRef}>
                  <List>
                    {props.tareas.length === 0 && (
                      <Typography variant="h6" noWrap>
                        {props.activado && "No hay tareas pendientes"}
                        {!props.activado && "No hay tareas terminadas"}
                      </Typography>
                    )}
                    {props.tareas.map((item, index) => {
                      if (tipoFiltro === "A") {
                        return elemLista(item, index);
                      }
                      if (
                        tipoFiltro === "C" &&
                        item.tiempo > 30 * 60 &&
                        item.tiempo <= 60 * 60
                      ) {
                        return elemLista(item, index);
                      }
                      if (tipoFiltro === "D" && item.tiempo > 60 * 60) {
                        return elemLista(item, index);
                      }
                      return null;
                    })}
                    {provided.placeholder}
                  </List>
                </RootRef>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
      </Grid>
      <FormularioModal />
      <ModalFiltro />
      <Hidden smUp implementation="css">
        <Fab
          style={styleDerecha}
          color="primary"
          onClick={() => {
            setModal(true);
          }}
          aria-label="add"
        >
          <AddIcon />
        </Fab>
        <Fab
          style={styleIZquierda}
          color="primary"
          onClick={() => {
            setModalFiltro(true);
          }}
          aria-label="add"
        >
          <SortIcon />
        </Fab>
      </Hidden>
    </div>
  );
}
