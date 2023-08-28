import { Box, Button, HStack, Heading, Select } from "@chakra-ui/react";

const Navigation = () => {
  return (
    <Box maxH={"10%"} h="10%" p={6} w="100%">
      <HStack justifyContent={"space-between"}>
        <HStack gap={8}>
          <Heading size={"md"}>Pathfinder</Heading>
          <Select>
            <option>Choose Algorithm</option>
            <option>BFS</option>
            <option>DFS</option>
          </Select>
        </HStack>

        <HStack>
          <Button>Search</Button>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Navigation;
