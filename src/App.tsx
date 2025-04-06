import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import Background from "./components/Background/Background";
import Desktop from "./components/Desktop/Desktop";
import { useEffect } from "react";
import { printConsoleEasterEggs } from "./helpers/consoleEasterEgg";
import NotificationsContainer from "./components/Notifications/NotificationsContainer";
import NotificationStore from "./stores/NotificationStore";
import useLiveCursors from "./helpers/useLiveCursors";
import LiveCursors from "./components/LiveCursors/LiveCursors";
import { config } from "./config/environment";

function App() {
  const { addNotification } = NotificationStore();
  const { cursors, clientId } = useLiveCursors(config.liveWsUrl);

  useEffect(() => {
    printConsoleEasterEggs();
  }, []);

  // Show hint notification on first load
  useEffect(() => {
    addNotification(
      "welcome-notification",
      "Welcome to RaccoonOS!",
      <>
        <strong>Double click</strong> apps to open them or use the
        <img
          style={{
            width: 20,
            display: "inline",
            margin: "0 6px",
            cursor: "default",
          }}
          alt=""
          src="./raccoonos-logo.webp"
        />
        <strong>start menu</strong> at the bottom.
      </>
    );
  }, [addNotification]);

  return (
    <>
      <Analytics />
      <Background />
      <Desktop />
      <NotificationsContainer />
      <LiveCursors cursors={cursors} clientId={clientId} />
    </>
  );
}

export default App;
