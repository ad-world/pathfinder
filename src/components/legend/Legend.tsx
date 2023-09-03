import {
    Box,
    Button,
    HStack,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Text,
    VStack,
} from "@chakra-ui/react";
import { CellSizePixels } from "../../util/util";
import { Colors } from "../../util/colors";

const Legend = () => {
    return (
        <Popover>
            <PopoverTrigger>
                <Button variant="outline" colorScheme='cyan'>Legend</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow></PopoverArrow>
                <PopoverCloseButton></PopoverCloseButton>
                <PopoverHeader>Node Types</PopoverHeader>
                <PopoverBody>
                    <VStack
                        gap={2}
                        textAlign={"left"}
                        alignItems={"flex-start"}
                    >
                        <HStack gap={4}>
                            <Box
                                minW={CellSizePixels}
                                minH={CellSizePixels}
                                bgColor={Colors.StartingNode}
                                _hover={{ bgColor: Colors.StartingNodeHover }}
                            ></Box>
                            <Text>Starting Node</Text>
                        </HStack>
                        <HStack gap={4}>
                            <Box
                                minW={CellSizePixels}
                                minH={CellSizePixels}
                                bgColor={Colors.EndingNode}
                                _hover={{ bgColor: Colors.EndingNodeHover }}
                            ></Box>
                            <Text>Ending Node</Text>
                        </HStack>
                        <HStack gap={4}>
                            <Box
                                minW={CellSizePixels}
                                minH={CellSizePixels}
                                bgColor={Colors.WallNode}
                                _hover={{ bgColor: Colors.WallNodeHover }}
                            ></Box>
                            <Text>Wall Node</Text>
                        </HStack>
                        <HStack gap={4}>
                            <Box
                                minW={CellSizePixels}
                                minH={CellSizePixels}
                                bgColor={Colors.EmptyNode}
                                border={"1px solid"}
                                _hover={{ bgColor: Colors.EmptyNodeHover }}
                            ></Box>
                            <Text>Empty Node</Text>
                        </HStack>
                        <HStack gap={4}>
                            <Box
                                minW={CellSizePixels}
                                minH={CellSizePixels}
                                bgColor={Colors.VisitedNode}
                                _hover={{ bgColor: Colors.VisitedNodeHover }}
                            ></Box>
                            <Text>Visited Node</Text>
                        </HStack>
                        <HStack gap={4}>
                            <Box
                                minW={CellSizePixels}
                                minH={CellSizePixels}
                                bgColor={Colors.ShortestPathNode}
                                _hover={{
                                    bgColor: Colors.ShortestPathHoverNode,
                                }}
                            ></Box>
                            <Text>Shortest Path Node</Text>
                        </HStack>
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default Legend;
