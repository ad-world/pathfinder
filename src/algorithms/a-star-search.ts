import { DistancePathMap, GraphAlgorithmArgs, GraphAlgorithmResult, GraphNode } from "../types";
import { PriorityQueue } from "../util/priority-queue";
import { cellString, inBounds, unVisitAllNodes } from "../util/util";

const heuristic = (a: GraphNode, b: GraphNode): number => {
    const {row1, col1} = { row1: a.row, col1: a.col};    
    const {row2, col2} = { row2: b.row, col2: b.col};

    return Math.abs(row1 - row2) + Math.abs(col1 - col2);
}

export const a_star_search = (args: GraphAlgorithmArgs): GraphAlgorithmResult => {
    const { cellGrid, startNode, endNode } = args;
    const q = new PriorityQueue<GraphNode>();
    const visitedNodes: GraphNode[] = [];

    const dirs = [
        [0, 1],
        [1, 0],
        [-1, 0],
        [0, -1],
    ];

    const copy = [...unVisitAllNodes(cellGrid)];
    
    q.insert(0, startNode);

    const distancePathMap: DistancePathMap = {};
    const cameFrom: { [x: string]: GraphNode | null} = {};
    const costSoFar: { [x: string]: number } = {};
    cameFrom[cellString(startNode.row, startNode.col)] = null;
    costSoFar[cellString(startNode.row, startNode.col)] = 0;

    distancePathMap[cellString(startNode.row, startNode.col)] = {
        distance: 0,
        path: []
    }

    while(!q.isEmpty()) {
        const top = q.pop();

        if(top !== null) {
            const node = top?.[1];
            const dist = top?.[0];

            if(!node.isVisited) {
                visitedNodes.push(node);
                node.isVisited = true;
            }

            if(node.row == endNode.row && node.col == endNode.col) {
                break;
            }

            for(const dir of dirs) {
                const newRow = dir[0] + node.row;
                const newCol = dir[1] + node.col;

                if(inBounds(newRow, newCol, cellGrid) && !copy[newRow][newCol].isWall) {
                    const nodeString = cellString(node.row, node.col);
                    const newNodeString = cellString(newRow, newCol);

                    const nextCost = dist + copy[newRow][newCol].weight;
                    if(!costSoFar[newNodeString] || nextCost < costSoFar[newNodeString]) {
                        costSoFar[newNodeString] = nextCost
                        const newPriority = nextCost + heuristic(copy[newRow][newCol], endNode)
                        
                        distancePathMap[newNodeString] = {
                            distance: newPriority,
                            path: [...distancePathMap[nodeString].path, cellGrid[newRow][newCol]]
                        }
                        
                        q.insert(newPriority, cellGrid[newRow][newCol])
                        cameFrom[newNodeString] = node;
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