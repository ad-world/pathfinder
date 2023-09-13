import { Td } from "@chakra-ui/react";
import { GraphNode } from "../../types";
import { Colors } from "../../util/colors";
import { CellSizePixels, getWeightedNodes } from "../../util/util";

interface CellProps {
    cell: GraphNode;
    row: number;
    col: number;
}

const nodes = getWeightedNodes();

const Cell: React.FC<CellProps> = ({ cell, row, col }) => {
    const getBgColor = (cell: GraphNode) => {
        if (cell.isStart) return Colors.StartingNode;
        if (cell.isFinish) return Colors.EndingNode;
        if (cell.isInShortestPath) return Colors.ShortestPathNode;
        if (cell.isVisited) return Colors.VisitedNode;
        if (cell.isWall) return Colors.WallNode;
        if (cell.weight) return nodes.find(item => item.weight == cell.weight)?.color ?? Colors.EmptyNode
        return Colors.EmptyNode;
    };

    const getBgHover = (cell: GraphNode) => {
        if (cell.isStart) return Colors.StartingNodeHover;
        if (cell.isFinish) return Colors.EndingNodeHover;
        if (cell.isInShortestPath) return Colors.ShortestPathHoverNode;
        if (cell.isVisited) return Colors.VisitedNodeHover;
        if (cell.isWall) return Colors.WallNodeHover;
        return Colors.EmptyNodeHover;
    };

    return (
        <Td
            id={`${row}_${col}`}
            backgroundColor={getBgColor(cell)}
            key={`${row}_${col}`}
            borderColor={"blue.300"}
            border={"1px"}
            maxH={CellSizePixels}
            maxW={CellSizePixels}
            minH={CellSizePixels}
            minW={CellSizePixels}
            padding={3}
            _hover={{ bgColor: getBgHover(cell) }}
        ></Td>
    );
};

export default Cell;
