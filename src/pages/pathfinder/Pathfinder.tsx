import { useEffect, useState } from "react";
import Navigation from "../../components/navigation/Navigation";
import {
  createGrid,
} from "../../util/util";
import { Table, TableContainer, Tbody, Tr } from "@chakra-ui/react";
import Cell from "../../components/grid/Cell";
import { GraphNode } from "../../types";

const Pathfinder = () => {
  // const screenWidth = window.screen.width;
  // const screenHeight = window.screen.height;
  const rows = 20;
  const columns = 40;

  const [cellGrid, setCellGrid] = useState(createGrid(rows, columns));
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [isMovingStart, setIsMovingStart] = useState<boolean>(false);
  const [isMovingEnd, setIsMovingEnd] = useState<boolean>(false);
  const [oldStartNode, setOldStartNode] = useState<GraphNode | null>(null);
  const [oldEndNode, setOldEndNode] = useState<GraphNode | null>(null);

  useEffect(() => {
    document.onmousedown = (ev: MouseEvent) => {
      setIsMouseDown(true);
      if (ev.clientX) {
        const x = ev.clientX;
        const y = ev.clientY;

        const targetEl = document.elementFromPoint(x, y)?.id;
        if (targetEl) {
          const pos = targetEl.split("_");
          const row = Number(pos[0]);
          const col = Number(pos[1]);

          if (cellGrid[row][col].isStart) {
            setOldStartNode(cellGrid[row][col]);
            setIsMovingStart(true);
          } else if (cellGrid[row][col].isFinish) {
            setOldEndNode(cellGrid[row][col]);
            setIsMovingEnd(true);
          } else {
            const copy = [...cellGrid];
            copy[row][col].isWall = true;
            setCellGrid(copy);
          }
        }
      }
    };
    document.onmousemove = (ev: MouseEvent) => {
      if (ev.clientX) {
        if (!isMovingStart && !oldStartNode && !isMovingEnd && !oldEndNode) {
          const x = ev.clientX;
          const y = ev.clientY;
          const targetEl = document.elementFromPoint(x, y)?.id;
          if (targetEl && ev.buttons == 1) {
            const pos = targetEl.split("_");
            const copy = [...cellGrid];
            const row = Number(pos[0]);
            const col = Number(pos[1]);

            copy[row][col].isWall = true;
            setCellGrid(copy);
          }
        } else if (isMovingStart) {
          const x = ev.clientX;
          const y = ev.clientY;
          const targetEl = document.elementFromPoint(x, y)?.id;
          if (targetEl && ev.buttons == 1) {
            const pos = targetEl.split("_");
            const copy = [...cellGrid];
            const row = Number(pos[0]);
            const col = Number(pos[1]);
            if (oldStartNode) {
              copy[oldStartNode.row][oldStartNode.col].isStart = false;
              setOldStartNode(copy[row][col]);
            }
            copy[row][col].isStart = true;
            setCellGrid(copy);
          }
        } else if (isMovingEnd) {
          const x = ev.clientX;
          const y = ev.clientY;
          const targetEl = document.elementFromPoint(x, y)?.id;
          if (targetEl && ev.buttons == 1) {
            const pos = targetEl.split("_");
            const copy = [...cellGrid];
            const row = Number(pos[0]);
            const col = Number(pos[1]);
            if (oldEndNode) {
              copy[oldEndNode.row][oldEndNode.col].isFinish = false;
              setOldEndNode(copy[row][col]);
            }
            copy[row][col].isFinish = true;
            setCellGrid(copy);
          }
        }
      }
    };
    document.onmouseup = (ev: MouseEvent) => {
      if (ev.clientX && isMovingStart) {
        // console.log(ev.clientX);
        // console.log(ev.clientY);
      }
      setOldStartNode(null);
      setOldEndNode(null);
      setIsMouseDown(false);
      setIsMovingStart(false);
    };
  }, [
    isMouseDown,
    cellGrid,
    isMovingStart,
    setOldStartNode,
    setOldEndNode,
    oldStartNode,
    oldEndNode,
    isMovingEnd
  ]);

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
                <Tr h={"40px"}>
                  {row.map((cell, col_ind) => {
                    return <Cell col={col_ind} row={row_ind} cell={cell} />;
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
