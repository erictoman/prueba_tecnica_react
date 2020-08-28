import {
  makeStyles,
  createStyles,
  createMuiTheme,
} from "@material-ui/core/styles";

const anchodrawer = 200;

const drawer = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: anchodrawer,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${anchodrawer}px)`,
        marginLeft: anchodrawer,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: anchodrawer,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    cuerpo: {
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20,
    },
  })
);

const tema = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#007DE3",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#00C2F2",
    },
  },
});

export default { drawer, tema };
