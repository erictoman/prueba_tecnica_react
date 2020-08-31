import React from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  FormControl,
  Popover,
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
import { makeStyles } from "@material-ui/core/styles";
//Estilos de la tarea
const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
    color: "red",
  },
}));

export default function FormularioModal() {
  //Datos de la tarea
  const {
    modal,
    setModal,
    items,
    setItems,
    contadorTareas,
    setContadorTareas,
  } = React.useContext(contexto);
  //Estados de la tarea (Hooks)
  const [tipo, setTipo] = React.useState(true);
  const [min, setMin] = React.useState(30 * 60);
  const [sec, setSec] = React.useState(30);
  const [desc, setDesc] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [target, setTarget] = React.useState(null);
  //Cerrar popover
  const handleClose = () => {
    setOpen(false);
    setTarget(null);
  };
  //Cerrar modal
  const cerrar = () => {
    setModal(false);
  };
  //Cerrar popover
  const id = open ? "simple-popover" : undefined;
  const classes = useStyles();
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
            <InputLabel id="selectD">Elige la duracion</InputLabel>
            <Select
              labelId="selectD"
              id="selectD"
              value={min}
              onChange={(duracionvalor) => setMin(duracionvalor.target.value)}
            >
              <MenuItem value={30 * 60}>Corta (30 min)</MenuItem>
              <MenuItem value={45 * 60}>Media (45 min)</MenuItem>
              <MenuItem value={60 * 60}>Larga (1 Hora)</MenuItem>
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
              onChange={(event, val) => {
                setMin(val * 60);
              }}
            />
          </FormControl>
        )}
        {!tipo && (
          <FormControl fullWidth={true}>
            <Typography id="discrete-slider" gutterBottom>
              Tiempo (Segundos)
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
              min={0}
              max={59}
              onChange={(event, val) => {
                setSec(val);
              }}
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
          aria-describedby={id}
          autoFocus
          onClick={(event) => {
            setTarget(event.currentTarget);
            var tiempo;
            if (tipo) {
              tiempo = min;
            } else {
              tiempo = min + sec;
            }
            if (min + sec < 7201) {
              var temp = [...items];
              var t = new Tarea(
                `Tarea${contadorTareas + 1}`,
                `Tarea ${contadorTareas + 1}`,
                desc,
                tiempo,
                0
              );
              t.activo = false;
              temp.push(t);
              setItems(temp);
              setContadorTareas(contadorTareas + 1);
              setMin(30 * 60);
              setSec(0);
              setDesc("");
              cerrar();
            } else {
              setOpen(true);
            }
          }}
          color="primary"
        >
          Guardar
        </Button>
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={target}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Typography className={classes.typography}>
            La descripcion esta vacia o el tiempo supera las 2 horas.
          </Typography>
        </Popover>
      </DialogActions>
    </Dialog>
  );
}
