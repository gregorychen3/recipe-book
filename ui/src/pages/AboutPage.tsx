import { IconButton, Link, makeStyles, Typography } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import React from "react";
import IconWithText from "../components/IconWithText";

const imagePath = "./gregandally.jpg";

const useStyles = makeStyles((theme) => ({
  disabledText: { color: theme.palette.text.secondary },
}));

export default function AboutPage() {
  const classes = useStyles();

  return (
    <>
      <img src={imagePath} alt="gregandally" style={{ height: "100%", width: "100%" }} />
      <Typography variant="h4">Greg and Ally's Recipe Book (v4)</Typography>
      <br />
      <Typography variant="h6">Project Purpose</Typography>
      <Typography variant="body1" component="span">
        <ul>
          <li>assist everyday cooking</li>
          <li>learn web-dev tech</li>
        </ul>
      </Typography>
      <IconWithText
        text="Tech Stack"
        variant="h6"
        icon={
          <IconButton
            component={Link}
            href="https://github.com/gregorychen3/recipe-book"
            target="_blank"
            rel="noopener"
            size="small"
          >
            <GitHubIcon />
          </IconButton>
        }
        iconPosition="after"
      />
      <Typography variant="body1" component="span">
        <ul>
          <li className={classes.disabledText}>
            v1
            <ul>
              <li>UI: Jinja Template HTML, CSS, jQuery</li>
              <li>Backend: Python Flask, PostgreSQL</li>
              <li>Deployment: AWS EC2</li>
            </ul>
          </li>
          <li className={classes.disabledText}>
            v2
            <ul>
              <li>UI: React, Semantic UI</li>
              <li>Backend: Express.js, PostgreSQL</li>
              <li>Deployment: AWS EC2, Docker</li>
            </ul>
          </li>
          <li className={classes.disabledText}>
            v3
            <ul>
              <li>UI: React Hooks, Redux, Bulma</li>
              <li>Backend: TypeScript, Express.js, MongoDB</li>
              <li>Deployment: Heroku</li>
            </ul>
          </li>
          <li>
            v4
            <ul>
              <li>UI: React Hooks, Redux Toolkit, Material UI, Google Sign-in</li>
              <li>Backend: TypeScript, Express.js, MongoDB</li>
              <li>Deployment: Heroku</li>
            </ul>
          </li>
        </ul>
      </Typography>
      <Typography variant="h6">Contact</Typography>
      <Typography variant="body1">
        Kindly direct all inquiries to{" "}
        <Link href="mailto:cenaacasaperdue@gmail.com" target="_blank" rel="noopener">
          cenaacasaperdue@gmail.com
        </Link>
        , thank you.
      </Typography>
    </>
  );
}
