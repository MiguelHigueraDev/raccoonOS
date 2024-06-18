import Window from "../../Window/Window";
import Project from "./Project";
import { projects } from "./projects";
import classes from "./ProjectsApplication.module.css";

const ProjectsApplication = ({
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
        name="Projects"
        isHidden={isHidden}
        handleClose={handleClose}
        handleHide={handleHide}
        width={1100}
        height={800}
        nonResizable
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
