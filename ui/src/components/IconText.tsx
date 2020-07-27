import { Grid, makeStyles } from "@material-ui/core";
import React, { ReactNode } from "react";

const useStyles = makeStyles((theme) => ({
  icon: { padding: theme.spacing(1) },
}));

interface Props {
  icon: ReactNode;
  text: ReactNode;
}
export default function IconText({ icon, text }: Props) {
  const classes = useStyles();
  return (
    <Grid container direction="row" alignItems="center">
      <Grid item className={classes.icon}>
        {icon}
      </Grid>
      <Grid item>{text}</Grid>
    </Grid>
  );
}
