import {
    GraphAlgorithmArgs,
    GraphAlgorithmResult,
    GraphNode,
} from "../types";
import { PriorityQueue } from "../util/priority-queue";
import { getNeighbors } from "../util/util";

const heuristic = (a: GraphNode, b: GraphNode): number => {
    const { row1, col1 } = { row1: a.row, col1: a.col };
    const { row2, col2 } = { row2: b.row, col2: b.col };

    return Math.abs(row1 - row2) + Math.abs(col1 - col2);
};

const heuristic_cost_estimate = (start: GraphNode, current: GraphNode, finish: GraphNode) => {
    const dx = Math.abs(current.col - finish.col);
    const dy = Math.abs(current.row - finish.row);
    const deltaX1 = current.col - finish.col;
    const deltaY1 = current.row - finish.row;
    const deltaX2 = start.col - finish.col;
    const deltaY2 = start.row - finish.row;
    
    const cross = Math.abs(deltaX1 * deltaY2 - deltaX2 * deltaY1);
    let heuristic = dx + dy;
    heuristic += cross * 0.001;

    return heuristic;
  }

const setScores = (grid: GraphNode[][]): GraphNode[][] => {
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[0].length; j++) {
            grid[i][j] = {
                ...grid[i][j],
                gScore: Infinity,
                fScore: Infinity,
                hScore: Infinity,
            }
        }
    }

    return grid;
}

const reconstructPath = (
    cameFrom: Map<GraphNode, GraphNode | null>,
    startNode: GraphNode,
    endNode: GraphNode
) => {
    let current = endNode;

    const path: GraphNode[] = [];
    if (!cameFrom.get(endNode)) return path;

    while (current != startNode) {
        path.push(current);
        current = cameFrom.get(current)!;
    }

    path.push(startNode);
    path.reverse();

    return path;
};

export const a_star_search = (
    args: GraphAlgorithmArgs
): GraphAlgorithmResult => {
    const { cellGrid, startNode, endNode } = args;
    const q = new PriorityQueue<GraphNode>();
    const visitedNodes: GraphNode[] = [];

    const copy = setScores(cellGrid);

    const cameFrom: Map<GraphNode, GraphNode | null> = new Map()
    const costSoFar: Map<GraphNode, number> = new Map();
    cameFrom.set(startNode, null);
    costSoFar.set(startNode, 0);
   

    startNode.gScore = 0;
    startNode.hScore = heuristic(startNode, endNode);
    startNode.fScore = startNode.hScore;

    q.insert(startNode.fScore, startNode);

    while (!q.isEmpty()) {
        const top = q.pop();

        if (top != null) {
            const node = top[1];

            visitedNodes.push(node);
            
            if (node.row == endNode.row && node.col == endNode.col) {
                return {
                    cellGrid,
                    visitedNodes,
                    shortestPath: reconstructPath(cameFrom, startNode, node)
                }
            }

            node.isVisited = true;

            for(const neighbor of getNeighbors(node, copy)) {
                if(neighbor.isWall || neighbor.isVisited) {
                    continue;
                }

                const score = node.gScore || 0 + neighbor.weight;
                if(score < neighbor.gScore!) {
                    neighbor.gScore = score;
                    neighbor.hScore = heuristic_cost_estimate(startNode, neighbor, endNode);
                    neighbor.fScore = neighbor.gScore + neighbor.hScore;
                    cameFrom.set(neighbor, node);

                    if(!q.data.find(item => item[1] === neighbor)) q.insert(neighbor.fScore, neighbor);
                }
            }

        }
    }

    return {
        cellGrid,
        visitedNodes,
        shortestPath: reconstructPath(cameFrom, startNode, endNode),
    };
};
