import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppHeader from "./components/AppHeader";
import AboutPage from "./pages/AboutPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import EditRecipePage from "./pages/EditRecipePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import RecipePage from "./pages/RecipePage";
import RecipesPage from "./pages/RecipesPage";
import { getThemedToastClass } from "./theme";

const useStyles = makeStyles((theme) => ({
  root: { display: "flex" },
  toast: getThemedToastClass(theme),
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
      <ToastContainer toastClassName={classes.toast} />
      <div className={classes.root}>
        <CssBaseline />
        <AppHeader />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="md" className={classes.container}>
            <Switch>
              <Route path="/recipes/create">
                <CreateRecipePage />
              </Route>
              <Route path="/recipes/:recipeId/edit">
                <EditRecipePage />
              </Route>
              <Route path="/recipes/:recipeId">
                <RecipePage />
              </Route>
              <Route path="/recipes">
                <RecipesPage />
              </Route>
              <Route path="/about">
                <AboutPage />
              </Route>
              <Route path="/privacy-policy">
                <PrivacyPolicyPage />
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
