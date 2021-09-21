import React, { useCallback, useState } from "react";
import { AppProvider, Frame, TopBar } from "@shopify/polaris";
import { CodeMajor } from "@shopify/polaris-icons";
import { Container } from "@mui/material";

import "./App.css";
import Dashboard from "./features/dashboard";

function App() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleIsUserMenuOpen = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    []
  );

  const handleNavigationToggle = useCallback(() => {
    console.log("toggle navigation visibility");
  }, []);

  const theme = {
    logo: {
      width: 50,
      topBarSource:
        "https://www.starpng.com/public/uploads/preview/meteor-png-11583843280kkqivrtm33.png",
      accessibilityLabel: "Spacetagram",
    },
  };

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[
        {
          items: [
            {
              content: "LinkedIn",
              icon: CodeMajor,
              url: "https://www.linkedin.com/in/ashishkirtisingh/",
            },
          ],
        },
        {
          items: [
            {
              content: "GitHub",
              icon: CodeMajor,
              url: "https://github.com/ashksin121",
            },
          ],
        },
      ]}
      name="Ashish"
      detail="Kirti Singh"
      initials="A"
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
    />
  );

  const topBarMarkup = (
    <TopBar
      userMenu={userMenuMarkup}
      onNavigationToggle={handleNavigationToggle}
    />
  );

  return (
    <AppProvider
      theme={theme}
      i18n={{
        Polaris: {
          Avatar: {
            label: "Avatar",
            labelWithInitials: "Avatar with initials {initials}",
          },
          Frame: { skipToContent: "Skip to content" },
          TopBar: {
            toggleMenuLabel: "Toggle menu",
            SearchField: {
              clearButtonLabel: "Clear",
              search: "Search",
            },
          },
        },
      }}
    >
      <div className="App">
        <Frame topBar={topBarMarkup}>
          <Container>
            <Dashboard />
          </Container>
        </Frame>
      </div>
    </AppProvider>
  );
}

export default App;
