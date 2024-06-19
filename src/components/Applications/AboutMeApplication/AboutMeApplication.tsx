import classes from "./AboutMeApplication.module.css";
import Window from "../../Window/Window";
import { Canvas } from "@react-three/fiber";
import { Float, Text3D } from "@react-three/drei";
import { WindowProps } from "../../../shared/WindowProps";

const AboutMeApplication = ({ winProps }: { winProps: WindowProps }) => {
  return (
    winProps.isOpen && (
      <Window
        name="About me"
        isHidden={winProps.isHidden}
        handleClose={winProps.handleClose}
        handleHide={winProps.handleHide}
        width={800}
        height={510}
        appName={winProps.appName}
        zIndex={winProps.zIndex}
        nonResizable
      >
        <div className={classes.window}>
          <div className={classes.profilePicture}>
            <Canvas>
              <Float speed={4}>
                <Text3D font="./typefaces/notosans.json">
                  Miguel Higuera
                  <meshNormalMaterial />
                </Text3D>
                <mesh position-x={-7}>
                  <coneGeometry args={[1, 2, 4]} />
                  <meshNormalMaterial />
                </mesh>
                <mesh position-x={-13} position-y={2}>
                  <torusGeometry args={[1, 0.4, 16, 16]} />
                  <meshNormalMaterial />
                </mesh>
              </Float>
            </Canvas>
            <img src="./miguelhigueradev.webp" />
          </div>

          <div>
            <p>I'm Miguel Higuera, a Chilean 🇨🇱 software developer.</p>
            <p>
              Computers and tech have always been an interest and a{" "}
              <strong className={classes.strongText}>passion</strong> of mine,
              but when I discovered coding around 4 years ago, I found it to be
              extremely{" "}
              <strong className={classes.strongText}>fun and rewarding</strong>,
              more than anything else I've done.{" "}
            </p>
            <p>
              Since then, I have been tirelessly learning for years, seeking new
              knowledge to improve and expand my skillset, because there's
              always something new to learn.
            </p>

            <p>
              My main programming languages are{" "}
              <strong className={classes.strongText2}>
                JavaScript, TypeScript, and Java
              </strong>
              , but I have worked with other languages as well and I'm
              interested in learning new ones.
            </p>
          </div>
        </div>
      </Window>
    )
  );
};

export default AboutMeApplication;
