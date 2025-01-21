import classes from "./PinnedApplications.module.css";
import { App } from "../Desktop/apps";

interface PinnedApplicationsProps {
  appList: App[];
  handleOpenApp: (appName: string) => void;
}

const PinnedApplications: React.FC<PinnedApplicationsProps> = ({
  appList,
  handleOpenApp,
}) => {
  return (
    <div className={classes.pinnedApplicationsContainer}>
      <h3 className={classes.pinnedText}>Pinned</h3>
      {appList.length === 0 && (
        <p className={classes.noAppsFound}>No apps found</p>
      )}
      <div className={classes.pinnedApplicationsGrid}>
        {appList.map(({ name, icon, title }) => (
          <button
            key={name}
            className={classes.pinnedApp}
            onClick={() => handleOpenApp(name)}
            aria-label={`Open ${title}`}
          >
            <img src={icon} alt={title} />
            <span>{title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PinnedApplications;
