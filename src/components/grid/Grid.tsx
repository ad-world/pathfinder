import {
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import Cell from "./Cell";
import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { GraphNode } from "../../types";
import { getNewGrid } from "../../util/util";

interface PathGridProps {
  cellGrid: GraphNode[][];
  setCellGrid: React.Dispatch<React.SetStateAction<GraphNode[][]>>;
}

const PathGrid: React.FC<PathGridProps> = ({ cellGrid, setCellGrid }) => {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const handleMouseDown = (row: number, col: number) => {
    const newGrid = getNewGrid(cellGrid, row, col);
    setCellGrid(newGrid);
    setIsMouseDown(true);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!isMouseDown) return;
    const newGrid = getNewGrid(cellGrid, row, col);
    setCellGrid(newGrid);
  };

  const handleMouseUp = () => setIsMouseDown(false);

  return (
    <TableContainer
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => {
        setIsMouseDown(false);
      }}
    >
      <Table>
        <Tbody>
          {cellGrid.map((row, row_ind) => {
            return (
              <Tr>
                {row.map((col, col_ind) => {
                  return (
                    <Td
                      backgroundColor={col.isWall ? "black" : "white"}
                      onMouseDown={() => handleMouseDown(row_ind, col_ind)}
                      onMouseEnter={() => handleMouseEnter(row_ind, col_ind)}
                      onMouseUp={handleMouseUp}
                      key={`${row_ind}_${col_ind}`}
                      borderColor={"black"}
                      border={"1px solid"}
                      maxH="15px"
                      maxW="15px"
                      padding={3}
                      _hover={{ bgColor: "gray.200" }}
                    ></Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );

  // return (
  //   <SimpleGrid
  //     minW={"100%"}
  //     maxW={"100%"}
  //     minH={"90vh"}
  //     maxH={"90vh"}
  //     gap={"0"}
  //     ref={ref}
  //     templateRows={`repeat(${rows}, 1fr)`}
  //     templateColumns={`repeat(${columns}, 1fr)`}
  //     onMouseDown={() => setIsMouseDown(true)}
  //     onMouseUp={() => {
  //       setIsMouseDown(false);
  //       updateWallArray();
  //     }}
  //   >
  //     {cellGrid.map((row, row_ind) => {
  //       return row.map((cell, col_ind) => {
  //         return (
  //           <Cell
  //             key={`${row_ind}${col_ind}`}
  //             state={cell}
  //             row={row_ind}
  //             col={col_ind}
  //             onClick={() => addToWallArray(row_ind, col_ind)}
  //             isMouseDown={isMouseDown}
  //           >
  //             {row_ind == rows / 2 && col_ind == columns / 3 ? (
  //               <ChevronLeftIcon />
  //             ) : undefined}
  //           </Cell>
  //         );
  //       });
  //     })}
  //   </SimpleGrid>
  // );
};

export default PathGrid;
