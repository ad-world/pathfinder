import { GraphNode } from "../types";

export const START_NODE_ROW = 10;
export const START_NODE_COL = 10;
export const FINISH_NODE_ROW = 10;
export const FINISH_NODE_COL = 30;

export const ANIMATION_SPEED = 10;

export const CellSizeNumber = 35;
export const CellSizePixels = "35px";

export enum Algorithms {
    BFS = "Breadth First Search (BFS)",
    DFS = "Depth First Search (DFS)",
}

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
        isInShortestPath: false,
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

export const removeDuplicateBasedOnFinalCell = (
    finalRow: number,
    finalCol: number,
    type: "start" | "finish",
    cellGrid: GraphNode[][]
): GraphNode[][] => {
    let node: GraphNode | null = null;
    let nodeDist: number = Infinity;

    const distance = (x1: number, y1: number, x2: number, y2: number) =>
        Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    for (let i = 0; i < cellGrid.length; i++) {
        for (let j = 0; j < cellGrid[0].length; j++) {
            const curNode = cellGrid[i][j];

            if (type == "start") {
                if (curNode.isStart) {
                    const dist = distance(finalRow, i, finalCol, j);
                    if (node == null) {
                        node = curNode;
                        nodeDist = dist;
                    } else {
                        if (dist < nodeDist) {
                            node = curNode;
                            nodeDist = dist;
                        }
                    }
                }
            } else if (type == "finish") {
                if (curNode.isFinish) {
                    const dist = distance(finalRow, i, finalCol, j);
                    if (node == null) {
                        node = curNode;
                        nodeDist = dist;
                    } else {
                        if (dist < nodeDist) {
                            node = curNode;
                            nodeDist = dist;
                        }
                    }
                }
            }
        }
    }

    if (!node) return cellGrid;

    const copy = [...cellGrid];
    for (let i = 0; i < copy.length; i++) {
        for (let j = 0; j < copy[0].length; j++) {
            if (type == "start") {
                const curnode = copy[i][j];
                if (curnode.isStart && (i != node.row || j != node.col)) {
                    curnode.isStart = false;
                    copy[i][j] = curnode;
                }
            } else {
                const curnode = copy[i][j];
                if (curnode.isFinish && (i != node.row || j != node.col)) {
                    curnode.isFinish = false;
                    copy[i][j] = curnode;
                }
            }
        }
    }

    return copy;
};

export const getStartingNode = (cellGrid: GraphNode[][]): GraphNode => {
    return cellGrid
        .find((row) => row.find((item) => item.isStart))
        ?.find((item) => item.isStart) as GraphNode;
};

export const getFinishNode = (cellGrid: GraphNode[][]): GraphNode => {
    return cellGrid
        .find((row) => row.find((item) => item.isFinish))
        ?.find((item) => item.isFinish) as GraphNode;
};

export const unVisitAllNodes = (cellGrid: GraphNode[][]): GraphNode[][] => {
    const copy = [...cellGrid];
    for (const row of copy) {
        for (let i = 0; i < row.length; i++) {
            row[i].isVisited = false;
            row[i].isInShortestPath = false;
        }
    }

    return copy;
};

export const inBounds = (
    row: number,
    col: number,
    cellGrid: GraphNode[][]
): boolean => {
    const m = cellGrid.length;
    const n = cellGrid[0].length;

    if (row >= 0 && row < m && col >= 0 && col < n) return true;
    return false;
};
