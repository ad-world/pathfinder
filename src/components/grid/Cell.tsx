import { Td } from "@chakra-ui/react";
import { GraphNode } from "../../types";

interface CellProps {
  cell: GraphNode;
  row: number;
  col: number;
}

const Cell: React.FC<CellProps> = ({ cell, row, col }) => {
  const getBgColor = (cell: GraphNode) => {
    if (cell.isStart) return "green.500";
    if (cell.isFinish) return "red.500";
    if (cell.isWall) return "black";
    return "white";
  };

  const getBgHover = (cell: GraphNode) => {
    if (cell.isStart) return "green.300";
    if (cell.isFinish) return "red.300";
    if (cell.isWall) return "gray.700";
    return "gray.200";
  };

  return (
    <Td
      id={`${row}_${col}`}
      backgroundColor={getBgColor(cell)}
      key={`${row}_${col}`}
      borderColor={"blue.300"}
      border={"1px"}
      maxH="35px"
      maxW="35px"
      minH="35px"
      minW="35px"
      padding={3}
      _hover={{ bgColor: getBgHover(cell) }}
    ></Td>
  );
};

export default Cell;
