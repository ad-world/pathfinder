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
import Tutorial from "./components/tutorial/Tutorial";

function App() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: tutIsOpen,
        onOpen: tutOnOpen,
        onClose: tutOnClose,
    } = useDisclosure();

    useEffect(() => {
        onOpen();
    }, [onOpen]);

    return (
        <Container minW="100vw" padding={0} margin={0} h="100vh">
            <Tutorial isOpen={tutIsOpen} onClose={tutOnClose} />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        This app is <b>under development.</b>
                        <ModalCloseButton />
                    </ModalHeader>
                    <ModalBody>
                        If you have somehow found your way to this page, just
                        know this it is not a complete project just yet. I'm
                        just hosting it for fun. Hopefully it will be done soon.
                        Feel free to try and play around / break it.
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="white"
                            color={"black"}
                            onClick={() => {
                                onClose();
                                tutOnOpen();
                            }}
                        >
                            Tutorial
                        </Button>
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
