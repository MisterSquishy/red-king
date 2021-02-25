import { BrowserRouter as Router, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import LandingPage from "./LandingPage";
import GamePage from "./GamePage";

function App() {
  return (
    <ChakraProvider>
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
