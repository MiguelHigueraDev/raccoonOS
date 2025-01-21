import { useRef } from "react";
import { useKonamiCode } from "../../helpers/useKonamiCode";
import classes from "./Background.module.css";
import PedroStore from "../../stores/PedroStore";

const Background: React.FC = () => {
  // This handles the Pedro easter egg
  const { playPedroAudio } = PedroStore();

  const background = useRef<HTMLDivElement>(null);

  const pedroEasterEgg = () => {
    addPedroClasses();
    playPedroAudio();
  };

  const addPedroClasses = () => {
    background.current?.classList.add("pedro");
    document.getElementById("desktop")?.classList.add("pedro-hides-desktop");
  };

  useKonamiCode(pedroEasterEgg);

  return (
    <div id="background" ref={background} className={classes.background}></div>
  );
};

export default Background;
