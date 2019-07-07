import * as React from "react";
import { css } from "emotion";
import { useSpring, animated } from "react-spring";
import { Provider, useMenuState, Menu, MenuDisclosure, MenuItem } from "reakit";
import * as system from "reakit-system-bootstrap";

function AnimatedCSSMenu() {
  const menu = useMenuState({ unstable_animated: true });
  return (
    <>
      <MenuDisclosure {...menu}>Menu (CSS)</MenuDisclosure>
      <Menu
        {...menu}
        aria-label="Menu"
        className={css`
          transition: transform 0.5s ease, opacity 0.5s ease;
          &.hidden {
            opacity: 0;
            transform: ${menu.unstable_popoverStyles.transform}
              translate3d(0, -10px, 0) !important;
          }
        `}
      >
        <MenuItem {...menu}>Item 1</MenuItem>
        <MenuItem {...menu}>Item 2</MenuItem>
        <MenuItem {...menu}>Item 3</MenuItem>
      </Menu>
    </>
  );
}

function AnimatedSpringMenu() {
  const menu = useMenuState({ unstable_animated: true });
  const { opacity, scale } = useSpring({
    opacity: menu.visible ? 1 : 0,
    scale: menu.visible ? 1 : 0,
    onRest: menu.unstable_stopAnimation,
    config: name => ({
      tension: name === "opacity" ? 250 : 300,
      friction: 25
    })
  });

  return (
    <>
      <MenuDisclosure {...menu}>Menu (react-spring)</MenuDisclosure>
      <Menu
        {...menu}
        as={animated.div}
        aria-label="Menu"
        style={{
          opacity,
          transformOrigin: "top center",
          transform: scale.interpolate(
            s => `${menu.unstable_popoverStyles.transform} scaleY(${s})`
          )
        }}
      >
        <MenuItem {...menu}>Item 1</MenuItem>
        <MenuItem {...menu}>Item 2</MenuItem>
        <MenuItem {...menu}>Item 3</MenuItem>
      </Menu>
    </>
  );
}

function App() {
  return (
    <>
      <AnimatedCSSMenu />
      <br />
      <br />
      <Provider unstable_system={system}>
        <AnimatedSpringMenu />
      </Provider>
    </>
  );
}

export default App;
