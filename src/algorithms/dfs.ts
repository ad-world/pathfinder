import { GraphAlgorithmArgs, GraphAlgorithmResult, GraphNode } from "../types";
import { inBounds } from "../util/util";

export const dfs = (args: GraphAlgorithmArgs): GraphAlgorithmResult => {
    const { cellGrid, startNode, endNode } = args;

    let shouldKeepSearching = true;
    const visitedNodes: GraphNode[] = [];

    const dirs = [
        [0, 1],
        [1, 0],
        [-1, 0],
        [0, -1],
    ];

    const copy = [...cellGrid];

    const search = (node: GraphNode, visited: GraphNode[]) => {
        node.isVisited = true;
        visited.push(node);

        if (node == endNode) {
            shouldKeepSearching = false;
            return;
        }

        for (const dir of dirs) {
            const newRow = dir[0] + node.row;
            const newCol = dir[1] + node.col;

            if (inBounds(newRow, newCol, copy)) {
                const newNode = copy[newRow][newCol];
                if (
                    !newNode.isVisited &&
                    shouldKeepSearching &&
                    !newNode.isWall
                ) {
                    search(newNode, visited);
                }
            }
        }
    };

    search(startNode, visitedNodes);

    return {
        cellGrid: copy,
        visitedNodes,
    };
};
