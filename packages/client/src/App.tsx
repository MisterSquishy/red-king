import { BrowserRouter as Router, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import LandingPage from "./LandingPage";
import Game from "./Game";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/:gameId">
          <Game />
        </Route>
      </Router>
    </ChakraProvider>
  );
}

export default App;
