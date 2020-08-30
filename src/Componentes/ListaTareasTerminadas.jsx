import React from "react";
import Grid from "@material-ui/core/Grid";
import {
  List,
  ListItem,
  ListItemIcon,
  Typography,
  ListItemSecondaryAction,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import contexto from "../Contexto/contexto";
import VisibilityIcon from "@material-ui/icons/Visibility";

export default function ListaTareasTerminadas() {
  const { itemsTerminados, setModalDesc, setModalDescTexto } = React.useContext(
    contexto
  );
  return (
    <div>
      <Typography variant="h6" noWrap>
        Tareas finalizadas
      </Typography>
      <Grid justify="space-between" container>
        <Grid item xs={12}>
          <List>
            {itemsTerminados.map((item, index) => (
              <ListItem divider key={index}>
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography
                      component={"span"}
                      variant="body1"
                      color="textPrimary"
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
                      {item.actual + "/" + item.minutos + " Minutos"}
                    </Typography>
                  </Grid>
                </Grid>
                <ListItemSecondaryAction>
                  <VisibilityIcon
                    onClick={() => {
                      setModalDesc(true);
                      setModalDescTexto(item.descripcion);
                    }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </div>
  );
}
