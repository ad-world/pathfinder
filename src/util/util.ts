import { GraphNode } from "../types";

export const START_NODE_ROW = 10;
export const START_NODE_COL = 10;
export const FINISH_NODE_ROW = 10;
export const FINISH_NODE_COL = 30;

export const CellSizeNumber = 35;
export const CellSizePixels = "35px";

export function calculateGridDimensions(
  screenWidth: number,
  screenHeight: number,
  cellSize: number
) {
  const columns = Math.floor(screenWidth / cellSize);
  const rows = Math.floor(screenHeight / cellSize);

  return { rows, columns };
}

export const createGrid = (rows: number, columns: number): GraphNode[][] => {
  const cellGrid: GraphNode[][] = [];
  for (let i = 0; i < rows; i++) {
    const row: GraphNode[] = [];
    for (let j = 0; j < columns; j++) {
      row.push(createNode(i, j));
    }
    cellGrid.push(row);
  }

  return cellGrid;
};

export const createNode = (row: number, col: number): GraphNode => {
  return {
    row,
    col,
    isStart: row == START_NODE_ROW && col == START_NODE_COL,
    isFinish: row == FINISH_NODE_ROW && col == FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

export const getNewGrid = (
  grid: GraphNode[][],
  row: number,
  col: number
): GraphNode[][] => {
  const newGrid = [...grid];
  const node = newGrid[row][col];
  const newNode: GraphNode = {
    ...node,
    isWall: !node.isWall,
  };

  newGrid[row][col] = newNode;
  return newGrid;
};
