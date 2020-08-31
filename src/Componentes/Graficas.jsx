import React from "react";
import { Typography, Grid } from "@material-ui/core";
import contexto from "../Contexto/contexto";
import { VictoryPie, VictoryTooltip } from "victory";
export default function Graficas() {
  const { itemsTerminados, items } = React.useContext(contexto);
  //Obtiene la informacion de las graficas de los arreglos de los padres
  const getData = (tems) => {
    var t1 = 0;
    var t2 = 0;
    for (var item of tems) {
      t1 = item.actual + t1;
      t2 = item.tiempo + t2;
    }
    var t1minsec = parseInt(t1 / 60, 10) + " min y " + (t1 % 60) + " segundos";
    var t2minsec =
      parseInt((t2 - t1) / 60, 10) + " min y " + ((t2 - t1) % 60) + " segundos";
    return [
      {
        x: "Tiempo restante " + t1minsec,
        y: t1 / 60,
      },
      {
        x: "Tiempo utilizado " + t2minsec,
        y: (t2 - t1) / 60,
      },
    ];
  };

  return (
    <div>
      <Typography variant="h6">
        Grafica de tareas en la ultima semana (Tiempo utilizado vs tiempo
        restante)
      </Typography>
      <Grid item>
        {itemsTerminados.length !== 0 && (
          <div>
            <Typography variant="h6">Tareas terminadas</Typography>
            <VictoryPie
              labelComponent={<VictoryTooltip flyoutWidth={350} />}
              labelRadius={130}
              data={getData(itemsTerminados)}
              colorScale="cool"
            />
          </div>
        )}

        {items.length !== 0 && (
          <div>
            <Typography variant="h6">Tareas pendientes</Typography>
            <VictoryPie
              labelComponent={<VictoryTooltip flyoutWidth={350} />}
              labelRadius={130}
              data={getData(items)}
              colorScale="cool"
            />
          </div>
        )}

        {itemsTerminados.length === 0 && (
          <Typography variant="h6">
            No hay tareas terminadas en la ultima semana
          </Typography>
        )}
        {items.length === 0 && (
          <Typography variant="h6">
            No hay tareas pendientes en la ultima semana
          </Typography>
        )}
      </Grid>
    </div>
  );
}
