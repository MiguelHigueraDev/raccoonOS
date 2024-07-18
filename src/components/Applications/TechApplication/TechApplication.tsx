import classes from "./TechApplication.module.css";
import Window from "../../Window/Window";
import { Canvas } from "@react-three/fiber";
import { Float, Text3D } from "@react-three/drei";
import { extraTechStack, mainTechStack } from "./teckStack";
import { WindowProps } from "../../../shared/WindowProps";

const TechApplication = ({ winProps }: { winProps: WindowProps }) => {
  return (
    winProps.isOpen && (
      <Window
        name="Tech Stack"
        isHidden={winProps.isHidden}
        handleClose={winProps.handleClose}
        handleHide={winProps.handleHide}
        width={800}
        height={600}
        nonResizable
        appName={winProps.appName}
        zIndex={winProps.zIndex}
      >
        <div className={classes.window}>
          <Canvas style={{ height: 100 }}>
            <Float>
              <Text3D
                position-x={-5}
                position-z={2.5}
                font="./typefaces/notosans.json"
              >
                Main Tech Stack
                <meshNormalMaterial />
              </Text3D>
            </Float>
          </Canvas>

          <div className={classes.techStack}>
            {mainTechStack.map((tech, index) => (
              <img key={index} src={tech.icon} alt={tech.name} />
            ))}
          </div>

          <Canvas style={{ height: 100, marginTop: 75 }}>
            <Float>
              <Text3D
                position-x={-7}
                position-z={2.5}
                font="./typefaces/notosans.json"
              >
                Extra Technologies
                <meshNormalMaterial />
              </Text3D>
            </Float>
          </Canvas>

          <div className={classes.techStack}>
            {extraTechStack.map((tech, index) => (
              <img key={index} src={tech.icon} alt={tech.name} />
            ))}
          </div>
        </div>
      </Window>
    )
  );
};

export default TechApplication;
