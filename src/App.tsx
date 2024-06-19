import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import Background from "./components/Background/Background";
import Desktop from "./components/Desktop/Desktop";

function App() {
  return (
    <>
      <Analytics />
      <Background />
      <Desktop />
    </>
  );
}

export default App;
