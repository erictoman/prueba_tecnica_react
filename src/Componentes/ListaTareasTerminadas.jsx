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
  //Convertir los segundos a Hora:Minuto:Segundo
  const tiempoMinHorasSegundos = (actual) => {
    return (
      parseInt(actual / 3600, 10) +
      ":" +
      parseInt((actual / 60) % 60, 10) +
      ":" +
      parseInt(actual % 60, 10)
    );
  };

  const getFecha = (f) => {
    if (f !== undefined) {
      f = new Date(f);
      return f.toLocaleDateString("de-DE");
    } else {
      return "";
    }
  };

  return (
    <div>
      <Typography variant="h6" noWrap>
        Tareas finalizadas
      </Typography>
      <Grid justify="space-between" container>
        <Grid item xs={12}>
          <List>
            {itemsTerminados.length === 0 && (
              <Typography variant="h6" noWrap>
                No hay tareas terminadas
              </Typography>
            )}
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
                  <VisibilityIcon
                    onClick={() => {
                      setModalDesc(true);
                      setModalDescTexto({
                        texto: item.descripcion,
                        fecha: item.fecha,
                      });
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
