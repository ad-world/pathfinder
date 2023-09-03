import { Box, Button, HStack, Heading, Select, Text } from "@chakra-ui/react";
import {
    ANIMATION_SPEED,
    Algorithms,
    CellSizePixels,
    createGrid,
    getFinishNode,
    getStartingNode,
    unVisitAllNodes,
} from "../../util/util";
import { GraphAlgorithmResult, GraphNode } from "../../types";
import { Colors } from "../../util/colors";
import { bfs } from "../../algorithms/bfs";
import { useCallback, useState } from "react";
import { dfs } from "../../algorithms/dfs";



interface NavigationProps {
    cellGrid: GraphNode[][];
    setCellGrid: React.Dispatch<React.SetStateAction<GraphNode[][]>>;
}

let pathAnimationTimer: ReturnType<typeof setTimeout>;

const Navigation: React.FC<NavigationProps> = ({ cellGrid, setCellGrid }) => {
    const rows = cellGrid.length;
    const columns = cellGrid[0].length;
    const [algorithm, setAlgorithm] = useState<Algorithms | null>(null);

    const resetGrid = () => {
        clearTimeout(pathAnimationTimer);
        setCellGrid(createGrid(rows, columns));
    };

    const handleSearch = useCallback(() => {
        clearTimeout(pathAnimationTimer);
        const pathAnimation = (
            visitedNodes: GraphNode[],
            currentIndex: number,
            currentGrid: GraphNode[][],
            gridSetter: (arg: GraphNode[][]) => void
        ) => {
            if (currentIndex >= visitedNodes.length) {
                pathAnimationTimer;
                // shortest path animation
            } else {
                const curNode = visitedNodes[currentIndex];
                curNode.isVisited = true;

                const copy = [...currentGrid];
                copy[curNode.row][curNode.col] = curNode;
                gridSetter(copy);

                pathAnimationTimer = setTimeout(
                    pathAnimation,
                    ANIMATION_SPEED,
                    visitedNodes,
                    ++currentIndex,
                    currentGrid,
                    gridSetter
                );
            }
        };

        const animateAlgorithm = (result: GraphAlgorithmResult) => {
            const { cellGrid: newGrid, visitedNodes } = result;
            const copy = unVisitAllNodes(newGrid);

            pathAnimation(visitedNodes, 0, copy, setCellGrid);
        };

        setCellGrid(unVisitAllNodes(cellGrid));

        if (algorithm && cellGrid) {
            let result: GraphAlgorithmResult | null = null;

            if (algorithm == Algorithms.BFS) {
                result = bfs({
                    cellGrid,
                    startNode: getStartingNode(cellGrid),
                    endNode: getFinishNode(cellGrid),
                });
            } else if (algorithm == Algorithms.DFS) {
                result = dfs({
                    cellGrid,
                    startNode: getStartingNode(cellGrid),
                    endNode: getFinishNode(cellGrid),
                });
            }

            if (result) animateAlgorithm(result);
        }
    }, [algorithm, cellGrid, setCellGrid]);

    return (
        <Box maxH={"10%"} h="10%" p={6} w="100%">
            <HStack justifyContent={"space-between"}>
                <HStack gap={8}>
                    <Heading size={"md"}>Pathfinder</Heading>
                    <Select
                        w={52}
                        onChange={(e) => {
                            if (e.target.value == "null") setAlgorithm(null);
                            else {
                                setAlgorithm(e.target.value as Algorithms);
                            }
                        }}
                    >
                        <option onClick={() => setAlgorithm(null)} value="null">
                            Choose Algorithm
                        </option>
                        {Object.entries(Algorithms).map((item) => {
                            return (
                                <option key={item[0]} value={item[1]}>
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
                </HStack>

                <HStack>
                    <Button onClick={handleSearch}>Search</Button>
                </HStack>
            </HStack>
        </Box>
    );
};

export default Navigation;
