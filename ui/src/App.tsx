import Login from "./components/Login";
import "./App.css";
import { useContext, useEffect, useState } from "react";
import { Global, Stack } from "@mantine/core";
import TrustAgent from "./components/TrustAgent";
import Navigation from "./components/Navigation";
import Auth from "./components/Auth";
import { Ad4minContext } from "./context/Ad4minContext";
import { AgentProvider } from "./context/AgentContext";
import { Route, Routes } from "react-router-dom";
import Splashscreen from "./components/Splashscreen";
import Perspectives from "./components/Perspectives";
import Language from "./components/Language";
import Settings from "./components/Settings";
import { appWindow } from "@tauri-apps/api/window";
import { Connect } from "./components/Connect";
import Apps from "./components/Apps";

const App = () => {
  const [opened, setOpened] = useState(false);
  const {
    state: { candidate, did, auth },
    methods: { handleTrustAgent },
  } = useContext(Ad4minContext);

  useEffect(() => {
    let unlisten: () => void;

    appWindow
      .listen("tauri://close-requested", ({ event, payload }) => {
        appWindow.hide();
      })
      .then((func) => {
        unlisten = func;
      })
      .catch((e) => console.error(e));

    return () => {
      if (unlisten) {
        unlisten();
      }
    };
  }, []);

  return (
    <div className="App">
      <Global
        styles={(theme) => ({
          "*": {
            fontFamily: `"DM Sans", Helvetica, Arial, sans-serif`,
          },
          ".mantine-AppShell-main": {
            width: "100%",
          },
          ".mantine-Stack-root": {
            display: "block",
            minHeight: "100%",
            width: "100%",
          },
        })}
      />
      <Routes>
        <Route path="/splashscreen" element={<Splashscreen />} />
        <Route
          path="/login"
          element={
            <Stack align="center" spacing="xl" style={{ margin: "auto" }}>
              <AgentProvider>
                <Login />
              </AgentProvider>
            </Stack>
          }
        />
        <Route
          path="/"
          element={
            <Navigation did={did} setOpened={setOpened} opened={opened} />
          }
        >
          <Route path="apps" element={<Apps />} />
          <Route
            path="language"
            element={<Language setOpened={setOpened} opened={opened} />}
          />
          <Route
            path="perspective"
            element={<Perspectives setOpened={setOpened} opened={opened} />}
          />
          <Route
            path="settings"
            element={
              <AgentProvider>
                <Settings did={did} setOpened={setOpened} opened={opened} />
              </AgentProvider>
            }
          />
        </Route>
        <Route path="/connect" element={<Connect />} />
      </Routes>
      {candidate && (
        <TrustAgent candidate={candidate} handleTrustAgent={handleTrustAgent} />
      )}
      {auth && <Auth />}
    </div>
  );
};

export default App;
