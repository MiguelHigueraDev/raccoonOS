import classes from "./ContactApplication.module.css";
import Window from "../../Window/Window";
import { WindowProps } from "../../../shared/WindowProps";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

const ContactApplication = ({ winProps }: { winProps: WindowProps }) => {
  return (
    winProps.isOpen && (
      <Window
        name="Contact me"
        isHidden={winProps.isHidden}
        handleClose={winProps.handleClose}
        handleHide={winProps.handleHide}
        width={800}
        height={800}
        appName={winProps.appName}
        zIndex={winProps.zIndex}
        nonResizable
      >
        <div className={classes.window}>
          <h1>
            Have an interesting idea? A job offer? Just want to reach out to me?
          </h1>
          <p>
            I'm currently employed,
            <br /> but you can still email me at
          </p>
          <a href="mailto:me@miguelhiguera.dev">me@miguelhiguera.dev</a>

          <p>You can also find me at:</p>
          <div className={classes.links}>
            <a target="_blank" href="https://github.com/miguelhigueradev">
              <IconBrandGithub />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/miguelhigueradev/"
            >
              <IconBrandLinkedin />
            </a>
          </div>
        </div>
      </Window>
    )
  );
};

export default ContactApplication;
