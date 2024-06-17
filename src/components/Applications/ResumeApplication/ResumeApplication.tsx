import Window from "../../Window/Window";
import classes from "./ResumeApplication.module.css";

const ResumeApplication = ({
  isOpen,
  isHidden,
  handleClose,
  handleHide,
}: {
  isOpen: boolean;
  isHidden: boolean;
  handleClose: () => void;
  handleHide: () => void;
}) => {
  return (
    isOpen && (
      <Window
        name="Resume"
        isHidden={isHidden}
        handleClose={handleClose}
        handleHide={handleHide}
        width={800}
        height={700}
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
