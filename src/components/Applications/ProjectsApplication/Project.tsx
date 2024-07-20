import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react';
import classes from './Project.module.css';
import { Project as ProjectProps } from './projects';

const Project = ({ project }: { project: ProjectProps }) => {
  const { name, description, image, technologies, liveUrl, repoUrl } = project;
  return (
    <li className={classes.project}>
      <div className={classes.projectTop}>
        <img
          height={226}
          width={402}
          src={image}
          alt={name}
          className={classes.image}
        />
        <div className={classes.projectInner}>
          <h2 className={classes.projectTitle}>{name}</h2>
          <p style={{ marginTop: 2 }}>{description}</p>
          <ul className={classes.techStack}>
            {technologies.map((technology, index) => (
              <li className={classes.tech} key={index}>
                {technology}
              </li>
            ))}
          </ul>
          <div className={classes.projectLinks}>
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className={classes.link}
              >
                <IconExternalLink size={20} />
                Live Demo
              </a>
            )}

            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                className={classes.link}
              >
                <IconBrandGithub size={20} />
                Repository
              </a>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Project;
