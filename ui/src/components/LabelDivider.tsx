import { makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  divider: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.divider,
    lineHeight: 0,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  label: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  defaultBg: { backgroundColor: theme.palette.background.default },
  paperBg: { backgroundColor: theme.palette.background.paper },
}));

interface Props {
  label: string;
  backgroundColor?: "paper" | "default";
}
export default function LabelDivider({ label, backgroundColor }: Props) {
  const classes = useStyles();
  if (!backgroundColor) {
    backgroundColor = "default";
  }
  return (
    <div className={classes.container}>
      <Typography
        variant="subtitle2"
        color="textSecondary"
        align="center"
        className={classes.divider}
      >
        <span
          className={clsx(classes.label, {
            [classes.defaultBg]: backgroundColor === "default",
            [classes.paperBg]: backgroundColor === "paper",
          })}
        >
          {label}
        </span>
      </Typography>
    </div>
  );
}
