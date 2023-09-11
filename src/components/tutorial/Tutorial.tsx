import {
    Box,
    Button,
    HStack,
    Heading,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Step,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    Stepper,
    Text,
    UnorderedList,
    useSteps,
} from "@chakra-ui/react";
import { Algorithms, CellSizePixels } from "../../util/util";
import { Colors } from "../../util/colors";

interface TutorialProps {
    isOpen: boolean;
    onClose: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ isOpen, onClose }) => {
    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: 4,
    });

    const headerMap: { [x: number]: string } = {
        0: "Start & End Nodes",
        1: "Wall nodes",
        2: "Choosing an Algorithm",
        3: "Visualizing",
    };

    const contentMap: { [x: number]: JSX.Element } = {
        0: (
            <>
                <Text>
                    The green node is the starting node, and the red node is the
                    ending node. Click and drag them to move them around.
                </Text>
                <HStack gap={4} mt={2}>
                    <Box
                        minW={CellSizePixels}
                        minH={CellSizePixels}
                        bgColor={Colors.StartingNode}
                        _hover={{ bgColor: Colors.StartingNodeHover }}
                    ></Box>
                    <Text>Starting Node</Text>
                </HStack>
                <HStack gap={4} my={2}>
                    <Box
                        minW={CellSizePixels}
                        minH={CellSizePixels}
                        bgColor={Colors.EndingNode}
                        _hover={{ bgColor: Colors.EndingNodeHover }}
                    ></Box>
                    <Text>Ending Node</Text>
                </HStack>
            </>
        ),
        1: (
            <>
                <Text>
                    Click and drag on empty cells to create a wall node. The
                    searching algorithm will consider these wall nodes as
                    obstacles. Click on a wall node to turn it back to an empty
                    node.
                </Text>
                <HStack gap={4} mt={2}>
                    <Box
                        minW={CellSizePixels}
                        minH={CellSizePixels}
                        bgColor={Colors.WallNode}
                        _hover={{ bgColor: Colors.WallNodeHover }}
                    ></Box>
                    <Text>Wall Node</Text>
                </HStack>
                <HStack gap={4} my={2}>
                    <Box
                        minW={CellSizePixels}
                        minH={CellSizePixels}
                        bgColor={Colors.EmptyNode}
                        border={"1px solid"}
                        _hover={{ bgColor: Colors.EmptyNodeHover }}
                    ></Box>
                    <Text>Empty Node</Text>
                </HStack>
            </>
        ),
        2: (
            <>
                <Text>
                    Click on 'Choose an Algorithm' in the top left to pick an
                    algorithm to search based on. These are the current options.
                </Text>
                <UnorderedList>
                    {Object.values(Algorithms).map((item) => (
                        <ListItem key={item}>{item}</ListItem>
                    ))}
                </UnorderedList>
            </>
        ),
        3: (
            <>
                <Text>
                    Click 'Search' in the top right and watch the magic happen.
                    Blue nodes are nodes that the algorithm has marked as
                    'visited'. Purple nodes are nodes that are part of the
                    shortest path.
                </Text>
                <HStack gap={4} my={4}>
                    <Box
                        minW={CellSizePixels}
                        minH={CellSizePixels}
                        bgColor={Colors.VisitedNode}
                        _hover={{ bgColor: Colors.VisitedNodeHover }}
                    ></Box>
                    <Text>Visited Node</Text>
                </HStack>
                <HStack gap={4} my={4}>
                    <Box
                        minW={CellSizePixels}
                        minH={CellSizePixels}
                        bgColor={Colors.ShortestPathNode}
                        _hover={{ bgColor: Colors.ShortestPathHoverNode }}
                    ></Box>
                    <Text>Shortest Path Node</Text>
                </HStack>
            </>
        ),
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent minW={"700px"}>
                <ModalHeader>Pathfinder Tutorial</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stepper index={activeStep} width={"600px"} mb={4}>
                        {[1, 2, 3, 4].map((index) => (
                            <Step key={index}>
                                <StepIndicator>
                                    <StepStatus
                                        complete={<StepIcon />}
                                        incomplete={<StepNumber />}
                                        active={<StepNumber />}
                                    />
                                </StepIndicator>

                                <StepSeparator />
                            </Step>
                        ))}
                    </Stepper>
                    <Heading size="sm">{headerMap[activeStep]}</Heading>
                    {contentMap[activeStep]}
                    <HStack my={4} justifyContent={"space-between"}>
                        <HStack>
                            {activeStep > 0 && (
                                <Button
                                    onClick={() =>
                                        setActiveStep(activeStep - 1)
                                    }
                                >
                                    Previous
                                </Button>
                            )}
                            {activeStep < 4 && (
                                <Button
                                    onClick={() => {
                                        if (activeStep == 3) onClose();
                                        setActiveStep(activeStep + 1);
                                    }}
                                >
                                    Next
                                </Button>
                            )}
                        </HStack>
                        <Button colorScheme="red" onClick={onClose} mx={4}>
                            Close Tutorial
                        </Button>
                    </HStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default Tutorial;
