import React from "react";
import FormularioModal from "./Formulariomodal";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Fab,
  Hidden,
  ListItemSecondaryAction,
} from "@material-ui/core";
import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import contexto from "../Contexto/contexto";

const style = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed",
};

export default function ListaTareas() {
  const { items, setItems, setModal } = React.useContext(contexto);

  const reorder = (a, b) => {
    var aux = items[a];
    items[a] = items[b];
    items[b] = aux;
    return items;
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    ...draggableStyle,
    ...(isDragging && {
      background: "rgb(235,235,235)",
    }),
  });

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    setItems(reorder(result.source.index, result.destination.index));
  };

  return (
    <div>
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
        <Grid item xs={12}>
          <DragDropContext onDragEnd={(drag) => onDragEnd(drag)}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <RootRef rootRef={provided.innerRef}>
                  <List>
                    {items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <ListItem
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
                            <ListItemText
                              primary={item.primary}
                              secondary={item.secondary}
                            />
                            <ListItemSecondaryAction>
                              <IconButton>
                                <EditIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </List>
                </RootRef>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
      </Grid>
      <FormularioModal />
      <Hidden smUp implementation="css">
        <Fab
          style={style}
          color="primary"
          onClick={() => {
            setModal(true);
          }}
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </Hidden>
    </div>
  );
}
