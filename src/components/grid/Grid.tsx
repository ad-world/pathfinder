import { SimpleGrid } from "@chakra-ui/react";
import Cell from "./Cell";
import { calculateGridDimensions, createGrid } from "../../util/util";
import { useRef, useState } from "react";

const PathGrid = () => {
  const ref = useRef(null);
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  console.log(screenHeight * 0.8, screenWidth);

  const { rows, columns } = calculateGridDimensions(
    screenWidth,
    screenHeight * 0.8,
    20
  );

  console.log({ rows, columns });

  const [cellGrid, setCellGrid] = useState(createGrid(rows, columns));
  const selectCell = (row: number, col: number) => {
    const copy = cellGrid;
    for (let i = 0; i < cellGrid.length; i++) {
      for (let j = 0; j < cellGrid[0].length; j++) {
        if (row == i && col == j) {
          copy[i][j] = 1;
        }
      }
    }

    setCellGrid(copy);
  };

  return (
    <SimpleGrid
      minW={"100%"}
      maxW={"100%"}
      minH={"90vh"}
      maxH={"90vh"}
      gap={"0"}
      ref={ref}
      templateRows={`repeat(${rows}, 1fr)`}
      templateColumns={`repeat(${columns}, 1fr)`}
    >
      {cellGrid.map((row, row_ind) => {
        return row.map((cell, col_ind) => {
          return (
            <Cell
              state={cell}
              row={row_ind}
              col={col_ind}
              onClick={() => selectCell(row_ind, col_ind)}
            />
          );
        });
      })}
    </SimpleGrid>
  );
};

export default PathGrid;
