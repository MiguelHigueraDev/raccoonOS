import { WindowProps } from "../../../shared/WindowProps";
import Window from "../../Window/Window";
import Project from "./Project";
import { projects } from "./projects";
import classes from "./ProjectsApplication.module.css";

const ProjectsApplication = ({ winProps }: { winProps: WindowProps }) => {
  return (
    winProps.isOpen && (
      <Window
        name="Projects"
        isHidden={winProps.isHidden}
        handleClose={winProps.handleClose}
        handleHide={winProps.handleHide}
        width={1100}
        height={800}
        appName={winProps.appName}
        zIndex={winProps.zIndex}
      >
        <div className={classes.window}>
          <ul className={classes.projectsContainer}>
            {projects.map((project, index) => (
              <Project project={project} key={index} />
            ))}
          </ul>
        </div>
      </Window>
    )
  );
};

export default ProjectsApplication;
