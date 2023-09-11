import { DistancePathMap, GraphAlgorithmArgs, GraphAlgorithmResult, GraphNode } from "../types";
import { cellString, inBounds } from "../util/util";

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

    const distancePathMap: DistancePathMap = {};

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
                    const oldNodeMetadata =
                        distancePathMap[cellString(node.row, node.col)];
                    distancePathMap[cellString(newNode.row, newNode.col)] = {
                        distance: oldNodeMetadata.distance + 1,
                        path: [...oldNodeMetadata.path, node],
                    };
                    search(newNode, visited);
                }
            }
        }
    };

    distancePathMap[cellString(startNode.row, startNode.col)] = {
        distance: 0,
        path: [],
    };

    search(startNode, visitedNodes);

    const result = distancePathMap[cellString(endNode.row, endNode.col)];

    return {
        cellGrid: copy,
        visitedNodes,
        shortestPath: result.path ?? [],
    };
};
