import classes from "./PinnedApplications.module.css";
import { App } from "../Desktop/Desktop";

const PinnedApplications = ({
  appList,
  handleOpenApp,
}: {
  appList: App[];
  handleOpenApp: (appName: string) => void;
}) => {
  return (
    <div className={classes.pinnedApplicationsContainer}>
      <h3 className={classes.pinnedText}>Pinned</h3>
      <div className={classes.pinnedApplicationsGrid}>
        {appList.map(({ name, icon, title }) => (
          <div
            key={name}
            className={classes.pinnedApp}
            onClick={() => handleOpenApp(name)}
          >
            <img src={icon} alt={title} />
            <span>{title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PinnedApplications;
