import { Box, Button, HStack, Heading, Select, Text } from "@chakra-ui/react";
import {
    CellSizePixels,
    createGrid,
    getFinishNode,
    getStartingNode,
    unVisitAllNodes,
} from "../../util/util";
import { GraphNode } from "../../types";
import { Colors } from "../../util/colors";
import { bfs } from "../../algorithms/bfs";

enum Algorithms {
    BFS = "Breadth First Search (BFS)",
    DFS = "Depth First Search (DFS)",
}

interface NavigationProps {
    cellGrid: GraphNode[][];
    setCellGrid: React.Dispatch<React.SetStateAction<GraphNode[][]>>;
}

const Navigation: React.FC<NavigationProps> = ({ cellGrid, setCellGrid }) => {
    const rows = cellGrid.length;
    const columns = cellGrid[0].length;

    const resetGrid = () => {
        setCellGrid(createGrid(rows, columns));
    };

    const handleSearch = () => {
        setCellGrid(unVisitAllNodes(cellGrid));

        const result = bfs(
            cellGrid,
            getStartingNode(cellGrid),
            getFinishNode(cellGrid)
        );
        console.log(result);
        setCellGrid(result.cellGrid);
        console.log("something was supposed to happen");
    };

    return (
        <Box maxH={"10%"} h="10%" p={6} w="100%">
            <HStack justifyContent={"space-between"}>
                <HStack gap={8}>
                    <Heading size={"md"}>Pathfinder</Heading>
                    <Select w={52}>
                        <option>Choose Algorithm</option>
                        {Object.entries(Algorithms).map((item) => {
                            return (
                                <option key={item[0]} value={item[0]}>
                                    {item[1]}
                                </option>
                            );
                        })}
                    </Select>
                    <Button px={4} colorScheme="red" onClick={resetGrid}>
                        Reset Board
                    </Button>
                    <HStack gap={4}>
                        <Box
                            minW={CellSizePixels}
                            minH={CellSizePixels}
                            bgColor={Colors.StartingNode}
                        ></Box>
                        <Text>Starting Node</Text>
                    </HStack>
                    <HStack gap={4}>
                        <Box
                            minW={CellSizePixels}
                            minH={CellSizePixels}
                            bgColor={Colors.EndingNode}
                        ></Box>
                        <Text>Ending Node</Text>
                    </HStack>
                    <HStack gap={4}>
                        <Box
                            minW={CellSizePixels}
                            minH={CellSizePixels}
                            bgColor={Colors.WallNode}
                        ></Box>
                        <Text>Wall Node</Text>
                    </HStack>
                    <HStack gap={4}>
                        <Box
                            minW={CellSizePixels}
                            minH={CellSizePixels}
                            bgColor={Colors.EmptyNode}
                            border={"1px solid"}
                        ></Box>
                        <Text>Empty Node</Text>
                    </HStack>
                </HStack>

                <HStack>
                    <Button onClick={handleSearch}>Search</Button>
                </HStack>
            </HStack>
        </Box>
    );
};

export default Navigation;
