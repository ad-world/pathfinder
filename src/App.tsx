import { Container } from "@chakra-ui/react";
import "./App.css";
import Pathfinder from "./pages/pathfinder/Pathfinder";

function App() {
  return (
    <Container minW="100vw" padding={0} margin={0} h="100vh">
      <Pathfinder />
    </Container>
  );
}

export default App;
