import { useEffect, useState } from "react";
import Navigation from "../../components/navigation/Navigation";
import {
  CellSizePixels,
  calculateGridSize,
  createGrid,
  getWeightedNodes,
  removeDuplicateBasedOnFinalCell,
} from "../../util/util";
import { Table, TableContainer, Tbody, Tr } from "@chakra-ui/react";
import Cell from "../../components/grid/Cell";
import { GraphNode, WeightedNode } from "../../types";

interface GridState {
  isMouseDown: boolean;
  isMovingStart: boolean;
  isMovingEnd: boolean;
  oldStartNode: GraphNode | null;
  oldEndNode: GraphNode | null;
  oldWallNode: GraphNode | null;
}

const Pathfinder = () => {
  const { rows, columns } = calculateGridSize();

  const [cellGrid, setCellGrid] = useState(createGrid(rows, columns));
  const [currentWeight, setCurrentWeight] = useState<WeightedNode>(getWeightedNodes()[0]);
  const [isDrawingWall, setIsDrawingWall] = useState<boolean>(true);

  const [gridState, setGridState] = useState<GridState>({
    isMouseDown: false,
    isMovingEnd: false,
    isMovingStart: false,
    oldStartNode: null,
    oldEndNode: null,
    oldWallNode: null,
  });

  useEffect(() => {
    document.onmousedown = (ev: MouseEvent) => {
      setGridState({
        ...gridState,
        isMouseDown: true,
      });
      if (ev.clientX) {
        const x = ev.clientX;
        const y = ev.clientY;

        const targetEl = document.elementFromPoint(x, y)?.id;
        if (targetEl) {
          const pos = targetEl.split("_");
          const row = Number(pos[0]);
          const col = Number(pos[1]);

          if (cellGrid[row][col].isStart) {
            setGridState({
              ...gridState,
              oldStartNode: cellGrid[row][col],
              isMovingStart: true,
            });
          } else if (cellGrid[row][col].isFinish) {
            setGridState({
              ...gridState,
              oldEndNode: cellGrid[row][col],
              isMovingEnd: true,
            });
          } else {
            const copy = [...cellGrid];

            if(isDrawingWall) {
              copy[row][col].isWall = !copy[row][col].isWall;
            } else {
              copy[row][col].weight = currentWeight.weight;

            }

            setGridState({
              ...gridState,
              oldWallNode: copy[row][col],
            });
            setCellGrid(copy);
          }
        }
      }
    };
    document.onmousemove = (ev: MouseEvent) => {
      if (ev.clientX) {
        const x = ev.clientX;
        const y = ev.clientY;
        const targetEl = document.elementFromPoint(x, y)?.id;
        if (targetEl && ev.buttons == 1) {
          const pos = targetEl.split("_");
          let copy = [...cellGrid];
          const row = Number(pos[0]);
          const col = Number(pos[1]);

          if (!gridState.isMovingStart && !gridState.isMovingEnd) {
            if(isDrawingWall) {
              copy[row][col].isWall = true;
            } else {
              copy[row][col].weight = currentWeight.weight
            }
          } else if (gridState.isMovingStart) {
            if (gridState.oldStartNode) {
              copy[gridState.oldStartNode.row][
                gridState.oldStartNode.col
              ].isStart = false;
            }
            copy[row][col].isStart = true;
            copy[row][col].isWall = false;
            setGridState({
              ...gridState,
              oldStartNode: copy[row][col],
            });
            copy = removeDuplicateBasedOnFinalCell(row, col, "start", cellGrid);
          } else if (gridState.isMovingEnd) {
            if (gridState.oldEndNode) {
              copy[gridState.oldEndNode.row][
                gridState.oldEndNode.col
              ].isFinish = false;
            }
            copy[row][col].isFinish = true;
            copy[row][col].isWall = false;
            setGridState({
              ...gridState,
              oldEndNode: copy[row][col],
            });

            copy = removeDuplicateBasedOnFinalCell(
              row,
              col,
              "finish",
              cellGrid
            );
          }

          setCellGrid(copy);
        }
      }
    };
    document.onmouseup = (ev: MouseEvent) => {
      if (ev.clientX) {
        const x = ev.clientX;
        const y = ev.clientY;

        const target = document.elementFromPoint(x, y)?.id;
        if (target) {
          const split = target.split("_");
          const row = Number(split[0]);
          const col = Number(split[1]);

          if (gridState.isMovingStart) {
            const newGrid = removeDuplicateBasedOnFinalCell(
              row,
              col,
              "start",
              cellGrid
            );
            setCellGrid(newGrid);
          }
          if (gridState.isMovingEnd) {
            const newGrid = removeDuplicateBasedOnFinalCell(
              row,
              col,
              "finish",
              cellGrid
            );
            setCellGrid(newGrid);
          }
        }
      }

      setGridState({
        isMouseDown: false,
        isMovingEnd: false,
        isMovingStart: false,
        oldStartNode: null,
        oldEndNode: null,
        oldWallNode: null,
      });
    };
  }, [gridState, cellGrid, isDrawingWall, currentWeight.weight]);

  return (
    <>
      <Navigation
        cellGrid={cellGrid}
        setCellGrid={setCellGrid}
        currentWeight={currentWeight}
        setCurrentWeight={setCurrentWeight}
        isDrawingWall={isDrawingWall}
        setIsDrawingWall={setIsDrawingWall}
      />
      <TableContainer>
        <Table>
          <Tbody>
            {cellGrid.map((row, row_ind) => {
              return (
                <Tr h={CellSizePixels} key={row_ind}>
                  {row.map((cell, col_ind) => {
                    return (
                      <Cell
                        key={`${row_ind}_${col_ind}`}
                        col={col_ind}
                        row={row_ind}
                        cell={cell}
                      />
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
