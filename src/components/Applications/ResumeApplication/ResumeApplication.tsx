import { WindowProps } from "../../../shared/WindowProps";
import Window from "../../Window/Window";
import classes from "./ResumeApplication.module.css";

const ResumeApplication = ({ winProps }: { winProps: WindowProps }) => {
  return (
    winProps.isOpen && (
      <Window
        name="Resume"
        isHidden={winProps.isHidden}
        handleClose={winProps.handleClose}
        handleHide={winProps.handleHide}
        width={800}
        height={700}
        appName={winProps.appName}
        zIndex={winProps.zIndex}
      >
        <div className={classes.window}>
          <iframe
            className={classes.resumeIframe}
            src="https://miguelhiguera.dev/resumes/Miguel-Higuera-Resume-en.pdf"
          ></iframe>
        </div>
      </Window>
    )
  );
};

export default ResumeApplication;
