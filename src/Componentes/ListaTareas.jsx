import React from "react";
import FormularioModal from "./ModalFormulario";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
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

const styleDerecha = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed",
};

const styleIZquierda = {
  margin: 0,
  top: "auto",
  right: "auto",
  bottom: 20,
  left: 20,
  position: "fixed",
};

export default function ListaTareas() {
  const {
    items,
    setItems,
    setModal,
    setModalFiltro,
    tipoFiltro,
  } = React.useContext(contexto);

  const reorder = (a, b) => {
    items.splice(b, 0, items.splice(a, 1)[0]);
    return items;
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    ...draggableStyle,
    ...(isDragging && {
      background: "rgb(235,235,235)",
    }),
  });

  const tiempoMinHorasSegundos = (item) => {
    return (
      parseInt(item.actual / 3600, 10) +
      ":" +
      parseInt((item.actual / 60) % 60, 10) +
      ":" +
      parseInt(item.actual % 60, 10)
    );
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    setItems(reorder(result.source.index, result.destination.index));
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
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setModal(true);
              }}
            >
              Agregar tarea
            </Button>
          </Hidden>
        </Grid>
        <Grid item>
          <Hidden xsDown implementation="css">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setModal(true);
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
                    {items.length == 0 && (
                      <Typography variant="h6" noWrap>
                        No hay tareas pendientes
                      </Typography>
                    )}
                    {items.map((item, index) => {
                      if (tipoFiltro === "A") {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
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
                                  <Grid item xs={4}>
                                    <Typography
                                      component={"span"}
                                      variant="body1"
                                      color={
                                        item.activo === true
                                          ? "secondary"
                                          : "primary"
                                      }
                                    >
                                      {item.titulo}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography
                                      component={"span"}
                                      variant="body1"
                                      color="textPrimary"
                                      align="justify"
                                    >
                                      {tiempoMinHorasSegundos(item)}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <ListItemSecondaryAction>
                                  <InformacionIconos index={index} />
                                </ListItemSecondaryAction>
                              </ListItem>
                            )}
                          </Draggable>
                        );
                      }
                      if (tipoFiltro === "B" && item.tiempo <= 30 * 60) {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
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
                                  <Grid item xs={4}>
                                    <Typography
                                      component={"span"}
                                      variant="body1"
                                      color={
                                        item.activo === true
                                          ? "secondary"
                                          : "primary"
                                      }
                                    >
                                      {item.titulo}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography
                                      component={"span"}
                                      variant="body1"
                                      color="textPrimary"
                                      align="justify"
                                    >
                                      {tiempoMinHorasSegundos(item)}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <ListItemSecondaryAction>
                                  <InformacionIconos index={index} />
                                </ListItemSecondaryAction>
                              </ListItem>
                            )}
                          </Draggable>
                        );
                      }
                      if (
                        tipoFiltro === "C" &&
                        item.tiempo > 30 * 60 &&
                        item.tiempo <= 60 * 60
                      ) {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
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
                                  <Grid item xs={4}>
                                    <Typography
                                      component={"span"}
                                      variant="body1"
                                      color={
                                        item.activo === true
                                          ? "secondary"
                                          : "primary"
                                      }
                                    >
                                      {item.titulo}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography
                                      component={"span"}
                                      variant="body1"
                                      color="textPrimary"
                                      align="justify"
                                    >
                                      {tiempoMinHorasSegundos(item)}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <ListItemSecondaryAction>
                                  <InformacionIconos index={index} />
                                </ListItemSecondaryAction>
                              </ListItem>
                            )}
                          </Draggable>
                        );
                      }
                      if (tipoFiltro === "D" && item.tiempo > 60 * 60) {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
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
                                  <Grid item xs={4}>
                                    <Typography
                                      component={"span"}
                                      variant="body1"
                                      color={
                                        item.activo === true
                                          ? "secondary"
                                          : "primary"
                                      }
                                    >
                                      {item.titulo}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography
                                      component={"span"}
                                      variant="body1"
                                      color="textPrimary"
                                      align="justify"
                                    >
                                      {tiempoMinHorasSegundos(item)}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <ListItemSecondaryAction>
                                  <InformacionIconos index={index} />
                                </ListItemSecondaryAction>
                              </ListItem>
                            )}
                          </Draggable>
                        );
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
