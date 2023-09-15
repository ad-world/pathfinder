import {
    Box,
    Button,
    HStack,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Text,
    VStack,
} from "@chakra-ui/react";
import { CellSizePixels } from "../../util/util";
import { Colors } from "../../util/colors";

const Legend = () => {
    const NodeWrapper = ({bgColor, hover, text}: { bgColor: Colors, hover: Colors, text: string }) => {
        return (
            <HStack gap={4}>
            <Box
                minW={CellSizePixels}
                minH={CellSizePixels}
                bgColor={bgColor}
                _hover={{ bgColor: hover}}
            ></Box>
            <Text>{text}</Text>
        </HStack>
        )
    } 
    return (
        <Popover>
            <PopoverTrigger>
                <Button variant="outline" colorScheme='cyan'>Legend</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow></PopoverArrow>
                <PopoverCloseButton></PopoverCloseButton>
                <PopoverHeader>Node Types</PopoverHeader>
                <PopoverBody>
                    <VStack
                        gap={2}
                        textAlign={"left"}
                        alignItems={"flex-start"}
                    >
                        <NodeWrapper bgColor={Colors.StartingNode} hover={Colors.StartingNodeHover} text="Starting Node" />
                        <NodeWrapper bgColor={Colors.EndingNode} hover={Colors.EndingNodeHover} text="Ending Node" />
                        <NodeWrapper bgColor={Colors.WallNode} hover={Colors.WallNodeHover} text="Wall Node" />
                        <NodeWrapper bgColor={Colors.EmptyNode} hover={Colors.EmptyNodeHover} text="Empty Node"/>
                        <NodeWrapper bgColor={Colors.VisitedNode} hover={Colors.VisitedNodeHover} text="Visited Node"/>
                        <NodeWrapper bgColor={Colors.ShortestPathNode} hover={Colors.ShortestPathHoverNode} text="Shortest Path Node"/>
                        <NodeWrapper bgColor={Colors.LightWeightNode} hover={Colors.LightWeightNode} text="Light Weight Node"/>
                        <NodeWrapper bgColor={Colors.MediumWeightNode} hover={Colors.MediumWeightNode} text="Medium Weight Node"/>
                        <NodeWrapper bgColor={Colors.HeavyWeightNode} hover={Colors.HeavyWeightNode} text="Heavy Weight Node"/>                        
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default Legend;
