import React from "react";
import {
  Dialog,
  Typography,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
} from "@material-ui/core";
import contexto from "../Contexto/contexto";
export default function FormularioModal() {
  const { modal, setModal } = React.useContext(contexto);
  const cerrar = () => {
    setModal(false);
  };
  return (
    <Dialog
      onClose={cerrar}
      aria-labelledby="customized-dialog-title"
      open={modal}
    >
      <DialogTitle id="customized-dialog-title" onClose={cerrar}>
        Modal title
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </Typography>
        <Typography gutterBottom>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        </Typography>
        <Typography gutterBottom>
          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
          magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
          ullamcorper nulla non metus auctor fringilla.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={cerrar} color="primary">
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
