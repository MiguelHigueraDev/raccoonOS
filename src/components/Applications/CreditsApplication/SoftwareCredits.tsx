import classes from "./CreditsApplication.module.css";

const SoftwareCredits = () => {
  return (
    <ul className={classes.creditsList}>
      <li><a target="_blank" href="https://react.dev/">React</a></li>
      <li><a target="_blank" href="https://www.typescriptlang.org/">TypeScript</a></li>
      <li><a target="_blank" href="https://threejs.org/">Three.js</a></li>
      <li><a target="_blank" href="https://www.npmjs.com/package/react-draggable">react-draggable</a></li>
      <li><a target="_blank" href="https://www.npmjs.com/package/@tabler/icons-react">@tabler/icons-react</a></li>
      <li><a target="_blank" href="https://docs.pmnd.rs/react-three-fiber/getting-started/introduction">@react-three/fiber</a></li>
      <li><a target="_blank" href="https://github.com/pmndrs/drei">@react-three/drei</a></li>
      <li><a target="_blank" href="https://zustand-demo.pmnd.rs/">zustand</a></li>
      <li><a target="_blank" href="https://github.com/MiguelHigueraDev/discord-card-react">discord-card-react</a></li>
    </ul>
  )
}

export default SoftwareCredits