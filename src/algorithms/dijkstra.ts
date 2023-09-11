import { DistancePathMap, GraphAlgorithmArgs, GraphAlgorithmResult, GraphNode } from "../types";
import { PriorityQueue } from "../util/priority-queue";
import { cellString, inBounds } from "../util/util";

export const dijkstra = (args: GraphAlgorithmArgs): GraphAlgorithmResult => {
    const {cellGrid, startNode, endNode} = args;
    const distancePathMap: DistancePathMap = initializeDijkstra(args);
    
    const visitedNodes: GraphNode[] = [];

    const dirs = [
        [0, 1],
        [1, 0],
        [-1, 0],
        [0, -1],
    ];

    const pq = new PriorityQueue<GraphNode>();
    pq.insert(0, startNode);

    while(!pq.isEmpty()) {
        const top = pq.pop();

        if(top != null) {
            const node = top?.[1];
            const distance = top?.[0];
            if(!node.isVisited) {
                visitedNodes.push(node)
                node.isVisited = true;
            }
            
            for (const dir of dirs) {
                const newRow = dir[0] + node.row;
                const newCol = dir[1] + node.col;
    
                if(inBounds(newRow, newCol, cellGrid)) {
                    const newDistance = distance + cellGrid[newRow][newCol].weight;
                    if(newDistance < distancePathMap[cellString(newRow, newCol)].distance) {
                        distancePathMap[cellString(newRow, newCol)] = {
                            path: [...distancePathMap[cellString(node.row, node.col)].path, cellGrid[newRow][newCol]],
                            distance: newDistance
                        }
                        pq.insert(newDistance, cellGrid[newRow][newCol]);
                    }
                }
            }
        }
    }

    return {
        cellGrid,
        visitedNodes,
        shortestPath: distancePathMap[cellString(endNode.row, endNode.col)].path
    }
}

const initializeDijkstra = (args: GraphAlgorithmArgs): DistancePathMap => {
    const {cellGrid, startNode } = args;
    
    const distancePathMap: DistancePathMap = {};

    for(let row = 0; row < cellGrid.length; row++) {
        for(let col = 0; col < cellGrid[0].length; col++) {
            distancePathMap[cellString(row, col)] = {
                distance: Infinity,
                path: []
            }
        }
    }

    distancePathMap[cellString(startNode.row, startNode.col)] = {
        distance: 0,
        path: []
    }

    return distancePathMap;
}
