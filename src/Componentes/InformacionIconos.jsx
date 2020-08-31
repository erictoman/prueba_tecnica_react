import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import DoneIcon from "@material-ui/icons/Done";
import contexto from "../Contexto/contexto";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

import {
  ListItemIcon,
  Menu,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

export default function InformacionIconos(props) {
  const {
    items,
    setItems,
    contadorActivo,
    setContadorActivo,
    setItemsTerminados,
    itemsTerminados,
    setModalDesc,
    setModalDescTexto,
  } = React.useContext(contexto);
  //Estados del toltip
  const [anchorEl, setOpen] = React.useState(null);
  const open = Boolean(anchorEl);
  //Estado del contador
  const [contador, setContador] = React.useState(0);

  //Comtador
  React.useEffect(() => {
    if (contador) {
      var timer = setTimeout(() => {
        var temp = [...items];
        if (contador !== 1) {
          temp[props.index].actual = contador - 1;
          temp.splice(0, 0, temp.splice(props.index, 1)[0]);
          setContador(contador - 1);
        } else {
          var auxitem = temp.splice(props.index, 1)[0];
          auxitem.actual = auxitem.actual - 1;
          setContadorActivo(false);
          temp[props.index].activo = false;
          detenerContador();
          var aux = [...itemsTerminados];
          aux.push(auxitem);
          setItemsTerminados(aux);
        }
        setItems(temp);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [
    contador,
    items,
    props,
    setItems,
    setContadorActivo,
    itemsTerminados,
    setItemsTerminados,
  ]);

  //Inicio contador
  const iniciarContador = (num) => {
    setContador(num);
  };
  //Detener contador
  const detenerContador = () => setContador(0);

  //Abrir menu
  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };
  //Cerrar menu
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {!items[props.index].activo && (
          <MenuItem
            onClick={() => {
              if (!contadorActivo) {
                setContadorActivo(true);
                iniciarContador(items[props.index].actual);
                var temp = [...items];
                temp[props.index].activo = true;
                setItems(temp);
                setOpen(false);
              }
            }}
          >
            <ListItemIcon>
              <PlayArrowIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Continuar" />
          </MenuItem>
        )}

        {items[props.index].activo && (
          <MenuItem
            onClick={() => {
              if (contadorActivo) {
                setContadorActivo(false);
                detenerContador();
                var temp = [...items];
                items[props.index].activo = false;
                setItems(temp);
                setOpen(false);
              }
            }}
          >
            <ListItemIcon>
              <PauseIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Pausar" />
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            if (!contadorActivo) {
              var temp = [...items];
              temp[props.index].actual = temp[props.index].tiempo;
              setItems(temp);
              setOpen(false);
            }
          }}
        >
          <ListItemIcon>
            <RotateLeftIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Reiniciar" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            setModalDesc(true);
            setModalDescTexto({
              texto: items[props.index].descripcion,
              fecha: items[props.index].fecha,
            });
            setOpen(false);
          }}
        >
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Ver descripcion" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            setOpen(false);
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Editar" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            var copy = [...items];
            copy.splice(props.index, 1);
            setItems(copy);
            setOpen(false);
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Eliminar" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (!contadorActivo) {
              var temp = [...items];
              var auxitem = temp.splice(props.index, 1)[0];
              setItems(temp);
              detenerContador();
              var aux = [...itemsTerminados];
              aux.push(auxitem);
              setItemsTerminados(aux);
              setOpen(false);
            }
          }}
        >
          <ListItemIcon>
            <DoneIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Terminar" />
        </MenuItem>
      </Menu>
    </div>
  );
}
