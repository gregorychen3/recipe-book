import { makeStyles, Typography, TypographyProps } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  container: { display: "flex", alignItems: "center" },
  marginLeft: { marginLeft: theme.spacing(1) },
  marginRight: { marginRight: theme.spacing(1) },
}));

interface Props {
  text: string;
  icon: React.ReactNode;
  iconPosition: "before" | "after";
}
export default function IconWithText(props: Props & TypographyProps) {
  const { text, icon, iconPosition, ...typographyProps } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {iconPosition === "before" ? (
        <>
          {icon}
          <Typography {...typographyProps} className={classes.marginLeft}>
            {text}
          </Typography>
        </>
      ) : (
        <>
          <Typography {...typographyProps} className={classes.marginRight}>
            {text}
          </Typography>
          {icon}
        </>
      )}
    </div>
  );
}
