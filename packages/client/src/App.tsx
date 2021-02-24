import { ChakraProvider } from "@chakra-ui/react";
import LandingPage from "./LandingPage";

function App() {
  return (
    <ChakraProvider>
      <LandingPage />
    </ChakraProvider>
  );
}

export default App;
