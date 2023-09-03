import { GraphAlgorithmArgs, GraphAlgorithmResult, GraphNode } from "../types";
import { Queue } from "../util/queue";
import { inBounds } from "../util/util";

export const bfs = (args: GraphAlgorithmArgs): GraphAlgorithmResult => {
    const { cellGrid, startNode, endNode } = args;
    const q = new Queue<GraphNode>();
    const visitedNodes: GraphNode[] = [];

    const dirs = [
        [0, 1],
        [1, 0],
        [-1, 0],
        [0, -1],
    ];

    const copy = [...cellGrid];

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
                if (!newNode.isVisited && !newNode.isWall) {
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