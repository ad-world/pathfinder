import { useCallback, useMemo, useState } from "react";
import PathGrid from "../../components/grid/Grid";
import Navigation from "../../components/navigation/Navigation";
import {
  calculateGridDimensions,
  createGrid,
  getNewGrid,
} from "../../util/util";
import { Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";
import { ArrowRightIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Pathfinder = () => {
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const rows = 27;
  const columns = 60;
  // const { rows, columns } = useMemo(
  //   () => calculateGridDimensions(screenWidth, screenHeight * 0.8, 20),
  //   [screenHeight, screenWidth]
  // );

  const [cellGrid, setCellGrid] = useState(createGrid(rows, columns));
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const handleMouseDown = useCallback(
    (row: number, col: number) => {
      const newGrid = getNewGrid(cellGrid, row, col);
      setCellGrid(newGrid);
      setIsMouseDown(true);
    },
    [cellGrid]
  );

  const handleMouseEnter = useCallback(
    (row: number, col: number) => {
      if (!isMouseDown) return;
      const newGrid = getNewGrid(cellGrid, row, col);
      setCellGrid(newGrid);
    },
    [cellGrid, setCellGrid, isMouseDown]
  );

  const handleMouseUp = () => setIsMouseDown(false);

  return (
    <>
      <Navigation cellGrid={cellGrid} setCellGrid={setCellGrid} />
      {/* <PathGrid cellGrid={cellGrid} setCellGrid={setCellGrid} /> */}
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
                        children={
                          col.isStart ? (
                            <ArrowRightIcon
                              padding={0}
                              margin={0}
                              onDrag={() => console.log("dragged")}
                            />
                          ) : null
                        }
                        backgroundColor={col.isWall ? "black" : "white"}
                        onMouseDown={() => handleMouseDown(row_ind, col_ind)}
                        onMouseEnter={() => handleMouseEnter(row_ind, col_ind)}
                        onMouseUp={handleMouseUp}
                        key={`${row_ind}_${col_ind}`}
                        borderColor={"blue.300"}
                        border={"1px"}
                        maxH="20px"
                        maxW="20px"
                        padding={col.isStart || col.isFinish ? 0 : 3}
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
    </>
  );
};

export default Pathfinder;
