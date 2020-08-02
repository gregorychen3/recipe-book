import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import AppHeader from "./components/AppHeader";
import AboutPage from "./pages/AboutPage";
import RecipePage from "./pages/RecipePage";
import RecipesPage from "./pages/RecipesPage";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toast: {
    "&.Toastify__toast--info": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      "& .Toastify__close-button--info": { color: theme.palette.primary.contrastText },
    },
    "&.Toastify__toast--success": {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.success.contrastText,
      "& .Toastify__close-button--info": { color: theme.palette.success.contrastText },
    },
    "&.Toastify__toast--warning": {
      backgroundColor: theme.palette.warning.main,
      color: theme.palette.warning.contrastText,
      "& .Toastify__close-button--info": { color: theme.palette.warning.contrastText },
    },
    "&.Toastify__toast--error": {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText,
      "& .Toastify__close-button--info": { color: theme.palette.error.contrastText },
    },
    "&.Toastify__toast--default": {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.getContrastText(theme.palette.background.paper),
      "& .Toastify__close-button--default": {
        color: theme.palette.getContrastText(theme.palette.background.paper),
      },
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function App() {
  const classes = useStyles();
  useEffect(() => {
    toast("hi");
    toast.info("hi");
    toast.success("hi");
    toast.warning("hi");
    toast.error("hi");
  }, []);

  return (
    <>
      <ToastContainer toastClassName={classes.toast} />
      <div className={classes.root}>
        <CssBaseline />
        <AppHeader />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="md" className={classes.container}>
            <Switch>
              <Route path="/recipes/:recipeId">
                <RecipePage />
              </Route>
              <Route path="/recipes">
                <RecipesPage />
              </Route>
              <Route path="/about">
                <AboutPage />
              </Route>
              <Route path="/">
                <Redirect to="/recipes" />
              </Route>
            </Switch>
            <Grid container spacing={3}></Grid>
          </Container>
        </main>
      </div>
    </>
  );
}
