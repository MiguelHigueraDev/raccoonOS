import classes from './AboutMeApplication.module.css';
import Window from '../../Window/Window';
import { Canvas } from '@react-three/fiber';
import { Float, Text3D } from '@react-three/drei';
import { WindowProps } from '../../../shared/WindowProps';
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
} from '@tabler/icons-react';

const AboutMeApplication = ({ winProps }: { winProps: WindowProps }) => {
  return (
    winProps.isOpen && (
      <Window
        name="About me"
        isHidden={winProps.isHidden}
        handleClose={winProps.handleClose}
        handleHide={winProps.handleHide}
        width={800}
        height={560}
        appName={winProps.appName}
        zIndex={winProps.zIndex}
        nonResizable
      >
        <div className={`${classes.window} window`}>
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

          <div className={classes.text}>
            <p>
              I'm Miguel Higuera, a Chilean{' '}
              <img
                style={{ display: 'inline', width: 20, cursor: 'default' }}
                src="./chile-flag.svg"
              />{' '}
              software developer.
            </p>

            <p>
              Computers and tech have always been an interest of mine, but when
              I discovered coding around 4 years ago I found it to be extremely
              fascinating and rewarding.
            </p>

            <p>
              Since then, I have been tirelessly learning for years, seeking new
              knowledge to improve and expand my skillset.
            </p>

            <p>
              My main programming languages are{' '}
              <strong className={classes.strongText2}>
                JavaScript, TypeScript, and Java
              </strong>
              , but I have worked with other languages as well and I'm
              interested in learning new ones.
            </p>
          </div>
          <KonamiSection />
        </div>
      </Window>
    )
  );
};

const KonamiSection = () => {
  return (
    <div className={classes.konamiSection}>
      <IconArrowUp />
      <IconArrowUp />
      <IconArrowDown />
      <IconArrowDown />
      <IconArrowLeft />
      <IconArrowRight />
      <IconArrowLeft />
      <IconArrowRight />
      <span>B</span>
      <span>A</span>
    </div>
  );
};

export default AboutMeApplication;
