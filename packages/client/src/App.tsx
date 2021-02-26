import { BrowserRouter as Router, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import LandingPage from "./LandingPage";
import GamePage from "./GamePage";

const theme = extendTheme({
  fonts: {
    body: "'Rubik', sans-serif",
    heading: "'Rubik', sans-serif",
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/:gameId">
          <GamePage />
        </Route>
      </Router>
    </ChakraProvider>
  );
}

export default App;
