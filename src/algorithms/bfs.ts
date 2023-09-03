import { GraphAlgorithmArgs, GraphAlgorithmResult, GraphNode } from "../types";
import { Queue } from "../util/queue";
import { inBounds, unVisitAllNodes } from "../util/util";

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

    const copy = [...unVisitAllNodes(cellGrid)];

    const distancePathMap: {
        [x: string]: { distance: number; path: GraphNode[] };
    } = {};
    startNode.isVisited = true;
    q.enqueue(startNode);
    distancePathMap[`${startNode.row}${startNode.col}`] = {
        distance: 0,
        path: [],
    };

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
                    const oldNodeMetadata =
                        distancePathMap[`${top.row}${top.col}`];
                    newNode.isVisited = true;
                    distancePathMap[`${newNode.row}${newNode.col}`] = {
                        distance: oldNodeMetadata.distance + 1,
                        path: [...oldNodeMetadata.path, top],
                    };
                    q.enqueue(newNode);
                }
            }
        }
    }

    const result = distancePathMap[`${endNode.row}${endNode.col}`];
    return {
        cellGrid: copy,
        visitedNodes,
        shortestPath: result.path ?? [],
    };
};
