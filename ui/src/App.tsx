import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppHeader from "./components/AppHeader";
import AboutPage from "./pages/AboutPage";
import RecipePage from "./pages/RecipePage";
import RecipesPage from "./pages/RecipesPage";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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

  return (
    <>
      <ToastContainer />
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
