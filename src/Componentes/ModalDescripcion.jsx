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
  //Contexto
  const { setModalDesc, modalDesc, modalDescTexto } = React.useContext(
    contexto
  );
  //Cerrar modal descripcion
  const cerrar = () => {
    setModalDesc(false);
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
      <DialogTitle id="alert-dialog-title">{"Descripcion"}</DialogTitle>
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
