import { GraphAlgorithmResult, GraphNode } from "../types";
import { Queue } from "../util/queue";

export const bfs = (
    cellGrid: GraphNode[][],
    startNode: GraphNode,
    endNode: GraphNode
): GraphAlgorithmResult => {
    const q = new Queue<GraphNode>();
    const visitedNodes: GraphNode[] = [];

    const dirs = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];

    const copy = [...cellGrid];

    const inBounds = (
        row: number,
        col: number,
        cellGrid: GraphNode[][]
    ): boolean => {
        const m = cellGrid.length;
        const n = cellGrid[0].length;

        if (row >= 0 && row < m && col >= 0 && col < n) return true;
        return false;
    };

    startNode.isVisited = true;
    q.enqueue(startNode);

    while (!q.isEmpty) {
        const top = q.dequeue();
        visitedNodes.push(top);
        if (top === endNode) {
            break;
        }

        top.isVisited = true;

        for (const dir of dirs) {
            const newRow = dir[0] + top.row;
            const newCol = dir[1] + top.col;

            if (inBounds(newRow, newCol, copy)) {
                const newNode = copy[newRow][newCol];
                if (!newNode.isVisited) {
                    newNode.isVisited = true;
                    q.enqueue(newNode);
                }
            }
        }
    }

    return {
        cellGrid: copy,
        visitedNodes,
    };
};
