import classes from "./TechApplication.module.css";
import Window from "../../Window/Window";
import { Canvas } from "@react-three/fiber";
import { Float, Text3D } from "@react-three/drei";
import { extraTechStack, mainTechStack } from "./teckStack";

const TechApplication = ({
  isOpen,
  isHidden,
  handleClose,
  handleHide,
}: {
  isOpen: boolean;
  isHidden: boolean;
  handleClose: () => void;
  handleHide: () => void;
}) => {
  return (
    isOpen && (
      <Window
        name="Tech Stack"
        isHidden={isHidden}
        handleClose={handleClose}
        handleHide={handleHide}
        width={800}
        height={800}
        nonResizable
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
