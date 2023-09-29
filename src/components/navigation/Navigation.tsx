import { Box, Button, HStack, Heading, Menu, MenuButton, MenuItem, MenuList, Select, Text } from "@chakra-ui/react";
import {
    ANIMATION_SPEED,
    Algorithms,
    createGrid,
    getFinishNode,
    getStartingNode,
    getWeightedNodes,
    removeWeights,
    unVisitAllNodes,
    unsetWalls,
} from "../../util/util";
import { GraphAlgorithmResult, GraphNode, WeightedNode } from "../../types";
import { bfs } from "../../algorithms/bfs";
import { useCallback, useState } from "react";
import { dfs } from "../../algorithms/dfs";
import Legend from "../legend/Legend";
import { dijkstra } from "../../algorithms/dijkstra";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { a_star_search } from "../../algorithms/a-star-search";
import { Colors } from "../../util/colors";

interface NavigationProps {
    cellGrid: GraphNode[][];
    setCellGrid: React.Dispatch<React.SetStateAction<GraphNode[][]>>;
    currentWeight: WeightedNode;
    setCurrentWeight: React.Dispatch<React.SetStateAction<WeightedNode>>;
    isDrawingWall: boolean,
    setIsDrawingWall: React.Dispatch<React.SetStateAction<boolean>>;
}

let pathAnimationTimer: ReturnType<typeof setTimeout>;
let shortestPathAnimationTimer: ReturnType<typeof setTimeout>;

const Navigation: React.FC<NavigationProps> = ({ cellGrid, setCellGrid, currentWeight, setCurrentWeight, isDrawingWall, setIsDrawingWall }) => {
    const rows = cellGrid.length;
    const columns = cellGrid[0].length;
    const [algorithm, setAlgorithm] = useState<Algorithms | null>(null);

    const weightedNodes = getWeightedNodes();

    const resetGrid = () => {
        clearTimeout(pathAnimationTimer);
        clearTimeout(shortestPathAnimationTimer);
        setCellGrid(createGrid(rows, columns));
    };

    const unvisitNodes = () => {
        setCellGrid(unVisitAllNodes(cellGrid));
    }

    const removeWalls = () => {
        setCellGrid(unsetWalls(cellGrid));
    }

    const removeWeightedNodes = () => {
        setCellGrid(removeWeights(cellGrid));
    }

    const handleSearch = useCallback(() => {
        clearTimeout(pathAnimationTimer);
        clearTimeout(shortestPathAnimationTimer);

        const shortestPathAnimation = (
            pathNodes: GraphNode[],
            currentIndex: number,
            currentGrid: GraphNode[][],
            gridSetter: (arg: GraphNode[][]) => void
        ) => {
            if (currentIndex >= pathNodes.length) {
                return;
            } else {
                const curNode = pathNodes[currentIndex];
                curNode.isInShortestPath = true;

                const copy = [...currentGrid];
                copy[curNode.row][curNode.col] = curNode;
                gridSetter(copy);

                shortestPathAnimationTimer = setTimeout(
                    shortestPathAnimation,
                    ANIMATION_SPEED,
                    pathNodes,
                    ++currentIndex,
                    currentGrid,
                    gridSetter
                );
            }
        };

        const pathAnimation = (
            visitedNodes: GraphNode[],
            currentIndex: number,
            currentGrid: GraphNode[][],
            gridSetter: (arg: GraphNode[][]) => void,
            shortestPath: GraphNode[]
        ) => {
            if (currentIndex >= visitedNodes.length) {
                if (shortestPath && shortestPath.length) {
                    shortestPathAnimation(
                        shortestPath,
                        0,
                        currentGrid,
                        gridSetter
                    );
                }
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
                    gridSetter,
                    shortestPath
                );
            }
        };

        const animateAlgorithm = (result: GraphAlgorithmResult) => {
            const { cellGrid: newGrid, visitedNodes, shortestPath } = result;
            const copy = unVisitAllNodes(newGrid);


            pathAnimation(visitedNodes, 0, copy, setCellGrid, shortestPath);
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
            } else if (algorithm == Algorithms.DIJKSTRA) {
                result = dijkstra({
                    cellGrid,
                    startNode: getStartingNode(cellGrid),
                    endNode: getFinishNode(cellGrid)
                })
            } else if (algorithm == Algorithms.A_STAR) {
                result = a_star_search({
                    cellGrid,
                    startNode: getStartingNode(cellGrid),
                    endNode: getFinishNode(cellGrid)
                })
            }

            if (result) animateAlgorithm(result);
        }
    }, [algorithm, cellGrid, setCellGrid]);

    return (
        <Box maxH={"10%"} h="10%" minH={"10%"} p={6} w="100%">
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
                    <Menu>
                        <MenuButton as={Button} px={4} colorScheme="red">
                            Actions <ChevronDownIcon/>
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={resetGrid}>Reset Board</MenuItem>
                            <MenuItem onClick={unvisitNodes}>Unvisit Nodes</MenuItem>
                            <MenuItem onClick={removeWalls}>Remove Walls</MenuItem>
                            <MenuItem onClick={removeWeightedNodes}>Remove Weighted Nodes</MenuItem>
                        </MenuList>
                    </Menu>
                    <Legend />
                    <Menu>
                        <MenuButton as={Button} border={'1px solid'}>
                            <HStack>
                                <Text>{isDrawingWall ? 'Wall ' : currentWeight?.title}</Text>
                                <Box
                                    minW={"15px"}
                                    minH={"15px"}
                                    bgColor={isDrawingWall ? Colors.WallNode : currentWeight?.color}
                                ></Box>
                            </HStack>
                        </MenuButton>
                        <MenuList>
                            {weightedNodes.map(item => {
                                return (
                                    <MenuItem onClick={() => {
                                        setCurrentWeight(item);
                                        setIsDrawingWall(false);
                                    }}>
                                        <HStack>
                                            <Text>{item.title}</Text>
                                            <Box
                                                minW={"15px"}
                                                minH={"15px"}
                                                bgColor={item.color}
                                            ></Box>
                                        </HStack>
                                    </MenuItem>
                                )
                            })}
                            <MenuItem onClick={() => setIsDrawingWall(true)}>
                                <HStack>
                                    <Text>Wall</Text>
                                    <Box minW={"15px"} minH={"15px"} bgColor={Colors.WallNode}>
                                    </Box>
                                </HStack>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>

                <HStack>
                    <Button onClick={handleSearch}>Search</Button>
                </HStack>
            </HStack>
        </Box>
    );
};

export default Navigation;
