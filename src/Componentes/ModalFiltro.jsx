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
} from "@material-ui/core";
import contexto from "../Contexto/contexto";
export default function ModalFiltro() {
  //COntexto
  const { modalFiltro, setModalFiltro } = React.useContext(contexto);
  const { tipoFiltro, setTipoFiltro } = React.useContext(contexto);
  //Cerrar modal filtro
  const cerrar = () => {
    setModalFiltro(false);
  };

  return (
    <Dialog
      onClose={cerrar}
      aria-labelledby="customized-dialog-title"
      open={modalFiltro}
      fullWidth={true}
    >
      <DialogTitle id="customized-dialog-title" onClose={cerrar}>
        Filtro
      </DialogTitle>
      <DialogContent dividers>
        <FormControl fullWidth={true}>
          <InputLabel id="selectD">Elige el filtro</InputLabel>
          <Select
            labelId="selectD"
            id="selectD"
            value={tipoFiltro}
            onChange={(valor) => {
              setTipoFiltro(valor.target.value);
            }}
          >
            <MenuItem value={"A"}>Sin filtro</MenuItem>
            <MenuItem value={"B"}>Tareas cortas (Hasta 30 min)</MenuItem>
            <MenuItem value={"C"}>Tareas medianas (Entre 30 y 1 Hora)</MenuItem>
            <MenuItem value={"D"}>Tareas largas (Mayores a 1 Hora)</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            cerrar();
          }}
          color="primary"
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
