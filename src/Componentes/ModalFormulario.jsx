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
  Slider,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import contexto from "../Contexto/contexto";
import Tarea from "../Modelos/Tarea";
export default function FormularioModal() {
  const {
    modal,
    setModal,
    items,
    setItems,
    contadorTareas,
    setContadorTareas,
  } = React.useContext(contexto);

  const [tipo, setTipo] = React.useState(true);
  const [duracion, setDuracion] = React.useState(30);
  const [desc, setDesc] = React.useState("");

  const cerrar = () => {
    setModal(false);
  };
  return (
    <Dialog
      onClose={cerrar}
      aria-labelledby="customized-dialog-title"
      open={modal}
      fullWidth={true}
    >
      <DialogTitle id="customized-dialog-title" onClose={cerrar}>
        Crear tarea
      </DialogTitle>
      <DialogContent dividers>
        <FormControl fullWidth={true}>
          <InputLabel id="selectTipo">Elige el tipo de duracion</InputLabel>
          <Select
            labelId="selectTipo"
            id="selectTipo"
            value={tipo}
            onChange={(valor) => {
              setTipo(valor.target.value);
            }}
          >
            <MenuItem value={true}>Fija</MenuItem>
            <MenuItem value={false}>Personalizada</MenuItem>
          </Select>
        </FormControl>
        {tipo && (
          <FormControl fullWidth={true}>
            <InputLabel id="selectD">Elige el tipo de duracion</InputLabel>
            <Select
              labelId="selectD"
              id="selectD"
              value={duracion}
              onChange={(duracionvalor) =>
                setDuracion(duracionvalor.target.value)
              }
            >
              <MenuItem value={30}>Corta</MenuItem>
              <MenuItem value={45}>Media</MenuItem>
              <MenuItem value={60}>Larga</MenuItem>
            </Select>
          </FormControl>
        )}
        {!tipo && (
          <FormControl fullWidth={true}>
            <Typography id="discrete-slider" gutterBottom>
              Tiempo (Minutos)
            </Typography>
            <Slider
              defaultValue={30}
              getAriaValueText={(val) => {
                return val;
              }}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={120}
            />
          </FormControl>
        )}
        <TextField
          fullWidth={true}
          label="Descripcion"
          value={desc}
          onChange={(val) => {
            setDesc(val.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={cerrar} color="secondary">
          Cancelar
        </Button>
        <Button
          autoFocus
          onClick={() => {
            var temp = [...items];
            var t = new Tarea(
              `Tarea${contadorTareas + 1}`,
              `Tarea ${contadorTareas + 1}`,
              desc,
              duracion,
              0
            );
            t.activo = false;
            temp.push(t);
            setItems(temp);
            setContadorTareas(contadorTareas + 1);
            setDuracion(30);
            setDesc("");
            cerrar();
          }}
          color="primary"
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
