import React from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import moment from "moment";
import contexto from "../Contexto/contexto";
export default function Graficas() {
  const {
    items,
    setItems,
    itemsTerminados,
    setItemsTerminados,
  } = React.useContext(contexto);
  var startOfWeek = moment().startOf("week").toDate();
  var endOfWeek = moment().endOf("week").toDate();
  return (
    <div>
      <Typography variant="h6" noWrap>
        Graficas de tareas en la ultima semana
      </Typography>
      <Grid container></Grid>
    </div>
  );
}
