import React from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  DialogContentText,
} from "@material-ui/core";

import contexto from "../Contexto/contexto";
export default function ModalDescripcion() {
  const { setModalDesc, modalDesc, modalDescTexto } = React.useContext(
    contexto
  );
  const cerrar = () => {
    setModalDesc(false);
  };

  const getFecha = (fecha) => {
    if (fecha !== undefined) {
      return fecha.toLocaleDateString("de-DE");
    } else {
      return "";
    }
  };

  return (
    <Dialog
      open={modalDesc}
      onClose={() => {
        cerrar();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Descripcion | Fecha:" + getFecha(modalDescTexto.fecha)}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {modalDescTexto.texto}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            cerrar();
          }}
          color="primary"
          autoFocus
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
