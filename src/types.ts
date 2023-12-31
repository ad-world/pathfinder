export type GraphNode = {
    col: number;
    row: number;
    isStart: boolean;
    isFinish: boolean;
    distance: number;
    isVisited: boolean;
    isWall: boolean;
    weight: number;
    previousNode: GraphNode | null;
    isInShortestPath: boolean;
    // the following are for a* search
    gScore?: number,
    fScore?: number,
    hScore?: number,
};

export type GraphAlgorithmResult = {
    cellGrid: GraphNode[][];
    visitedNodes: GraphNode[];
    shortestPath: GraphNode[];
};

export type GraphAlgorithmArgs = {
    cellGrid: GraphNode[][];
    startNode: GraphNode;
    endNode: GraphNode;
};


export type DistancePathMapNew = Map<GraphNode, { distance: number, path: GraphNode[] }>;

export type DistancePathMap = {
    [x: string]: { distance: number; path: GraphNode[] };
}


export type WeightedNode = {
    title: string,
    weight: number,
    color: string
}
