import React from "react";
import { Box, Heading } from "grommet";
import { FiatPrice, BaseContainer } from "src/components/ui";
import { useHistory } from "react-router-dom";
import { ConfigureButton } from './ConfigureButton';
import { InfoButton } from './InfoButton';
import { useThemeMode } from "src/hooks/themeSwitcherHook";

import { CSSProperties } from "styled-components";

const HeaderLine = (props: any) => {
  //@ts-ignore
  const isDark = useThemeMode() === 'dark';

  return (
    <Box
      tag="header"
      direction="row"
      justify="center"
      background={isDark ? 'background' : 'brand'}
      pad={{ vertical: "small" }}
      elevation={isDark ? 'none' : 'medium' }
      style={{ zIndex: "1" }}
      {...props}
    />
  )
}

export function AppHeader(props: { style: CSSProperties }) {
  const history = useHistory();

  return (
    <HeaderLine {...props}>
      <BaseContainer direction="row" align="center" justify="between" flex>
        <Heading
          level="5"
          margin="none"
          style={{ cursor: "pointer" }}
          onClick={() => history.push("/")}
        >
          Harmony Block Explorer
          <br />
          <FiatPrice />
        </Heading>
        <Box direction="row">
          <InfoButton />
          <ConfigureButton />
        </Box>
      </BaseContainer>
    </HeaderLine>
  );
}
