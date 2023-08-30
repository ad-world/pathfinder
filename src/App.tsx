import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import "./App.css";
import Pathfinder from "./pages/pathfinder/Pathfinder";
import { useEffect } from "react";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);
  return (
    <Container minW="100vw" padding={0} margin={0} h="100vh">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            This app is <b>under development.</b>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            If you have somehow found your way to this page, just know this it
            is not a complete project just yet. I'm just hosting it for fun.
            Hopefully it will be done soon. Feel free to try and play around /
            break it.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Explore
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Pathfinder />
    </Container>
  );
}

export default App;
