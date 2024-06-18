import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react";
import classes from "./Project.module.css";
import { Project as ProjectProps } from "./Projects";

const Project = ({ project }: { project: ProjectProps }) => {
  const { name, description, image, technologies, liveUrl, repoUrl } = project;
  return (
    <li className={classes.project}>
      <div style={{ flexGrow: 2 }}>
        {liveUrl || repoUrl ? (
          <>
            <a target="_blank" href={liveUrl ? liveUrl : repoUrl}>
              <img
                height={226}
                width={402}
                src={image}
                alt={name}
                className={classes.image}
              />
            </a>
          </>
        ) : (
          <img
            height={226}
            width={402}
            src={image}
            alt={name}
            className={classes.image}
          />
        )}
        <div style={{ display: "flex", gap: 8 }}>
          <h3 className={classes.projectTitle}>{name}</h3>
          {liveUrl && (
            <a
              aria-label={`Visit ${name}`}
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconExternalLink />
            </a>
          )}
          {repoUrl && (
            <a
              aria-label={`Visit ${name}'s GitHub repository`}
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandGithub />
            </a>
          )}
        </div>
        <p style={{ marginTop: 2 }}>{description}</p>
      </div>
      <ul className={classes.techStack}>
        {technologies.map((technology, index) => (
          <li className={classes.tech} key={index}>{technology}</li>
        ))}
      </ul>
    </li>
  );
};

export default Project;
