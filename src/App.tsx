import React, { useEffect } from "react";
import "./index.css";
import { Box, Grommet } from "grommet";
import { BrowserRouter as Router, useHistory } from "react-router-dom";

import { Routes } from "src/Routes";
import { AppHeader } from "src/components/appHeader";
import { AppFooter } from "src/components/appFooter";

import { SearchInput, BaseContainer } from "src/components/ui";
import { ONE_USDT_Rate } from "src/components/ONE_USDT_Rate";
import { ERC20_Pool } from "src/components/ERC20_Pool";
import { ERC721_Pool } from "src/components/ERC721_Pool";
import { useThemeMode } from "src/hooks/themeSwitcherHook";
import { theme, darkTheme } from "./theme";

function App() {
  return (
    <Router>
      <AppWithHistory />
    </Router>
  );
}

function AppWithHistory() {
  const themeMode = useThemeMode();
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      const scrollBody = document.getElementById("scrollBody");
      if (scrollBody) {
        scrollBody.scrollTo({ top: 0 });
      }
    });
    return () => {
      unlisten();
    };
  }, []);

  return (
    <Grommet
      theme={themeMode === "light" ? theme : darkTheme}
      themeMode={themeMode}
      full
      id="scrollBody"
    >
      <Box
        background="backgroundBack"
        style={{ margin: "auto", minHeight: "100%" }}
      >
        <AppHeader style={{ flex: "0 0 auto" }} />
        <Box align="center" style={{ flex: "1 1 100%" }}>
          <BaseContainer>
            <SearchInput />
            <Routes />
          </BaseContainer>
        </Box>
        <AppFooter style={{ flex: "0 0 auto" }} />
        <ONE_USDT_Rate />
        <ERC20_Pool />
        <ERC721_Pool />
      </Box>
    </Grommet>
  );
}

export default App;
