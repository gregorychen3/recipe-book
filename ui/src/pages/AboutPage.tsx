import { IconButton, Link, Typography } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import React from "react";

const imagePath = "./gregandally.jpg";

export default function AboutPage() {
  return (
    <>
      <img src={imagePath} alt="gregandally" style={{ height: "100%", width: "100%" }} />
      <Typography variant="h4">Greg and Ally's Recipe Book (v4)</Typography>
      <br />
      <Typography variant="h6">Project Purpose</Typography>
      <Typography variant="body1" component={"span"}>
        <ul>
          <li>assist everyday cooking</li>
          <li>learn web-dev tech</li>
        </ul>
      </Typography>
      <Typography variant="h6">Tech Stack</Typography>
      <IconButton component={Link} href="https://github.com/gregorychen3/recipe-book" target="_blank" rel="noopener">
        <GitHubIcon />
      </IconButton>
      <Typography variant="body1" component={"span"}>
        <ul>
          <li>
            v1
            <ul>
              <li>
                <b>UI</b>: Jinja Template HTML, CSS, jQuery
              </li>
              <li>
                <b>Backend</b>: Python Flask, PostgreSQL
              </li>
              <li>
                <b>Deployment</b>: AWS EC2
              </li>
            </ul>
          </li>
          <li>
            v2
            <ul>
              <li>
                <b>UI</b>: React, Semantic UI
              </li>
              <li>
                <b>Backend</b>: Express.js, PostgreSQL
              </li>
              <li>
                <b>Deployment</b>: AWS EC2, Docker
              </li>
            </ul>
          </li>
          <li>
            v3
            <ul>
              <li>
                <b>UI</b>: React Hooks, Redux, Bulma
              </li>
              <li>
                <b>Backend</b>: TypeScript, Express.js, MongoDB
              </li>
              <li>
                <b>Deployment</b>: Heroku
              </li>
            </ul>
          </li>
          <li>
            v4
            <ul>
              <li>
                <b>UI</b>: React Hooks, Redux Toolkit, Material UI, Google Sign-in
              </li>
              <li>
                <b>Backend</b>: TypeScript, Express.js, MongoDB
              </li>
              <li>
                <b>Deployment</b>: Heroku
              </li>
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
