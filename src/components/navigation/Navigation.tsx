import { Box, Button, HStack, Heading, Select } from "@chakra-ui/react";
import { createGrid } from "../../util/util";
import { GraphNode } from "../../types";

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
  return (
    <Box maxH={"10%"} h="10%" p={6} w="100%">
      <HStack justifyContent={"space-between"}>
        <HStack gap={8}>
          <Heading size={"md"}>Pathfinder</Heading>
          <Select>
            <option>Choose Algorithm</option>
            {Object.entries(Algorithms).map((item) => {
              return (
                <option key={item[0]} value={item[0]}>
                  {item[1]}
                </option>
              );
            })}
          </Select>
          <Button px={6} colorScheme="red" onClick={resetGrid}>
            Clear Board
          </Button>
        </HStack>

        <HStack>
          <Button>Search</Button>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Navigation;
