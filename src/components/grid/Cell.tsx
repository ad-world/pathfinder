import { Button, GridItem } from "@chakra-ui/react";

interface CellProps {
  state: number;
  row: number;
  col: number;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ state, row, col, onClick }) => {
  return (
    <GridItem
      onClick={onClick}
      backgroundColor={state == 0 ? "white" : "black"}
      borderColor={"black"}
      rounded={"none"}
      padding={0}
      margin={0}
      border={"1px"}
      _hover={{ bgColor: "gray.300" }}
    ></GridItem>
  );
};

export default Cell;
