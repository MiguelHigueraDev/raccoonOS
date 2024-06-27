import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import Background from "./components/Background/Background";
import Desktop from "./components/Desktop/Desktop";
import { useEffect } from "react";
import { printConsoleEasterEggs } from "./helpers/consoleEasterEgg";

function App() {

  useEffect(() => {
    printConsoleEasterEggs();
  }, []);

  return (
    <>
      <Analytics />
      <Background />
      <Desktop />
    </>
  );
}

export default App;
