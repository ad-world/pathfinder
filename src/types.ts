export type GraphNode = {
    col: number;
    row: number;
    isStart: boolean;
    isFinish: boolean;
    distance: number;
    isVisited: boolean;
    isWall: boolean;
    previousNode: GraphNode | null;
};

export type GraphAlgorithmResult = {
    cellGrid: GraphNode[][];
    visitedNodes: GraphNode[];
    shortestPath?: GraphNode[];
};
